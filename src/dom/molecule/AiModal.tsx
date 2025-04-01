"use client";

import { useMemo, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { CompletionResponse, getCompletionFromAPI } from "../../../scripts/service";
import { Object3D } from "three";
import { Box } from "@react-three/drei";
import { AIShowcaseResult } from "./AIShowcaseResult";
import { ModalCloseButton } from "../atom/game/ModalCloseButton";
import { GameButton } from "../atom/game/GameButton";

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
  const [didCopy, setDidCopy] = useState<number>(0)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (prompt === '') {
      alert("Please enter a prompt")
      return
    }
    setIsGenerating(true)
    setError(null)

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
      navigator.clipboard.writeText(JSON.stringify(sceneData))
      // Set the result directly to the scene data array
      setResult(sceneData)

    } catch (error) {
      console.error("Error generating scene:", error)
      setError("Failed to generate scene. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  } 

  return (
    <div className=' pos-abs flex-col flex-align-center z-1000 pa-4 bord-r-10'
    style={{
      boxShadow: "0 3px 1px 1px #805300, inset 0 2px 5px 2px #FFD700",
      background: "linear-gradient(180deg, #F5D67B, #D4A35E)",
    }}
    >
      <ModalCloseButton  onClose={onClose} />
      {!result && !error && (
        <div className="tx- opaci-25 tx-altfont-1 tx-ls-3">AI GENERATION</div>
      )}
      {!!result && (
        <GameButton 
          buttonType="alpha" 
          classOverride="tx-mdl"
          // className="tx- opaci-25 tx-altfont-1 tx-ls-3 nobg cursor-pointer opaci-chov--75"
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(result));
            setDidCopy((prev) => prev + 1)
            // alert('Scene data copied to clipboard!');
          }}
        >
          {didCopy ? `Copied to clipboard! ${didCopy == 0 ? '' : `x${didCopy}`}` : 'Copy to clipboard'}
        </GameButton>
      )}
      {!!error && (
        <div className="tx-red opaci-75 tx-altfont-1 w-150px">{error}</div>
      )}
      
      {!!result && (
        <div className="mt-4 mb-1 bord-r-10 pa-2 h-300px w-300px flex-col">
          <AIShowcaseResult result={result} />
          <div className="pos-abs  bottom-0 translate-y-50 flex-row gap-2">
          <GameButton  buttonType="zeta" classOverride="tx-md"
       onClick={()=>{setResult(null); setPrompt('')}} >Generate Again
       </GameButton>
       </div>
        </div>
      )}
      {!result && (<>
      <textarea disabled={isGenerating} className="mt-4 mb-1 bord-r-10 pa-2 h-100px" placeholder="Enter a prompt"
       name="" id="" value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
       <div className="w-150px tx-sm tx-black  opaci-50">
        <div className="tx-altfont-1">
          Example: {EXAMPLE_PROMPT}
        </div>
      </div>
      <GameButton buttonType="alpha" classOverride="mt-4 tx-lg"
       onClick={()=>{
        if (prompt === '') {
          alert("Please enter a prompt")
          return
        }
        if (prompt.length < 3) {
          alert("Prompt must be at least 3 characters")
          return
        }
        if (prompt.length > 100) {
          alert("Prompt must be less than 100 characters")
          return
        }
        // if is generating, don't generate again
        if (isGenerating) {
          alert("Please wait for the current generation to complete")
          return
        }
        handleGenerate()
       }} disabled={isGenerating}>
        <div>
          {!!isGenerating && <div className="flex-row gap-2">
            <div className="">Generating</div>
            <div className="spin-6">🪄</div>
            </div>}
          {!isGenerating && <div className="tx-altfont-1">Generate 🪄</div>}
        </div>
       </GameButton>
      </>)}
    </div>
  );
};


