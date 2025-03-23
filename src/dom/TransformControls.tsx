"use client"
import { Dispatch, SetStateAction, useEffect } from 'react'

type TransformMode = 'move' | 'scale' | 'rotate';

interface TransformControlsProps {
  transformMode: TransformMode;
  cycleTransformMode: () => void;
  handleDone: () => void;
  handleCancel: () => void;
  color: string;
  setColor: (color: string) => void;
  setTransformMode: (mode: TransformMode) => void;
}

export default function TransformControls({ 
  transformMode, 
  cycleTransformMode, 
  handleDone,
  handleCancel,
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      if (key === 'g') {
        setTransformMode('move');
      } else if (key === 'r') {
        setTransformMode('rotate');
      } else if (key === 's') {
        setTransformMode('scale');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setTransformMode]);

  return (
    <div style={{ 
      zIndex: 1000, 
      position: 'absolute', 
      top: '130px', 
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
      {/* add cancel button */}
      <button 
        style={{
          ...buttonStyle,
          backgroundColor: '#e24a4a', // Red for Done button
        }}
        onClick={handleCancel}
      >
        Cancel
      </button>
      <div className="tx-altfont-1 tx-center tx-white tx-shadow-5  pb-1">Color</div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <input 
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            width: '40px',
            height: '40px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '8px',
          }}
        />
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '4px 8px',
          borderRadius: '4px',
          color: '#ffffff',
          fontSize: '0.9rem',
          flexGrow: 1,
          textAlign: 'center',
        }}>
          {color}
        </div>
      </div>

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
          G 🚶‍♂️
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
          R 🔄
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
          S 📏
        </button>
      </div>
    </div>
  )
} 