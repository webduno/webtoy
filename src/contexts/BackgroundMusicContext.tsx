"use client"

import { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface BackgroundMusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | undefined>(undefined);

export function BackgroundMusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio but don't autoplay
  if (!audioRef.current) {
    audioRef.current = new Audio('/massobeats_lotus.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.1;
  }

  const togglePlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
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

  const play = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.1;
      audioRef.current.play().catch(error => {
        console.log('Error playing background music:', error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <BackgroundMusicContext.Provider value={{ isPlaying, togglePlay, play }}>
      {children}
    </BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext);
  if (context === undefined) {
    throw new Error('useBackgroundMusic must be used within a BackgroundMusicProvider');
  }
  return context;
} 