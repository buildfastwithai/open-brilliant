'use client';

// Simple test to verify iframe animation is working
export default function SimpleTest() {
  const simpleCode = `<!DOCTYPE html>
<html>
<head>
<style>
  body { background: white; color: black; font-family: Arial; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; text-align: center; }
  .animation-area { border: 2px solid black; margin: 20px 0; }
  .controls { display: flex; gap: 10px; margin: 10px 0; justify-content: center; }
  .controls button { padding: 8px 16px; border: 1px solid black; background: white; cursor: pointer; }
  .controls button:hover { background: black; color: white; }
</style>
</head>
<body>
  <div class="container">
    <h2>Simple Animation Test</h2>
    <div class="animation-area">
      <canvas id="canvas" width="500" height="200"></canvas>
    </div>
    <div class="controls">
      <button onclick="startAnimation()">Start</button>
      <button onclick="stopAnimation()">Stop</button>
      <button onclick="resetAnimation()">Reset</button>
    </div>
    <p>If you see a moving circle, the animation is working!</p>
  </div>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;
    
    function startAnimation() {
      if (animationId) return;
      animationId = setInterval(draw, 16);
    }
    
    function stopAnimation() {
      if (animationId) {
        clearInterval(animationId);
        animationId = null;
      }
    }
    
    function resetAnimation() {
      stopAnimation();
      time = 0;
      draw();
    }
    
    function draw() {
      // Clear canvas with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set drawing styles
      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'black';
      ctx.lineWidth = 2;
      
      // Draw moving circle
      const x = 250 + 100 * Math.sin(time * 0.05);
      const y = 100 + 50 * Math.cos(time * 0.03);
      
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw trail
      for (let i = 0; i < 10; i++) {
        const trailX = 250 + 100 * Math.sin((time - i) * 0.05);
        const trailY = 100 + 50 * Math.cos((time - i) * 0.03);
        ctx.beginPath();
        ctx.arc(trailX, trailY, 5 - i * 0.5, 0, 2 * Math.PI);
        ctx.fillStyle = \`rgba(0, 0, 0, ${0.5  * 0.05})\`;
        ctx.fill();
      }
      
      // Reset fill style
      ctx.fillStyle = 'black';
      
      time++;
    }
    
    // Start animation immediately
    setTimeout(function() {
      startAnimation();
    }, 500);
  </script>
</body>
</html>`;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Simple Animation Test</h2>
      <div className="border-2 border-black rounded-lg overflow-hidden">
        <iframe
          srcDoc={simpleCode}
          className="w-full h-80"
          title="Simple Animation Test"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
