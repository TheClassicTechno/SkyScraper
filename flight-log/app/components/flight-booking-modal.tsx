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
  TrendingUp
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
  type AIRecommendationContext,
  MockAIRecommendationService
} from "@/lib/ai-flight-recommendations"

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
}

const cabinClasses: CabinClassOption[] = [
  {
    name: 'Economy',
    description: 'Standard seating with essential amenities',
    priceMultiplier: 1.0,
    features: ['Standard seat', 'Carry-on luggage', 'In-flight entertainment'],
    icon: '💺'
  },
  {
    name: 'Premium Economy',
    description: 'Enhanced comfort with extra legroom',
    priceMultiplier: 1.4,
    features: ['Extra legroom', 'Priority boarding', 'Enhanced meal service'],
    icon: '🪑'
  },
  {
    name: 'Business',
    description: 'Premium experience with lie-flat seats',
    priceMultiplier: 2.5,
    features: ['Lie-flat seats', 'Priority check-in', 'Lounge access', 'Premium dining'],
    icon: '💼'
  },
  {
    name: 'First Class',
    description: 'Ultimate luxury with private suites',
    priceMultiplier: 4.0,
    features: ['Private suite', 'Concierge service', 'Exclusive lounges', 'Gourmet dining'],
    icon: '👑'
  }
];

function AIRecommendationCard({ 
  recommendation, 
  onSelect 
}: { 
  recommendation: FlightRecommendation; 
  onSelect: (flight: AlternativeFlight) => void;
}) {
  const { flight, score, reasoning, category, tags } = recommendation;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety': return 'text-green-600 bg-green-50';
      case 'price': return 'text-blue-600 bg-blue-50';
      case 'convenience': return 'text-purple-600 bg-purple-50';
      case 'premium': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safety': return <Shield className="h-4 w-4" />;
      case 'price': return <TrendingUp className="h-4 w-4" />;
      case 'convenience': return <Clock className="h-4 w-4" />;
      case 'premium': return <Star className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 border-blue-200 bg-blue-50" onClick={() => onSelect(flight)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold">{flight.airline} {flight.id}</h4>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getCategoryColor(category)}`}>
                  {getCategoryIcon(category)}
                  <span className="ml-1">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {score}% Score
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">
              {formatPrice(flight.price)}
            </div>
            <Badge variant={flight.riskScore <= 30 ? "default" : "secondary"}>
              {flight.riskScore}% Risk
            </Badge>
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="mb-3">
          <h5 className="text-sm font-medium text-gray-700 mb-2">AI Analysis:</h5>
          <div className="space-y-1">
            {reasoning.slice(0, 3).map((reason, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="h-3 w-3 text-green-500" />
                {reason}
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Flight Details */}
        <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
          <div>
            <span className="text-gray-500">Departure:</span>
            <div className="font-medium">{flight.departureTime}</div>
          </div>
          <div>
            <span className="text-gray-500">Arrival:</span>
            <div className="font-medium">{flight.arrivalTime}</div>
          </div>
        </div>

        <Button 
          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(flight);
          }}
        >
          <Brain className="h-4 w-4 mr-2" />
          Book AI Recommended Flight
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
  const [topRecommendation, setTopRecommendation] = useState<FlightRecommendation | null>(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      const aiService = new MockAIRecommendationService();
      
      const context: AIRecommendationContext = {
        originalFlight: {
          id: originalFlight.id,
          airline: originalFlight.airline,
          departure: originalFlight.departure,
          arrival: originalFlight.arrival,
          riskScore: originalFlight.riskScore,
          price: originalFlight.price,
          departureTime: originalFlight.departureTime,
          userPreferences: {
            priority: 'safety', // Default to safety for high-risk flights
            budget: 'medium'
          }
        }
      };

      try {
        const recs = await aiService.getRecommendations(alternatives, context);
        setRecommendations(recs);
        const topRec = await aiService.getTopRecommendation(alternatives, context);
        setTopRecommendation(topRec);
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
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <h3 className="text-lg font-semibold">AI Analyzing Flight Options...</h3>
        <p className="text-gray-600">Finding the best alternative flights for you</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Recommendation */}
      {topRecommendation && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">AI Top Pick</h3>
            <Badge className="bg-blue-600 text-white">
              {topRecommendation.score}% Match
            </Badge>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            {new MockAIRecommendationService().generateSummary(topRecommendation)}
          </p>
          <Button 
            onClick={() => onSelectFlight(topRecommendation.flight)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Star className="h-4 w-4 mr-2" />
            Book Top Recommendation
          </Button>
        </div>
      )}

      {/* All Recommendations */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI-Powered Recommendations
        </h3>
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <AIRecommendationCard
              key={recommendation.flight.id}
              recommendation={recommendation}
              onSelect={onSelectFlight}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProviderCard({ 
  provider, 
  price, 
  isSelected, 
  isRecommended, 
  onSelect 
}: { 
  provider: BookingProvider; 
  price: number; 
  isSelected: boolean; 
  isRecommended: boolean;
  onSelect: () => void;
}) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{provider.logo}</span>
            <div>
              <h4 className="font-semibold">{provider.name}</h4>
              {isRecommended && (
                <Badge variant="default" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Recommended
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">
              {formatPrice(price)}
            </div>
            {provider.commission > 0 && (
              <div className="text-xs text-gray-500">
                +{provider.commission}% fee
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-1">
          {provider.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle className="h-3 w-3 text-green-500" />
              {feature}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CabinClassSelector({ 
  flight, 
  selectedCabinClass, 
  onSelectCabinClass 
}: { 
  flight: AlternativeFlight; 
  selectedCabinClass: CabinClassOption | null; 
  onSelectCabinClass: (cabinClass: CabinClassOption) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Cabin Class</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cabinClasses.map((cabinClass) => {
            const price = Math.round(flight.price * cabinClass.priceMultiplier);
            const isSelected = selectedCabinClass?.name === cabinClass.name;
            
            return (
              <Card 
                key={cabinClass.name}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => onSelectCabinClass(cabinClass)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cabinClass.icon}</span>
                      <div>
                        <h4 className="font-semibold">{cabinClass.name}</h4>
                        <p className="text-sm text-gray-600">{cabinClass.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {formatPrice(price)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {cabinClass.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  )
}

function ExternalBookingOptions({ 
  flight, 
  provider, 
  cabinClass 
}: { 
  flight: AlternativeFlight; 
  provider: BookingProvider; 
  cabinClass: CabinClassOption;
}) {
  const [bookingService] = useState(() => new FlightBookingService());
  const [bookingUrls, setBookingUrls] = useState<Array<{ provider: BookingProvider; url: string; price: number }>>([]);

  useEffect(() => {
    const urls = bookingService.getBookingUrls(flight);
    setBookingUrls(urls);
  }, [flight, bookingService]);

  const handleExternalBooking = (url: string) => {
    window.open(url, '_blank');
  };

  const selectedProviderUrls = bookingUrls.filter(b => b.provider.name === provider.name);
  const basePrice = flight.price * cabinClass.priceMultiplier;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Book on {provider.name}</h3>
        
        {/* Flight Summary */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{flight.airline} {flight.id}</h4>
                <p className="text-sm text-gray-600">
                  {flight.departure} → {flight.arrival}
                </p>
                <p className="text-xs text-gray-500">
                  {flight.departureTime} - {flight.arrivalTime}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">
                  {formatPrice(basePrice)}
                </div>
                <Badge variant="outline" className="text-xs">
                  {cabinClass.name}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* External Booking Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => handleExternalBooking(selectedProviderUrls[0]?.url || provider.baseUrl)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Book {cabinClass.name} on {provider.name}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Or try other providers:</p>
            <div className="flex gap-2 justify-center">
              {bookingProviders.slice(0, 3).map((altProvider) => {
                if (altProvider.name === provider.name) return null;
                const altUrl = bookingUrls.find(b => b.provider.name === altProvider.name)?.url || altProvider.baseUrl;
                return (
                  <Button
                    key={altProvider.name}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExternalBooking(altUrl)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {altProvider.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FlightBookingModal({ state, dispatch }: FlightBookingModalProps) {
  const [selectedCabinClass, setSelectedCabinClass] = useState<CabinClassOption | null>(null);
  const [showAIRecommendations, setShowAIRecommendations] = useState(true);

  const handleProviderSelect = (provider: BookingProvider) => {
    dispatch({ type: 'SELECT_PROVIDER', provider });
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_BOOKING' });
    setSelectedCabinClass(null);
    setShowAIRecommendations(true);
  };

  const handleSelectFlight = (flight: AlternativeFlight) => {
    dispatch({ 
      type: 'OPEN_BOOKING', 
      flight: flight 
    });
    setShowAIRecommendations(false);
    setSelectedCabinClass(null);
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

          {state.bookingStep === 'select-provider' && !showAIRecommendations && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Booking Provider</h3>
              <div className="space-y-3">
                {bookingProviders.map((provider) => {
                  const isRecommended = provider.name === 'Google Flights';
                  return (
                    <div key={provider.name} className="space-y-2">
                      <ProviderCard
                        provider={provider}
                        price={state.selectedFlight!.price}
                        isSelected={false}
                        isRecommended={isRecommended}
                        onSelect={() => handleProviderSelect(provider)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {state.bookingStep === 'enter-details' && state.selectedProvider && (
            <div>
              {!selectedCabinClass ? (
                <CabinClassSelector
                  flight={state.selectedFlight}
                  selectedCabinClass={selectedCabinClass}
                  onSelectCabinClass={setSelectedCabinClass}
                />
              ) : (
                <ExternalBookingOptions
                  flight={state.selectedFlight}
                  provider={state.selectedProvider}
                  cabinClass={selectedCabinClass}
                />
              )}
            </div>
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
          {state.bookingStep === 'enter-details' && selectedCabinClass && (
            <Button 
              variant="outline"
              onClick={() => setSelectedCabinClass(null)}
              className="flex-1"
            >
              Back to Cabin Selection
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 