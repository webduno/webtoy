import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { Object3D, Vector3, Mesh } from 'three'
import { useKeyboardControls } from '@/hooks/useKeyboardControls'
import { Physics, useCylinder, usePlane } from '@react-three/cannon'
import { PhysicalBall, PhysicalBox } from './PhysicalObjects'
import { PhysicsSceneProps } from '@/types/canonPOV'

export function PhysicsScene({ position, sceneObjects, onExit, isMobile }: PhysicsSceneProps) {
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const [isLocked, setIsLocked] = useState(false)
  const [showHitbox, setShowHitbox] = useState(true)
  const [isOnGround, setIsOnGround] = useState(false)
  
  // Single ball state - only one ball total
  const [ballThrown, setBallThrown] = useState(false)
  const [ballProps, setBallProps] = useState<{
    position: [number, number, number],
    velocity: [number, number, number]
  }>({
    position: [0, 0, 0],
    velocity: [0, 0, 0]
  })
  // Add a ref to store the ball's physics API
  const ballApiRef = useRef<any>(null)
  
  // Track if click was handled to prevent double firing
  const clickHandled = useRef(false)
  
  // Mobile touch controls state
  const [touchMove, setTouchMove] = useState<{x: number, y: number}>({x: 0, y: 0})
  const [touchJump, setTouchJump] = useState(false)
  const [touchLook, setTouchLook] = useState<{x: number, y: number}>({x: 0, y: 0})
  const joystickActive = useRef(false)
  const lastTouchPosition = useRef<{x: number, y: number}>({x: 0, y: 0})
  
  // Player physics properties
  const playerHeight = 0.3
  const playerRadius = 0.1
  const moveSpeed = 5
  const jumpForce = 7
  const maxVelocity = 30 // Increased max horizontal velocity
  
  // Use Cannon.js cylinder for player physics
  const [playerRef, playerApi] = useCylinder(
    () => ({
      mass: 75, // kg
      position: [position[0], position[1] + playerHeight / 2, position[2]],
      args: [playerRadius, playerRadius, playerHeight, 16],
      fixedRotation: true, // Prevent the player from tipping over
      linearDamping: 0, // No resistance to movement
      material: 'player',
      onCollide: (e) => {
        // Check if collision is with ground or other objects below player
        const contactNormal = e.contact.ni;
        
        // If the normal's Y component is positive, we're hitting something from below
        // which means we're standing on it
        if (contactNormal[1] > 0.5) {
          setIsOnGround(true);
        }
        
        // We also check for side collisions which could be stairs or slopes
        // where the player can still jump from
        if (Math.abs(contactNormal[1]) < 0.25 && 
            (Math.abs(contactNormal[0]) > 0.5 || 
             Math.abs(contactNormal[2]) > 0.5)) {
          // Check if we're near the ground by casting a short ray downward
          const currentPos = e.body?.position;
          // Handle both array and Vector3 type cases
          const posY = Array.isArray(currentPos) ? currentPos[1] || 0 : currentPos?.y || 0;  
          if (posY < position[1] + 0.5) { // If we're close to initial height or lower
            setIsOnGround(true);
          }
        }
      }
    }),
    useRef<Mesh>(null)
  )
  
  // Setup keyboard controls for non-mobile
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboardControls()
  
  // Set initial player position
  useEffect(() => {
    if (camera) {
      camera.position.set(position[0] || 0, position[1] + playerHeight || 0, position[2] || 0)
      
      // Lock camera rotation to only horizontal movement
      camera.rotation.x = 0
      camera.rotation.z = 0
    }
  }, [camera, position, playerHeight])
  
  // Mobile touch controls setup
  useEffect(() => {
    if (!isMobile) return
    
    const joystickContainer = document.getElementById('joystick-container')
    const jumpButton = document.getElementById('jump-button')
    const lookArea = document.getElementById('look-area')
    
    if (!joystickContainer || !jumpButton || !lookArea) return
    
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
    
    // Look area handlers for camera rotation
    const handleLookStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      lastTouchPosition.current = {
        x: touch.clientX,
        y: touch.clientY
      }
      e.preventDefault()
    }
    
    const handleLookMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const dx = (touch.clientX - lastTouchPosition.current.x) * 0.01
      
      if (camera) {
        // Only allow horizontal rotation (y-axis)
        camera.rotation.y -= dx
        
        // Lock vertical rotation and prevent dutch angles
        camera.rotation.x = 0
        camera.rotation.z = 0
      }
      
      lastTouchPosition.current = {
        x: touch.clientX,
        y: touch.clientY
      }
      
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
    
    lookArea.addEventListener('touchstart', handleLookStart)
    lookArea.addEventListener('touchmove', handleLookMove)
    
    // Cleanup
    return () => {
      joystickContainer.removeEventListener('touchstart', handleJoystickStart)
      joystickContainer.removeEventListener('touchmove', handleJoystickMove)
      joystickContainer.removeEventListener('touchend', handleJoystickEnd)
      joystickContainer.removeEventListener('touchcancel', handleJoystickEnd)
      
      jumpButton.removeEventListener('touchstart', handleJumpStart)
      jumpButton.removeEventListener('touchend', handleJumpEnd)
      jumpButton.removeEventListener('touchcancel', handleJumpEnd)
      
      lookArea.removeEventListener('touchstart', handleLookStart)
      lookArea.removeEventListener('touchmove', handleLookMove)
    }
  }, [isMobile, camera])
  
  // Handle pointer lock change for desktop mode
  useEffect(() => {
    if (isMobile) return // Skip for mobile
    
    const handleLockChange = () => {
      if (document.pointerLockElement) {
        setIsLocked(true)
      } else {
        setIsLocked(false)
        onExit()
      }
    }
    
    document.addEventListener('pointerlockchange', handleLockChange)
    
    return () => {
      document.removeEventListener('pointerlockchange', handleLockChange)
    }
  }, [onExit, isMobile])
  
  // Simplified throw ball function
  const throwBall = () => {
    // Only allow one ball ever
    if (ballThrown) return;
    
    // Get current camera position and direction
    const cameraDirection = new Vector3(0, 0, -1)
    cameraDirection.applyQuaternion(camera.quaternion)
    cameraDirection.normalize() // Make sure it's a unit vector
    
    // Set initial ball position slightly in front of camera
    const cameraPos = camera.position.clone()
    const initialPos: [number, number, number] = [
      cameraPos.x + cameraDirection.x * 0.5,
      cameraPos.y + cameraDirection.y * 0.5, 
      cameraPos.z + cameraDirection.z * 0.5
    ]
    
    // Calculate initial velocity - 20 units/s in camera direction
    const throwForce = 20
    const initialVel: [number, number, number] = [
      cameraDirection.x * throwForce,
      cameraDirection.y * throwForce,
      cameraDirection.z * throwForce
    ]
    
    // Update ball properties
    setBallProps({
      position: initialPos,
      velocity: initialVel
    })
    
    // Mark ball as thrown permanently
    setBallThrown(true)
  }
  
  // Simple click handler
  const handleClick = () => {
    if (isLocked && !ballThrown && !clickHandled.current) {
      clickHandled.current = true;
      throwBall();
      // Reset the click handler flag after a short delay
      setTimeout(() => {
        clickHandled.current = false;
      }, 500);
    }
  }
  
  // Handle click for desktop mode
  useEffect(() => {
    if (isMobile) {
      // For mobile, we'll use the throw button
      const throwButton = document.getElementById('throw-button')
      if (!throwButton) return
      
      const handleThrow = () => {
        if (!ballThrown && !clickHandled.current) {
          clickHandled.current = true;
          throwBall();
          // Reset the click handler flag after a short delay
          setTimeout(() => {
            clickHandled.current = false;
          }, 500);
        }
      }
      
      throwButton.addEventListener('touchstart', handleThrow)
      return () => {
        throwButton.removeEventListener('touchstart', handleThrow)
      }
    } else {
      // For desktop, listen for clicks but don't disrupt pointer lock
      window.addEventListener('click', handleClick)
      return () => {
        window.removeEventListener('click', handleClick)
      }
    }
  }, [isMobile, isLocked, ballThrown])
  
  // Connect player mesh to camera
  useEffect(() => {
    if (playerRef.current) {
      // Add a listener to update the camera position based on the player physics body
      playerApi.position.subscribe((pos) => {
        if (camera) {
          // Set camera position with an offset for eye level (top of cylinder)
          camera.position.set(pos[0], pos[1] + (playerHeight/1.1), pos[2])
        }
      })
      
      // Reset falling state detection for more reliable ground detection
      const interval = setInterval(() => {
        // Use current velocity reference instead of the get method
        const velocity = velocityRef.current;
        // If we're falling significantly, definitely not on ground
        if (velocity[1] < -2) {
          setIsOnGround(false);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [camera, playerApi, playerHeight])
  
  // Track velocity for jump mechanics
  const velocityRef = useRef<[number, number, number]>([0, 0, 0])
  const positionRef = useRef<[number, number, number]>([position[0], position[1], position[2]])
  useEffect(() => {
    // Subscribe to velocity changes for jump detection
    playerApi.velocity.subscribe((v) => {
      velocityRef.current = v
    })
    
    // Subscribe to position changes to detect reset condition
    playerApi.position.subscribe((p) => {
      positionRef.current = p
    })
  }, [playerApi])
  
  // Player movement using physics
  useFrame(() => {
    // Reset position if player falls below -15 on any axis
    const currentPosition = positionRef.current
    if (currentPosition[1] < -15) {
      // Reset to initial position
      playerApi.position.set(position[0], position[1] + playerHeight / 2, position[2])
      playerApi.velocity.set(0, 0, 0)
    }
    
    if (isMobile) {
      // Mobile controls logic
      const direction = new Vector3()
      
      // Use joystick input for movement direction
      const frontVector = new Vector3(0, 0, touchMove.y)
      const sideVector = new Vector3(-touchMove.x, 0, 0)
      
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(moveSpeed)
        .applyEuler(camera.rotation)
      
      const currentVelocity = velocityRef.current
      
      // Only change velocity if there's input
      if (Math.abs(touchMove.x) > 0.1 || Math.abs(touchMove.y) > 0.1) {
        // Apply smoothing factor for gradual acceleration
        const smoothFactor = 0.3 // Increased for faster acceleration
        const targetVelX = Math.max(Math.min(direction.x, maxVelocity), -maxVelocity)
        const targetVelZ = Math.max(Math.min(direction.z, maxVelocity), -maxVelocity)
        
        // Blend current velocity with target velocity for smoother acceleration
        const newVelX = currentVelocity[0] + (targetVelX - currentVelocity[0]) * smoothFactor
        const newVelZ = currentVelocity[2] + (targetVelZ - currentVelocity[2]) * smoothFactor
        
        playerApi.velocity.set(newVelX, currentVelocity[1], newVelZ)
      } else if (Math.abs(currentVelocity[0]) > 0.1 || Math.abs(currentVelocity[2]) > 0.1) {
        // Apply friction/deceleration when no input is given
        const frictionFactor = 0.5 // Almost no deceleration
        playerApi.velocity.set(
          currentVelocity[0] * frictionFactor,
          currentVelocity[1],
          currentVelocity[2] * frictionFactor
        )
      }
      
      // Handle jumping with touch button
      if (touchJump && isOnGround) {
        playerApi.velocity.set(currentVelocity[0], jumpForce, currentVelocity[2])
        setIsOnGround(false)
      }
    } else {
      // Desktop controls logic
      if (!isLocked || !controlsRef.current) return
      
      // Calculate movement direction based on camera rotation
      const direction = new Vector3()
      const frontVector = new Vector3(0, 0, moveBackward ? 1 : moveForward ? -1 : 0)
      const sideVector = new Vector3(moveLeft ? 1 : moveRight ? -1 : 0, 0, 0)
      
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(moveSpeed)
        .applyEuler(camera.rotation)
      
      // Apply horizontal movement with max speed limit and smoothing
      const currentVelocity = velocityRef.current
      
      // Only change velocity if there's input
      if (frontVector.length() > 0 || sideVector.length() > 0) {
        // Apply smoothing factor for gradual acceleration
        const smoothFactor = 0.3 // Increased for faster acceleration
        const targetVelX = Math.max(Math.min(direction.x, maxVelocity), -maxVelocity)
        const targetVelZ = Math.max(Math.min(direction.z, maxVelocity), -maxVelocity)
        
        // Blend current velocity with target velocity for smoother acceleration
        const newVelX = currentVelocity[0] + (targetVelX - currentVelocity[0]) * smoothFactor
        const newVelZ = currentVelocity[2] + (targetVelZ - currentVelocity[2]) * smoothFactor
        
        playerApi.velocity.set(newVelX, currentVelocity[1], newVelZ)
      } else if (Math.abs(currentVelocity[0]) > 0.1 || Math.abs(currentVelocity[2]) > 0.1) {
        // Apply friction/deceleration when no input is given
        const frictionFactor = 0.5 // Almost no deceleration
        playerApi.velocity.set(
          currentVelocity[0] * frictionFactor,
          currentVelocity[1],
          currentVelocity[2] * frictionFactor
        )
      }
      
      // Handle jumping - check if on ground using collision detection
      if (jump && isOnGround) {
        playerApi.velocity.set(currentVelocity[0], jumpForce, currentVelocity[2])
        setIsOnGround(false)
      }
    }
    
    // If falling, we're definitely not on ground
    if (velocityRef.current[1] < -0.1) {
      setIsOnGround(false)
    }
  })
  
  // Create physical objects from scene objects
  const SceneObjects = () => {
    return (
      <>
        {sceneObjects.map((obj, index) => {
          if (obj instanceof Mesh) {
            // Extract mesh position, rotation and scale
            const meshPosition: [number, number, number] = [
              obj.position.x,
              obj.position.y,
              obj.position.z
            ]
            
            const meshRotation: [number, number, number] = [
              obj.rotation.x,
              obj.rotation.y,
              obj.rotation.z
            ]
            
            const meshScale: [number, number, number] = [
              obj.scale.x || 1,
              obj.scale.y || 1,
              obj.scale.z || 1,
            ]
            
            return (
              <PhysicalBox
                key={index}
                position={meshPosition}
                rotation={meshRotation}
                scale={meshScale}
                geometry={obj.geometry}
                material={obj.material}
                userData={{ ...obj.userData, hasGravity: obj.userData?.hasGravity && !isMobile }}
              />
            )
          }
          return null
        })}
      </>
    )
  }
  
  return (
    <>
      {!isMobile && (
        <PointerLockControls 
          ref={controlsRef}
          // Vertical rotation enabled for desktop
        />
      )}
      <SceneObjects />
      
      {/* Ball - permanently shown once thrown */}
      {ballThrown && (
        <PhysicalBall 
          key="singleBall"
          position={ballProps.position} 
          velocity={ballProps.velocity} 
        />
      )}
    </>
  )
} 