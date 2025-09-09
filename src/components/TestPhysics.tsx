'use client';

// Enhanced test component with preview + analysis layout (layout-only update)
export default function TestPhysics() {
  const testCode = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  :root{
    --ink:#000;
    --bg:#fff;
    --muted:#f6f7f9;
    --border:#e5e7eb;
    --pill:#eef2ff;
    --pillText:#1f2937;
    --shadow:0 2px 8px rgba(0,0,0,0.08);
  }
  *{box-sizing:border-box}
  body{
    background:var(--bg);
    color:var(--ink);
    font-family:Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    margin:0;
    padding:24px;
  }

  /* Page container */
  .container{max-width:1200px; margin:0 auto; display:grid; gap:24px;}
  .header{
    border:2px solid var(--ink);
    border-radius:12px;
    padding:14px 18px;
    font-weight:800;
    font-size:18px;
    background:linear-gradient(180deg,#fff,#fafafa);
    box-shadow:var(--shadow);
  }

  /* Main two-column layout */
  .layout{
    display:grid;
    grid-template-columns: 2fr 1fr;
    gap:24px;
    align-items:start; /* prevent sidebar stretching */
  }
  @media (max-width: 900px){
    .layout{grid-template-columns:1fr;}
    .sidebar{position:static;}
  }

  /* Cards */
  .card{
    background:#fff;
    border:1.5px solid var(--border);
    border-radius:12px;
    box-shadow:var(--shadow);
  }
  .card .card-h{
    padding:14px 16px;
    border-bottom:1.5px solid var(--border);
    font-weight:800;
  }
  .card .card-b{
    padding:16px;
  }

  /* Left preview panel */
  .animation-area{
    border:2px solid var(--ink);
    border-radius:10px;
    margin:10px 0 14px 0;
    position:relative;
    background:#fff;
    overflow:hidden;
  }
  .controls{
    display:flex;
    gap:12px;
    flex-wrap:wrap;
  }
  .controls button{
    padding:10px 16px;
    border:2px solid var(--ink);
    background:#fff;
    cursor:pointer;
    border-radius:8px;
    font-weight:700;
    font-size:14px;
    transition:all .25s ease;
    box-shadow:0 2px 4px rgba(0,0,0,.08);
  }
  .controls button:hover{
    background:#000; color:#fff; transform:translateY(-2px);
  }
  .controls button:active{transform:translateY(0)}

  /* Sticky sidebar */
  .sidebar{position:sticky; top:16px; display:grid; gap:16px;}

  /* Parameter controls */
  .parameter-controls{ display:grid; gap:16px; }
  .parameter-group{
    border:1.5px solid var(--border);
    padding:14px;
    background:#fafafa;
    border-radius:10px;
    transition:border-color .25s ease, box-shadow .25s ease;
  }
  .parameter-group:hover{ border-color:#000; box-shadow:0 4px 12px rgba(0,0,0,.08); }
  .parameter-group label{
    display:block; font-weight:800; margin-bottom:8px; font-size:14px; color:#111827;
  }
  .row{ display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
  .parameter-group input[type="range"]{
    width:100%; margin:6px 0 2px 0; height:6px; border-radius:3px; background:#ddd; outline:none; -webkit-appearance:none;
  }
  .parameter-group input[type="range"]::-webkit-slider-thumb{
    -webkit-appearance:none; appearance:none; width:18px; height:18px; border-radius:50%; background:#000; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,.2);
  }
  .parameter-group input[type="range"]::-moz-range-thumb{
    width:18px; height:18px; border-radius:50%; background:#000; cursor:pointer; border:none; box-shadow:0 2px 4px rgba(0,0,0,.2);
  }
  .parameter-group input[type="number"]{
    width:90px; padding:8px 10px; border:2px solid #e5e7eb; border-radius:8px; font-weight:700; text-align:center; outline:none;
  }
  .parameter-value{
    font-family:"Courier New", monospace; background:#f3f4f6; padding:4px 10px; border-radius:6px; border:1px solid #e5e7eb; font-weight:700; display:inline-block;
  }
  .unit{color:#6b7280; font-weight:600; margin-left:2px;}

  /* Live data panel */
  .live{
    background:linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
    border:2px solid var(--ink);
    border-radius:10px;
    padding:14px;
  }
  .live h4{ margin:0 0 10px 0; font-size:15px; font-weight:900; }
  .formula{
    font-family:"Courier New", monospace;
    background:#f8fafc;
    padding:10px 12px;
    margin:8px 0;
    border:1px solid #e5e7eb;
    border-radius:8px;
    font-weight:700;
    box-shadow:0 1px 2px rgba(0,0,0,.06);
  }

  /* Analysis section */
  .section{ display:grid; gap:16px; }
  .section .title{
    font-weight:900;
    font-size:18px;
    border-left:6px solid #10b981;
    padding-left:10px;
  }
  .pillbar{ display:flex; flex-wrap:wrap; gap:10px; }
  .pill{
    background:var(--pill);
    color:var(--pillText);
    padding:8px 12px;
    border:1px solid #c7d2fe;
    border-radius:999px;
    font-weight:700;
    font-size:12px;
  }
  .note{
    background:#f9fafb;
    border:1.5px solid var(--border);
    border-radius:10px;
    padding:14px;
    line-height:1.5;
  }
  .list{
    border:1.5px solid var(--border);
    border-radius:10px;
    padding:14px 18px;
    background:#fff;
  }
  .list ol{margin:0 0 0 18px; padding:0}
  .list li{margin:6px 0; font-weight:600}
</style>
</head>
<body>
  <div class="container">
    <div class="header">Projectile Motion — Preview and Analysis</div>

    <div class="layout">
      <!-- Left: Preview -->
      <div class="card">
        <div class="card-h">Preview</div>
        <div class="card-b">
          <div class="animation-area">
            <canvas id="canvas" width="800" height="400" style="max-width:100%; height:auto;"></canvas>
          </div>
          <div class="controls">
            <button onclick="playAnimation()">Play</button>
            <button onclick="pauseAnimation()">Pause</button>
            <button onclick="resetAnimation()">Reset</button>
            <button onclick="toggleSpeed()">Speed: <span id="speedDisplay">1x</span></button>
          </div>
        </div>
      </div>

      <!-- Right: Sidebar (sticky) -->
      <aside class="sidebar">
        <div class="card">
          <div class="card-h">Launch Parameters</div>
          <div class="card-b">
            <div class="parameter-controls">
              <div class="parameter-group">
                <label>Initial Velocity <span class="unit">(m/s)</span></label>
                <input type="range" id="velocity" min="10" max="100" value="50" oninput="updateParameter('velocity', this.value)">
                <div class="row">
                  <span class="parameter-value" id="velocityValue">50</span>
                  <input type="number" id="velocityInput" value="50" onchange="updateParameter('velocity', this.value)">
                </div>
              </div>

              <div class="parameter-group">
                <label>Launch Angle <span class="unit">(deg)</span></label>
                <input type="range" id="angle" min="0" max="90" value="45" oninput="updateParameter('angle', this.value)">
                <div class="row">
                  <span class="parameter-value" id="angleValue">45</span>
                  <input type="number" id="angleInput" value="45" onchange="updateParameter('angle', this.value)">
                </div>
              </div>

              <div class="parameter-group">
                <label>Gravity <span class="unit">(m/s²)</span></label>
                <input type="range" id="gravity" min="1" max="20" value="9.8" step="0.1" oninput="updateParameter('gravity', this.value)">
                <div class="row">
                  <span class="parameter-value" id="gravityValue">9.8</span>
                  <input type="number" id="gravityInput" value="9.8" step="0.1" onchange="updateParameter('gravity', this.value)">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-h">Flight Data</div>
          <div class="card-b">
            <div class="live">
              <h4>Live Calculations</h4>
              <div class="formula">Range: <span id="rangeValue">0</span> m</div>
              <div class="formula">Max Height: <span id="heightValue">0</span> m</div>
              <div class="formula">Flight Time: <span id="timeValue">0</span> s</div>
              <div class="formula">Current Position: (<span id="xPos">0</span>, <span id="yPos">0</span>) m</div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Analysis section -->
    <div class="card section">
      <div class="card-h">Physics Analysis</div>
      <div class="card-b">
        <div class="title">Key Concepts</div>
        <div class="pillbar">
          <span class="pill">Projectile motion</span>
          <span class="pill">Range</span>
          <span class="pill">Max height</span>
          <span class="pill">Flight time</span>
          <span class="pill">Parabolic path</span>
          <span class="pill">vx constant, vy uniform accel</span>
        </div>
        <div class="title" style="margin-top:14px;">Analysis</div>
        <div class="note">
          Horizontal and vertical motions are independent: horizontal velocity stays constant while the vertical component evolves with uniform acceleration \(g\). The standard results used in the live data are \(R = v_0^2 \sin 2\\theta / g\), \(H_{max} = v_0^2 \sin^2\\theta /(2g)\), and \(T = 2 v_0 \sin\\theta / g\). 
        </div>
        <div class="title" style="margin-top:14px;">Solution Steps</div>
        <div class="list">
          <ol>
            <li>Resolve \(v_0\) into \(v_x = v_0\\cos\\theta\) and \(v_y = v_0\\sin\\theta\).</li>
            <li>Time of flight from vertical motion: \(T = 2v_0\\sin\\theta / g\).</li>
            <li>Range from horizontal motion: \(R = v_x \\cdot T = v_0^2\\sin 2\\theta / g\).</li>
            <li>Maximum height from \(v_y^2 = 0 = (v_0\\sin\\theta)^2 - 2gH \\Rightarrow H = v_0^2\\sin^2\\theta /(2g)\).</li>
          </ol>
        </div>
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
    let params = { velocity: 50, angle: 45, gravity: 9.8 };

    // Initialize
    window.onload = function() {
      canvas = document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      draw();
      updateCalculations(); // populate sidebar immediately
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
      updateCalculations();
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
        time = 0; // reset preview to start for clarity
        draw();
      }
    }

    // Update live calculations
    function updateCalculations() {
      const v0 = params.velocity;
      const angle = params.angle * Math.PI / 180;
      const g = params.gravity;

      const range = (v0 * v0 * Math.sin(2 * angle)) / g;
      const maxHeight = (v0 * v0 * Math.sin(angle) * Math.sin(angle)) / (2 * g);
      const flightTime = (2 * v0 * Math.sin(angle)) / g;

      document.getElementById('rangeValue').textContent = range.toFixed(2);
      document.getElementById('heightValue').textContent = maxHeight.toFixed(2);
      document.getElementById('timeValue').textContent = flightTime.toFixed(2);

      const currentX = v0 * Math.cos(angle) * time;
      const currentY = v0 * Math.sin(angle) * time - 0.5 * g * time * time;
      document.getElementById('xPos').textContent = currentX.toFixed(2);
      document.getElementById('yPos').textContent = currentY.toFixed(2);
    }

    // Animation loop
    function animate() {
      if (!isPlaying) return;

      time += speed * 0.016; // ~60fps
      draw();
      updateCalculations();

      const v0 = params.velocity;
      const angle = params.angle * Math.PI / 180;
      const g = params.gravity;
      const flightTime = (2 * v0 * Math.sin(angle)) / g;

      if (time >= flightTime) {
        pauseAnimation();
        time = flightTime;
        updateCalculations();
      }

      animationId = requestAnimationFrame(animate);
    }

    // Main drawing function
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const v0 = params.velocity;
      const angle = params.angle * Math.PI / 180;
      const g = params.gravity;

      const x = v0 * Math.cos(angle) * time;
      const y = canvas.height - 50 - (v0 * Math.sin(angle) * time - 0.5 * g * time * time);

      if (isPlaying && y < canvas.height - 50) {
        trajectory.push({x: x, y: y});
      }

      // Ground
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 50);
      ctx.lineTo(canvas.width, canvas.height - 50);
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Trajectory
      if (trajectory.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trajectory.x, trajectory.y);
        for (let i = 1; i < trajectory.length; i++) {
          ctx.lineTo(trajectory[i].x, trajectory[i].y);
        }
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Projectile + velocity vector
      if (y < canvas.height - 50) {
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#000';
        ctx.fill();

        const vx = v0 * Math.cos(angle);
        const vy = v0 * Math.sin(angle) - g * time;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vx * 2, y - vy * 2);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Launch point
      ctx.beginPath();
      ctx.arc(0, canvas.height - 50, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#2563eb';
      ctx.fill();
    }
  </script>
</body>
</html>`;

  return (
    <div className="w-full">
      <div className="border-2 border-black rounded-lg w-full overflow-hidden">
        <iframe
          srcDoc={testCode}
          className="w-full"
          style={{ width: '100%', height: '760px', minHeight: '600px' }}
          title="Test Physics Animation"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
