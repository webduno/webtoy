"use client";

import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { CompletionResponse, getCompletionFromAPI } from "../../scripts/service";

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

      const sceneData = scene.data.scene
      const sceneDescription = scene.description

      console.log("Scene data:", sceneData)
      console.log("Scene description:", sceneDescription)
      clipbloard__do(JSON.stringify(sceneData))

    } catch (error) {
      console.error("Error generating scene:", error)
    }
    setIsGenerating(false)
  } 

  return (
    <div className='bg-glass-10 pos-abs flex-col flex-align-center z-1000 bg-b-90 pa-4 bord-r-10'>
      <div className='tx-white opaci-25 tx-altfont-1 tx-ls-3'>AI GENERATION</div>
      
      <textarea className="mt-4 mb-1 bord-r-10 pa-2 h-100px" placeholder="Enter a prompt"
       name="" id="" value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
       <div className="w-150px tx-sm tx-white opaci-50">
        <div className="tx-altfont-1">
          Example: {EXAMPLE_PROMPT}
        </div>
      </div>
      <button className="mt-4 pa-2"
       onClick={handleGenerate} disabled={isGenerating}>Generate</button>
    </div>
  );
};
