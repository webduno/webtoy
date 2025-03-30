"use client"
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import SinglePlayerScene, { SinglePlayerSceneHandle } from '@/model/scenes/SinglePlayerScene'
import { Object3D } from 'three'
import NewObjectControls from '@/dom/molecule/NewObjectControls'

type TransformMode = 'move' | 'scale' | 'rotate';

export interface SinglePlayerStageHandle {
  createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => void;
  resetScene: () => void;
  copyContent: () => void;
  pasteContent: () => void;
  loadTemplate: (templateName: string) => void;
  autorotate: () => void;
  getSceneObjects?: () => Object3D[];
  deleteMode?: boolean;
  setDeleteMode?: (deleteMode: boolean) => void;
}

const SinglePlayerStage = forwardRef<SinglePlayerStageHandle, {
  deleteMode: boolean, 
  setDeleteMode: (deleteMode: boolean) => void, 
  setIsAdding: (isAdding: boolean) => void,
  isAdding: boolean
}>((props, ref) => {
  const { deleteMode, setDeleteMode, setIsAdding, isAdding} = props
  const sceneRef = useRef<SinglePlayerSceneHandle>(null)
  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)
  const [transformMode, setTransformMode] = useState<TransformMode>('move')
  const [color, setColor] = useState<string>('#777777')
  const [isAutorotating, setIsAutorotating] = useState(false)
  const [hasGravity, setHasGravity] = useState(false)

  const handleDone = () => {
    if (selectedObject) {
      selectedObject.userData = {
        ...selectedObject.userData,
        hasGravity: hasGravity
      };
    }
    sceneRef.current?.saveObjects()
    setIsAdding(false)
    setSelectedObject(null)
  }

  const handleCancel = () => {
    if (selectedObject && sceneRef.current) {
      // Remove the selected object from the scene
      selectedObject.parent?.remove(selectedObject);
    }
    setIsAdding(false)
    setSelectedObject(null)
    sceneRef.current?.saveObjects()
  }

  const cycleTransformMode = () => {
    setTransformMode(prev => {
      if (prev === 'move') return 'scale'
      if (prev === 'scale') return 'rotate'
      return 'move'
    })
  }

  useImperativeHandle(ref, () => ({
    createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => {
      sceneRef.current?.createObject(position, scale, rotation)
    },
    resetScene: () => {
      // Clear all objects in the scene
      sceneRef.current?.resetScene();
      setSelectedObject(null);
      setIsAdding(false);
    },
    copyContent: () => {
      // Copy scene content to clipboard
      const sceneData = sceneRef.current?.getSceneData();
      if (sceneData) {
        navigator.clipboard.writeText(JSON.stringify(sceneData.objects));
        console.log('Scene content copied to clipboard');
      }
    },
    pasteContent: async () => {
      // Try to paste from clipboard
      try {
        const clipboardText = await navigator.clipboard.readText();
        console.log("clipboardText", clipboardText)
        const sceneData = JSON.parse(clipboardText);
        // Handle both array format and objects format
        const objects = Array.isArray(sceneData) ? sceneData : sceneData.objects;
        console.log("objects", objects)
        if (objects) {
          sceneRef.current?.loadSceneData({ objects });
          console.log('Scene content pasted from clipboard');
        }
      } catch (error) {
        console.error('Failed to paste content from clipboard:', error);
      }
      
      // Clear selection and adding state after pasting
      setSelectedObject(null);
      setIsAdding(false);
    },
    loadTemplate: (templateName: string) => {
      // Load the template from scene templates
      sceneRef.current?.loadTemplate(templateName);
      console.log(`Template loaded: ${templateName}`);
      
      // Clear selection and adding state after loading template
      setSelectedObject(null);
      setIsAdding(false);
    },
    autorotate: () => {
      // Toggle autorotation of the scene
      setIsAutorotating(!isAutorotating);
      sceneRef.current?.toggleAutorotate();
    },
    getSceneObjects: () => {
      // Return scene objects
      return sceneRef.current?.getObjects() || [];
    }
  }))

  return (
    <div className="scene-container">
        {isAdding && (
            <NewObjectControls
              canHaveGravity={false}
              transformMode={transformMode}
              cycleTransformMode={cycleTransformMode}
              handleDone={handleDone}
              handleCancel={handleCancel}
              color={color}
              setColor={setColor}
              setTransformMode={setTransformMode}
              hasGravity={hasGravity}
              setHasGravity={setHasGravity}
            />
        )}
      <SinglePlayerScene 
        ref={sceneRef} 
        isAdding={isAdding} 
        setIsAdding={setIsAdding} 
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        transformMode={transformMode}
        color={color}
        isAutorotating={isAutorotating}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}        
      />
    </div>
  )
})

SinglePlayerStage.displayName = 'SinglePlayerStage'

export default SinglePlayerStage 