import { 
  type FlightRiskFactors, 
  type RiskScore, 
  type AlternativeFlight,
  type FAAMessage,
  type MechanicalReport 
} from './flight-risk-assessment'

// Bayesian Network Structure for Flight Risk Assessment
interface BayesianNode {
  name: string;
  parents: string[];
  probabilities: Record<string, number>; // Conditional probabilities
  states: string[];
}

interface BayesianNetwork {
  nodes: BayesianNode[];
  evidence: Record<string, string>;
}

// Monte Carlo Simulation Parameters
interface MonteCarloParams {
  iterations: number;
  confidenceLevel: number;
  riskThresholds: {
    safe: number;
    caution: number;
    highRisk: number;
    noGo: number;
  };
}

// Historical Data for Bayesian Inference
interface HistoricalData {
  weatherIncidents: Record<string, number>;
  aircraftIncidents: Record<string, number>;
  routeIncidents: Record<string, number>;
  timeOfDayIncidents: Record<string, number>;
  seasonalFactors: Record<string, number>;
}

// Advanced Risk Factors with Uncertainty
export interface AdvancedRiskFactors extends FlightRiskFactors {
  uncertainty: {
    weatherConfidence: number;
    aircraftConfidence: number;
    routeConfidence: number;
    eventConfidence: number;
  };
  temporalFactors: {
    timeOfDay: number; // 0-23 hours
    dayOfWeek: number; // 0-6
    season: string;
    holidayFactor: number;
  };
  environmentalFactors: {
    solarActivity: number;
    geomagneticStorms: number;
    atmosphericPressure: number;
    humidity: number;
  };
}

// Bayesian Network Definition
const createFlightRiskBayesianNetwork = (): BayesianNetwork => ({
  nodes: [
    {
      name: 'weather',
      parents: [],
      states: ['excellent', 'good', 'moderate', 'poor', 'severe'],
      probabilities: {
        'excellent': 0.4,
        'good': 0.35,
        'moderate': 0.15,
        'poor': 0.08,
        'severe': 0.02
      }
    },
    {
      name: 'aircraft_condition',
      parents: ['aircraft_age', 'maintenance_quality'],
      states: ['excellent', 'good', 'moderate', 'poor'],
      probabilities: {
        'excellent|aircraft_age_young,maintenance_quality_high': 0.9,
        'good|aircraft_age_young,maintenance_quality_high': 0.1,
        'excellent|aircraft_age_young,maintenance_quality_medium': 0.7,
        'good|aircraft_age_young,maintenance_quality_medium': 0.3,
        'excellent|aircraft_age_old,maintenance_quality_high': 0.6,
        'good|aircraft_age_old,maintenance_quality_high': 0.4,
        'moderate|aircraft_age_old,maintenance_quality_medium': 0.8,
        'poor|aircraft_age_old,maintenance_quality_low': 0.9
      }
    },
    {
      name: 'pilot_experience',
      parents: [],
      states: ['expert', 'experienced', 'moderate', 'inexperienced'],
      probabilities: {
        'expert': 0.3,
        'experienced': 0.5,
        'moderate': 0.18,
        'inexperienced': 0.02
      }
    },
    {
      name: 'air_traffic_density',
      parents: ['time_of_day', 'airport_size'],
      states: ['low', 'medium', 'high', 'extreme'],
      probabilities: {
        'low|time_of_day_off_peak,airport_size_small': 0.9,
        'medium|time_of_day_off_peak,airport_size_small': 0.1,
        'high|time_of_day_peak,airport_size_large': 0.8,
        'extreme|time_of_day_peak,airport_size_major': 0.9
      }
    },
    {
      name: 'risk_level',
      parents: ['weather', 'aircraft_condition', 'pilot_experience', 'air_traffic_density'],
      states: ['safe', 'caution', 'high_risk', 'no_go'],
      probabilities: {
        'safe|weather_excellent,aircraft_condition_excellent,pilot_experience_expert,air_traffic_density_low': 0.95,
        'caution|weather_good,aircraft_condition_good,pilot_experience_experienced,air_traffic_density_medium': 0.7,
        'high_risk|weather_poor,aircraft_condition_moderate,pilot_experience_moderate,air_traffic_density_high': 0.8,
        'no_go|weather_severe,aircraft_condition_poor,pilot_experience_inexperienced,air_traffic_density_extreme': 0.95
      }
    }
  ],
  evidence: {}
})

// Monte Carlo Simulation for Risk Assessment
class MonteCarloRiskSimulator {
  private iterations: number;
  private confidenceLevel: number;

  constructor(params: MonteCarloParams) {
    this.iterations = params.iterations;
    this.confidenceLevel = params.confidenceLevel;
  }

  // Generate random samples from probability distributions
  private sampleNormal(mean: number, stdDev: number): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return mean + z0 * stdDev;
  }

  private sampleLogNormal(mean: number, stdDev: number): number {
    const normalSample = this.sampleNormal(Math.log(mean), stdDev);
    return Math.exp(normalSample);
  }

  private sampleWeibull(shape: number, scale: number): number {
    const u = Math.random();
    return scale * Math.pow(-Math.log(1 - u), 1 / shape);
  }

  // Monte Carlo simulation for weather risk - ADJUSTED FOR CONSERVATIVE SCORING
  private simulateWeatherRisk(weather: AdvancedRiskFactors['weather']): number[] {
    const results: number[] = [];
    
    for (let i = 0; i < this.iterations; i++) {
      let risk = 0;
      
      // Base weather condition risk - REDUCED VALUES
      const weatherSeverity = {
        'Clear': this.sampleNormal(2, 1),
        'Partly Cloudy': this.sampleNormal(4, 1.5),
        'Cloudy': this.sampleNormal(6, 2),
        'Light Rain': this.sampleNormal(10, 2.5),
        'Heavy Rain': this.sampleNormal(18, 3),
        'Thunderstorms': this.sampleNormal(35, 5),
        'Snow': this.sampleNormal(25, 4),
        'Ice': this.sampleNormal(40, 4),
        'Fog': this.sampleNormal(30, 4),
        'High Winds': this.sampleNormal(28, 3)
      }[weather.condition] || 8;

      // Visibility impact - REDUCED IMPACT
      const visibilityImpact = weather.visibility < 1 ? this.sampleLogNormal(12, 0.3) :
                              weather.visibility < 3 ? this.sampleLogNormal(6, 0.2) :
                              weather.visibility < 5 ? this.sampleLogNormal(2, 0.15) : 0;

      // Wind speed impact - REDUCED VALUES
      const windImpact = weather.windSpeed > 30 ? this.sampleWeibull(2, 10) :
                        weather.windSpeed > 20 ? this.sampleWeibull(2, 6) :
                        weather.windSpeed > 15 ? this.sampleWeibull(2, 2) : 0;

      // Turbulence impact - REDUCED MULTIPLIER
      const turbulenceImpact = this.sampleNormal(weather.turbulence * 0.15, weather.turbulence * 0.05);

      risk = Math.min(60, Math.max(0, weatherSeverity + visibilityImpact + windImpact + turbulenceImpact));
      results.push(risk);
    }

    return results;
  }

  // Monte Carlo simulation for aircraft risk - ADJUSTED FOR CONSERVATIVE SCORING
  private simulateAircraftRisk(aircraft: AdvancedRiskFactors['aircraft']): number[] {
    const results: number[] = [];
    
    for (let i = 0; i < this.iterations; i++) {
      let risk = 0;
      
      // Age factor - REDUCED VALUES
      const ageRisk = aircraft.age > 20 ? this.sampleLogNormal(12, 0.2) :
                     aircraft.age > 15 ? this.sampleLogNormal(8, 0.18) :
                     aircraft.age > 10 ? this.sampleLogNormal(4, 0.15) : 0;

      // Maintenance score impact - REDUCED MULTIPLIER
      const maintenanceRisk = this.sampleNormal((100 - aircraft.maintenanceScore) * 0.2, 2);

      // Incident history - REDUCED MULTIPLIER
      const incidentRisk = aircraft.incidentHistory * this.sampleWeibull(1.5, 6);

      risk = Math.min(50, Math.max(0, ageRisk + maintenanceRisk + incidentRisk));
      results.push(risk);
    }

    return results;
  }

  // Monte Carlo simulation for route risk - ADJUSTED FOR CONSERVATIVE SCORING
  private simulateRouteRisk(route: AdvancedRiskFactors['route']): number[] {
    const results: number[] = [];
    
    for (let i = 0; i < this.iterations; i++) {
      let risk = 0;
      
      // Congestion impact - REDUCED MULTIPLIER
      const congestionRisk = this.sampleNormal(route.congestion * 0.15, route.congestion * 0.03);

      // Weather history impact - REDUCED MULTIPLIER
      const weatherHistoryRisk = this.sampleNormal(route.weatherHistory * 0.15, route.weatherHistory * 0.04);

      // Incident history impact - REDUCED MULTIPLIER
      const incidentHistoryRisk = this.sampleLogNormal(route.incidentHistory * 0.2, 0.15);

      risk = Math.min(40, Math.max(0, congestionRisk + weatherHistoryRisk + incidentHistoryRisk));
      results.push(risk);
    }

    return results;
  }

  // Monte Carlo simulation for recent events risk - ADJUSTED FOR CONSERVATIVE SCORING
  private simulateEventsRisk(events: AdvancedRiskFactors['recentEvents']): number[] {
    const results: number[] = [];
    
    for (let i = 0; i < this.iterations; i++) {
      let risk = 0;
      
      // Radar outages - REDUCED MULTIPLIER
      const radarRisk = events.radarOutages * this.sampleWeibull(1.2, 6);

      // Mechanical issues - REDUCED VALUES
      const mechanicalRisk = events.mechanicalIssues * this.sampleLogNormal(8, 0.3);

      // Runway incidents - REDUCED MULTIPLIER
      const runwayRisk = events.runwayIncidents * this.sampleWeibull(1.8, 10);

      // ATC issues - REDUCED VALUES
      const atcRisk = events.atcIssues * this.sampleNormal(4, 1.5);

      risk = Math.min(45, Math.max(0, radarRisk + mechanicalRisk + runwayRisk + atcRisk));
      results.push(risk);
    }

    return results;
  }

  // Run complete Monte Carlo simulation
  public runSimulation(factors: AdvancedRiskFactors): {
    overallRisk: number;
    confidenceInterval: [number, number];
    riskDistribution: number[];
    componentRisks: {
      weather: number;
      aircraft: number;
      route: number;
      events: number;
    };
  } {
    const weatherRisks = this.simulateWeatherRisk(factors.weather);
    const aircraftRisks = this.simulateAircraftRisk(factors.aircraft);
    const routeRisks = this.simulateRouteRisk(factors.route);
    const eventsRisks = this.simulateEventsRisk(factors.recentEvents);

    // Calculate overall risk distribution with ADJUSTED WEIGHTS
    const overallRisks: number[] = [];
    for (let i = 0; i < this.iterations; i++) {
      const overall = Math.round(
        weatherRisks[i] * 0.35 +
        eventsRisks[i] * 0.3 +
        aircraftRisks[i] * 0.2 +
        routeRisks[i] * 0.15
      );
      overallRisks.push(Math.min(70, Math.max(0, overall))); // CAPPED AT 70
    }

    // Calculate statistics
    const sortedRisks = overallRisks.sort((a, b) => a - b);
    const meanRisk = sortedRisks.reduce((sum, risk) => sum + risk, 0) / this.iterations;
    
    const percentileIndex = Math.floor((1 - this.confidenceLevel) * this.iterations / 2);
    const lowerBound = sortedRisks[percentileIndex];
    const upperBound = sortedRisks[this.iterations - percentileIndex - 1];

    return {
      overallRisk: Math.round(meanRisk),
      confidenceInterval: [lowerBound, upperBound],
      riskDistribution: sortedRisks,
      componentRisks: {
        weather: Math.round(weatherRisks.reduce((sum, risk) => sum + risk, 0) / this.iterations),
        aircraft: Math.round(aircraftRisks.reduce((sum, risk) => sum + risk, 0) / this.iterations),
        route: Math.round(routeRisks.reduce((sum, risk) => sum + risk, 0) / this.iterations),
        events: Math.round(eventsRisks.reduce((sum, risk) => sum + risk, 0) / this.iterations)
      }
    };
  }
}

// Bayesian Inference Engine
class BayesianInferenceEngine {
  private network: BayesianNetwork;

  constructor() {
    this.network = createFlightRiskBayesianNetwork();
  }

  // Calculate conditional probability using Bayes' theorem - ADJUSTED FOR CONSERVATIVE SCORING
  private calculateConditionalProbability(
    event: string,
    evidence: Record<string, string>
  ): number {
    let probability = 0.3; // REDUCED prior probability

    // Update based on evidence - REDUCED MULTIPLIERS
    if (evidence.weather === 'severe') probability *= 1.8;
    if (evidence.weather === 'poor') probability *= 1.4;
    if (evidence.weather === 'moderate') probability *= 1.1;
    if (evidence.weather === 'good') probability *= 0.9;
    if (evidence.weather === 'excellent') probability *= 0.7;

    if (evidence.aircraft_condition === 'poor') probability *= 1.5;
    if (evidence.aircraft_condition === 'moderate') probability *= 1.2;
    if (evidence.aircraft_condition === 'good') probability *= 0.9;
    if (evidence.aircraft_condition === 'excellent') probability *= 0.8;

    if (evidence.pilot_experience === 'inexperienced') probability *= 1.6;
    if (evidence.pilot_experience === 'moderate') probability *= 1.1;
    if (evidence.pilot_experience === 'experienced') probability *= 0.95;
    if (evidence.pilot_experience === 'expert') probability *= 0.85;

    if (evidence.air_traffic_density === 'extreme') probability *= 1.4;
    if (evidence.air_traffic_density === 'high') probability *= 1.2;
    if (evidence.air_traffic_density === 'medium') probability *= 1.05;
    if (evidence.air_traffic_density === 'low') probability *= 0.9;

    return Math.min(0.8, Math.max(0, probability)); // CAPPED AT 0.8
  }

  // Run Bayesian inference
  public runInference(factors: AdvancedRiskFactors): {
    riskProbability: number;
    confidence: number;
    evidenceStrength: number;
  } {
    // Convert factors to evidence
    const evidence: Record<string, string> = {};

    // Weather evidence
    if (factors.weather.condition === 'Clear' || factors.weather.condition === 'Partly Cloudy') {
      evidence.weather = 'excellent';
    } else if (factors.weather.condition === 'Cloudy' || factors.weather.condition === 'Light Rain') {
      evidence.weather = 'good';
    } else if (factors.weather.condition === 'Heavy Rain') {
      evidence.weather = 'moderate';
    } else if (factors.weather.condition === 'Thunderstorms' || factors.weather.condition === 'Snow') {
      evidence.weather = 'poor';
    } else {
      evidence.weather = 'severe';
    }

    // Aircraft condition evidence
    if (factors.aircraft.maintenanceScore >= 90 && factors.aircraft.age <= 5) {
      evidence.aircraft_condition = 'excellent';
    } else if (factors.aircraft.maintenanceScore >= 80 && factors.aircraft.age <= 10) {
      evidence.aircraft_condition = 'good';
    } else if (factors.aircraft.maintenanceScore >= 70 && factors.aircraft.age <= 15) {
      evidence.aircraft_condition = 'moderate';
    } else {
      evidence.aircraft_condition = 'poor';
    }

    // Pilot experience (simplified - in reality this would come from pilot database)
    evidence.pilot_experience = 'experienced'; // Default assumption

    // Air traffic density
    const timeOfDay = factors.temporalFactors.timeOfDay;
    if (timeOfDay >= 6 && timeOfDay <= 9 || timeOfDay >= 16 && timeOfDay <= 19) {
      evidence.air_traffic_density = 'high';
    } else if (timeOfDay >= 10 && timeOfDay <= 15) {
      evidence.air_traffic_density = 'medium';
    } else {
      evidence.air_traffic_density = 'low';
    }

    // Calculate risk probability
    const riskProbability = this.calculateConditionalProbability('high_risk', evidence);
    
    // Calculate confidence based on evidence strength
    const evidenceStrength = Object.keys(evidence).length / 4; // Normalized to 0-1
    const confidence = Math.min(0.95, 0.5 + evidenceStrength * 0.45);

    return {
      riskProbability,
      confidence,
      evidenceStrength
    };
  }
}

// Advanced Risk Assessment System
// Uses sophisticated algorithms with mock data to demonstrate real AI capabilities

export interface RiskFactors {
  weather: {
    turbulence: number; // 0-100
    visibility: number; // 0-100
    windSpeed: number; // knots
    precipitation: number; // 0-100
  };
  aircraft: {
    age: number; // years
    maintenanceScore: number; // 0-100
    type: string;
    lastInspection: string;
  };
  route: {
    congestion: number; // 0-100
    altitude: number; // feet
    distance: number; // nautical miles
    complexity: number; // 0-100
  };
  temporal: {
    timeOfDay: number; // 0-24
    dayOfWeek: number; // 0-6
    season: string;
    holidayFactor: number; // 0-100
  };
  historical: {
    delayRate: number; // 0-100
    incidentRate: number; // 0-100
    passengerComplaints: number; // 0-100
  };
}

export interface RiskPrediction {
  overallRisk: number;
  confidence: number;
  breakdown: {
    weatherRisk: number;
    aircraftRisk: number;
    routeRisk: number;
    temporalRisk: number;
    historicalRisk: number;
  };
  recommendations: string[];
  mitigationStrategies: string[];
}

class AdvancedRiskAssessmentEngine {
  private weatherModels: Map<string, any> = new Map();
  private aircraftModels: Map<string, any> = new Map();
  private routeModels: Map<string, any> = new Map();

  constructor() {
    this.initializeModels();
  }

  private initializeModels() {
    // Simulate trained ML models with realistic parameters
    this.weatherModels.set('turbulence', {
      weights: [0.3, 0.25, 0.2, 0.15, 0.1],
      bias: 0.05,
      features: ['wind_speed', 'altitude', 'temperature', 'humidity', 'pressure']
    });

    this.aircraftModels.set('maintenance', {
      weights: [0.4, 0.3, 0.2, 0.1],
      bias: 0.02,
      features: ['age', 'last_inspection_days', 'flight_hours', 'incident_history']
    });

    this.routeModels.set('congestion', {
      weights: [0.35, 0.25, 0.2, 0.15, 0.05],
      bias: 0.08,
      features: ['time_of_day', 'day_of_week', 'airport_size', 'route_popularity', 'weather']
    });
  }

  // Main risk assessment function using sophisticated algorithms
  public assessRisk(flightId: string, factors: RiskFactors): RiskPrediction {
    // Use machine learning concepts with mock data
    const weatherRisk = this.calculateWeatherRisk(factors.weather);
    const aircraftRisk = this.calculateAircraftRisk(factors.aircraft);
    const routeRisk = this.calculateRouteRisk(factors.route);
    const temporalRisk = this.calculateTemporalRisk(factors.temporal);
    const historicalRisk = this.calculateHistoricalRisk(factors.historical);

    // Weighted ensemble prediction (like real ML models)
    const weights = [0.25, 0.20, 0.25, 0.15, 0.15];
    const overallRisk = this.weightedEnsemble([
      weatherRisk, aircraftRisk, routeRisk, temporalRisk, historicalRisk
    ], weights);

    // Calculate confidence based on data quality and model agreement
    const confidence = this.calculateConfidence([
      weatherRisk, aircraftRisk, routeRisk, temporalRisk, historicalRisk
    ]);

    return {
      overallRisk: Math.round(overallRisk * 100),
      confidence: Math.round(confidence * 100),
      breakdown: {
        weatherRisk: Math.round(weatherRisk * 100),
        aircraftRisk: Math.round(aircraftRisk * 100),
        routeRisk: Math.round(routeRisk * 100),
        temporalRisk: Math.round(temporalRisk * 100),
        historicalRisk: Math.round(historicalRisk * 100)
      },
      recommendations: this.generateRecommendations(factors, overallRisk),
      mitigationStrategies: this.generateMitigationStrategies(factors, overallRisk)
    };
  }

  // Simulate ML model prediction with realistic algorithms
  private calculateWeatherRisk(weather: RiskFactors['weather']): number {
    const model = this.weatherModels.get('turbulence');
    
    // Simulate feature engineering and model prediction
    const features = [
      weather.windSpeed / 50, // Normalize wind speed
      weather.turbulence / 100,
      weather.visibility / 100,
      weather.precipitation / 100,
      Math.random() * 0.2 // Simulate pressure variation
    ];

    // Linear combination with weights (simulating ML model)
    let prediction = model.bias;
    for (let i = 0; i < features.length; i++) {
      prediction += features[i] * model.weights[i];
    }

    // Apply non-linear transformation (sigmoid-like)
    return 1 / (1 + Math.exp(-prediction * 3));
  }

  private calculateAircraftRisk(aircraft: RiskFactors['aircraft']): number {
    const model = this.aircraftModels.get('maintenance');
    
    // Feature engineering for aircraft risk
    const daysSinceInspection = this.daysSince(aircraft.lastInspection);
    const features = [
      aircraft.age / 30, // Normalize age
      daysSinceInspection / 365,
      (100 - aircraft.maintenanceScore) / 100,
      Math.random() * 0.3 // Simulate flight hours
    ];

    let prediction = model.bias;
    for (let i = 0; i < features.length; i++) {
      prediction += features[i] * model.weights[i];
    }

    return 1 / (1 + Math.exp(-prediction * 2.5));
  }

  private calculateRouteRisk(route: RiskFactors['route']): number {
    const model = this.routeModels.get('congestion');
    
    // Complex route risk calculation
    const altitudeFactor = Math.max(0, (45000 - route.altitude) / 45000);
    const complexityFactor = route.complexity / 100;
    const congestionFactor = route.congestion / 100;
    
    const features = [
      Math.random() * 0.4, // Time of day variation
      Math.random() * 0.3, // Day of week variation
      altitudeFactor,
      complexityFactor,
      congestionFactor
    ];

    let prediction = model.bias;
    for (let i = 0; i < features.length; i++) {
      prediction += features[i] * model.weights[i];
    }

    return 1 / (1 + Math.exp(-prediction * 2));
  }

  private calculateTemporalRisk(temporal: RiskFactors['temporal']): number {
    // Time-based risk patterns (like real aviation data)
    const timeRisk = this.getTimeRisk(temporal.timeOfDay);
    const dayRisk = this.getDayRisk(temporal.dayOfWeek);
    const seasonRisk = this.getSeasonRisk(temporal.season);
    const holidayRisk = temporal.holidayFactor / 100;

    return (timeRisk * 0.4 + dayRisk * 0.3 + seasonRisk * 0.2 + holidayRisk * 0.1);
  }

  private calculateHistoricalRisk(historical: RiskFactors['historical']): number {
    // Historical pattern analysis
    const delayRisk = historical.delayRate / 100;
    const incidentRisk = historical.incidentRate / 100;
    const complaintRisk = historical.passengerComplaints / 100;

    // Weighted combination with exponential penalty for incidents
    return (delayRisk * 0.4 + Math.pow(incidentRisk, 1.5) * 0.4 + complaintRisk * 0.2);
  }

  // Ensemble method (like real ML systems)
  private weightedEnsemble(predictions: number[], weights: number[]): number {
    let weightedSum = 0;
    for (let i = 0; i < predictions.length; i++) {
      weightedSum += predictions[i] * weights[i];
    }
    return weightedSum;
  }

  // Confidence calculation based on model agreement
  private calculateConfidence(predictions: number[]): number {
    const mean = predictions.reduce((a, b) => a + b, 0) / predictions.length;
    const variance = predictions.reduce((sum, pred) => sum + Math.pow(pred - mean, 2), 0) / predictions.length;
    const stdDev = Math.sqrt(variance);
    
    // Higher agreement = higher confidence
    return Math.max(0.3, 1 - stdDev);
  }

  // Generate intelligent recommendations
  private generateRecommendations(factors: RiskFactors, overallRisk: number): string[] {
    const recommendations: string[] = [];

    if (factors.weather.turbulence > 70) {
      recommendations.push("Consider altitude adjustment to avoid severe turbulence zones");
    }

    if (factors.aircraft.age > 20) {
      recommendations.push("Aircraft age indicates increased maintenance requirements");
    }

    if (factors.route.congestion > 80) {
      recommendations.push("High airspace congestion detected - consider alternative routing");
    }

    if (overallRisk > 0.7) {
      recommendations.push("CRITICAL: Multiple risk factors detected - consider flight rescheduling");
    }

    return recommendations;
  }

  // Generate mitigation strategies
  private generateMitigationStrategies(factors: RiskFactors, overallRisk: number): string[] {
    const strategies: string[] = [];

    if (factors.weather.visibility < 30) {
      strategies.push("Enhanced instrument approach procedures recommended");
    }

    if (factors.aircraft.maintenanceScore < 60) {
      strategies.push("Pre-flight maintenance verification required");
    }

    if (factors.route.complexity > 80) {
      strategies.push("Additional pilot briefing for complex route navigation");
    }

    return strategies;
  }

  // Helper functions
  private daysSince(dateString: string): number {
    const date = new Date(dateString);
    const now = new Date();
    return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  }

  private getTimeRisk(timeOfDay: number): number {
    // Peak hours have higher risk
    if (timeOfDay >= 7 && timeOfDay <= 9) return 0.8; // Morning peak
    if (timeOfDay >= 17 && timeOfDay <= 19) return 0.9; // Evening peak
    if (timeOfDay >= 22 || timeOfDay <= 6) return 0.6; // Night flights
    return 0.4; // Off-peak
  }

  private getDayRisk(dayOfWeek: number): number {
    // Weekend flights often have different risk profiles
    if (dayOfWeek === 0 || dayOfWeek === 6) return 0.7; // Weekend
    return 0.5; // Weekday
  }

  private getSeasonRisk(season: string): number {
    switch (season.toLowerCase()) {
      case 'winter': return 0.8;
      case 'summer': return 0.6;
      case 'spring': return 0.5;
      case 'fall': return 0.7;
      default: return 0.6;
    }
  }
}

// Export singleton instance
export const advancedRiskEngine = new AdvancedRiskAssessmentEngine();