"use client";
import { createObject } from "@/scripts/helpers/sceneHelpers";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Group } from "three";


export const AIShowcaseResult = ({ result }: { result: any; }) => {
  const sceneRef = useRef<Group>(null);

  useEffect(() => {
    // Use requestAnimationFrame to ensure the scene is mounted
    const checkSceneReady = () => {
      if (!sceneRef.current) {
        requestAnimationFrame(checkSceneReady);
        return;
      }

      console.log("ShowcaseResult - Full result:", result);
      console.log("ShowcaseResult - Result type:", typeof result);
      console.log("ShowcaseResult - Is Array?", Array.isArray(result));
      if (result && typeof result === 'object') {
        console.log("ShowcaseResult - Result keys:", Object.keys(result));
      }

      if (!result) return;

      // Clear existing objects
      while (sceneRef.current.children.length > 0) {
        const child = sceneRef.current.children[0];
        sceneRef.current.remove(child);
      }

      // Create objects from the result data
      if (Array.isArray(result)) {
        console.log("Processing array result with length:", result.length);
        result.forEach((object: any) => {
          console.log("Creating object from array:", object);
          createObject(
            object.position,
            object.scale,
            object.rotation,
            "#" + object.color,
            sceneRef,
            () => { }, // setIsAdding
            () => { }, // setSelectedObject
            false, // isAdding
            object.hasGravity || false
          );
        });
      } else if (result.data && result.data.scene) {
        console.log("Processing nested result with scene length:", result.data.scene.length);
        result.data.scene.forEach((object: any) => {
          console.log("Creating object from nested data:", object);
          createObject(
            object.position,
            object.scale,
            object.rotation,
            "#" + object.color,
            sceneRef,
            () => { }, // setIsAdding
            () => { }, // setSelectedObject
            false, // isAdding
            object.hasGravity || false
          );
        });
      }
    };

    requestAnimationFrame(checkSceneReady);
  }, [result]);

  return (
    <Canvas camera={{ position: [5, 5, 5] }} shadows style={{ borderRadius: '10px' }}>
      <ambientLight intensity={0.75} />
      <pointLight position={[5, 5, 5]} intensity={50} />
      <group ref={sceneRef} />
      <OrbitControls />
    </Canvas>
  );
};
