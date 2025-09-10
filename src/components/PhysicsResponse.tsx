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
    <div className="space-y-6 w-full">
      {/* Main Layout - Enhanced with shadows and modern styling */}
      <div className="max-w-7xl mx-auto">
        {/* Animation Preview with enhanced styling */}
        <div className="bg-white border-2 border-black rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]">
          {/* Header with title */}
          <div className="bg-black text-white px-6 py-4 border-b-2 border-black">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              Physics Animation
            </h3>
          </div>

          {/* Animation container with enhanced styling */}
          <div className="relative">
            <div className="aspect-video max-h-[80vh] w-full bg-gradient-to-br from-gray-50 to-white">
              <IframeDebug
                code={response.code}
                title="Physics Animation Preview"
              />
            </div>

            {/* Corner decorations */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-black rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-black rounded-bl-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
