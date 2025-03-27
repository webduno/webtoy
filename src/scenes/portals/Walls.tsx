"use client";
import { Box } from '@react-three/drei';


export const Walls = () => (
  <>
    {/* Main walls */}
    {[-12, 12].map((x) => (
      <>
        <Box position={[x, 7, 0]} scale={[1, 15, 15]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box position={[x, 7, 16]} scale={[1, 15, 15]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box position={[x, 7, -16]} scale={[1, 15, 15]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
      </>
    ))}

    {/* Gold trim */}
    {[-12, 12].map((x) => (
      <>
        <Box position={[x, 7, 0]} scale={[0.5, 16.5, 51]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box>
        {/* <Box position={[x, 12, 0]} scale={[1.1, 7, 0.1]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box>
        <Box position={[x, 12, 16]} scale={[1.1, 7, 0.1]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box>
        <Box position={[x, 12, -16]} scale={[1.1, 7, 0.1]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box> */}



        
        <Box position={[x, 12, 0.25]} scale={[1.1, 7, 0.1]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box>
        <Box position={[x, 12, 16.25]} scale={[1.1, 7, 0.1]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box>
        <Box position={[x, 12, -16.25]} scale={[1.1, 7, 0.1]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box>
        <Box position={[x, 12, -0.25]} scale={[1.1, 7, 0.1]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box>
        <Box position={[x, 12, 15.75]} scale={[1.1, 7, 0.1]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box>
        <Box position={[x, 12, -15.75]} scale={[1.1, 7, 0.1]}>
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
        </Box>
      </>
    ))}
  </>
);
