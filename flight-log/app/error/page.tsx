"use client"
import { Search, Plane, AlertCircle, ArrowLeft, HelpCircle, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FlightSafe</h1>
                <p className="text-xs text-gray-600">Real-time Flight Tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Live Data
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Error Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          {/* Error Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
            <AlertCircle className="h-10 w-10 text-orange-600" />
            
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">Flight Not Found</h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            We couldn't find your flight in our database. This could be due to several reasons.
          </p>
        </div>

        {/* Error Details Card */}
        <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Possible Reasons</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Flight number may be incorrect</h3>
                    <p className="text-sm text-gray-600">
                      Double-check the flight number on your ticket or booking confirmation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Flight may not be scheduled today</h3>
                    <p className="text-sm text-gray-600">Some flights operate on specific days of the week</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Flight may have been cancelled</h3>
                    <p className="text-sm text-gray-600">Check with your airline for the latest updates</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Airline code might be different</h3>
                    <p className="text-sm text-gray-600">
                      Some flights are operated by partner airlines with different codes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Tips Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Helpful Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-0 bg-white/60 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Search className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Check Your Booking</h4>
                  <p className="text-sm text-gray-600">
                    Look at your booking confirmation email or ticket for the exact flight number and airline code.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 bg-white/60 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Plane className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Try Different Formats</h4>
                  <p className="text-sm text-gray-600">
                    Some airlines use different codes for the same flight. Try searching with partner airline codes.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 FlightSafe. Keeping you informed and secure in the skies.</p>
          </div>
        </div>
      </footer>
    </div>
    );
  }
  