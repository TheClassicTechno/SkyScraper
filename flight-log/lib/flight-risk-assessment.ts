export interface FlightRiskFactors {
  weather: {
    condition: string;
    severity: number; // 0-100
    visibility: number; // miles
    windSpeed: number; // mph
    turbulence: number; // 0-100
  };
  recentEvents: {
    radarOutages: number;
    mechanicalIssues: number;
    runwayIncidents: number;
    atcIssues: number;
  };
  aircraft: {
    model: string;
    age: number; // years
    maintenanceScore: number; // 0-100
    incidentHistory: number; // incidents in last 5 years
  };
  route: {
    congestion: number; // 0-100
    weatherHistory: number; // 0-100
    incidentHistory: number; // 0-100
  };
}

export interface RiskScore {
  overall: number; // 0-100
  weather: number;
  events: number;
  aircraft: number;
  route: number;
  recommendation: 'safe' | 'caution' | 'high-risk' | 'no-go';
}

export interface AlternativeFlight {
  id: string;
  airline: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  riskScore: number;
  transferTime?: number; // minutes
  delayRate: number; // percentage
  safetyLogs: string[];
  bookingUrl?: string;
}

export interface FAAMessage {
  id: string;
  type: 'alert' | 'warning' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affectedAirports: string[];
  affectedAircraft: string[];
  timestamp: string;
  expiresAt?: string;
}

export interface MechanicalReport {
  id: string;
  aircraftId: string;
  aircraftModel: string;
  issue: string;
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  reportedAt: string;
  resolvedAt?: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
}

// Aircraft safety database
const aircraftSafetyData: Record<string, { age: number; maintenanceScore: number; incidentHistory: number }> = {
  'Boeing 737-800': { age: 8, maintenanceScore: 85, incidentHistory: 2 },
  'Boeing 737-900': { age: 6, maintenanceScore: 88, incidentHistory: 1 },
  'Boeing 777-200': { age: 12, maintenanceScore: 82, incidentHistory: 3 },
  'Boeing 787-8': { age: 5, maintenanceScore: 92, incidentHistory: 0 },
  'Airbus A320': { age: 7, maintenanceScore: 87, incidentHistory: 1 },
  'Airbus A321': { age: 6, maintenanceScore: 89, incidentHistory: 1 },
  'Airbus A350': { age: 4, maintenanceScore: 94, incidentHistory: 0 },
  'Embraer E175': { age: 5, maintenanceScore: 90, incidentHistory: 0 },
  'Bombardier CRJ900': { age: 9, maintenanceScore: 83, incidentHistory: 2 },
};

// Weather severity mapping
const weatherSeverity: Record<string, number> = {
  'Clear': 5,
  'Partly Cloudy': 10,
  'Cloudy': 15,
  'Light Rain': 25,
  'Heavy Rain': 45,
  'Thunderstorms': 75,
  'Snow': 60,
  'Ice': 85,
  'Fog': 70,
  'High Winds': 65,
};

export function calculateRiskScore(factors: FlightRiskFactors): RiskScore {
  // Weather risk calculation (30% weight)
  const weatherRisk = calculateWeatherRisk(factors.weather);
  
  // Recent events risk calculation (25% weight)
  const eventsRisk = calculateEventsRisk(factors.recentEvents);
  
  // Aircraft risk calculation (25% weight)
  const aircraftRisk = calculateAircraftRisk(factors.aircraft);
  
  // Route risk calculation (20% weight)
  const routeRisk = calculateRouteRisk(factors.route);
  
  // Calculate overall risk score
  const overall = Math.round(
    weatherRisk * 0.3 +
    eventsRisk * 0.25 +
    aircraftRisk * 0.25 +
    routeRisk * 0.2
  );
  
  // Determine recommendation
  let recommendation: RiskScore['recommendation'];
  if (overall <= 25) recommendation = 'safe';
  else if (overall <= 45) recommendation = 'caution';
  else if (overall <= 70) recommendation = 'high-risk';
  else recommendation = 'no-go';
  
  return {
    overall,
    weather: weatherRisk,
    events: eventsRisk,
    aircraft: aircraftRisk,
    route: routeRisk,
    recommendation,
  };
}

function calculateWeatherRisk(weather: FlightRiskFactors['weather']): number {
  let risk = weatherSeverity[weather.condition] || 20;
  
  // Adjust for visibility
  if (weather.visibility < 1) risk += 30;
  else if (weather.visibility < 3) risk += 15;
  else if (weather.visibility < 5) risk += 5;
  
  // Adjust for wind speed
  if (weather.windSpeed > 30) risk += 25;
  else if (weather.windSpeed > 20) risk += 15;
  else if (weather.windSpeed > 15) risk += 5;
  
  // Adjust for turbulence
  risk += weather.turbulence * 0.3;
  
  return Math.min(100, Math.max(0, risk));
}

function calculateEventsRisk(events: FlightRiskFactors['recentEvents']): number {
  let risk = 0;
  
  // Radar outages
  risk += events.radarOutages * 15;
  
  // Mechanical issues
  risk += events.mechanicalIssues * 20;
  
  // Runway incidents
  risk += events.runwayIncidents * 25;
  
  // ATC issues
  risk += events.atcIssues * 10;
  
  return Math.min(100, Math.max(0, risk));
}

function calculateAircraftRisk(aircraft: FlightRiskFactors['aircraft']): number {
  const safetyData = aircraftSafetyData[aircraft.model];
  if (!safetyData) return 50; // Unknown aircraft model
  
  let risk = 0;
  
  // Age factor
  if (aircraft.age > 20) risk += 30;
  else if (aircraft.age > 15) risk += 20;
  else if (aircraft.age > 10) risk += 10;
  
  // Maintenance score (inverse)
  risk += (100 - aircraft.maintenanceScore) * 0.4;
  
  // Incident history
  risk += aircraft.incidentHistory * 15;
  
  return Math.min(100, Math.max(0, risk));
}

function calculateRouteRisk(route: FlightRiskFactors['route']): number {
  let risk = 0;
  
  // Congestion
  risk += route.congestion * 0.3;
  
  // Weather history
  risk += route.weatherHistory * 0.3;
  
  // Incident history
  risk += route.incidentHistory * 0.4;
  
  return Math.min(100, Math.max(0, risk));
}

export function findSaferAlternatives(
  originalFlight: string,
  departure: string,
  arrival: string,
  date: string,
  maxRiskScore: number = 40
): AlternativeFlight[] {
  // Mock alternative flights - in real implementation, this would query a flight database
  const alternatives: AlternativeFlight[] = [
    {
      id: 'DL2345',
      airline: 'Delta Air Lines',
      departure,
      arrival,
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
      departure,
      arrival,
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
      departure,
      arrival,
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
      departure,
      arrival,
      departureTime: '16:30',
      arrivalTime: '19:45',
      price: 380,
      riskScore: 28,
      delayRate: 15,
      safetyLogs: ['Consistent safety ratings', 'No recent incidents'],
    },
  ];
  
  return alternatives
    .filter(flight => flight.riskScore <= maxRiskScore)
    .sort((a, b) => a.riskScore - b.riskScore);
}

export function getFAAAlerts(airports: string[]): FAAMessage[] {
  // Mock FAA alerts - in real implementation, this would query FAA API
  return [
    {
      id: 'FAA001',
      type: 'alert' as const,
      severity: 'medium' as const,
      title: 'Weather Advisory - Thunderstorms',
      description: 'Thunderstorm activity expected in the region. Possible delays and diversions.',
      affectedAirports: ['JFK', 'LGA', 'EWR'],
      affectedAircraft: [],
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours
    },
    {
      id: 'FAA002',
      type: 'warning' as const,
      severity: 'low' as const,
      title: 'Runway Maintenance',
      description: 'Scheduled runway maintenance at JFK. Expect minor delays.',
      affectedAirports: ['JFK'],
      affectedAircraft: [],
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    },
  ].filter(alert => 
    alert.affectedAirports.some(airport => airports.includes(airport))
  );
}

export function getMechanicalReports(aircraftModel: string): MechanicalReport[] {
  // Mock mechanical reports - in real implementation, this would query maintenance database
  return [
    {
      id: 'MECH001',
      aircraftId: 'N12345',
      aircraftModel,
      issue: 'Minor hydraulic system warning light',
      severity: 'minor' as const,
      reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      status: 'resolved' as const,
    },
    {
      id: 'MECH002',
      aircraftId: 'N67890',
      aircraftModel,
      issue: 'Landing gear sensor malfunction',
      severity: 'moderate' as const,
      reportedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
      status: 'investigating' as const,
    },
  ].filter(report => report.aircraftModel === aircraftModel);
}

export function generateRiskRecommendation(riskScore: RiskScore): string {
  if (riskScore.recommendation === 'no-go') {
    return 'This flight poses significant safety risks. We strongly recommend finding an alternative flight or rescheduling your travel.';
  } else if (riskScore.recommendation === 'high-risk') {
    return 'This flight has elevated risk factors. Consider booking an alternative flight with better safety conditions.';
  } else if (riskScore.recommendation === 'caution') {
    return 'This flight has some risk factors to be aware of. Monitor for updates and consider alternatives if conditions worsen.';
  } else {
    return 'This flight appears to have good safety conditions. Standard safety protocols apply.';
  }
} 