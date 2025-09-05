'use client';

import { useState } from 'react';
import { Play, RotateCcw, Loader2 } from 'lucide-react';

interface PhysicsQuestionFormProps {
  onSubmit: (question: string) => void;
  loading: boolean;
}
const sampleQuestions = [
    // MECHANICS
    "A ball is dropped from 30m height. Show free fall animation with real-time velocity and height calculations",
    "Two cars start together: Car A with constant speed 12 m/s, Car B accelerates from rest at 2 m/s². When will they meet? Show animation",
    "Simulate a block sliding down an inclined plane with adjustable angle and friction. Show forces acting in real-time",
  
    // WAVES / OSCILLATIONS
    "Show a pendulum oscillating with adjustable length and damping. Display period and energy transformations",
    "Animate two waves interfering on a string. Let me adjust amplitude and phase difference to see constructive/destructive interference",
  
    // ELECTRICITY & MAGNETISM (keep simplest one)
    "Animate charging of a capacitor in an RC circuit. Plot voltage vs time as it charges",
  
    // THERMODYNAMICS / ENERGY
    "Show a roller coaster cart moving on track with energy bar graphs (kinetic + potential)",
  
    // OPTICS
    "Simulate light ray passing through a convex lens. Adjust focal length and object distance to see image formation",
    "Animate refraction of light at water–air boundary with adjustable angle of incidence",
  
    // FLUID MECHANICS
    "Show buoyant force on an object floating/sinking in water. Let me change density of object and fluid"
  ];



export default function PhysicsQuestionForm({ onSubmit, loading }: PhysicsQuestionFormProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSubmit(question);
  };

  const handleSampleClick = (sample: string) => {
    setQuestion(sample);
  };

  const handleClear = () => {
    setQuestion('');
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium mb-2">
            Ask a Physics Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Show me projectile motion with adjustable parameters..."
            className="w-full p-4 border-2 border-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
            rows={3}
            disabled={loading}
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Generate Animation
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 px-6 py-3 border-2 border-black rounded-lg hover:bg-gray-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>
      </form>

      {/* Sample Questions */}
      <div className="mt-6">
        <p className="text-sm font-medium mb-3">Try these sample questions:</p>
        <div className="max-h-40 overflow-y-auto flex flex-col gap-2 pr-1">
          {sampleQuestions.map((sample, index) => (
            <button
              key={index}
              onClick={() => handleSampleClick(sample)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-left w-full"
              style={{ whiteSpace: 'normal' }}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
