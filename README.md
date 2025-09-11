# Open Brilliant

An AI-powered physics education platform that generates interactive physics animations and simulations from natural language questions.

## Features

- **AI-Powered Physics Analysis**: Uses advanced AI to analyze physics questions and generate comprehensive explanations
- **Interactive Animations**: Creates real-time physics simulations with customizable parameters
- **Real-time Data Display**: Shows live physics calculations and measurements during animations
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **Chat Interface**: Conversational experience for asking physics questions
- **API Key Management**: Secure local storage for AI service credentials

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **AI**: Qwen-3-Coder-480b with Cerebras API for physics analysis and code generation
- **Icons**: Lucide React
- **Validation**: Zod for schema validation

## Getting Started

1. **Clone the repository**

   ```bash
   git clone [https://github.com/buildfastwithai/open-brilliant](https://github.com/buildfastwithai/open-brilliant)
   cd open-brilliant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter a Physics Question**: Ask any physics question in natural language
2. **AI Analysis**: The system analyzes your question and identifies key concepts
3. **Interactive Animation**: View the generated physics simulation with real-time controls
4. **Customize Parameters**: Adjust variables using interactive sliders
5. **View Live Data**: Monitor physics calculations as the animation runs

## Example Questions

- "Show me projectile motion with initial velocity of 20 m/s at 45 degrees"
- "Demonstrate simple harmonic motion of a spring-mass system"
- "Illustrate conservation of momentum in a collision"
- "Visualize electromagnetic induction in a coil"

## API Key Setup

You can set your Cerebras API key in two ways:

**Runtime Configuration**: Enter your API key in the app's settings dialog

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
