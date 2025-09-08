import { NextRequest, NextResponse } from 'next/server'
import { Sandbox } from '@e2b/code-interpreter'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

const SYSTEM_PROMPT = `You are a physics education assistant that creates HIGHLY INTERACTIVE visualizations for physics concepts.

Your task is to:
1. Analyze the physics concepts in the user's question
2. Identify what type of visualization would be most helpful
3. Generate clean HTML/CSS/JavaScript code for animations with REAL-TIME PARAMETER CONTROLS
4. Use consistent layout with black/white theme for UI elements
5. Include interactive parameter sliders and input fields
6. Show real-time calculations and formulas that update as parameters change
7. Use 2-3 vibrant colors for animated objects to enhance visual appeal
8. Include emojis for better UI/UX and visual engagement

CRITICAL REQUIREMENTS for Interactive Animations:
- MUST include parameter control sliders/inputs for key physics variables
- Examples: velocity, angle, mass, gravity, time, friction, spring constant, etc.
- Parameters should update the animation in REAL-TIME as user adjusts them
- Include play, pause, reset, and speed control buttons
- Show live calculations and formulas that change with parameters
- Use HTML5 Canvas for smooth animations
- Implement proper physics equations that respond to parameter changes

ANIMATION COLOR REQUIREMENTS:
- Use 2-3 vibrant colors for animated objects (balls, shapes, particles, etc.)
- Recommended colors: #FF6B6B (coral red), #4ECDC4 (teal), #45B7D1 (blue), #96CEB4 (mint green), #FFEAA7 (yellow)
- Keep UI elements (buttons, sliders, text) in black/white theme
- Use colors strategically to differentiate objects and enhance visual appeal
- Consider using gradients or color transitions for dynamic effects

EMOJI INTEGRATION:
- Use relevant emojis in titles, labels, and descriptions
- Examples: 🚗 for cars, ⚽ for balls, 🎯 for targets, 📐 for geometry, ⚡ for energy, 🌊 for waves
- Emojis should enhance understanding, not clutter the interface
- Use emojis in parameter labels and calculation displays

Code Requirements:
- Use vanilla JavaScript with HTML5 Canvas
- Self-contained HTML with embedded CSS/JS
- Responsive design
- Clear visual hierarchy
- Mathematical formulas displayed properly with real-time updates
- Interactive parameter controls (sliders, number inputs)
- Animation controls (play, pause, reset, speed adjustment)
- Consistent black/white styling for UI elements
- Vibrant colors for animated objects only

MANDATORY Layout Structure with Parameter Controls:
<!DOCTYPE html>
<html>
<head>
<style>
  body { background: white; color: black; font-family: Arial; margin: 0; padding: 10px; }
  .container { width: 100%; max-width: 100%; margin: 0; }
  .animation-area { border: 2px solid black; margin: 10px 0; position: relative; width: 100%; }
  #canvas { width: 100%; height: 300px; display: block; }
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
      <canvas id="canvas" width="100%" height="300"></canvas>
    </div>
    <div class="controls">
      <button id="playBtn" onclick="playAnimation()">▶️ Play</button>
      <button id="pauseBtn" onclick="pauseAnimation()">⏸️ Pause</button>
      <button id="resetBtn" onclick="resetAnimation()">🔄 Reset</button>
      <button onclick="toggleSpeed()">⚡ Speed: <span id="speedDisplay">1x</span></button>
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
    function initializeAnimation() {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      console.log('Canvas initialized:', canvas, ctx);
      if (canvas && ctx) {
        // Set canvas size to match container
        resizeCanvas();
        draw();
        updateCalculations();
        // Start animation automatically
        playAnimation();
        console.log('Initial draw completed and animation started');
      } else {
        console.error('Canvas or context not found');
      }
    }
    
    // Resize canvas to fit container
    function resizeCanvas() {
      if (!canvas) return;
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth - 4; // Account for border
        const containerHeight = 300;
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        console.log('Canvas resized to:', containerWidth, 'x', containerHeight);
      }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeAnimation);
    } else {
      // DOM already loaded
      setTimeout(initializeAnimation, 100);
    }
    
    // Also try window.onload as backup
    window.onload = initializeAnimation;
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (canvas && ctx) {
        resizeCanvas();
        draw();
      }
    });
    
    // Animation controls
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
      updateCalculations();
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
    
    function toggleSpeed() {
      speed = speed === 1 ? 2 : speed === 2 ? 0.5 : 1;
      const speedDisplay = document.getElementById('speedDisplay');
      if (speedDisplay) {
        speedDisplay.textContent = speed + 'x';
      }
      console.log('Speed changed to:', speed + 'x');
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
      if (!isPlaying) {
        console.log('Animation stopped');
        return;
      }
      
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
      
      // EXAMPLE: Working pendulum animation with colors
      // const centerX = canvas.width / 2;
      // const centerY = 50;
      // const length = params.param1; // pendulum length
      // const angle = Math.sin(time * 0.05) * 0.5; // oscillating angle
      // const bobX = centerX + length * Math.sin(angle);
      // const bobY = centerY + length * Math.cos(angle);
      // 
      // // Draw pendulum string (black)
      // ctx.strokeStyle = 'black';
      // ctx.beginPath();
      // ctx.moveTo(centerX, centerY);
      // ctx.lineTo(bobX, bobY);
      // ctx.stroke();
      // 
      // // Draw pendulum bob (coral red)
      // ctx.fillStyle = '#FF6B6B';
      // ctx.beginPath();
      // ctx.arc(bobX, bobY, 15, 0, 2 * Math.PI);
      // ctx.fill();
      
      // EXAMPLE: Working projectile motion with colors
      // const v0 = params.param1; // velocity
      // const angle = params.param2 * Math.PI / 180; // angle in radians
      // const g = params.param3; // gravity
      // const x = v0 * Math.cos(angle) * time;
      // const y = canvas.height - 50 - (v0 * Math.sin(angle) * time - 0.5 * g * time * time);
      // 
      // // Draw ground (black)
      // ctx.strokeStyle = 'black';
      // ctx.beginPath();
      // ctx.moveTo(0, canvas.height - 50);
      // ctx.lineTo(canvas.width, canvas.height - 50);
      // ctx.stroke();
      // 
      // // Draw projectile (teal)
      // if (y < canvas.height - 50) {
      //   ctx.fillStyle = '#4ECDC4';
      //   ctx.beginPath();
      //   ctx.arc(x, y, 8, 0, 2 * Math.PI);
      //   ctx.fill();
      // }
      
      // EXAMPLE: Two moving objects with different colors
      // // Object 1 (coral red)
      // ctx.fillStyle = '#FF6B6B';
      // ctx.beginPath();
      // ctx.arc(canvas.width/2 + 50 * Math.sin(time * 0.02), canvas.height/2 - 30, 15, 0, 2 * Math.PI);
      // ctx.fill();
      // 
      // // Object 2 (teal)
      // ctx.fillStyle = '#4ECDC4';
      // ctx.beginPath();
      // ctx.arc(canvas.width/2 + 40 * Math.cos(time * 0.03), canvas.height/2 + 30, 12, 0, 2 * Math.PI);
      // ctx.fill();
      // 
      // // Object 3 (blue)
      // ctx.fillStyle = '#45B7D1';
      // ctx.beginPath();
      // ctx.arc(canvas.width/2 + 60 * Math.sin(time * 0.015), canvas.height/2, 10, 0, 2 * Math.PI);
      // ctx.fill();
      
      // CRITICAL: Always draw something visible - replace this with your physics animation
      // Use vibrant colors for animated objects
      ctx.fillStyle = '#FF6B6B'; // coral red
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
4. Set default drawing styles: ctx.strokeStyle = 'black'; ctx.lineWidth = 2;
5. Use VIBRANT COLORS for animated objects: #FF6B6B (coral), #4ECDC4 (teal), #45B7D1 (blue), #96CEB4 (mint), #FFEAA7 (yellow)
6. Draw test elements first (like colored circles) to verify canvas is working
7. Implement the actual physics visualization with moving/animated elements in different colors
8. Use time variable to create motion: time += speed * 0.016 in animate loop
9. Make sure all drawing operations use proper beginPath() and fill()/stroke()
10. Test that animations are visible and moving when play button is pressed
11. Include error handling and fallback drawing if physics calculations fail
12. Use emojis in titles and labels for better UX (🚗, ⚽, 🎯, 📐, ⚡, 🌊)

For each physics concept, you MUST:
1. Identify the key parameters that affect the physics (velocity, angle, mass, gravity, etc.)
2. Create interactive sliders/inputs for these parameters with emoji labels (🚗 Velocity, ⚽ Mass, etc.)
3. Implement the actual physics equations in the draw() function with VISIBLE animations
4. Use 2-3 different vibrant colors for animated objects to enhance visual appeal
5. Update calculations in real-time as parameters change
6. Make the animation respond immediately to parameter changes
7. Ensure the canvas is properly initialized and drawing functions work
8. Include proper error handling for canvas operations
9. Make sure the animation starts immediately when the page loads
10. Use requestAnimationFrame for smooth animations
11. Include proper cleanup and reset functionality
12. Keep UI elements (buttons, sliders, text) in black/white theme while using colors only for animated objects

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
  body { background: white; color: black; font-family: Arial; margin: 0; padding: 10px; }
  .container { width: 100%; max-width: 100%; margin: 0; text-align: center; }
  .animation-area { border: 2px solid black; margin: 10px 0; height: 300px; position: relative; width: 100%; }
  #canvas { width: 100%; height: 280px; display: block; }
  .info-panel { background: #f5f5f5; padding: 15px; border: 1px solid black; }
  .controls { display: flex; gap: 10px; margin: 10px 0; justify-content: center; }
  .controls button { padding: 8px 16px; border: 1px solid black; background: white; cursor: pointer; }
  .controls button:hover { background: black; color: white; }
</style>
</head>
<body>
  <div class="container">
    <h2>🔬 Physics Question Analysis</h2>
    <div class="animation-area">
      <canvas id="canvas" width="100%" height="280"></canvas>
    </div>
    <div class="controls">
      <button id="playBtn" onclick="playAnimation()">▶️ Play</button>
      <button id="pauseBtn" onclick="pauseAnimation()">⏸️ Pause</button>
      <button id="resetBtn" onclick="resetAnimation()">🔄 Reset</button>
    </div>
    <div class="info-panel">
      <h3>📝 Question: ${question}</h3>
      <p>This question requires further analysis. Please provide more specific details about the physics concept you'd like to visualize.</p>
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
      
      // Draw colorful animated elements
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Object 1 (coral red)
      ctx.fillStyle = '#FF6B6B';
      ctx.beginPath();
      ctx.arc(centerX + 50 * Math.sin(time * 0.02), centerY - 30, 15, 0, 2 * Math.PI);
      ctx.fill();
      
      // Object 2 (teal)
      ctx.fillStyle = '#4ECDC4';
      ctx.beginPath();
      ctx.arc(centerX + 40 * Math.cos(time * 0.03), centerY + 30, 12, 0, 2 * Math.PI);
      ctx.fill();
      
      // Object 3 (blue)
      ctx.fillStyle = '#45B7D1';
      ctx.beginPath();
      ctx.arc(centerX + 60 * Math.sin(time * 0.015), centerY, 10, 0, 2 * Math.PI);
      ctx.fill();
    }
  </script>
</body>
</html>`;
}