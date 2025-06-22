"use client"

import { useState, useReducer, useEffect } from "react"
import { AlertTriangle, Calendar, Clock, MapPin, Plane, Users, Wifi, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { AIChatAgent } from "./ai-chat-agent"
import { bookingReducer } from '@/lib/flight-booking'
import FlightBookingModal from './flight-booking-modal'
import Link from "next/link"
import { FlightRoute } from '@/lib/turbulence-data'

// Mock flight data

type Flight = {
  id: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  aircraft: string;
  passengers: number;
  crew: number;
  riskScore: number;
  weather: string;
  atcLoad: string;
  runway: string;
  gate: string;
};

const initalFlights: Flight[] = [
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

function FlightDetailsDialog({ flight }: { flight: (typeof initalFlights)[0] }) {
  const [bookingState, bookingDispatch] = useReducer(bookingReducer, {
    isOpen: false,
    selectedFlight: null,
    selectedProvider: null,
    bookingStep: 'select-provider',
    bookingData: {},
    bookingResult: null
  })

  // Generate risk analysis explanation
  const getRiskAnalysis = () => {
    const factors = [];
    
    // Weather factors
    if (flight.weather !== 'Clear') {
      factors.push({
        factor: 'Weather Conditions',
        impact: flight.weather === 'Thunderstorms' ? 'High' : 'Moderate',
        description: `${flight.weather} conditions increase turbulence and visibility risks`,
        severity: flight.weather === 'Thunderstorms' ? 'red' : 'yellow'
      });
    }
    
    // ATC Load factors
    if (flight.atcLoad !== 'Light') {
      factors.push({
        factor: 'ATC Load',
        impact: flight.atcLoad === 'Heavy' ? 'High' : 'Moderate',
        description: `${flight.atcLoad} air traffic increases collision risk and delays`,
        severity: flight.atcLoad === 'Heavy' ? 'red' : 'yellow'
      });
    }
    
    // Aircraft factors
    if (flight.aircraft?.includes('737')) {
      factors.push({
        factor: 'Aircraft Model',
        impact: 'Low',
        description: 'Boeing 737 has good safety record and modern systems',
        severity: 'green'
      });
    } else if (flight.aircraft?.includes('320')) {
      factors.push({
        factor: 'Aircraft Model',
        impact: 'Low',
        description: 'Airbus A320 has excellent safety features and reliability',
        severity: 'green'
      });
    }
    
    // Route factors (simulated)
    if (flight.departure === 'JFK' && flight.arrival === 'LAX') {
      factors.push({
        factor: 'Route Complexity',
        impact: 'Moderate',
        description: 'Transcontinental route with multiple weather systems',
        severity: 'yellow'
      });
    }
    
    // Time factors
    const hour = parseInt(flight.departureTime.split(':')[0]);
    if (hour < 6 || hour > 22) {
      factors.push({
        factor: 'Departure Time',
        impact: 'Moderate',
        description: 'Night operations have reduced visibility and crew fatigue risks',
        severity: 'yellow'
      });
    }
    
    return factors;
  };

  const riskFactors = getRiskAnalysis();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <span className="text-blue-600">🔍</span>
            Risk Analysis: {flight.id}
          </DialogTitle>
          <DialogDescription>
            Detailed breakdown of factors contributing to the {flight.riskScore}% risk score
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Risk Factors Breakdown */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-blue-600">⚡</span>
                Contributing Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.length > 0 ? (
                  riskFactors.map((factor, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{factor.factor}</div>
                        <Badge 
                          variant={factor.severity === 'red' ? 'destructive' : 
                                  factor.severity === 'yellow' ? 'secondary' : 'default'}
                        >
                          {factor.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{factor.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <div className="text-2xl mb-2">✅</div>
                    <div className="font-medium">No significant risk factors detected</div>
                    <div className="text-sm">All conditions are within normal operating parameters</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {flight.riskScore > 60 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-amber-600">⚠️</span>
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-800 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">High Risk Flight</span>
                  </div>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Consider alternative departure times to avoid weather</li>
                    <li>• Monitor weather updates closely before departure</li>
                    <li>• Use AI route optimization for safer alternatives</li>
                    <li>• Ensure crew is well-rested for challenging conditions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Booking Modal */}
        <FlightBookingModal state={bookingState} dispatch={bookingDispatch} />
      </DialogContent>
    </Dialog>
  )
}

// AI Flight Recommendations Section Component
function AIFlightRecommendationsSection({ flights }: { flights: Array<{
  id: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  aircraft: string;
  passengers: number;
  crew: number;
  riskScore: number;
  weather: string;
  atcLoad: string;
  runway: string;
  gate: string;
}> }) {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [bookingState, bookingDispatch] = useReducer(bookingReducer, {
    isOpen: false,
    selectedFlight: null,
    selectedProvider: null,
    bookingStep: 'select-provider',
    bookingData: {},
    bookingResult: null
  });

  // Listen for AI recommendation requests
  useEffect(() => {
    const handleGenerateRecommendations = (event: any) => {
      const { flight } = event.detail;
      generateAIRecommendations(flight);
    };

    window.addEventListener('generateAIRecommendations', handleGenerateRecommendations);
    
    return () => {
      window.removeEventListener('generateAIRecommendations', handleGenerateRecommendations);
    };
  }, []);

  const generateAIRecommendations = async (flight?: any) => {
    setAiLoading(true);
    setShowRecommendations(true);
    
    try {
      const targetFlight = flight || flights.find((f: any) => f.riskScore > 60) || flights[0];
      setSelectedFlight(targetFlight);

      // Create route from flight data
      const route: FlightRoute = {
        origin: { lat: 40.7128, lng: -74.0060, name: targetFlight.departure, icao: targetFlight.departure },
        destination: { lat: 34.0522, lng: -118.2437, name: targetFlight.arrival, icao: targetFlight.arrival },
        currentPosition: { lat: 37.0902, lng: -95.7129, altitude: 35000, timestamp: Date.now() },
        waypoints: []
      };

      const response = await fetch('/api/ai-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          route,
          aircraftType: 'B737',
          priority: targetFlight.riskScore > 60 ? 'safety' : 'balanced',
          includeTurbulenceData: true,
          originalFlightNumber: targetFlight.id,
          departure: targetFlight.departure,
          arrival: targetFlight.arrival,
          date: targetFlight.date
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiRecommendations(data.recommendations || []);
      }
    } catch (error) {
      console.error('Failed to generate AI recommendations:', error);
    } finally {
      setAiLoading(false);
    }
  };

  if (!showRecommendations) {
    return (
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-6 transition-all duration-300 ease-in-out">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-blue-600">🤖</span>
            AI Flight Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Get safer flight alternatives</span>
            <div className="flex gap-2">
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                onClick={() => {
                  const highRiskFlight = flights.find((f: any) => f.riskScore > 60);
                  if (highRiskFlight) {
                    generateAIRecommendations(highRiskFlight);
                  }
                }}
              >
                Generate
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="transition-all duration-200"
                onClick={() => {
                  generateAIRecommendations(flights[0]);
                }}
              >
                View All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-6 transition-all duration-500 ease-in-out animate-in slide-in-from-top-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">🎯</span>
            AI Flight Recommendations
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowRecommendations(false)}
            className="transition-all duration-200 hover:bg-gray-50"
          >
            Close
          </Button>
        </CardTitle>
        {selectedFlight && (
          <p className="text-sm text-gray-600">
            Recommendations for {selectedFlight.airline || selectedFlight.id} ({selectedFlight.departure} → {selectedFlight.arrival})
          </p>
        )}
      </CardHeader>
      <CardContent className="p-6">
        {aiLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg font-medium text-gray-700 mb-2">Analyzing Flight Routes</div>
              <div className="text-sm text-gray-500">Our AI is analyzing weather patterns, turbulence data, and aircraft capabilities...</div>
            </div>
          </div>
        ) : aiRecommendations.length > 0 ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Summary Section */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-blue-600">📊</span>
                <span className="font-medium text-blue-800">AI Analysis Summary</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-blue-600">Best Alternative:</span>
                  <div className="font-medium">{aiRecommendations[0].flight.airline} {aiRecommendations[0].flight.id}</div>
                </div>
                <div>
                  <span className="text-blue-600">Risk Reduction:</span>
                  <div className="font-medium text-green-600">-{aiRecommendations[0].riskImprovement}%</div>
                </div>
                <div>
                  <span className="text-blue-600">Price Savings:</span>
                  <div className="font-medium text-green-600">${aiRecommendations.reduce((sum, rec) => sum + rec.priceComparison.savings, 0)}</div>
                </div>
                <div>
                  <span className="text-blue-600">Options Available:</span>
                  <div className="font-medium">{aiRecommendations.length} flights</div>
                </div>
              </div>
            </div>

            {/* Individual Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {aiRecommendations.slice(0, 4).map((rec, index) => (
                <div key={rec.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 animate-in slide-in-from-left-2" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Header with Flight Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{rec.flight.airline} {rec.flight.id}</div>
                        <div className="text-sm text-gray-500">{rec.flight.departure} → {rec.flight.arrival}</div>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {rec.confidence}% confidence
                    </Badge>
                  </div>
                  
                  {/* Flight Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                    <div>
                      <span className="text-gray-500">Departure:</span>
                      <div className="font-medium">{rec.flight.departureTime}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Arrival:</span>
                      <div className="font-medium">{rec.flight.arrivalTime}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <div className="font-medium flex items-center gap-2">
                        ${rec.flight.price}
                        {rec.priceComparison.savings > 0 && (
                          <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
                            Save ${rec.priceComparison.savings}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Risk:</span>
                      <div className="font-medium flex items-center gap-2">
                        {rec.flight.riskScore}%
                        {rec.riskImprovement > 0 && (
                          <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200">
                            -{rec.riskImprovement}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* AI Scores Row */}
                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Safety:</span>
                      <span className="font-semibold text-green-600">{Math.round(rec.safetyScore)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Efficiency:</span>
                      <span className="font-semibold text-blue-600">{Math.round(rec.efficiencyScore)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Comfort:</span>
                      <span className="font-semibold text-purple-600">{Math.round(rec.comfortScore)}</span>
                    </div>
                  </div>

                  {/* AI Explanation */}
                  <p className="text-sm text-gray-600 mb-3">{rec.explanation.safetyImprovement}</p>

                  {/* Booking Options */}
                  {rec.bookingOptions && rec.bookingOptions.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Book:</span>
                      {rec.bookingOptions.map((option: any, optIndex: number) => (
                        <Button
                          key={optIndex}
                          variant="outline"
                          size="sm"
                          className="text-xs transition-all duration-200 hover:bg-blue-50"
                          onClick={() => {
                            bookingDispatch({ 
                              type: 'OPEN_BOOKING', 
                              flight: {
                                id: rec.flight.id,
                                airline: rec.flight.airline,
                                departure: rec.flight.departure,
                                arrival: rec.flight.arrival,
                                departureTime: rec.flight.departureTime,
                                arrivalTime: rec.flight.arrivalTime,
                                price: rec.flight.price,
                                riskScore: rec.flight.riskScore,
                                delayRate: rec.flight.delayRate,
                                safetyLogs: rec.flight.safetyLogs,
                              }
                            });
                          }}
                        >
                          {option.provider.logo} {option.provider.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No AI recommendations available. Try generating recommendations for a different flight.
          </div>
        )}
      </CardContent>
      
      {/* Booking Modal */}
      <FlightBookingModal state={bookingState} dispatch={bookingDispatch} />
    </Card>
  );
}

export default function AviationDashboard() {
  const totalFlights = initalFlights.length
  const highRiskFlights = initalFlights.filter((f) => f.riskScore > 60).length
  const averageRisk = Math.round(initalFlights.reduce((sum, f) => sum + f.riskScore, 0) / initalFlights.length)

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
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">SkyScraper</h1>
                <p className="text-xs text-gray-600">Real-time Flight Tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <nav className="hidden sm:flex items-center gap-4">
                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link href="/flight-score" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Flight Dashboard
                </Link>
              </nav>
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
          <div className="flex items-center justify-center mb-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-100 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
              ATC Risk Management & Flight Operations
            </div>
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
                  <Badge variant="default">{initalFlights.filter((f) => f.riskScore < 40).length} flights</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Medium Risk (40-59%)</span>
                  <Badge variant="secondary">
                    {initalFlights.filter((f) => f.riskScore >= 40 && f.riskScore < 60).length} flights
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">High Risk (60%+)</span>
                  <Badge variant="destructive">{initalFlights.filter((f) => f.riskScore >= 60).length} flights</Badge>
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
              {initalFlights.map((flight) => (
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

        {/* AI Flight Recommendations */}
        <AIFlightRecommendationsSection flights={initalFlights} />

        {/* AI Chat Agent */}
        <AIChatAgent flights={initalFlights} />
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm sm:text-base">&copy; 2024 SkyScraper. Keeping you informed and secure in the skies.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
