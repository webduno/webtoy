"use client";
import { Box } from '@react-three/drei';


export const Platform = () => (
  <>
  <Box position={[0, 0.1, -15]} scale={[24, 2, 15]}>
    <meshStandardMaterial color="#fff7ef" />
  </Box>
    <Box position={[0, 3.5, -20.4]} scale={[5, 0.5, 15]}>
      <meshStandardMaterial color="#ffffff" emissive="#555555"  />
    </Box>
    {[...Array(9)].map((_, i) => (
      <Box
        key={i}
        position={[0, i * 0.4, -4.5 - i]}
        scale={[10 - (i / 2), 0.4, 1]}
      >
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
      </Box>
    ))}
  </>
);
