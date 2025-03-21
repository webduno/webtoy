"use client"
import { Dispatch, SetStateAction } from 'react'

type TransformMode = 'move' | 'scale' | 'rotate';

interface TransformControlsProps {
  transformMode: TransformMode;
  cycleTransformMode: () => void;
  handleDone: () => void;
  color: string;
  setColor: (color: string) => void;
  setTransformMode: (mode: TransformMode) => void;
}

export default function TransformControls({ 
  transformMode, 
  cycleTransformMode, 
  handleDone,
  color,
  setColor,
  setTransformMode
}: TransformControlsProps) {
  const buttonStyle = {
    padding: '8px 16px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#4a90e2',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
    // textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
    width: '120px',
  };

  return (
    <div style={{ 
      zIndex: 1000, 
      position: 'absolute', 
      top: '10px', 
      right: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0px',
      padding: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)',
      borderRadius: '8px',
    }}>
      
      <button 
        style={{
          ...buttonStyle,
          backgroundColor: '#e24a4a', // Red for Done button
        }}
        onClick={handleDone}
        className="room-select-button"
      >
        Done
      </button>
      

      
      <div className="tx-altfont-1 tx-center tx-white tx-shadow-5  pb-1">Color</div>
      <button 
        style={{
          ...buttonStyle,
          backgroundColor: '#50c878', // Green for Color button
        }}
        onClick={() => {
          const newColor = prompt('Enter a color', color)
          if (newColor) {
            setColor(newColor)
          }
        }}
        className="room-select-button"
      >
        {color}
      </button>



      <div style={{ display: 'flex', gap: '2px', justifyContent: 'space-between' }}>
        <button 
          style={{
            ...buttonStyle,
            backgroundColor: transformMode === 'move' ? '#4a90e2' : 'rgba(74, 144, 226, 0.25)',
            width: '25px',
          }}
          onClick={() => setTransformMode('move')}
          className="flex-col"
        >
          🔄
        </button>
        
        <button 
          style={{
            ...buttonStyle,
            backgroundColor: transformMode === 'rotate' ? '#4a90e2' : 'rgba(74, 144, 226, 0.25)',
            width: '25px',
          }}
          onClick={() => setTransformMode('rotate')}
          className="flex-col"
        >
          🔄
        </button>
        
        <button 
          style={{
            ...buttonStyle,
            backgroundColor: transformMode === 'scale' ? '#4a90e2' : 'rgba(74, 144, 226, 0.25)',
            width: '25px',
          }}
          onClick={() => setTransformMode('scale')}
          className="flex-col"
        >
          📏
        </button>
      </div>
    </div>
  )
} 