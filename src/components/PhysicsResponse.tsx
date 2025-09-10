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
  return (
    <div className="w-full h-full">
      <iframe
        srcDoc={response.code}
        className="w-full h-full"
        style={{ height: "100%", overflow: "scroll" }}
        title="Physics Animation Preview"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        scrolling="yes"
      />
    </div>
  );
}
