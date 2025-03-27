"use client";
import { Torus, Circle } from '@react-three/drei';


export const SinglePortal = ({ portalMaterial = <meshStandardMaterial color="#aad0f4" emissive="#aad0f4" emissiveIntensity={0.75} />, position, rotation }: { portalMaterial?: any; position: [number, number, number]; rotation: [number, number, number]; }) => {
  return (
    <group position={position} rotation={rotation}>

      <Torus args={[5, 0.5, 4, 32, Math.PI]}>
        <meshStandardMaterial color="#ffffff" emissive="#444444" />
      </Torus>
      <Circle args={[5, 32, 0, Math.PI]}>
        {portalMaterial}
      </Circle>

    </group>
  );
};
