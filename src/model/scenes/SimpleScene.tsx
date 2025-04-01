'use client'

import { Canvas } from '@react-three/fiber'
import { MapControls } from '@react-three/drei'
import { ReactNode } from 'react'
import { ACESFilmicToneMapping } from 'three'

interface SimpleSceneProps {
  children?: ReactNode
  cameraSettings?: any
  noLights?: boolean
}

export default function SimpleScene({ children, cameraSettings, noLights }: SimpleSceneProps) {
  return (
    <Canvas 
      style={{
        width: '100%', height: '100%',
      }}
      // merge cameraSettings with default camera settings
      camera={{ position: [-10, 10, 10], fov: 30, ...cameraSettings }}
      shadows
    >
      {!noLights && (
        <>
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[25, 50, 25]} 
            intensity={1} 
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
            shadow-camera-near={0.5}
            shadow-camera-far={150}
          />
        </>
      )}
      
      {children}
    </Canvas>
  )
} 