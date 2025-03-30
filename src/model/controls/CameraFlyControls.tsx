"use client"
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { PointerLockControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useKeyboardControls } from '@/scripts/hooks/useKeyboardControls'
import { isMobile } from '@/scripts/utils/mobileDetection'

interface CameraControlsProps {
  onPause?: () => void;
}

const CameraFlyControls = forwardRef<any, CameraControlsProps>(({ onPause }, ref) => {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const [velocity, setVelocity] = useState<Vector3>(new Vector3(0, 0, 0))
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const moveSpeed = 0.5
  const maxVelocity = 2
  const smoothFactor = 0.1
  const frictionFactor = 0.0

  // Mobile touch controls state
  const [isMoving, setIsMoving] = useState(false)
  const lastTouchPosition = useRef<{x: number, y: number}>({x: 0, y: 0})

  // Setup keyboard controls
  const { moveForward, moveBackward, moveLeft, moveRight } = useKeyboardControls()
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

  // Mobile touch controls setup
  useEffect(() => {
    if (!isMobileDevice) return
    
    const lookArea = document.getElementById('look-area')
    if (!lookArea) return

    let isDragging = false
    const dragThreshold = 5 // pixels

    // Look area handlers for camera rotation
    const handleLookStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      lastTouchPosition.current = {
        x: touch.clientX,
        y: touch.clientY
      }
      setIsMoving(true) // Start moving immediately on touch
      isDragging = false
      e.preventDefault()
    }
    
    const handleLookMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const dx = touch.clientX - lastTouchPosition.current.x
      const dy = touch.clientY - lastTouchPosition.current.y
      
      // Check if we're dragging (looking around) or just touching (moving forward)
      if (!isDragging && (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold)) {
        isDragging = true
      }
      
      if (isDragging && camera) {
        // Rotate camera based on touch movement
        camera.rotation.y -= dx * 0.01
        camera.position.y -= dy * 0.01
      }
      
      lastTouchPosition.current = {
        x: touch.clientX,
        y: touch.clientY
      }
      
      e.preventDefault()
    }

    const handleLookEnd = (e: TouchEvent) => {
      setIsMoving(false)
      isDragging = false
      e.preventDefault()
    }
    
    // Add event listeners
    lookArea.addEventListener('touchstart', handleLookStart)
    lookArea.addEventListener('touchmove', handleLookMove)
    lookArea.addEventListener('touchend', handleLookEnd)
    lookArea.addEventListener('touchcancel', handleLookEnd)
    
    // Cleanup
    return () => {
      lookArea.removeEventListener('touchstart', handleLookStart)
      lookArea.removeEventListener('touchmove', handleLookMove)
      lookArea.removeEventListener('touchend', handleLookEnd)
      lookArea.removeEventListener('touchcancel', handleLookEnd)
    }
  }, [isMobileDevice, camera])

  // Handle movement
  useFrame(() => {
    if (!camera || !controlsRef.current || isPaused) return

    // Calculate movement direction based on camera rotation
    const direction = new Vector3()
    let frontVector, sideVector, upVector

    if (isMobileDevice) {
      // Mobile controls - move forward when touching screen
      frontVector = new Vector3(0, 0, isMoving ? -1 : 0)
      sideVector = new Vector3(0, 0, 0)
      upVector = new Vector3(0, 0, 0)
    } else {
      // Desktop controls
      frontVector = new Vector3(0, 0, moveBackward ? 1 : moveForward ? -1 : 0)
      sideVector = new Vector3(moveLeft ? 1 : moveRight ? -1 : 0, 0, 0)
      upVector = new Vector3(0, moveUp ? 1 : moveDown ? -1 : 0, 0)
    }
    
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

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    pause: () => {
      setIsPaused(true)
      onPause?.()
    },
    resume: () => setIsPaused(false)
  }))

  return (
    <PointerLockControls 
      ref={controlsRef}
      selector={isMobileDevice ? '#look-area' : undefined}
    />
  )
})

CameraFlyControls.displayName = 'CameraFlyControls'

export default CameraFlyControls 