'use client';

import IframeDebug from './IframeDebug';

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
      {/* Main Layout - Consistent Width Container */}
      <div className="max-w-7xl mx-auto">
        {/* Animation Preview */}
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
          <div className="h-[1600px] w-full">
            <IframeDebug code={response.code} title="Physics Animation Preview" />
          </div>
        </div>
      </div>
    </div>
  );
}
