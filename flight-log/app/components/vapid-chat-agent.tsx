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
import Vapi from '@vapi-ai/web';


export function VapidAgent() {
  


 
  
  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-42 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
          size="icon"
        >
          <Mic className="h-6 w-6" />
        </Button>
      </div>
    </>
  )

}