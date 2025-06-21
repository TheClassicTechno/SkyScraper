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

function BookingDetailsForm({ 
  flight, 
  provider, 
  bookingData, 
  onUpdateData, 
  onSubmit 
}: { 
  flight: AlternativeFlight; 
  provider: BookingProvider; 
  bookingData: Partial<BookingRequest>; 
  onUpdateData: (data: Partial<BookingRequest>) => void; 
  onSubmit: () => void;
}) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid = !!(
      bookingData.passengers &&
      bookingData.cabinClass &&
      bookingData.contactInfo?.email &&
      bookingData.contactInfo.email.trim() !== ''
    );
    setIsValid(valid);
  }, [bookingData]);

  return (
    <div className="space-y-6">
      {/* Flight Summary */}
      <Card>
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
                {formatPrice(flight.price)}
              </div>
              <Badge 
                variant="outline" 
                className={`text-xs ${getRiskLevelColor(flight.riskScore)}`}
              >
                {getRiskLevelText(flight.riskScore)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provider Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{provider.logo}</span>
            <div>
              <h4 className="font-semibold">Booking through {provider.name}</h4>
              <p className="text-sm text-gray-600">
                {provider.features.join(' • ')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Passengers
          </label>
          <Input
            type="number"
            min="1"
            max="9"
            value={bookingData.passengers || ''}
            onChange={(e) => onUpdateData({ passengers: parseInt(e.target.value) || 1 })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cabin Class
          </label>
          <select
            value={bookingData.cabinClass || 'economy'}
            onChange={(e) => onUpdateData({ cabinClass: e.target.value as any })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <Input
            type="email"
            value={bookingData.contactInfo?.email || ''}
            onChange={(e) => onUpdateData({ 
              contactInfo: { 
                email: e.target.value,
                phone: bookingData.contactInfo?.phone 
              }
            })}
            className="w-full"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number (Optional)
          </label>
          <Input
            type="tel"
            value={bookingData.contactInfo?.phone || ''}
            onChange={(e) => onUpdateData({ 
              contactInfo: { 
                email: bookingData.contactInfo?.email || '',
                phone: e.target.value 
              }
            })}
            className="w-full"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <Button 
        onClick={onSubmit} 
        disabled={!isValid}
        className="w-full"
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Complete Booking
      </Button>
    </div>
  )
}

function BookingConfirmation({ 
  flight, 
  provider, 
  bookingData, 
  bookingResult 
}: { 
  flight: AlternativeFlight; 
  provider: BookingProvider; 
  bookingData: Partial<BookingRequest>; 
  bookingResult: any;
}) {
  if (bookingResult?.success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-green-800">Booking Confirmed!</h3>
          <p className="text-gray-600">Your flight has been successfully booked.</p>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Booking ID:</span>
                <span className="font-mono font-medium">{bookingResult.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span>Confirmation Code:</span>
                <span className="font-mono font-medium">{bookingResult.confirmationCode}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Price:</span>
                <span className="font-medium">{formatPrice(bookingResult.price || 0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-gray-500">
          A confirmation email has been sent to {bookingData.contactInfo?.email}
        </div>
      </div>
    )
  } else {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-red-800">Booking Failed</h3>
          <p className="text-gray-600">{bookingResult?.error || 'Unable to complete booking'}</p>
        </div>

        <div className="text-sm text-gray-500">
          Please try again or contact support for assistance.
        </div>
      </div>
    )
  }
}

export default function FlightBookingModal({ state, dispatch }: FlightBookingModalProps) {
  const [bookingService] = useState(() => new FlightBookingService());
  const [bookingUrls, setBookingUrls] = useState<Array<{ provider: BookingProvider; url: string; price: number }>>([]);

  useEffect(() => {
    if (state.selectedFlight) {
      const urls = bookingService.getBookingUrls(state.selectedFlight);
      setBookingUrls(urls);
    }
  }, [state.selectedFlight, bookingService]);

  const handleProviderSelect = (provider: BookingProvider) => {
    dispatch({ type: 'SELECT_PROVIDER', provider });
  };

  const handleUpdateBookingData = (data: Partial<BookingRequest>) => {
    dispatch({ type: 'UPDATE_BOOKING_DATA', data });
  };

  const handleSubmitBooking = async () => {
    if (!state.selectedFlight || !state.selectedProvider || !state.bookingData) return;

    // Ensure we have required fields
    const email = state.bookingData.contactInfo?.email;
    if (!email) {
      dispatch({ type: 'BOOKING_ERROR', error: 'Email address is required' });
      return;
    }

    dispatch({ type: 'SUBMIT_BOOKING' });

    try {
      const request: BookingRequest = {
        flightId: state.selectedFlight.id,
        airline: state.selectedFlight.airline,
        departure: state.selectedFlight.departure,
        arrival: state.selectedFlight.arrival,
        date: new Date().toISOString().split('T')[0],
        passengers: state.bookingData.passengers || 1,
        cabinClass: state.bookingData.cabinClass || 'economy',
        contactInfo: {
          email: email,
          phone: state.bookingData.contactInfo?.phone || undefined
        }
      };

      const result = await bookingService.bookFlight(request);
      
      if (result.success) {
        dispatch({ type: 'BOOKING_SUCCESS', result });
      } else {
        dispatch({ type: 'BOOKING_ERROR', error: result.error || 'Booking failed' });
      }
    } catch (error) {
      dispatch({ type: 'BOOKING_ERROR', error: 'An unexpected error occurred' });
    }
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE_BOOKING' });
  };

  const handleExternalBooking = (url: string) => {
    window.open(url, '_blank');
  };

  if (!state.isOpen || !state.selectedFlight) return null;

  return (
    <Dialog open={state.isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                {bookingUrls.map(({ provider, url, price }) => {
                  const isRecommended = bookingService.getRecommendedProvider(state.selectedFlight!) === provider;
                  return (
                    <div key={provider.name} className="space-y-2">
                      <ProviderCard
                        provider={provider}
                        price={price}
                        isSelected={false}
                        isRecommended={isRecommended}
                        onSelect={() => handleProviderSelect(provider)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleExternalBooking(url)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Book on {provider.name}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {state.bookingStep === 'enter-details' && state.selectedProvider && (
            <BookingDetailsForm
              flight={state.selectedFlight}
              provider={state.selectedProvider}
              bookingData={state.bookingData}
              onUpdateData={handleUpdateBookingData}
              onSubmit={handleSubmitBooking}
            />
          )}

          {state.bookingStep === 'confirming' && (
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <h3 className="text-lg font-semibold">Processing Your Booking</h3>
              <p className="text-gray-600">Please wait while we confirm your reservation...</p>
            </div>
          )}

          {(state.bookingStep === 'success' || state.bookingStep === 'error') && 
           state.selectedProvider && state.bookingResult && (
            <BookingConfirmation
              flight={state.selectedFlight}
              provider={state.selectedProvider}
              bookingData={state.bookingData}
              bookingResult={state.bookingResult}
            />
          )}
        </div>

        {(state.bookingStep === 'success' || state.bookingStep === 'error') && (
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Close
            </Button>
            {state.bookingStep === 'error' && (
              <Button 
                onClick={() => dispatch({ type: 'RESET_BOOKING' })}
                className="flex-1"
              >
                Try Again
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 