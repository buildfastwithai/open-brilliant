"use client";

import { useState, useEffect } from "react";
import { Menu, X, Settings } from "lucide-react";
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import PhysicsQuestionForm from "@/components/PhysicsQuestionForm";
import PhysicsResponse from "@/components/PhysicsResponse";
import ApiKeySettings from "@/components/ApiKeySettings";
import SettingsDialog from "@/components/SettingsDialog";
import Toast from "@/components/Toast";

interface PhysicsResponse {
  analysis: string;
  solution: string;
  code: string;
  concepts: string[];
}

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  status?: "loading" | "success" | "error";
}

export default function Home() {
  const [response, setResponse] = useState<PhysicsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCreator, setShowCreator] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showSampleQuestions, setShowSampleQuestions] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("cerebras-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      console.log("API key loaded from localStorage");
    }
  }, []);

  // Toast helper functions
  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  // Save API key to localStorage when it changes
  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
    if (newApiKey.trim()) {
      localStorage.setItem("cerebras-api-key", newApiKey.trim());
      showToast("API key saved successfully!", "success");
    } else {
      localStorage.removeItem("cerebras-api-key");
    }
  };

  const handleSubmit = async (question: string) => {
    // Check if API key is available
    if (!apiKey.trim()) {
      showToast("Please enter your Cerebras API key in settings to generate physics animations.", "error");
      setShowSettings(true);
      return;
    }

    // Hide sample questions after first submit
    setShowSampleQuestions(false);
    // Close sidebar on mobile after submit
    setSidebarOpen(false);
    setLoading(true);
    setError("");
    setResponse(null);
    setSelectedQuestion("");

    // Add user message
    const userMessageId = Date.now().toString();
    const userMessage: ChatMessage = {
      id: userMessageId,
      type: "user",
      content: question,
      timestamp: new Date(),
    };

    // Add loading assistant message
    const assistantMessageId = (Date.now() + 1).toString();
    const loadingMessage: ChatMessage = {
      id: assistantMessageId,
      type: "assistant",
      content: "Generating your physics animation...",
      timestamp: new Date(),
      status: "loading",
    };

    setChatMessages((prev) => [...prev, userMessage, loadingMessage]);

    try {
      const res = await fetch("/api/generate-physics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, apiKey }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || "Failed to generate physics visualization"
        );
      }

      const data = await res.json();
      setResponse(data);

      // Show success toast
      showToast("Physics animation generated successfully! 🎉", "success");

      // Update loading message to success
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: "✅ Physics animation generated successfully!",
                status: "success",
              }
            : msg
        )
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);

      // Show toast for error
      if (errorMessage.toLowerCase().includes("api key")) {
        showToast("Invalid or missing API key. Please check your settings.", "error");
        setShowSettings(true);
      } else {
        showToast(`Error: ${errorMessage}`, "error");
      }

      // Update loading message to error
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: `❌ Error: ${errorMessage}`,
                status: "error",
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartCreating = () => {
    setShowCreator(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewConversation = () => {
    setChatMessages([]);
    setResponse(null);
    setError("");
    setLoading(false);
    setSelectedQuestion("");
    setShowSampleQuestions(true);
    setSidebarOpen(false); // Close sidebar on mobile when starting new conversation
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
      <Header 
        setShowCreator={setShowCreator} 
        onSettingsClick={() => setShowSettings(true)}
        hasApiKey={!!apiKey.trim()}
      />

      {!response && !loading ? (
        // Default Chat Interface View - Mobile: Full screen, Desktop: Split view
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          {/* Mobile Settings Button - Only when no response and no API key */}
          {!apiKey.trim() && (
            <button
              onClick={() => setShowSettings(true)}
              className="lg:hidden fixed top-20 right-4 z-50 p-2 bg-secondary text-secondary-foreground rounded-full shadow-lg"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}

          {/* Chat Interface */}
          <main className="max-w-md w-full flex-1 lg:w-80 xl:w-96 flex items-center justify-center p-4 bg-muted lg:border-r lg:border-border">
            <div className="w-full max-w-2xl lg:max-w-none p-6">
              <PhysicsQuestionForm
                onSubmit={handleSubmit}
                loading={loading}
                showSampleQuestions={showSampleQuestions}
                selectedQuestion={selectedQuestion}
                onQuestionChange={setSelectedQuestion}
                chatMessages={chatMessages}
                onNewConversation={handleNewConversation}
              />
            </div>
          </main>

          {/* Desktop Preview Area - Hidden on mobile */}
          <aside className="hidden lg:flex flex-1 bg-background relative overflow-hidden">
            <div className="relative h-full w-full flex flex-col">
              {/* Background Grid Pattern */}
              <div className="absolute inset-0">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="desktopGrid"
                      width="60"
                      height="60"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 60 0 L 0 0 0 60"
                        fill="none"
                        stroke="hsl(var(--muted-foreground) / 0.03)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="0"
                        cy="0"
                        r="1"
                        fill="hsl(var(--muted-foreground) / 0.05)"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#desktopGrid)" />
                </svg>
              </div>

              {/* Preview Placeholder Content - Center */}
              <div className="relative z-10 flex-1 flex items-center justify-center px-8">
                <div className="text-center max-w-lg mx-auto">
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">
                      Physics Preview
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Your physics animation will appear here after you submit a
                      question. Try one of the sample questions to get started!
                    </p>
                  </div>
                  {/* API Key Settings - Only show if no API key */}
                  {!apiKey.trim() && (
                    <div className="relative z-10 p-6">
                      <ApiKeySettings
                        apiKey={apiKey}
                        onApiKeyChange={handleApiKeyChange}
                      />
                    </div>
                  )}
                  {/* Floating Physics Elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/20 rounded-full animate-physics-float"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${10 + Math.random() * 80}%`,
                          animationDuration: `${8 + Math.random() * 12}s`,
                          animationDelay: `${Math.random() * 5}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        // Response Preview Mode - Mobile: Sidebar layout, Desktop: Keep split view
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-20 right-4 z-50 p-2 bg-primary text-primary-foreground rounded-full shadow-lg"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Chat Interface - Mobile: Sidebar, Desktop: Left pane */}
          <aside
            className={`
            w-full lg:w-80 xl:w-96 bg-muted lg:border-r lg:border-border flex flex-col
            lg:relative lg:translate-x-0 lg:max-h-none
            ${
              sidebarOpen
                ? "fixed inset-0 z-40 max-h-screen"
                : "hidden lg:flex max-h-[40vh]"
            }
          `}
          >
            <div className="flex-1 overflow-hidden p-6">
              <PhysicsQuestionForm
                onSubmit={handleSubmit}
                loading={loading}
                showSampleQuestions={showSampleQuestions}
                selectedQuestion={selectedQuestion}
                onQuestionChange={setSelectedQuestion}
                chatMessages={chatMessages}
                onNewConversation={handleNewConversation}
              />
            </div>
          </aside>

          {/* Main Canvas Area - Desktop: Right pane, Mobile: Full screen */}
          <main className="flex-1 flex flex-col bg-background relative overflow-hidden">
            {/* Error Display */}
            {error && (
              <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-destructive/10 border-2 border-destructive/20 rounded-xl shadow-lg mx-4 sm:mx-0">
                <p className="text-destructive font-medium text-sm sm:text-base">
                  {error}
                </p>
              </div>
            )}

            {/* Response Display */}
            {response ? (
              <div className="flex-1 p-4 overflow-hidden">
                <PhysicsResponse response={response} />
              </div>
            ) : loading ? (
              <div className="relative h-full flex items-center justify-center">
                {/* Background Grid Pattern for Loading */}
                <div className="absolute inset-0">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="loadingGrid"
                        width="60"
                        height="60"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 60 0 L 0 0 0 60"
                          fill="none"
                          stroke="hsl(var(--muted-foreground) / 0.03)"
                          strokeWidth="1"
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r="1"
                          fill="hsl(var(--muted-foreground) / 0.05)"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#loadingGrid)" />
                  </svg>
                </div>

                {/* Loading Content */}
                <div className="relative z-10 text-center max-w-lg mx-auto px-8">
                  <div className="mb-8">
                    {/* <div className="w-16 h-16 bg-primary/10 rounded-full flex flex-col items-center justify-center mx-auto mb-4"> */}
                    {/* Animated loading dots */}

                    <h2 className="text-2xl font-semibold mb-4 text-foreground">
                      Generating Physics Animation...
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      AI is analyzing your physics scenario and creating an
                      interactive simulation.
                    </p>
                    <div className="flex justify-center items-center">
                      <div className="flex space-x-2 mt-2 text-center justify-center items-center ">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <span
                            key={i}
                            className="w-2.5 h-2.5 bg-primary/60 rounded-full inline-block"
                            style={{
                              animation: `loading-bounce 1s infinite`,
                              animationDelay: `${i * 0.15}s`,
                            }}
                          />
                        ))}
                        {/* </div> */}
                      </div>
                    </div>

                    {/* Loading dots animation keyframes */}
                    <style jsx>{`
                      @keyframes loading-bounce {
                        0%,
                        100% {
                          transform: translateY(0);
                          opacity: 0.7;
                        }
                        50% {
                          transform: translateY(-8px);
                          opacity: 1;
                        }
                      }
                    `}</style>
                  </div>
                </div>
              </div>
            ) : null}
          </main>
        </div>
      )}

      {/* Settings Dialog */}
      <SettingsDialog
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        apiKey={apiKey}
        onApiKeyChange={handleApiKeyChange}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
