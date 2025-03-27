"use client"
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import SinglePlayerScene, { SinglePlayerSceneHandle } from '@/scenes/SinglePlayerScene'
import { Object3D } from 'three'
import NewObjectControls from '@/dom/NewObjectControls'

type TransformMode = 'move' | 'scale' | 'rotate';

export interface SinglePlayerStageHandle {
  createObject: (position: [number, number, number], scale: [number, number, number], rotation: [number, number, number]) => void;
  resetScene: () => void;
  copyContent: () => void;
  pasteContent: () => void;
  autorotate: () => void;
  getSceneObjects?: () => Object3D[];
}

const SinglePlayerStage = forwardRef<SinglePlayerStageHandle, {}>((props, ref) => {
  const sceneRef = useRef<SinglePlayerSceneHandle>(null)
  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [transformMode, setTransformMode] = useState<TransformMode>('move')
  const [color, setColor] = useState<string>('#777777')
  const [isAutorotating, setIsAutorotating] = useState(false)

  const handleDone = () => {
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
      // Copy scene content to localStorage or state
      const sceneData = sceneRef.current?.getSceneData();
      if (sceneData) {
        localStorage.setItem('copiedSceneData', JSON.stringify(sceneData));
        console.log('Scene content copied');
      }
    },
    pasteContent: async () => {
      // First try to paste from localStorage
      const copiedData = localStorage.getItem('copiedSceneData');
      if (copiedData) {
        try {
          const sceneData = JSON.parse(copiedData);
          sceneRef.current?.loadSceneData(sceneData);
          console.log('Scene content pasted from localStorage');
        } catch (error) {
          console.error('Failed to paste content from localStorage:', error);
        }
      } else {
        // Check if there's a selected template
        const selectedTemplate = localStorage.getItem('selectedTemplate');
        if (selectedTemplate) {
          // Load the template
          sceneRef.current?.loadTemplate(selectedTemplate);
          console.log(`Template loaded: ${selectedTemplate}`);
        } else {
          // Try to paste from clipboard
          try {
            const clipboardText = await navigator.clipboard.readText();
            const sceneData = JSON.parse(clipboardText);
            sceneRef.current?.loadSceneData(sceneData);
            console.log('Scene content pasted from clipboard');
          } catch (error) {
            console.error('Failed to paste content from clipboard:', error);
          }
        }
      }
      
      // Clear selection and adding state after pasting
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
      />
    </div>
  )
})

SinglePlayerStage.displayName = 'SinglePlayerStage'

export default SinglePlayerStage 