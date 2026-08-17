import { Component, Suspense, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import MascotGLB from './MascotGLB'
import Gorilla3D from './Gorilla3D'
import type { MutableRefObject } from 'react'

/**
 * MascotCanvas — the WebGL stage.
 *
 * Primary: the user's real character model (/models/mascot.glb).
 * If the model ever fails to load, an error boundary falls back to the
 * procedural Gorilla3D so the stage never goes empty.
 * Transparent background (CSS glow shows through), pink rim lights,
 * contact shadow that tracks the dance.
 */

class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function MascotCanvas({
  progressRef,
  talking,
}: {
  progressRef: MutableRefObject<number>
  talking: boolean
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 4.9], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      {/* base fill */}
      <ambientLight intensity={0.55} />
      {/* key light — soft white from front-top */}
      <directionalLight position={[4, 5, 3]} intensity={2.1} />
      {/* brand rim lights — pink from behind/sides */}
      <pointLight position={[-4, 2.6, -2]} intensity={26} distance={16} color="#E9178C" />
      <pointLight position={[4, 1.3, -3]} intensity={13} distance={16} color="#E9178C" />
      {/* warm floor bounce */}
      <pointLight position={[0, -2, 2]} intensity={4} distance={8} color="#3A2E40" />

      <Suspense fallback={null}>
        <ModelBoundary fallback={<Gorilla3D progressRef={progressRef} talking={talking} />}>
          <MascotGLB progressRef={progressRef} talking={talking} />
        </ModelBoundary>
      </Suspense>

      {/* grounded shadow that tracks the dance */}
      <ContactShadows position={[0, -1.22, 0]} opacity={0.55} scale={4.4} blur={2.6} far={2.6} color="#000000" frames={Infinity} />
    </Canvas>
  )
}
