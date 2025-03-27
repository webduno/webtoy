"use client";
import { Box, Cylinder, useTexture } from '@react-three/drei';
import { Walls } from './Walls';
import { Floor } from './Floor';
import { Platform } from './Platform';
import { Planters } from './Planters';
import { Columns } from './Columns';
import { Ceiling } from './Ceiling';
import { Lighting } from './Lighting';
import { MainTorai } from './MainTorai';
import { PortalGroup } from './PortalGroup';
import { SinglePortal } from './SinglePortal';

interface PortalParams {
  username?: string;
  color?: string;
  speed?: number;
  ref?: string;
  avatar_url?: string;
  team?: string;
  speed_x?: number;
  speed_y?: number;
  speed_z?: number;
  rotation_x?: number;
  rotation_y?: number;
  rotation_z?: number;
}

interface HallOfPortalsProps {
  portalParams: PortalParams;
}

export const formatPortalUrl = (url?: string, params?: PortalParams): string => {
  if (!url) return 'https://portal.pieter.com/';
  
  // Trim any whitespace from the URL
  const trimmedUrl = url.trim();
  
  // If URL already starts with http:// or https://, use as is, otherwise add https://
  const baseUrl = trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://') 
    ? trimmedUrl 
    : `https://${trimmedUrl}`;

  // If no params, return the base URL
  if (!params) return baseUrl;

  // Create URL object to handle parameters properly
  const urlObj = new URL(baseUrl);
  
  // Add all portal parameters to the URL
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlObj.searchParams.set(key, value.toString());
    }
  });

  return urlObj.toString();
};

export type { PortalParams };

export const HallOfPortals = ({ portalParams }: HallOfPortalsProps) => {
  console.log("portalParams?.ref", portalParams?.ref, formatPortalUrl(portalParams?.ref, portalParams))
  return (
    <group position={[0, 0, 0]} castShadow receiveShadow>
      <Lighting />
      <Ceiling />
      <Walls />
      <Floor />
      <Platform />
      <Planters />
      <Columns />
      <MainTorai />
      <PortalGroup portalParams={portalParams} />

      <group scale={[0.75, 0.75, 0.75]} position={[0, 0, 33]}>
        <SinglePortal
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]}
          portalMaterial={<meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />}
          url={formatPortalUrl(portalParams?.ref, portalParams)}
        />
      </group>

      <Box scale={[10, 0.5, 7]} position={[0, 0, 30]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.05} />
      </Box>

      <Box scale={[10, 0.75, 5]} position={[0, 3.75, -27]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
      </Box>
      <group scale={[0.75, 0.75, 0.75]} position={[0, 4, -27]}>
        <SinglePortal
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          portalMaterial={<meshStandardMaterial color="#ffee33" emissive="#ffee33" emissiveIntensity={0.5} />}
          url="https://portal.pieter.com/"
        />
      </group>
    </group>
  );
};

