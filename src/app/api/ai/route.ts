// pages/api/getCompletion.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Types
type Data = {
  choices?: { text: string }[];
  error?: string;
};

type SceneObject = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  hasGravity: boolean;
}

type ResponseData = {
  prompt: string;
  scene: SceneObject[];
  description: string;
}

// Constants
const API_CONFIG = {
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000,
  url: 'https://api.openai.com/v1/chat/completions'
}

const EXAMPLE_TEMPLATE = [
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[2,2,2],"color":"ffffff","hasGravity":false}, // Main structure
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[5,0.1,5],"color":"00ff00","hasGravity":false}, // Ground
  {"position":[0,1,0],"rotation":[0,0,0],"scale":[1.5,1.5,1.5],"color":"ff9900","hasGravity":false}, // Roof
  {"position":[0,0,0.5],"rotation":[0,0,0],"scale":[0.5,1,0.5],"color":"333333","hasGravity":false} // Door
]

const EXAMPLE_SCENES = [
  "A modern house with a garden and pool",
  "A medieval castle with a moat and drawbridge",
  "A futuristic city street with flying cars",
  "A peaceful mountain landscape with a lake",
  "A sports stadium with stands and field",
  "A space station with docking ports",
  "A pirate ship with sails and cannons",
  "A treehouse village in a forest",
  "A desert oasis with palm trees",
  "A underwater city with coral reefs"
]

const SYSTEM_PROMPT = `act as a professional 3D scene designer
analyze this prompt and generate a scene description as an array of 3D objects
each object should have position, rotation, scale, color, and hasGravity properties
use hex colors without the # prefix
keep the scene reasonable in size and complexity
make sure objects are properly positioned relative to each other
include appropriate details and decorations

Example template format:
${JSON.stringify(EXAMPLE_TEMPLATE, null, 2)}

Example scenes you can generate:
${EXAMPLE_SCENES.map(scene => `- ${scene}`).join('\n')}

Only respond with a JSON object in this exact format: ${JSON.stringify({
  data: {
    prompt: "The original prompt provided",
    scene: EXAMPLE_TEMPLATE,
    description: "A brief description of the generated scene"
  }
})}`

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    const response = await fetch(API_CONFIG.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: API_CONFIG.model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt }
        ],
        temperature: API_CONFIG.temperature,
        max_tokens: API_CONFIG.maxTokens,
      }),
    });

    const data = await response.json() as Data;
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Error generating 3D scene' }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
