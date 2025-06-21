import { type AlternativeFlight } from './flight-risk-assessment'

export interface FlightRecommendation {
  flight: AlternativeFlight;
  score: number; // 0-100 recommendation score
  reasoning: string[];
  category: 'safety' | 'price' | 'convenience' | 'premium';
  tags: string[];
}

export interface AIRecommendationContext {
  originalFlight: {
    id: string;
    airline: string;
    departure: string;
    arrival: string;
    riskScore: number;
    price: number;
    departureTime: string;
    weatherConditions?: string;
    userPreferences?: {
      budget?: 'low' | 'medium' | 'high';
      priority?: 'safety' | 'price' | 'time' | 'comfort';
      cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first';
    };
  };
}

// AI Recommendation Engine
export class AIFlightRecommender {
  private premiumAirlines = ['Emirates', 'Singapore Airlines', 'Qatar Airways', 'ANA', 'Lufthansa'];

  private analyzeSafetyFactors(flight: AlternativeFlight): { score: number; factors: string[] } {
    const factors: string[] = [];
    let score = 100;

    // Risk score analysis
    if (flight.riskScore <= 20) {
      score += 20;
      factors.push('Excellent safety rating');
    } else if (flight.riskScore <= 30) {
      score += 10;
      factors.push('Good safety rating');
    } else if (flight.riskScore > 50) {
      score -= 20;
      factors.push('Elevated risk factors');
    }

    // Delay rate analysis
    if (flight.delayRate <= 5) {
      score += 15;
      factors.push('Excellent on-time performance');
    } else if (flight.delayRate <= 10) {
      score += 5;
      factors.push('Good reliability');
    } else if (flight.delayRate > 20) {
      score -= 15;
      factors.push('Frequent delays');
    }

    // Safety logs analysis
    const positiveLogs = flight.safetyLogs.filter(log => 
      log.toLowerCase().includes('clean') || 
      log.toLowerCase().includes('good') || 
      log.toLowerCase().includes('excellent') ||
      log.toLowerCase().includes('no incidents')
    );
    
    if (positiveLogs.length >= 2) {
      score += 10;
      factors.push('Strong safety record');
    }

    return { score: Math.max(0, score), factors };
  }

  private analyzePriceValue(flight: AlternativeFlight, context: AIRecommendationContext): { score: number; factors: string[] } {
    const factors: string[] = [];
    let score = 50;

    const originalPrice = context.originalFlight.price;
    const priceDifference = originalPrice - flight.price;
    const priceRatio = flight.price / originalPrice;

    // Price comparison
    if (priceRatio <= 0.7) {
      score += 25;
      factors.push('Significant cost savings');
    } else if (priceRatio <= 0.9) {
      score += 15;
      factors.push('Good value for money');
    } else if (priceRatio > 1.2) {
      score -= 20;
      factors.push('Higher cost than original');
    }

    // Risk-adjusted value
    const riskAdjustedValue = flight.price / (100 - flight.riskScore);
    if (riskAdjustedValue < 2) {
      score += 15;
      factors.push('Excellent risk-adjusted value');
    }

    // Budget consideration
    if (context.originalFlight.userPreferences?.budget === 'low' && priceRatio <= 0.8) {
      score += 20;
      factors.push('Matches budget preferences');
    }

    return { score: Math.max(0, score), factors };
  }

  private analyzeConvenience(flight: AlternativeFlight, context: AIRecommendationContext): { score: number; factors: string[] } {
    const factors: string[] = [];
    let score = 50;

    // Time analysis
    const originalTime = context.originalFlight.departureTime;
    const originalHour = parseInt(originalTime.split(':')[0]);
    const flightHour = parseInt(flight.departureTime.split(':')[0]);
    const timeDiff = Math.abs(flightHour - originalHour);

    if (timeDiff <= 2) {
      score += 20;
      factors.push('Similar departure time');
    } else if (timeDiff <= 4) {
      score += 10;
      factors.push('Acceptable time difference');
    } else {
      score -= 10;
      factors.push('Significant schedule change');
    }

    // Transfer time consideration
    if (flight.transferTime && flight.transferTime <= 60) {
      score += 15;
      factors.push('Efficient connection');
    } else if (flight.transferTime && flight.transferTime > 180) {
      score -= 15;
      factors.push('Long layover');
    }

    return { score: Math.max(0, score), factors };
  }

  private analyzePremiumFactors(flight: AlternativeFlight): { score: number; factors: string[] } {
    const factors: string[] = [];
    let score = 50;

    // Premium airline analysis
    if (this.premiumAirlines.some((airline: string) => flight.airline.includes(airline))) {
      score += 20;
      factors.push('Premium airline service');
    }

    // Aircraft type analysis (if available)
    if (flight.airline.includes('Boeing 787') || flight.airline.includes('Airbus A350')) {
      score += 15;
      factors.push('Modern aircraft');
    }

    return { score: Math.max(0, score), factors };
  }

  public generateRecommendations(
    alternatives: AlternativeFlight[], 
    context: AIRecommendationContext
  ): FlightRecommendation[] {
    const recommendations: FlightRecommendation[] = [];

    for (const flight of alternatives) {
      const safety = this.analyzeSafetyFactors(flight);
      const price = this.analyzePriceValue(flight, context);
      const convenience = this.analyzeConvenience(flight, context);
      const premium = this.analyzePremiumFactors(flight);

      // Determine category based on user preferences
      let category: FlightRecommendation['category'] = 'safety';
      let categoryScore = safety.score;

      if (context.originalFlight.userPreferences?.priority === 'price') {
        category = 'price';
        categoryScore = price.score;
      } else if (context.originalFlight.userPreferences?.priority === 'time') {
        category = 'convenience';
        categoryScore = convenience.score;
      } else if (context.originalFlight.userPreferences?.cabinClass === 'business' || 
                 context.originalFlight.userPreferences?.cabinClass === 'first') {
        category = 'premium';
        categoryScore = premium.score;
      }

      // Calculate overall score
      const overallScore = Math.round(
        (safety.score * 0.4) + 
        (price.score * 0.3) + 
        (convenience.score * 0.2) + 
        (premium.score * 0.1)
      );

      // Combine all factors
      const allFactors = [
        ...safety.factors,
        ...price.factors,
        ...convenience.factors,
        ...premium.factors
      ];

      // Generate tags
      const tags: string[] = [];
      if (flight.riskScore <= 25) tags.push('Safe');
      if (flight.delayRate <= 10) tags.push('Reliable');
      if (flight.price < context.originalFlight.price * 0.8) tags.push('Budget-Friendly');
      if (this.premiumAirlines.some((airline: string) => flight.airline.includes(airline))) tags.push('Premium');

      recommendations.push({
        flight,
        score: overallScore,
        reasoning: allFactors,
        category,
        tags
      });
    }

    // Sort by score and return top recommendations
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Return top 5 recommendations
  }

  public getTopRecommendation(recommendations: FlightRecommendation[]): FlightRecommendation | null {
    if (recommendations.length === 0) return null;
    
    // Find the highest scoring recommendation
    const topRecommendation = recommendations.reduce((best, current) => 
      current.score > best.score ? current : best
    );

    return topRecommendation;
  }

  public generateRecommendationSummary(recommendation: FlightRecommendation): string {
    const { flight, score, reasoning, category, tags } = recommendation;
    
    let summary = `I recommend ${flight.airline} ${flight.id} `;
    
    if (score >= 80) {
      summary += "as an excellent alternative ";
    } else if (score >= 70) {
      summary += "as a good alternative ";
    } else {
      summary += "as a viable alternative ";
    }

    summary += `with a ${score}% recommendation score. `;

    // Add category-specific reasoning
    switch (category) {
      case 'safety':
        summary += "This flight prioritizes safety with ";
        break;
      case 'price':
        summary += "This option offers the best value with ";
        break;
      case 'convenience':
        summary += "This flight provides optimal convenience with ";
        break;
      case 'premium':
        summary += "This premium option offers enhanced service with ";
        break;
    }

    // Add top reasoning factors
    const topReasons = reasoning.slice(0, 3);
    summary += topReasons.join(', ') + '. ';

    // Add tags
    if (tags.length > 0) {
      summary += `Key highlights: ${tags.join(', ')}.`;
    }

    return summary;
  }
}

// Mock AI recommendation service for demonstration
export class MockAIRecommendationService {
  private recommender = new AIFlightRecommender();

  public async getRecommendations(
    alternatives: AlternativeFlight[],
    context: AIRecommendationContext
  ): Promise<FlightRecommendation[]> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return this.recommender.generateRecommendations(alternatives, context);
  }

  public async getTopRecommendation(
    alternatives: AlternativeFlight[],
    context: AIRecommendationContext
  ): Promise<FlightRecommendation | null> {
    const recommendations = await this.getRecommendations(alternatives, context);
    return this.recommender.getTopRecommendation(recommendations);
  }

  public generateSummary(recommendation: FlightRecommendation): string {
    return this.recommender.generateRecommendationSummary(recommendation);
  }
} 