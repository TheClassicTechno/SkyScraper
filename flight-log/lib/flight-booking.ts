import { type AlternativeFlight } from './flight-risk-assessment'

export interface BookingRequest {
  flightId: string;
  airline: string;
  departure: string;
  arrival: string;
  date: string;
  passengers: number;
  cabinClass: 'economy' | 'premium_economy' | 'business' | 'first';
  contactInfo: {
    email: string;
    phone?: string;
  };
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  confirmationCode?: string;
  price?: number;
  error?: string;
  message?: string;
}

export interface BookingProvider {
  name: string;
  logo: string;
  baseUrl: string;
  commission: number; // percentage
  features: string[];
}

// Mock booking providers
export const bookingProviders: BookingProvider[] = [
  {
    name: 'Expedia',
    logo: '✈️',
    baseUrl: 'https://www.expedia.com',
    commission: 8.5,
    features: ['Price Match Guarantee', '24/7 Support', 'Free Cancellation']
  },
  {
    name: 'Kayak',
    logo: '🔍',
    baseUrl: 'https://www.kayak.com',
    commission: 7.2,
    features: ['Price Alerts', 'Multi-city Search', 'Flexible Dates']
  },
  {
    name: 'Google Flights',
    logo: '🔎',
    baseUrl: 'https://flights.google.com',
    commission: 0,
    features: ['No Booking Fees', 'Price Tracking', 'Direct Airline Booking']
  },
  {
    name: 'Skyscanner',
    logo: '📊',
    baseUrl: 'https://www.skyscanner.com',
    commission: 6.8,
    features: ['Everywhere Search', 'Price Comparison', 'Mobile App']
  }
]

// Flight booking service
export class FlightBookingService {
  private providers: BookingProvider[];

  constructor(providers: BookingProvider[] = bookingProviders) {
    this.providers = providers;
  }

  // Get booking URLs for a specific flight
  public getBookingUrls(flight: AlternativeFlight): Array<{ provider: BookingProvider; url: string; price: number }> {
    return this.providers.map(provider => {
      const commission = (flight.price * provider.commission) / 100;
      const finalPrice = flight.price + commission;
      
      const url = this.buildBookingUrl(provider, flight, finalPrice);
      
      return {
        provider,
        url,
        price: finalPrice
      };
    });
  }

  // Build booking URL for a specific provider
  private buildBookingUrl(provider: BookingProvider, flight: AlternativeFlight, price: number): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const departureDate = tomorrow.toISOString().split('T')[0];
    
    switch (provider.name) {
      case 'Google Flights':
        return `https://www.google.com/travel/flights?hl=en&tfs=${flight.departure}&tft=${flight.arrival}&d1=${departureDate}`;
      
      case 'Skyscanner':
        return `https://www.skyscanner.com/transport/flights/${flight.departure}/${flight.arrival}/${departureDate}/`;
      
      case 'Kayak':
        return `https://www.kayak.com/flights/${flight.departure}-${flight.arrival}/${departureDate}`;
      
      case 'Expedia':
        return `https://www.expedia.com/Flights-Search?leg1=from:${flight.departure},to:${flight.arrival},departure:${departureDate}TANYT`;
      
      default:
        // Fallback to generic search
        const params = new URLSearchParams({
          from: flight.departure,
          to: flight.arrival,
          date: departureDate
        });
        return `${provider.baseUrl}/flights?${params.toString()}`;
    }
  }

  // Simulate booking process
  public async bookFlight(request: BookingRequest): Promise<BookingResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random success/failure
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      const bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const confirmationCode = Math.random().toString(36).substr(2, 8).toUpperCase();
      
      return {
        success: true,
        bookingId,
        confirmationCode,
        price: request.passengers * 450, // Mock price calculation
        message: 'Booking confirmed successfully!'
      };
    } else {
      return {
        success: false,
        error: 'Booking failed. Please try again or contact support.',
        message: 'Unable to complete booking at this time.'
      };
    }
  }

  // Get recommended booking provider based on flight characteristics
  public getRecommendedProvider(flight: AlternativeFlight): BookingProvider {
    // Prioritize Google Flights and Skyscanner as they have more reliable search URLs
    if (flight.riskScore <= 30) {
      return this.providers.find(p => p.name === 'Google Flights') || this.providers[0];
    } else if (flight.price <= 400) {
      return this.providers.find(p => p.name === 'Skyscanner') || this.providers[0];
    } else {
      return this.providers.find(p => p.name === 'Google Flights') || this.providers[0];
    }
  }

  // Check if booking is available
  public async checkAvailability(flight: AlternativeFlight): Promise<boolean> {
    // Simulate availability check
    await new Promise(resolve => setTimeout(resolve, 500));
    return Math.random() > 0.2; // 80% availability
  }
}

// Booking modal state management
export interface BookingModalState {
  isOpen: boolean;
  selectedFlight: AlternativeFlight | null;
  selectedProvider: BookingProvider | null;
  bookingStep: 'select-provider' | 'enter-details' | 'confirming' | 'success' | 'error';
  bookingData: Partial<BookingRequest>;
  bookingResult: BookingResponse | null;
}

// Booking actions
export type BookingAction = 
  | { type: 'OPEN_BOOKING'; flight: AlternativeFlight }
  | { type: 'CLOSE_BOOKING' }
  | { type: 'SELECT_PROVIDER'; provider: BookingProvider }
  | { type: 'UPDATE_BOOKING_DATA'; data: Partial<BookingRequest> }
  | { type: 'SUBMIT_BOOKING' }
  | { type: 'BOOKING_SUCCESS'; result: BookingResponse }
  | { type: 'BOOKING_ERROR'; error: string }
  | { type: 'RESET_BOOKING' };

// Booking reducer for state management
export function bookingReducer(state: BookingModalState, action: BookingAction): BookingModalState {
  switch (action.type) {
    case 'OPEN_BOOKING':
      return {
        ...state,
        isOpen: true,
        selectedFlight: action.flight,
        selectedProvider: null,
        bookingStep: 'select-provider',
        bookingData: {},
        bookingResult: null
      };

    case 'CLOSE_BOOKING':
      return {
        ...state,
        isOpen: false,
        selectedFlight: null,
        selectedProvider: null,
        bookingStep: 'select-provider',
        bookingData: {},
        bookingResult: null
      };

    case 'SELECT_PROVIDER':
      return {
        ...state,
        selectedProvider: action.provider,
        bookingStep: 'enter-details'
      };

    case 'UPDATE_BOOKING_DATA':
      return {
        ...state,
        bookingData: { ...state.bookingData, ...action.data }
      };

    case 'SUBMIT_BOOKING':
      return {
        ...state,
        bookingStep: 'confirming'
      };

    case 'BOOKING_SUCCESS':
      return {
        ...state,
        bookingStep: 'success',
        bookingResult: action.result
      };

    case 'BOOKING_ERROR':
      return {
        ...state,
        bookingStep: 'error',
        bookingResult: { success: false, error: action.error }
      };

    case 'RESET_BOOKING':
      return {
        ...state,
        bookingStep: 'select-provider',
        bookingData: {},
        bookingResult: null
      };

    default:
      return state;
  }
}

// Utility functions
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

export function getRiskLevelColor(riskScore: number): string {
  if (riskScore <= 25) return 'text-green-600';
  if (riskScore <= 45) return 'text-yellow-600';
  if (riskScore <= 70) return 'text-orange-600';
  return 'text-red-600';
}

export function getRiskLevelText(riskScore: number): string {
  if (riskScore <= 25) return 'Safe';
  if (riskScore <= 45) return 'Caution';
  if (riskScore <= 70) return 'High Risk';
  return 'No-Go';
} 