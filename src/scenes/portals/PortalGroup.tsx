"use client";
import { SinglePortal } from './SinglePortal';
import { formatPortalUrl, PortalParams } from './HallOfPortals';

interface PortalGroupProps {
  portalParams: PortalParams;
}

export const PortalGroup = ({ portalParams }: PortalGroupProps) => {
  // console.log( formatPortalUrl("https://portal.pieter.com/", portalParams))
  return (
    <>
      <SinglePortal position={[-11.25, 0, 16]} rotation={[0, Math.PI / 2, 0]}
        torusMaterial={<meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />}
        portalMaterial={<meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={0.75} />}
        url={formatPortalUrl("/single", portalParams)} />
      <SinglePortal position={[11.25, 0, 16]} rotation={[0, -Math.PI / 2, 0]}
        torusMaterial={<meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />}
        portalMaterial={<meshStandardMaterial color="#ff3322" emissive="#ff3322" emissiveIntensity={0.75} />}
        url={formatPortalUrl("/multi", portalParams)} />





      <SinglePortal position={[-11.25, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        portalMaterial={<meshStandardMaterial color="#aad0f4" emissive="#aad0f4" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      <SinglePortal position={[11.25, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://portal.pieter.com", portalParams)} />

      <SinglePortal position={[-11.25, 1, -16]} rotation={[0, Math.PI / 2, 0]}
        portalMaterial={<meshStandardMaterial color="#aaf4d0" emissive="#aaf4d0" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      <SinglePortal position={[11.25, 1, -16]} rotation={[0, -Math.PI / 2, 0]}
        portalMaterial={<meshStandardMaterial color="#d0aaf4" emissive="#d0aaf4" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://portal.pieter.com", portalParams)} />

      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, 4]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, -4]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>

      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, 20]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, -20]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, 12]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, -12]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>

      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, 4]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, -4]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#fff4ff" emissive="#fff4ff" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>

      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, 20]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, -20]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#ccddff" emissive="#ccddff" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, 12]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, -12]}>
        <SinglePortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
          portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)} />
      </group>
    </>
  );
};
