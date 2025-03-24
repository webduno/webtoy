"use client"
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { Object3D, Vector3, Mesh, MeshStandardMaterial } from 'three'
import { useKeyboardControls } from '@/hooks/useKeyboardControls'
import { Physics, useCylinder, useBox, usePlane, useSphere } from '@react-three/cannon'

// Add mobile detection helper
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  )
}

interface CanonPOVProps {
  position: [number, number, number]
  sceneObjects: Object3D[]
  onExit: () => void
}

export default function CanonPOV({ position, sceneObjects, onExit }: CanonPOVProps) {
  const [showControls, setShowControls] = useState(true)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  
  // Check if client is mobile on component mount
  useEffect(() => {
    setIsMobileDevice(isMobile())
  }, [])
  
  // Hide controls after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <Canvas camera={{ position: position, fov: 125 }} shadows>
        <Physics 
          gravity={[0, -30, 0]} 
          defaultContactMaterial={{ friction: 0.001, restitution: 0.2 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <PhysicsScene 
            position={position} 
            sceneObjects={sceneObjects} 
            onExit={onExit} 
            isMobile={isMobileDevice} 
          />
        </Physics>
      </Canvas>
      
      {/* Controls hint UI */}
      {showControls && !isMobileDevice && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          textAlign: 'center',
          zIndex: 1000
        }}>
          <p style={{ margin: '0' }}>WASD: Move | SPACE: Jump | ESC: Exit</p>
        </div>
      )}
      
      {/* Mobile Controls */}
      {isMobileDevice && (
        <>
          {/* Movement joystick */}
          <div id="joystick-container" style={{
            position: 'absolute',
            left: '30px',
            bottom: '30px',
            width: '120px',
            height: '120px',
            borderRadius: '60px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            touchAction: 'none',
            zIndex: 1000
          }} />
          
          {/* Jump button */}
          <div id="jump-button" style={{
            position: 'absolute',
            right: '30px',
            bottom: '30px',
            width: '80px',
            height: '80px',
            borderRadius: '40px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            touchAction: 'none',
            zIndex: 1000
          }}>
            JUMP
          </div>
          
          {/* Look area - for camera rotation */}
          <div id="look-area" style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            touchAction: 'none',
            zIndex: 999
          }} />
          
          {/* Exit button */}
          <div 
            onClick={onExit}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '5px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              zIndex: 1000,
              cursor: 'pointer'
            }}
          >
            EXIT
          </div>
        </>
      )}
    </div>
  )
}

interface PhysicsSceneProps extends CanonPOVProps {
  isMobile: boolean
}

function PhysicsScene({ position, sceneObjects, onExit, isMobile }: PhysicsSceneProps) {
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
    if (isMobile) return; // Skip ball throwing setup for mobile
    
    // For desktop, listen for clicks but don't disrupt pointer lock
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
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
      // if (currentPosition[0] < -15 || currentPosition[1] < -15 || currentPosition[2] < -15) {
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
                userData={obj.userData}
              />
            )
          }
          return null
        })}
      </>
    )
  }
  
  // Ground plane
  const Ground = () => {
    const [ref] = usePlane<Mesh>(() => ({ 
      rotation: [-Math.PI / 2, 0, 0], // Rotated to be horizontal
      position: [0, 0, 0],
      type: 'Static',
      material: { friction: 0.5 }
    }))
    
    return (
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
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
      {/* <Ground /> */}
      
      {/* Player hitbox visualization */}
      {/* <mesh ref={playerRef}>
        {showHitbox && isOnGround && (
          <cylinderGeometry args={[playerRadius/3, playerRadius/3, playerHeight / 5, 4]} />
        )}
        <meshStandardMaterial color="#000000" transparent opacity={0.15} wireframe />
      </mesh> */}
      
      {/* Ball - permanently shown once thrown */}
      {!isMobile && ballThrown && (
        <PhysicalBall 
          key="singleBall"
          position={ballProps.position} 
          velocity={ballProps.velocity} 
        />
      )}
    </>
  )
}

// Simple physical ball with cannon.js physics - stays in the world permanently
function PhysicalBall({ position, velocity }: { 
  position: [number, number, number], 
  velocity: [number, number, number]
}) {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 2,
    position: position,
    args: [0.1], // 10cm radius
    material: { restitution: 0.7, friction: 0.5 },
    linearDamping: 0.1,
    velocity: velocity
  }))
  
  // Use a ref to remember that this ball has already been initialized
  const isInitialized = useRef(false)
  
  // Only apply position and velocity on first render
  useEffect(() => {
    if (!isInitialized.current) {
      api.position.set(...position)
      api.velocity.set(...velocity)
      isInitialized.current = true
    }
  }, [api, position, velocity])
  
  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}

// Global storage for object physics state
const objectsPhysicsState = new Map();

// Generic physical box for scene objects
function PhysicalBox({ position, rotation, scale, geometry, material, userData }: any) {
  const meshRef = useRef<Mesh>(null)
  
  // Try to extract dimensions from geometry
  let boxSize: [number, number, number] = [1, 1, 1]
  
  // Ensure geometry has bounding box computed
  if (geometry && !geometry.boundingBox) {
    geometry.computeBoundingBox()
  }
  
  if (geometry?.parameters) {
    if (geometry.type === 'BoxGeometry') {
      boxSize = [
        geometry.parameters.width || 1,
        geometry.parameters.height || 1,
        geometry.parameters.depth || 1
      ]
    } else if (geometry.boundingBox) {
      // For other geometry types, use bounding box
      const box = geometry.boundingBox
      boxSize = [
        (box.max.x - box.min.x),
        (box.max.y - box.min.y),
        (box.max.z - box.min.z)
      ]
    }
  } else if (geometry?.boundingBox) {
    // Directly use boundingBox if parameters aren't available
    const box = geometry.boundingBox
    boxSize = [
      (box.max.x - box.min.x),
      (box.max.y - box.min.y),
      (box.max.z - box.min.z)
    ]
  }
  
  // Apply scale to box size
  const scaledSize: [number, number, number] = [
    boxSize[0] * Math.abs(scale[0]),
    boxSize[1] * Math.abs(scale[1]),
    boxSize[2] * Math.abs(scale[2])
  ]
  
  // Prevent zero-sized colliders which can cause physics glitches
  const finalSize: [number, number, number] = [
    Math.max(scaledSize[0], 0.01),
    Math.max(scaledSize[1], 0.01),
    Math.max(scaledSize[2], 0.01)
  ]
  
  // Check if the object has gravity enabled in userData
  const hasGravity = userData?.hasGravity || false;
  
  // Create a unique ID for this object based on its initial position
  // This helps us track it across re-renders
  const instanceId = useRef(`obj-${position[0]}-${position[1]}-${position[2]}`);
  
  // Apply userData to mesh ref after creation
  useEffect(() => {
    if (meshRef.current && userData) {
      meshRef.current.userData = { ...userData };
    }
  }, [userData]);
  
  const [boxRef, api] = useBox(() => ({
    args: finalSize,
    position: hasGravity && objectsPhysicsState.has(instanceId.current) 
      ? objectsPhysicsState.get(instanceId.current).position 
      : position,
    rotation: hasGravity && objectsPhysicsState.has(instanceId.current) && objectsPhysicsState.get(instanceId.current).rotation
      ? objectsPhysicsState.get(instanceId.current).rotation
      : rotation,
    type: hasGravity ? 'Dynamic' : 'Static',
    mass: hasGravity ? 5 : 0,
    material: { 
      friction: 0.5,
      restitution: hasGravity ? 0.4 : 0.1 // More bounce for gravity-enabled objects
    },
    linearDamping: hasGravity ? 0.2 : 0, // Add some air resistance for dynamic objects
    // Apply stored velocity for persistent objects
    velocity: hasGravity && objectsPhysicsState.has(instanceId.current) && objectsPhysicsState.get(instanceId.current).velocity
      ? objectsPhysicsState.get(instanceId.current).velocity 
      : [0, 0, 0]
  }), meshRef)
  
  // Track position for dynamic objects
  useEffect(() => {
    if (hasGravity && api) {
      // Subscribe to position updates for dynamic objects
      const unsubscribePos = api.position.subscribe((p) => {
        if (hasGravity) {
          const currentState = objectsPhysicsState.get(instanceId.current) || {};
          objectsPhysicsState.set(instanceId.current, {
            ...currentState,
            position: p
          });
        }
      });
      
      // Subscribe to velocity updates for dynamic objects
      const unsubscribeVel = api.velocity.subscribe((v) => {
        if (hasGravity) {
          const currentState = objectsPhysicsState.get(instanceId.current) || {};
          objectsPhysicsState.set(instanceId.current, {
            ...currentState,
            velocity: v
          });
        }
      });
      
      // Subscribe to rotation updates for dynamic objects
      const unsubscribeRot = api.rotation.subscribe((r) => {
        if (hasGravity) {
          const currentState = objectsPhysicsState.get(instanceId.current) || {};
          objectsPhysicsState.set(instanceId.current, {
            ...currentState,
            rotation: r
          });
        }
      });
      
      return () => {
        unsubscribePos();
        unsubscribeVel();
        unsubscribeRot();
      };
    }
  }, [api, hasGravity]);
  
  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={material}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    />
  )
}
