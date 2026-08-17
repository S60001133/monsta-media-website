import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'

/**
 * MascotGLB — the user's real character (/models/mascot.glb) with a
 * scroll-scrubbed hand raise, front-on, dancing body.
 *
 * The free-tier GLB is one rigid mesh, so the right arm (which hangs
 * full-length in the source pose) is split out into its own geometry
 * pivoted at the shoulder. Each scroll notch = one step of the arm
 * raising (scrub) — spring-smoothed so it glides between notches; the
 * left arm (crossed in the source pose) gets a small mirrored flex.
 * The body keeps grooving (bounce, sway, squash & stretch) and stays
 * front-on (no panel-facing turn).
 */

const PINK = '#E9178C'
const SCALE = 2.6
const CUT = 0.33 // arm split threshold (|x| beyond this = arm)
const MAX_STEPS = 14 // scroll notches to fully raise the arm
const MAX_RAISE = 2.6 // rad (~149°) — hanging down -> up & out
const NOTCH_PX = 100 // wheel pixels per step

/** Split a GLB mesh geometry into body + left/right arms (pivoted). */
function splitArms(geo: THREE.BufferGeometry) {
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  const uv = geo.getAttribute('uv') as THREE.BufferAttribute | undefined
  const nor = geo.getAttribute('normal') as THREE.BufferAttribute | undefined
  const idx = geo.getIndex()
  const posArr = pos.array as Float32Array
  const uvArr = (uv?.array as Float32Array | undefined) ?? null
  const norArr = (nor?.array as Float32Array | undefined) ?? null
  const idxArr = idx ? (idx.array as Uint16Array | Uint32Array) : null

  const nTris = idxArr ? idxArr.length / 3 : pos.count / 3
  const tri = (t: number): [number, number, number] =>
    idxArr ? [idxArr[t * 3], idxArr[t * 3 + 1], idxArr[t * 3 + 2]] : [t * 3, t * 3 + 1, t * 3 + 2]

  const bodyIdx: number[] = []
  const rightIdx: number[] = []
  const leftIdx: number[] = []
  for (let t = 0; t < nTris; t++) {
    const [a, b, c] = tri(t)
    const xa = posArr[a * 3]
    const xb = posArr[b * 3]
    const xc = posArr[c * 3]
    if (xa > CUT && xb > CUT && xc > CUT) rightIdx.push(a, b, c)
    else if (xa < -CUT && xb < -CUT && xc < -CUT) leftIdx.push(a, b, c)
    else bodyIdx.push(a, b, c)
  }

  const buildPart = (indices: number[]) => {
    const newPos: number[] = []
    const newUv: number[] = []
    const newNor: number[] = []
    const newIdx: number[] = []
    const map = new Map<number, number>()
    for (const i of indices) {
      let ni = map.get(i)
      if (ni === undefined) {
        ni = newPos.length / 3
        map.set(i, ni)
        newPos.push(posArr[i * 3], posArr[i * 3 + 1], posArr[i * 3 + 2])
        if (uvArr) newUv.push(uvArr[i * 2], uvArr[i * 2 + 1])
        if (norArr) newNor.push(norArr[i * 3], norArr[i * 3 + 1], norArr[i * 3 + 2])
      }
      newIdx.push(ni)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(newPos, 3))
    if (uvArr) g.setAttribute('uv', new THREE.Float32BufferAttribute(newUv, 2))
    if (norArr) g.setAttribute('normal', new THREE.Float32BufferAttribute(newNor, 3))
    else g.computeVertexNormals()
    g.setIndex(newIdx)
    return g
  }

  // shoulder pivot for an arm part = mean of its innermost verts
  const pivotFor = (g: THREE.BufferGeometry) => {
    const p = g.getAttribute('position').array as Float32Array
    const n = g.getAttribute('position').count
    const xs = Array.from({ length: n }, (_, i) => Math.abs(p[i * 3]))
    const sorted = xs.map((x, i) => [x, i]).sort((a, b) => a[0] - b[0])
    const k = Math.max(1, Math.floor(n * 0.15))
    let px = 0
    let py = 0
    let pz = 0
    for (let j = 0; j < k; j++) {
      const i = sorted[j][1]
      px += p[i * 3]
      py += p[i * 3 + 1]
      pz += p[i * 3 + 2]
    }
    return new THREE.Vector3(px / k, py / k, pz / k)
  }

  const body = buildPart(bodyIdx)
  const right = buildPart(rightIdx)
  const left = buildPart(leftIdx)
  const rp = pivotFor(right)
  const lp = pivotFor(left)
  right.translate(-rp.x, -rp.y, -rp.z)
  left.translate(-lp.x, -lp.y, -lp.z)
  return { body, right, left, rp, lp }
}

export default function MascotGLB({
  progressRef,
  talking,
}: {
  progressRef: MutableRefObject<number>
  talking: boolean
}) {
  const { scene } = useGLTF('/models/mascot.glb')

  const parts = useMemo(() => {
    const meshes: THREE.Mesh[] = []
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh)
    })
    const mesh = meshes[0]
    if (!mesh) throw new Error('No mesh in mascot.glb')
    const geo = mesh.geometry.clone()
    const mat = mesh.material as THREE.MeshStandardMaterial
    const { body, right, left, rp, lp } = splitArms(geo)
    return { body, right, left, rp, lp, mat }
  }, [scene])

  const dance = useRef<THREE.Group>(null)
  const armR = useRef<THREE.Group>(null)
  const armL = useRef<THREE.Group>(null)
  const talkLight = useRef<THREE.PointLight>(null)

  // ---- scroll scrub: each wheel notch = one arm step ----
  const stepsRef = useRef(0)
  const accRef = useRef(0)
  const angleRef = useRef(0)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      let d = e.deltaY
      if (Math.abs(d) > 250) d = Math.sign(d) * 250
      accRef.current += d
      let s = stepsRef.current
      while (accRef.current >= NOTCH_PX && s < MAX_STEPS) {
        s += 1
        accRef.current -= NOTCH_PX
      }
      while (accRef.current <= -NOTCH_PX && s > 0) {
        s -= 1
        accRef.current += NOTCH_PX
      }
      if (s >= MAX_STEPS) accRef.current = Math.min(accRef.current, 0)
      if (s <= 0) accRef.current = Math.max(accRef.current, 0)
      stepsRef.current = s
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    void progressRef // front-on: character no longer turns toward panels

    // glide the arm angle toward the scroll target (each notch = 1 move)
    const target = (stepsRef.current / MAX_STEPS) * MAX_RAISE
    angleRef.current += (target - angleRef.current) * Math.min(1, delta * 5)

    const g = dance.current
    if (g) {
      // NO bouncing — feet planted, subtle groove only (sway + lean)
      g.position.y = 0
      g.rotation.z = Math.sin(t * 2.1) * 0.05
      g.rotation.x = Math.sin(t * 2.1 + 1.4) * 0.025
      g.rotation.y = Math.sin(t * 0.6) * 0.04
      g.scale.set(1, 1, 1)
    }

    // right arm: scroll-scrubbed raise + wave flourish at full height
    if (armR.current) {
      let r = angleRef.current
      if (stepsRef.current >= MAX_STEPS) r += Math.sin(t * 3.2) * 0.07
      armR.current.rotation.z = r
      armR.current.rotation.x = -0.22 // slight forward arc
    }

    // left arm: mirrored flex that grows with scroll + idle wobble
    if (armL.current) {
      const flex = (stepsRef.current / MAX_STEPS) * 0.5
      armL.current.rotation.z = -(0.12 + flex) + Math.sin(t * 4.6) * 0.04
    }

    if (talkLight.current) {
      talkLight.current.intensity = talking ? 8 + Math.sin(t * 9) * 4 : 0
    }
  })

  return (
    <group scale={SCALE} position={[0, 0.02, 0]}>
      <group ref={dance}>
        <mesh geometry={parts.body} material={parts.mat} />
        <group ref={armR} position={[parts.rp.x, parts.rp.y, parts.rp.z]}>
          <mesh geometry={parts.right} material={parts.mat} />
        </group>
        <group ref={armL} position={[parts.lp.x, parts.lp.y, parts.lp.z]}>
          <mesh geometry={parts.left} material={parts.mat} />
        </group>
      </group>
      {/* pink under-glow that flares while talking */}
      <pointLight ref={talkLight} position={[0, 0.4, 1.1]} intensity={0} distance={4} color={PINK} />
    </group>
  )
}
