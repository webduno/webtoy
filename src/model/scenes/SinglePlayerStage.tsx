"use client"
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import SinglePlayerScene, { SinglePlayerSceneHandle } from '@/model/scenes/SinglePlayerScene'
import { Object3D } from 'three'
import NewObjectControls from '@/dom/molecule/NewObjectControls'

type TransformMode = 'move' | 'scale' | 'rotate';

export interface SinglePlayerStageHandle {
  createObject: (scale: [number, number, number], rotation: [number, number, number], position?: [number, number, number]) => void;
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
  const [color, setColor] = useState<string>(() => {
    // Try to get color from localStorage, fallback to default
    return localStorage.getItem('singleplayer_color') || '#777777'
  })
  const [isAutorotating, setIsAutorotating] = useState(false)
  const [hasGravity, setHasGravity] = useState(false)
  const [lastPlacedPosition, setLastPlacedPosition] = useState<[number, number, number]>(() => {
    const saved = localStorage.getItem('lastPlacedPosition');
    return saved ? JSON.parse(saved) : [0, 0, 0];
  });
  const [lastPlacedScale, setLastPlacedScale] = useState<[number, number, number]>(() => {
    const saved = localStorage.getItem('lastPlacedScale');
    return saved ? JSON.parse(saved) : [1, 1, 1];
  });

  // Save color to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('singleplayer_color', color)
  }, [color])

  const handleDone = () => {
    if (selectedObject) {
      selectedObject.userData = {
        ...selectedObject.userData,
        hasGravity
      };
      // Update last placed position and scale when object is placed
      const newPosition: [number, number, number] = [selectedObject.position.x, selectedObject.position.y, selectedObject.position.z];
      const newScale: [number, number, number] = [selectedObject.scale.x, selectedObject.scale.y, selectedObject.scale.z];
      setLastPlacedPosition(newPosition);
      setLastPlacedScale(newScale);
      // Save to localStorage
      localStorage.setItem('single_lastPlacedPosition', JSON.stringify(newPosition));
      localStorage.setItem('single_lastPlacedScale', JSON.stringify(newScale));
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
    createObject: (scale: [number, number, number], rotation: [number, number, number], position?: [number, number, number]) => {
      // Use last placed position and scale if not provided
      const pos = position || lastPlacedPosition;
      const scl = scale || lastPlacedScale;
      sceneRef.current?.createObject(pos, scl, rotation)
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