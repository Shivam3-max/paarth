import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

const GEOMETRIES = {
  knot: <torusKnotGeometry args={[0.85, 0.26, 140, 20]} />,
  ico: <icosahedronGeometry args={[1.15, 0]} />,
  octa: <octahedronGeometry args={[1.2, 0]} />,
  torus: <torusGeometry args={[0.95, 0.32, 18, 60]} />,
  dodeca: <dodecahedronGeometry args={[1.1, 0]} />,
}

function Shape({ kind }) {
  const outer = useRef()
  const inner = useRef()

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05)
    if (outer.current) {
      outer.current.rotation.y += d * 0.28
      outer.current.rotation.x += d * 0.11
      // mouse-reactive lean
      const px = state.pointer.x
      const py = state.pointer.y
      outer.current.rotation.x += (py * 0.35 - outer.current.rotation.x * 0.0) * d * 0.6
      outer.current.rotation.y += px * d * 0.5
    }
    if (inner.current) {
      inner.current.rotation.y -= d * 0.18
      inner.current.rotation.z += d * 0.09
    }
  })

  const geo = GEOMETRIES[kind] || GEOMETRIES.ico

  return (
    <group>
      <mesh ref={outer}>
        {geo}
        <meshBasicMaterial wireframe color="#9A7B2D" transparent opacity={0.62} />
      </mesh>
      <mesh ref={inner} scale={0.55}>
        {GEOMETRIES[kind === 'knot' ? 'octa' : 'ico']}
        <meshBasicMaterial wireframe color="#17150F" transparent opacity={0.16} />
      </mesh>
    </group>
  )
}

/** Brass wireframe 3D object. Always render via Lazy3D, never import directly. */
export default function Scene3D({ kind = 'ico' }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.4], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <Float speed={1.7} rotationIntensity={0.55} floatIntensity={0.9}>
        <Shape kind={kind} />
      </Float>
    </Canvas>
  )
}
