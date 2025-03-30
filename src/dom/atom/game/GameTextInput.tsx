import React from 'react';

export function GameTextInput(props: React.InputHTMLAttributes<HTMLInputElement>, classOverride?: string) {
  return (
    <input 
      {...props}
      className={`game-text-input bord-r-10 pa-2  ${classOverride}`}
    />
  );
} 