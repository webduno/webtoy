"use client"
import SimpleScene from '@/model/scenes/SimpleScene'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Object3D, BoxGeometry, MeshStandardMaterial, Mesh, Group, Raycaster, Vector2, Color, ColorRepresentation, Vector3 } from 'three'
import { MapControls, OrbitControls, TransformControls } from '@react-three/drei'
import { createObject, getTransformMode, loadObjects, saveObjects } from '@/scripts/helpers/sceneHelpers'
import { getObjectsFromSupabase, saveObjectsToSupabase } from '../../../scripts/service'
import { useSession } from 'next-auth/react'
import { useThree } from '@react-three/fiber'
import { DEFAULT_TEMPLATE_LIST, getTemplateData } from '@/scripts/helpers/sceneTemplates'
import { CameraClickControls } from './CameraClickControls'

interface Friend {
  id: string;
  name: string;
  online: boolean;
}

const STORAGE_KEY = 'singleplayer_scene'

export interface MultiPlayerSceneHandle {
  createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number], hasGravity?: boolean) => Object3D
  saveObjects: () => void
  resetScene: () => void
  copyContent: () => void
  pasteContent: () => void
  loadTemplate: (templateName: string) => void
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

const MultiPlayerScene = forwardRef<MultiPlayerSceneHandle, MultiPlayerSceneProps>((props, ref) => {
  const { isAdding = false, setIsAdding, selectedObject, setSelectedObject, transformMode = 'move', color, friends = [], deleteMode = false } = props
  const sceneRef = useRef<Group>(null)
  const mapControlsRef = useRef<any>(null)
  const { data: session } = useSession()
  const [autoRotating, setAutoRotating] = useState(false)
  const [cameraPosition, setCameraPosition] = useState<[number, number, number] | null>(null)
  const [cameraTarget, setCameraTarget] = useState<[number, number, number] | null>(null)
  const [cameraRotation, setCameraRotation] = useState<[number, number, number] | null>(null)
  const [lastPlacedPosition, setLastPlacedPosition] = useState<[number, number, number]>(() => {
    const saved = localStorage.getItem('multi_lastPlacedPosition');
    return saved ? JSON.parse(saved) : [0, 0, 0];
  });
  const [lastPlacedScale, setLastPlacedScale] = useState<[number, number, number]>(() => {
    const saved = localStorage.getItem('multi_lastPlacedScale');
    return saved ? JSON.parse(saved) : [1, 1, 1];
  });

  // Store camera state when switching modes
  useEffect(() => {
    if (mapControlsRef.current) {
      const controls = mapControlsRef.current
      const camera = controls.object
      setCameraPosition([camera.position.x, camera.position.y, camera.position.z])
      setCameraTarget([controls.target.x, controls.target.y, controls.target.z])
      setCameraRotation([camera.rotation.x, camera.rotation.y, camera.rotation.z])
    }
  }, [isAdding])

  // Restore camera position when switching modes
  useEffect(() => {
    if (mapControlsRef.current && cameraPosition && cameraTarget && cameraRotation) {
      const controls = mapControlsRef.current
      controls.target.set(...cameraTarget)
      controls.object.position.set(...cameraPosition)
      controls.object.rotation.set(...cameraRotation)
      controls.update()
    }
  }, [isAdding, cameraPosition, cameraTarget, cameraRotation])

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
    // Use last placed position and scale if not provided
    const pos = position || lastPlacedPosition;
    const scl = scale || lastPlacedScale;
    
    const mesh = createObject(
      pos, 
      scl,
      rotation,
      color, 
      sceneRef, 
      setIsAdding, 
      setSelectedObject, 
      isAdding,
      hasGravity
    );

    // Update last placed position and scale when object is placed
    if (mesh) {
      const newPosition: [number, number, number] = [mesh.position.x, mesh.position.y, mesh.position.z];
      const newScale: [number, number, number] = [mesh.scale.x, mesh.scale.y, mesh.scale.z];
      setLastPlacedPosition(newPosition);
      setLastPlacedScale(newScale);
      // Save to localStorage
      localStorage.setItem('multi_lastPlacedPosition', JSON.stringify(newPosition));
      localStorage.setItem('multi_lastPlacedScale', JSON.stringify(newScale));
    }

    return mesh;
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
    if (!sceneRef.current) return;
    
    // Create a serializable representation of the scene
    const sceneData = {
      objects: sceneRef.current.children.map(child => {
        if (child instanceof Mesh) {
          return {
            type: 'mesh',
            position: [child.position.x, child.position.y, child.position.z],
            rotation: [child.rotation.x, child.rotation.y, child.rotation.z],
            scale: [child.scale.x, child.scale.y, child.scale.z],
            color: child.material instanceof MeshStandardMaterial ? child.material.color.getHexString() : '0000ff',
            hasGravity: child.userData.hasGravity
          };
        }
        return null;
      }).filter(Boolean)
    };
    
    // Copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(sceneData.objects));
  }

  const handlePasteContent = async () => {
    try {
      // Try to paste from clipboard
      const clipboardText = await navigator.clipboard.readText();
      const objects = JSON.parse(clipboardText);
      
      if (!Array.isArray(objects)) {
        console.error('Invalid clipboard data format - expected an array');
        return;
      }
      
      // Clear existing objects
      if (sceneRef.current) {
        while (sceneRef.current.children.length > 0) { // Remove all objects including floor
          const child = sceneRef.current.children[0];
          sceneRef.current.remove(child);
        }
        
        // Import objects from clipboard
        objects.forEach((object: any) => {
          // if (object.type === 'mesh')
            {
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
          }
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

  const handleLoadTemplate = (templateName: string) => {
    // Get template data using the helper function
    const templateData = getTemplateData(templateName);
    if (!templateData) {
      console.error(`Template ${templateName} not found`);
      return;
    }
    
    // Clear existing objects
    if (sceneRef.current) {
      while (sceneRef.current.children.length > 0) {  // remove all objects including floor
        const child = sceneRef.current.children[0];
        sceneRef.current.remove(child);
      }
      
      // Create objects from template data
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
    }
    
    // Save the imported objects
    handleSaveObjects();
    
    // Reset selection
    setSelectedObject(null);
    setIsAdding(false);
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
    loadTemplate: handleLoadTemplate,
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
        
        {!!isAdding && <MapControls 
          enablePan={false} 
          ref={mapControlsRef}
          target={cameraTarget || [0, 0, 0]}
        /> }
        {!isAdding && <OrbitControls 
          ref={mapControlsRef}
          target={cameraTarget || [0, 0, 0]}
        /> }
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

