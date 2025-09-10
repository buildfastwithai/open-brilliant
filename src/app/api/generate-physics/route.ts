import { NextRequest, NextResponse } from "next/server";

import { cerebras } from "@ai-sdk/cerebras";
import { generateObject } from "ai";
import { z } from "zod";

const SYSTEM_PROMPT = `Create an interactive physics animation with working visualization.

THINK DEEPLY AND WORK IN THESE STEPS:
1. FIRST CREATE FORMULA - Identify the key physics equations and mathematical relationships
2. THEN THINK ABOUT HOW TO REPRESENT - Plan the visual representation and animation approach  
3. THEN IMPLEMENT - Build the complete interactive animation

You MUST return ONLY valid JSON with this structure:
{
  "analysis": "Brief explanation of the physics concept with key formulas",
  "solution": "Step-by-step solution approach following the 3-step process above", 
  "code": "Complete HTML code with animation",
  "concepts": ["physics", "concepts"]
}

LAYOUT REQUIREMENTS (CRITICAL - USE CSS GRID):
Use CSS Grid to create a proper block-based layout with these areas:
1. CANVAS AREA (top section, full width): Animation canvas with larger size
2. CONTROLS AREA (bottom center): Play/Pause/Reset buttons 
3. PARAMETERS AREA (bottom right): Interactive sliders for physics parameters
4. DATA AREA (bottom left): Real-time physics calculations and graphs

EXACT GRID LAYOUT STRUCTURE:
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
  grid-template-rows: auto auto;
  grid-template-areas: 
    "canvas canvas canvas"
    "data controls parameters";
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
.canvas-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}
canvas {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}
.controls-area { 
  grid-area: controls;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  border: 2px solid #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  padding: 16px;
  height: 80px;
}
.control-btn {
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 80px;
  height: 40px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.control-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}
.control-btn:hover::before {
  left: 100%;
}
.control-btn:hover {
  transform: translateY(-2px) scale(1.02);
  opacity: 0.9;
}
.control-btn:active {
  transform: translateY(0px) scale(1.0);
}
.play-btn {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  box-shadow: 0 3px 10px rgba(17, 153, 142, 0.3);
}
.play-btn:hover {
  box-shadow: 0 4px 12px rgba(17, 153, 142, 0.4);
}
.pause-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
  box-shadow: 0 3px 10px rgba(255, 107, 107, 0.3);
}
.pause-btn:hover {
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}
.reset-btn {
  background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
  box-shadow: 0 3px 10px rgba(162, 155, 254, 0.3);
}
.reset-btn:hover {
  box-shadow: 0 4px 12px rgba(162, 155, 254, 0.4);
}
.parameters-area { 
  grid-area: parameters;
  padding: 16px;
  background: linear-gradient(135deg, #FF6B9D 0%, #C44569 100%);
  border-radius: 16px;
  border: 3px solid #FF6B9D;
  box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
  min-height: 200px;
}
.data-area { 
  grid-area: data;
  padding: 16px;
  background: linear-gradient(135deg, #FFD93D 0%, #FF8B94 100%);
  border-radius: 16px;
  border: 3px solid #FFD93D;
  box-shadow: 0 4px 15px rgba(255, 217, 61, 0.3);
  min-height: 200px;
}
\`\`\`

HTML STRUCTURE:
\`\`\`html
<div class="container">
  <div class="canvas-area">
    <canvas id="canvas" width="900" height="450" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);"></canvas>
  </div>
  <div class="data-area">
    <!-- Real-time data and graphs here -->
  </div>
  <div class="controls-area">
    <button onclick="play()" class="control-btn play-btn">▶️ Play</button>
    <button onclick="pause()" class="control-btn pause-btn">⏸️ Pause</button>
    <button onclick="reset()" class="control-btn reset-btn">🔄 Reset</button>
  </div>
  <div class="parameters-area">
    <!-- Parameter sliders here -->
  </div>
</div>
\`\`\`

ANIMATION REQUIREMENTS:
1. Canvas should be 900x450px with light gradient background (NOT white)
2. Use modern, clean styling with proper spacing and colorful backgrounds
3. Each grid area should have distinct styling and clear boundaries
4. Include working parameter controls with real-time updates
5. Show real-time physics data and calculations
6. Use time variable for smooth animations (time += 0.016 each frame)
7. Auto-start animation when loaded
8. Controls should be prominently displayed at the bottom center
9. Parameters should have colorful styling (pink theme)
10. Data area should have distinct styling (yellow theme)
11. CANVAS BACKGROUND: Use subtle gradient, NOT plain white - make it visually appealing
12. Add colorful physics objects with gradients and shadows for visual appeal
13. Use bright, vibrant colors for all physics elements (balls, objects, particles)
14. Make animations smooth and visually engaging with particle effects when possible

CRITICAL ANIMATION RULES:
- The draw() function MUST contain moving objects
- Show relevant physics objects (not just dots)
- Display real-time calculations in the data-area
- All interactive elements must be functional
- Each grid area must be clearly defined and styled

UI GUIDELINES - FOLLOW EXACTLY (NO VARIATIONS ALLOWED):
- Use the EXACT CSS template provided - DO NOT modify button sizes, colors, or layout
- CRITICAL: Control buttons MUST be exactly 80px wide × 40px high - NO EXCEPTIONS
- Controls area MUST be exactly 80px high with 16px padding
- Button gap MUST be exactly 12px
- Font size MUST be exactly 14px for buttons
- Border radius MUST be exactly 25px for buttons, 16px for areas
- Canvas area MUST have the purple gradient background with decorative elements
- Canvas itself MUST have light gradient background (not white) for better visual appeal
- EXACT color scheme: Hot Pink/Purple for parameters, Yellow/Coral for data, Purple gradient for controls and canvas area
- Button hover effects MUST be subtle: translateY(-2px) scale(1.02) only
- NEVER change the grid layout structure or proportions
- Consistency is MORE important than creativity - stick to the template

Return complete, working HTML with proper layout and physics animation.`;

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

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

    // Generate physics analysis and code using Cerebras
    const { object } = await generateObject({
      model: cerebras("qwen-3-coder-480b"),
      system: SYSTEM_PROMPT,
      prompt: `Physics Question: ${question}

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
- Include real-time calculations and parameter controls
- Make the physics concepts clear and educational

CRITICAL: Follow the CSS Grid structure exactly - use the provided grid-template-areas.

DESIGN CONSISTENCY REQUIREMENTS:
- Copy the EXACT CSS from the template above - do NOT modify any values
- All buttons MUST use the exact classes: control-btn, play-btn, pause-btn, reset-btn
- Button dimensions are FIXED: 80px width, 40px height - never change these
- Use the EXACT HTML structure provided - no variations
- Colors, gradients, and sizes are LOCKED - creativity should be in physics animation only
- If generated design looks different from template, you are doing it WRONG

IMPORTANT: Return analysis and solution as SINGLE STRING values, not arrays.`,
      schema: physicsSchema,
      temperature: 0.1,
    });

    // Object is already structured and validated by Zod schema
    const result = object;

    return NextResponse.json({
      success: true,
      analysis: result.analysis,
      solution: result.solution,
      code: result.code,
      concepts: result.concepts,
    });
  } catch (error) {
    console.error("API Error:", error);

    // If structured generation fails, return fallback response
    return NextResponse.json({
      success: true,
      analysis:
        "Unable to generate structured analysis for this physics concept.",
      solution:
        "Please try rephrasing your question for a more specific physics concept.",
      code: ``,
      concepts: ["general physics"],
    });
  }
}
