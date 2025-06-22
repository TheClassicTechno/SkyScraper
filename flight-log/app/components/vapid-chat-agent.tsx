"use client"

/**
 * VapidAgent component — powered by Vapi for calling/texting
 */

import React, { useState, useRef, useEffect } from "react"
import { Phone, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// Add your Vapi client import here
// import VapiClient from "@/lib/vapi-client"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function VapidAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hi there! I'm VapidAgent, your AI phone assistant. I can help you:

- Place AI-powered calls  
- Send smart texts  
- Summarize phone conversations  
- Schedule follow-ups  

What would you like to do today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
      // Example: integrate with your Vapi API (this is a placeholder)
      // const vapiResponse = await VapiClient.sendMessage(content)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `✅ Vapi simulated response for: "${content}"`,
        // content: vapiResponse.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Vapi error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I couldn't process your request. Please try again.",
          timestamp: new Date(),
        },
      ])
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

  const handleQuickAction = (action: string) => {
    setInput(action)
    setTimeout(() => sendMessage(action), 100)
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-42 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
          size="icon"
        >
          <Phone className="h-6 w-6" />
        </Button>
        <Badge
          variant="default"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
        >
          AI
        </Badge>
      </div>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg h-[700px] flex flex-col p-0" showCloseButton={false}>
          <DialogHeader className="p-4 pb-2 border-b bg-green-50">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <div className="p-2 bg-green-600 rounded-full">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-lg">VapidAgent</div>
                  <div className="text-xs text-gray-600 font-normal">
                    AI-powered calls & texts
                  </div>
                </div>
              </DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full p-4">
              <div className="space-y-4 pb-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-lg text-sm break-words ${
                        msg.role === "user"
                          ? "bg-green-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-900 rounded-bl-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      <div className={`text-xs mt-1 opacity-70 ${msg.role === "user" ? "text-green-100" : "text-gray-500"}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
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
                "Place a call",
                "Send a text",
                "Summarize last call",
                "Schedule follow-up",
              ].map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 hover:bg-green-50"
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
                placeholder="Ask me to call, text, or summarize..."
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
    </>
  )
}
