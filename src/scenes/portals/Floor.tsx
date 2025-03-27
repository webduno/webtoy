"use client";
import { Box } from '@react-three/drei';


export const Floor = () => (
  <>
    <Box position={[0, -0.5, 0]} scale={[24, 1, 55]} castShadow receiveShadow>
      <meshStandardMaterial color="#fffcfa" />
    </Box>
    {[-11, 11].map((x) => (
      <>
        <Box position={[x, 14.25, 0]} scale={[5, 1, 55]} castShadow receiveShadow>
          <meshStandardMaterial color="#ffffff" emissive="#333333"  />
        </Box>
        <Box position={[x, 16, 0]} scale={[5, 1.2, 55]} castShadow receiveShadow>
          <meshStandardMaterial color="#ffffff" emissive="#444444"  />
        </Box>
        <Box position={[x, 8.5, 0]} scale={[3.5, 1, 48]} castShadow receiveShadow>
          <meshStandardMaterial color="#ffffff" emissive="#222222"  />
        </Box>
        <Box position={[x * 0.987, 8.5, 0]} scale={[3.5, 0.75, 47]} castShadow receiveShadow>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box>
      </>
    ))}
  </>
);
