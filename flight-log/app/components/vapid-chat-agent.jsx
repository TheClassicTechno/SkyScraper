"use client"

/**
 * VapidAgent component — simple phone number display for voice assistance
 */

import React, { useState } from "react"
import { Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VapidAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "+1 (765) 245-8266";
  const displayNumber = "+1 (765) 245 8266";

  const handleCallClick = () => {
    // Create tel: link to initiate phone call
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <>
      {/* Floating Button */}
      <div className="bottom-6 right-1 flex z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-blue-green transition-all duration-200 hover:scale-105"
          size="icon"
          title="Voice Assistant"
        >
          <Phone className="h-6 w-6" />
        </Button>

        {/* Phone Number Display */}
        {isOpen && (
          <div className="fixed bottom-24 right-6 bg-white border border-gray-200 rounded-xl p-6 w-80 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Voice Assistant</h3>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Call this number to speak with our AI assistant:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <Button
                  onClick={handleCallClick}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg w-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
              
              <p className="text-xs text-gray-500">
                Available 24/7 for voice assistance
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}