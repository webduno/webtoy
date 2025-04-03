import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface ConnectedUser {
  id: string;
  username: string;
  color: string;
}

interface ConnectedUsersProps {
  currentUsername: string;
}

export default function ConnectedUsers({ currentUsername }: ConnectedUsersProps) {
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);

  useEffect(() => {
    // Create a channel for presence
    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: currentUsername,
        },
      },
    });

    // Subscribe to presence changes
    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const users = Object.values(newState).map((presence: any) => ({
          id: presence[0].username,
          username: presence[0].username,
          color: presence[0].color || '#00B30F',
        }));
        setConnectedUsers(users);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Set initial presence
          await channel.track({
            online_at: new Date().toISOString(),
            username: currentUsername,
            color: '#00B30F',
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [currentUsername]);

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '5px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      zIndex: 1000
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Connected Users ({connectedUsers.length})</h3>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {connectedUsers.map((user) => (
          <li key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: user.color,
                marginRight: '8px',
              }}
            />
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
} 