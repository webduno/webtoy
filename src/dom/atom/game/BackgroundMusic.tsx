"use client"

import { useBackgroundMusic } from '@/scripts/contexts/BackgroundMusicContext';
import { GameButton } from './GameButton';

export function BackgroundMusic() {
  const { isPlaying, togglePlay } = useBackgroundMusic();

  return (
    <div
      className='pos-abs bottom-0 left-0 mb-100 ml-4  '
      onClick={togglePlay}
      style={{
        zIndex: 9000,
        position: 'fixed',
      }}
    >
      <GameButton type="zeta" classOverride="bord-r-100 " >
        {!isPlaying ? (
          <>
            {/* music emoji */}
            <span className='tx-lg'>🔊</span>
          </>
        ) : (
          <>
            {/* pause emoji */}
            <span className='tx-lg'>⏸️</span>
          </>
        )}
      </GameButton>
    </div>
  );
} 