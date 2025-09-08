'use client';

import { useState } from 'react';
import { Play, ArrowRight, Zap, BookOpen, Code, Users, ExternalLink } from 'lucide-react';
import TestPhysics from './TestPhysics';

export default function LandingPage({ onStartCreating }: { onStartCreating: () => void }) {
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Generation",
      description: "Advanced AI creates custom physics animations from your descriptions"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Interactive Learning",
      description: "Learn complex physics concepts through dynamic visualizations"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Real-time Code",
      description: "Get executable code for your animations with detailed explanations"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Educational Focus",
      description: "Perfect for students, teachers, and physics enthusiasts"
    }
  ];

  const sampleAnimations = [
    "Free fall with velocity calculations",
    "Pendulum oscillations with energy graphs",
    "Wave interference patterns",
    "Projectile motion trajectories",
    "Electric field visualizations",
    "Optical refraction simulations"
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium">
              Powered by <a href="https://buildfastwithai.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">BuildFastWithAI</a>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Master Physics with
            <span className="block text-black">AI Animations</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform complex physics concepts into interactive visualizations. 
            Describe any physics scenario and watch AI generate custom animations with real-time calculations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onStartCreating}
              className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold"
            >
              <Play className="w-5 h-5" />
              Create Your Animation
            </button>
            
            <button
              onClick={() => setShowDemo(true)}
              className="flex items-center gap-2 px-8 py-4 border-2 border-black rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
            >
              See Demo
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Open Brilliant?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience physics like never before with our AI-powered animation platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-black transition-colors">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to create your physics animation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Describe Your Scenario</h3>
              <p className="text-gray-600">Tell us about your physics problem or concept you want to visualize</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">AI Generates Animation</h3>
              <p className="text-gray-600">Our AI analyzes your request and creates an interactive physics simulation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Learn & Explore</h3>
              <p className="text-gray-600">Interact with the animation and get detailed explanations with code</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Animations Section */}
      <section id="demo" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sample Animations</h2>
            <p className="text-xl text-gray-600">Explore these physics concepts with interactive animations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleAnimations.map((animation, index) => (
              <div key={index} className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-black transition-colors">
                <h3 className="text-lg font-semibold mb-2">{animation}</h3>
                <p className="text-gray-600 text-sm">Click to see this animation in action</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={onStartCreating}
              className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold"
            >
              Create Your Own Animation
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore Physics?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students and educators using AI to master physics concepts
          </p>
          <button
            onClick={onStartCreating}
            className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold"
          >
            Start Creating Now
          </button>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
            {/* Modal Header - Fixed */}
            <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 flex-shrink-0">
              <div>
                <h3 className="text-2xl font-bold">Physics Animation Demo</h3>
                <p className="text-gray-600">Here's an example of what you can create</p>
              </div>
              <button
                onClick={() => setShowDemo(false)}
                className="text-black hover:text-red-600 text-3xl font-bold p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            
            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-auto p-6">
              <TestPhysics />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
