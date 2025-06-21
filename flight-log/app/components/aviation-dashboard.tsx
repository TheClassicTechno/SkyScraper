"use client"

import { useState, useReducer } from "react"
import { AlertTriangle, Calendar, Clock, MapPin, Plane, Users, Wifi } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AIChatAgent } from "./ai-chat-agent"
import { bookingReducer } from '@/lib/flight-booking'
import FlightBookingModal from './flight-booking-modal'

// Mock flight data
const flights = [
  {
    id: "AA1234",
    departure: "JFK",
    arrival: "LAX",
    departureTime: "14:30",
    arrivalTime: "17:45",
    date: "2024-01-15",
    aircraft: "Boeing 737-800",
    passengers: 156,
    crew: 6,
    riskScore: 35,
    weather: "Clear",
    atcLoad: "Moderate",
    runway: "24L",
    gate: "A12",
  },
  {
    id: "UA5678",
    departure: "ORD",
    arrival: "DEN",
    departureTime: "09:15",
    arrivalTime: "10:30",
    date: "2024-01-15",
    aircraft: "Airbus A320",
    passengers: 142,
    crew: 5,
    riskScore: 72,
    weather: "Thunderstorms",
    atcLoad: "Heavy",
    runway: "16R",
    gate: "B8",
  },
  {
    id: "DL9012",
    departure: "ATL",
    arrival: "MIA",
    departureTime: "16:20",
    arrivalTime: "18:10",
    date: "2024-01-15",
    aircraft: "Boeing 757-200",
    passengers: 189,
    crew: 7,
    riskScore: 28,
    weather: "Partly Cloudy",
    atcLoad: "Light",
    runway: "08L",
    gate: "C15",
  },
]

function RiskScoreCircle({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getColor = (score: number) => {
    if (score >= 70) return "#ef4444" // red
    if (score >= 60) return "#f59e0b" // amber
    if (score >= 40) return "#eab308" // yellow
    return "#22c55e" // green
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth="8"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold">{score}%</div>
          <div className="text-xs text-muted-foreground">Risk</div>
        </div>
      </div>
    </div>
  )
}

function FlightDetailsDialog({ flight }: { flight: (typeof flights)[0] }) {
  const [bookingState, bookingDispatch] = useReducer(bookingReducer, {
    isOpen: false,
    selectedFlight: null,
    selectedProvider: null,
    bookingStep: 'select-provider',
    bookingData: {},
    bookingResult: null
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Flight {flight.id} - Detailed Information</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Flight Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Route:</span>
                  <span>
                    {flight.departure} → {flight.arrival}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Departure:</span>
                  <span>{flight.departureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Arrival:</span>
                  <span>{flight.arrivalTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aircraft:</span>
                  <span>{flight.aircraft}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gate:</span>
                  <span>{flight.gate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Runway:</span>
                  <span>{flight.runway}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Capacity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Passengers:</span>
                  <span>{flight.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Crew:</span>
                  <span>{flight.crew}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-4">ATC Risk Assessment</h3>
              <RiskScoreCircle score={flight.riskScore} size={140} />

              {flight.riskScore > 60 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-800">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">High Risk Alert</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-1">Consider rescheduling due to elevated risk factors</p>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Risk Factors</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Weather:</span>
                  <Badge variant={flight.weather === "Clear" ? "default" : "destructive"}>{flight.weather}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>ATC Load:</span>
                  <Badge
                    variant={
                      flight.atcLoad === "Light"
                        ? "default"
                        : flight.atcLoad === "Moderate"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {flight.atcLoad}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {flight.riskScore > 60 && (
          <div className="mt-6 pt-4 border-t">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => bookingDispatch({ type: 'OPEN_BOOKING', flight: {
                  id: flight.id,
                  airline: flight.id.split(/\d/)[0] || 'Unknown',
                  departure: flight.departure,
                  arrival: flight.arrival,
                  departureTime: flight.departureTime,
                  arrivalTime: flight.arrivalTime,
                  price: 450, // You may want to use a real price if available
                  riskScore: flight.riskScore,
                  delayRate: 10, // Mock value
                  safetyLogs: ['No recent incidents'], // Mock value
                } })}
                className="flex-1"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Reschedule Flight
              </Button>
              <Button variant="destructive" className="flex-1">
                Cancel Flight
              </Button>
            </div>
          </div>
        )}
        <FlightBookingModal state={bookingState} dispatch={bookingDispatch} />
      </DialogContent>
    </Dialog>
  )
}

export default function AviationDashboard() {
  const totalFlights = flights.length
  const highRiskFlights = flights.filter((f) => f.riskScore > 60).length
  const averageRisk = Math.round(flights.reduce((sum, f) => sum + f.riskScore, 0) / flights.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 relative overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg sm:rounded-xl">
                <Plane className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">FlightSafe</h1>
                <p className="text-xs text-gray-600">Real-time Flight Tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 text-xs sm:text-sm">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></div>
                Live Data
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-100 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
            ATC Risk Management & Flight Operations
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Aviation Safety
            <span className="block text-blue-600">Dashboard</span>
          </h1>
        </div>

        {/* Three Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Section 1: Overview Stats */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Flight Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{totalFlights}</div>
                  <div className="text-sm text-gray-600">Active Flights</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{highRiskFlights}</div>
                  <div className="text-sm text-gray-600">High Risk</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{averageRisk}%</div>
                <div className="text-sm text-gray-600">Average Risk Score</div>
                <Progress value={averageRisk} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Risk Distribution */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Low Risk (0-39%)</span>
                  <Badge variant="default">{flights.filter((f) => f.riskScore < 40).length} flights</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Medium Risk (40-59%)</span>
                  <Badge variant="secondary">
                    {flights.filter((f) => f.riskScore >= 40 && f.riskScore < 60).length} flights
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">High Risk (60%+)</span>
                  <Badge variant="destructive">{flights.filter((f) => f.riskScore >= 60).length} flights</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: System Status */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">ATC Connection</span>
                <Badge variant="default">Online</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Weather Data</span>
                <Badge variant="default">Updated</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Risk Engine</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="text-center pt-2">
                <div className="text-xs text-gray-500">Last Update: 2 min ago</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flight List */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Active Flights</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {flights.map((flight) => (
                <div key={flight.id} className="flex items-center justify-between p-6 border border-gray-100 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-200">
                  <div className="flex items-center gap-6">
                    <RiskScoreCircle score={flight.riskScore} size={100} />

                    <div>
                      <div className="font-semibold text-lg">{flight.id}</div>
                      <div className="text-base text-gray-600">
                        {flight.departure} → {flight.arrival}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-500 mt-2">
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {flight.departureTime}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {flight.passengers} pax
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {flight.riskScore > 60 && (
                      <Badge variant="destructive" className="flex items-center gap-2 text-sm px-3 py-1">
                        <AlertTriangle className="h-4 w-4" />
                        High Risk
                      </Badge>
                    )}
                    <FlightDetailsDialog flight={flight} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Chat Agent */}
        <AIChatAgent flights={flights} />
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm sm:text-base">&copy; 2024 FlightSafe. Keeping you informed and secure in the skies.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
