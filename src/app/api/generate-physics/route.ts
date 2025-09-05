import { NextRequest, NextResponse } from 'next/server'
import { Sandbox } from '@e2b/code-interpreter'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

const SYSTEM_PROMPT = `You are a physics education assistant that creates HIGHLY INTERACTIVE visualizations for physics concepts.

Your task is to:
1. Analyze the physics concepts in the user's question
2. Identify what type of visualization would be most helpful
3. Generate clean HTML/CSS/JavaScript code for animations with REAL-TIME PARAMETER CONTROLS
4. Use consistent layout with black/white theme
5. Include interactive parameter sliders and input fields
6. Show real-time calculations and formulas that update as parameters change

CRITICAL REQUIREMENTS for Interactive Animations:
- MUST include parameter control sliders/inputs for key physics variables
- Examples: velocity, angle, mass, gravity, time, friction, spring constant, etc.
- Parameters should update the animation in REAL-TIME as user adjusts them
- Include play, pause, reset, and speed control buttons
- Show live calculations and formulas that change with parameters
- Use HTML5 Canvas for smooth animations
- Implement proper physics equations that respond to parameter changes

Code Requirements:
- Use vanilla JavaScript with HTML5 Canvas
- Self-contained HTML with embedded CSS/JS
- Responsive design
- Clear visual hierarchy
- Mathematical formulas displayed properly with real-time updates
- Interactive parameter controls (sliders, number inputs)
- Animation controls (play, pause, reset, speed adjustment)
- Consistent black/white styling

MANDATORY Layout Structure with Parameter Controls:
<!DOCTYPE html>
<html>
<head>
<style>
  body { background: white; color: black; font-family: Arial; margin: 0; padding: 20px; }
  .container { max-width: 900px; margin: 0 auto; }
  .animation-area { border: 2px solid black; margin: 20px 0; position: relative; }
  .controls { display: flex; gap: 10px; margin: 10px 0; flex-wrap: wrap; }
  .controls button { padding: 8px 16px; border: 1px solid black; background: white; cursor: pointer; }
  .controls button:hover { background: black; color: white; }
  .parameter-controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 15px 0; }
  .parameter-group { border: 1px solid #ccc; padding: 10px; background: #f9f9f9; }
  .parameter-group label { display: block; font-weight: bold; margin-bottom: 5px; }
  .parameter-group input[type="range"] { width: 100%; margin: 5px 0; }
  .parameter-group input[type="number"] { width: 80px; padding: 3px; border: 1px solid #ccc; }
  .parameter-value { font-family: monospace; background: #f0f0f0; padding: 2px 5px; }
  .info-panel { background: #f5f5f5; padding: 15px; border: 1px solid black; }
  .formula { font-family: monospace; background: #f0f0f0; padding: 5px; margin: 5px 0; border: 1px solid #ccc; }
  .live-calculations { background: #e8f4f8; padding: 10px; border: 1px solid #4a90e2; margin: 10px 0; }
</style>
</head>
<body>
  <div class="container">
    <h2>Physics Concept Title</h2>
    <div class="animation-area">
      <canvas id="canvas" width="800" height="400"></canvas>
    </div>
    <div class="controls">
      <button onclick="playAnimation()">Play</button>
      <button onclick="pauseAnimation()">Pause</button>
      <button onclick="resetAnimation()">Reset</button>
      <button onclick="toggleSpeed()">Speed: <span id="speedDisplay">1x</span></button>
    </div>
    <div class="parameter-controls">
      <div class="parameter-group">
        <label>Parameter 1 (e.g., Velocity):</label>
        <input type="range" id="param1" min="0" max="100" value="50" oninput="updateParameter('param1', this.value)">
        <span class="parameter-value" id="param1Value">50</span>
        <input type="number" id="param1Input" value="50" onchange="updateParameter('param1', this.value)">
      </div>
      <!-- Add more parameter groups as needed -->
    </div>
    <div class="info-panel">
      <h3>Physics Information</h3>
      <div class="live-calculations">
        <h4>Live Calculations:</h4>
        <div class="formula" id="calculation1">Formula 1: Value = <span id="calc1Value">0</span></div>
        <div class="formula" id="calculation2">Formula 2: Value = <span id="calc2Value">0</span></div>
      </div>
    </div>
  </div>
  <script>
    // Animation variables
    let canvas, ctx;
    let animationId;
    let isPlaying = false;
    let speed = 1;
    let time = 0;
    
    // Physics parameters (update these based on the specific physics concept)
    let params = {
      param1: 50,  // e.g., velocity
      param2: 30,  // e.g., angle
      param3: 10   // e.g., mass
    };
    
    // Initialize
    window.onload = function() {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      console.log('Canvas initialized:', canvas, ctx);
      if (canvas && ctx) {
        draw();
        updateCalculations();
        console.log('Initial draw completed');
      } else {
        console.error('Canvas or context not found');
      }
    };
    
    // Also initialize immediately if DOM is already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        if (canvas && ctx) {
          draw();
          updateCalculations();
        }
      });
    } else {
      // DOM already loaded
      setTimeout(function() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        if (canvas && ctx) {
          draw();
          updateCalculations();
        }
      }, 100);
    }
    
    // Animation controls
    function playAnimation() {
      if (!isPlaying) {
        isPlaying = true;
        animate();
      }
    }
    
    function pauseAnimation() {
      isPlaying = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }
    
    function resetAnimation() {
      pauseAnimation();
      time = 0;
      draw();
    }
    
    function toggleSpeed() {
      speed = speed === 1 ? 2 : speed === 2 ? 0.5 : 1;
      document.getElementById('speedDisplay').textContent = speed + 'x';
    }
    
    // Parameter updates
    function updateParameter(paramName, value) {
      params[paramName] = parseFloat(value);
      document.getElementById(paramName + 'Value').textContent = value;
      document.getElementById(paramName + 'Input').value = value;
      updateCalculations();
      if (!isPlaying) draw(); // Update display even when paused
    }
    
    // Update live calculations
    function updateCalculations() {
      // Update calculation displays based on current parameters
      // Example: document.getElementById('calc1Value').textContent = (params.param1 * 2).toFixed(2);
    }
    
    // Animation loop
    function animate() {
      if (!isPlaying) return;
      
      time += speed * 0.016; // 60fps
      draw();
      updateCalculations();
      
      animationId = requestAnimationFrame(animate);
    }
    
    // Main drawing function - IMPLEMENT SPECIFIC PHYSICS HERE
    function draw() {
      if (!ctx || !canvas) {
        console.error('Canvas or context not available in draw function');
        return;
      }
      
      // Clear canvas with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set default drawing styles
      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'black';
      ctx.lineWidth = 2;
      
      console.log('Drawing frame at time:', time);
      
      // EXAMPLE: Working pendulum animation
      // const centerX = canvas.width / 2;
      // const centerY = 50;
      // const length = params.param1; // pendulum length
      // const angle = Math.sin(time * 0.05) * 0.5; // oscillating angle
      // const bobX = centerX + length * Math.sin(angle);
      // const bobY = centerY + length * Math.cos(angle);
      // 
      // // Draw pendulum string
      // ctx.beginPath();
      // ctx.moveTo(centerX, centerY);
      // ctx.lineTo(bobX, bobY);
      // ctx.stroke();
      // 
      // // Draw pendulum bob
      // ctx.beginPath();
      // ctx.arc(bobX, bobY, 15, 0, 2 * Math.PI);
      // ctx.fill();
      
      // EXAMPLE: Working projectile motion
      // const v0 = params.param1; // velocity
      // const angle = params.param2 * Math.PI / 180; // angle in radians
      // const g = params.param3; // gravity
      // const x = v0 * Math.cos(angle) * time;
      // const y = canvas.height - 50 - (v0 * Math.sin(angle) * time - 0.5 * g * time * time);
      // 
      // // Draw ground
      // ctx.beginPath();
      // ctx.moveTo(0, canvas.height - 50);
      // ctx.lineTo(canvas.width, canvas.height - 50);
      // ctx.stroke();
      // 
      // // Draw projectile
      // if (y < canvas.height - 50) {
      //   ctx.beginPath();
      //   ctx.arc(x, y, 8, 0, 2 * Math.PI);
      //   ctx.fill();
      // }
      
      // CRITICAL: Always draw something visible - replace this with your physics animation
      ctx.beginPath();
      ctx.arc(canvas.width/2 + 50 * Math.sin(time * 0.02), canvas.height/2, 20, 0, 2 * Math.PI);
      ctx.fill();
    }
  </script>
</body>
</html>

CRITICAL REQUIREMENTS for Canvas Animations:
1. ALWAYS draw something visible in the draw() function - never leave canvas blank
2. Use proper canvas context checks: if (!ctx || !canvas) return;
3. Clear canvas with white background: ctx.fillStyle = 'white'; ctx.fillRect(0, 0, canvas.width, canvas.height);
4. Set drawing styles: ctx.strokeStyle = 'black'; ctx.fillStyle = 'black'; ctx.lineWidth = 2;
5. Draw test elements first (like a circle) to verify canvas is working
6. Implement the actual physics visualization with moving/animated elements
7. Use time variable to create motion: time += speed * 0.016 in animate loop
8. Make sure all drawing operations use proper beginPath() and fill()/stroke()
9. Test that animations are visible and moving when play button is pressed
10. Include error handling and fallback drawing if physics calculations fail

For each physics concept, you MUST:
1. Identify the key parameters that affect the physics (velocity, angle, mass, gravity, etc.)
2. Create interactive sliders/inputs for these parameters
3. Implement the actual physics equations in the draw() function with VISIBLE animations
4. Update calculations in real-time as parameters change
5. Make the animation respond immediately to parameter changes
6. Ensure the canvas is properly initialized and drawing functions work
7. Include proper error handling for canvas operations
8. Make sure the animation starts immediately when the page loads
9. Use requestAnimationFrame for smooth animations
10. Include proper cleanup and reset functionality

Return your response as JSON with this structure:
{
  "analysis": "Physics concept analysis and explanation",
  "solution": "Step-by-step solution",
  "code": "Complete HTML code with interactive parameter controls",
  "concepts": ["list", "of", "physics", "concepts"]
}`;

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // Generate physics analysis and code using OpenAI
    const { text } = await generateText({
      model: openai('gpt-4'),
      system: SYSTEM_PROMPT,
      prompt: `Physics Question: ${question}

Please analyze this physics question and generate an interactive visualization. Focus on making the physics concepts clear and engaging through animation.

CRITICAL: The generated code MUST include a working, visible animation in the canvas area. Do not just create controls and parameters - the animation must actually move and be visible when the play button is pressed. Include proper canvas drawing code that creates moving elements based on the physics concept.`,
      temperature: 0.7,
    });

    let result;
    try {
      result = JSON.parse(text);
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      result = {
        analysis: text,
        solution: "Please try rephrasing your question for a more specific physics concept.",
        code: generateFallbackCode(question),
        concepts: ["general physics"]
      };
    }

    // Note: E2B sandbox validation removed for now due to API changes
    // The generated code will be validated by the browser iframe

    return NextResponse.json({
      success: true,
      analysis: result.analysis,
      solution: result.solution,
      code: result.code,
      concepts: result.concepts || ["physics"]
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate physics visualization' },
      { status: 500 }
    );
  }
}

function generateFallbackCode(question: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: white; color: black; font-family: Arial; margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; text-align: center; }
  .animation-area { border: 2px solid black; margin: 20px 0; height: 300px; display: flex; align-items: center; justify-content: center; }
  .info-panel { background: #f5f5f5; padding: 15px; border: 1px solid black; }
</style>
</head>
<body>
  <div class="container">
    <h2>Physics Question Analysis</h2>
    <div class="animation-area">
      <p>Question: ${question}</p>
    </div>
    <div class="info-panel">
      <p>This question requires further analysis. Please provide more specific details about the physics concept you'd like to visualize.</p>
    </div>
  </div>
</body>
</html>`;
}