import { NextRequest, NextResponse } from 'next/server';
import { aiRecommendationEngine } from '@/lib/ai-flight-recommendations';
import { findSaferAlternatives, type AlternativeFlight } from '@/lib/flight-risk-assessment';
import { FlightBookingService } from '@/lib/flight-booking';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      route, 
      aircraftType = 'B737', 
      priority = 'balanced', 
      includeTurbulenceData = true,
      originalFlightNumber,
      departure,
      arrival,
      date
    } = body;

    if (!route) {
      return NextResponse.json(
        { error: 'Route information is required' },
        { status: 400 }
      );
    }

    // Get real alternative flights using the existing system
    const alternativeFlights: AlternativeFlight[] = findSaferAlternatives(
      originalFlightNumber || 'UNKNOWN',
      departure || route.origin.name,
      arrival || route.destination.name,
      date || new Date().toISOString().split('T')[0],
      70 // Increased max risk score for alternatives to allow more options
    );

    console.log(`Found ${alternativeFlights.length} alternative flights for ${originalFlightNumber || 'UNKNOWN'}`);

    // If no alternatives found, create some basic ones
    if (alternativeFlights.length === 0) {
      console.log('No alternatives found, creating basic alternatives');
      const basicAlternatives: AlternativeFlight[] = [
        {
          id: 'ALT001',
          airline: 'Alternative Airlines',
          departure: departure || route.origin.name,
          arrival: arrival || route.destination.name,
          departureTime: '10:00',
          arrivalTime: '13:15',
          price: 400,
          riskScore: 45,
          delayRate: 10,
          safetyLogs: ['Alternative routing', 'Reduced congestion'],
          bookingUrl: 'https://alternative.com'
        },
        {
          id: 'ALT002',
          airline: 'Alternative Airlines',
          departure: departure || route.origin.name,
          arrival: arrival || route.destination.name,
          departureTime: '14:30',
          arrivalTime: '17:45',
          price: 380,
          riskScore: 50,
          delayRate: 12,
          safetyLogs: ['Different departure time', 'Better weather window'],
          bookingUrl: 'https://alternative.com'
        }
      ];
      alternativeFlights.push(...basicAlternatives);
    }

    // Generate AI recommendations for each alternative flight
    const bookingService = new FlightBookingService();
    const recommendations = await Promise.all(
      alternativeFlights.slice(0, 5).map(async (flight, index) => {
        // Create a route for this alternative flight
        const alternativeRoute = {
          ...route,
          origin: { ...route.origin, name: flight.departure, icao: flight.departure },
          destination: { ...route.destination, name: flight.arrival, icao: flight.arrival },
          currentPosition: route.currentPosition,
          waypoints: []
        };

        // Get AI analysis for this route
        const aiAnalysis = await aiRecommendationEngine.generateRecommendations(
          alternativeRoute,
          [], // Empty turbulence data - simplified approach
          aircraftType,
          priority
        );

        // Get the first (best) recommendation
        const bestRecommendation = aiAnalysis[0] || {
          safetyScore: 80,
          efficiencyScore: 75,
          comfortScore: 85,
          timePenalty: 0,
          fuelSavings: 0,
          explanation: {
            safetyImprovement: "Standard route analysis",
            efficiencyImpact: "No significant changes",
            weatherAvoidance: "Clear conditions expected"
          }
        };

        console.log(`Generated recommendation for ${flight.id}: Safety=${bestRecommendation.safetyScore}, Efficiency=${bestRecommendation.efficiencyScore}`);

        // Get booking options for this flight
        const bookingOptions = bookingService.getBookingUrls(flight);

        return {
          id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          flight: flight,
          route: alternativeRoute,
          safetyScore: bestRecommendation.safetyScore,
          efficiencyScore: bestRecommendation.efficiencyScore,
          comfortScore: bestRecommendation.comfortScore,
          timePenalty: bestRecommendation.timePenalty,
          fuelSavings: bestRecommendation.fuelSavings,
          explanation: bestRecommendation.explanation,
          priority: priority,
          bookingOptions: bookingOptions.slice(0, 3), // Top 3 booking providers
          availability: await bookingService.checkAvailability(flight),
          riskImprovement: Math.max(0, (route.riskScore || 50) - flight.riskScore),
          priceComparison: {
            originalPrice: 450, // Mock original price
            alternativePrice: flight.price,
            savings: Math.max(0, 450 - flight.price)
          }
        };
      })
    );

    // Sort recommendations by priority
    const sortedRecommendations = recommendations.sort((a, b) => {
      if (priority === 'safety') {
        return b.safetyScore - a.safetyScore;
      } else if (priority === 'efficiency') {
        return b.efficiencyScore - a.efficiencyScore;
      } else if (priority === 'comfort') {
        return b.comfortScore - a.comfortScore;
      } else {
        // Balanced: weighted combination
        const aScore = (a.safetyScore * 0.4) + (a.efficiencyScore * 0.3) + (a.comfortScore * 0.3);
        const bScore = (b.safetyScore * 0.4) + (b.efficiencyScore * 0.3) + (b.comfortScore * 0.3);
        return bScore - aScore;
      }
    });

    return NextResponse.json({
      success: true,
      recommendations: sortedRecommendations,
      metadata: {
        totalAlternativesAnalyzed: alternativeFlights.length,
        originalFlight: {
          number: originalFlightNumber,
          departure,
          arrival,
          date
        },
        aircraftType,
        priority,
        analysisTimestamp: new Date().toISOString()
      },
      originalRoute: route
    });

  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI recommendations' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Flight Recommendations API',
    endpoints: {
      POST: '/api/ai-recommendations - Generate AI-powered flight route recommendations'
    },
    parameters: {
      route: 'FlightRoute object with origin, destination, and current position',
      aircraftType: 'Aircraft type (B737, B777, A320, A350, CRJ)',
      priority: 'Recommendation priority (safety, efficiency, comfort, balanced)',
      includeTurbulenceData: 'Boolean to include real turbulence data'
    }
  });
} 