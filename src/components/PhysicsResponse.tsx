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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Physics Analysis */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold border-b-2 border-black pb-2">Physics Analysis</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Concepts:</h3>
            <div className="flex flex-wrap gap-2">
              {response.concepts.map((concept, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-sm"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Analysis:</h3>
            <p className="text-sm leading-relaxed">{response.analysis}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Solution:</h3>
            <div className="text-sm leading-relaxed whitespace-pre-line">{response.solution}</div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      {/* <div className="space-y-4">
        <h2 className="text-xl font-bold border-b-2 border-black pb-2">Generated Code</h2>
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <pre className="text-xs overflow-auto max-h-96 whitespace-pre-wrap font-mono">
            {response.code}
          </pre>
        </div>
      </div> */}

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold border-b-2 border-black pb-2">Live Preview</h2>
        <IframeDebug code={response.code} title="Physics Animation Preview" />
      </div>
    </div>
  );
}
