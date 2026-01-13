import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { jenusAIContext, formatSystemPrompt } from "@/lib/aiContext";

interface Message {
  id: string;
  text: string;
  speaker: "ai" | "user";
  timestamp: Date;
}

interface VoiceAIProps {
  className?: string;
  aiName?: string;
  primaryColor?: string;
}

const VoiceAI: React.FC<VoiceAIProps> = ({
  className,
  aiName = "JENUS.AI",
  primaryColor = "#06b6d4", // cyan-400
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      speaker: "ai",
      timestamp: new Date(),
    },
  ]);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || 
                               (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          let interim = "";
          let final = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript;
            } else {
              interim += transcript;
            }
          }

          if (interim) {
            setInterimTranscript(interim);
          }

          if (final) {
            addUserMessage(final);
            setInterimTranscript("");
            processAIResponse(final);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
        };

        synthRef.current = window.speechSynthesis;
      } else {
        console.warn("Speech Recognition API not supported in this browser");
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, interimTranscript]);

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      speaker: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addAIMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      speaker: "ai",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    speakText(text);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Process user input and generate AI response
  const processAIResponse = async (userInput: string) => {
    setIsAiResponding(true);
    
    try {
      // Option 1: Use a free local AI service (requires setup)
      // const response = await fetchFreeAIResponse(userInput);
      
      // Option 2: Use a free public API (example with text generation)
      const response = await generateResponse(userInput);
      
      addAIMessage(response);
    } catch (error) {
      console.error("AI Response error:", error);
      // Fallback responses
      const fallbackResponses = [
        "I understand you said: " + userInput + ". As an AI, I'm currently processing your request.",
        "That's interesting! You mentioned: " + userInput + ". Tell me more about that.",
        "I'm analyzing your input about: " + userInput + ". How can I assist you further?",
        "Thanks for sharing! Regarding " + userInput + ", I'd be happy to help with that topic."
      ];
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      addAIMessage(randomResponse);
    } finally {
      setIsAiResponding(false);
    }
  };

  // AI response generation using public APIs
  const generateResponse = async (userInput: string): Promise<string> => {
  try {
    // Generate the dynamic system prompt from your context object
    const systemPrompt = formatSystemPrompt(jenusAIContext);
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://jjenus.is-a.dev",
        "X-Title": "Jenus Portfolio AI",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: systemPrompt, 
          },
          {
            role: "user",
            content: userInput,
          },
        ],
        max_tokens: 250,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenRouter API error:", error);
      throw new Error(error.error?.message || "API request failed");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I apologize, I couldn't generate a response right now.";
    
  } catch (error) {
    console.error("OpenRouter API error:", error);
    return generateSmartResponse(userInput);
  }
};

  // Fallback response generator
  const generateSmartResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi")) {
      return "Hello! I'm JENUS.AI, your backend architecture assistant. What would you like to discuss?";
    }
    
    if (lowercaseInput.includes("backend") || lowercaseInput.includes("server")) {
      return "I specialize in backend systems! I can discuss microservices, databases, APIs, or cloud architecture. What specific backend topic interests you?";
    }
    
    if (lowercaseInput.includes("java") || lowercaseInput.includes("spring")) {
      return "Java and Spring Boot are excellent for building robust enterprise applications. They provide strong type safety and a comprehensive ecosystem for microservices.";
    }
    
    if (lowercaseInput.includes("project") || lowercaseInput.includes("portfolio")) {
      return "Check out my projects section for deployed systems with Spring Boot, Node.js, and scalable architectures.";
    }
    
    if (lowercaseInput.includes("experience") || lowercaseInput.includes("work")) {
      return "I have 4+ years experience building high-availability backend systems. You can see my detailed experience in the timeline section.";
    }
    
    if (lowercaseInput.includes("skill") || lowercaseInput.includes("technology")) {
      return "My technical stack includes Java/Spring Boot, Node.js, PostgreSQL, Redis, Docker, and AWS. Check the skills section for details.";
    }
    
    if (lowercaseInput.includes("contact") || lowercaseInput.includes("email")) {
      return "You can contact me via email at alakerejenus@gmail.com or phone at +234 815 786 8666. I'm open to new opportunities!";
    }
    
    // Generic intelligent response
    return `I understand you're asking about "${input}". As a backend architecture specialist, I can help with system design, technology choices, scalability patterns, or review your specific requirements. Could you elaborate on what you need?`;
  };

  const speakText = (text: string) => {
  if (!synthRef.current) return;

  synthRef.current.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.8;
  utterance.pitch = 0.65; // Lower pitch for a deeper tone
  utterance.volume = 1.0;

  // Find and set a male voice
  const voices = synthRef.current.getVoices();
  // Look for a male voice. Common English male voice names include:
  // 'Google UK English Male', 'Microsoft David - English (United States)', 'Alex'
  const maleVoice = voices.find(voice => 
    voice.name.includes('Male') || 
    voice.name.includes('David') || 
    voice.name.includes('Alex')
  );
  
  if (maleVoice) {
    utterance.voice = maleVoice;
  }

  utterance.onstart = () => setIsSpeaking(true);
  utterance.onend = () => setIsSpeaking(false);
  utterance.onerror = () => setIsSpeaking(false);

  synthRef.current.speak(utterance);
};

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className={cn("border-slate-800 bg-slate-950/80 overflow-hidden", className)}>
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            {isAiResponding && (
              <div className="absolute -top-1 -right-1 w-4 h-4">
                <motion.div
                  className="w-full h-full rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-white">{aiName}</h3>
            <p className="text-xs text-slate-400">Voice Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "border-slate-700 text-xs h-8",
              isSpeaking && "border-cyan-500 bg-cyan-500/10"
            )}
            onClick={stopSpeaking}
            disabled={!isSpeaking}
          >
            {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            <span className="ml-1">{isSpeaking ? "Stop" : "Mute"}</span>
          </Button>
          
          <Button
            size="sm"
            className={cn(
              "text-xs h-8 gap-2",
              isListening 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            )}
            onClick={toggleListening}
          >
            {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
            {isListening ? "Stop" : "Speak"}
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "flex gap-3",
                message.speaker === "ai" ? "flex-row" : "flex-row-reverse"
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.speaker === "ai" 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500" 
                  : "bg-slate-700"
              )}>
                {message.speaker === "ai" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={cn(
                "max-w-[70%] rounded-2xl px-4 py-3",
                message.speaker === "ai"
                  ? "bg-slate-900/50 border border-cyan-500/20"
                  : "bg-slate-800 border border-slate-700"
              )}>
                <div className={cn(
                  "font-medium mb-1 text-sm",
                  message.speaker === "ai" 
                    ? "text-cyan-400" 
                    : "text-white"
                )}>
                  {message.speaker === "ai" ? aiName : "You"}
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {message.text}
                </p>
                <div className="text-xs text-slate-500 mt-2 text-right">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Interim transcript */}
          {interimTranscript && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-slate-800 border border-slate-700">
                <div className="font-medium mb-1 text-sm text-white">You (typing...)</div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  {interimTranscript}
                </p>
              </div>
            </motion.div>
          )}

          {/* AI Responding indicator */}
          {isAiResponding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-slate-900/50 border border-cyan-500/20">
                <div className="font-medium mb-1 text-sm text-cyan-400">{aiName}</div>
                <div className="flex gap-2 items-center">
                  <div className="flex space-x-1">
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                  <span className="text-slate-400 text-sm">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Status Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/50 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isListening ? "bg-green-500 animate-pulse" : "bg-slate-600"
            )} />
            <span>{isListening ? "Listening..." : "Microphone ready"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isSpeaking ? "bg-cyan-500 animate-pulse" : "bg-slate-600"
            )} />
            <span>{isSpeaking ? "Speaking..." : "Voice ready"}</span>
          </div>
        </div>
        <div className="text-slate-500 font-mono">
          {messages.length} messages
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t border-slate-800 grid grid-cols-2 gap-2">
        <Button
          size="sm"
          variant="outline"
          className="text-xs h-8 border-slate-700 hover:bg-slate-800"
          onClick={() => processAIResponse("Tell me about your backend experience")}
        >
          Ask about Experience
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="text-xs h-8 border-slate-700 hover:bg-slate-800"
          onClick={() => processAIResponse("What technologies do you use?")}
        >
          Ask about Tech Stack
        </Button>
      </div>
    </Card>
  );
};

export default VoiceAI;