import { NextRequest, NextResponse } from "next/server";

import { cerebras } from "@ai-sdk/cerebras";
import { generateText } from "ai";

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
1. CANVAS AREA (left side, 70% width): Animation canvas only
2. CONTROLS AREA (top-right): Play/Pause/Reset buttons 
3. PARAMETERS AREA (middle-right): Interactive sliders for physics parameters
4. DATA AREA (bottom-right): Real-time physics calculations and graphs

EXACT GRID LAYOUT STRUCTURE:
\`\`\`css
.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "canvas controls"
    "canvas parameters" 
    "canvas data";
  height: 100vh;
  gap: 16px;
  padding: 16px;
}
.canvas-area { grid-area: canvas; }
.controls-area { grid-area: controls; }
.parameters-area { grid-area: parameters; }
.data-area { grid-area: data; }
\`\`\`

HTML STRUCTURE:
\`\`\`html
<div class="container">
  <div class="canvas-area">
    <canvas id="canvas" width="800" height="500"></canvas>
  </div>
  <div class="controls-area">
    <button onclick="play()">▶️ Play</button>
    <button onclick="pause()">⏸️ Pause</button>
    <button onclick="reset()">🔄 Reset</button>
  </div>
  <div class="parameters-area">
    <!-- Parameter sliders here -->
  </div>
  <div class="data-area">
    <!-- Real-time data and graphs here -->
  </div>
</div>
\`\`\`

ANIMATION REQUIREMENTS:
1. Canvas should be 800x500px in the canvas-area
2. Use modern, clean styling with proper spacing
3. Each grid area should have distinct styling and clear boundaries
4. Include working parameter controls with real-time updates
5. Show real-time physics data and calculations
6. Use time variable for smooth animations (time += 0.016 each frame)
7. Auto-start animation when loaded

CRITICAL ANIMATION RULES:
- The draw() function MUST contain moving objects
- Show relevant physics objects (not just dots)
- Display real-time calculations in the data-area
- All interactive elements must be functional
- Each grid area must be clearly defined and styled

For RC Circuit specifically:
- Draw capacitor plates, resistor, and wires clearly
- Animate voltage buildup with visual indicators
- Show voltage vs time graph
- Display current values and time constant
- Use exponential charging formula: V(t) = V₀(1 - e^(-t/RC))

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

    // Generate physics analysis and code using Cerebras
    const { text } = await generateText({
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

Return ONLY valid JSON without any markdown formatting.`,
      temperature: 0.1,
    });

    let result;
    try {
      // Clean the text to extract JSON
      let cleanText = text.trim();

      // Remove markdown code blocks if present
      if (cleanText.startsWith("```json")) {
        cleanText = cleanText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      // Find JSON object in the text
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }

      result = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError);
      console.error("Raw text:", text);

      // If JSON parsing fails, create a structured response
      result = {
        analysis: text,
        solution:
          "Please try rephrasing your question for a more specific physics concept.",
        code: generateFallbackCode(question),
        concepts: ["general physics"],
      };
    }

    // The generated code will be validated by the browser iframe

    return NextResponse.json({
      success: true,
      analysis: result.analysis,
      solution: result.solution,
      code: result.code,
      concepts: result.concepts || ["physics"],
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate physics visualization" },
      { status: 500 }
    );
  }
}

function generateFallbackCode(question: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: white; color: black; font-family: Arial; margin: 0; padding: 10px; }
  .container { width: 100%; max-width: 100%; margin: 0; text-align: center; }
  .animation-area { border: 2px solid black; margin: 10px 0; height: 300px; position: relative; width: 100%; }
  #canvas { width: 100%; height: 280px; display: block; }
  .controls { display: flex; gap: 12px; margin: 15px 0; flex-wrap: wrap; justify-content: center; }
  .controls button { 
    padding: 12px 20px; 
    border: 2px solid #000; 
    background: #fff; 
    cursor: pointer; 
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .controls button:hover { 
    background: #000; 
    color: #fff; 
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  .concepts-section {
    margin: 25px 0;
    padding: 30px;
    background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
    border: 3px solid #000;
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
  }
  .concepts-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #000 0%, #333 50%, #000 100%);
  }
  .concepts-section h3 {
    margin-top: 0;
    font-size: 24px;
    font-weight: 800;
    color: #000;
    margin-bottom: 20px;
    border-bottom: 3px solid #000;
    padding-bottom: 12px;
    position: relative;
    letter-spacing: 0.5px;
  }
  .concepts-section h3::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #000 0%, transparent 100%);
  }
  .concepts-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
    justify-content: center;
  }
  .concept-button {
    padding: 12px 20px;
    background: #fff;
    border: 3px solid #000;
    border-radius: 25px;
    color: #000;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.4s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    position: relative;
    overflow: hidden;
    text-transform: capitalize;
    letter-spacing: 0.3px;
  }
  .concept-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
    transition: left 0.5s ease;
  }
  .concept-button:hover {
    background: #000;
    color: #fff;
    border-color: #000;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  }
  .concept-button:hover::before {
    left: 100%;
  }
  .analysis-section, .solution-section {
    margin: 25px 0;
    padding: 30px;
    background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
    border: 3px solid #000;
    border-radius: 16px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }
  .analysis-section::before, .solution-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #000 0%, #333 50%, #000 100%);
  }
  .analysis-section:hover, .solution-section:hover {
    border-color: #000;
    box-shadow: 0 12px 35px rgba(0,0,0,0.2), 0 6px 15px rgba(0,0,0,0.15);
    transform: translateY(-3px);
  }
  .analysis-section h3, .solution-section h3 {
    margin-top: 0;
    font-size: 24px;
    font-weight: 800;
    color: #000;
    margin-bottom: 20px;
    border-bottom: 3px solid #000;
    padding-bottom: 12px;
    position: relative;
    letter-spacing: 0.5px;
  }
  .analysis-section h3::after, .solution-section h3::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #000 0%, transparent 100%);
  }
  .analysis-section p, .solution-section p {
    line-height: 1.7;
    font-size: 16px;
    color: #222;
    margin: 0 0 18px 0;
    padding: 15px 20px;
    background: rgba(0,0,0,0.02);
    border-left: 4px solid #000;
    border-radius: 0 8px 8px 0;
    position: relative;
  }
  .analysis-section p::before, .solution-section p::before {
    content: '';
    position: absolute;
    left: -4px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #000 0%, #333 50%, #000 100%);
  }
  .physics-info-enhanced {
    background: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%);
    padding: 30px;
    border: 2px solid #000;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    margin: 25px 0;
  }
  .physics-info-enhanced h3 {
    margin-top: 0;
    font-size: 26px;
    font-weight: 800;
    color: #000;
    border-bottom: 3px solid #000;
    padding-bottom: 12px;
    text-align: center;
    letter-spacing: 0.5px;
  }
</style>
</head>
<body>
  <div class="container">
    <h2>🔬 Physics Question Analysis</h2>
    
    <!-- Concepts Section -->
    <div class="concepts-section">
      <h3>🔬 Key Concepts</h3>
      <div class="concepts-container">
        <div class="concept-button">general physics</div>
        <div class="concept-button">analysis</div>
        <div class="concept-button">visualization</div>
        <div class="concept-button">interaction</div>
      </div>
    </div>
    
    <div class="animation-area">
      <canvas id="canvas" width="100%" height="280"></canvas>
    </div>
    <div class="controls">
      <button id="playBtn" onclick="playAnimation()">▶️ Play</button>
      <button id="pauseBtn" onclick="pauseAnimation()">⏸️ Pause</button>
      <button id="resetBtn" onclick="resetAnimation()">🔄 Reset</button>
    </div>
    
    <!-- Analysis Section -->
    <div class="analysis-section">
      <h3>📊 Analysis</h3>
      <p>This question requires further analysis. Please provide more specific details about the physics concept you'd like to visualize.</p>
    </div>
    
    <!-- Solution Section -->
    <div class="solution-section">
      <h3>💡 Solution</h3>
      <p>Once you provide more specific details about your physics question, we can generate an interactive visualization with step-by-step solutions.</p>
    </div>
    
    <div class="physics-info-enhanced">
      <h3>⚡ Physics Information</h3>
      <p><strong>Question:</strong> ${question}</p>
      <p>Please provide more specific details about the physics concept you'd like to explore.</p>
    </div>
  </div>
  <script>
    let canvas, ctx;
    let animationId;
    let isPlaying = false;
    let time = 0;
    
    function initializeAnimation() {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      if (canvas && ctx) {
        // Set canvas size to match container
        resizeCanvas();
        draw();
        // Start animation automatically
        playAnimation();
      }
    }
    
    // Resize canvas to fit container
    function resizeCanvas() {
      if (!canvas) return;
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth - 4; // Account for border
        const containerHeight = 280;
        canvas.width = containerWidth;
        canvas.height = containerHeight;
      }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeAnimation);
    } else {
      setTimeout(initializeAnimation, 100);
    }
    
    window.onload = initializeAnimation;
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (canvas && ctx) {
        resizeCanvas();
        draw();
      }
    });
    
    function playAnimation() {
      if (!isPlaying) {
        isPlaying = true;
        console.log('Starting animation...');
        updateButtonStates();
        animate();
      }
    }
    
    function pauseAnimation() {
      isPlaying = false;
      console.log('Pausing animation...');
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      updateButtonStates();
    }
    
    function resetAnimation() {
      console.log('Resetting animation...');
      pauseAnimation();
      time = 0;
      draw();
      updateButtonStates();
    }
    
    function updateButtonStates() {
      const playBtn = document.getElementById('playBtn');
      const pauseBtn = document.getElementById('pauseBtn');
      if (playBtn && pauseBtn) {
        if (isPlaying) {
          playBtn.style.opacity = '0.5';
          pauseBtn.style.opacity = '1';
        } else {
          playBtn.style.opacity = '1';
          pauseBtn.style.opacity = '0.5';
        }
      }
    }
    
    function animate() {
      if (!isPlaying) {
        console.log('Animation stopped');
        return;
      }
      time += 0.016;
      draw();
      animationId = requestAnimationFrame(animate);
    }
    
    function draw() {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw modern animated elements with context-specific objects
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Modern Car Animation
      function drawCar(x, y, color, scale = 1) {
        const width = 60 * scale;
        const height = 30 * scale;
        
        // Car body with gradient
        const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '80');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, height);
        
        // Car windows
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(x + 5, y + 5, width - 10, height - 15);
        
        // Wheels
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(x + 10, y + height, 8 * scale, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + width - 10, y + height, 8 * scale, 0, 2 * Math.PI);
        ctx.fill();
        
        // Headlights
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x + width, y + 5, 3 * scale, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + width, y + height - 5, 3 * scale, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // Modern Ball with shadow and gradient
      function drawBall(x, y, color, radius) {
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.ellipse(x + 3, y + radius + 3, radius * 0.8, radius * 0.3, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Ball with gradient
        const gradient = ctx.createRadialGradient(x - radius/3, y - radius/3, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + 'CC');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath();
        ctx.arc(x - radius/3, y - radius/3, radius/4, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // Draw modern objects
      drawCar(centerX + 50 * Math.sin(time * 0.02) - 30, centerY - 15, '#FF6B6B', 0.8);
      drawBall(centerX + 40 * Math.cos(time * 0.03), centerY + 30, '#4ECDC4', 12);
      drawBall(centerX + 60 * Math.sin(time * 0.015), centerY, '#45B7D1', 10);
    }
  </script>
</body>
</html>`;
}
