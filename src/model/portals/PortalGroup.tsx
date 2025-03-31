"use client";
import { SinglePortal } from './SinglePortal';
import { formatPortalUrl, PortalParams } from './HallOfPortals';
import { SmallPortal } from './SmallPortal';

interface PortalGroupProps {
  portalParams: PortalParams;
  onPortalCollision: () => void;
}

export const PortalGroup = ({ portalParams, onPortalCollision }: PortalGroupProps) => {
  // console.log( formatPortalUrl("https://portal.pieter.com/", portalParams))
  return (
    <>
      <SinglePortal position={[-11.25, 0, 16]} rotation={[0, Math.PI / 2, 0]}
        title="WebTOY (Single)"
        textColor='blue'
        torusMaterial={<meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />}
        portalMaterial={<meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={0.75} />}
        url={formatPortalUrl("/single", portalParams)}
        onCollision={onPortalCollision} />
      <SinglePortal position={[11.25, 0, 16]} rotation={[0, -Math.PI / 2, 0]}
        title="WebTOY (Multi)"
        textColor='red'
        torusMaterial={<meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />}
        portalMaterial={<meshStandardMaterial color="#ff3322" emissive="#ff3322" emissiveIntensity={0.75} />}
        url={formatPortalUrl("/multi", portalParams)}
        onCollision={onPortalCollision} />





      <SinglePortal position={[-11.25, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        title="Goose"
        portalMaterial={<meshStandardMaterial color="#aad0f4" emissive="#aad0f4" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://portal.pieter.com", portalParams)}
        onCollision={onPortalCollision} />
      <SinglePortal position={[11.25, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="Vibe Metaverse"
        portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://thevibemetaverse.com/", portalParams)}
        onCollision={onPortalCollision} />

      <SinglePortal position={[-11.25, 1, -16]} rotation={[0, Math.PI / 2, 0]}
        title="Red Panda Vibes"
        portalMaterial={<meshStandardMaterial color="#aaf4d0" emissive="#aaf4d0" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://collidingscopes.github.io/red-panda-vibes", portalParams)}
        onCollision={onPortalCollision} />
      <SinglePortal position={[11.25, 1, -16]} rotation={[0, -Math.PI / 2, 0]}
        title="Viberacer"
        portalMaterial={<meshStandardMaterial color="#d0aaf4" emissive="#d0aaf4" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://viberacer.heyferrante.com/", portalParams)}
        onCollision={onPortalCollision} />















<group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, 20]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        title="Minecraft Parkour"
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
          url={formatPortalUrl("/single?template=hardcore_parkour", portalParams)}
          onCollision={onPortalCollision} />
      </group>



      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, 4]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
          title="Golf Course"
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
          url={formatPortalUrl("/single?template=golf_course", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, -4]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        title="111"
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>

      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, -20]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        title="333"
          portalMaterial={<meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, 12]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        title="444"
          portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, -12]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        title="555"
          portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>

      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, 4]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="666"
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, -4]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="777"
          portalMaterial={<meshStandardMaterial color="#fff4ff" emissive="#fff4ff" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>

      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, 20]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="888"
          portalMaterial={<meshStandardMaterial color="#dddddd" />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, -20]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="999"
          portalMaterial={<meshStandardMaterial color="#ccddff" emissive="#ccddff" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, 12]}>
          <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="101010"
          portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, -12]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="111111"
          portalMaterial={<meshStandardMaterial color="#d0f4aa" emissive="#d0f4aa" emissiveIntensity={0.75} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>
    </>
  );
};
