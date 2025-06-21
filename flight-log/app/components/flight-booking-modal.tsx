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
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

  const handleProviderSelect = (provider: BookingProvider) => {
    dispatch({ type: 'SELECT_PROVIDER', provider });
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_BOOKING' });
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
          {state.bookingStep === 'select-provider' && (
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