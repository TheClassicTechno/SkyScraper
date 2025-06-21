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
    <div className="min-h-screen bg-blue-400 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Aviation Safety Dashboard</h1>
            <p className="text-gray-600">ATC Risk Management & Flight Operations</p>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">ATC Connected</span>
          </div>
        </div>

        {/* Three Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section 1: Overview Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Flight Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalFlights}</div>
                  <div className="text-sm text-gray-600">Active Flights</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{highRiskFlights}</div>
                  <div className="text-sm text-gray-600">High Risk</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{averageRisk}%</div>
                <div className="text-sm text-gray-600">Average Risk Score</div>
                <Progress value={averageRisk} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Risk Distribution */}
          <Card>
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
          <Card>
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
        <Card>
          <CardHeader>
            <CardTitle>Active Flights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flights.map((flight) => (
                <div key={flight.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <RiskScoreCircle score={flight.riskScore} size={80} />

                    <div>
                      <div className="font-semibold">{flight.id}</div>
                      <div className="text-sm text-gray-600">
                        {flight.departure} → {flight.arrival}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {flight.departureTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {flight.passengers} pax
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {flight.riskScore > 60 && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
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
      </div>
    </div>
  )
}
