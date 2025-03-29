"use client"

import { useBackgroundMusic } from '@/scripts/contexts/BackgroundMusicContext';

export function BackgroundMusic() {
  const { isPlaying, togglePlay } = useBackgroundMusic();

  return (
    <button
      className='pos-abs bottom-0 left-0 mb-100 ml-4 opaci-chov--50 pa-1  bord-r-100'
      // onTouchStart={togglePlay}
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