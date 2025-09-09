import { NextRequest, NextResponse } from 'next/server'

import { cerebras } from '@ai-sdk/cerebras'
import { generateText } from 'ai'


const SYSTEM_PROMPT = `You are a physics education assistant that creates HIGHLY INTERACTIVE and MODERN visualizations for physics concepts.

Your task is to:
1. Analyze the physics concepts in the user's question
2. Identify what type of visualization would be most helpful
3. Generate clean HTML/CSS/JavaScript code for animations with REAL-TIME PARAMETER CONTROLS
4. Use consistent layout with black/white theme for UI elements
5. Include interactive parameter sliders and input fields
6. Show real-time calculations and formulas that update as parameters change
7. Create CONTEXT-SPECIFIC objects and animations based on the physics concept
8. Use modern, engaging visual design with proper physics objects
9. Include emojis for better UI/UX and visual engagement

CRITICAL: Create DIFFERENT objects and animations based on the specific physics concept:

PHYSICS OBJECT LIBRARY - Use these specific object types:

🚗 CARS/VEHICLES (Motion, Kinematics, Collisions):
- Car body with gradient fill and realistic proportions
- Wheels that rotate based on speed
- Headlights with glow effects
- Windshield and windows
- Motion trails showing velocity vectors
- Example: "Two cars meeting" should show actual car shapes, not dots

⚽ PROJECTILES/BALLS (Projectile Motion, Gravity):
- Spherical objects with radial gradients
- Drop shadows for depth
- Motion trails showing trajectory
- Highlight effects for realism
- Bounce effects with compression
- Example: "Ball thrown" should show realistic ball with shadow and trail

🔄 PENDULUMS (Oscillation, Simple Harmonic Motion):
- Realistic string/cable
- Weighted bob with gradient
- Pivot point with mounting
- Arc path visualization
- Amplitude indicators
- Example: "Pendulum swing" should show string, bob, and mounting point

🌊 WAVES (Wave Motion, Interference):
- Curved wave patterns
- Particle motion on wave surface
- Crest and trough visualization
- Wave interference patterns
- Frequency and amplitude indicators
- Example: "Wave interference" should show actual wave patterns, not dots

⚙️ SPRINGS (Hooke's Law, Oscillation):
- Coil spring shapes with realistic turns
- Compression and extension visualization
- Mass attached to spring
- Force vector indicators
- Example: "Spring oscillation" should show coil spring, not simple shapes

🪐 PLANETS/ORBITS (Gravitation, Circular Motion):
- Planet shapes with surface details
- Orbital paths with trails
- Gravitational field visualization
- Velocity vector indicators
- Example: "Planetary motion" should show planet shapes in orbit

⚡ ELECTROMAGNETIC (Fields, Charges):
- Field line visualization
- Charge symbols (+/-)
- Electric field vectors
- Magnetic field patterns
- Example: "Electric field" should show field lines and charge symbols

🔬 PARTICLES (Particle Physics, Collisions):
- Particle systems with multiple objects
- Collision effects and trails
- Energy visualization
- Momentum indicators
- Example: "Particle collision" should show multiple particles with collision effects

CRITICAL REQUIREMENTS for Interactive Animations:
- MUST use the NEW WIREFRAME LAYOUT: 3/4 left column (animation + controls) + 1/4 right column (parameter control + physics info)
- Animation preview area should be WIDE and show ONLY the visual animation - NO data overlays or text
- Right side top panel: Parameter controls with sliders and number inputs
- Right side bottom panel: Dynamic physics data (period, energy, position, velocity) with progress bars
- Dynamic data in right panels should update in real-time based on animation state
- Parameters should update the animation in REAL-TIME as user adjusts them
- Include play, pause, reset, and speed control buttons below animation with proper spacing
- Use HTML5 Canvas for smooth animations
- Implement proper physics equations that respond to parameter changes
- Bottom section: Full-width area for concepts, analysis, and solution with adequate spacing from controls
- Ensure proper spacing between all sections to prevent collisions

MODERN ANIMATION REQUIREMENTS:
- Create REALISTIC, CONTEXT-SPECIFIC objects based on physics concept
- Use modern color palettes: #FF6B6B (coral), #4ECDC4 (teal), #45B7D1 (blue), #96CEB4 (mint), #FFEAA7 (yellow), #FF8A80 (light red), #81C784 (light green), #64B5F6 (light blue)
- Add visual effects: shadows, gradients, trails, particle effects, glow effects
- Use proper object shapes: cars with wheels, balls with texture, springs with coils, waves with curves
- Include realistic physics: momentum, acceleration, gravity, friction, collisions
- Add modern UI elements: smooth transitions, hover effects, modern button styles
- Keep UI elements (buttons, sliders, text) in black/white theme
- Use colors strategically to differentiate objects and enhance visual appeal

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

MANDATORY Layout Structure - NEW WIREFRAME FORMAT:
<!DOCTYPE html>
<html>
<head>
<style>
  body { background: white; color: black; font-family: Arial; margin: 0; padding: 5px; }
  .container { width: 100%; max-width: 100%; margin: 0; }
  
  /* Main Layout Grid - Responsive (3/4 + 1/4 on desktop, stacked on mobile) */
  .main-layout { 
    display: grid; 
    grid-template-columns: 1fr; 
    gap: 15px; 
    margin-bottom: 15px; 
  }
  
  /* Desktop layout */
  @media (min-width: 768px) {
    .main-layout { 
      grid-template-columns: 3fr 1fr; 
      gap: 20px; 
      height: 700px; 
      margin-bottom: 20px; 
    }
  }
  
  /* Left Column - Animation Preview and Controls */
  .left-column { 
    display: flex; 
    flex-direction: column; 
    gap: 20px; 
  }
  
  /* Animation Preview Area */
  .animation-area { 
    flex: 1; 
    border: 2px solid black; 
    position: relative; 
    background: white;
    border-radius: 8px;
    overflow: hidden;
    min-height: 250px;
  }
  
  /* Mobile responsive animation area */
  @media (min-width: 768px) {
    .animation-area { 
      min-height: 500px; 
    }
  }
  
  #canvas { width: 100%; height: 100%; display: block; }
  
  /* Control Buttons - Mobile Responsive */
  .controls { 
    display: flex; 
    gap: 8px; 
    justify-content: center; 
    flex-wrap: wrap; 
    padding: 8px 0;
  }
  
  @media (min-width: 768px) {
    .controls { 
      gap: 15px; 
      padding: 10px 0;
    }
  }
  
  .controls button { 
    padding: 8px 12px; 
    border: 2px solid #000; 
    background: #fff; 
    cursor: pointer; 
    border-radius: 8px;
    font-weight: 600;
    font-size: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    flex: 1;
    min-width: 0;
  }
  
  @media (min-width: 768px) {
    .controls button { 
      padding: 12px 20px; 
      font-size: 14px;
      flex: none;
    }
  }
  .controls button:hover { 
    background: #000; 
    color: #fff; 
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  /* Right Column - Dynamic Data Panels */
  .right-column { 
    display: flex; 
    flex-direction: column; 
    gap: 15px; 
  }
  
  @media (min-width: 768px) {
    .right-column { 
      gap: 20px; 
    }
  }
  
  /* Top Right - Parameter Control Panel */
  .parameter-panel { 
    flex: 1; 
    border: 2px solid #e0e0e0; 
    padding: 15px; 
    background: #fafafa; 
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  @media (min-width: 768px) {
    .parameter-panel { 
      padding: 20px; 
    }
  }
  .parameter-panel h3 {
    margin-top: 0;
    font-size: 16px;
    font-weight: 700;
    color: #000;
    border-bottom: 2px solid #000;
    padding-bottom: 6px;
    text-align: center;
  }
  
  @media (min-width: 768px) {
    .parameter-panel h3 {
      font-size: 18px;
      padding-bottom: 8px;
    }
  }
  
  .parameter-group { 
    margin-bottom: 12px; 
  }
  
  @media (min-width: 768px) {
    .parameter-group { 
      margin-bottom: 15px; 
    }
  }
  
  .parameter-group label { 
    display: block; 
    font-weight: 600; 
    margin-bottom: 4px; 
    font-size: 12px;
    color: #333;
  }
  
  @media (min-width: 768px) {
    .parameter-group label { 
      margin-bottom: 5px; 
      font-size: 14px;
    }
  }
  .parameter-group input[type="range"] { 
    width: 100%; 
    margin: 8px 0; 
    height: 6px;
    border-radius: 3px;
    background: #ddd;
    outline: none;
    -webkit-appearance: none;
  }
  .parameter-group input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #000;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .parameter-group input[type="number"] { 
    width: 60px; 
    padding: 4px 6px; 
    border: 2px solid #ddd; 
    border-radius: 4px;
    font-weight: 600;
    text-align: center;
    font-size: 11px;
  }
  
  @media (min-width: 768px) {
    .parameter-group input[type="number"] { 
      width: 70px; 
      padding: 6px 8px; 
      font-size: 12px;
    }
  }
  
  .parameter-value { 
    font-family: 'Courier New', monospace; 
    background: #f0f0f0; 
    padding: 3px 6px; 
    border-radius: 4px;
    font-weight: 600;
    border: 1px solid #ddd;
    display: inline-block;
    margin: 2px 0;
    font-size: 11px;
  }
  
  @media (min-width: 768px) {
    .parameter-value { 
      padding: 4px 8px; 
      margin: 3px 0;
      font-size: 12px;
    }
  }
  
  /* Bottom Right - Physics Information Panel */
  .physics-info-panel { 
    flex: 1; 
    background: #f8f8f8; 
    padding: 15px; 
    border: 2px solid #000; 
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  @media (min-width: 768px) {
    .physics-info-panel { 
      padding: 20px; 
    }
  }
  .physics-info-panel h3 {
    margin-top: 0;
    font-size: 16px;
    font-weight: 700;
    color: #000;
    border-bottom: 2px solid #000;
    padding-bottom: 6px;
    text-align: center;
  }
  
  @media (min-width: 768px) {
    .physics-info-panel h3 {
      font-size: 18px;
      padding-bottom: 8px;
    }
  }
  
  .physics-data { 
    font-family: 'Courier New', monospace; 
    background: #f0f0f0; 
    padding: 6px 8px; 
    margin: 4px 0; 
    border: 1px solid #ddd; 
    border-radius: 6px;
    font-weight: 600;
    font-size: 11px;
  }
  
  @media (min-width: 768px) {
    .physics-data { 
      padding: 8px 12px; 
      margin: 6px 0; 
      font-size: 12px;
    }
  }
  .energy-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 6px 0;
  }
  
  @media (min-width: 768px) {
    .energy-bar {
      gap: 8px;
      margin: 8px 0;
    }
  }
  
  .energy-value {
    font-size: 10px;
    font-weight: 600;
    min-width: 30px;
  }
  
  @media (min-width: 768px) {
    .energy-value {
      font-size: 12px;
      min-width: 40px;
    }
  }
  
  .energy-progress {
    flex: 1;
    height: 6px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }
  
  @media (min-width: 768px) {
    .energy-progress {
      height: 8px;
    }
  }
  
  .energy-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  .kinetic-fill { background: #4ECDC4; }
  .potential-fill { background: #FF6B6B; }
  
  /* Bottom Section - Full Width */
  .bottom-section {
    background: white;
    border: 2px solid #000;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    margin-top: 20px;
  }
  
  @media (min-width: 768px) {
    .bottom-section {
      padding: 25px;
      margin-top: 30px;
    }
  }
  .bottom-section h2 {
    margin-top: 0;
    font-size: 24px;
    font-weight: 700;
    color: #000;
    border-bottom: 2px solid #000;
    padding-bottom: 10px;
  }
  
  /* Concepts Section Styling */
  .concepts-section {
    margin: 20px 0;
    padding: 25px;
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
  .concept-button:active {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  
  /* Analysis and Solution Sections */
  .analysis-section, .solution-section {
    margin: 20px 0;
    padding: 25px;
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
  .analysis-section p:last-child, .solution-section p:last-child {
    margin-bottom: 0;
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
  
  /* Enhanced Physics Information Panel */
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
    <h2>🔬 Physics Concept Title</h2>
    
    <!-- Main Layout - Top Section (2/3 + 1/3) -->
    <div class="main-layout">
      <!-- Left Column - Animation Preview and Controls -->
      <div class="left-column">
        <!-- Animation Preview Area -->
        <div class="animation-area">
          <canvas id="canvas" width="100%" height="100%"></canvas>
        </div>
        
        <!-- Control Buttons -->
        <div class="controls">
          <button id="playBtn" onclick="playAnimation()">▶️ Play</button>
          <button id="pauseBtn" onclick="pauseAnimation()">⏸️ Pause</button>
          <button id="resetBtn" onclick="resetAnimation()">🔄 Reset</button>
          <button onclick="toggleSpeed()">⚡ Speed: <span id="speedDisplay">1x</span></button>
        </div>
      </div>
      
      <!-- Right Column - Dynamic Data Panels -->
      <div class="right-column">
        <!-- Top Right - Parameter Control Panel -->
        <div class="parameter-panel">
          <h3>🎛️ Parameter Control</h3>
          <div class="parameter-group">
            <label>🚀 Velocity (m/s):</label>
            <input type="range" id="velocity" min="0" max="50" value="25" oninput="updateParameter('velocity', this.value)">
            <span class="parameter-value" id="velocityValue">25</span>
            <input type="number" id="velocityInput" value="25" onchange="updateParameter('velocity', this.value)">
          </div>
          <div class="parameter-group">
            <label>📐 Angle (degrees):</label>
            <input type="range" id="angle" min="0" max="90" value="45" oninput="updateParameter('angle', this.value)">
            <span class="parameter-value" id="angleValue">45</span>
            <input type="number" id="angleInput" value="45" onchange="updateParameter('angle', this.value)">
          </div>
          <div class="parameter-group">
            <label>⚖️ Mass (kg):</label>
            <input type="range" id="mass" min="0.1" max="10" step="0.1" value="1" oninput="updateParameter('mass', this.value)">
            <span class="parameter-value" id="massValue">1.0</span>
            <input type="number" id="massInput" value="1" step="0.1" onchange="updateParameter('mass', this.value)">
          </div>
        </div>
        
        <!-- Bottom Right - Physics Information Panel -->
        <div class="physics-info-panel">
          <h3>⚡ Physics Information</h3>
          <div class="physics-data" id="periodDisplay">Period: T = <span id="periodValue">0.00</span> s</div>
          <div class="physics-data" id="energyDisplay">Total Energy: E = <span id="totalEnergyValue">0.00</span> J</div>
          
          <div class="energy-bar">
            <div class="energy-value">KE:</div>
            <div class="energy-progress">
              <div class="energy-fill kinetic-fill" id="kineticBar" style="width: 0%"></div>
            </div>
            <div class="energy-value" id="kineticValue">0.00</div>
          </div>
          
          <div class="energy-bar">
            <div class="energy-value">PE:</div>
            <div class="energy-progress">
              <div class="energy-fill potential-fill" id="potentialBar" style="width: 0%"></div>
            </div>
            <div class="energy-value" id="potentialValue">0.00</div>
          </div>
          
          <div class="physics-data" id="positionDisplay">Position: x = <span id="positionX">0.00</span>, y = <span id="positionY">0.00</span></div>
          <div class="physics-data" id="velocityDisplay">Velocity: vx = <span id="velocityX">0.00</span>, vy = <span id="velocityY">0.00</span></div>
        </div>
      </div>
    </div>
    
    <!-- Bottom Section - Full Width -->
    <div class="bottom-section">
      <h2>📚 Physics Analysis</h2>
      
      <!-- Concepts Section -->
      <div class="concepts-section">
        <h3>🔬 Key Concepts</h3>
        <div class="concepts-container" id="conceptsContainer">
          <!-- Concepts will be dynamically added here -->
        </div>
      </div>
      
      <!-- Analysis Section -->
      <div class="analysis-section">
        <h3>📊 Analysis</h3>
        <p id="analysisText">Physics concept analysis will be displayed here...</p>
      </div>
      
      <!-- Solution Section -->
      <div class="solution-section">
        <h3>💡 Solution</h3>
        <p id="solutionText">Step-by-step solution will be displayed here...</p>
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
      velocity: 25,  // m/s
      angle: 45,     // degrees
      mass: 1.0      // kg
    };
    
    // Dynamic data variables for right panels
    let physicsData = {
      period: 0,
      totalEnergy: 0,
      kineticEnergy: 0,
      potentialEnergy: 0,
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 }
    };
    
    // Initialize
    function initializeAnimation() {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      console.log('Canvas initialized:', canvas, ctx);
      if (canvas && ctx) {
        // Set canvas size to match container
        resizeCanvas();
        updatePhysicsData(); // Initialize physics data
        draw();
        // Start animation automatically
        playAnimation();
        console.log('Initial draw completed and animation started');
      } else {
        console.error('Canvas or context not found');
      }
      
      // Initialize concepts and content
      initializeConcepts();
      initializeContent();
    }
    
    // Initialize concepts section
    function initializeConcepts() {
      const conceptsContainer = document.getElementById('conceptsContainer');
      if (conceptsContainer) {
        // Default concepts - these will be replaced by actual concepts from the API
        const defaultConcepts = ['motion', 'velocity', 'acceleration', 'force'];
        conceptsContainer.innerHTML = '';
        defaultConcepts.forEach(concept => {
          const button = document.createElement('div');
          button.className = 'concept-button';
          button.textContent = concept;
          button.onclick = () => highlightConcept(concept);
          conceptsContainer.appendChild(button);
        });
      }
    }
    
    // Initialize content sections
    function initializeContent() {
      // This will be populated by the actual analysis and solution from the API
      const analysisText = document.getElementById('analysisText');
      const solutionText = document.getElementById('solutionText');
      
      if (analysisText) {
        analysisText.textContent = 'Physics concept analysis will be displayed here...';
      }
      if (solutionText) {
        solutionText.textContent = 'Step-by-step solution will be displayed here...';
      }
    }
    
    // Highlight concept when clicked
    function highlightConcept(concept) {
      const buttons = document.querySelectorAll('.concept-button');
      buttons.forEach(btn => {
        if (btn.textContent === concept) {
          btn.style.background = '#000';
          btn.style.color = '#fff';
          btn.style.borderColor = '#000';
        } else {
          btn.style.background = '#fff';
          btn.style.color = '#333';
          btn.style.borderColor = '#e0e0e0';
        }
      });
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
      updatePhysicsData();
      if (!isPlaying) draw(); // Update display even when paused
    }
    
    // Update dynamic physics data for right panels
    function updatePhysicsData() {
      // Calculate physics values based on current parameters and animation state
      // These calculations should be specific to the physics concept
      
      // Example calculations (adapt based on specific physics concept):
      const g = 9.81; // gravity
      const angleRad = params.angle * Math.PI / 180;
      
      // Calculate period (for pendulum: T = 2π√(L/g))
      physicsData.period = 2 * Math.PI * Math.sqrt(params.mass / g);
      
      // Calculate energies (example for projectile motion)
      const vx = params.velocity * Math.cos(angleRad);
      const vy = params.velocity * Math.sin(angleRad);
      physicsData.kineticEnergy = 0.5 * params.mass * (vx * vx + vy * vy);
      physicsData.potentialEnergy = params.mass * g * physicsData.position.y;
      physicsData.totalEnergy = physicsData.kineticEnergy + physicsData.potentialEnergy;
      
      // Update position and velocity (example calculations)
      physicsData.velocity.x = vx;
      physicsData.velocity.y = vy - g * time;
      physicsData.position.x = vx * time;
      physicsData.position.y = vy * time - 0.5 * g * time * time;
      
      // Update the right panel displays
      updateRightPanelDisplays();
    }
    
    // Update the right panel displays with current physics data
    function updateRightPanelDisplays() {
      // Update period display
      const periodElement = document.getElementById('periodValue');
      if (periodElement) periodElement.textContent = physicsData.period.toFixed(2);
      
      // Update energy displays
      const totalEnergyElement = document.getElementById('totalEnergyValue');
      if (totalEnergyElement) totalEnergyElement.textContent = physicsData.totalEnergy.toFixed(2);
      
      const kineticValueElement = document.getElementById('kineticValue');
      if (kineticValueElement) kineticValueElement.textContent = physicsData.kineticEnergy.toFixed(2);
      
      const potentialValueElement = document.getElementById('potentialValue');
      if (potentialValueElement) potentialValueElement.textContent = physicsData.potentialEnergy.toFixed(2);
      
      // Update energy bars
      const maxEnergy = Math.max(physicsData.kineticEnergy, physicsData.potentialEnergy, 1);
      const kineticBar = document.getElementById('kineticBar');
      const potentialBar = document.getElementById('potentialBar');
      
      if (kineticBar) {
        const kineticPercent = (physicsData.kineticEnergy / maxEnergy) * 100;
        kineticBar.style.width = kineticPercent + '%';
      }
      
      if (potentialBar) {
        const potentialPercent = (physicsData.potentialEnergy / maxEnergy) * 100;
        potentialBar.style.width = potentialPercent + '%';
      }
      
      // Update position display
      const positionXElement = document.getElementById('positionX');
      const positionYElement = document.getElementById('positionY');
      if (positionXElement) positionXElement.textContent = physicsData.position.x.toFixed(2);
      if (positionYElement) positionYElement.textContent = physicsData.position.y.toFixed(2);
      
      // Update velocity display
      const velocityXElement = document.getElementById('velocityX');
      const velocityYElement = document.getElementById('velocityY');
      if (velocityXElement) velocityXElement.textContent = physicsData.velocity.x.toFixed(2);
      if (velocityYElement) velocityYElement.textContent = physicsData.velocity.y.toFixed(2);
    }
    
    // Animation loop
    function animate() {
      if (!isPlaying) {
        console.log('Animation stopped');
        return;
      }
      
      time += speed * 0.016; // 60fps
      updatePhysicsData(); // Update dynamic data for right panels
      draw();
      
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
      
      // EXAMPLE: Modern Car Animation with realistic shapes
      // function drawCar(x, y, color, scale = 1) {
      //   const width = 60 * scale;
      //   const height = 30 * scale;
      //   
      //   // Car body with gradient
      //   const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
      //   gradient.addColorStop(0, color);
      //   gradient.addColorStop(1, color + '80');
      //   ctx.fillStyle = gradient;
      //   ctx.fillRect(x, y, width, height);
      //   
      //   // Car windows
      //   ctx.fillStyle = '#87CEEB';
      //   ctx.fillRect(x + 5, y + 5, width - 10, height - 15);
      //   
      //   // Wheels
      //   ctx.fillStyle = '#333';
      //   ctx.beginPath();
      //   ctx.arc(x + 10, y + height, 8 * scale, 0, 2 * Math.PI);
      //   ctx.fill();
      //   ctx.beginPath();
      //   ctx.arc(x + width - 10, y + height, 8 * scale, 0, 2 * Math.PI);
      //   ctx.fill();
      //   
      //   // Headlights
      //   ctx.fillStyle = '#FFD700';
      //   ctx.beginPath();
      //   ctx.arc(x + width, y + 5, 3 * scale, 0, 2 * Math.PI);
      //   ctx.fill();
      //   ctx.beginPath();
      //   ctx.arc(x + width, y + height - 5, 3 * scale, 0, 2 * Math.PI);
      //   ctx.fill();
      // }
      
      // EXAMPLE: Realistic Pendulum
      // function drawPendulum(centerX, centerY, length, angle, bobColor) {
      //   const bobX = centerX + length * Math.sin(angle);
      //   const bobY = centerY + length * Math.cos(angle);
      //   
      //   // Pivot point
      //   ctx.fillStyle = '#333';
      //   ctx.beginPath();
      //   ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      //   ctx.fill();
      //   
      //   // String
      //   ctx.strokeStyle = '#666';
      //   ctx.lineWidth = 2;
      //   ctx.beginPath();
      //   ctx.moveTo(centerX, centerY);
      //   ctx.lineTo(bobX, bobY);
      //   ctx.stroke();
      //   
      //   // Bob with gradient
      //   const gradient = ctx.createRadialGradient(bobX - 8, bobY - 8, 0, bobX, bobY, 15);
      //   gradient.addColorStop(0, bobColor);
      //   gradient.addColorStop(1, bobColor + 'CC');
      //   ctx.fillStyle = gradient;
      //   ctx.beginPath();
      //   ctx.arc(bobX, bobY, 15, 0, 2 * Math.PI);
      //   ctx.fill();
      // }
      
      // EXAMPLE: Coil Spring
      // function drawSpring(x, y, length, compression, color) {
      //   ctx.strokeStyle = color;
      //   ctx.lineWidth = 4;
      //   ctx.beginPath();
      //   const coils = 8;
      //   const coilHeight = 20;
      //   const actualLength = length * (1 - compression);
      //   
      //   for (let i = 0; i <= coils; i++) {
      //     const coilX = x + (i / coils) * actualLength;
      //     const coilY = y + Math.sin(i * Math.PI) * coilHeight;
      //     if (i === 0) ctx.moveTo(coilX, coilY);
      //     else ctx.lineTo(coilX, coilY);
      //   }
      //   ctx.stroke();
      // }
      
      // EXAMPLE: Modern Ball with trail and shadow
      // function drawBall(x, y, color, radius, hasTrail = false) {
      //   // Shadow
      //   ctx.fillStyle = 'rgba(0,0,0,0.2)';
      //   ctx.beginPath();
      //   ctx.ellipse(x + 3, y + radius + 3, radius * 0.8, radius * 0.3, 0, 0, 2 * Math.PI);
      //   ctx.fill();
      //   
      //   // Ball with gradient
      //   const gradient = ctx.createRadialGradient(x - radius/3, y - radius/3, 0, x, y, radius);
      //   gradient.addColorStop(0, color);
      //   gradient.addColorStop(1, color + 'CC');
      //   ctx.fillStyle = gradient;
      //   ctx.beginPath();
      //   ctx.arc(x, y, radius, 0, 2 * Math.PI);
      //   ctx.fill();
      //   
      //   // Highlight
      //   ctx.fillStyle = 'rgba(255,255,255,0.6)';
      //   ctx.beginPath();
      //   ctx.arc(x - radius/3, y - radius/3, radius/4, 0, 2 * Math.PI);
      //   ctx.fill();
      // }
      
      // EXAMPLE: Modern Spring with realistic coils
      // function drawSpring(x, y, length, compression, color) {
      //   ctx.strokeStyle = color;
      //   ctx.lineWidth = 4;
      //   ctx.beginPath();
      //   const coils = 8;
      //   const coilHeight = 20;
      //   const actualLength = length * (1 - compression);
      //   
      //   for (let i = 0; i <= coils; i++) {
      //     const coilX = x + (i / coils) * actualLength;
      //     const coilY = y + Math.sin(i * Math.PI) * coilHeight;
      //     if (i === 0) ctx.moveTo(coilX, coilY);
      //     else ctx.lineTo(coilX, coilY);
      //   }
      //   ctx.stroke();
      // }
      
      // EXAMPLE: Modern Wave with particles
      // function drawWave(x, y, amplitude, frequency, color) {
      //   ctx.strokeStyle = color;
      //   ctx.lineWidth = 3;
      //   ctx.beginPath();
      //   
      //   for (let i = 0; i < canvas.width; i += 2) {
      //     const waveY = y + amplitude * Math.sin((i * frequency + time * 0.1) * 0.01);
      //     if (i === 0) ctx.moveTo(i, waveY);
      //     else ctx.lineTo(i, waveY);
      //   }
      //   ctx.stroke();
      //   
      //   // Add particles on the wave
      //   for (let i = 0; i < 5; i++) {
      //     const particleX = (canvas.width / 5) * i;
      //     const particleY = y + amplitude * Math.sin((particleX * frequency + time * 0.1) * 0.01);
      //     ctx.fillStyle = color;
      //     ctx.beginPath();
      //     ctx.arc(particleX, particleY, 3, 0, 2 * Math.PI);
      //     ctx.fill();
      //   }
      // }
      
      // CRITICAL: Create CONTEXT-SPECIFIC animations based on the physics concept
      // Replace this generic example with specific physics objects and animations
      // Examples: cars for motion, balls for projectiles, springs for oscillations, waves for wave motion
      
      // Generic fallback - should be replaced with specific physics objects
      ctx.fillStyle = '#FF6B6B';
      ctx.beginPath();
      ctx.arc(canvas.width/2 + 50 * Math.sin(time * 0.02), canvas.height/2, 20, 0, 2 * Math.PI);
      ctx.fill();
    }
  </script>
</body>
</html>

CRITICAL REQUIREMENTS for Modern Physics Animations:
1. ALWAYS create CONTEXT-SPECIFIC objects based on the physics concept - NO GENERIC DOTS
2. Use proper canvas context checks: if (!ctx || !canvas) return;
3. Clear canvas with white background: ctx.fillStyle = 'white'; ctx.fillRect(0, 0, canvas.width, canvas.height);
4. Set default drawing styles: ctx.strokeStyle = 'black'; ctx.lineWidth = 2;
5. Create REALISTIC objects: cars with wheels, balls with shadows, springs with coils, waves with particles
6. Use MODERN VISUAL EFFECTS: gradients, shadows, trails, particle systems, glow effects
7. Use VIBRANT COLORS for animated objects: #FF6B6B (coral), #4ECDC4 (teal), #45B7D1 (blue), #96CEB4 (mint), #FFEAA7 (yellow), #FF8A80 (light red), #81C784 (light green), #64B5F6 (light blue)
8. Implement REALISTIC PHYSICS: proper equations, momentum, acceleration, gravity, collisions
9. Use time variable to create motion: time += speed * 0.016 in animate loop
10. Make sure all drawing operations use proper beginPath() and fill()/stroke()
11. Test that animations are visible and moving when play button is pressed
12. Include error handling and fallback drawing if physics calculations fail
13. Use emojis in titles and labels for better UX (🚗, ⚽, 🎯, 📐, ⚡, 🌊, 🔬, ⚙️, 🌟)
14. Add visual depth with shadows, highlights, and 3D-like effects
15. Create smooth, fluid animations that look professional and modern

For each physics concept, you MUST:
1. Identify the key parameters that affect the physics (velocity, angle, mass, gravity, etc.)
2. Create interactive sliders/inputs for these parameters with emoji labels (🚗 Velocity, ⚽ Mass, etc.)
3. Create CONTEXT-SPECIFIC objects and animations - NO GENERIC DOTS OR CIRCLES
4. Implement realistic physics equations with proper visual representation
5. Use modern visual effects: gradients, shadows, trails, particle systems
6. Create objects that match the physics concept: cars for motion, balls for projectiles, springs for oscillations
7. Update calculations in real-time as parameters change
8. Make the animation respond immediately to parameter changes
9. Ensure the canvas is properly initialized and drawing functions work
10. Include proper error handling for canvas operations
11. Make sure the animation starts immediately when the page loads
12. Use requestAnimationFrame for smooth animations
13. Include proper cleanup and reset functionality
14. Keep UI elements (buttons, sliders, text) in black/white theme while using colors only for animated objects
15. Add visual depth and modern styling to make animations look professional

CRITICAL: You MUST return ONLY valid JSON in this exact format. Do not include any markdown code blocks, explanations, or extra text. Return ONLY the JSON object:

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

    // Generate physics analysis and code using Cerebras
    const { text } = await generateText({
      model: cerebras('qwen-3-coder-480b'),
      system: SYSTEM_PROMPT,
      prompt: `Physics Question: ${question}

Please analyze this physics question and generate an interactive visualization. Focus on making the physics concepts clear and engaging through animation.

CRITICAL: The generated code MUST include a working, visible animation with CONTEXT-SPECIFIC objects in the canvas area. 

MANDATORY REQUIREMENTS:
1. NO GENERIC DOTS OR CIRCLES - Create realistic objects based on the physics concept
2. Use the Physics Object Library examples provided (cars, balls, pendulums, springs, waves, etc.)
3. Include modern visual effects: gradients, shadows, trails, highlights
4. The animation must actually move and be visible when the play button is pressed
5. Include proper canvas drawing code that creates moving elements based on the physics concept
6. Use vibrant colors and modern styling for animated objects
7. Keep UI elements in black/white theme

EXAMPLES:
- "Two cars meeting" → Show actual car shapes with wheels, not dots
- "Ball thrown" → Show realistic ball with shadow and trail, not simple circle
- "Pendulum swing" → Show string, bob, and pivot point, not just a dot
- "Wave motion" → Show wave patterns with particles, not dots
- "Spring oscillation" → Show coil spring shape, not simple shapes

IMPORTANT: Return ONLY valid JSON. Do not include any markdown formatting, code blocks, or extra text. Just the JSON object.`,
      temperature: 0.1,
    });

    let result;
    try {
      // Clean the text to extract JSON
      let cleanText = text.trim();
      
      // Remove markdown code blocks if present
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Find JSON object in the text
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }
      
      result = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.error('Raw text:', text);
      
      // If JSON parsing fails, create a structured response
      result = {
        analysis: text,
        solution: "Please try rephrasing your question for a more specific physics concept.",
        code: generateFallbackCode(question),
        concepts: ["general physics"]
      };
    }

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