"use client"

import { useState, useReducer, useEffect } from "react"
import { AlertTriangle, Calendar, Clock, MapPin, Plane, Users, Wifi, Home, Search, ExternalLink, User, Settings, Languages } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { AIChatAgent } from "./ai-chat-agent"
import { bookingReducer } from '@/lib/flight-booking'
import FlightBookingModal from './flight-booking-modal'
import Link from "next/link"
import { FlightRoute } from '@/lib/turbulence-data'
import { fetchFlightData } from '@/lib/aviation-apis'
import { Input } from "@/components/ui/input"
import { FlightBookingService, bookingProviders } from '@/lib/flight-booking'
import { VapidAgent } from "./vapid-chat-agent"
import { LettaMemoryDashboard } from "./letta-memory-dashboard"
import { LettaProfileSettings } from "./letta-profile-settings"
import { SpeechTranslator } from "./ai-translate"


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
  flight_status: string;
  countdownMinutes: number;
};

// Fallback mock data for when API is not available
const fallbackFlights: Flight[] = [
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
    flight_status: "In route",
    countdownMinutes: 87
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
    flight_status: "In route",
    countdownMinutes: 0
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
    flight_status: "In route",
    countdownMinutes: 409
  },
]

// Function to convert API data to Flight format with hardcoded stats for three flights
function convertToFlightFormat(apiData: any): Flight[] {
  if (!apiData || !apiData.data || apiData.data.length === 0) return [];

  return apiData.data.map((item: any) => {
    const flightNumber = item.flight?.iata || 'UNKNOWN';

    // Hardcoded stats for the three flights
    const flightStats: Record<string, any> = {
      'DL1102': {
        passengers: 156,
        crew: 6,
        riskScore: 25, // Low risk - domestic flight, good weather
        weather: 'Clear',
        atcLoad: 'Light',
        runway: '24L',
        gate: 'A12',
        flight_status: 'In route',
        countdownMinutes: 87 // 1 hour 27 minutes
      },
      'AA456': {
        passengers: 289,
        crew: 8,
        riskScore: 65, // Medium-high risk - long haul, some delays
        weather: 'Partly Cloudy, Very High Turbulence',
        atcLoad: 'Moderate',
        runway: '16R',
        gate: 'B8',
        flight_status: 'In route',
        countdownMinutes: 0
      },
      'BA001': {
        passengers: 525,
        crew: 12,
        riskScore: 45, // Medium risk - international, good conditions
        weather: 'Clear',
        atcLoad: 'Moderate',
        runway: '08L',
        gate: 'C15',
        flight_status: 'In route',
        countdownMinutes: 409 // 6 hours 49 minutes
      }
    };

    const stats = flightStats[flightNumber] || {
      passengers: 150,
      crew: 6,
      riskScore: 50,
      weather: 'Unknown',
      atcLoad: 'Unknown',
      runway: null,
      gate: null
    };

    return {
      id: flightNumber,
      departure: item.departure?.iata || 'UNKNOWN',
      arrival: item.arrival?.iata || 'UNKNOWN',
      departureTime: item.departure?.scheduled ? new Date(item.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'UNKNOWN',
      arrivalTime: item.arrival?.scheduled ? new Date(item.arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'UNKNOWN',
      date: item.flight_date || 'UNKNOWN',
      aircraft: item.aircraft?.model || 'Unknown Aircraft',
      passengers: stats.passengers,
      crew: stats.crew,
      riskScore: stats.riskScore,
      weather: stats.weather,
      atcLoad: stats.atcLoad,
      runway: stats.runway,
      gate: stats.gate,
      flight_status: stats.flight_status,
      countdownMinutes: stats.countdownMinutes
    };
  });
}

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

function FlightDetailsDialog({ flight }: { flight: (typeof fallbackFlights)[0] }) {
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

function MedicalEmergencyDialog({ flight }: { flight: Flight }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border-green-300 text-green-700 hover:text-green-800">
          Onboard Medical Assistance
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Onboard Medical Assistance: {flight.id}
          </DialogTitle>
          <DialogDescription>
            Registered Medical Professional Information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Medical Professional Card */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">Registered Medical Professional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200">
                <div className="space-y-2">
                  <div className="font-semibold text-lg text-gray-900">Timothy Gao</div>
                  <div className="text-sm text-gray-600">Seat #: 11A</div>
                  <div className="text-sm text-gray-600">Field: Endocrinologist</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Medical ID</div>
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">MD-2024-001</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact Information */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg border border-green-200">
                  <div className="font-semibold text-sm text-gray-900">Ground Medical Support</div>
                  <div className="text-sm text-gray-600">+1 (555) 123-4567</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-green-200">
                  <div className="font-semibold text-sm text-gray-900">Flight Crew</div>
                  <div className="text-sm text-gray-600">Cockpit Emergency Line</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// AI Flight Recommendations Section Component
function AIFlightRecommendationsSection({ flights, userProfile }: {
  flights: Array<{
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
  }>,
  userProfile: any
}) {
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
          date: targetFlight.date,
          userProfile: userProfile
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
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            Alternative Flight Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-center">
            <Button
              size="default"
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
              onClick={() => {
                const riskThreshold = userProfile?.riskTolerance || 60;
                const highRiskFlight = flights.find((f: any) => f.riskScore > riskThreshold);
                if (highRiskFlight) {
                  generateAIRecommendations(highRiskFlight);
                }
              }}
            >
              Generate
            </Button>
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
            Alternative Flight Recommendations
            <span className="text-sm text-red-600 font-normal">(High-Risk Flights Only)</span>
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
                  <div className="font-medium">4 flights</div>
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
                      <div className="text-xs text-gray-400 mt-1 space-y-0.5">
                        <div className="flex justify-between">
                          <span>Economy:</span>
                          <span>${rec.flight.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Premium Economy:</span>
                          <span>${Math.round(rec.flight.price * 1.3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Business:</span>
                          <span>${Math.round(rec.flight.price * 2.5)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>First:</span>
                          <span>${Math.round(rec.flight.price * 4.2)}</span>
                        </div>
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

                  {/* AI Explanation */}
                  <p className="text-sm text-gray-600 mb-3">{rec.explanation.safetyImprovement}</p>

                  {/* Booking Options */}
                  {rec.bookingOptions && rec.bookingOptions.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Book:</span>
                      {rec.bookingOptions.map((option: any, optIndex: number) => {
                        const bookingService = new FlightBookingService();
                        const bookingUrls = bookingService.getBookingUrls(rec.flight);
                        const bookingUrl = bookingUrls.find(url => url.provider.name === option.provider.name)?.url;
                        
                        return (
                          <Button
                            key={optIndex}
                            variant="outline"
                            size="sm"
                            className="text-xs transition-all duration-200 hover:bg-blue-50"
                            onClick={() => {
                              if (bookingUrl) {
                                window.open(bookingUrl, '_blank');
                              }
                            }}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {option.provider.name}
                          </Button>
                        );
                      })}
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

function CountdownTimer({ initialMinutes, flightId, departure, arrival }: { 
  initialMinutes: number; 
  flightId: string; 
  departure: string;
  arrival: string;
}) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds <= 0) return "Arrived";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="space-y-2">
      <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 text-sm px-3 py-1">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        In route • {formatTime(timeLeft)}
      </Badge>
      <FlightProgressGraphic 
        flightId={flightId}
        initialMinutes={initialMinutes}
        currentSeconds={timeLeft}
        departure={departure}
        arrival={arrival}
      />
    </div>
  );
}

function FlightProgressGraphic({ flightId, initialMinutes, currentSeconds, departure, arrival }: { 
  flightId: string; 
  initialMinutes: number; 
  currentSeconds: number; 
  departure: string;
  arrival: string;
}) {
  const totalSeconds = initialMinutes * 60;
  const remainingSeconds = currentSeconds;
  const elapsedSeconds = totalSeconds - remainingSeconds;
  
  // Calculate progress percentage (0 = start, 100 = end)
  const progressPercentage = Math.min((elapsedSeconds / totalSeconds) * 100, 100);
  
  // Different starting positions for each flight
  const getStartingPosition = () => {
    switch (flightId) {
      case 'DL1102':
        return 10; // Start 1/10 of the way
      case 'BA001':
        return 25; // Start 1/4 of the way
      default:
        return 0;
    }
  };
  
  const startingPosition = getStartingPosition();
  const adjustedProgress = startingPosition + (progressPercentage * (100 - startingPosition) / 100);
  
  return (
    <div className="relative w-full h-8 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50"></div>
      
      {/* Point A (Departure) */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <div className="text-xs text-gray-600 font-medium">{departure}</div>
      </div>
      
      {/* Point B (Arrival) */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <div className="text-xs text-gray-600 font-medium">{arrival}</div>
      </div>
      
      {/* Progress line */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-out"
        style={{ 
          left: '2rem', 
          width: `${adjustedProgress}%`,
          maxWidth: 'calc(100% - 4rem)'
        }}
      ></div>
      
      {/* Moving plane */}
      <div 
        className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out"
        style={{ 
          left: `calc(2rem + ${adjustedProgress}% - 1rem)`,
          maxLeft: 'calc(100% - 2rem)'
        } as React.CSSProperties}
      >
        <div className="text-blue-600 text-lg transform rotate-0">
          ✈️
        </div>
      </div>
      
      {/* Flight path dots */}
      <div className="absolute inset-0 flex items-center justify-between px-8">
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
}

function SeatbeltSign({ flightId }: { flightId: string }) {
  // Determine light color based on flight
  const getLightColor = () => {
    switch (flightId) {
      case 'DL1102':
        return 'bg-green-500'; // Green light for DL1102
      case 'BA001':
        return 'bg-red-500'; // Red light for BA001
      default:
        return 'bg-yellow-500'; // Default yellow for other flights
    }
  };

  return (
    <div className="flex items-center gap-1 ml-2">
      <span className="text-sm">💺belt</span>
      <div className={`w-2 h-2 rounded-full ${getLightColor()} animate-pulse`}></div>
    </div>
  );
}

export default function AviationDashboard() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showSpeechTranslator, setShowSpeechTranslator] = useState(false);

  // Function to handle profile updates
  const handleProfileUpdate = (profile: any) => {
    console.log('Profile updated:', profile);
    setProfileUpdated(true);
    setProfileDialogOpen(false); // Close dialog after update
    setUserProfile(profile); // Update local state
    // You can add additional logic here when profile is updated
  };

  // Load user profile on component mount
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await fetch('/api/letta-context?userId=demo-user');
        const data = await response.json();
        if (data.success && data.userProfile) {
          setUserProfile(data.userProfile);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };
    loadUserProfile();
  }, []);

  // Function to fetch flight data - removed default flight numbers
  const fetchFlights = async (flightNumbers: string[]) => {
    if (flightNumbers.length === 0) {
      setFlights([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const flightPromises = flightNumbers.map(async (flightNumber) => {
        try {
          const data = await fetchFlightData(flightNumber);
          return data;
        } catch (err) {
          console.warn(`Failed to fetch data for flight ${flightNumber}:`, err);
          return null;
        }
      });

      const results = await Promise.all(flightPromises);
      const validResults = results.filter(result => result !== null);

      if (validResults.length > 0) {
        const allFlights: Flight[] = [];
        validResults.forEach(result => {
          const convertedFlights = convertToFlightFormat(result);
          allFlights.push(...convertedFlights);
        });

        setFlights(allFlights);
        setLastUpdated(new Date());
      } else {
        // If no API data available, show empty state
        setFlights([]);
        setError('No flight data found for the searched flights');
      }
    } catch (err) {
      console.error('Error fetching flight data:', err);
      setError('Failed to fetch flight data');
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  // Check for stored flight data on component mount, but don't auto-populate
  useEffect(() => {
    // Check if there's stored flight data from the main page search
    const storedFlightData = sessionStorage.getItem('flightData');
    const searchedFlightNumber = sessionStorage.getItem('searchedFlightNumber');

    if (storedFlightData) {
      try {
        const parsedData = JSON.parse(storedFlightData);
        setFlights(parsedData);
        setLastUpdated(new Date());
        console.log('Using stored flight data:', parsedData);

        // Clear the stored data after using it
        sessionStorage.removeItem('flightData');
        sessionStorage.removeItem('searchedFlightNumber');
      } catch (err) {
        console.error('Error parsing stored flight data:', err);
        // Don't auto-populate with fallback data
      }
    }
    // Removed the else clause that was auto-fetching default flights
  }, []);

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
                <p className="text-xs text-gray-600">Fly with confidence.</p>
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
              
              {/* Profile Button */}
              <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-white/80 hover:bg-white border-blue-200 hover:border-blue-300 transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">Customize Profile</span>
                    <Settings className="h-3 w-3 text-gray-500" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Customize Your Profile
                    </DialogTitle>
                    <DialogDescription>
                      Configure your personal preferences and risk tolerance for personalized flight recommendations.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <LettaProfileSettings userId="demo-user" onProfileUpdate={handleProfileUpdate} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Aviation Safety
            <span className="block text-blue-600">Dashboard</span>
          </h1>

          {/* Available Flights Section */}
          {/* <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Available Flights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-md p-3 border border-blue-100">
                  <div className="font-bold text-blue-900">DL1102</div>
                  <div className="text-xs text-blue-600">Delta Airlines</div>
                  <div className="text-xs text-gray-500">ATL → MIA</div>
                </div>
                <div className="bg-white rounded-md p-3 border border-blue-100">
                  <div className="font-bold text-blue-900">AA456</div>
                  <div className="text-xs text-blue-600">American Airlines</div>
                  <div className="text-xs text-gray-500">JFK → LAX</div>
                </div>
                <div className="bg-white rounded-md p-3 border border-blue-100">
                  <div className="font-bold text-blue-900">BA001</div>
                  <div className="text-xs text-blue-600">British Airways</div>
                  <div className="text-xs text-gray-500">LHR → JFK</div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Search and Refresh Section */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <div className="flex gap-2 max-w-md mx-auto sm:mx-0">
              <Input
                placeholder="Enter flight number (DL1102, AA456, BA001)"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement;
                    if (target.value.trim()) {
                      fetchFlights([target.value.trim()]);
                    }
                  }
                }}
              />
              <Button
                onClick={() => {
                  const input = document.querySelector('input[placeholder*="Enter flight"]') as HTMLInputElement;
                  if (input?.value.trim()) {
                    fetchFlights([input.value.trim()]);
                  }
                }}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
            <Button
              onClick={() => {
                setFlights([]);
                setError(null);
              }}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Wifi className="h-4 w-4" />
              Clear Data
            </Button>
          </div>

          {error && (
            <div className="flex justify-center mb-4">
              <Badge variant="destructive" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                {error}
              </Badge>
            </div>
          )}
        </div>

        {/* System Status Panel */}
        <div className="mb-4">
          <div className="bg-gray-50/50 border border-gray-200 rounded-lg p-3 max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>System Status:</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  ATC Online
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Weather Updated
                </span>
                <span className="text-gray-400">
                  {lastUpdated.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Flight List */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl text-center">My Flights</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading flight data...</p>
                </div>
              </div>
            ) : flights.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Flights Found</h3>
                  <p className="text-gray-600 mb-4">Search for a flight number above to see real-time flight data and safety analysis.</p>
                  <div className="text-sm text-gray-500">
                    Use the search box above to find flight information.
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {flights.map((flight) => (
                  <div key={flight.id} className="flex items-center justify-between p-6 border border-gray-100 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-200">
                    <div className="flex items-center gap-6">
                      <RiskScoreCircle score={flight.riskScore} size={100} />

                      <div>
                        <div className="font-semibold text-lg flex items-center">
                          {flight.id}
                        </div>
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
                        {userProfile && userProfile.riskTolerance && flight.riskScore > userProfile.riskTolerance && (
                          <div className="mt-2">
                            <Badge variant="destructive" className="flex items-center gap-2 text-xs px-2 py-1">
                              <AlertTriangle className="h-3 w-3" />
                              High Risk (Your threshold: {userProfile.riskTolerance}%)
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-2">
                        {flight.flight_status === 'In route' && (
                          <MedicalEmergencyDialog flight={flight} />
                        )}
                        <FlightDetailsDialog flight={flight} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Flight Recommendations - Only show for flights above user's risk threshold */}
        {userProfile && userProfile.riskTolerance && flights.some(flight => flight.riskScore > userProfile.riskTolerance) && (
          <AIFlightRecommendationsSection flights={flights} userProfile={userProfile} />
        )}

        {/* AI Chat Agent */}
        <div className="fixed bottom-6 right-6 z-50 flex gap-4">
          <AIChatAgent flights={flights} userProfile={userProfile} />

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm sm:text-base">&copy; 2024 SkyScraper. Keeping you informed and secure in the skies.</p>
          </div>
        </div>
      </footer>

      {/* Speech Translator Modal */}
      <SpeechTranslator
        isOpen={showSpeechTranslator}
        onClose={() => setShowSpeechTranslator(false)}
      />
    </div>
  )
}