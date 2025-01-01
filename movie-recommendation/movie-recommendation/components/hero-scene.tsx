'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Text3D } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'

function FloatingPosters() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
        >
          MovieAI
          <meshStandardMaterial color="white" />
        </Text3D>
      </mesh>
    </Float>
  )
}

export function HeroScene() {
  return (
    <div className="h-[60vh] w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <FloatingPosters />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

