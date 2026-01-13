# Jenus Portfolio - AI Voice Interactive Backend Showcase

🚀 **Live Demo**

[jjenus.vercel.app](http://jjenus.vercel.app)

## ✨ Overview

A modern, interactive portfolio website for Alakere Jenus, a Backend Engineer/Architect, featuring a fully functional AI-powered voice assistant. The portfolio showcases backend expertise through an immersive visual experience with real-time voice interaction.

## 🎯 Key Features

### 🤖 AI Voice Assistant
- **Real-time Voice Interaction**: Speak naturally to the AI assistant and receive voice responses
- **Context-Aware Responses**: AI understands your professional background, projects, and skills
- **Speech Recognition**: Built-in browser speech-to-text with fallback handling
- **Conversation Interface**: Clean chat UI with user (white) and AI (cyan) message bubbles

### 🎨 Modern Design
- **Dark Theme**: Professional dark interface with gradient accents
- **Animated Elements**: Framer Motion animations and interactive hover effects
- **Responsive Layout**: Fully responsive across mobile, tablet, and desktop
- **Visual Hierarchy**: Clear sections with smooth scrolling navigation

### 💼 Portfolio Sections
- **About**: Hero section with animated typewriter effect
- **Skills**: Interactive cards for technical capabilities
- **Experience**: Timeline view of professional journey
- **Projects**: Showcase of deployed backend systems
- **Contact**: Multiple contact options with visual elements

## 🛠️ Technology Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS with custom configuration
- Framer Motion for animations
- ShadCN/UI components
- Lucide React icons

### AI Integration
- OpenRouter API: Multi-model AI gateway
- Google Gemini 2.5 Flash: Primary AI model via OpenRouter
- Web Speech API: Browser-native speech recognition and synthesis
- Fetch API: HTTP requests to AI endpoints

### Development
- pnpm: Fast package management
- ESLint: Code linting and quality
- PostCSS: CSS processing
- TypeScript: Type safety and better developer experience

## 🚦 Quick Start

### Prerequisites
- Node.js 20+
- pnpm installed (`npm install -g pnpm`)
- OpenRouter API key (free tier available)

### Installation

```bash
# Clone the repository
git clone [repo]
cd portfolio

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env and add your OpenRouter API key
```

### Environment Variables

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here
VITE_PORTFOLIO_URL=http://localhost:5173
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

## 🧩 Project Structure

```
jenus-portfolio/
├── src/
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   ├── portfolio/        # SkillCard, TerminalCard, etc.
│   │   └── voice/           # VoiceAI component
│   ├── lib/
│   │   ├── aiContext.ts     # AI context and prompt configuration
│   │   ├── constants.ts     # Portfolio data (skills, experience, projects)
│   │   └── utils.ts         # Helper functions
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
└── package.json
```

## 🎤 AI Voice Assistant Implementation

### How It Works
1. **Speech Capture**: Browser's Web Speech API captures user voice input
2. **Text Processing**: Speech converted to text and sent to AI API
3. **Context Injection**: Your professional data injected via system prompts
4. **Response Generation**: AI generates contextual response
5. **Speech Output**: Text converted to speech using browser synthesis

### Context Management
The AI is powered by a structured context system in `src/lib/aiContext.ts`:

```typescript
// All your professional data lives here
export const jenusAIContext = {
  technicalExpertise: { /* languages, frameworks, etc. */ },
  experience: [ /* job history */ ],
  projects: [ /* portfolio projects */ ],
  personal: { /* contact info */ }
};
```

### API Integration

```typescript
// VoiceAI.tsx uses this fetch pattern
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "google/gemini-2.5-flash",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userInput }
    ]
  })
});
```

## 🎨 Customization

### Updating Your Information
1. **Professional Data**: Edit `src/lib/aiContext.ts`
2. **Skills/Experience**: Update `src/lib/constants.ts`
3. **AI Behavior**: Modify system prompt in `aiContext.ts`

### Styling
- **Colors**: Update Tailwind config in `tailwind.config.ts`
- **Themes**: Modify CSS variables in `src/index.css`
- **Components**: Use ShadCN/UI theming system

### Adding New Sections
1. Create component in `src/components/portfolio/`
2. Add to navigation in `src/lib/constants.ts`
3. Import and place in `App.tsx`

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Single column layouts
- **Tablet**: 768px - 1024px - Adaptive grids
- **Desktop**: > 1024px - Full feature layouts

### Mobile Considerations
- Voice AI panel adapts to screen size
- Touch-friendly buttons and interactions
- Optimized performance for mobile devices

## 🔧 Troubleshooting

### Common Issues

**Voice AI not working:**
- Check browser supports Web Speech API (Chrome, Edge recommended)
- Ensure microphone permissions are granted
- Verify OpenRouter API key is valid

**Build errors:**
- Clear pnpm cache: `pnpm store prune`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- Check TypeScript errors: `pnpm type-check`

**AI responses generic:**
- Verify context is properly formatted in `aiContext.ts`
- Check API key has sufficient credits
- Test with different AI models via OpenRouter

### Performance Optimization
- Lazy load non-critical components
- Optimize images with WebP format
- Use React.memo for expensive components
- Implement virtualization for long lists

## 🔒 Security Considerations

### API Key Protection
- Use environment variables in deployment platforms
- Consider implementing a backend proxy for production

### User Privacy
- Voice processing happens client-side
- No voice data stored or sent to external servers (except AI API)
- Clear privacy policy regarding voice interactions

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📈 Future Enhancements

### Planned Features
- Multi-language support for AI assistant
- Custom voice synthesis with ElevenLabs
- Real-time project demos
- Blog integration
- Dark/light theme toggle

### AI Improvements
- Conversation memory across sessions
- File upload for AI to analyze code/projects
- Multiple AI model support toggle
- Offline speech recognition fallback

## 🙏 Acknowledgments
- Icons by Lucide React
- UI Components by ShadCN/UI
- AI Models via OpenRouter
- Animations by Framer Motion

---

**Maintained by Alakere Jenus** • GitHub • LinkedIn • Email

---

## 💡 Quick Reminder Tips
- Test voice features in Chrome/Edge for best compatibility
- Keep AI responses concise for better voice interaction
- Regularly update your `aiContext.ts` as your experience grows
- Monitor OpenRouter usage to stay within free tier limits