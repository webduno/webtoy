"use client";
import { Cylinder } from '@react-three/drei';


export const Columns = () => (
  <>
    {/* {[-10, 10].map((x) => (
      <>
        <Cylinder position={[x, 7, -5]} args={[0.8, 0.8, 14, 16]}>
          <meshStandardMaterial color="#ffffff" emissive="#333333" />
        </Cylinder>
        <Cylinder position={[x, 7, -15]} args={[0.8, 0.8, 14, 16]}>
          <meshStandardMaterial color="#ffffff" emissive="#333333" />
        </Cylinder>
        <Cylinder position={[x, 7, 27]} args={[0.8, 0.8, 14, 16]}>
          <meshStandardMaterial color="#ffffff" emissive="#333333" />
        </Cylinder>
        <Cylinder position={[x, 7, -27]} args={[0.8, 0.8, 14, 16]}>
          <meshStandardMaterial color="#ffffff" emissive="#333333" />
        </Cylinder>
      </>
    ))} */}
    {/* {[-10, 10,].map((x) => (
        <>
          <Cylinder position={[x, 7, -5]} args={[0.8, 0.8, 14, 16]}>
            <meshStandardMaterial color="#ffffff" emissive="#333333" />
          </Cylinder>
          <Cylinder position={[x, 7, -15]} args={[0.8, 0.8, 14, 16]}>
            <meshStandardMaterial color="#ffffff" emissive="#333333" />
          </Cylinder>
        </>
      ))} */}
      {/* Decorative outside */}
      {[-10, 10,].map((x) => (
        <>
          <Cylinder position={[x, 7, 27]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
            <meshStandardMaterial color="#ffffff" emissive="#333333" />
          </Cylinder>
          <Cylinder position={[x, 7, -27]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
            <meshStandardMaterial color="#ffffff" emissive="#333333" />
          </Cylinder>
        </>
      ))}
      {[-10, 10,].map((x) => (
        <>
          <Cylinder position={[x, 7, 8]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
            <meshStandardMaterial color="#ffffff" emissive="#333333" />
          </Cylinder>
          <Cylinder position={[x, 7, -8]} args={[0.8, 0.8, 14, 16]} castShadow receiveShadow>
            <meshStandardMaterial color="#ffffff" emissive="#333333" />
          </Cylinder>
        </>
      ))}
  </>
);
