"use client"

import { useEffect, useState, useRef } from 'react';

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false); // Start with music paused
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio but don't autoplay
    audioRef.current = new Audio('/massobeats_lotus.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.1;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Error playing background music:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
    className='pos-abs bottom-0 left-0 mb-100 ml-4 opaci-chov--50 pa-1  bord-r-100'
      onClick={togglePlay}
      style={{
        zIndex: 9000,
        position: 'fixed',
      }}
    >
      {!isPlaying ? (
        <>
          {/* music emoji */}
          <span className='tx-lg'>🎵</span>
        </>
      ) : (
        <>
          {/* pause emoji */}
          <span className='tx-lg'>⏸️</span>
        </>
      )}
    </button>
  );
} 