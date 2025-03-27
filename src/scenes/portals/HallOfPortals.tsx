"use client";
import { Cylinder, useTexture } from '@react-three/drei';
import { Walls } from './Walls';
import { Floor } from './Floor';
import { Platform } from './Platform';
import { Planters } from './Planters';
import { Columns } from './Columns';
import { Ceiling } from './Ceiling';
import { Lighting } from './Lighting';
import { MainTorai } from './MainTorai';
import { PortalGroup } from './PortalGroup';

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
    </group>
  );
};

