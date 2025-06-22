"use client"

/**
 * code for the AI chat agent, should be able to call, text
 */
import React, { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { VapidAgent } from "./vapid-chat-agent"
import { TravelLanguageAssistant } from "./ai-translate";

interface Flight {
  id: string
  departure: string
  arrival: string
  departureTime: string
  arrivalTime: string
  date: string
  aircraft: string
  passengers: number
  crew: number
  riskScore: number
  weather: string
  atcLoad: string
  runway: string
  gate: string
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIChatAgentProps {
  flights: Flight[]
  userProfile?: any
}

export function AIChatAgent({ flights, userProfile }: AIChatAgentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showTranslator, setShowTranslator] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm skAI. I have access to current flight data and can help you with:

- Flight risk analysis and safety assessments
- Weather impact evaluations  
- ATC coordination and traffic management
- Rescheduling recommendations
- Safety protocol guidance
- Regulatory compliance questions

How can I assist you today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent.trim(),
      timestamp: new Date(),
    }

    setMessages((prev: Message[]) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/aviation-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          flightData: flights,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "I apologize, but I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev: Message[]) => [...prev, assistantMessage])

      // Check for high-risk flights and show alert if needed
      const riskThreshold = userProfile?.riskTolerance || 60; // Default to 60 if no profile
      const highRiskFlights = flights.filter(f => f.riskScore > riskThreshold)
      if (highRiskFlights.length > 0 && messageContent.toLowerCase().includes('risk')) {
        setTimeout(() => {
          const alertMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content: `⚠️ **PERSONALIZED SAFETY ALERT**: ${highRiskFlights.length} flights exceed your risk tolerance (${riskThreshold}%). Consider action for flights: ${highRiskFlights.map(f => `${f.id} (${f.departure}→${f.arrival}) - Risk: ${f.riskScore}%`).join(', ')}`,
            timestamp: new Date(),
          }
          setMessages((prev: Message[]) => [...prev, alertMessage])
        }, 1000)
      }

    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error while processing your request. Please check your connection and try again.",
        timestamp: new Date(),
      }
      setMessages((prev: Message[]) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
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

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => sendMessage(question), 100)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Chat Buttons Side by Side */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>

        {/* <Button
          onClick={() => window.open(' http://127.0.0.1:5000/', '_blank')}
          className="h-14 w-14 rounded-full shadow-lg bg-red-600 hover:bg-red-700 transition-all duration-200 hover:scale-105"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button> */}
        <Button
        onClick={() => setShowTranslator(true)}
        className="h-14 w-14 rounded-full shadow-lg bg-red-600 hover:bg-red-700 transition-all duration-200 hover:scale-105"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

        <VapidAgent />
      </div>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg h-[700px] flex flex-col p-0" showCloseButton={false}>
          <DialogHeader className="p-4 pb-2 border-b bg-blue-50">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <div className="p-2 bg-blue-600 rounded-full">
                  <Plane className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-lg">skAI</div>
                  <div className="text-xs text-gray-600 font-normal">
                    Real-time flight safety analysis • {flights.length} flights monitored
                  </div>
                </div>
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={closeDialog}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Messages - Improved scrollable area */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full p-4">
              <div className="space-y-4 pb-4">
                {messages.map((message: Message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-lg text-sm break-words ${message.role === "user"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-900 rounded-bl-sm"
                        }`}
                    >
                      <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                      <div className={`text-xs mt-1 opacity-70 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t bg-gray-50 flex-shrink-0">
            <div className="text-xs text-gray-600 mb-2">Quick questions:</div>
            <div className="flex flex-wrap gap-1">
              {[
                "Analyze high-risk flights",
                "Weather impact today",
                "Reschedule recommendations",
                "ATC status update",
              ].map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 hover:bg-blue-50"
                  onClick={() => handleQuickQuestion(question)}
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask about flight risks, safety, or operations..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <TravelLanguageAssistant isOpen={showTranslator} onClose={() => setShowTranslator(false)} />
    </>
  )
}