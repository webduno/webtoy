"use client";
import { Box } from '@react-three/drei';


export const Planters = () => (
  <>
    {/* Front planters */}
    {[-8, 8].map((x) => (
      <>
        <Box position={[x, 1, -10]} scale={[3, 1, 3]}>
          <meshStandardMaterial color="#fff0e0" />
        </Box>
        <Box position={[x, 2, -10]} scale={[2, 1, 2]}>
          <meshStandardMaterial color="#458B13" transparent opacity={0.95} />
        </Box>
      </>
    ))}

    {/* Back planters */}
    {[-5, 5].map((x) => (
      <>
        <Box position={[x, 0, 19]} scale={[3, 1, 10]}>
          <meshStandardMaterial color="#fff0e0" />
        </Box>
        <Box position={[x, 0.75, 19]} scale={[2, 1, 9]}>
          <meshStandardMaterial color="#458B13" transparent opacity={0.95} />
        </Box>
      </>
    ))}
  </>
);
