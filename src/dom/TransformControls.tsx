"use client"
import { Dispatch, SetStateAction } from 'react'

type TransformMode = 'move' | 'scale' | 'rotate';

interface TransformControlsProps {
  transformMode: TransformMode;
  cycleTransformMode: () => void;
  handleDone: () => void;
  color: string;
  setColor: (color: string) => void;
}

export default function TransformControls({ 
  transformMode, 
  cycleTransformMode, 
  handleDone,
  color,
  setColor
}: TransformControlsProps) {
  return (
    <div className="flex flex-col gap-2" style={{ zIndex: 1000, position: 'absolute', top: 0, right: 0 }}>
      
      <button style={{display: 'block'}}
        onClick={handleDone}
      >
        Done
      </button>
      <button style={{display: 'block'}}
        onClick={cycleTransformMode}
      >
        Mode: {transformMode}
      </button>
      <button style={{display: 'block'}}
        onClick={() => {
          const newColor = prompt('Enter a color', color)
          if (newColor) {
            setColor(newColor)
          }
        }}
      >
        Color: {color}
      </button>
    </div>
  )
} 