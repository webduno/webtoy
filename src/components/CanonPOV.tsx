"use client"
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { Object3D, Vector3, Mesh, MeshStandardMaterial } from 'three'
import { useKeyboardControls } from '@/hooks/useKeyboardControls'
import { Physics, useCylinder, useBox, usePlane } from '@react-three/cannon'

interface CanonPOVProps {
  position: [number, number, number]
  sceneObjects: Object3D[]
  onExit: () => void
}

export default function CanonPOV({ position, sceneObjects, onExit }: CanonPOVProps) {
  const [showControls, setShowControls] = useState(true)
  
  // Hide controls after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <Canvas camera={{ position: position, fov: 75 }}>
        <Physics 
          gravity={[0, -30, 0]} 
          defaultContactMaterial={{ friction: 0, restitution: 0.2 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <PhysicsScene position={position} sceneObjects={sceneObjects} onExit={onExit} />
        </Physics>
      </Canvas>
      
      {/* Controls hint UI */}
      {showControls && (
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
    </div>
  )
}

function PhysicsScene({ position, sceneObjects, onExit }: CanonPOVProps) {
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const [isLocked, setIsLocked] = useState(false)
  const [showHitbox, setShowHitbox] = useState(true)
  const [isOnGround, setIsOnGround] = useState(false)
  
  // Player physics properties
  const playerHeight = 0.5
  const playerRadius = 0.1
  const moveSpeed = 5
  const jumpForce = 5
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
  
  // Setup keyboard controls
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboardControls()
  
  // Set initial player position
  useEffect(() => {
    if (camera) {
      camera.position.set(position[0] || 0, position[1] + playerHeight || 0, position[2] || 0)
    }
  }, [camera, position, playerHeight])
  
  // Handle pointer lock change
  useEffect(() => {
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
  }, [onExit])
  
  // Connect player mesh to camera
  useEffect(() => {
    if (playerRef.current) {
      // Add a listener to update the camera position based on the player physics body
      playerApi.position.subscribe((pos) => {
        if (camera) {
          // Set camera position with an offset for eye level (top of cylinder)
          camera.position.set(pos[0], pos[1] + playerHeight/2, pos[2])
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
  useEffect(() => {
    // Subscribe to velocity changes for jump detection
    playerApi.velocity.subscribe((v) => {
      velocityRef.current = v
    })
  }, [playerApi])
  
  // Player movement using physics
  useFrame(() => {
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
    
    // If falling, we're definitely not on ground
    if (currentVelocity[1] < -0.1) {
      setIsOnGround(false)
    }
    
    // Escape key handling is already managed by PointerLockControls
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
                scale={meshScale.map(s => s * 1.1 || 1)}
                geometry={obj.geometry}
                material={obj.material}
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
      <PointerLockControls ref={controlsRef} />
      <SceneObjects />
      {/* <Ground /> */}
      
      {/* Player hitbox visualization */}
      <mesh ref={playerRef}>
        {showHitbox && (
          <cylinderGeometry args={[playerRadius, playerRadius, playerHeight, 16]} />
        )}
        <meshStandardMaterial color="#00ff00" transparent opacity={0.5} wireframe />
      </mesh>
    </>
  )
}

// Generic physical box for scene objects
function PhysicalBox({ position, rotation, scale, geometry, material }: any) {
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
  
  const [boxRef] = useBox(() => ({
    args: finalSize,
    position: position,
    rotation: rotation,
    type: 'Static',
    material: { friction: 0.5 },
  }), meshRef)
  
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
