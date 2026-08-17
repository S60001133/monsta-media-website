import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'

/**
 * Gorilla3D — a real 3D dancing ape, hand-rigged from primitives.
 *
 * No GLTF needed: the gorilla is assembled from low-poly primitives
 * (spheres / capsules / boxes) in brand colours, and the whole dance
 * is choreographed in useFrame:
 *   - body bounce + squash & stretch on the beat
 *   - hip sway, head bob + look-around
 *   - alternating arm pumps (boxer groove)
 *   - leg steps + foot taps
 *   - eyes glow pink harder when the mascot is "talking"
 *   - root turns to face whichever content panel is active
 *
 * Progress (0..1) comes from the parent's scroll timeline.
 */

const FUR = '#23202B' // dark charcoal-purple fur
const FUR_DARK = '#17141E' // deeper fur for limbs
const FACE = '#453A52' // muzzle / ears / brow
const SHIRT = '#0B0B0F' // near-black tee
const PINK = '#E9178C'

export default function Gorilla3D({
  progressRef,
  talking,
}: {
  progressRef: MutableRefObject<number>
  talking: boolean
}) {
  const root = useRef<THREE.Group>(null)
  const hips = useRef<THREE.Group>(null)
  const torso = useRef<THREE.Mesh>(null)
  const head = useRef<THREE.Group>(null)
  const armL = useRef<THREE.Group>(null)
  const armR = useRef<THREE.Group>(null)
  const legL = useRef<THREE.Group>(null)
  const legR = useRef<THREE.Group>(null)
  const eyeL = useRef<THREE.Mesh>(null)
  const eyeR = useRef<THREE.Mesh>(null)
  const eyeMatL = useRef<THREE.MeshStandardMaterial>(null)
  const eyeMatR = useRef<THREE.MeshStandardMaterial>(null)

  // "MONSTA" chest print — generated once on a canvas texture.
  const shirtTex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 256
    const ctx = c.getContext('2d')!
    ctx.fillStyle = SHIRT
    ctx.fillRect(0, 0, 512, 256)
    ctx.font = '800 92px Montserrat, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = PINK
    ctx.fillText('MONSTA', 256, 120)
    const tex = new THREE.CanvasTexture(c)
    tex.anisotropy = 4
    return tex
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const p = progressRef.current

    // which panel is active -> which way to face (0,2 = left side, 1,3 = right)
    const active = p < 0.29 ? 0 : p < 0.57 ? 1 : p < 0.85 ? 2 : 3
    const targetY = active === 0 || active === 2 ? 0.45 : -0.45
    if (root.current) {
      // face the panel with smooth damping + a slow idle sway
      const damp = Math.min(1, delta * 3.2)
      root.current.rotation.y += (targetY + Math.sin(t * 0.6) * 0.06 - root.current.rotation.y) * damp
      // dance bounce — two-layer beat
      root.current.position.y = Math.sin(t * 4.6) * 0.16 + Math.sin(t * 9.2) * 0.045
    }

    if (hips.current) {
      // hip sway + forward lean groove
      hips.current.rotation.z = Math.sin(t * 2.1) * 0.1
      hips.current.rotation.x = Math.sin(t * 2.1 + 1.4) * 0.05
    }

    if (torso.current) {
      // squash & stretch on the beat
      const s = Math.sin(t * 4.6 + Math.PI / 2) * 0.07
      torso.current.scale.set(1.05 - s * 0.55, 1.2 + s, 0.85 - s * 0.35)
    }

    if (head.current) {
      // head bob + tilt + look around
      head.current.rotation.x = Math.sin(t * 4.6) * 0.16
      head.current.rotation.z = Math.sin(t * 2.1 + 0.6) * 0.07
      head.current.rotation.y = Math.sin(t * 1.05) * 0.2
    }

    if (armL.current && armR.current) {
      // boxer arm pumps, alternating
      armL.current.rotation.x = -1.45 + Math.sin(t * 9.2) * 0.6
      armR.current.rotation.x = -1.45 + Math.sin(t * 9.2 + Math.PI) * 0.6
      armL.current.rotation.z = 0.2
      armR.current.rotation.z = -0.2
    }

    if (legL.current && legR.current) {
      // stepping / foot taps
      legL.current.rotation.x = Math.sin(t * 4.6) * 0.2
      legR.current.rotation.x = Math.sin(t * 4.6 + Math.PI) * 0.2
    }

    // blink + pink eye glow (brighter + pulsing while talking)
    if (eyeL.current && eyeR.current) {
      const blink = t % 3.4 < 0.1 ? 0.12 : 1
      eyeL.current.scale.y = blink
      eyeR.current.scale.y = blink
    }
    if (eyeMatL.current && eyeMatR.current) {
      const glow = talking ? 2.0 + Math.sin(t * 9) * 0.6 : 0.85
      eyeMatL.current.emissiveIntensity = glow
      eyeMatR.current.emissiveIntensity = glow
    }
  })

  return (
    <group ref={root} position={[0, -0.15, 0]}>
      <group ref={hips}>
        {/* ---- torso / chest ---- */}
        <mesh ref={torso} position={[0, 0, 0]} scale={[1.05, 1.2, 0.85]}>
          <sphereGeometry args={[0.6, 32, 24]} />
          <meshStandardMaterial color={FUR} roughness={0.85} />
        </mesh>

        {/* MONSTA chest print */}
        <mesh position={[0, 0.06, 0.545]}>
          <planeGeometry args={[0.8, 0.36]} />
          <meshBasicMaterial map={shirtTex} transparent />
        </mesh>

        {/* deltoid/shoulder bumps — mascot muscle look */}
        <mesh position={[-0.6, 0.55, 0]}>
          <sphereGeometry args={[0.25, 20, 16]} />
          <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
        </mesh>
        <mesh position={[0.6, 0.55, 0]}>
          <sphereGeometry args={[0.25, 20, 16]} />
          <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
        </mesh>

        {/* neck */}
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.15, 0.19, 0.24, 16]} />
          <meshStandardMaterial color={FUR} roughness={0.9} />
        </mesh>

        {/* ---- head ---- */}
        <group ref={head} position={[0, 0.98, 0]}>
          {/* skull */}
          <mesh>
            <sphereGeometry args={[0.44, 32, 24]} />
            <meshStandardMaterial color={FUR} roughness={0.85} />
          </mesh>
          {/* brow ridge */}
          <mesh position={[0, 0.12, 0.24]} scale={[1, 0.34, 0.55]}>
            <sphereGeometry args={[0.33, 20, 16]} />
            <meshStandardMaterial color={FUR_DARK} roughness={0.95} />
          </mesh>
          {/* muzzle */}
          <mesh position={[0, -0.06, 0.4]} scale={[0.95, 0.72, 0.8]}>
            <sphereGeometry args={[0.22, 20, 16]} />
            <meshStandardMaterial color={FACE} roughness={0.8} />
          </mesh>
          {/* nostrils */}
          <mesh position={[-0.07, -0.11, 0.58]}>
            <sphereGeometry args={[0.038, 10, 8]} />
            <meshStandardMaterial color="#120E16" />
          </mesh>
          <mesh position={[0.07, -0.11, 0.58]}>
            <sphereGeometry args={[0.038, 10, 8]} />
            <meshStandardMaterial color="#120E16" />
          </mesh>
          {/* eyes — pink glow */}
          <mesh ref={eyeL} position={[-0.17, 0.07, 0.42]}>
            <sphereGeometry args={[0.075, 16, 12]} />
            <meshStandardMaterial ref={eyeMatL} color={PINK} emissive={PINK} emissiveIntensity={0.85} roughness={0.3} />
          </mesh>
          <mesh ref={eyeR} position={[0.17, 0.07, 0.42]}>
            <sphereGeometry args={[0.075, 16, 12]} />
            <meshStandardMaterial ref={eyeMatR} color={PINK} emissive={PINK} emissiveIntensity={0.85} roughness={0.3} />
          </mesh>
          {/* ears */}
          <mesh position={[-0.44, 0.02, 0]} scale={[0.26, 0.8, 0.8]}>
            <sphereGeometry args={[0.15, 16, 12]} />
            <meshStandardMaterial color={FACE} roughness={0.85} />
          </mesh>
          <mesh position={[0.44, 0.02, 0]} scale={[0.26, 0.8, 0.8]}>
            <sphereGeometry args={[0.15, 16, 12]} />
            <meshStandardMaterial color={FACE} roughness={0.85} />
          </mesh>
        </group>

        {/* ---- arms — long, knuckle-dragger proportions ---- */}
        <group ref={armL} position={[-0.68, 0.58, 0]}>
          <mesh position={[0, -0.5, 0]}>
            <capsuleGeometry args={[0.15, 0.72, 6, 14]} />
            <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
          </mesh>
          {/* fist */}
          <mesh position={[0, -1.28, 0]}>
            <sphereGeometry args={[0.19, 20, 16]} />
            <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
          </mesh>
        </group>
        <group ref={armR} position={[0.68, 0.58, 0]}>
          <mesh position={[0, -0.5, 0]}>
            <capsuleGeometry args={[0.15, 0.72, 6, 14]} />
            <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
          </mesh>
          <mesh position={[0, -1.28, 0]}>
            <sphereGeometry args={[0.19, 20, 16]} />
            <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
          </mesh>
        </group>

        {/* ---- legs — short, thick ---- */}
        <group ref={legL} position={[-0.28, -0.55, 0]}>
          <mesh position={[0, -0.34, 0]}>
            <capsuleGeometry args={[0.18, 0.44, 6, 14]} />
            <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
          </mesh>
          {/* foot */}
          <mesh position={[0, -0.7, 0.13]}>
            <boxGeometry args={[0.26, 0.14, 0.44]} />
            <meshStandardMaterial color={FUR} roughness={0.95} />
          </mesh>
        </group>
        <group ref={legR} position={[0.28, -0.55, 0]}>
          <mesh position={[0, -0.34, 0]}>
            <capsuleGeometry args={[0.18, 0.44, 6, 14]} />
            <meshStandardMaterial color={FUR_DARK} roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.7, 0.13]}>
            <boxGeometry args={[0.26, 0.14, 0.44]} />
            <meshStandardMaterial color={FUR} roughness={0.95} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
