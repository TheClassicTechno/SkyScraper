"use client"
import React, { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, X, Languages, Mic, MicOff, Volume2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface TranslationResult {
  id: string
  originalText: string
  translatedText?: string
  sourceLanguage: string
  targetLanguage: string
  confidence: number
  method: string
  timestamp: Date
  type: string
}

interface ConnectionStatus {
  connected: boolean
  speechAvailable: boolean
  aiAvailable: boolean
  systemReady: boolean
}

export function TravelLanguageAssistant({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isListening, setIsListening] = useState(false)
  const [inputText, setInputText] = useState("")
  const [translationResults, setTranslationResults] = useState<TranslationResult[]>([])
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false,
    speechAvailable: false,
    aiAvailable: false,
    systemReady: false
  })
  
  // Settings
  const [targetLanguage, setTargetLanguage] = useState("es")
  const [textTargetLanguage, setTextTargetLanguage] = useState("es")
  const [sourceLanguage, setSourceLanguage] = useState("auto")
  const [context, setContext] = useState("general")
  const [sensitivity, setSensitivity] = useState(0.5)
  
  // Current speech recognition display
  const [currentSpeech, setCurrentSpeech] = useState({
    text: "",
    language: "",
    confidence: 0,
    method: ""
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new results are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [translationResults])

  // Simulate socket connection and functionality
  useEffect(() => {
    if (isOpen) {
      // Simulate connection
      setTimeout(() => {
        setConnectionStatus({
          connected: true,
          speechAvailable: true,
          aiAvailable: true,
          systemReady: true
        })
      }, 1000)
    }
  }, [isOpen])

  const handleStartListening = () => {
    if (!connectionStatus.systemReady) return
    
    setIsListening(true)
    setCurrentSpeech({
      text: "Listening... speak now",
      language: "",
      confidence: 0,
      method: ""
    })
    
    // Simulate speech recognition after 3 seconds
    setTimeout(() => {
      simulateSpeechRecognition()
    }, 3000)
  }

  const handleStopListening = () => {
    setIsListening(false)
    setCurrentSpeech({
      text: "Speech recognition ready - click to start listening",
      language: "",
      confidence: 0,
      method: ""
    })
  }

  const simulateSpeechRecognition = () => {
    const demoSpeech = {
      text: "Excuse me, where is the bathroom?",
      language: "en",
      confidence: 0.92,
      method: "Google Speech Recognition"
    }
    
    setCurrentSpeech(demoSpeech)
    setIsListening(false)
    
    // Add to results
    addTranslationResult({
      originalText: demoSpeech.text,
      translatedText: getTranslation(demoSpeech.text, "en", targetLanguage),
      sourceLanguage: demoSpeech.language,
      targetLanguage: targetLanguage,
      confidence: demoSpeech.confidence,
      method: demoSpeech.method,
      type: "Speech Recognition"
    })
  }

  // const handleTextTranslation = () => {
  //   if (!inputText.trim()) return
    
  //   const translatedText = getTranslation(inputText, sourceLanguage, textTargetLanguage)
    
  //   addTranslationResult({
  //     originalText: inputText,
  //     translatedText: translatedText,
  //     sourceLanguage: sourceLanguage === "auto" ? "en" : sourceLanguage,
  //     targetLanguage: textTargetLanguage,
  //     confidence: 0.95,
  //     method: "Manual Input",
  //     type: "Manual Translation"
  //   })
    
  //   setInputText("")
  // }
  const handleTextTranslation = async () => {
  if (!inputText.trim()) return;

  try {
    const res = await fetch("http://localhost:5000/api/translate_text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: inputText,
        source_language: sourceLanguage,
        target_language: textTargetLanguage,
        context: context
      }),
    });
    const data = await res.json();

    addTranslationResult({
      originalText: inputText,
      translatedText: data.translated_text,
      sourceLanguage: data.source_language,
      targetLanguage: data.target_language,
      confidence: data.confidence || 0.95,
      method: data.method || "Flask API",
      type: "Manual Translation"
    });
    setInputText("");
  } catch (err) {
    // Optionally handle error
    alert("Translation failed. Please try again.");
  }
};

  const handleDemo = () => {
    const demoData = {
      originalText: "Hello, I need help finding my gate",
      translatedText: "Hola, necesito ayuda para encontrar mi puerta de embarque",
      sourceLanguage: "en",
      targetLanguage: "es",
      confidence: 0.94,
      method: "Demo Translation",
      type: "Demo"
    }
    
    setCurrentSpeech({
      text: demoData.originalText,
      language: demoData.sourceLanguage,
      confidence: demoData.confidence,
      method: demoData.method
    })
    
    addTranslationResult(demoData)
  }

  const handleTestSystem = () => {
    const testPhrases = [
      { en: "What time does the flight depart?", es: "¿A qué hora sale el vuelo?" },
      { en: "I need assistance with my luggage", es: "Necesito ayuda con mi equipaje" },
      { en: "Where is the nearest restaurant?", es: "¿Dónde está el restaurante más cercano?" }
    ]
    
    testPhrases.forEach((phrase, index) => {
      setTimeout(() => {
        addTranslationResult({
          originalText: phrase.en,
          translatedText: phrase.es,
          sourceLanguage: "en",
          targetLanguage: textTargetLanguage,
          confidence: 0.88 + Math.random() * 0.1,
          method: "System Test",
          type: "Test Translation"
        })
      }, index * 1000)
    })
  }

  const addTranslationResult = (data: Omit<TranslationResult, 'id' | 'timestamp'>) => {
    const newResult: TranslationResult = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      ...data
    }
    
    setTranslationResults(prev => [newResult, ...prev.slice(0, 14)]) // Keep last 15 results
  }

  // Simple translation simulation
  const getTranslation = (text: string, from: string, to: string): string => {
    const translations: Record<string, Record<string, string>> = {
      "excuse me, where is the bathroom?": {
        es: "Perdón, ¿dónde está el baño?",
        fr: "Excusez-moi, où sont les toilettes?",
        de: "Entschuldigung, wo ist die Toilette?",
        it: "Scusi, dov'è il bagno?"
      },
      "hello, i need help finding my gate": {
        es: "Hola, necesito ayuda para encontrar mi puerta de embarque",
        fr: "Bonjour, j'ai besoin d'aide pour trouver ma porte",
        de: "Hallo, ich brauche Hilfe beim Finden meines Gates"
      },
      "what time does the flight depart?": {
        es: "¿A qué hora sale el vuelo?",
        fr: "À quelle heure le vol décolle-t-il?",
        de: "Wann startet der Flug?"
      }
    }
    
    const lowerText = text.toLowerCase()
    return translations[lowerText]?.[to] || `[${to.toUpperCase()}] ${text}`
  }

  const getStatusColor = (status: boolean) => status ? "bg-green-500" : "bg-red-500"
  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return "text-green-600"
    if (confidence > 0.6) return "text-yellow-600"
    return "text-red-600"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Speech Recognition": return "🎙️"
      case "Manual Translation": return "📝"
      case "Demo": return "🎭"
      case "Test Translation": return "🧪"
      default: return "🔄"
    }
  }

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "th", name: "Thai" },
    { code: "vi", name: "Vietnamese" },
    { code: "nl", name: "Dutch" }
  ]

  const contexts = [
    { value: "general", label: "General Conversation" },
    { value: "travel", label: "Travel & Transportation" },
    { value: "food", label: "Food & Dining" },
    { value: "hotel", label: "Hotel & Accommodation" },
    { value: "shopping", label: "Shopping" },
    { value: "emergency", label: "Emergency Situations" },
    { value: "directions", label: "Directions & Navigation" }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-7xl w-[1400px] h-[740px] flex flex-col p-0 overflow-y-auto text-sm" showCloseButton={false}>
        <DialogHeader className="p-4 pb-2 border-b bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-full">
                <Languages className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Travel Language Assistant
                </div>
                <div className="text-sm text-gray-600 font-normal">
                  Real-time translation for travelers and flight passengers
                </div>
              </div>
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

  <div className="flex-1 min-h-0">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 h-full overflow-y-auto">
            {/* Left Panel - Controls */}
            <div className="space-y-6">
              {/* Connection Status */}
              <div className="bg-card border rounded-lg p-4">
                <div className="text-sm font-medium mb-3">System Status</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(connectionStatus.connected)}`}></div>
                    <span>Connection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(connectionStatus.speechAvailable)}`}></div>
                    <span>Speech</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(connectionStatus.aiAvailable)}`}></div>
                    <span>AI Translation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(connectionStatus.systemReady)}`}></div>
                    <span>System Ready</span>
                  </div>
                </div>
              </div>

              {/* Speech Recognition */}
              <div className="bg-card border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  🎙️ Voice Translation
                </h3>
                
                {/* Speech Display */}
                <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  isListening ? 'bg-green-50 border-green-200 shadow-md' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="text-sm font-medium text-blue-700 mb-1">
                    {currentSpeech.text || "Speech recognition ready - click to start listening"}
                  </div>
                  {currentSpeech.language && (
                    <div className="text-xs text-gray-600">
                      Language: {currentSpeech.language.toUpperCase()} | 
                      Confidence: <span className={getConfidenceColor(currentSpeech.confidence)}>
                        {(currentSpeech.confidence * 100).toFixed(1)}%
                      </span> | 
                      Method: {currentSpeech.method}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Translate to:</label>
                    <select 
                      value={targetLanguage} 
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Context:</label>
                    <select 
                      value={context} 
                      onChange={(e) => setContext(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    >
                      {contexts.map(ctx => (
                        <option key={ctx.value} value={ctx.value}>{ctx.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Sensitivity: {sensitivity}</label>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1" 
                    step="0.1" 
                    value={sensitivity}
                    onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button 
                    onClick={handleStartListening}
                    disabled={!connectionStatus.systemReady || isListening}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Mic className="h-4 w-4 mr-1" />
                    Start Listening
                  </Button>
                  <Button 
                    onClick={handleStopListening}
                    disabled={!isListening}
                    variant="destructive"
                    size="sm"
                  >
                    <MicOff className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                  <Button onClick={handleDemo} variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Demo
                  </Button>
                </div>
              </div>

              {/* Text Translation */}
              <div className="bg-card border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  📝 Text Translation
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">From:</label>
                    <select 
                      value={sourceLanguage} 
                      onChange={(e) => setSourceLanguage(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="auto">Auto-detect</option>
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">To:</label>
                    <select 
                      value={textTargetLanguage} 
                      onChange={(e) => setTextTargetLanguage(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Text to Translate:</label>
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text for translation..."
                    className="w-full p-3 border border-gray-300 rounded-md text-sm resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleTextTranslation}
                    disabled={!inputText.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Translate
                  </Button>
                  <Button onClick={handleTestSystem} variant="outline" size="sm">
                    🧪 Test System
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Panel - Results */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">📊 Translation Results</h3>
              <ScrollArea ref={scrollAreaRef} className="h-[600px] border rounded-lg">
                <div className="p-4 space-y-3">
                  {translationResults.length === 0 ? (
                    <div className="text-center text-gray-500 italic py-8">
                      Translation results will appear here...
                    </div>
                  ) : (
                    translationResults.map((result) => (
                      <div key={result.id} className="bg-card border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                        <div className="font-semibold text-purple-600 flex items-center gap-2">
                          {getTypeIcon(result.type)} {result.type}
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <span className="text-sm font-medium text-gray-600 min-w-[70px]">Original:</span>
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                              {result.originalText}
                            </span>
                          </div>
                          {result.translatedText && (
                            <div className="flex gap-2">
                              <span className="text-sm font-medium text-gray-600 min-w-[70px]">Translated:</span>
                              <span className="font-mono bg-blue-50 px-2 py-1 rounded text-sm flex-1">
                                {result.translatedText}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 grid grid-cols-2 gap-2 pt-2 border-t">
                          <span>
                            <strong>Language:</strong> {result.sourceLanguage.toUpperCase()} → {result.targetLanguage.toUpperCase()}
                          </span>
                          <span>
                            <strong>Confidence:</strong> 
                            <span className={getConfidenceColor(result.confidence)}>
                              {(result.confidence * 100).toFixed(1)}%
                            </span>
                          </span>
                          <span><strong>Method:</strong> {result.method}</span>
                          <span><strong>Time:</strong> {result.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}