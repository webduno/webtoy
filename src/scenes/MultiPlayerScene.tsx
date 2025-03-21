"use client"
import SimpleScene from '@/scenes/SimpleScene'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Object3D, BoxGeometry, MeshStandardMaterial, Mesh, Group } from 'three'
import { TransformControls } from '@react-three/drei'
import { createObject, getTransformMode, loadObjects, saveObjects } from '@/scripts/sceneHelpers'
import { getObjectsFromSupabase, saveObjectsToSupabase } from '../../scripts/service'
import { useSession } from 'next-auth/react'

export interface MultiPlayerSceneHandle {
  createObject: (position: [number, number, number]) => Object3D
  saveObjects: () => void
}

type TransformMode = 'move' | 'scale' | 'rotate';

interface MultiPlayerSceneProps {
  isMoving?: boolean
  setIsMoving: (isMoving: boolean) => void
  selectedObject: Object3D | null
  setSelectedObject: (object: Object3D | null) => void
  transformMode?: TransformMode
  color: string
  friends?: Array<{id: string, name: string, online: boolean}>
}

const STORAGE_KEY = 'multiplayer_scene'
const MultiPlayerScene = forwardRef<MultiPlayerSceneHandle, MultiPlayerSceneProps>((props, ref) => {
  const { isMoving = false, setIsMoving, selectedObject, setSelectedObject, transformMode = 'move', color, friends = [] } = props
  const sceneRef = useRef<Group>(null)
  const { data: session } = useSession()
  const getStorageKey = () => {
    if (friends.length > 1) {
      const otherFriends = friends.slice(1);
      const friendIds = otherFriends.map(f => f.id).sort().join(',');
      // if session then email, else ip
      const myid = session ? session.user?.email : friends[0].id;
      return `${STORAGE_KEY}@${myid},${friendIds}`;
    }
    console.log('no friends, using storage key', STORAGE_KEY);
    return STORAGE_KEY;
  };

  const loadSupabaseObjects = async (sceneRef: React.RefObject<Group>) => {
    const objects = await getObjectsFromSupabase(getStorageKey());
    console.log('objects', objects);
    const objectsData = objects.data;
    // load objects into scene
    objectsData.forEach((object: any) => {
      createObject(object.position, "#"+object.color, sceneRef, setIsMoving, setSelectedObject, isMoving);
    });
    setSelectedObject(null);
  }



  // Load objects when the component mounts and scene is ready
  useEffect(() => {
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
    } else {
      // Use requestAnimationFrame for a more efficient approach than setTimeout
      const checkSceneReady = () => {
        if (sceneRef.current) {
          loadSupabaseObjects(sceneRef);
        } else {
          requestAnimationFrame(checkSceneReady);
        }
      };
      requestAnimationFrame(checkSceneReady);
    }
  }, [friends]);
  
  // Create object wrapper to use shared function
  const handleCreateObject = (position: [number, number, number]) => {
    return createObject(
      position, 
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
    console.log('res', res);
  }
  
  if (selectedObject && selectedObject instanceof Mesh && selectedObject.material instanceof MeshStandardMaterial) {
    selectedObject.material.color.set(color);
  }
  
  useImperativeHandle(ref, () => ({
    createObject: handleCreateObject,
    saveObjects: handleSaveObjects
  }))

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <SimpleScene>
        <group ref={sceneRef}>
          <mesh onClick={(e) => {
            console.log('clicked')
            if (!isMoving && !selectedObject) {
              const clickedObject = e.object
              console.log('clicked', clickedObject)
            } else if (selectedObject) {
              e.stopPropagation()
            }
          }}>
            <boxGeometry args={[10, 0.1, 10]} />
            <meshStandardMaterial color="grey" />
          </mesh>
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