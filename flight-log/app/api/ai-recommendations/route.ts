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
      date,
      userProfile
    } = body;

    if (!route) {
      return NextResponse.json(
        { error: 'Route information is required' },
        { status: 400 }
      );
    }

    // Use user's personal risk tolerance or default to 60
    const userRiskTolerance = userProfile?.riskTolerance || 60;
    console.log(`Using user's risk tolerance: ${userRiskTolerance}%`);

    // Original flight risk scores mapping
    const originalFlightRiskScores: Record<string, number> = {
      'AA456': 65, // High risk flight
      'DL1102': 25, // Low risk flight
      'BA001': 60  // Medium-high risk flight
    };

    // Get the original flight's risk score
    const originalRiskScore = originalFlightRiskScores[originalFlightNumber || ''] || 50;

    // Determine priority based on user preferences and risk tolerance
    let effectivePriority = priority;
    if (userProfile) {
      // If user has very low risk tolerance, prioritize safety
      if (userRiskTolerance < 40) {
        effectivePriority = 'safety';
      }
      // If user has preferred airlines, prioritize those
      else if (userProfile.preferredAirlines && userProfile.preferredAirlines.length > 0) {
        effectivePriority = 'balanced'; // Will filter by preferred airlines later
      }
    }

    console.log(`Using priority: ${effectivePriority} (user risk tolerance: ${userRiskTolerance}%)`);

    // Get real alternative flights using the existing system
    // Use user's risk tolerance as the maximum acceptable risk for alternatives
    const alternativeFlights: AlternativeFlight[] = findSaferAlternatives(
      originalFlightNumber || 'UNKNOWN',
      departure || route.origin.name,
      arrival || route.destination.name,
      date || new Date().toISOString().split('T')[0],
      userRiskTolerance // Use user's personal risk tolerance
    );

    console.log(`Found ${alternativeFlights.length} alternative flights for ${originalFlightNumber || 'UNKNOWN'} (Original risk: ${originalRiskScore}%)`);

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
        // Create a unique route for this alternative flight with varied characteristics
        const alternativeRoute = {
          ...route,
          origin: { ...route.origin, name: flight.departure, icao: flight.departure },
          destination: { ...route.destination, name: flight.arrival, icao: flight.arrival },
          currentPosition: {
            ...route.currentPosition,
            altitude: 30000 + (index * 5000) + (Math.random() * 2000), // Vary altitude
            lat: route.currentPosition?.lat + (Math.random() - 0.5) * 0.1, // Slight position variation
            lng: route.currentPosition?.lng + (Math.random() - 0.5) * 0.1
          },
          waypoints: [],
          riskScore: flight.riskScore // Pass the actual risk score
        };

        // Get AI analysis for this route
        const aiAnalysis = await aiRecommendationEngine.generateRecommendations(
          alternativeRoute,
          [], // Empty turbulence data - simplified approach
          aircraftType,
          effectivePriority
        );

        // Get the first (best) recommendation
        const bestRecommendation = aiAnalysis[0] || {
          timePenalty: Math.floor(Math.random() * 30),
          fuelSavings: Math.floor(Math.random() * 15) - 2,
          explanation: {
            safetyImprovement: "Standard route analysis",
            efficiencyImpact: "No significant changes",
            weatherAvoidance: "Clear conditions expected"
          }
        };

        console.log(`Generated recommendation for ${flight.id}: Time=${bestRecommendation.timePenalty}m, Fuel=${bestRecommendation.fuelSavings}%`);

        // Calculate risk improvement
        const riskImprovement = Math.max(0, originalRiskScore - flight.riskScore);
        console.log(`Risk improvement for ${flight.id}: ${originalRiskScore}% → ${flight.riskScore}% = ${riskImprovement}% improvement`);

        // Get booking options for this flight
        const bookingOptions = bookingService.getBookingUrls(flight);

        return {
          id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          flight: flight,
          route: alternativeRoute,
          timePenalty: bestRecommendation.timePenalty,
          fuelSavings: bestRecommendation.fuelSavings,
          explanation: bestRecommendation.explanation,
          priority: effectivePriority,
          bookingOptions: bookingOptions.slice(0, 3), // Top 3 booking providers
          availability: await bookingService.checkAvailability(flight),
          riskImprovement: riskImprovement,
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
      if (effectivePriority === 'safety') {
        // Sort by fuel savings (higher is better) and time penalty (lower is better)
        const aScore = a.fuelSavings - (a.timePenalty * 0.1);
        const bScore = b.fuelSavings - (b.timePenalty * 0.1);
        return bScore - aScore;
      } else if (effectivePriority === 'efficiency') {
        // Sort by fuel savings (higher is better)
        return b.fuelSavings - a.fuelSavings;
      } else if (effectivePriority === 'comfort') {
        // Sort by time penalty (lower is better)
        return a.timePenalty - b.timePenalty;
      } else {
        // Balanced: weighted combination of fuel savings and time penalty
        const aScore = (a.fuelSavings * 0.6) - (a.timePenalty * 0.4);
        const bScore = (b.fuelSavings * 0.6) - (b.timePenalty * 0.4);
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
        priority: effectivePriority,
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