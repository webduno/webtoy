"use client"
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Object3D } from 'three'
import TransformControls from '@/dom/TransformControls'
import { MultiPlayerSceneHandle } from './MultiPlayerScene';
import MultiPlayerScene from './MultiPlayerScene';

type TransformMode = 'move' | 'scale' | 'rotate';

interface Friend {
  id: string;
  name: string;
  online: boolean;
}

export interface MultiPlayerStageHandle {
  createObject: (position: [number, number, number]) => void
}

const MultiPlayerStage = forwardRef<MultiPlayerStageHandle, {friends: Friend[]}>((props, ref) => {
  const {friends} = props
  const sceneRef = useRef<MultiPlayerSceneHandle>(null)
  const [isMoving, setIsMoving] = useState(false)
  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null)
  const [transformMode, setTransformMode] = useState<TransformMode>('move')
  const [color, setColor] = useState<string>('#0000ff')

  const handleDone = () => {
    sceneRef.current?.saveObjects()
    setIsMoving(false)
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
    createObject: (position: [number, number, number]) => {
      sceneRef.current?.createObject(position)
    }
  }))

  return (
    <div className="scene-container">
        {isMoving && (
            <TransformControls
              transformMode={transformMode}
              cycleTransformMode={cycleTransformMode}
              handleDone={handleDone}
              color={color}
              setColor={setColor}
              setTransformMode={setTransformMode}
            />
        )}
      <MultiPlayerScene 
        ref={sceneRef} 
        isMoving={isMoving} 
        setIsMoving={setIsMoving} 
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        transformMode={transformMode}
        color={color}
        friends={friends}
      />
    </div>
  )
})

MultiPlayerStage.displayName = 'MultiPlayerStage'

export default MultiPlayerStage 