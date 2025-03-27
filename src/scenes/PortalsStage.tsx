"use client"
import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { MapControls, OrbitControls, Stage } from '@react-three/drei'
// import { useThree } from '@react-three/fiber'
import { Vector3, Euler } from 'three'
import { useBackgroundMusic } from '@/contexts/BackgroundMusicContext'
import { HallOfPortals } from './portals/HallOfPortals'

export interface PortalsStageHandle {
  createPortal: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => void
  resetScene: () => void
  copyContent: () => void
  pasteContent: () => void
  autorotate: () => void
}

const PortalsStage = forwardRef<PortalsStageHandle>((props, ref) => {
  // const { camera } = useThree()
  const portalsRef = useRef<{ position: Vector3; scale: Vector3; rotation: Euler }[]>([])


  useImperativeHandle(ref, () => ({
    createPortal: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => {
      portalsRef.current.push({
        position: new Vector3(...position),
        scale: new Vector3(...scale),
        rotation: new Euler(...rotation)
      })
    },
    resetScene: () => {
      portalsRef.current = []
    },
    copyContent: () => {
      // Implement copy functionality
    },
    pasteContent: () => {
      // Implement paste functionality
    },
    autorotate: () => {
      // Implement autorotate functionality
    }
  }))

  return (<>
    {/* <Stage
      environment="city"
      intensity={0.6}
      adjustCamera={false}
      preset="rembrandt"
      shadows="contact"
    > */}
      {/* Portal meshes will be rendered here */}
      {/* {portalsRef.current.map((portal, index) => (
        <mesh
          key={index}
          position={portal.position}
          scale={portal.scale}
          rotation={portal.rotation}
        >
          <ringGeometry args={[1, 1.5, 32]} />
          <meshStandardMaterial color="#4a90e2" />
        </mesh>
      ))} */}
      <HallOfPortals />
      <MapControls  />
    {/* </Stage> */}
  </>)
})

PortalsStage.displayName = 'PortalsStage'

export default PortalsStage 


