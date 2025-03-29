"use client"
import SimpleScene from '@/scenes/SimpleScene'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Object3D, BoxGeometry, MeshStandardMaterial, Mesh, Group } from 'three'
import { MapControls, TransformControls } from '@react-three/drei'
import { createObject, getTransformMode, loadObjects, saveObjects } from '@/scripts/sceneHelpers'
import { DEFAULT_TEMPLATE_LIST, getTemplateData } from '@/scripts/sceneTemplates'
import { CameraClickControls } from './MultiPlayerScene'

export interface SinglePlayerSceneHandle {
  createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => Object3D;
  saveObjects: () => void;
  resetScene: () => void;
  getSceneData: () => any;
  loadSceneData: (data: any) => void;
  loadTemplate: (templateName: string) => void;
  toggleAutorotate: () => void;
  getObjects: () => Object3D[];
} 

type TransformMode = 'move' | 'scale' | 'rotate';

interface SinglePlayerSceneProps {
  selectedObject: Object3D | null;
  setSelectedObject: (object: Object3D | null) => void;
  transformMode?: TransformMode;
  color: string;
  isAdding?: boolean;
  setIsAdding: (isAdding: boolean) => void;
  isAutorotating?: boolean;
  deleteMode?: boolean;
  setDeleteMode: (deleteMode: boolean) => void;
}
const STORAGE_KEY = 'singleplayer_scene'
const SinglePlayerScene = forwardRef<SinglePlayerSceneHandle, SinglePlayerSceneProps>((props, ref) => {
  const { isAdding = false, setIsAdding, selectedObject, setSelectedObject, transformMode = 'move', color, isAutorotating = false } = props
  const sceneRef = useRef<Group>(null)
  const mapControlsRef = useRef<any>(null)
  // Load objects when the component mounts and scene is ready
  useEffect(() => {
    // Check if the scene is available now
    if (sceneRef.current) {
      // only if there are no objects in the scene
      console.log("sceneRef.current.children.length", sceneRef.current.children.length)
      if (sceneRef.current.children.length === 0) {
        loadObjects(sceneRef, STORAGE_KEY);
      }
    } else {
      // Use requestAnimationFrame for a more efficient approach than setTimeout
      const checkSceneReady = () => {
        if (sceneRef.current) {
          if (sceneRef.current.children.length === 0) {
            console.log("loading objects")
            loadObjects(sceneRef, STORAGE_KEY);
          }
        } else {
          requestAnimationFrame(checkSceneReady);
        }
      };
      requestAnimationFrame(checkSceneReady);
    }
  }, []);

  // Autorotation effect
  useEffect(() => {
    if (!mapControlsRef.current || !isAutorotating) return;
    
    let animationFrameId: number;
    
    const rotate = () => {
      if (mapControlsRef.current) {
        const controls = mapControlsRef.current;
        if (controls.autoRotate !== undefined) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 2.0;
          controls.update();
        }
      }
      animationFrameId = requestAnimationFrame(rotate);
    };
    
    rotate();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (mapControlsRef.current && mapControlsRef.current.autoRotate !== undefined) {
        mapControlsRef.current.autoRotate = false;
      }
    };
  }, [isAutorotating]);
  
  // Create object wrapper to use shared function
  const handleCreateObject = (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number], color?: string, hasGravity?: boolean) => {
    return createObject(
      position, 
      scale,
      rotation,
      color || '#ffffff', 
      sceneRef, 
      setIsAdding, 
      setSelectedObject, 
      isAdding,
      hasGravity
    );
  }

  // Save objects wrapper to use shared function
  const handleSaveObjects = () => {
    saveObjects(sceneRef, STORAGE_KEY);
  }
  
  // Reset scene by clearing all objects
  const handleResetScene = () => {
    if (sceneRef.current) {
      // Remove all children except the first one (usually the ground)
      while (sceneRef.current.children.length > 0) {
        sceneRef.current.remove(sceneRef.current.children[0]);
      }
      // Save the empty scene
      saveObjects(sceneRef, STORAGE_KEY);
    }
  }
  
  // Get scene data for copy operation
  const handleGetSceneData = () => {
    if (!sceneRef.current) return null;
    
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
    
    return sceneData;
  }
  
  // Load scene data for paste operation
  const handleLoadSceneData = (data: any) => {
    if (!sceneRef.current || !data || !data.objects) return;
    
    console.log("data 111", data)
    // Clear existing objects
    // handleResetScene();
    
    // Recreate objects from data
    data.objects.forEach((objData: any) => {
      // if (objData.type === 'mesh')
      {
        const obj = handleCreateObject(
          objData.position, 
          objData.scale, 
          objData.rotation,
          objData.color,
          objData.hasGravity
        );
        
        if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial && objData.color) {
          obj.material.color.setStyle(`#${objData.color}`);
        }
      }
    });
    
    // Save the loaded scene
    saveObjects(sceneRef, STORAGE_KEY);
  }
  
  // Load a predefined template
  const handleLoadTemplate = (templateName: string) => {
    // Get template data using the helper function
    const templateData = getTemplateData(templateName);
    if (!templateData) {
      console.error(`Template ${templateName} not found`);
      return;
    }
    
    // Clear existing objects
    handleResetScene();
    
    // Create objects from template data
    templateData.forEach((item: any) => {
      const obj = handleCreateObject(
        item.position,
        item.scale,
        item.rotation,
        item.color,
        item.hasGravity
      );
      
      if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial && item.color) {
        obj.material.color.setStyle(`#${item.color}`);
      }
    });
    
    // Clear selection after loading template
    setSelectedObject(null);
    
    // Save the loaded scene
    saveObjects(sceneRef, STORAGE_KEY);
  }
  
  // Get all objects in the scene
  const handleGetObjects = () => {
    if (!sceneRef.current) return [];
    return [...sceneRef.current.children];
  }
  
  if (selectedObject && selectedObject instanceof Mesh && selectedObject.material instanceof MeshStandardMaterial) {
    selectedObject.material.color.set(color);
  }
  
  useImperativeHandle(ref, () => ({
    createObject: handleCreateObject,
    saveObjects: handleSaveObjects,
    resetScene: handleResetScene,
    getSceneData: handleGetSceneData,
    loadSceneData: handleLoadSceneData,
    loadTemplate: handleLoadTemplate,
    toggleAutorotate: () => {/* This is handled through props */},
    getObjects: handleGetObjects
  }))

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <SimpleScene>
      <CameraClickControls sceneRef={sceneRef} mapControlsRef={mapControlsRef} 
      deleteMode={props.deleteMode || false}
       />
      {/* @ts-ignore */}
        <MapControls enablePan={!isAdding} minDistance={0.1} maxDistance={50} ref={mapControlsRef} />
        
        <group ref={sceneRef}>
          {/* <mesh onClick={(e) => {
            if (!isAdding && !selectedObject) {
              const clickedObject = e.object
            } else if (selectedObject) {
              e.stopPropagation()
            }
          }}>
            <boxGeometry args={[10, 0.1, 10]} />
            <meshStandardMaterial color="grey" />
          </mesh> */}
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

SinglePlayerScene.displayName = 'SinglePlayerScene'

export default SinglePlayerScene 