"use client";
import { Torus } from '@react-three/drei';


export const MainTorai = () => {
  return (
    <>

<Torus position={[0, 14.5, 0]} args={[8, 0.8, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
      </Torus>

      
      <Torus position={[0, 16, 0]} args={[12, 0.8, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
      </Torus> 
      <Torus position={[0, 3, -13]} args={[6, 0.5, 32, 100]} rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
      </Torus>
    </>
  );
};
