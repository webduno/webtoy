"use client";
import { Cylinder, Torus } from '@react-three/drei';


export const Ceiling = () => (
  <>
  <Cylinder position={[0, 30, 0]} args={[9, 12, 2, 32]} castShadow receiveShadow>
    <meshStandardMaterial color="#ffffff" />
  </Cylinder>
    <Cylinder position={[0, 15, 0]} args={[12, 10, 1.5, 32]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" />
    </Cylinder>


    <Cylinder position={[0, 22.5, 10.5]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" emissive="#333333" />
    </Cylinder>
    <Cylinder position={[0, 22.5, -10.5]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" emissive="#333333" />
    </Cylinder>
    <Cylinder position={[4, 22.5, 9.5]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" emissive="#333333" />
    </Cylinder>
    <Cylinder position={[4, 22.5, -9.5]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" emissive="#333333" />
    </Cylinder>
    <Cylinder position={[-4, 22.5, 9.5]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" emissive="#333333" />
    </Cylinder>
    <Cylinder position={[-4, 22.5, -9.5]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" emissive="#333333" />
    </Cylinder>


    
    <Cylinder position={[-7, 22.5, 6]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" emissive="#333333" />
    </Cylinder>
    <Cylinder position={[-7, 22.5, -6]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" emissive="#333333" />
    </Cylinder>
    <Cylinder position={[7, 22.5, 6]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" emissive="#333333" />
    </Cylinder>
    <Cylinder position={[7, 22.5, -6]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
      <meshStandardMaterial color="#ffffff" emissive="#333333" />
    </Cylinder>


  </>
);
