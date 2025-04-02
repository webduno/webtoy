"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { GameTextInput } from '../atom/game/GameTextInput';

interface UsernameInputContainerProps {
  onUsernameChange: (username: string) => void;
  autosave?: boolean;
  username?: string;
}

export function UsernameInputContainer({ onUsernameChange, autosave = true, username: propUsername }: UsernameInputContainerProps) {
  const { data: session } = useSession();
  const [username, setUsername] = useState(propUsername || '');

  useEffect(() => {
    if (session) {
      setUsername(session.user?.email ?? "");
    }
  }, [session]);

  useEffect(() => {
    // Load username from localStorage when component mounts
    const savedUsername = localStorage.getItem('PLAYER_ID');
    if (savedUsername) {
      setUsername(savedUsername);
      onUsernameChange(savedUsername);
    }
  }, []);

  // Update internal state when prop changes
  useEffect(() => {
    if (propUsername) {
      setUsername(propUsername);
    }
  }, [propUsername]);

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    // console.log('newUsername', newUsername)
    if (autosave) {
      localStorage.setItem('PLAYER_ID', newUsername);
    }
    onUsernameChange(newUsername);
  };

  return (
    <div className='flex-col gap-2' id='username-input-container'>
      <GameTextInput 
        placeholder='Username'
        style={{textAlign: 'center'}}
        value={username}
        onChange={(e) => handleUsernameChange(e.target.value)}
      />
    </div>
  );
} 