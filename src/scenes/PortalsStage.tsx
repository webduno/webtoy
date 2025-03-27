"use client"
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { MapControls, OrbitControls, Stage, PointerLockControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3, Euler } from 'three'
import { useBackgroundMusic } from '@/contexts/BackgroundMusicContext'
import { HallOfPortals } from './portals/HallOfPortals'
import { useKeyboardControls } from '@/hooks/useKeyboardControls'
import { isMobile } from '@/utils/mobileDetection'

const PortalsStage = forwardRef<any>((props, ref) => {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const [velocity, setVelocity] = useState<Vector3>(new Vector3(0, 0, 0))
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const moveSpeed = 0.5
  const maxVelocity = 2
  const smoothFactor = 0.1
  const frictionFactor = 0.0

  // Setup keyboard controls
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboardControls()
  const [moveUp, setMoveUp] = useState(false)
  const [moveDown, setMoveDown] = useState(false)

  // Handle up/down movement keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setMoveUp(true)
      }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        setMoveDown(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setMoveUp(false)
      }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        setMoveDown(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Check if client is mobile on component mount
  useEffect(() => {
    setIsMobileDevice(isMobile())
  }, [])

  // Set initial camera position
  useEffect(() => {
    if (camera) {
      camera.position.set(0, 2, 28)
    }
  }, [camera])

  // Handle movement
  useFrame(() => {
    if (!camera || !controlsRef.current) return

    // Calculate movement direction based on camera rotation
    const direction = new Vector3()
    const frontVector = new Vector3(0, 0, moveBackward ? 1 : moveForward ? -1 : 0)
    const sideVector = new Vector3(moveLeft ? 1 : moveRight ? -1 : 0, 0, 0)
    const upVector = new Vector3(0, moveUp ? 1 : moveDown ? -1 : 0, 0)
    
    direction
      .subVectors(frontVector, sideVector)
      .add(upVector)
      .normalize()
      .multiplyScalar(moveSpeed)
      .applyEuler(camera.rotation)
    
    // Apply movement with max speed limit and smoothing
    const currentVelocity = velocity.clone()
    
    // Only change velocity if there's input
    if (frontVector.length() > 0 || sideVector.length() > 0 || upVector.length() > 0) {
      // Apply smoothing factor for gradual acceleration
      const targetVelX = Math.max(Math.min(direction.x, maxVelocity), -maxVelocity)
      const targetVelY = Math.max(Math.min(direction.y, maxVelocity), -maxVelocity)
      const targetVelZ = Math.max(Math.min(direction.z, maxVelocity), -maxVelocity)
      
      // Blend current velocity with target velocity for smoother acceleration
      const newVelX = currentVelocity.x + (targetVelX - currentVelocity.x) * smoothFactor
      const newVelY = currentVelocity.y + (targetVelY - currentVelocity.y) * smoothFactor
      const newVelZ = currentVelocity.z + (targetVelZ - currentVelocity.z) * smoothFactor
      
      velocity.set(newVelX, newVelY, newVelZ)
    } else if (Math.abs(currentVelocity.x) > 0.1 || Math.abs(currentVelocity.y) > 0.1 || Math.abs(currentVelocity.z) > 0.1) {
      // Apply friction/deceleration when no input is given
      velocity.set(
        currentVelocity.x * frictionFactor,
        currentVelocity.y * frictionFactor,
        currentVelocity.z * frictionFactor
      )
    }

    // Apply velocity to camera position
    camera.position.add(velocity)
  })

  return (<>
      <PointerLockControls 
        ref={controlsRef}
        selector={isMobileDevice ? '#look-area' : undefined}
      />
      <HallOfPortals />
      {isMobileDevice && (
        <div id="look-area" style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          touchAction: 'none',
          zIndex: 999
        }} />
      )}
  </>)
})

PortalsStage.displayName = 'PortalsStage'

export default PortalsStage 


