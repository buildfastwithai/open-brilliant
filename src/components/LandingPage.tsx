"use client";

import {
  Activity,
  ArrowRight,
  Calculator,
  ExternalLink,
  Orbit,
  Play,
  Zap,
} from "lucide-react";

export default function LandingPage({
  onStartCreating,
}: {
  onStartCreating: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative flex flex-col lg:flex-row">
      {/* ===== Left Animated Physics Section ===== */}
      <div className="hidden lg:block lg:w-1/4 bg-card relative overflow-hidden">
        {/* Seamless Blend Effect */}
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-r from-transparent to-background z-10"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="modernGrid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="hsl(var(--muted-foreground) / 0.05)"
                  strokeWidth="1"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="1"
                  fill="hsl(var(--muted-foreground) / 0.08)"
                />
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
                stroke="hsl(var(--muted-foreground) / 0.3)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="2,4"
              />
              {/* Moving Ball */}
              <circle
                r="2.5"
                fill="hsl(var(--foreground))"
                className="animate-projectile"
              >
                <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#projectilePath" />
                </animateMotion>
              </circle>
            </svg>
          </div>

          {/* 2. Free Fall Animation */}
          <div className="absolute top-1/2 left-12 transform -translate-y-1/2">
            <div className="relative w-12 h-36">
              <div className="absolute left-1/2 top-0 w-px h-full bg-foreground/20 transform -translate-x-1/2"></div>

              <div className="absolute left-1/2 w-1.5 h-1.5 bg-foreground rounded-full transform -translate-x-1/2 animate-freefall"></div>
              <div
                className="absolute left-1/2 w-1.5 h-1.5 bg-foreground/70 rounded-full transform -translate-x-1/2 animate-freefall"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute left-1/2 w-1.5 h-1.5 bg-foreground/40 rounded-full transform -translate-x-1/2 animate-freefall"
                style={{ animationDelay: "2s" }}
              ></div>

              <div className="absolute bottom-0 left-0 w-12 h-px bg-foreground/40"></div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 font-mono">
              FREE FALL
            </div>
          </div>

          {/* 3. Collision Animation */}
          <div className="absolute bottom-24 left-4 w-56 h-12">
            <div className="relative w-full h-full">
              <div className="absolute top-1/2 left-0 w-full h-px bg-foreground/30 transform -translate-y-1/2"></div>

              <div className="absolute top-1/2 w-6 h-3 bg-foreground transform -translate-y-1/2 animate-car1">
                <div className="w-full h-full relative">
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-white"></div>
                  <div className="absolute right-0 top-0 w-0.5 h-full bg-white"></div>
                </div>
              </div>

              <div className="absolute top-1/2 right-0 w-6 h-3 bg-foreground/80 transform -translate-y-1/2 animate-car2">
                <div className="w-full h-full relative">
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-white"></div>
                  <div className="absolute right-0 top-0 w-0.5 h-full bg-white"></div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-foreground rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-collision-flash opacity-0"></div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 font-mono">
              COLLISION
            </div>
          </div>

          {/* Physics Icon */}
          <div className="absolute bottom-6 right-6">
            <div className="p-3 border border-border rounded-full bg-card/30 backdrop-blur-sm">
              <Orbit className="w-5 h-5 text-muted-foreground animate-pulse" />
            </div>
          </div>

          {/* Floating Physics Particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-foreground rounded-full animate-physics-float opacity-30"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDuration: `${8 + Math.random() * 12}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}

          {/* Mathematical Formulas */}
          <div className="absolute top-1/4 left-3 text-xs text-muted-foreground/50 font-mono space-y-1">
            <div>v = u + at</div>
            <div>s = ut + ½at²</div>
            <div>F = ma</div>
          </div>
        </div>
      </div>

      {/* ===== Center Main Content Section ===== */}
      <div className="flex-1 bg-background relative flex items-center justify-center px-4 py-8 lg:py-0">
        {/* Clean Background with Minimal Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Ultra Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.01]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="centerGrid"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 80 0 L 0 0 0 80"
                    fill="none"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#centerGrid)" />
            </svg>
          </div>

          {/* Minimal Floating Particles */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-foreground rounded-full animate-physics-float opacity-10"
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
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-12 relative">
            <div className="absolute -top-2 -left-2 hidden sm:block">
              <Zap className="w-4 h-4 text-muted-foreground animate-pulse" />
            </div>
            <span className="inline-flex justify-center items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 border border-border bg-card/50 backdrop-blur-sm text-foreground rounded-full text-xs sm:text-sm font-medium shadow-2xl">
              Powered by{" "}
              <a
                href="https://buildfastwithai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted-foreground transition-colors flex items-center gap-1 font-semibold"
              >
                Build Fast With AI
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </span>
          </div>

          {/* Main Title */}
          <div className="mb-6 sm:mb-8 relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-none tracking-tight">
              <span className="text-foreground"> Master Physics with</span>
              <br />
              <span className="text-foreground glow-text-mono animate-glow-mono">
                AI Animations
              </span>
            </h1>

            {/* Physics Formulas */}
            <div className="absolute -top-8 -right-8 text-sm text-muted-foreground/30 font-mono hidden lg:block">
              F = ma
            </div>
            <div className="absolute -bottom-6 -left-8 text-sm text-muted-foreground/30 font-mono hidden lg:block">
              E = mc²
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Transform complex physics concepts into{" "}
            <span className="text-foreground font-normal">
              interactive visualizations
            </span>
            .
            <br />
            <span className="text-foreground hidden sm:block font-normal">
              Describe any scenario and let AI bring it to life.
            </span>
          </p>

          {/* Modern Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
            <button
              onClick={onStartCreating}
              className="group relative flex items-center gap-3 sm:gap-4 px-6 sm:px-10 py-3 sm:py-5 bg-primary text-primary-foreground rounded-none hover:bg-primary/90 transition-all duration-300 text-base sm:text-lg font-bold tracking-wide uppercase letterspacing shadow-2xl hover:shadow-primary/10 hover:scale-[1.02] w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Create Animation
              <div className="absolute inset-0 border border-border -m-1 transition-all duration-300 group-hover:border-border/60"></div>
            </button>
          </div>

          {/* Modern Feature Indicators */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground uppercase tracking-widest font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-px bg-foreground animate-pulse"></div>
              Real-time Physics
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-px bg-foreground animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              Interactive Simulations
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-px bg-foreground animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              AI-Powered
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile Physics Animation Section ===== */}
      <div className="block lg:hidden bg-card relative overflow-hidden py-8">
        {/* Minimal Mobile Grid Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="mobileGrid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="hsl(var(--muted-foreground) / 0.03)"
                  strokeWidth="1"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="0.5"
                  fill="hsl(var(--muted-foreground) / 0.05)"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mobileGrid)" />
          </svg>
        </div>

        {/* Mobile Physics Elements */}
        <div className="relative z-10 flex justify-center items-center gap-8 px-4">
          {/* Simple Projectile Motion */}
          <div className="w-16 h-12">
            <svg className="w-full h-full" viewBox="0 0 64 48">
              <defs>
                <path id="mobileProjectilePath" d="M5,40 Q25,10 55,35" />
              </defs>
              <path
                d="M5,40 Q25,10 55,35"
                stroke="hsl(var(--muted-foreground) / 0.3)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="1,2"
              />
              <circle
                r="1.5"
                fill="hsl(var(--foreground))"
                className="animate-projectile"
              >
                <animateMotion dur="2s" repeatCount="indefinite">
                  <mpath href="#mobileProjectilePath" />
                </animateMotion>
              </circle>
            </svg>
          </div>

          {/* Simple Neural Network */}
          <div className="w-20 h-12">
            <svg className="w-full h-full" viewBox="0 0 80 48">
              <circle
                cx="10"
                cy="16"
                r="2"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
              />
              <circle
                cx="10"
                cy="32"
                r="2"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <circle
                cx="40"
                cy="24"
                r="2"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "1s" }}
              />
              <circle
                cx="70"
                cy="24"
                r="2"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "1.5s" }}
              />
              <line
                x1="10"
                y1="16"
                x2="40"
                y2="24"
                stroke="hsl(var(--muted-foreground) / 0.2)"
                strokeWidth="1"
                className="animate-neural-connection"
              />
              <line
                x1="10"
                y1="32"
                x2="40"
                y2="24"
                stroke="hsl(var(--muted-foreground) / 0.2)"
                strokeWidth="1"
                className="animate-neural-connection"
                style={{ animationDelay: "0.3s" }}
              />
              <line
                x1="40"
                y1="24"
                x2="70"
                y2="24"
                stroke="hsl(var(--muted-foreground) / 0.2)"
                strokeWidth="1"
                className="animate-neural-connection"
                style={{ animationDelay: "0.6s" }}
              />
            </svg>
          </div>

          {/* Simple Wave */}
          <div className="w-16 h-8">
            <svg className="w-full h-full" viewBox="0 0 64 32">
              <path
                d="M5,16 Q15,8 25,16 T45,16 T60,16"
                stroke="hsl(var(--muted-foreground) / 0.4)"
                strokeWidth="1.5"
                fill="none"
                className="animate-wave-physics"
              />
            </svg>
          </div>
        </div>

        {/* Mobile Physics Labels */}
        <div className="text-center mt-4">
          <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
            Physics • AI • Simulations
          </div>
        </div>
      </div>

      {/* ===== Right Physics Computation/AI Animation Section ===== */}
      <div className="hidden lg:block lg:w-1/4 bg-card relative overflow-hidden">
        {/* Seamless Blend Effect */}
        <div className="absolute right-0 top-0 w-full h-96 bg-gradient-to-t from-transparent to-background z-10"></div>
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-l from-transparent to-background z-10"></div>

        {/* Physics Computation Grid Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="physicsGrid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 25 0 L 25 50 M 0 25 L 50 25"
                  fill="none"
                  stroke="hsl(var(--muted-foreground) / 0.04)"
                  strokeWidth="1"
                />
                <circle
                  cx="25"
                  cy="25"
                  r="1.5"
                  fill="hsl(var(--muted-foreground) / 0.06)"
                />
                <path
                  d="M 12.5 12.5 L 37.5 37.5 M 37.5 12.5 L 12.5 37.5"
                  fill="none"
                  stroke="hsl(var(--muted-foreground) / 0.02)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#physicsGrid)" />
          </svg>
        </div>

        {/* Physics AI Animations Container */}
        <div className="absolute inset-0 p-6">
          {/* 1. Physics Calculator Animation */}
          <div className="absolute top-16 right-8 w-32 h-48">
            <div className="relative w-full h-full border border-border rounded bg-card/30 p-2">
              {/* Calculator display */}
              <div className="bg-foreground/10 rounded p-2 mb-2 font-mono text-xs">
                <div className="animate-calculation-update text-foreground/80">
                  F = ma
                </div>
                <div
                  className="animate-calculation-update text-foreground/60"
                  style={{ animationDelay: "1s" }}
                >
                  v² = u² + 2as
                </div>
                <div
                  className="animate-calculation-update text-foreground/60"
                  style={{ animationDelay: "2s" }}
                >
                  KE = ½mv²
                </div>
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
            <div className="text-xs text-muted-foreground mt-2 font-mono">
              PHYSICS CALC
            </div>
          </div>

          {/* 2. Wave Function Animation */}
          <div className="absolute top-1/2 right-12 transform -translate-y-1/2">
            <div className="w-48 h-32">
              <svg className="w-full h-full" viewBox="0 0 192 128">
                {/* Sine wave */}
                <path
                  d="M10,64 Q40,20 70,64 T130,64 T190,64"
                  stroke="hsl(var(--muted-foreground) / 0.4)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-wave-physics"
                />
                {/* Cosine wave offset */}
                <path
                  d="M10,64 Q40,108 70,64 T130,64 T190,64"
                  stroke="hsl(var(--muted-foreground) / 0.2)"
                  strokeWidth="1"
                  fill="none"
                  className="animate-wave-physics"
                  style={{ animationDelay: "0.5s" }}
                />
                {/* Wave particles */}
                <circle
                  r="2"
                  fill="hsl(var(--foreground))"
                  className="animate-wave-particle opacity-60"
                >
                  <animateMotion dur="4s" repeatCount="indefinite">
                    <mpath href="*" />
                  </animateMotion>
                </circle>
              </svg>
            </div>
            <div className="text-xs text-muted-foreground mt-2 font-mono">
              WAVE PHYSICS
            </div>
          </div>

          {/* 3. AI Neural Network for Physics */}
          <div className="absolute bottom-24 right-6 w-40 h-32">
            <svg className="w-full h-full" viewBox="0 0 160 128">
              {/* Neural network layers */}

              {/* Input layer */}
              <circle
                cx="20"
                cy="32"
                r="4"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
              />
              <circle
                cx="20"
                cy="64"
                r="4"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <circle
                cx="20"
                cy="96"
                r="4"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "0.4s" }}
              />

              {/* Hidden layer */}
              <circle
                cx="80"
                cy="20"
                r="3"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "0.6s" }}
              />
              <circle
                cx="80"
                cy="48"
                r="3"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "0.8s" }}
              />
              <circle
                cx="80"
                cy="76"
                r="3"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "1s" }}
              />
              <circle
                cx="80"
                cy="104"
                r="3"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "1.2s" }}
              />

              {/* Output layer */}
              <circle
                cx="140"
                cy="48"
                r="4"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "1.4s" }}
              />
              <circle
                cx="140"
                cy="80"
                r="4"
                fill="hsl(var(--foreground))"
                className="animate-neural-pulse"
                style={{ animationDelay: "1.6s" }}
              />

              {/* Connections */}
              <line
                x1="20"
                y1="32"
                x2="80"
                y2="20"
                stroke="hsl(var(--muted-foreground) / 0.2)"
                strokeWidth="1"
                className="animate-neural-connection"
              />
              <line
                x1="20"
                y1="32"
                x2="80"
                y2="48"
                stroke="hsl(var(--muted-foreground) / 0.2)"
                strokeWidth="1"
                className="animate-neural-connection"
                style={{ animationDelay: "0.3s" }}
              />
              <line
                x1="20"
                y1="64"
                x2="80"
                y2="76"
                stroke="hsl(var(--muted-foreground) / 0.2)"
                strokeWidth="1"
                className="animate-neural-connection"
                style={{ animationDelay: "0.6s" }}
              />
              <line
                x1="80"
                y1="48"
                x2="140"
                y2="48"
                stroke="hsl(var(--muted-foreground) / 0.2)"
                strokeWidth="1"
                className="animate-neural-connection"
                style={{ animationDelay: "0.9s" }}
              />
              <line
                x1="80"
                y1="76"
                x2="140"
                y2="80"
                stroke="hsl(var(--muted-foreground) / 0.2)"
                strokeWidth="1"
                className="animate-neural-connection"
                style={{ animationDelay: "1.2s" }}
              />
            </svg>
            <div className="text-xs text-muted-foreground mt-2 font-mono">
              AI PHYSICS
            </div>
          </div>

          {/* 4. Data Flow Animation */}
          <div className="absolute top-1/4 right-16 w-32 h-24">
            <div className="relative w-full h-full">
              {/* Data blocks flowing */}
              <div className="absolute w-4 h-2 bg-foreground/40 rounded animate-data-flow"></div>
              <div
                className="absolute w-4 h-2 bg-foreground/40 rounded animate-data-flow"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute w-4 h-2 bg-foreground/40 rounded animate-data-flow"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute w-4 h-2 bg-foreground/40 rounded animate-data-flow"
                style={{ animationDelay: "1.5s" }}
              ></div>

              {/* Data processing pipeline */}
              <div className="absolute right-0 top-1/2 w-8 h-8 border border-border rounded bg-card/40 transform -translate-y-1/2">
                <div className="w-full h-full animate-processing-spin">
                  <Activity className="w-full h-full text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 font-mono">
              DATA FLOW
            </div>
          </div>

          {/* 5. Physics Simulation Engine */}
          <div className="absolute bottom-6 left-6">
            <div className="p-3 border border-border rounded-full bg-card/30 backdrop-blur-sm">
              <Calculator className="w-5 h-5 text-muted-foreground animate-pulse" />
            </div>
          </div>

          {/* Floating Physics Data Particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-foreground rounded-full animate-physics-data-float opacity-25"
              style={{
                top: `${20 + Math.random() * 60}%`,
                right: `${15 + Math.random() * 70}%`,
                animationDuration: `${12 + Math.random() * 18}s`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            ></div>
          ))}

          {/* Physics AI Terms */}
          <div className="absolute bottom-1/4 left-3 text-xs text-muted-foreground/50 font-mono space-y-1">
            <div>ML</div>
            <div>SIM</div>
            <div>CALC</div>
          </div>
        </div>
      </div>

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
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
            0 0 40px rgba(255, 255, 255, 0.2), 0 0 60px rgba(255, 255, 255, 0.1);
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
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
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
          0%,
          100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
              0 0 40px rgba(255, 255, 255, 0.2),
              0 0 60px rgba(255, 255, 255, 0.1);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
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
          0%,
          40%,
          60%,
          100% {
            opacity: 0;
          }
          45%,
          55% {
            opacity: 1;
          }
        }

        @keyframes calculationUpdate {
          0%,
          70%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          15%,
          55% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes calcButton {
          0%,
          80%,
          100% {
            background-color: rgba(255, 255, 255, 0.1);
          }
          20%,
          60% {
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
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes neuralConnection {
          0%,
          100% {
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

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-physics-float,
          .animate-physics-data-float {
            animation-duration: 10s, 12s !important;
          }

          .animate-glow-mono {
            animation-duration: 6s !important;
          }

          /* Reduce motion for better mobile performance */
          @media (prefers-reduced-motion: reduce) {
            .animate-projectile,
            .animate-freefall,
            .animate-car1,
            .animate-car2,
            .animate-collision-flash,
            .animate-calculation-update,
            .animate-wave-physics,
            .animate-neural-pulse,
            .animate-neural-connection,
            .animate-data-flow,
            .animate-processing-spin,
            .animate-physics-float,
            .animate-physics-data-float,
            .animate-glow-mono {
              animation: none !important;
            }
          }
        }
      `}</style>
    </div>
  );
}
