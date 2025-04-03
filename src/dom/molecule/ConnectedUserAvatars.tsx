import { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import { supabase } from '@/lib/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';
import * as THREE from 'three';

type Position = [number, number, number];

interface UserPresence {
  id: string;
  username: string;
  color: string;
  position: Position;
  // Add timestamp if needed for filtering stale data
  // online_at: string;
}

interface ConnectedUserAvatarsProps {
  currentUsername: string;
  // This callback is used by THIS component to get the LATEST position 
  // of the CURRENT user to send to Supabase.
  // It should be provided by the parent component (PortalsPage).
  getPosition: () => Position; 
}

// Component to render a single user's avatar (pyramid)
const UserAvatar = ({ position, color }: { position: Position; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Optionally smooth movement
  useFrame(() => {
    if (meshRef.current) {
      // Lerp towards the target position for smoother updates
      meshRef.current.position.lerp(new THREE.Vector3(...position), 0.25);
    }
  });

  return (<group position={[0, 0.5, 0]}>
    <Cylinder ref={meshRef} args={[0.4, 0.1, 1, 8, 1]}
    rotation={[0, 0, 0]}
    // rotation={[-Math.PI/2, 0, 0]}
     position={position} castShadow>
      <meshStandardMaterial color={color} />
    </Cylinder>
    <group position={position}>
    <Cylinder args={[0.4, 0.6, 3, 8, 1]}
    // rotation={[-Math.PI/2, 0, 0]}
    position={[0, -1.5, 0]}
    // position={[0, -1, 0.5]}
    castShadow>
      <meshStandardMaterial color={color} />
    </Cylinder>
    </group>
  </group>
  );
};

export default function ConnectedUserAvatars({ currentUsername, getPosition }: ConnectedUserAvatarsProps) {
  const [userPresences, setUserPresences] = useState<Record<string, UserPresence>>({});
  const channelRef = useRef<RealtimeChannel | null>(null);
  // No need for currentPositionRef here, we use getPosition()

  // Removed the useEffect for onPositionUpdate as it's replaced by getPosition

  useEffect(() => {
    if (channelRef.current) return;

    // Use a STATIC channel name for all users
    const channelName = "user-positions"; 
    console.log(`ConnectedUserAvatars: Joining channel: ${channelName} with key: ${currentUsername}`); // DEBUG

    channelRef.current = supabase.channel(channelName, { // Use the static name
      config: {
        presence: {
          key: currentUsername, // Key still uniquely identifies this user
        },
      },
    });

    const channel = channelRef.current;

    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState<UserPresence>();
        // --- DEBUG --- 
        // console.log("ConnectedUserAvatars: Received presence state:", JSON.stringify(newState, null, 2));
        // --- END DEBUG ---
        const presences: Record<string, UserPresence> = {};
        for (const key in newState) {
          // Ensure the presence data is not empty and has a position
          if (newState[key].length > 0 && newState[key][0].position) { 
            const presenceData = newState[key][0];
            // --- DEBUG --- 
            // console.log(`ConnectedUserAvatars: Processing presence for user ${presenceData.username}:`, JSON.stringify(presenceData));
            // --- Add this log --- 
            // console.log(`ConnectedUserAvatars: Comparing filter: presenceData.username ('${presenceData.username}') !== currentUsername ('${currentUsername}')`);
            // --- END DEBUG ---
            // Filter out the current user's own presence for rendering
            if (presenceData.username !== currentUsername) {
               presences[key] = presenceData;
            }
          } else {
             // --- DEBUG --- 
             if (newState[key].length > 0) {
                // console.log(`ConnectedUserAvatars: Skipping presence for user ${newState[key][0].username} due to missing position.`);
             }
             // --- END DEBUG ---
          }
        }
        // --- DEBUG --- 
        // console.log("ConnectedUserAvatars: Final presences for rendering:", JSON.stringify(presences, null, 2));
        // --- END DEBUG ---
        setUserPresences(presences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // console.log(`Subscribed to user-positions channel for ${currentUsername}`);
          const intervalId = setInterval(async () => {
            if (channelRef.current?.state === 'joined') {
              try {
                // Get the latest position using the provided callback
                const currentPosition = getPosition(); 
                // --- DEBUG: Log position being sent ---
                // console.log(`ConnectedUserAvatars [${currentUsername}]: Sending position:`, JSON.stringify(currentPosition));
                // --- END DEBUG ---
                await channelRef.current.track({
                  username: currentUsername,
                  color: '#FFA500', // Example color
                  position: currentPosition, // Send current position
                  online_at: new Date().toISOString(),
                });
                // --- DEBUG: Log after track ---
                // console.log(`ConnectedUserAvatars [${currentUsername}]: Successfully tracked position.`);
                // --- END DEBUG ---
              } catch (error) {
                console.error(`ConnectedUserAvatars [${currentUsername}]: Error tracking presence:`, error);
              }
            }
          }, 200); // Update position every 200ms

          (channel as any).intervalId = intervalId; 
        }
      });

    return () => {
      if (channelRef.current) {
        const intervalId = (channelRef.current as any).intervalId;
        if (intervalId) {
          clearInterval(intervalId);
        }
        channelRef.current.unsubscribe();
        channelRef.current = null;
        // console.log("Unsubscribed from user-positions channel");
      }
    };
  // Add getPosition to dependency array
  }, [currentUsername, getPosition]); 

  return (
    <>
      {Object.values(userPresences).map((presence) => (
        // Ensure position exists before rendering
        presence.position && 
        <UserAvatar key={presence.id} position={presence.position} color={presence.color} />
      ))}
    </>
  );
} 