"use client"

import { useState, useReducer, useEffect } from "react"
import { 
  X, 
  CreditCard, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Star,
  Shield,
  Clock,
  Brain,
  TrendingUp,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { type AlternativeFlight } from "@/lib/flight-risk-assessment"
import { 
  type BookingModalState,
  type BookingAction,
  type BookingProvider,
  type BookingRequest,
  bookingReducer,
  bookingProviders,
  FlightBookingService,
  formatPrice,
  getRiskLevelColor,
  getRiskLevelText
} from "@/lib/flight-booking"
import { 
  type FlightRecommendation,
  aiRecommendationEngine
} from "@/lib/ai-flight-recommendations"
import { FlightRoute } from "@/lib/turbulence-data"

interface FlightBookingModalProps {
  state: BookingModalState;
  dispatch: React.Dispatch<BookingAction>;
}

interface CabinClassOption {
  name: string;
  description: string;
  priceMultiplier: number;
  features: string[];
  icon: string;
  color: string;
}

const cabinClasses: CabinClassOption[] = [
  {
    name: 'Economy',
    description: 'Standard seating with essential amenities',
    priceMultiplier: 1.0,
    features: ['Standard seat', 'Carry-on luggage', 'In-flight entertainment'],
    icon: '💺',
    color: 'bg-gray-100 border-gray-300'
  },
  {
    name: 'Premium Economy',
    description: 'Enhanced comfort with extra legroom',
    priceMultiplier: 1.4,
    features: ['Extra legroom', 'Priority boarding', 'Enhanced meal service'],
    icon: '🪑',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    name: 'Business',
    description: 'Premium experience with lie-flat seats',
    priceMultiplier: 2.5,
    features: ['Lie-flat seats', 'Priority check-in', 'Lounge access', 'Premium dining'],
    icon: '💼',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    name: 'First Class',
    description: 'Ultimate luxury with private suites',
    priceMultiplier: 4.0,
    features: ['Private suite', 'Concierge service', 'Exclusive lounges', 'Gourmet dining'],
    icon: '👑',
    color: 'bg-amber-50 border-amber-200'
  }
];

function CabinClassPricing({ flight }: { flight: AlternativeFlight }) {
  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
      <h5 className="text-sm font-medium text-gray-700 mb-2">Cabin Class Options:</h5>
      <div className="grid grid-cols-2 gap-2">
        {cabinClasses.map((cabinClass) => (
          <div key={cabinClass.name} className={`p-2 rounded border ${cabinClass.color} text-xs opacity-90`}>
            <div className="flex items-center gap-1 mb-1">
              <span>{cabinClass.icon}</span>
              <span className="font-medium">{cabinClass.name}</span>
            </div>
            <div className="text-green-600 font-semibold">
              {formatPrice(flight.price * cabinClass.priceMultiplier)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AIRecommendationCard({ 
  recommendation, 
  onSelect 
}: { 
  recommendation: FlightRecommendation; 
  onSelect: (route: FlightRoute) => void;
}) {
  const { safetyScore, efficiencyScore, comfortScore, explanation, priority } = recommendation;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'safety': return 'text-green-600 bg-green-50';
      case 'efficiency': return 'text-blue-600 bg-blue-50';
      case 'comfort': return 'text-purple-600 bg-purple-50';
      case 'balanced': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'safety': return <Shield className="h-4 w-4" />;
      case 'efficiency': return <TrendingUp className="h-4 w-4" />;
      case 'comfort': return <Clock className="h-4 w-4" />;
      case 'balanced': return <Star className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const overallScore = Math.round((safetyScore + efficiencyScore + comfortScore) / 3);

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-blue-200 bg-blue-50" onClick={() => onSelect(recommendation.route)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold">AI Route Recommendation</h4>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getPriorityColor(priority)}`}>
                  {getPriorityIcon(priority)}
                  <span className="ml-1">{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {overallScore}% Score
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              FL{Math.round((recommendation.route.currentPosition?.altitude || 35000) / 1000)}
            </div>
            <Badge variant={safetyScore >= 80 ? "default" : "secondary"}>
              {safetyScore}% Safety
            </Badge>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            {explanation.safetyImprovement}
          </p>
        </div>

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(recommendation.route);
          }}
        >
          <Brain className="h-4 w-4 mr-2" />
          Use AI Recommended Route
        </Button>
      </CardContent>
    </Card>
  )
}

function AIRecommendationsSection({ 
  originalFlight, 
  alternatives, 
  onSelectFlight 
}: { 
  originalFlight: AlternativeFlight; 
  alternatives: AlternativeFlight[]; 
  onSelectFlight: (flight: AlternativeFlight) => void;
}) {
  const [recommendations, setRecommendations] = useState<FlightRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      try {
        // Create a sample route from the original flight
        const sampleRoute: FlightRoute = {
          origin: { lat: 40.7128, lng: -74.0060, name: 'JFK', icao: 'KJFK' },
          destination: { lat: 34.0522, lng: -118.2437, name: 'LAX', icao: 'KLAX' },
          currentPosition: { lat: 37.0902, lng: -95.7129, altitude: 35000, timestamp: Date.now() },
          waypoints: []
        };

        // Sample turbulence data
        const sampleTurbulenceData = [
          {
            id: 'turb-1',
            latitude: 37.0902,
            longitude: -95.7129,
            altitude: 35000,
            severity: 'moderate' as const,
            edrValue: 0.25,
            source: 'EDR' as const,
            timestamp: new Date().toISOString(),
            etaToSmootherAir: 45,
            description: 'Mountain wave turbulence due to strong crosswinds',
            affectedAltitudeRange: [33000, 37000] as [number, number],
            weather_conditions: 'Clear',
            wind_shear: 15,
            temperature_gradient: 2
          }
        ];

        const results = await aiRecommendationEngine.generateRecommendations(
          sampleRoute,
          sampleTurbulenceData,
          'B737',
          'balanced'
        );
        setRecommendations(results);
      } catch (error) {
        console.error('Failed to load AI recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [originalFlight, alternatives]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading AI recommendations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">AI Route Recommendations</h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <AIRecommendationCard
            key={index}
            recommendation={recommendation}
            onSelect={(route) => {
              // Convert route back to flight format for compatibility
              const recommendedFlight: AlternativeFlight = {
                ...originalFlight,
                id: `AI-${index + 1}`,
                airline: 'AI Optimized',
                riskScore: Math.round(100 - recommendation.safetyScore),
                price: originalFlight.price + (recommendation.timePenalty * 2) // Add time penalty cost
              };
              onSelectFlight(recommendedFlight);
            }}
          />
        ))}
      </div>
    </div>
  )
}

function StreamlinedBookingOptions({ 
  flight, 
  onClose 
}: { 
  flight: AlternativeFlight; 
  onClose: () => void;
}) {
  const handleExternalBooking = (url: string) => {
    window.open(url, '_blank');
  };

  const getBookingUrl = (provider: BookingProvider) => {
    return `${provider.baseUrl}?from=${flight.departure}&to=${flight.arrival}&date=${new Date().toISOString().split('T')[0]}&price=${flight.price}`;
  };

  return (
    <div className="space-y-6">
      {/* Flight Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{flight.airline} {flight.id}</h3>
              <p className="text-sm text-gray-600">
                {flight.departure} → {flight.arrival} • {flight.departureTime} - {flight.arrivalTime}
              </p>
            </div>
            <Badge variant={flight.riskScore <= 30 ? "default" : "secondary"}>
              {flight.riskScore}% Risk
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Clean Cabin Class Display */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Cabin Classes</h3>
        <div className="grid grid-cols-4 gap-2">
          {cabinClasses.map((cabinClass) => (
            <div key={cabinClass.name} className={`p-3 rounded-lg border ${cabinClass.color} text-center`}>
              <div className="text-2xl mb-1">{cabinClass.icon}</div>
              <div className="text-sm font-medium text-gray-800">{cabinClass.name}</div>
              <div className="text-lg font-bold text-green-600">
                {formatPrice(flight.price * cabinClass.priceMultiplier)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Booking Action */}
      <div className="space-y-3">
        <Button
          onClick={() => handleExternalBooking(getBookingUrl(bookingProviders[0]))}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          Book AI Recommended Flight
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Or try other providers:</p>
          <div className="flex gap-2 justify-center">
            {bookingProviders.slice(1, 4).map((provider) => (
              <Button
                key={provider.name}
                variant="outline"
                size="sm"
                onClick={() => handleExternalBooking(getBookingUrl(provider))}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {provider.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FlightBookingModal({ state, dispatch }: FlightBookingModalProps) {
  const [showAIRecommendations, setShowAIRecommendations] = useState(true);

  const handleClose = () => {
    dispatch({ type: 'CLOSE_BOOKING' });
    setShowAIRecommendations(true);
  };

  const handleSelectFlight = (flight: AlternativeFlight) => {
    dispatch({ 
      type: 'OPEN_BOOKING', 
      flight: flight 
    });
    setShowAIRecommendations(false);
  };

  if (!state.isOpen || !state.selectedFlight) return null;

  return (
    <Dialog open={state.isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Book Alternative Flight</span>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {showAIRecommendations && (
            <AIRecommendationsSection
              originalFlight={state.selectedFlight}
              alternatives={[
                {
                  id: 'DL2345',
                  airline: 'Delta Air Lines',
                  departure: state.selectedFlight.departure,
                  arrival: state.selectedFlight.arrival,
                  departureTime: '10:30',
                  arrivalTime: '13:45',
                  price: 450,
                  riskScore: 25,
                  delayRate: 8,
                  safetyLogs: ['Clean safety record for past 6 months', 'No mechanical issues reported'],
                },
                {
                  id: 'AA3456',
                  airline: 'American Airlines',
                  departure: state.selectedFlight.departure,
                  arrival: state.selectedFlight.arrival,
                  departureTime: '12:15',
                  arrivalTime: '15:30',
                  price: 520,
                  riskScore: 30,
                  delayRate: 12,
                  safetyLogs: ['Minor weather delays only', 'Regular maintenance schedule'],
                },
                {
                  id: 'UA4567',
                  airline: 'United Airlines',
                  departure: state.selectedFlight.departure,
                  arrival: state.selectedFlight.arrival,
                  departureTime: '14:00',
                  arrivalTime: '17:15',
                  price: 480,
                  riskScore: 35,
                  delayRate: 10,
                  safetyLogs: ['Good on-time performance', 'Recent safety inspection passed'],
                },
                {
                  id: 'SW5678',
                  airline: 'Southwest Airlines',
                  departure: state.selectedFlight.departure,
                  arrival: state.selectedFlight.arrival,
                  departureTime: '16:30',
                  arrivalTime: '19:45',
                  price: 380,
                  riskScore: 28,
                  delayRate: 15,
                  safetyLogs: ['Consistent safety ratings', 'No recent incidents'],
                },
              ]}
              onSelectFlight={handleSelectFlight}
            />
          )}

          {!showAIRecommendations && (
            <StreamlinedBookingOptions
              flight={state.selectedFlight}
              onClose={handleClose}
            />
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Close
          </Button>
          {showAIRecommendations && (
            <Button 
              variant="outline"
              onClick={() => setShowAIRecommendations(false)}
              className="flex-1"
            >
              Skip AI Recommendations
            </Button>
          )}
          {!showAIRecommendations && (
            <Button 
              variant="outline"
              onClick={() => setShowAIRecommendations(true)}
              className="flex-1"
            >
              Back to AI Recommendations
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 