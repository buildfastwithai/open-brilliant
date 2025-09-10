"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import PhysicsQuestionForm from "@/components/PhysicsQuestionForm";
import PhysicsResponse from "@/components/PhysicsResponse";
import SkeletonLoader from "@/components/SkeletonLoader";
import SampleQuestionsSection from "@/components/SampleQuestionsSection";

interface PhysicsResponse {
  analysis: string;
  solution: string;
  code: string;
  concepts: string[];
}

export default function Home() {
  const [response, setResponse] = useState<PhysicsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCreator, setShowCreator] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const handleSubmit = async (question: string) => {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("/api/generate-physics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || "Failed to generate physics visualization"
        );
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleStartCreating = () => {
    setShowCreator(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToLanding = () => {
    setShowCreator(false);
    setResponse(null);
    setError("");
    setLoading(false);
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showCreator) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* <Header /> */}
        <LandingPage onStartCreating={handleStartCreating} />
        {/* <Footer /> */}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />

      {/* Creator Section */}
      <main className="gap-10 p-6 flex h-full bg-muted">
        {/* Creator Header */}
        <div className="flex flex-col items-center justify-center max-w-sm w-full h-full">
          {/* Question Input */}
          <PhysicsQuestionForm
            onSubmit={handleSubmit}
            loading={loading}
            showSampleQuestions={!response}
            selectedQuestion={selectedQuestion}
            onQuestionChange={setSelectedQuestion}
          />
        </div>

        <div className="flex-1 flex flex-col w-full border shadow-2xl bg-background">
          {!response && (
            <div className="text-center p-8">
              <h1 className="text-4xl font-bold mb-4">
                Create Your Physics Animation
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Describe any physics scenario and watch AI generate an
                interactive animation with real-time calculations
              </p>
            </div>
          )}
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-6 bg-destructive/10 border-2 border-destructive/20 rounded-xl shadow-lg">
              <p className="text-destructive font-medium">{error}</p>
            </div>
          )}
          {/* Response Display */}
          {response && <PhysicsResponse response={response} />}

          {/* Loading State with Skeleton */}
          {loading && <SkeletonLoader />}
        </div>
      </main>
    </div>
  );
}
