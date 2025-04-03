import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { Object3D, Vector3, Mesh } from 'three'
import { useKeyboardControls } from '@/scripts/hooks/useKeyboardControls'
import { Physics, useCylinder, usePlane } from '@react-three/cannon'
import { PhysicalBall, PhysicalBox } from './PhysicalObjects'
import { PhysicsSceneProps } from '@/scripts/types/canonPOV'

// Define the position type
type Position = [number, number, number];

// Move SceneObjects outside the main component
const SceneObjects = ({ sceneObjects, isMobile }: { sceneObjects: Object3D[], isMobile: boolean }) => {
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

export function PhysicsScene({ 
  position, 
  sceneObjects, 
  onExit, 
  isMobile, 
  ballCount,
  playerHeight = 0.3,
  playerRadius = 0.1,
  moveSpeed = 5,
  jumpForce = 500,
  maxVelocity = 30,
  onPositionChange
}: PhysicsSceneProps & { onPositionChange?: (position: Position) => void }) {
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const [isLocked, setIsLocked] = useState(false)
  const [showHitbox, setShowHitbox] = useState(true)
  const [isOnGround, setIsOnGround] = useState(false)
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState<Position>(position); // Initialize with start position
  
  // Multiple balls state
  const [balls, setBalls] = useState<Array<{
    position: [number, number, number],
    velocity: [number, number, number],
    id: number
  }>>([])
  const [remainingBalls, setRemainingBalls] = useState(ballCount)
  
  // Track if click was handled to prevent double firing
  const clickHandled = useRef(false)
  
  // Mobile touch controls state
  const [touchMove, setTouchMove] = useState<{x: number, y: number}>({x: 0, y: 0})
  const [touchJump, setTouchJump] = useState(false)
  const [touchLook, setTouchLook] = useState<{x: number, y: number}>({x: 0, y: 0})
  const joystickActive = useRef(false)
  const lastTouchPosition = useRef<{x: number, y: number}>({x: 0, y: 0})
  
  // Player physics properties are now passed as props with defaults
  
  // Define maximum climb angle (e.g., 45 degrees)
  const maxClimbAngle = Math.PI / 4; 
  const minGroundNormalY = Math.cos(maxClimbAngle); // Minimum Y component for a walkable normal

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
        const contactNormal = e.contact.ni;
        
        // Check if the collision is with a surface below the player
        // that is flat enough to be considered ground.
        if (contactNormal[1] > minGroundNormalY) {
          // console.log(`PhysicsScene: Ground contact detected. Normal Y: ${contactNormal[1].toFixed(3)} > ${minGroundNormalY.toFixed(3)}`); // Optional Debug
          setIsOnGround(true);
        } else {
          // Optional: If colliding with something below that's too steep, 
          // ensure we know we aren't grounded, although gravity should handle sliding.
          // if (contactNormal[1] > 0) { // Check if it's generally below
          //   setIsOnGround(false);
          // }
        }
        
        // Keep the side collision check as is for now, as it helps with stairs/small obstacles
        // This allows jumping even if the main ground check fails, provided we're near the initial height.
        if (Math.abs(contactNormal[1]) < 0.25 && 
            (Math.abs(contactNormal[0]) > 0.5 || 
             Math.abs(contactNormal[2]) > 0.5)) {
          const currentPos = e.body?.position;
          const posY = Array.isArray(currentPos) ? currentPos[1] || 0 : currentPos?.y || 0;  
          if (posY < position[1] + 0.5) { 
            // console.log("PhysicsScene: Side contact near ground detected, allowing jump."); // Optional Debug
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
    // console.log('joystickContainer', joystickContainer)
    // console.log('jumpButton', jumpButton)
    // console.log('lookArea', lookArea)
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
      // console.log('handleLockChangehandleLockChange', )
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
    // Check if we have any balls remaining
    if (remainingBalls <= 0) return;
    
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
    
    // Create new ball with unique ID
    const newBall = {
      position: initialPos,
      velocity: initialVel,
      id: Date.now() // Use timestamp as unique ID
    }
    
    // Add new ball to state and decrease remaining count
    setBalls(prevBalls => [...prevBalls, newBall])
    setRemainingBalls(prev => prev - 1)
  }
  
  // Simple click handler
  const handleClick = () => {
    if (isLocked && remainingBalls > 0 && !clickHandled.current) {
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
        if (remainingBalls > 0 && !clickHandled.current) {
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
  }, [isMobile, isLocked, remainingBalls])
  
  // Connect player mesh to camera
  useEffect(() => {
    if (playerRef.current && camera) {
      // console.log("PhysicsScene: Setting up direct camera position subscription."); // CLEANED
      const unsubscribePos = playerApi.position.subscribe((pos) => {
        // const timeNow = performance.now(); // CLEANED
        // --- DEBUG: Log position update from physics engine --- 
        // console.log(`PhysicsScene Pos Sub [${timeNow.toFixed(2)}]: Received physics pos: [${pos.map(p=>p.toFixed(3)).join(',')}]`); // CLEANED
        // --- END DEBUG ---
        
        // Ensure there's no lerp here - direct set:
        camera.position.set(pos[0], pos[1] + playerHeight * 0.75, pos[2])
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
      
      return () => {
        // console.log("PhysicsScene: Cleaning up direct camera position subscription."); // CLEANED
        unsubscribePos(); 
        clearInterval(interval); // Clear existing interval
      }
    }
  }, [camera, playerApi, playerHeight])
  
  // Track velocity for jump mechanics
  const velocityRef = useRef<[number, number, number]>([0, 0, 0])
  const positionRef = useRef<Position>(position); // Ensure positionRef starts with initial position
  useEffect(() => {
    // Subscribe to velocity changes for jump detection
    const unsubscribeVel = playerApi.velocity.subscribe((v) => {
      // --- DEBUG: Log velocity updates from subscription --- 
      if (Math.abs(v[0]) > 0.01 || Math.abs(v[1]) > 0.01 || Math.abs(v[2]) > 0.01) { // Log only if non-zero
        // console.log(`PhysicsScene: Velocity Subscription Update - x: ${v[0].toFixed(2)}, y: ${v[1].toFixed(2)}, z: ${v[2].toFixed(2)}`);
      }
      // --- END DEBUG ---
      velocityRef.current = v
    })
    
    // Subscribe to position changes to detect reset condition
    const unsubscribePos = playerApi.position.subscribe((p) => {
      positionRef.current = p
    })
    
    return () => {
        unsubscribeVel();
        unsubscribePos();
    }
  }, [playerApi])
  
  // Effect to call the callback when position changes
  useEffect(() => {
    if (onPositionChange) {
      // --- DEBUG: Log position being sent by the effect --- 
      // console.log(`PhysicsScene Effect: Calling onPositionChange with state:`, JSON.stringify(currentPlayerPosition));
      // --- END DEBUG ---
      onPositionChange(currentPlayerPosition);
    }
  }, [currentPlayerPosition, onPositionChange]);
  
  // Physics and Rendering loop
  useFrame((state, delta) => {
    // --- DEBUG: Log velocity at start of frame --- 
    // console.log(`PhysicsScene: Start of Frame - Velocity Ref: x: ${velocityRef.current[0].toFixed(2)}, y: ${velocityRef.current[1].toFixed(2)}, z: ${velocityRef.current[2].toFixed(2)}`);
    // --- END DEBUG ---

    if (!playerRef.current) {
      // console.log("PhysicsScene: playerRef.current is null");
      return;
    }
    // Update currentPlayerPosition state based on physics subscription ref
    const newPosition = positionRef.current; // <-- USE positionRef FROM SUBSCRIPTION
    
    // --- DEBUG: Log values before comparison ---
    const statePos = currentPlayerPosition;
    const diffX = Math.abs(newPosition[0] - statePos[0]);
    const diffY = Math.abs(newPosition[1] - statePos[1]);
    const diffZ = Math.abs(newPosition[2] - statePos[2]);
    if (diffX > 1e-6 || diffY > 1e-6 || diffZ > 1e-6) {
        // console.log(`PhysicsScene Compare: State=[${statePos.map(p=>p.toFixed(3)).join(',')}] PhysicsRef=[${newPosition.map(p=>p.toFixed(3)).join(',')}] Diffs=(${diffX.toFixed(3)}, ${diffY.toFixed(3)}, ${diffZ.toFixed(3)})`); // Changed log label
    }
    // --- END DEBUG ---

    if (diffX > 0.01 || diffY > 0.01 || diffZ > 0.01) {
      // --- DEBUG: Log inside the state update condition --- 
      // console.log(`PhysicsScene useFrame: Position changed! Current state: ${JSON.stringify(currentPlayerPosition)}, New position from ref: ${JSON.stringify(newPosition)}`); // Changed log label
      // console.log(`PhysicsScene useFrame: Calling setCurrentPlayerPosition with new position.`);
      // --- END DEBUG ---
      setCurrentPlayerPosition(newPosition);
    }

    // Calculate movement direction based on camera orientation
    const cameraDirection = new Vector3()
    camera.getWorldDirection(cameraDirection)
    cameraDirection.y = 0 // Keep movement horizontal
    cameraDirection.normalize()
    
    const cameraRight = new Vector3()
    cameraRight.crossVectors(camera.up, cameraDirection).normalize().negate() // Negate because cross(up, forward) points left
    
    // Determine movement intent from controls
    let inputX = 0
    let inputZ = 0
    
    if (isMobile) {
      inputX = touchMove.x
      inputZ = touchMove.y // Forward/backward from joystick Y
    } else {
      inputX = (moveRight ? 1 : 0) - (moveLeft ? 1 : 0)
      inputZ = (moveForward ? 1 : 0) - (moveBackward ? 1 : 0) // Forward is +1, Backward is -1
    }
    
    // --- DEBUG --- 
    if(inputX !== 0 || inputZ !== 0) {
      // console.log(`PhysicsScene: Controls Input - inputX: ${inputX}, inputZ: ${inputZ}`);
    }
    // --- END DEBUG ---
    
    // Combine movement directions: Scale camera vectors by input
    const moveDirection = new Vector3()
    const forwardMovement = cameraDirection.clone().multiplyScalar(inputZ);
    const sidewaysMovement = cameraRight.clone().multiplyScalar(inputX);
    moveDirection.add(forwardMovement).add(sidewaysMovement);
    
    // Normalize only if there is movement to prevent normalizing a zero vector
    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize()
    }

    // --- DEBUG --- 
    if(inputX !== 0 || inputZ !== 0) {
        // console.log(`PhysicsScene: Move Direction - x: ${moveDirection.x.toFixed(2)}, y: ${moveDirection.y.toFixed(2)}, z: ${moveDirection.z.toFixed(2)}`);
    }
    // --- END DEBUG ---
    
    // Calculate TARGET velocity directly from input direction and moveSpeed
    // No delta here, as we want the target speed instantly.
    const targetHorizontalVelocity = moveDirection.multiplyScalar(moveSpeed);

    // Get current vertical velocity from the physics engine (ref)
    const currentVerticalVelocity = velocityRef.current[1];
    
    // Construct the final target velocity vector
    let targetVelocity = new Vector3(
        targetHorizontalVelocity.x,
        currentVerticalVelocity, // Preserve gravity/jump velocity
        targetHorizontalVelocity.z
    );

    // --- DEBUG --- 
    // if(targetHorizontalVelocity.lengthSq() > 0.001) { // Log only if attempting to move
    //     console.log(`PhysicsScene: Target Velocity (Direct) - x: ${targetVelocity.x.toFixed(2)}, y: ${targetVelocity.y.toFixed(2)}, z: ${targetVelocity.z.toFixed(2)}`);
    // }
    // --- END DEBUG ---

    // Clamp horizontal velocity to maxVelocity
    const horizontalMagnitudeSq = targetVelocity.x * targetVelocity.x + targetVelocity.z * targetVelocity.z;
    if (horizontalMagnitudeSq > maxVelocity * maxVelocity) {
      const horizontalMagnitude = Math.sqrt(horizontalMagnitudeSq);
      targetVelocity.x = (targetVelocity.x / horizontalMagnitude) * maxVelocity;
      targetVelocity.z = (targetVelocity.z / horizontalMagnitude) * maxVelocity;
      // Keep targetVelocity.y as is (currentVerticalVelocity)
    }
    
    // Apply the calculated target velocity DIRECTLY to the player
    playerApi.velocity.set(targetVelocity.x, targetVelocity.y, targetVelocity.z)
    
    // Handle jumping
    const isTryingToJump = isMobile ? touchJump : jump
    // --- DEBUG --- 
    if (isTryingToJump) {
      // console.log(`PhysicsScene: Jump Attempt - isOnGround: ${isOnGround}`);
    }
    // --- END DEBUG ---
    if (isTryingToJump && isOnGround) {
      // console.log("PhysicsScene: Applying Jump Impulse"); // --- DEBUG ---
      playerApi.applyImpulse([0, jumpForce, 0], [0, 0, 0])
      setIsOnGround(false) // Prevent multi-jump
    }

    // Handle exit via ESC key for non-mobile
    if (!isMobile && controlsRef.current && !controlsRef.current.isLocked) {
      // If pointer lock is lost (e.g., ESC pressed), call onExit
      // onExit()
    }
  })
  
  // Reset balls when component unmounts or onExit is called
  useEffect(() => {
    return () => {
      setBalls([])
      setRemainingBalls(ballCount)
    }
  }, [ballCount])
  
  return (
    <>
      {/* Render PointerLockControls for non-mobile, attach ref */}
      {!isMobile && (
        <PointerLockControls ref={controlsRef} onLock={() => setIsLocked(true)} onUnlock={() => setIsLocked(false)} />
      )}
      
      {/* {showHitbox && playerRef.current && (
        <mesh position={currentPlayerPosition}>
          <cylinderGeometry args={[playerRadius, playerRadius, playerHeight, 16]} />
          <meshBasicMaterial color="lime" wireframe />
        </mesh>
      )} */}

      <SceneObjects sceneObjects={sceneObjects} isMobile={isMobile} />
      
      {balls.map((ball) => (
        <PhysicalBall 
          key={ball.id}
          position={ball.position} 
          velocity={ball.velocity} 
        />
      ))}
    </>
  )
} 