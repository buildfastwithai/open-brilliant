"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Plus, Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "loading" | "success" | "error";
}

interface PhysicsQuestionFormProps {
  onSubmit: (question: string) => void;
  loading: boolean;
  showSampleQuestions?: boolean;
  selectedQuestion?: string;
  onQuestionChange?: (question: string) => void;
  chatMessages?: ChatMessage[];
  onNewConversation?: () => void;
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
  chatMessages = [],
  onNewConversation,
}: PhysicsQuestionFormProps) {
  const [question, setQuestion] = useState(selectedQuestion);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Update local state when selectedQuestion prop changes
  useEffect(() => {
    setQuestion(selectedQuestion);
  }, [selectedQuestion]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    onSubmit(question);
    setQuestion(""); // Clear input after submit
  };

  const handleSampleClick = (sample: string) => {
    setQuestion(sample);
    if (onQuestionChange) {
      onQuestionChange(sample);
    }
  };

  const handleNew = () => {
    setQuestion("");
    if (onQuestionChange) {
      onQuestionChange("");
    }
    if (onNewConversation) {
      onNewConversation();
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full justify-between">
      {/* Chat Messages */}
      {chatMessages.length > 0 && (
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full" ref={chatScrollRef}>
            <div className="space-y-4 pb-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 ${
                      message.type === "user"
                        ? "bg-primary text-foreground"
                        : message.status === "loading"
                        ? "bg-muted text-muted-foreground border-2 border-dashed"
                        : message.status === "error"
                        ? "bg-destructive/10 text-destructive border border-destructive/20"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                      {message.status === "loading" && (
                        <Loader2 className="w-4 h-4 animate-spin inline ml-2" />
                      )}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Sample Questions - Only show when enabled */}
      {showSampleQuestions && (
        <div className="flex-shrink-0">
          <p className="text-sm font-medium mb-3">
            Try these sample questions:
          </p>
          <ScrollArea className="h-80">
            <div className="space-y-2">
              {sampleQuestions.map((sample, index) => (
                <Button
                  key={index}
                  onClick={() => handleSampleClick(sample)}
                  className="w-full whitespace-pre-wrap h-auto text-left justify-start p-3"
                  variant="outline"
                  size="sm"
                >
                  {sample}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Input Form */}
      <div className="flex-shrink-0">
        <form onSubmit={handleSubmit} className="space-y-3 bg-background">
          <Textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Describe your physics scenario here..."
            className="w-full resize-none min-h-[120px] focus-visible:ring-1"
            disabled={loading}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={loading || !question.trim()}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleNew}
              className="px-3"
              title="Start New Conversation"
            >
              <Plus className="w-4 h-4" />
              New
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
