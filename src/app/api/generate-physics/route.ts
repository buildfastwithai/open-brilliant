import { NextRequest, NextResponse } from "next/server";

import { cerebras } from "@ai-sdk/cerebras";
import { generateObject } from "ai";
import { z } from "zod";

const PROMPT_GENERATOR_SYSTEM = `You are a physics education expert who creates structured prompts for physics animations.

Your task is to analyze a raw physics question and generate a refined, structured prompt that will be used to create an interactive physics animation.

For any given physics question, you must:
1. Identify the core physics topic and concepts
2. Extract the key formulas and mathematical relationships
3. Create a detailed animation prompt that specifies exactly what should be visualized

Return ONLY valid JSON with this exact structure:
{
  "topic": "The main physics topic (e.g., 'Projectile Motion', 'Simple Harmonic Motion', 'Electromagnetic Induction')",
  "key_concepts": ["concept1", "concept2", "concept3"],
  "formulas": ["F = ma", "v = v₀ + at", "x = x₀ + v₀t + ½at²"],
  "animation_prompt": "Detailed description of what the animation should show, including objects, movements, parameters, and educational goals"
}

The animation_prompt should be comprehensive and specific, describing:
- What physics objects should be visualized
- How they should move and interact
- What parameters should be adjustable
- What real-time data should be displayed
- How to make the concept educational and clear

Focus on creating a prompt that will result in a professional, educational physics animation.`;

const SYSTEM_PROMPT = `Create an interactive physics animation with working visualization.

You MUST return ONLY valid JSON with this structure:
{
  "analysis": "Brief physics analysis with key formulas",
  "solution": "Step-by-step solution approach", 
  "code": "Complete HTML code with animation",
  "concepts": ["physics", "concepts"]
}

LAYOUT REQUIREMENTS (CRITICAL - USE CSS GRID):
Use CSS Grid with these areas:
1. CANVAS AREA (top section, full width): Animation canvas
2. CONTROLS AREA (bottom center): Play/Pause/Reset buttons 
3. PARAMETERS AREA (bottom right): Interactive sliders
4. DATA AREA (bottom left): Compact real-time data display
5. ADDITIONAL DATA AREA (below controls): Extra data that doesn't fit in main data area

IMPROVED UI DESIGN:

\`\`\`css
body, html {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: 'Arial', sans-serif;
}
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas: 
    "canvas canvas canvas"
    "data controls parameters"
    "additional-data additional-data additional-data";
  min-height: 100vh;
  gap: 16px;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
.canvas-area { 
  grid-area: canvas; 
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 20px;
  border: 3px solid #667eea;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}
canvas {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

/* IMPROVED CONTROLS - Better UI */
.controls-area { 
  grid-area: controls;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  border: 2px solid #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  padding: 20px;
  height: 100px;
}
.control-btn {
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.control-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}
.control-btn:active {
  transform: translateY(-1px);
}
.play-btn {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}
.pause-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
}
.reset-btn {
  background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
}

/* IMPROVED PARAMETERS - Better UI */
.parameters-area { 
  grid-area: parameters;
  padding: 20px;
  background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
  border-radius: 16px;
  border: 3px solid #FF6B9D;
  box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
  min-height: 200px;
}
.param-group {
  margin-bottom: 16px;
}
.param-label {
  display: block;
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}
.param-value {
  color: white;
  font-weight: 700;
  font-size: 16px;
  margin-left: 8px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}
.param-slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: rgba(255,255,255,0.3);
  outline: none;
  -webkit-appearance: none;
}
.param-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

/* IMPROVED DATA AREA - Compact Layout */
.data-area { 
  grid-area: data;
  padding: 20px;
  background: linear-gradient(135deg, #FFD93D 0%, #FF8B94 100%);
  border-radius: 16px;
  border: 3px solid #FFD93D;
  box-shadow: 0 4px 15px rgba(255, 217, 61, 0.3);
  min-height: 200px;
  overflow-y: auto;
}
.data-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
.data-item {
  background: rgba(255,255,255,0.2);
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  backdrop-filter: blur(10px);
}
.data-label {
  display: block;
  color: #333;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.data-value {
  color: #333;
  font-weight: 700;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* ADDITIONAL DATA AREA - Below Controls */
.additional-data-area { 
  grid-area: additional-data;
  padding: 20px;
  background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%);
  border-radius: 16px;
  border: 3px solid #4ECDC4;
  box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
  min-height: 120px;
  overflow-y: auto;
}
.additional-data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.additional-data-item {
  background: rgba(255,255,255,0.2);
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
}
.additional-data-label {
  display: block;
  color: white;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}
.additional-data-value {
  color: white;
  font-weight: 700;
  font-size: 18px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}
\`\`\`

HTML STRUCTURE:
\`\`\`html
<div class="container">
  <div class="canvas-area">
    <canvas id="canvas" width="900" height="450"></canvas>
  </div>
  <div class="data-area">
    <div class="data-grid">
      <div class="data-item">
        <span class="data-label">Time</span>
        <span class="data-value" id="time">0.00 s</span>
      </div>
      <div class="data-item">
        <span class="data-label">Position</span>
        <span class="data-value" id="position">0.00 m</span>
      </div>
      <div class="data-item">
        <span class="data-label">Velocity</span>
        <span class="data-value" id="velocity">0.00 m/s</span>
      </div>
      <div class="data-item">
        <span class="data-label">Energy</span>
        <span class="data-value" id="energy">0.00 J</span>
      </div>
    </div>
  </div>
  <div class="controls-area">
    <button onclick="play()" class="control-btn play-btn">▶️ Play</button>
    <button onclick="pause()" class="control-btn pause-btn">⏸️ Pause</button>
    <button onclick="reset()" class="control-btn reset-btn">🔄 Reset</button>
  </div>
  <div class="parameters-area">
    <div class="param-group">
      <label class="param-label">Parameter 1</label>
      <input type="range" class="param-slider" id="param1" min="0" max="100" value="50">
      <span class="param-value" id="param1Value">50</span>
    </div>
  </div>
  <div class="additional-data-area">
    <div class="additional-data-grid">
      <div class="additional-data-item">
        <span class="additional-data-label">Additional Data 1</span>
        <span class="additional-data-value" id="additional1">0.00</span>
      </div>
      <div class="additional-data-item">
        <span class="additional-data-label">Additional Data 2</span>
        <span class="additional-data-value" id="additional2">0.00</span>
      </div>
      <div class="additional-data-item">
        <span class="additional-data-label">Additional Data 3</span>
        <span class="additional-data-value" id="additional3">0.00</span>
      </div>
      <div class="additional-data-item">
        <span class="additional-data-label">Additional Data 4</span>
        <span class="additional-data-value" id="additional4">0.00</span>
      </div>
    </div>
  </div>
</div>
\`\`\`

CRITICAL REQUIREMENTS:
- Use the improved CSS above for better UI
- Data area uses compact grid layout to prevent overflow
- Buttons are larger and more professional looking
- Parameter sliders have better styling and labels
- Additional data area below controls shows extra physics data
- All areas have consistent spacing and visual hierarchy
- Canvas is 900x450px with gradient background
- Auto-start animation when loaded
- Use time variable for smooth animations (time += 0.016 each frame)
- Display any additional physics calculations in the additional-data-area

Return complete, working HTML with improved UI and physics animation.`;

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Define the schema for the prompt generator response
    const promptGeneratorSchema = z.object({
      topic: z.string().describe("The main physics topic"),
      key_concepts: z.array(z.string()).describe("Array of key physics concepts"),
      formulas: z.array(z.string()).describe("Array of relevant physics formulas"),
      animation_prompt: z.string().describe("Detailed description of what the animation should show"),
    });

    // Define the schema for the physics response
    const physicsSchema = z.object({
      analysis: z
        .union([z.string(), z.array(z.string())])
        .transform((val) => (Array.isArray(val) ? val.join(" ") : val))
        .describe("Brief explanation of the physics concept with key formulas"),
      solution: z
        .union([z.string(), z.array(z.string())])
        .transform((val) => (Array.isArray(val) ? val.join(" ") : val))
        .describe(
          "Step-by-step solution approach following the 3-step process"
        ),
      code: z.string().describe("Complete HTML code with animation"),
      concepts: z
        .union([z.array(z.string()), z.string()])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .describe("Array of physics concepts"),
    });

    // STEP 1: Generate refined structured prompt
    const { object: generatedPrompt } = await generateObject({
      model: cerebras("qwen-3-coder-480b"),
      system: PROMPT_GENERATOR_SYSTEM,
      prompt: `Physics Question: ${question}

Analyze this physics question and create a structured prompt for animation generation.`,
      schema: promptGeneratorSchema,
      temperature: 0.3,
    });
console.log(generatedPrompt);
    // STEP 2: Generate physics analysis and code using the refined prompt
    const { object: physicsResult } = await generateObject({
      model: cerebras("qwen-3-coder-480b"),
      system: SYSTEM_PROMPT,
      prompt: `Physics Question: ${question}

Generated Animation Prompt: ${generatedPrompt.animation_prompt}

Topic: ${generatedPrompt.topic}
Key Concepts: ${generatedPrompt.key_concepts.join(", ")}
Formulas: ${generatedPrompt.formulas.join(", ")}

Follow the 3-step deep thinking process:

STEP 1 - CREATE FORMULA: 
- Identify the key physics equations for this concept
- Define all variables and their relationships
- Consider initial conditions and constraints

STEP 2 - THINK ABOUT REPRESENTATION:
- How to visually represent each component
- What should animate and how
- How to show the mathematical relationships graphically
- Plan the user interface and controls

STEP 3 - IMPLEMENT:
- Create interactive animation using the EXACT CSS Grid layout structure provided
- Canvas goes in canvas-area (left side, 2fr width)
- Controls go in controls-area (top-right)
- Parameters go in parameters-area (middle-right)
- Data/graphs go in data-area (bottom-right)
- Include real-time calculations and parameter controls with premium visual styling
- Make the physics concepts clear and educational with sophisticated animations
- Implement advanced visual effects for professional-quality animations

CRITICAL: Follow the CSS Grid structure exactly - use the provided grid-template-areas.

ENHANCED ANIMATION IMPLEMENTATION:
- Use advanced canvas rendering techniques for premium visual quality
- Implement multi-layered visual effects (shadows, glows, particles)
- Create smooth, natural motion with proper easing functions
- Add visual feedback for all interactions and state changes
- Use sophisticated color schemes with gradients and lighting effects
- Implement particle systems and trail effects where appropriate
- Create depth and dimension with advanced shadow techniques
- Add atmospheric effects and ambient animations
- Use professional typography with visual enhancements for data display

DESIGN CONSISTENCY REQUIREMENTS:
- Copy the EXACT CSS from the template above - do NOT modify any values
- All buttons MUST use the exact classes: control-btn, play-btn, pause-btn, reset-btn
- Button dimensions are FIXED: 80px width, 40px height - never change these
- Use the EXACT HTML structure provided - no variations
- Colors, gradients, and sizes are LOCKED - creativity should be in physics animation only
- If generated design looks different from template, you are doing it WRONG
- Focus all creative energy on making the animations visually stunning and professional

IMPORTANT: Return analysis and solution as SINGLE STRING values, not arrays.`,
      schema: physicsSchema,
      temperature: 0.3,
    });

    return NextResponse.json({
      success: true,
      generatedPrompt: generatedPrompt,
      analysis: physicsResult.analysis,
      solution: physicsResult.solution,
      code: physicsResult.code,
      concepts: physicsResult.concepts,
    });
  } catch (error) {
    console.error("API Error:", error);

    // Return proper error response instead of fallback
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { 
        error: errorMessage,
        success: false 
      },
      { status: 500 }
    );
  }
}
