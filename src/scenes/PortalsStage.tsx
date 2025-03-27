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

  // Mobile touch controls state
  const [touchMove, setTouchMove] = useState<{x: number, y: number}>({x: 0, y: 0})
  const [touchJump, setTouchJump] = useState(false)
  const joystickActive = useRef(false)
  const lastTouchPosition = useRef<{x: number, y: number}>({x: 0, y: 0})

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

  // Mobile touch controls setup
  useEffect(() => {
    if (!isMobileDevice) return
    
    const joystickContainer = document.getElementById('joystick-container')
    const jumpButton = document.getElementById('jump-button')
    
    if (!joystickContainer || !jumpButton) return
    
    // Joystick handlers
    const handleJoystickStart = (e: TouchEvent) => {
      joystickActive.current = true
      const touch = e.touches[0]
      const rect = joystickContainer.getBoundingClientRect()
      lastTouchPosition.current = {
        x: touch.clientX,
        y: touch.clientY
      }
      e.preventDefault()
    }
    
    const handleJoystickMove = (e: TouchEvent) => {
      if (!joystickActive.current) return
      const touch = e.touches[0]
      const rect = joystickContainer.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate joystick displacement
      const dx = (touch.clientX - centerX) / (rect.width / 2)
      const dy = (touch.clientY - centerY) / (rect.height / 2)
      
      // Normalize and clamp values to -1 to 1
      const magnitude = Math.sqrt(dx * dx + dy * dy)
      const normalizedX = magnitude > 1 ? dx / magnitude : dx
      const normalizedY = magnitude > 1 ? dy / magnitude : dy
      
      setTouchMove({
        x: normalizedX,
        y: normalizedY
      })
      
      e.preventDefault()
    }
    
    const handleJoystickEnd = (e: TouchEvent) => {
      joystickActive.current = false
      setTouchMove({x: 0, y: 0})
      e.preventDefault()
    }
    
    // Jump button handlers
    const handleJumpStart = (e: TouchEvent) => {
      setTouchJump(true)
      e.preventDefault()
    }
    
    const handleJumpEnd = (e: TouchEvent) => {
      setTouchJump(false)
      e.preventDefault()
    }
    
    // Add event listeners
    joystickContainer.addEventListener('touchstart', handleJoystickStart)
    joystickContainer.addEventListener('touchmove', handleJoystickMove)
    joystickContainer.addEventListener('touchend', handleJoystickEnd)
    joystickContainer.addEventListener('touchcancel', handleJoystickEnd)
    
    jumpButton.addEventListener('touchstart', handleJumpStart)
    jumpButton.addEventListener('touchend', handleJumpEnd)
    jumpButton.addEventListener('touchcancel', handleJumpEnd)
    
    // Cleanup
    return () => {
      joystickContainer.removeEventListener('touchstart', handleJoystickStart)
      joystickContainer.removeEventListener('touchmove', handleJoystickMove)
      joystickContainer.removeEventListener('touchend', handleJoystickEnd)
      joystickContainer.removeEventListener('touchcancel', handleJoystickEnd)
      
      jumpButton.removeEventListener('touchstart', handleJumpStart)
      jumpButton.removeEventListener('touchend', handleJumpEnd)
      jumpButton.removeEventListener('touchcancel', handleJumpEnd)
    }
  }, [isMobileDevice])

  // Handle movement
  useFrame(() => {
    if (!camera || !controlsRef.current) return

    // Calculate movement direction based on camera rotation
    const direction = new Vector3()
    let frontVector, sideVector, upVector

    if (isMobileDevice) {
      // Mobile controls
      frontVector = new Vector3(0, 0, touchMove.y)
      sideVector = new Vector3(-touchMove.x, 0, 0)
      upVector = new Vector3(0, touchJump ? 1 : 0, 0)
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

  return (<>
      <PointerLockControls 
        ref={controlsRef}
        selector={isMobileDevice ? '#look-area' : undefined}
      />
      <HallOfPortals />
  </>)
})

PortalsStage.displayName = 'PortalsStage'

export default PortalsStage 


