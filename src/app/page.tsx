
'use client';

import { useState } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
import PhysicsQuestionForm from '@/components/PhysicsQuestionForm';
import PhysicsResponse from '@/components/PhysicsResponse';

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
  const [showCreator, setShowCreator] = useState(false);

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

  const handleStartCreating = () => {
    setShowCreator(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setShowCreator(false);
    setResponse(null);
    setError('');
    setLoading(false);
  };

  if (!showCreator) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <LandingPage onStartCreating={handleStartCreating} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      
      {/* Creator Section */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToLanding}
            className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Creator Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Create Your Physics Animation</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe any physics scenario and watch AI generate an interactive animation with real-time calculations
          </p>
        </div>

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

      <Footer />
    </div>
  );
}

