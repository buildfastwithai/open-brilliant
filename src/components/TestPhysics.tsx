'use client';

// Enhanced test component with interactive parameter controls
export default function TestPhysics() {
  const testCode = `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: white; color: black; font-family: Arial; margin: 0; padding: 20px; }
  .container { max-width: 1200px; margin: 0 auto; }
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
    <h2>Interactive Projectile Motion Demo</h2>
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
        <label>Initial Velocity (m/s):</label>
        <input type="range" id="velocity" min="10" max="100" value="50" oninput="updateParameter('velocity', this.value)">
        <span class="parameter-value" id="velocityValue">50</span>
        <input type="number" id="velocityInput" value="50" onchange="updateParameter('velocity', this.value)">
      </div>
      <div class="parameter-group">
        <label>Launch Angle (degrees):</label>
        <input type="range" id="angle" min="0" max="90" value="45" oninput="updateParameter('angle', this.value)">
        <span class="parameter-value" id="angleValue">45</span>
        <input type="number" id="angleInput" value="45" onchange="updateParameter('angle', this.value)">
      </div>
      <div class="parameter-group">
        <label>Gravity (m/s²):</label>
        <input type="range" id="gravity" min="1" max="20" value="9.8" step="0.1" oninput="updateParameter('gravity', this.value)">
        <span class="parameter-value" id="gravityValue">9.8</span>
        <input type="number" id="gravityInput" value="9.8" step="0.1" onchange="updateParameter('gravity', this.value)">
      </div>
    </div>
    <div class="info-panel">
      <h3>Physics Information</h3>
      <div class="live-calculations">
        <h4>Live Calculations:</h4>
        <div class="formula">Range: <span id="rangeValue">0</span> m</div>
        <div class="formula">Max Height: <span id="heightValue">0</span> m</div>
        <div class="formula">Flight Time: <span id="timeValue">0</span> s</div>
        <div class="formula">Current Position: (<span id="xPos">0</span>, <span id="yPos">0</span>) m</div>
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
    let trajectory = [];
    
    // Physics parameters
    let params = {
      velocity: 50,
      angle: 45,
      gravity: 9.8
    };
    
    // Initialize
    window.onload = function() {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      draw();
    };
    
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
      trajectory = [];
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
      if (!isPlaying) {
        trajectory = [];
        draw();
      }
    }
    
    // Update live calculations
    function updateCalculations() {
      const v0 = params.velocity;
      const angle = params.angle * Math.PI / 180;
      const g = params.gravity;
      
      // Calculate projectile motion formulas
      const range = (v0 * v0 * Math.sin(2 * angle)) / g;
      const maxHeight = (v0 * v0 * Math.sin(angle) * Math.sin(angle)) / (2 * g);
      const flightTime = (2 * v0 * Math.sin(angle)) / g;
      
      document.getElementById('rangeValue').textContent = range.toFixed(2);
      document.getElementById('heightValue').textContent = maxHeight.toFixed(2);
      document.getElementById('timeValue').textContent = flightTime.toFixed(2);
      
      // Current position
      const currentX = v0 * Math.cos(angle) * time;
      const currentY = v0 * Math.sin(angle) * time - 0.5 * g * time * time;
      document.getElementById('xPos').textContent = currentX.toFixed(2);
      document.getElementById('yPos').textContent = currentY.toFixed(2);
    }
    
    // Animation loop
    function animate() {
      if (!isPlaying) return;
      
      time += speed * 0.016; // 60fps
      draw();
      updateCalculations();
      
      // Stop animation when projectile hits ground
      const v0 = params.velocity;
      const angle = params.angle * Math.PI / 180;
      const g = params.gravity;
      const flightTime = (2 * v0 * Math.sin(angle)) / g;
      
      if (time >= flightTime) {
        pauseAnimation();
        time = flightTime;
      }
      
      animationId = requestAnimationFrame(animate);
    }
    
    // Main drawing function
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const v0 = params.velocity;
      const angle = params.angle * Math.PI / 180;
      const g = params.gravity;
      
      // Calculate current position
      const x = v0 * Math.cos(angle) * time;
      const y = canvas.height - 50 - (v0 * Math.sin(angle) * time - 0.5 * g * time * time);
      
      // Add to trajectory
      if (isPlaying && y < canvas.height - 50) {
        trajectory.push({x: x, y: y});
      }
      
      // Draw ground
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 50);
      ctx.lineTo(canvas.width, canvas.height - 50);
      ctx.stroke();
      
      // Draw trajectory
      if (trajectory.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trajectory[0].x, trajectory[0].y);
        for (let i = 1; i < trajectory.length; i++) {
          ctx.lineTo(trajectory[i].x, trajectory[i].y);
        }
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
      }
      
      // Draw projectile
      if (y < canvas.height - 50) {
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        
        // Draw velocity vector
        const vx = v0 * Math.cos(angle);
        const vy = v0 * Math.sin(angle) - g * time;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vx * 2, y - vy * 2);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Draw launch point
      ctx.beginPath();
      ctx.arc(0, canvas.height - 50, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
    }
  </script>
</body>
</html>`;

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Test Physics Animation</h2>
      <div className="border-2 border-black rounded-lg w-full">
        <iframe
          srcDoc={testCode}
          className="w-full"
          style={{ width: '800px', height: '600px' }}
          title="Test Physics Animation"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
