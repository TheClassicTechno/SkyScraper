"use client"

/**
 * VapidAgent component — in-app voice chat assistant
 */

import React, { useState, useRef, useEffect } from "react"
import { Mic, MicOff, Send, X, AlertCircle, Shield, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "success" | "error" | "warning" | "info"
}

export function VapidAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hi there! I'm VapidAgent, your AI voice assistant. I can help you with:

- Flight logs
- Guiding you through the dashboard
- Recommending Alternative Flights
- Any other questions!

Just speak or type to start chatting!`,
      timestamp: new Date(),
      type: "info"
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = 'en-US'
        
        recognitionInstance.onstart = () => {
          setIsListening(true)
        }
        
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          sendMessage(transcript)
        }
        
        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          addMessage(`❌ **Speech Recognition Error**

Sorry, I couldn't understand what you said. Please try again or type your message.`, "assistant", "error")
        }
        
        recognitionInstance.onend = () => {
          setIsListening(false)
        }
        
        setRecognition(recognitionInstance)
      }
      
      // Speech Synthesis
      if ('speechSynthesis' in window) {
        setSpeechSynthesis(window.speechSynthesis)
      }
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const addMessage = (content: string, role: "user" | "assistant" = "assistant", type?: "success" | "error" | "warning" | "info") => {
    const message: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      type
    }
    setMessages((prev) => [...prev, message])
    
    // Speak assistant messages if not muted
    if (role === "assistant" && speechSynthesis && !isMuted) {
      speakMessage(content)
    }
  }

  const speakMessage = (text: string) => {
    if (!speechSynthesis || isMuted) return
    
    // Stop any current speech
    speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    speechSynthesis.speak(utterance)
  }

  const startListening = () => {
    if (recognition && !isListening) {
      try {
        recognition.start()
      } catch (error) {
        console.error('Failed to start speech recognition:', error)
        addMessage(`❌ **Microphone Error**

Unable to access your microphone. Please check your browser permissions and try again.`, "assistant", "error")
      }
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop()
    }
  }

  const toggleMute = () => {
    if (speechSynthesis) {
      if (isMuted) {
        setIsMuted(false)
      } else {
        speechSynthesis.cancel()
        setIsMuted(true)
        setIsSpeaking(false)
      }
    }
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response (replace with actual AI service)
      const response = await generateAIResponse(content)
      addMessage(response, "assistant", "info")
    } catch (error) {
      console.error("AI response error:", error)
      addMessage(`❌ **System Error**

Sorry, I encountered an unexpected error. Please try again.

**Error Details:** ${(error as Error).message}`, "assistant", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const lowerMessage = userMessage.toLowerCase()
    
    // Simple response logic (replace with actual AI service)
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! How can I help you today? I'm here to assist with any questions or tasks you might have.`
    } else if (lowerMessage.includes('weather')) {
      return `I'd be happy to help with weather information! However, I don't have access to real-time weather data right now. You might want to check a weather app or website for current conditions.`
    } else if (lowerMessage.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString()}. Is there anything specific you'd like to know about time management or scheduling?`
    } else if (lowerMessage.includes('help')) {
      return `I'm here to help! I can assist with:
      
• General questions and conversation
• Information lookup and explanations
• Task planning and organization
• Creative writing and brainstorming
• Problem-solving and advice

Just ask me anything!`
    } else if (lowerMessage.includes('thank')) {
      return `You're very welcome! I'm glad I could help. Is there anything else you'd like to discuss or get assistance with?`
    } else {
      return `That's an interesting topic! I'm here to help with your questions and provide assistance. Could you tell me more about what you'd like to know or discuss?`
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
    setTimeout(() => sendMessage(action), 100)
  }

  const getMessageStyle = (message: Message) => {
    const baseStyle = "max-w-[85%] p-3 rounded-lg text-sm break-words"
    
    if (message.role === "user") {
      return `${baseStyle} bg-blue-600 text-white rounded-br-sm`
    }
    
    switch (message.type) {
      case "success":
        return `${baseStyle} bg-green-50 text-green-900 border border-green-200 rounded-bl-sm`
      case "error":
        return `${baseStyle} bg-red-50 text-red-900 border border-red-200 rounded-bl-sm`
      case "warning":
        return `${baseStyle} bg-yellow-50 text-yellow-900 border border-yellow-200 rounded-bl-sm`
      default:
        return `${baseStyle} bg-gray-100 text-gray-900 rounded-bl-sm`
    }
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-22 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
          size="icon"
        >
          <Mic className="h-6 w-6" />
        </Button>
        <Badge
          variant="default"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
        >
          AI
        </Badge>
        {isSpeaking && (
          <Badge
            variant="secondary"
            className="absolute -bottom-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-500 text-white animate-pulse"
          >
            🔊
          </Badge>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg h-[700px] flex flex-col p-0" showCloseButton={false}>
          <DialogHeader className="p-4 pb-2 border-b bg-blue-50">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 rounded-full">
                  <Mic className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-lg">VapidAgent</div>
                  <div className="text-xs text-gray-600 font-normal">
                    AI voice assistant
                  </div>
                </div>
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Voice Controls */}
          <div className="px-4 py-2 border-b bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={isListening ? stopListening : startListening}
                variant={isListening ? "destructive" : "default"}
                size="sm"
                className="flex items-center gap-1"
                disabled={!recognition}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {isListening ? "Listening..." : "Voice Input"}
              </Button>
              <Button
                onClick={toggleMute}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                disabled={!speechSynthesis}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {isMuted ? "Unmute" : "Mute"}
              </Button>
            </div>
            {isSpeaking && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Speaking...
              </div>
            )}
          </div>

          <div className="flex-1 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full p-4">
              <div className="space-y-4 pb-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={getMessageStyle(msg)}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      <div className={`text-xs mt-1 opacity-70 ${msg.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="px-4 py-2 border-t bg-gray-50 flex-shrink-0">
            <div className="text-xs text-gray-600 mb-2">Quick actions:</div>
            <div className="flex flex-wrap gap-1">
              {[
                "Hello",
                "What can you help me with?",
                "Tell me a joke",
                "What's the weather like?",
              ].map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 hover:bg-blue-50"
                  onClick={() => handleQuickAction(action)}
                  disabled={isLoading}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or use voice input..."
                disabled={isLoading || isListening}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim() || isListening}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
