
'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import PhysicsQuestionForm from '@/components/PhysicsQuestionForm';
import PhysicsResponse from '@/components/PhysicsResponse';
import TestPhysics from '@/components/TestPhysics';

interface PhysicsResponse {
  analysis: string;
  solution: string;
  code: string;
  concepts: string[];
}

export default function Home() {
  const [response, setResponse] = useState<PhysicsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTestPhysics, setShowTestPhysics] = useState(false);
  const handleSubmit = async (question: string) => {
    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const res = await fetch('/api/generate-physics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to generate physics visualization');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b-2 border-black p-6 flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Open Brilliant</h1>
          <p className="text-gray-600 mt-2">Interactive physics learning with AI-generated animations</p>
        </div>
        <div>
          <button
            onClick={() => setShowTestPhysics(true)}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            See Animation
          </button>
          {showTestPhysics && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
                <button
                  onClick={() => setShowTestPhysics(false)}
                  className="absolute top-2 right-2 text-black hover:text-red-600 text-2xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>
                <TestPhysics />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Question Input */}
        <PhysicsQuestionForm onSubmit={handleSubmit} loading={loading} />

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Response Display */}
        {response && <PhysicsResponse response={response} />}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Analyzing physics concepts and generating animation...</p>
          </div>
        )}
      </main>

     
    </div>
  );
}

