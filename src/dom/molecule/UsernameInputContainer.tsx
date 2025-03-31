"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { GameTextInput } from '../atom/game/GameTextInput';

interface UsernameInputContainerProps {
  onUsernameChange: (username: string) => void;
  autosave?: boolean;
}

export function UsernameInputContainer({ onUsernameChange, autosave = true }: UsernameInputContainerProps) {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (session) {
      setUsername(session.user?.name?.replace(" ", "_") ?? "");
    }
  }, [session]);

  useEffect(() => {
    // Load username from localStorage when component mounts
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      onUsernameChange(savedUsername);
    }
  }, []);

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    if (autosave) {
      localStorage.setItem('username', newUsername);
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