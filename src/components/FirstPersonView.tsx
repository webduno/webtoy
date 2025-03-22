"use client"
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls, Box, Cylinder } from '@react-three/drei'
import { Object3D, Vector3, Raycaster, Mesh, Group } from 'three'
import { useKeyboardControls } from '@/hooks/useKeyboardControls'

interface FirstPersonViewProps {
  position: [number, number, number]
  sceneObjects: Object3D[]
  onExit: () => void
}

export default function FirstPersonView({ position, sceneObjects, onExit }: FirstPersonViewProps) {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <Canvas camera={{ position: position, fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <GameScene position={position} sceneObjects={sceneObjects} onExit={onExit} />
      </Canvas>
    </div>
  )
}

function GameScene({ position, sceneObjects, onExit }: FirstPersonViewProps) {
  const controlsRef = useRef<any>(null)
  const sceneRef = useRef<Group>(null)
  const hitboxRef = useRef<Mesh>(null)
  const { camera, scene } = useThree()
  const [velocity, setVelocity] = useState<Vector3>(new Vector3(0, 0, 0))
  const [isLocked, setIsLocked] = useState(false)
  
  // Setup physics properties
  const playerHeight = 1.8
  const playerRadius = 0.5
  const gravity = -9.8
  const jumpForce = 5
  const moveSpeed = 5
  const [isOnGround, setIsOnGround] = useState(true)
  const [showHitbox, setShowHitbox] = useState(true)
  
  // Set initial player position
  useEffect(() => {
    if (camera) {
      camera.position.set(position[0], position[1] + playerHeight, position[2])
    }
  }, [camera, position])
  
  // Add collision boxes to all objects
  useEffect(() => {
    if (sceneRef.current) {
      // Clear existing children first
      while (sceneRef.current.children.length > 0) {
        sceneRef.current.remove(sceneRef.current.children[0])
      }
      
      // Add all scene objects with collision boxes
      sceneObjects.forEach(obj => {
        if (obj instanceof Mesh) {
          const clone = obj.clone()
          sceneRef.current?.add(clone)
        }
      })
    }
  }, [sceneObjects])
  
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
  
  // Setup keyboard controls
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboardControls()
  
  // Physics and movement logic
  useFrame((_, delta) => {
    if (!isLocked || !controlsRef.current) return
    
    // Calculate movement direction
    const direction = new Vector3()
    const frontVector = new Vector3(0, 0, moveBackward ? 1 : moveForward ? -1 : 0)
    const sideVector = new Vector3(moveLeft ? 1 : moveRight ? -1 : 0, 0, 0)
    
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(moveSpeed * delta)
      .applyEuler(camera.rotation)
    
    // Apply gravity
    const newVelocity = velocity.clone()
    if (!isOnGround) {
      newVelocity.y += gravity * delta
    } else if (jump) {
      newVelocity.y = jumpForce
      setIsOnGround(false)
    }
    
    // Apply movement
    const moveVector = new Vector3(direction.x, newVelocity.y * delta, direction.z)
    
    // Check for collisions
    const raycaster = new Raycaster(camera.position, new Vector3(0, -1, 0))
    const intersects = raycaster.intersectObjects(sceneRef.current?.children || [], true)
    
    if (intersects.length > 0 && intersects[0].distance < playerHeight + 0.1) {
      // We hit ground
      setIsOnGround(true)
      newVelocity.y = 0
    } else if (moveVector.y <= 0) {
      setIsOnGround(false)
    }
    
    // Check horizontal collisions
    const horizontalDirections = [
      new Vector3(playerRadius, 0, 0),
      new Vector3(-playerRadius, 0, 0),
      new Vector3(0, 0, playerRadius),
      new Vector3(0, 0, -playerRadius)
    ]
    
    let canMoveX = true
    let canMoveZ = true
    
    horizontalDirections.forEach(dir => {
      const collisionRay = new Raycaster(camera.position, dir.normalize())
      const collisions = collisionRay.intersectObjects(sceneRef.current?.children || [], true)
      
      if (collisions.length > 0 && collisions[0].distance < playerRadius + 0.2) {
        if (dir.x !== 0) canMoveX = false
        if (dir.z !== 0) canMoveZ = false
      }
    })
    
    // Apply movement if no collisions
    if (canMoveX) camera.position.x += moveVector.x
    if (canMoveZ) camera.position.z += moveVector.z
    camera.position.y += moveVector.y
    
    // Update velocity
    setVelocity(newVelocity)
    
    // Escape key to exit
    if (document.querySelector('canvas') && isLocked) {
      document.querySelector('canvas')?.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.exitPointerLock()
        }
      })
    }
  })
  
  // Update hitbox position to follow player
  useFrame(() => {
    if (hitboxRef.current && camera) {
      hitboxRef.current.position.x = camera.position.x
      hitboxRef.current.position.z = camera.position.z
      // Position the hitbox so it extends from feet to head
      hitboxRef.current.position.y = camera.position.y - (playerHeight/2)
    }
  })
  
  return (
    <>
      <PointerLockControls ref={controlsRef} />
      <group ref={sceneRef} />
      {showHitbox && (
        <Cylinder 
          ref={hitboxRef}
          args={[playerRadius, playerRadius, playerHeight, 16]}
          position={[camera?.position.x || position[0], (camera?.position.y || position[1]) - (playerHeight/2), camera?.position.z || position[2]]}
        >
          <meshStandardMaterial color="#00ff00" transparent opacity={0.6} wireframe/>
        </Cylinder>
      )}
    </>
  )
} 