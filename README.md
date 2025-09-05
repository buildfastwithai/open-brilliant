# Open Brilliant - Physics Education App

An interactive physics learning application built with Next.js 15 that uses AI to generate educational animations and visualizations for physics concepts.

## Features

- **AI-Powered Physics Analysis**: Uses OpenAI GPT-4 to analyze physics questions and generate educational content
- **Highly Interactive Animations**: Creates HTML5 Canvas-based animations with real-time parameter controls
- **Live Parameter Adjustment**: Users can adjust physics parameters (velocity, angle, mass, gravity, etc.) and see immediate changes
- **Real-Time Calculations**: Live display of physics formulas and values that update as parameters change
- **Two-Column Layout**: 
  - Physics Analysis (concepts, explanations, solutions)
  - Live Preview (iframe with fully interactive animation)
- **Interactive Controls**: Play, pause, reset, and speed adjustment buttons
- **Parameter Sliders**: Range sliders and number inputs for adjusting physics variables
- **Black & White Theme**: Clean, minimal design focused on educational content
- **Enhanced Sample Questions**: Pre-built examples emphasizing interactive parameter control
- **Error Handling**: Comprehensive error handling and loading states
- **Test Animation Modal**: Built-in projectile motion demo accessible via "See Animation" button

## Supported Physics Concepts

- Projectile Motion
- Pendulum Motion
- Inclined Plane with Friction
- Wave Interference
- Electrical Circuits
- Simple Harmonic Motion
- Circular Motion
- Doppler Effect
- And more...

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **OpenAI GPT-4** - AI-powered physics analysis and code generation
- **E2B Code Interpreter** - Code execution sandbox (imported but not actively used)
- **Lucide React** - Beautiful icons
- **HTML5 Canvas** - For physics animations
- **Vanilla JavaScript** - For animation logic in generated code

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd open-brilliant-code
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI API Key for physics analysis and code generation
OPENAI_API_KEY=your_openai_api_key_here

# E2B API Key for code execution sandbox (optional)
E2B_API_KEY=your_e2b_api_key_here
```

### 3. Get API Keys

#### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

#### E2B API Key (Optional)
1. Go to [E2B Platform](https://e2b.dev/)
2. Create an account
3. Get your API key from the dashboard
4. Add it to your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Ask a Physics Question**: Type your physics question in the text area
2. **Use Sample Questions**: Click on any sample question to get started quickly
3. **Generate Animation**: Click "Generate Animation" to create an interactive visualization
4. **Explore Results**: 
   - Read the physics analysis and solution
   - Examine the generated code
   - Interact with the live animation preview

## Sample Questions

Try these example questions to get started:

- "Show me projectile motion with adjustable angle and velocity"
- "Demonstrate a pendulum with different lengths and masses"
- "Visualize a block sliding down an inclined plane with friction"
- "Create an animation of wave interference patterns"
- "Show electrical circuit with resistors in series and parallel"

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate-physics/
│   │       └── route.ts          # API endpoint for physics generation
│   ├── globals.css               # Global styles and physics-specific CSS
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main page component
└── components/
    ├── PhysicsQuestionForm.tsx   # Question input form with sample questions
    ├── PhysicsResponse.tsx       # Response display component
    ├── IframeDebug.tsx           # Iframe wrapper for animations
    ├── TestPhysics.tsx           # Built-in projectile motion demo
    └── SimpleTest.tsx            # Additional test component
```

## API Endpoint

### POST `/api/generate-physics`

Generates physics analysis and interactive animations.

**Request Body:**
```json
{
  "question": "Show me projectile motion with adjustable parameters"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": "Physics concept analysis...",
  "solution": "Step-by-step solution...",
  "code": "<!DOCTYPE html>...",
  "concepts": ["projectile motion", "kinematics"]
}
```

## Generated Code Structure

The AI generates self-contained HTML files with:

- **Consistent Layout**: Black and white theme with proper structure
- **Interactive Controls**: Play, pause, reset, and parameter adjustment buttons
- **Real-time Calculations**: Live display of physics formulas and values
- **HTML5 Canvas Animations**: Smooth, educational visualizations with proper physics equations
- **Parameter Controls**: Range sliders and number inputs for real-time adjustments
- **Animation Loop**: Uses requestAnimationFrame for smooth 60fps animations
- **Responsive Design**: Works on different screen sizes

## How Animations Are Made

### Animation Generation Process

1. **User Input**: User asks a physics question
2. **AI Analysis**: GPT-4 analyzes the question and identifies physics concepts
3. **Code Generation**: AI generates complete HTML/CSS/JavaScript code with:
   - HTML5 Canvas setup
   - Physics equations (projectile motion, pendulum, etc.)
   - Interactive parameter controls (sliders, inputs)
   - Animation loop using `requestAnimationFrame`
   - Real-time calculations and formula updates
4. **Iframe Rendering**: Generated code is displayed in a sandboxed iframe
5. **Live Interaction**: Users can adjust parameters and see immediate changes

### Animation Structure

```javascript
// Core animation loop
function animate() {
  time += speed * 0.016; // 60fps
  draw(); // Draw current frame
  updateCalculations(); // Update live formulas
  requestAnimationFrame(animate); // Continue loop
}

// Physics calculations
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Calculate physics (e.g., projectile motion)
  const x = v0 * Math.cos(angle) * time;
  const y = v0 * Math.sin(angle) * time - 0.5 * g * time * time;
  
  // Draw animated elements
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, 2 * Math.PI);
  ctx.fill();
}
```


**Future Potential**: Could be used for more complex physics simulations requiring server-side computation or Python-based physics libraries.

## Customization

### Adding New Physics Concepts

1. Update the system prompt in `src/app/api/generate-physics/route.ts`
2. Add sample questions in `src/components/PhysicsQuestionForm.tsx`
3. Test with new physics scenarios

### Styling Changes

- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components for layout changes
- Physics animation styles are defined in the generated HTML

## Troubleshooting

### Common Issues

1. **API Key Errors**: Ensure your OpenAI API key is correctly set in `.env.local`
2. **Code Generation Fails**: Check the browser console for errors
3. **Animation Not Loading**: Verify the generated HTML is valid
4. **Slow Response**: OpenAI API calls may take 10-30 seconds

### Debug Mode

Add `console.log` statements in the API route to debug issues:

```typescript
console.log('Question:', question);
console.log('Response:', result);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Open an issue on GitHub
