'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Loader2 } from 'lucide-react';

interface PhysicsQuestionFormProps {
  onSubmit: (question: string) => void;
  loading: boolean;
  showSampleQuestions?: boolean;
  selectedQuestion?: string;
  onQuestionChange?: (question: string) => void;
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
  
 
  ];



export default function PhysicsQuestionForm({ onSubmit, loading, showSampleQuestions = true, selectedQuestion = '', onQuestionChange }: PhysicsQuestionFormProps) {
  const [question, setQuestion] = useState(selectedQuestion);
  
  // Update local state when selectedQuestion prop changes
  React.useEffect(() => {
    setQuestion(selectedQuestion);
  }, [selectedQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSubmit(question);
  };

  const handleSampleClick = (sample: string) => {
    setQuestion(sample);
    if (onQuestionChange) {
      onQuestionChange(sample);
    }
  };

  const handleClear = () => {
    setQuestion('');
    if (onQuestionChange) {
      onQuestionChange('');
    }
  };

  return (
    <div className="mb-8">
      {/* Enhanced form container with shadows and modern styling */}
      <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-8 shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="question" className="block text-base sm:text-lg font-bold mb-2 sm:mb-3 text-black">
              Ask a Physics Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Describe your physics scenario here, e.g., 'A ball dropped from 30m, show free fall' or 'Two cars meeting, one accelerating.'"
              className="w-full p-4 sm:p-6 border-2 border-black rounded-xl resize-none focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-black transition-all duration-300 text-base sm:text-lg shadow-inner bg-gray-50"
              rows={3}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span className="hidden sm:inline">Generating...</span>
                  <span className="sm:hidden">Generating</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Generate Animation</span>
                  <span className="sm:hidden">Generate</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all duration-300 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Sample Questions - Enhanced styling */}
      {!loading && showSampleQuestions && (
        <div className="mt-6 sm:mt-8 bg-white border-2 border-black rounded-2xl p-4 sm:p-6 shadow-2xl">
          <p className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-black flex items-center gap-2">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            Try these sample questions:
          </p>
          <div className="max-h-48 sm:max-h-60 overflow-y-auto flex flex-col gap-2 sm:gap-3 pr-1 sm:pr-2">
            {sampleQuestions.map((sample, index) => (
              <button
                key={index}
                onClick={() => handleSampleClick(sample)}
                className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-2 border-gray-300 rounded-xl hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-left w-full font-medium shadow-sm hover:shadow-md transform hover:scale-[1.00]"
                style={{ whiteSpace: 'normal' }}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
}
