'use client';

interface SampleQuestionsSectionProps {
  onQuestionSelect: (question: string) => void;
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
];

export default function SampleQuestionsSection({ onQuestionSelect, loading }: SampleQuestionsSectionProps) {
  const handleSampleClick = (sample: string) => {
    onQuestionSelect(sample);
  };

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-6 shadow-2xl">
      <p className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-black flex items-center gap-2">
        <div className="w-2 h-2 bg-black rounded-full"></div>
        Try these sample questions:
      </p>
      <div className="max-h-48 sm:max-h-60 overflow-y-auto flex flex-col gap-2 sm:gap-3 pr-1 sm:pr-2">
        {sampleQuestions.map((sample, index) => (
          <button
            key={index}
            onClick={() => handleSampleClick(sample)}
            disabled={loading}
            className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-2 border-gray-300 rounded-xl hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-left w-full font-medium shadow-sm hover:shadow-md transform hover:scale-[1.00] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{ whiteSpace: 'normal' }}
          >
            {sample}
          </button>
        ))}
      </div>
    </div>
  );
}
