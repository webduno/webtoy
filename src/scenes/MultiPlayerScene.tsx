"use client"
import SimpleScene from '@/scenes/SimpleScene'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Object3D, BoxGeometry, MeshStandardMaterial, Mesh, Group, Raycaster, Vector2, Color, ColorRepresentation, Vector3 } from 'three'
import { MapControls, OrbitControls, TransformControls } from '@react-three/drei'
import { createObject, getTransformMode, loadObjects, saveObjects } from '@/scripts/sceneHelpers'
import { getObjectsFromSupabase, saveObjectsToSupabase } from '../../scripts/service'
import { useSession } from 'next-auth/react'
import { useThree } from '@react-three/fiber'
import { getTemplateData } from '@/scripts/sceneTemplates'

interface Friend {
  id: string;
  name: string;
  online: boolean;
}

export interface MultiPlayerSceneHandle {
  createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number], hasGravity?: boolean) => Object3D
  saveObjects: () => void
  resetScene: () => void
  copyContent: () => void
  pasteContent: () => void
  autorotate: () => void
  getSceneObjects: () => Object3D[]
}

type TransformMode = 'move' | 'scale' | 'rotate';

interface MultiPlayerSceneProps {
  selectedObject: Object3D | null
  setSelectedObject: (object: Object3D | null) => void
  transformMode?: TransformMode
  color: string
  isAdding?: boolean
  setIsAdding: (isAdding: boolean) => void
  friends?: Friend[]
  deleteMode?: boolean
}

const STORAGE_KEY = 'multiplayer_scene'
const MultiPlayerScene = forwardRef<MultiPlayerSceneHandle, MultiPlayerSceneProps>((props, ref) => {
  const { isAdding = false, setIsAdding, selectedObject, setSelectedObject, transformMode = 'move', color, friends = [], deleteMode = false } = props
  const sceneRef = useRef<Group>(null)
  const mapControlsRef = useRef<typeof OrbitControls>(null)
  const { data: session } = useSession()
  const [autoRotating, setAutoRotating] = useState(false)

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
      const mesh = createObject(
        object.position, 
        object.scale, 
        object.rotation, 
        "#"+object.color, 
        sceneRef, 
        setIsAdding, 
        setSelectedObject, 
        isAdding,
        object.hasGravity || false
      );
      // Ensure shadows are enabled
      if (mesh instanceof Mesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    setSelectedObject(null);
    setIsAdding(false);
    
    // Save the fetched objects to localStorage
    localStorage.setItem(getStorageKey(), JSON.stringify(objectsData));
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
      setIsAdding(false);
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
  const handleCreateObject = (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number], hasGravity: boolean = false) => {
    return createObject(
      position, 
      scale,
      rotation,
      color, 
      sceneRef, 
      setIsAdding, 
      setSelectedObject, 
      isAdding,
      hasGravity
    );
  }

  // Save objects wrapper to use shared function
  const handleSaveObjects = async () => {
    const objects = saveObjects(sceneRef, getStorageKey());
    // also save to supabase
    try {
      const res = await saveObjectsToSupabase(objects, getStorageKey());
      // console.log('res', res);
    } catch (error) {
      // alert message
      alert('Error saving objects to supabase: ' + JSON.stringify(error));
      console.error('Error saving objects to supabase:', error);
    }
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
      // Check if we have a selected template
      const selectedTemplate = localStorage.getItem('selectedTemplate');
      
      if (selectedTemplate) {
        // Clear localStorage item
        localStorage.removeItem('selectedTemplate');
        
        // Load the predefined template based on the name
        const templateData = getTemplateData(selectedTemplate);
        
        // If we have template data, use it
        if (templateData && sceneRef.current) {
          while (sceneRef.current.children.length > 0) {  // remove all objects including floor
            const child = sceneRef.current.children[0];
            sceneRef.current.remove(child);
          }
          
          // Create objects from the template
          templateData.forEach((object: any) => {
            createObject(
              object.position, 
              object.scale, 
              object.rotation, 
              "#" + object.color, 
              sceneRef, 
              setIsAdding, 
              setSelectedObject, 
              isAdding,
              object.hasGravity || false
            );
          });
          
          // Save the imported objects
          handleSaveObjects();
          
          // Reset selection
          setSelectedObject(null);
          setIsAdding(false);
          
          return; // Exit early
        }
      }
      
      // If no template or template data, fall back to clipboard paste
      const clipboardText = await navigator.clipboard.readText();
      const objects = JSON.parse(clipboardText);
      
      // Clear existing objects
      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) { // Remove all objects including floor
          const child = sceneRef.current.children[0];
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
            setIsAdding, 
            setSelectedObject, 
            isAdding,
            object.hasGravity || false
          );
        });
      }
      
      // Save the imported objects
      handleSaveObjects();
      
      // Reset selection
      setSelectedObject(null);
      setIsAdding(false);
    } catch (error) {
      console.error('Error pasting content:', error);
    }
  }
  
  const handleAutorotate = () => {
    setAutoRotating(prevState => !prevState);
  }

  // Enable/disable autorotation when the autoRotating state changes
  useEffect(() => {
    if (mapControlsRef.current) {
      // @ts-ignore - OrbitControls does have the autoRotate property
      mapControlsRef.current.autoRotate = autoRotating;
      // @ts-ignore - Set a slow rotation speed
      mapControlsRef.current.autoRotateSpeed = 1.0;
    }
  }, [autoRotating]);
  
  if (selectedObject && selectedObject instanceof Mesh && selectedObject.material instanceof MeshStandardMaterial) {
    selectedObject.material.color.set(color);
  }
  
  useImperativeHandle(ref, () => ({
    createObject: handleCreateObject,
    saveObjects: handleSaveObjects,
    resetScene: handleResetScene,
    copyContent: handleCopyContent,
    pasteContent: handlePasteContent,
    autorotate: handleAutorotate,
    getSceneObjects: () => {
      if (!sceneRef.current) return []
      return [...sceneRef.current.children]
    }
  }))
  
  
  
  
  
  
  

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <SimpleScene>
        <CameraClickControls sceneRef={sceneRef} mapControlsRef={mapControlsRef} deleteMode={deleteMode} />
        {/* @ts-ignore */}
        <MapControls enablePan={!isAdding} minDistance={0.1} maxDistance={50} ref={mapControlsRef} />
        {/* <OrbitControls enableRotate={!isAdding} ref={mapControlsRef} /> */}
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
      // @ts-ignore
      raycaster.setFromCamera(mouse, mapControlsRef.current?.object)
      // @ts-ignore
      const intersects = raycaster.intersectObjects(sceneRef.current?.children, true)
      if (intersects.length > 0) {
        const object = intersects[0].object
        if (object instanceof Mesh) {
          console.log('object is a mesh')
          // if isdeleting then delete the object
          if (deleteMode) {
            object.parent?.remove(object)
            console.log('object is a mesh', object)
          }
        }
      }
    }
  }
  
  //add raycaster to detect clicks on the canvas
  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('click', handleClick)
      
      // Clean up the event listener when component unmounts or deleteMode changes
      return () => {
        canvas.removeEventListener('click', handleClick)
      }
    }
  }, [deleteMode])  
  return null
}

