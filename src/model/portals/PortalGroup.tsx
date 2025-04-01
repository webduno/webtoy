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
        textColor="#0099ff"
        portalMaterial={<meshStandardMaterial color="#0099ff" emissive="#aad0f4" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://portal.pieter.com", portalParams)}
        onCollision={onPortalCollision} />
      <SinglePortal position={[11.25, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="Vibe Metaverse"
        textColor="#00ff99"
        portalMaterial={<meshStandardMaterial color="#50f477" emissive="#50f477" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://thevibemetaverse.com/", portalParams)}
        onCollision={onPortalCollision} />

      <SinglePortal position={[-11.25, 1, -16]} rotation={[0, Math.PI / 2, 0]}
        title="Red Panda Vibes"
        textColor="#ff1100"
        portalMaterial={<meshStandardMaterial color="#a41100" emissive="#a41100" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://collidingscopes.github.io/red-panda-vibes", portalParams)}
        onCollision={onPortalCollision} />
      <SinglePortal position={[11.25, 1, -16]} rotation={[0, -Math.PI / 2, 0]}
        title="Viberacer"
        textColor="#ff33ff"
        portalMaterial={<meshStandardMaterial color="#d0aaf4" emissive="#d0aaf4" emissiveIntensity={0.75} />}
        url={formatPortalUrl("https://viberacer.heyferrante.com/", portalParams)}
        onCollision={onPortalCollision} />















      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, 12]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        title="Minecraft Parkour"
        textColor="#004400"
          portalMaterial={<meshStandardMaterial color="#33ff66" />}
          url={formatPortalUrl("/single?template=minecraft_parkour", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, 20]}>
      <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        textColor="#992200"
        title="Shooting Range"
          portalMaterial={<meshStandardMaterial color="#ff5500" emissive="#ff5500" emissiveIntensity={0.75} />}
          url={formatPortalUrl("/single?template=shooting_range", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, 20]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="Easy Parkour Garden"
        textColor="#005511"
          portalMaterial={<meshStandardMaterial color="#66ffbb" />}
          url={formatPortalUrl("/single?template=parkour_garden", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, 12]}>
          <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="Bowling Alley"
        textColor="#663300"
          portalMaterial={<meshStandardMaterial color="#aa6633" emissive="#aa6633" emissiveIntensity={0.75} />}
          url={formatPortalUrl("/single?template=bowling_alley", portalParams)}
          onCollision={onPortalCollision} />
      </group>














      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, 4]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
          title="Golf Course"
          textColor="#ffffff"
          portalMaterial={<meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.50} />}
          url={formatPortalUrl("/single?template=golf_course", portalParams)}
          onCollision={onPortalCollision} />
      </group>

      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, 4]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="Mountain View Run"
          textColor="#0077aa"
          portalMaterial={<meshStandardMaterial color="#44aaff" emissive="#44aaff" emissiveIntensity={0.75} />}
          url={formatPortalUrl("/single?template=mountain_view", portalParams)}
          onCollision={onPortalCollision} />
      </group>










      



      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, -4]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        title="Available"
        textColor="#ffdd66"
          portalMaterial={<meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>


      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, -4]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="Available"
        textColor="#ffdd66"
          portalMaterial={<meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>












      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, -20]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        title="Available"
        textColor="#ffdd66"
          portalMaterial={<meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[-11.25, 8.75, -12]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}
        title="Available"
        textColor="#ffdd66"
          portalMaterial={<meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>

      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, -20]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="Available"
        textColor="#ffdd66"
          portalMaterial={<meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>
      <group scale={[0.5, 0.5, 0.5]} position={[11.25, 8.75, -12]}>
        <SmallPortal position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
        title="Available"
        textColor="#ffdd66"
          portalMaterial={<meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} emissive="#FFD700" emissiveIntensity={0.05} />}
          url={formatPortalUrl("https://portal.pieter.com", portalParams)}
          onCollision={onPortalCollision} />
      </group>
    </>
  );
};
