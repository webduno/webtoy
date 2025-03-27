"use client"

import { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';

interface BackgroundMusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | undefined>(undefined);

export function BackgroundMusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio only on the client side
    audioRef.current = new Audio('/massobeats_lotus.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.02;

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function to handle unmounting
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.02;
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
      audioRef.current.volume = 0.02;
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