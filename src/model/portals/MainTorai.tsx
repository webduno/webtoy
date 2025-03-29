"use client";
import { Torus } from '@react-three/drei';


export const MainTorai = () => {
  return (
    <>
{/* ceiling */}
<Torus position={[0, 14.5, 0]} args={[8, 0.8, 32, 100]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
      </Torus>

      {/* ceiling edge floor */}
      <Torus position={[0, 16, 0]} args={[12, 0.8, 32, 100]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
      </Torus> 



      {/* arc */}
      <Torus position={[0, 3, -13]} args={[6, 0.5, 32, 100, 4]} rotation={[0, 0, -0.4]}
        scale={[1, 1, 1]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />
      </Torus>





      
    </>
  );
};
