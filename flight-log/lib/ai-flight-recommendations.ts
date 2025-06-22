import { TurbulenceData, FlightRoute } from './turbulence-data';

export interface FlightRecommendation {
  id: string;
  route: FlightRoute;
  safetyScore: number;
  efficiencyScore: number;
  comfortScore: number;
  timePenalty: number; // minutes
  fuelSavings: number; // percentage
  confidence: number;
  explanation: {
    safetyImprovement: string;
    efficiencyImpact: string;
    weatherAvoidance: string;
    confidenceLevel: string;
  };
  priority: 'safety' | 'efficiency' | 'comfort' | 'balanced';
}

export interface AircraftCapabilities {
  type: string;
  maxAltitude: number;
  turbulenceTolerance: 'low' | 'medium' | 'high';
  fuelEfficiency: number; // mpg equivalent
  passengerCapacity: number;
}

export interface WeatherForecast {
  timestamp: string;
  latitude: number;
  longitude: number;
  altitude: number;
  windSpeed: number;
  windDirection: number;
  temperature: number;
  pressure: number;
  turbulenceIndex: number;
  conditions: string;
}

// Aircraft database
const AIRCRAFT_DATABASE: Record<string, AircraftCapabilities> = {
  'B737': {
    type: 'Boeing 737',
    maxAltitude: 41000,
    turbulenceTolerance: 'medium',
    fuelEfficiency: 0.85,
    passengerCapacity: 180
  },
  'B777': {
    type: 'Boeing 777',
    maxAltitude: 43000,
    turbulenceTolerance: 'high',
    fuelEfficiency: 0.92,
    passengerCapacity: 350
  },
  'A320': {
    type: 'Airbus A320',
    maxAltitude: 39000,
    turbulenceTolerance: 'medium',
    fuelEfficiency: 0.88,
    passengerCapacity: 150
  },
  'A350': {
    type: 'Airbus A350',
    maxAltitude: 43000,
    turbulenceTolerance: 'high',
    fuelEfficiency: 0.95,
    passengerCapacity: 300
  },
  'CRJ': {
    type: 'Bombardier CRJ',
    maxAltitude: 41000,
    turbulenceTolerance: 'low',
    fuelEfficiency: 0.75,
    passengerCapacity: 50
  }
};

// AI Recommendation Engine
class AIFlightRecommendationEngine {
  private historicalData: Map<string, number> = new Map();
  private weatherPatterns: Map<string, number> = new Map();

  constructor() {
    this.initializeHistoricalData();
  }

  private initializeHistoricalData() {
    // Simulate historical turbulence data for different routes
    const routes = [
      'JFK-LAX', 'ORD-DEN', 'ATL-MIA', 'SFO-JFK', 'LAX-ORD',
      'DEN-ATL', 'MIA-SFO', 'JFK-ORD', 'LAX-ATL', 'DEN-MIA'
    ];

    routes.forEach(route => {
      this.historicalData.set(route, Math.random() * 0.4 + 0.1); // 10-50% turbulence probability
      this.weatherPatterns.set(route, Math.random() * 0.3 + 0.2); // 20-50% weather impact
    });
  }

  // Main recommendation function
  async generateRecommendations(
    originalRoute: FlightRoute,
    turbulenceData: TurbulenceData[],
    aircraftType: string = 'B737',
    priority: 'safety' | 'efficiency' | 'comfort' | 'balanced' = 'balanced'
  ): Promise<FlightRecommendation[]> {
    const aircraft = AIRCRAFT_DATABASE[aircraftType] || AIRCRAFT_DATABASE['B737'];
    const alternatives = this.generateRouteAlternatives(originalRoute, aircraft);
    
    const recommendations = await Promise.all(
      alternatives.map(async (route) => {
        const scores = await this.calculateRouteScores(route, originalRoute, turbulenceData, aircraft);
        const explanation = this.generateExplanation(route, originalRoute, scores, turbulenceData);
        
        return {
          id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          route,
          ...scores,
          explanation,
          priority
        };
      })
    );

    // Sort by weighted score based on priority
    return this.sortByPriority(recommendations, priority);
  }

  // Generate alternative routes
  private generateRouteAlternatives(originalRoute: FlightRoute, aircraft: AircraftCapabilities): FlightRoute[] {
    const alternatives: FlightRoute[] = [];
    const baseRoute = { ...originalRoute };

    // 1. Altitude variations
    const altitudes = [30000, 35000, 40000, 45000].filter(alt => alt <= aircraft.maxAltitude);
    altitudes.forEach(altitude => {
      if (altitude !== (originalRoute.currentPosition?.altitude || 35000)) {
        alternatives.push({
          ...baseRoute,
          currentPosition: { ...originalRoute.currentPosition!, altitude },
          waypoints: this.adjustWaypointsForAltitude(originalRoute.waypoints, altitude)
        });
      }
    });

    // 2. Lateral deviations
    const deviations = [50, 100, 150, 200]; // nautical miles
    const directions = ['north', 'south', 'east', 'west'];
    
    deviations.forEach(offset => {
      directions.forEach(direction => {
        const deviatedRoute = this.createLateralDeviation(originalRoute, offset, direction);
        alternatives.push(deviatedRoute);
      });
    });

    // 3. Optimized waypoints
    const optimizedRoute = this.optimizeWaypoints(originalRoute);
    alternatives.push(optimizedRoute);

    return alternatives.slice(0, 8); // Limit to top 8 alternatives
  }

  // Calculate comprehensive route scores
  private async calculateRouteScores(
    route: FlightRoute,
    originalRoute: FlightRoute,
    turbulenceData: TurbulenceData[],
    aircraft: AircraftCapabilities
  ): Promise<{
    safetyScore: number;
    efficiencyScore: number;
    comfortScore: number;
    timePenalty: number;
    fuelSavings: number;
    confidence: number;
  }> {
    // Safety score based on turbulence avoidance
    const safetyScore = this.calculateSafetyScore(route, turbulenceData, aircraft);
    
    // Efficiency score based on fuel and time
    const efficiencyScore = this.calculateEfficiencyScore(route, originalRoute, aircraft);
    
    // Comfort score based on expected passenger experience
    const comfortScore = this.calculateComfortScore(route, turbulenceData, aircraft);
    
    // Time penalty calculation
    const timePenalty = this.calculateTimePenalty(route, originalRoute);
    
    // Fuel savings calculation
    const fuelSavings = this.calculateFuelSavings(route, originalRoute, aircraft);
    
    // Confidence level based on data quality
    const confidence = this.calculateConfidence(route, turbulenceData);

    return {
      safetyScore,
      efficiencyScore,
      comfortScore,
      timePenalty,
      fuelSavings,
      confidence
    };
  }

  // Calculate safety score (0-100)
  private calculateSafetyScore(route: FlightRoute, turbulenceData: TurbulenceData[], aircraft: AircraftCapabilities): number {
    let baseScore = 100;
    
    // Check turbulence exposure along route
    turbulenceData.forEach(turbulence => {
      const distance = this.calculateDistance(route.currentPosition!, {
        lat: turbulence.latitude,
        lng: turbulence.longitude,
        altitude: turbulence.altitude
      });
      
      if (distance < 100) { // Within 100km
        const severityMultiplier = {
          'light': 0.05,
          'moderate': 0.15,
          'severe': 0.30,
          'extreme': 0.50
        };
        
        const altitudeDiff = Math.abs((route.currentPosition?.altitude || 35000) - turbulence.altitude);
        const altitudeFactor = altitudeDiff > 5000 ? 0.5 : 1.0;
        
        baseScore -= severityMultiplier[turbulence.severity] * 100 * altitudeFactor;
      }
    });

    // Aircraft-specific adjustments
    const toleranceMultiplier = {
      'low': 0.8,
      'medium': 1.0,
      'high': 1.2
    };
    
    baseScore *= toleranceMultiplier[aircraft.turbulenceTolerance];
    
    return Math.max(0, Math.min(100, baseScore));
  }

  // Calculate efficiency score (0-100)
  private calculateEfficiencyScore(route: FlightRoute, originalRoute: FlightRoute, aircraft: AircraftCapabilities): number {
    const originalDistance = this.calculateRouteDistance(originalRoute);
    const newDistance = this.calculateRouteDistance(route);
    
    const distanceRatio = newDistance / originalDistance;
    const altitudeEfficiency = this.calculateAltitudeEfficiency(route, aircraft);
    
    // Combine distance and altitude efficiency
    const efficiency = (1 / distanceRatio) * altitudeEfficiency * aircraft.fuelEfficiency;
    
    return Math.max(0, Math.min(100, efficiency * 100));
  }

  // Calculate comfort score (0-100)
  private calculateComfortScore(route: FlightRoute, turbulenceData: TurbulenceData[], aircraft: AircraftCapabilities): number {
    let comfortScore = 100;
    
    // Reduce comfort based on expected turbulence
    turbulenceData.forEach(turbulence => {
      const distance = this.calculateDistance(route.currentPosition!, {
        lat: turbulence.latitude,
        lng: turbulence.longitude,
        altitude: turbulence.altitude
      });
      
      if (distance < 200) { // Within 200km
        const severityImpact = {
          'light': 5,
          'moderate': 15,
          'severe': 30,
          'extreme': 50
        };
        
        const distanceFactor = Math.max(0, 1 - (distance / 200));
        comfortScore -= severityImpact[turbulence.severity] * distanceFactor;
      }
    });

    // Aircraft size factor (larger aircraft = more comfortable)
    const sizeFactor = Math.min(1.2, aircraft.passengerCapacity / 150);
    comfortScore *= sizeFactor;
    
    return Math.max(0, Math.min(100, comfortScore));
  }

  // Calculate time penalty in minutes
  private calculateTimePenalty(route: FlightRoute, originalRoute: FlightRoute): number {
    const originalDistance = this.calculateRouteDistance(originalRoute);
    const newDistance = this.calculateRouteDistance(route);
    
    const distanceDifference = newDistance - originalDistance;
    const speed = 800; // km/h average speed
    
    return Math.round((distanceDifference / speed) * 60);
  }

  // Calculate fuel savings percentage
  private calculateFuelSavings(route: FlightRoute, originalRoute: FlightRoute, aircraft: AircraftCapabilities): number {
    const originalEfficiency = this.calculateAltitudeEfficiency(originalRoute, aircraft);
    const newEfficiency = this.calculateAltitudeEfficiency(route, aircraft);
    
    const originalDistance = this.calculateRouteDistance(originalRoute);
    const newDistance = this.calculateRouteDistance(route);
    
    const originalFuel = originalDistance / originalEfficiency;
    const newFuel = newDistance / newEfficiency;
    
    return Math.round(((originalFuel - newFuel) / originalFuel) * 100);
  }

  // Calculate confidence level (0-100)
  private calculateConfidence(route: FlightRoute, turbulenceData: TurbulenceData[]): number {
    let confidence = 70; // Base confidence
    
    // Increase confidence with more data
    if (turbulenceData.length > 5) confidence += 10;
    if (turbulenceData.length > 10) confidence += 10;
    
    // Increase confidence with recent data
    const recentData = turbulenceData.filter(t => 
      Date.now() - new Date(t.timestamp).getTime() < 3600000 // Last hour
    );
    if (recentData.length > 0) confidence += 10;
    
    return Math.min(100, confidence);
  }

  // Generate explanation for recommendation
  private generateExplanation(
    route: FlightRoute,
    originalRoute: FlightRoute,
    scores: any,
    turbulenceData: TurbulenceData[]
  ): FlightRecommendation['explanation'] {
    const riskReduction = this.calculateRiskReduction(route, originalRoute, turbulenceData);
    const weatherHazards = this.identifyWeatherHazards(originalRoute, turbulenceData);
    
    return {
      safetyImprovement: `Reduces turbulence exposure by ${riskReduction}%`,
      efficiencyImpact: `Adds ${scores.timePenalty} minutes but saves ${scores.fuelSavings}% fuel`,
      weatherAvoidance: `Avoids ${weatherHazards.join(', ')}`,
      confidenceLevel: `${scores.confidence}% confidence in recommendation`
    };
  }

  // Helper methods
  private calculateDistance(pos1: { lat: number; lng: number; altitude: number }, pos2: { lat: number; lng: number; altitude: number }): number {
    const R = 6371; // Earth's radius in km
    const lat1 = pos1.lat * Math.PI / 180;
    const lat2 = pos2.lat * Math.PI / 180;
    const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
    const dLng = (pos2.lng - pos1.lng) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c;
  }

  private calculateRouteDistance(route: FlightRoute): number {
    // Simplified route distance calculation
    return this.calculateDistance(
      { lat: route.origin.lat, lng: route.origin.lng, altitude: 0 },
      { lat: route.destination.lat, lng: route.destination.lng, altitude: 0 }
    );
  }

  private calculateAltitudeEfficiency(route: FlightRoute, aircraft: AircraftCapabilities): number {
    const altitude = route.currentPosition?.altitude || 35000;
    const optimalAltitude = aircraft.maxAltitude * 0.85;
    const efficiency = 1 - Math.abs(altitude - optimalAltitude) / optimalAltitude;
    return Math.max(0.5, efficiency);
  }

  private calculateRiskReduction(route: FlightRoute, originalRoute: FlightRoute, turbulenceData: TurbulenceData[]): number {
    const originalRisk = this.calculateSafetyScore(originalRoute, turbulenceData, AIRCRAFT_DATABASE['B737']);
    const newRisk = this.calculateSafetyScore(route, turbulenceData, AIRCRAFT_DATABASE['B737']);
    return Math.round(((newRisk - originalRisk) / originalRisk) * 100);
  }

  private identifyWeatherHazards(route: FlightRoute, turbulenceData: TurbulenceData[]): string[] {
    const hazards: string[] = [];
    turbulenceData.forEach(turbulence => {
      const distance = this.calculateDistance(route.currentPosition!, {
        lat: turbulence.latitude,
        lng: turbulence.longitude,
        altitude: turbulence.altitude
      });
      
      if (distance < 100) {
        hazards.push(`${turbulence.severity} turbulence at FL${Math.round(turbulence.altitude / 1000)}`);
      }
    });
    
    return hazards.length > 0 ? hazards : ['clear conditions'];
  }

  private adjustWaypointsForAltitude(waypoints: any[], altitude: number): any[] {
    return waypoints.map(wp => ({ ...wp, altitude }));
  }

  private createLateralDeviation(route: FlightRoute, offset: number, direction: string): FlightRoute {
    const deviation = offset / 60; // Convert nautical miles to degrees (approximate)
    const newRoute = { ...route };
    
    switch (direction) {
      case 'north':
        newRoute.currentPosition = { ...route.currentPosition!, lat: route.currentPosition!.lat + deviation };
        break;
      case 'south':
        newRoute.currentPosition = { ...route.currentPosition!, lat: route.currentPosition!.lat - deviation };
        break;
      case 'east':
        newRoute.currentPosition = { ...route.currentPosition!, lng: route.currentPosition!.lng + deviation };
        break;
      case 'west':
        newRoute.currentPosition = { ...route.currentPosition!, lng: route.currentPosition!.lng - deviation };
        break;
    }
    
    return newRoute;
  }

  private optimizeWaypoints(route: FlightRoute): FlightRoute {
    // Simplified waypoint optimization
    return { ...route };
  }

  private sortByPriority(recommendations: FlightRecommendation[], priority: string): FlightRecommendation[] {
    return recommendations.sort((a, b) => {
      let scoreA = 0, scoreB = 0;
      
      switch (priority) {
        case 'safety':
          scoreA = a.safetyScore;
          scoreB = b.safetyScore;
          break;
        case 'efficiency':
          scoreA = a.efficiencyScore;
          scoreB = b.efficiencyScore;
          break;
        case 'comfort':
          scoreA = a.comfortScore;
          scoreB = b.comfortScore;
          break;
        case 'balanced':
        default:
          scoreA = (a.safetyScore * 0.4) + (a.efficiencyScore * 0.3) + (a.comfortScore * 0.3);
          scoreB = (b.safetyScore * 0.4) + (b.efficiencyScore * 0.3) + (b.comfortScore * 0.3);
          break;
      }
      
      return scoreB - scoreA;
    });
  }
}

export const aiRecommendationEngine = new AIFlightRecommendationEngine(); 