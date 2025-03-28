// pages/api/getCompletion.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Configure longer timeout
export const runtime = 'edge';
export const maxDuration = 60; // Set timeout to 60 seconds

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
  // Base/ground
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[20,0.1,20],"color":"a3a3a3","hasGravity":false},
  // Main house body
  {"position":[0,2,0],"rotation":[0,0,0],"scale":[8,4,6],"color":"e6d5ac","hasGravity":false},
  // Roof
  {"position":[0,5,0],"rotation":[0,0,0],"scale":[9,2,7],"color":"8b4513","hasGravity":false},
  // Door
  {"position":[0,1.5,3.1],"rotation":[0,0,0],"scale":[1.5,3,0.2],"color":"8b4513","hasGravity":false},
  // Left window
  {"position":[-2,2.5,3.1],"rotation":[0,0,0],"scale":[1.5,1.5,0.1],"color":"87ceeb","hasGravity":false},
  // Right window
  {"position":[2,2.5,3.1],"rotation":[0,0,0],"scale":[1.5,1.5,0.1],"color":"87ceeb","hasGravity":false}
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

const SYSTEM_PROMPT = `You are a professional 3D scene designer. Your task is to analyze the provided prompt and generate a detailed 3D scene description.

Each scene object should have position, rotation, scale, color, and hasGravity properties.
the hasGravity should be always false

Core Guidelines:
- Always start with a ground/base plane unless the scene is in space
- Position is relative to center (0,0,0), with Y being up
- Scale uses [width, height, depth] format
- Colors should be hex codes without #
- Scene size typically maxes at 20x20x20 unless specified
- Smaller decorative elements can be below 1x1x1

Object-Specific Guidelines:
For Buildings:
- Walls should be tall (3-4 units)
- Doors should be human-proportional (2-3 units tall)
- Windows at eye level
- Roofs should extend beyond walls

For Natural Objects:
- Trees: taller than wide, with distinct trunk and foliage
- Rocks: irregular scales, earth-toned colors
- Water: flat planes with translucent blues
- Mountains: wide bases tapering to peaks

For Vehicles/Machines:
- Clear distinction between body and components
- Proper wheel/wing placement
- Realistic proportions relative to human scale

For Characters/Creatures:
- Head-to-body proportions maintained
- Limbs properly positioned
- Basic features clearly defined

Style Guidelines:
- make sure objects overlap each other to create a more interesting scene
- Use natural, pleasing color palettes
- Prefer pastel or muted colors over bright ones
- Maintain a cartoon/stylized aesthetic
- Keep scenes readable and not overcrowded
- Layer objects for depth and interest
- Add appropriate environmental details
- include a minimum of 10 objects in the scene
- calculate the position of each object to make them intersect each other

Your response must be a JSON object in this format:
{
  "data": {
    "prompt": "The original prompt provided",
    "scene": ${JSON.stringify(EXAMPLE_TEMPLATE, null, 2)},
    "description": "A brief description of the generated scene"
  }
}`

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
