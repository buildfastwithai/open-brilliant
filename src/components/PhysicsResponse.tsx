"use client";

import IframeDebug from "./IframeDebug";

interface PhysicsResponse {
  analysis: string;
  solution: string;
  code: string;
  concepts: string[];
}

interface PhysicsResponseProps {
  response: PhysicsResponse;
}

export default function PhysicsResponse({ response }: PhysicsResponseProps) {
  // Inject responsive CSS that allows horizontal scrolling
  const mobileOptimizedCode = response.code.replace(
    "<head>",
    `<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { 
        margin: 0; 
        padding: 8px; 
        overflow-x: auto !important; 
        overflow-y: auto !important;
        min-width: 100%;
      }
      canvas, svg { 
        min-width: 600px !important; 
        height: auto !important;
        display: block;
      }
      .controls, .physics-data { 
        font-size: 12px !important; 
        padding: 8px !important;
        margin: 4px 0 !important;
        min-width: 280px;
      }
      .physics-data { 
        position: relative !important; 
        bottom: auto !important;
        background: rgba(0,0,0,0.8) !important;
        color: white !important;
        border-radius: 8px !important;
        max-height: 120px !important;
        overflow-y: auto !important;
        overflow-x: auto !important;
      }
      @media (max-width: 480px) {
        body { padding: 4px; }
        canvas, svg { min-width: 480px !important; }
        .controls, .physics-data { 
          font-size: 10px !important; 
          padding: 4px !important;
          margin: 2px 0 !important;
          min-width: 240px;
        }
      }
    </style>`
  );

  return (
    <div className="w-full h-full flex flex-col">
      <iframe
        srcDoc={mobileOptimizedCode}
        className="w-full h-full border rounded-lg"
        style={{
          overflow: "auto",
          minHeight: "400px",
          overflowX: "auto",
          overflowY: "auto"
        }}
        title="Physics Animation Preview"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        scrolling="yes"
      />
    </div>
  );
}
