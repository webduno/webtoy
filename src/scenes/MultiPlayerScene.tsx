"use client"
import SimpleScene from '@/scenes/SimpleScene'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Object3D, BoxGeometry, MeshStandardMaterial, Mesh, Group, Raycaster, Vector2 } from 'three'
import { MapControls, OrbitControls, TransformControls } from '@react-three/drei'
import { createObject, getTransformMode, loadObjects, saveObjects } from '@/scripts/sceneHelpers'
import { getObjectsFromSupabase, saveObjectsToSupabase } from '../../scripts/service'
import { useSession } from 'next-auth/react'
import { useThree } from '@react-three/fiber'



export interface MultiPlayerSceneHandle {
  createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => Object3D
  saveObjects: () => void
  resetScene: () => void
  copyContent: () => void
  pasteContent: () => void
}

const CONST_HOUSE = [{"position":[0,0,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"ffffff"},{"position":[0,0,0],"rotation":[0,0,0],"scale":[2.956146961721767,0.0728632018415375,2.956146961721767],"color":"00ff00"},{"position":[0,0.44807445271031,0],"rotation":[0,0,-0.738686876404],"scale":[0.7451969334831007,0.6139987992530138,0.7451969334831007],"color":"ff9900"},{"position":[0,0,0.3803046332551081],"rotation":[0,0,0],"scale":[0.32441853028981427,0.6500689591631309,0.32441853028981427],"color":"333333"}]

type TransformMode = 'move' | 'scale' | 'rotate';

interface MultiPlayerSceneProps {
  isMoving?: boolean
  setIsMoving: (isMoving: boolean) => void
  selectedObject: Object3D | null
  setSelectedObject: (object: Object3D | null) => void
  transformMode?: TransformMode
  color: string
  friends?: Array<{id: string, name: string, online: boolean}>
  deleteMode?: boolean
}

const STORAGE_KEY = 'multiplayer_scene'
const MultiPlayerScene = forwardRef<MultiPlayerSceneHandle, MultiPlayerSceneProps>((props, ref) => {
  const { isMoving = false, setIsMoving, selectedObject, setSelectedObject, transformMode = 'move', color, friends = [], deleteMode = false } = props
  const sceneRef = useRef<Group>(null)
  const mapControlsRef = useRef<typeof OrbitControls>(null)
  const { data: session } = useSession()
  const getStorageKey = () => {
    if (friends.length > 1) {
      const otherFriends = friends.slice(1);
      const friendIds = otherFriends.map(f => f.id).sort().join(',');
      // if session then email, else ip
      const myid = session ? session.user?.email : friends[0].id;
      return `${STORAGE_KEY}>>>${myid},${friendIds}`;
    }
    // console.log('no friends, using storage key', STORAGE_KEY);
    return STORAGE_KEY;
  };

  const loadSupabaseObjects = async (sceneRef: React.RefObject<Group>) => {
    const objects = await getObjectsFromSupabase(getStorageKey());
    // console.log('objects', objects);
    const objectsData = objects.data;
    // load objects into scene
    objectsData.forEach((object: any) => {
      createObject(object.position, object.scale, object.rotation, "#"+object.color, sceneRef, setIsMoving, setSelectedObject, isMoving);
    });
    setSelectedObject(null);
    setIsMoving(false);
  }

  // Load objects when the component mounts and scene is ready
  useEffect(() => {
    // Flag to prevent double loading
    let hasLoaded = false;
    
    // Check if the scene is available now
    if (sceneRef.current) {
      // Clear existing objects first
      while (sceneRef.current.children.length > 1) { // Keep the floor
        const child = sceneRef.current.children[1];
        sceneRef.current.remove(child);
      }
      // Reset selected object
      setSelectedObject(null);
      setIsMoving(false);
      // Load objects with the new storage key
      loadSupabaseObjects(sceneRef);
      hasLoaded = true;
    } else {
      // Use requestAnimationFrame for a more efficient approach than setTimeout
      const checkSceneReady = () => {
        if (sceneRef.current && !hasLoaded) {
          // Clear existing objects first
          while (sceneRef.current.children.length > 1) { // Keep the floor
            const child = sceneRef.current.children[1];
            sceneRef.current.remove(child);
          }
          loadSupabaseObjects(sceneRef);
          hasLoaded = true;
        } else if (!hasLoaded) {
          requestAnimationFrame(checkSceneReady);
        }
      };
      requestAnimationFrame(checkSceneReady);
    }
    
    return () => {
      hasLoaded = true; // Prevent loading if unmounted
    };
  }, [friends]);
  
  // Create object wrapper to use shared function
  const handleCreateObject = (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => {
    return createObject(
      position, 
      scale,
      rotation,
      color, 
      sceneRef, 
      setIsMoving, 
      setSelectedObject, 
      isMoving
    );
  }

  // Save objects wrapper to use shared function
  const handleSaveObjects = async () => {
    const objects = saveObjects(sceneRef, getStorageKey());
    // also save to supabase
    const res = await saveObjectsToSupabase(objects, getStorageKey());
    // console.log('res', res);
  }
  const handleResetScene = () => {
    // clear scene
    sceneRef.current?.clear();
  }
  const handleCopyContent = () => {
    // copy content
    // console.log('copy content') 
    // copy json but like they are saved to supabase content to clipboard
    const objects = saveObjects(sceneRef, getStorageKey());
    const json = JSON.stringify(objects);
    navigator.clipboard.writeText(json);
  }

  const handlePasteContent = async () => {
    // Reset the scene first
    // handleResetScene();
    
    try {
      // Get content from clipboard
      const clipboardText = await navigator.clipboard.readText();
      const objects = JSON.parse(clipboardText);
      
      // Clear existing objects
      if (sceneRef.current) {
        while (sceneRef.current.children.length > 1) { // Keep the floor
          const child = sceneRef.current.children[1];
          sceneRef.current.remove(child);
        }
        
        // Import objects from clipboard
        objects.forEach((object: any) => {
          createObject(
            object.position, 
            object.scale, 
            object.rotation, 
            "#" + object.color, 
            sceneRef, 
            setIsMoving, 
            setSelectedObject, 
            isMoving
          );
        });
      }
      
      // Save the imported objects
      handleSaveObjects();
      
      // Reset selection
      setSelectedObject(null);
      setIsMoving(false);
    } catch (error) {
      console.error('Error pasting content:', error);
    }
  }
  
  if (selectedObject && selectedObject instanceof Mesh && selectedObject.material instanceof MeshStandardMaterial) {
    selectedObject.material.color.set(color);
  }
  
  useImperativeHandle(ref, () => ({
    createObject: handleCreateObject,
    saveObjects: handleSaveObjects,
    resetScene: handleResetScene,
    copyContent: handleCopyContent,
    pasteContent: handlePasteContent
  }))
  
  
  
  
  
  
  

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <SimpleScene>
        <CameraClickControls sceneRef={sceneRef} mapControlsRef={mapControlsRef} deleteMode={deleteMode} />
        {/* @ts-ignore */}
        <MapControls enablePan={false} minDistance={0.1} maxDistance={50} ref={mapControlsRef} />
        {/* <OrbitControls enableRotate={!isMoving} ref={mapControlsRef} /> */}
        <group ref={sceneRef}>
          {selectedObject && (
            <TransformControls 
              object={selectedObject} 
              mode={getTransformMode(transformMode)} 
              onPointerDown={(e) => {
                e.stopPropagation()
              }}
            />
          )}
        </group>
      </SimpleScene>
    </div>
  )
})

MultiPlayerScene.displayName = 'MultiPlayerScene'

export default MultiPlayerScene 


const CameraClickControls = ({sceneRef, mapControlsRef, deleteMode}: {sceneRef: React.RefObject<Group>, mapControlsRef: React.RefObject<typeof OrbitControls>, deleteMode: boolean}) => {
  const handleClick = (event: MouseEvent) => {
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      // console.log('mouse', mouse)
      // @ts-ignore
      raycaster.setFromCamera(mouse, mapControlsRef.current?.object)
      // sole.log('raycaster to', mapControlsRef.current?.object)
      // @ts-ignore
      const intersects = raycaster.intersectObjects(sceneRef.current?.children, true)
      // console.log('intersects', intersects)
      if (intersects.length > 0) {
        const object = intersects[0].object
        // console.log('object', object)
        if (object instanceof Mesh) {
          console.log('object is a mesh')
          // if isdeleting then delete the object
          if (deleteMode) {
            object.parent?.remove(object)
            console.log('object is a mesh', object)
          }
        } else {
          // console.log('object is not a mesh', typeof object)
        }
      } else {
        // console.log('no intersects')
      }
    }
  }
  //add raycaster to detect clicks on the canvas
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('click', handleClick)
    }
  }, [deleteMode])  
  return null
}

