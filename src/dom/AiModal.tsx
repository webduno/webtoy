"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { CompletionResponse, getCompletionFromAPI } from "../../scripts/service";
import { Canvas } from "@react-three/fiber";
import { Group, Object3D } from "three";
import { createObject } from "@/scripts/sceneHelpers";
import { Box, OrbitControls } from "@react-three/drei";

// Types
type AiModalProps = {
  onClose: () => void;
}

type ApiResponse = {
  data: {
    prompt: string;
    scene: any[];
    description: string;
  }
}

// Constants
const EXAMPLE_PROMPT = "A castle with a moat and a bridge"

export const AiModal = ({ onClose }: AiModalProps) => {
  const [prompt, setPrompt] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [clipbloardValue, clipbloard__do] = useCopyToClipboard()
  const [result, setResult] = useState<any>(null)

  const handleGenerate = async () => {
    if (prompt === '') {
      alert("Please enter a prompt")
      return
    }
    setIsGenerating(true)

    try {
      const response = await getCompletionFromAPI(prompt) as CompletionResponse
      const choices = response.choices
      const promptRes = choices[0].message.content
      const scene = JSON.parse(promptRes)

      console.log("Generated prompt:", promptRes)
      console.log("Generated scene:", scene)

      // The scene data is already in the correct format from the API
      const sceneData = scene.data.scene
      console.log("Scene data to be displayed:", sceneData)
      
      // Copy the scene data to clipboard
      clipbloard__do(JSON.stringify(sceneData))
      // Set the result directly to the scene data array
      setResult(sceneData)

    } catch (error) {
      console.error("Error generating scene:", error)
    }
    setIsGenerating(false)
  } 

  return (
    <div className='bg-glass-10 pos-abs flex-col flex-align-center z-1000 bg-w-90 pa-4 bord-r-10'>
      {!result && (
        <div className="tx-white opaci-25 tx-altfont-1 tx-ls-3">AI GENERATION</div>
      )}
      {!!result && (
        <div className="tx-white opaci-25 tx-altfont-1 tx -ls-3">Copied to clipboard!</div>
      )}
      
      {!!result && (
        <div className="mt-4 mb-1 bord-r-10 pa-2 h-300px w-300px flex-col">
          <ShowcaseResult result={result} />
          <div className="pos-abs  bottom-0 translate-y-50 flex-row gap-2">
          <button className="  pa-2 bord-r-10 opaci-chov--50"
       onClick={()=>{setResult(null); setPrompt('')}} >Generate Again</button>
       </div>
        </div>
      )}
      {!result && (<>
      <textarea className="mt-4 mb-1 bord-r-10 pa-2 h-100px" placeholder="Enter a prompt"
       name="" id="" value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
       <div className="w-150px tx-sm tx-white opaci-50">
        <div className="tx-altfont-1">
          Example: {EXAMPLE_PROMPT}
        </div>
      </div>
      <button className="mt-4 pa-2 bord-r-10 opaci-chov--50"
       onClick={handleGenerate} disabled={isGenerating}>
        <div>
          {!!isGenerating && <div className="flex-row gap-2">
            <div className="">Generating</div>
            <div className="spin-6">|</div>
            </div>}
          {!isGenerating && <div className="tx-altfont-1">Generate 🪄</div>}
        </div>
       </button>
      </>)}
    </div>
  );
};

const ShowcaseResult = ({result}: {result: any}) => {
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
            () => {}, // setIsAdding
            () => {}, // setSelectedObject
            false,    // isAdding
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
            () => {}, // setIsAdding
            () => {}, // setSelectedObject
            false,    // isAdding
            object.hasGravity || false
          );
        });
      }
    };

    requestAnimationFrame(checkSceneReady);
  }, [result]);

  return (
    <Canvas camera={{ position: [5, 5, 5] }} shadows >
      <ambientLight intensity={0.75} />
      <pointLight position={[5, 5, 5]} intensity={50} />
      <group ref={sceneRef} />
      <OrbitControls />
    </Canvas>
  );
}
