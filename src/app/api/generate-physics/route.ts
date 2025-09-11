import { NextRequest, NextResponse } from "next/server";

import { createCerebras } from "@ai-sdk/cerebras";
import { generateObject } from "ai";
import { z } from "zod";
import { PROMPT_GENERATOR_SYSTEM } from "@/lib/prompts";
import { SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const { question, apiKey } = await request.json();

    const cerebras = createCerebras({
      apiKey: apiKey,
    });

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Cerebras API key is required. Please provide an API key or set CEREBRAS_API_KEY environment variable.",
        },
        { status: 400 }
      );
    }

    // Define the schema for the prompt generator response
    const promptGeneratorSchema = z.object({
      topic: z.string().describe("The main physics topic"),
      key_concepts: z
        .array(z.string())
        .describe("Array of key physics concepts"),
      formulas: z
        .array(z.string())
        .describe("Array of relevant physics formulas"),
      animation_prompt: z
        .string()
        .describe("Detailed description of what the animation should show"),
    });

    // Define the schema for the physics response
    const physicsSchema = z.object({
      analysis: z
        .union([z.string(), z.array(z.string())])
        .transform((val) => (Array.isArray(val) ? val.join(" ") : val))
        .describe("Brief explanation of the physics concept with key formulas"),
      solution: z
        .union([z.string(), z.array(z.string())])
        .transform((val) => (Array.isArray(val) ? val.join(" ") : val))
        .describe(
          "Step-by-step solution approach following the 3-step process"
        ),
      code: z.string().describe("Complete HTML code with animation"),
      concepts: z
        .union([z.array(z.string()), z.string()])
        .transform((val) => (Array.isArray(val) ? val : [val]))
        .describe("Array of physics concepts"),
    });

    // STEP 1: Generate refined structured prompt
    const { object: generatedPrompt } = await generateObject({
      model: cerebras("qwen-3-coder-480b"),
      system: PROMPT_GENERATOR_SYSTEM,
      prompt: `Physics Question: ${question}

Analyze this physics question and create a structured prompt for animation generation.`,
      schema: promptGeneratorSchema,
      temperature: 0.3,
    });

    // STEP 2: Generate physics analysis and code using the refined prompt
    const { object: physicsResult } = await generateObject({
      model: cerebras("qwen-3-coder-480b"),
      system: SYSTEM_PROMPT,
      prompt: `Physics Question: ${question}

Generated Animation Prompt: ${generatedPrompt.animation_prompt}

Topic: ${generatedPrompt.topic}
Key Concepts: ${generatedPrompt.key_concepts.join(", ")}
Formulas: ${generatedPrompt.formulas.join(", ")}

Follow the 3-step deep thinking process:

STEP 1 - CREATE FORMULA: 
- Identify the key physics equations for this concept
- Define all variables and their relationships
- Consider initial conditions and constraints

STEP 2 - THINK ABOUT REPRESENTATION:
- How to visually represent each component
- What should animate and how
- How to show the mathematical relationships graphically
- Plan the user interface and controls

STEP 3 - IMPLEMENT:
- Create interactive animation using the EXACT CSS Grid layout structure provided
- Canvas goes in canvas-area (left side, 2fr width)
- Controls go in controls-area (top-right)
- Parameters go in parameters-area (middle-right)
- Data/graphs go in data-area (bottom-right)
- Include real-time calculations and parameter controls with premium visual styling
- Make the physics concepts clear and educational with sophisticated animations
- Implement advanced visual effects for professional-quality animations

CRITICAL: Follow the CSS Grid structure exactly - use the provided grid-template-areas.

ENHANCED ANIMATION IMPLEMENTATION:
- Use advanced canvas rendering techniques for premium visual quality
- Implement multi-layered visual effects (shadows, glows, particles)
- Create smooth, natural motion with proper easing functions
- Add visual feedback for all interactions and state changes
- Use sophisticated color schemes with gradients and lighting effects
- Implement particle systems and trail effects where appropriate
- Create depth and dimension with advanced shadow techniques
- Add atmospheric effects and ambient animations
- Use professional typography with visual enhancements for data display

DESIGN CONSISTENCY REQUIREMENTS:
- Copy the EXACT CSS from the template above - do NOT modify any values
- All buttons MUST use the exact classes: control-btn, play-btn, pause-btn, reset-btn
- Button dimensions are FIXED: 80px width, 40px height - never change these
- Use the EXACT HTML structure provided - no variations
- Colors, gradients, and sizes are LOCKED - creativity should be in physics animation only
- If generated design looks different from template, you are doing it WRONG
- Focus all creative energy on making the animations visually stunning and professional

IMPORTANT: Return analysis and solution as SINGLE STRING values, not arrays.`,
      schema: physicsSchema,
      temperature: 0.3,
    });

    return NextResponse.json({
      success: true,
      generatedPrompt: generatedPrompt,
      analysis: physicsResult.analysis,
      solution: physicsResult.solution,
      code: physicsResult.code,
      concepts: physicsResult.concepts,
    });
  } catch (error) {
    console.error("API Error:", error);

    // Return proper error response instead of fallback
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      {
        error: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}
