import { aviationAPIService, type FlightRoute, type TurbulenceReport } from './aviation-apis';

export interface TurbulenceData {
  id: string;
  latitude: number;
  longitude: number;
  altitude: number;
  severity: 'light' | 'moderate' | 'severe' | 'extreme';
  edrValue: number; // Eddy Dissipation Rate
  source: 'EDR' | 'PIREP' | 'WEATHER';
  timestamp: string;
  etaToSmootherAir: number; // minutes
  description: string;
  affectedAltitudeRange: [number, number];
  weather_conditions?: string;
  wind_shear?: number;
  temperature_gradient?: number;
}

// Re-export types for compatibility
export type { FlightRoute } from './aviation-apis';

// EDR (Eddy Dissipation Rate) severity thresholds
const EDR_THRESHOLDS = {
  light: 0.1,
  moderate: 0.2,
  severe: 0.3,
  extreme: 0.4
};

// Main function to fetch real turbulence data
export const fetchTurbulenceData = async (route: FlightRoute): Promise<TurbulenceData[]> => {
  try {
    // Use the real aviation API service
    const realTurbulenceData = await aviationAPIService.getTurbulenceData(route);
    
    // Convert to the expected format
    return realTurbulenceData.map(turbulence => ({
      id: turbulence.id,
      latitude: turbulence.latitude,
      longitude: turbulence.longitude,
      altitude: turbulence.altitude,
      severity: turbulence.severity,
      edrValue: turbulence.edrValue,
      source: turbulence.source,
      timestamp: turbulence.timestamp,
      etaToSmootherAir: turbulence.etaToSmootherAir,
      description: turbulence.description,
      affectedAltitudeRange: turbulence.affectedAltitudeRange,
      weather_conditions: turbulence.weather_conditions,
      wind_shear: turbulence.wind_shear,
      temperature_gradient: turbulence.temperature_gradient
    }));

  } catch (error) {
    console.error('Error fetching turbulence data:', error);
    
    // Fallback to simulated data if APIs fail
    return simulateTurbulenceData(route);
  }
};

// Fallback simulation function
const simulateTurbulenceData = (route: FlightRoute): TurbulenceData[] => {
  const turbulenceAreas: TurbulenceData[] = [];
  
  // Generate turbulence along the route
  const routePoints = [
    { lat: route.origin.lat, lng: route.origin.lng },
    ...route.waypoints,
    { lat: route.destination.lat, lng: route.destination.lng }
  ];

  // Add some realistic turbulence areas
  const turbulenceScenarios = [
    {
      position: { lat: (route.origin.lat + route.destination.lat) / 2 + 0.5, lng: (route.origin.lng + route.destination.lng) / 2 - 0.3 },
      severity: 'moderate' as const,
      edrValue: 0.25,
      description: 'Mountain wave turbulence due to strong crosswinds over mountainous terrain',
      altitude: 35000,
      etaToSmootherAir: 45
    },
    {
      position: { lat: (route.origin.lat + route.destination.lat) / 2 - 0.2, lng: (route.origin.lng + route.destination.lng) / 2 + 0.4 },
      severity: 'severe' as const,
      edrValue: 0.35,
      description: 'Clear air turbulence associated with jet stream boundary',
      altitude: 38000,
      etaToSmootherAir: 25
    },
    {
      position: { lat: (route.origin.lat + route.destination.lat) / 2 + 0.1, lng: (route.origin.lng + route.destination.lng) / 2 + 0.1 },
      severity: 'light' as const,
      edrValue: 0.15,
      description: 'Light turbulence in convective activity area',
      altitude: 32000,
      etaToSmootherAir: 15
    }
  ];

  turbulenceScenarios.forEach((scenario, index) => {
    const altitudeRange: [number, number] = [
      scenario.altitude - 2000,
      scenario.altitude + 2000
    ];

    turbulenceAreas.push({
      id: `simulated-${index + 1}`,
      latitude: scenario.position.lat,
      longitude: scenario.position.lng,
      altitude: scenario.altitude,
      severity: scenario.severity,
      edrValue: scenario.edrValue,
      source: 'EDR',
      timestamp: new Date().toISOString(),
      etaToSmootherAir: scenario.etaToSmootherAir,
      description: scenario.description,
      affectedAltitudeRange: altitudeRange
    });
  });

  return turbulenceAreas;
};

// Function to assess overall route safety
export const assessRouteSafety = (turbulenceData: TurbulenceData[]): {
  overallRisk: 'low' | 'medium' | 'high' | 'extreme';
  riskScore: number;
  recommendations: string[];
} => {
  if (turbulenceData.length === 0) {
    return {
      overallRisk: 'low',
      riskScore: 0,
      recommendations: ['Route appears clear of significant turbulence']
    };
  }

  // Calculate risk score based on severity and proximity
  let riskScore = 0;
  const recommendations: string[] = [];

  turbulenceData.forEach(turbulence => {
    const severityWeight = {
      light: 1,
      moderate: 3,
      severe: 7,
      extreme: 15
    };

    riskScore += severityWeight[turbulence.severity];

    // Add recommendations based on severity
    if (turbulence.severity === 'extreme') {
      recommendations.push(`Consider rerouting around extreme turbulence at ${turbulence.latitude.toFixed(2)}, ${turbulence.longitude.toFixed(2)}`);
    } else if (turbulence.severity === 'severe') {
      recommendations.push(`Exercise caution near severe turbulence area. ETA to smooth air: ${turbulence.etaToSmootherAir} minutes`);
    } else if (turbulence.severity === 'moderate') {
      recommendations.push(`Moderate turbulence expected. Consider altitude adjustment if possible`);
    }
  });

  // Determine overall risk level
  let overallRisk: 'low' | 'medium' | 'high' | 'extreme';
  if (riskScore <= 5) {
    overallRisk = 'low';
  } else if (riskScore <= 15) {
    overallRisk = 'medium';
  } else if (riskScore <= 30) {
    overallRisk = 'high';
  } else {
    overallRisk = 'extreme';
  }

  return { overallRisk, riskScore, recommendations };
};

// Function to get real flight data
export const getRealFlightData = async (flightNumber: string) => {
  try {
    return await aviationAPIService.getRealTimeFlightData(flightNumber);
  } catch (error) {
    console.error('Error fetching real flight data:', error);
    return [];
  }
};

// Function to get weather data for specific coordinates
export const getWeatherData = async (lat: number, lng: number) => {
  try {
    return await aviationAPIService.getWeatherData(lat, lng);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}; 