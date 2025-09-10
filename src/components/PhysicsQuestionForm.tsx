"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

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

export default function PhysicsQuestionForm({
  onSubmit,
  loading,
  showSampleQuestions = true,
  selectedQuestion = "",
  onQuestionChange,
}: PhysicsQuestionFormProps) {
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
    setQuestion("");
    if (onQuestionChange) {
      onQuestionChange("");
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full justify-end">
      {/* Sample Questions - Enhanced styling */}
      <div className="">
        <p className="">Try these sample questions:</p>
        <ScrollArea className="h-72">
          {sampleQuestions.map((sample, index) => (
            <Button
              key={index}
              onClick={() => handleSampleClick(sample)}
              className="w-full whitespace-pre-wrap h-auto my-1"
              variant={"outline"}
            >
              {sample}
            </Button>
          ))}
        </ScrollArea>
      </div>
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 relative bg-background"
        >
          <Textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Describe your physics scenario here, e.g., 'A ball dropped from 30m, show free fall' or 'Two cars meeting, one accelerating.'"
            className="w-full resize-none !bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-border h-44"
            disabled={loading}
          />
          <div className="flex flex-col sm:flex-row gap-4 absolute bottom-2 right-2">
            <Button
              type="submit"
              disabled={loading || !question.trim()}
              className=""
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
            </Button>
            <Button
              type="button"
              variant={"outline"}
              onClick={handleClear}
              className=""
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              Clear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
