'use client';

import { useState } from 'react';
import { Play, ArrowRight, ExternalLink, Zap, Orbit, Atom, Calculator, Activity } from 'lucide-react';
import TestPhysics from './TestPhysics';

export default function LandingPage({ onStartCreating }: { onStartCreating: () => void }) {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="h-screen bg-black text-white overflow-hidden relative flex">
      {/* ===== Left Animated Physics Section ===== */}
      <div className="w-1/4 bg-zinc-1000 relative overflow-hidden">
        {/* Seamless Blend Effect */}
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-r from-transparent to-black z-10"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="modernGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                <circle cx="0" cy="0" r="1" fill="rgba(255, 255, 255, 0.08)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#modernGrid)" />
          </svg>
        </div>

        {/* Physics Animations Container */}
        <div className="absolute inset-0 p-6">
          
          {/* 1. Projectile Motion Animation */}
          <div className="absolute top-20 left-8 w-48 h-24">
            <svg className="w-full h-full" viewBox="0 0 192 96">
              <defs>
                <path id="projectilePath" d="M10,80 Q60,15 150,70" />
              </defs>
              {/* Trajectory Line */}
              <path 
                d="M10,80 Q60,15 150,70" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="1" 
                fill="none"
                strokeDasharray="2,4"
              />
              {/* Moving Ball */}
              <circle r="2.5" fill="white" className="animate-projectile">
                <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#projectilePath" />
                </animateMotion>
              </circle>
            </svg>
          </div>

          {/* 2. Free Fall Animation */}
          <div className="absolute top-1/2 left-12 transform -translate-y-1/2">
            <div className="relative w-12 h-36">
              <div className="absolute left-1/2 top-0 w-px h-full bg-white/20 transform -translate-x-1/2"></div>
              
              <div className="absolute left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 animate-freefall"></div>
              <div className="absolute left-1/2 w-1.5 h-1.5 bg-white/70 rounded-full transform -translate-x-1/2 animate-freefall" style={{animationDelay: '1s'}}></div>
              <div className="absolute left-1/2 w-1.5 h-1.5 bg-white/40 rounded-full transform -translate-x-1/2 animate-freefall" style={{animationDelay: '2s'}}></div>
              
              <div className="absolute bottom-0 left-0 w-12 h-px bg-white/40"></div>
            </div>
            <div className="text-xs text-white/40 mt-2 font-mono">FREE FALL</div>
          </div>

          {/* 3. Collision Animation */}
          <div className="absolute bottom-24 left-4 w-56 h-12">
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/30 transform -translate-y-1/2"></div>
              
              <div className="absolute top-1/2 w-6 h-3 bg-white transform -translate-y-1/2 animate-car1">
                <div className="w-full h-full relative">
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-white"></div>
                  <div className="absolute right-0 top-0 w-0.5 h-full bg-white"></div>
                </div>
              </div>
              
              <div className="absolute top-1/2 right-0 w-6 h-3 bg-white/80 transform -translate-y-1/2 animate-car2">
                <div className="w-full h-full relative">
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-white"></div>
                  <div className="absolute right-0 top-0 w-0.5 h-full bg-white"></div>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-collision-flash opacity-0"></div>
            </div>
            <div className="text-xs text-white/40 mt-2 font-mono">COLLISION</div>
          </div>

          {/* Physics Icon */}
          <div className="absolute bottom-6 right-6">
            <div className="p-3 border border-white/10 rounded-full bg-black/30 backdrop-blur-sm">
              <Orbit className="w-5 h-5 text-white/80 animate-pulse" />
            </div>
          </div>

          {/* Floating Physics Particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full animate-physics-float opacity-30"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDuration: `${8 + Math.random() * 12}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}

          {/* Mathematical Formulas */}
          <div className="absolute top-1/4 left-3 text-xs text-white/20 font-mono space-y-1">
            <div>v = u + at</div>
            <div>s = ut + ½at²</div>
            <div>F = ma</div>
          </div>
        </div>
      </div>

      {/* ===== Center Main Content Section ===== */}
      <div className="flex-1 bg-black relative flex items-center justify-center">
        {/* Clean Background with Minimal Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Ultra Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.01]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="centerGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#centerGrid)" />
            </svg>
          </div>

          {/* Minimal Floating Particles */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-white rounded-full animate-physics-float opacity-10"
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${30 + Math.random() * 40}%`,
                animationDuration: `${15 + Math.random() * 20}s`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Main Content - Centered */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
          {/* Header */}
          <div className="mb-12 relative">
            <div className="absolute -top-2 -left-2">
              <Zap className="w-4 h-4 text-white/40 animate-pulse" />
            </div>
            <span className="inline-flex justify-center items-center gap-3 px-6 py-3 border border-white/10 bg-zinc-950/50 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-2xl">
              Powered by{" "}
              <a
                href="https://buildfastwithai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors flex items-center gap-1 font-semibold"
              >

                Build Fast With AI
                <ExternalLink className="w-4 h-4" />
              </a>
            </span>
          </div>

          {/* Main Title */}
          <div className="mb-8 relative">
            <h1 className=" text-4xl md:text-7xl font-bold mb-4 leading-none tracking-tight">
              <span className="text-white"> Master Physics with</span>
              <br />
              <span className="text-white glow-text-mono animate-glow-mono">AI Animations</span>
            </h1>
            
            {/* Physics Formulas */}
            <div className="absolute -top-8 -right-8 text-sm text-white/15 font-mono hidden lg:block">
              F = ma
            </div>
            <div className="absolute -bottom-6 -left-8 text-sm text-white/15 font-mono hidden lg:block">
              E = mc²
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Transform complex physics concepts into{" "}
            <span className="text-white font-normal">interactive visualizations</span>.
            <br />
           <span className="text-white hidden lg:block font-normal">Describe any scenario and let AI bring it to life.</span>
          </p>

          {/* Modern Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={onStartCreating}
              className="group relative flex items-center gap-4 px-10 py-5 bg-white text-black rounded-none hover:bg-gray-100 transition-all duration-300 text-lg font-bold tracking-wide uppercase letterspacing shadow-2xl hover:shadow-white/10 hover:scale-[1.02]"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Create Animation
              <div className="absolute inset-0 border border-white/20 -m-1 transition-all duration-300 group-hover:border-white/40"></div>
            </button>

            <button
              onClick={() => setShowDemo(true)}
              className="group flex items-center gap-4 px-10 py-5 border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 text-lg font-bold tracking-wide uppercase letterspacing hover:scale-[1.02]"
            >
              <Orbit className="w-5 h-5 group-hover:animate-spin-slow transition-all" />
              See Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* Modern Feature Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 uppercase tracking-widest font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-px bg-white animate-pulse"></div>
              Real-time Physics
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-px bg-white animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              Interactive Simulations
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-px bg-white animate-pulse" style={{ animationDelay: '1s' }}></div>
              AI-Powered
            </div>
          </div>
        </div>
      </div>

      {/* ===== Right Physics Computation/AI Animation Section ===== */}
      <div className="w-1/4 bg-zinc-1000 relative overflow-hidden">
        {/* Seamless Blend Effect */}
       <div className="absolute right-0 top-0 w-full h-96 bg-gradient-to-t from-transparent to-black z-10"></div> 
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-l from-transparent to-black z-10"></div>
        
        {/* Physics Computation Grid Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="physicsGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 25 50 M 0 25 L 50 25" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                <circle cx="25" cy="25" r="1.5" fill="rgba(255, 255, 255, 0.06)" />
                <path d="M 12.5 12.5 L 37.5 37.5 M 37.5 12.5 L 12.5 37.5" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#physicsGrid)" />
          </svg>
        </div>

        {/* Physics AI Animations Container */}
        <div className="absolute inset-0 p-6">
          
          {/* 1. Physics Calculator Animation */}
          <div className="absolute top-16 right-8 w-32 h-48">
            <div className="relative w-full h-full border border-white/20 rounded bg-black/30 p-2">
              {/* Calculator display */}
              <div className="bg-white/10 rounded p-2 mb-2 font-mono text-xs">
                <div className="animate-calculation-update text-white/80">F = ma</div>
                <div className="animate-calculation-update text-white/60" style={{animationDelay: '1s'}}>v² = u² + 2as</div>
                <div className="animate-calculation-update text-white/60" style={{animationDelay: '2s'}}>KE = ½mv²</div>
              </div>
              {/* Calculator buttons grid */}
              {/* <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-white/10 rounded animate-calc-button"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '3s'
                    }}
                  ></div>
                ))}
              </div> */}
            </div>
            <div className="text-xs text-white/40 mt-2 font-mono">PHYSICS CALC</div>
          </div>

          {/* 2. Wave Function Animation */}
          <div className="absolute top-1/2 right-12 transform -translate-y-1/2">
            <div className="w-48 h-32">
              <svg className="w-full h-full" viewBox="0 0 192 128">
                {/* Sine wave */}
                <path 
                  d="M10,64 Q40,20 70,64 T130,64 T190,64" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="2" 
                  fill="none"
                  className="animate-wave-physics"
                />
                {/* Cosine wave offset */}
                <path 
                  d="M10,64 Q40,108 70,64 T130,64 T190,64" 
                  stroke="rgba(255,255,255,0.2)" 
                  strokeWidth="1" 
                  fill="none"
                  className="animate-wave-physics"
                  style={{animationDelay: '0.5s'}}
                />
                {/* Wave particles */}
                <circle r="2" fill="white" className="animate-wave-particle opacity-60">
                  <animateMotion dur="4s" repeatCount="indefinite">
                    <mpath href="*"/>
                  </animateMotion>
                </circle>
              </svg>
            </div>
            <div className="text-xs text-white/40 mt-2 font-mono">WAVE PHYSICS</div>
          </div>

          {/* 3. AI Neural Network for Physics */}
          <div className="absolute bottom-24 right-6 w-40 h-32">
            <svg className="w-full h-full" viewBox="0 0 160 128">
              {/* Neural network layers */}
              
              {/* Input layer */}
              <circle cx="20" cy="32" r="4" fill="white" className="animate-neural-pulse" />
              <circle cx="20" cy="64" r="4" fill="white" className="animate-neural-pulse" style={{animationDelay: '0.2s'}} />
              <circle cx="20" cy="96" r="4" fill="white" className="animate-neural-pulse" style={{animationDelay: '0.4s'}} />
              
              {/* Hidden layer */}
              <circle cx="80" cy="20" r="3" fill="white" className="animate-neural-pulse" style={{animationDelay: '0.6s'}} />
              <circle cx="80" cy="48" r="3" fill="white" className="animate-neural-pulse" style={{animationDelay: '0.8s'}} />
              <circle cx="80" cy="76" r="3" fill="white" className="animate-neural-pulse" style={{animationDelay: '1s'}} />
              <circle cx="80" cy="104" r="3" fill="white" className="animate-neural-pulse" style={{animationDelay: '1.2s'}} />
              
              {/* Output layer */}
              <circle cx="140" cy="48" r="4" fill="white" className="animate-neural-pulse" style={{animationDelay: '1.4s'}} />
              <circle cx="140" cy="80" r="4" fill="white" className="animate-neural-pulse" style={{animationDelay: '1.6s'}} />
              
              {/* Connections */}
              <line x1="20" y1="32" x2="80" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="animate-neural-connection" />
              <line x1="20" y1="32" x2="80" y2="48" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="animate-neural-connection" style={{animationDelay: '0.3s'}} />
              <line x1="20" y1="64" x2="80" y2="76" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="animate-neural-connection" style={{animationDelay: '0.6s'}} />
              <line x1="80" y1="48" x2="140" y2="48" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="animate-neural-connection" style={{animationDelay: '0.9s'}} />
              <line x1="80" y1="76" x2="140" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="animate-neural-connection" style={{animationDelay: '1.2s'}} />
            </svg>
            <div className="text-xs text-white/40 mt-2 font-mono">AI PHYSICS</div>
          </div>

          {/* 4. Data Flow Animation */}
          <div className="absolute top-1/4 right-16 w-32 h-24">
            <div className="relative w-full h-full">
              {/* Data blocks flowing */}
              <div className="absolute w-4 h-2 bg-white/40 rounded animate-data-flow"></div>
              <div className="absolute w-4 h-2 bg-white/40 rounded animate-data-flow" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute w-4 h-2 bg-white/40 rounded animate-data-flow" style={{animationDelay: '1s'}}></div>
              <div className="absolute w-4 h-2 bg-white/40 rounded animate-data-flow" style={{animationDelay: '1.5s'}}></div>
              
              {/* Data processing pipeline */}
              <div className="absolute right-0 top-1/2 w-8 h-8 border border-white/30 rounded bg-black/40 transform -translate-y-1/2">
                <div className="w-full h-full animate-processing-spin">
                  <Activity className="w-full h-full text-white/60" />
                </div>
              </div>
            </div>
            <div className="text-xs text-white/40 mt-2 font-mono">DATA FLOW</div>
          </div>

          {/* 5. Physics Simulation Engine */}
          <div className="absolute bottom-6 left-6">
            <div className="p-3 border border-white/10 rounded-full bg-black/30 backdrop-blur-sm">
              <Calculator className="w-5 h-5 text-white/80 animate-pulse" />
            </div>
          </div>

          {/* Floating Physics Data Particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-physics-data-float opacity-25"
              style={{
                top: `${20 + Math.random() * 60}%`,
                right: `${15 + Math.random() * 70}%`,
                animationDuration: `${12 + Math.random() * 18}s`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            ></div>
          ))}

          {/* Physics AI Terms */}
          <div className="absolute bottom-1/4 left-3 text-xs text-white/20 font-mono space-y-1">
            <div>ML</div>
            <div>SIM</div>
            <div>CALC</div>
          </div>
        </div>
      </div>

      {/* ===== Modern Demo Modal ===== */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div className="relative bg-zinc-900 border border-white/10 text-white w-full max-w-7xl max-h-full flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-10 border-b border-white/10 flex-shrink-0 bg-black/50">
              <div>
                <h3 className="text-2xl md:text-4xl font-bold mb-3 flex items-center gap-4 tracking-tight">
                  <Atom className="w-10 h-10 text-white" />
                  Physics Animation Demo
                </h3>
                <p className="text-gray-400 text-xs md:text-lg font-light">Experience interactive physics visualization</p>
              </div>
              <button
                onClick={() => setShowDemo(false)}
                className="text-white/50 hover:text-white hover:bg-white/5 text-3xl font-light p-4 transition-all duration-200 border border-transparent hover:border-white/10"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 h-full overflow-auto p-1 bg-zinc-950">
              <TestPhysics />
            </div>
          </div>
        </div>
      )}

      {/* ===== Enhanced CSS with All Animations ===== */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        .animate-physics-float {
          animation: physicsFloatMono linear infinite;
        }
        .animate-physics-data-float {
          animation: physicsDataFloat linear infinite;
        }
        .animate-glow-mono {
          animation: glowMono 4s ease-in-out infinite;
        }
        .glow-text-mono {
          text-shadow: 
            0 0 20px rgba(255, 255, 255, 0.5),
            0 0 40px rgba(255, 255, 255, 0.2),
            0 0 60px rgba(255, 255, 255, 0.1);
        }
        .letterspacing {
          letter-spacing: 0.1em;
        }

        /* Physics Animations */
        .animate-projectile {
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
        }
        
        .animate-freefall {
          animation: freefall 3s ease-in infinite;
        }
        
        .animate-car1 {
          animation: car1Move 4s ease-in-out infinite;
        }
        
        .animate-car2 {
          animation: car2Move 4s ease-in-out infinite;
        }
        
        .animate-collision-flash {
          animation: collisionFlash 4s ease-in-out infinite;
        }

        /* Physics AI/Computation Animations */
        .animate-calculation-update {
          animation: calculationUpdate 3s ease-in-out infinite;
        }
        
        .animate-calc-button {
          animation: calcButton 3s ease-in-out infinite;
        }
        
        .animate-wave-physics {
          animation: wavePhysics 4s ease-in-out infinite;
        }
        
        .animate-wave-particle {
          animation: waveParticle 4s linear infinite;
        }
        
        .animate-neural-pulse {
          animation: neuralPulse 2s ease-in-out infinite;
        }
        
        .animate-neural-connection {
          animation: neuralConnection 3s ease-in-out infinite;
        }
        
        .animate-data-flow {
          animation: dataFlow 2s linear infinite;
        }
        
        .animate-processing-spin {
          animation: processingSpin 4s ease-in-out infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes physicsFloatMono {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-60px) translateX(-10px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-90px) translateX(20px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-120px) translateX(0);
            opacity: 0;
          }
        }

        @keyframes physicsDataFloat {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-50px) translateX(-20px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-100px) translateX(15px) rotate(180deg);
            opacity: 0.9;
          }
          75% {
            transform: translateY(-150px) translateX(-30px) rotate(270deg);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-200px) translateX(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes glowMono {
          0%, 100% {
            text-shadow: 
              0 0 20px rgba(255, 255, 255, 0.5),
              0 0 40px rgba(255, 255, 255, 0.2),
              0 0 60px rgba(255, 255, 255, 0.1);
          }
          50% {
            text-shadow: 
              0 0 30px rgba(255, 255, 255, 0.8),
              0 0 60px rgba(255, 255, 255, 0.4),
              0 0 90px rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes freefall {
          0% {
            top: 0;
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            top: 130px;
            opacity: 0;
          }
        }

        @keyframes car1Move {
          0% {
            left: 0;
          }
          45% {
            left: calc(50% - 12px);
          }
          55% {
            left: calc(50% - 12px);
            transform: translateY(-50%) scale(0.9);
          }
          100% {
            left: 0;
            transform: translateY(-50%) scale(1);
          }
        }

        @keyframes car2Move {
          0% {
            right: 0;
          }
          45% {
            right: calc(50% - 12px);
          }
          55% {
            right: calc(50% - 12px);
            transform: translateY(-50%) scale(0.9);
          }
          100% {
            right: 0;
            transform: translateY(-50%) scale(1);
          }
        }

        @keyframes collisionFlash {
          0%, 40%, 60%, 100% {
            opacity: 0;
          }
          45%, 55% {
            opacity: 1;
          }
        }

        @keyframes calculationUpdate {
          0%, 70%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          15%, 55% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes calcButton {
          0%, 80%, 100% {
            background-color: rgba(255, 255, 255, 0.1);
          }
          20%, 60% {
            background-color: rgba(255, 255, 255, 0.3);
          }
        }

        @keyframes wavePhysics {
          0% {
            stroke-dasharray: 0 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 100 200;
            stroke-dashoffset: -50;
          }
          100% {
            stroke-dasharray: 200 200;
            stroke-dashoffset: -200;
          }
        }

        @keyframes waveParticle {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes neuralPulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes neuralConnection {
          0%, 100% {
            stroke-opacity: 0.1;
            stroke-width: 1;
          }
          50% {
            stroke-opacity: 0.6;
            stroke-width: 2;
          }
        }

        @keyframes dataFlow {
          0% {
            left: 0;
            top: 50%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: calc(100% - 16px);
            top: 50%;
            opacity: 0;
          }
        }

        @keyframes processingSpin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        /* Custom scrollbar */
        .overflow-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        .overflow-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
