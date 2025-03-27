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

export const HallOfPortals = () => {
  
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
      <PortalGroup />


      

<Box scale={[10, 0.75, 5]} position={[0, 3.75, -27]}>
  <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
</Box>
      <group scale={[0.75, 0.75, 0.75]} position={[0, 4, -27]}>

        <SinglePortal position={[0, 0, 0]} rotation={[0, 0, 0]}
          portalMaterial={<meshStandardMaterial color="#ffee33" emissive="#ffee33" emissiveIntensity={0.5} />} />
      </group>

      
    </group>
  );
};

