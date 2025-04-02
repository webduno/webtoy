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
  onPortalCollision: () => void;
}

export const formatPortalUrl = (url?: string, params?: PortalParams): string => {
// only if its multi or single, dont fix the url, since its a relative path
if (url?.includes("/multi") || url?.includes("/single") || url?.includes("/public")) {
  return url;
}



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
    // if its the username and its en an email, remove the @ and everything after it
    if (key === 'username' && value !== undefined && value !== null) {
      urlObj.searchParams.set(key, value.toString().split('@')[0]);
    } else if (value !== undefined && value !== null) {
      urlObj.searchParams.set(key, value.toString());
    }
  });
  if (!urlObj.searchParams.has('ref')) {
    urlObj.searchParams.set('ref', 'webtoy.vercel.app');
  }
  return urlObj.toString();
};

export type { PortalParams };

export const HallOfPortals = ({ portalParams, onPortalCollision }: HallOfPortalsProps) => {
  // console.log("portalParams?.ref", portalParams?.ref, formatPortalUrl(portalParams?.ref, portalParams))
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
      <PortalGroup portalParams={portalParams} onPortalCollision={onPortalCollision} />







      <group scale={[0.75, 0.75, 0.75]} position={[0, 18, 0]}
      rotation={[0, Math.PI, 0]}
      >
        <Box args={[13, 5, 6]} position={[0, -2, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <SinglePortal
        title='Public Web Toys'
        textColor='#993300'
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]}
          portalMaterial={<meshStandardMaterial color="#ffaa44"  />}
          url={formatPortalUrl("/public", portalParams)}
          onCollision={onPortalCollision}
        />
      </group>









      <group scale={[0.75, 0.75, 0.75]} position={[0, 0, 40]}>
        <SinglePortal
        title='Go Back'
        textColor='magenta'
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]}
          portalMaterial={<meshStandardMaterial color="#ff00ff" emissive="#ff00ff" />}
          url={formatPortalUrl(portalParams?.ref, portalParams)}
          onCollision={onPortalCollision}
        />
      </group>

      <Box scale={[10, 0.5, 14]} position={[0, 0, 34]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.05} />
      </Box>







      <Box scale={[10, 0.75, 5]} position={[0, 3.75, -27]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
      </Box>
      <group scale={[0.75, 0.75, 0.75]} position={[0, 4, -27]}>
        <SinglePortal
        title='fly.pieter.com'
        textColor='#ff9900'
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          portalMaterial={<meshStandardMaterial color="#ffee33" emissive="#ffee33" emissiveIntensity={0.5} />}
          url={formatPortalUrl("https://fly.pieter.com/", portalParams)}
        />
      </group>
    </group>
  );
};

