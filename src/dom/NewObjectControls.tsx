"use client"
import { Dispatch, SetStateAction, useEffect } from 'react'

type TransformMode = 'move' | 'scale' | 'rotate';

interface NewObjectControlsProps {
  transformMode: TransformMode;
  cycleTransformMode: () => void;
  handleDone: () => void;
  handleCancel: () => void;
  color: string;
  setColor: (color: string) => void;
  setTransformMode: (mode: TransformMode) => void;
  hasGravity?: boolean;
  setHasGravity?: (hasGravity: boolean) => void;
  canHaveGravity: boolean;
}

export default function NewObjectControls({ 
  canHaveGravity = false,
  transformMode, 
  cycleTransformMode, 
  handleDone,
  handleCancel,
  color,
  setColor,
  setTransformMode,
  hasGravity,
  setHasGravity
}: NewObjectControlsProps) {
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
      bottom: '20px', 
      right: '20px',
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
          backgroundColor: '#4ae260', // green for Done button
        }}
        onClick={handleDone}
        className="room-select-button tx-shadow-5 tx-altfont-"
      >
        DONE
      </button>
      {/* add cancel button */}
      <button  className='noborder bg-b-90 bord-r-10 tx-white opaci-50 opaci-chov--25 mb-2 py-1'
        style={{

        }}
        onClick={handleCancel}
      >
        Cancel
      </button>
      {/* <div className="tx-altfont-1 tx-center tx-white tx-shadow-5  pb-1">Color</div> */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <input 
        className='flex-1'
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
        {/* <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '4px 8px',
          borderRadius: '4px',
          color: '#ffffff',
          fontSize: '0.9rem',
          flexGrow: 1,
          textAlign: 'center',
        }}>
          {color}
        </div> */}
        {/* Has Gravity */}
        {canHaveGravity && (
          <div className='flex-col tx-white' >
            <div className='tx-sm tx-center tx-shadow-5'>Gravity</div>
            <input 
            type="checkbox" 
            checked={hasGravity}
            onChange={(e) => setHasGravity?.(e.target.checked)}
          />
        </div>
        )}
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