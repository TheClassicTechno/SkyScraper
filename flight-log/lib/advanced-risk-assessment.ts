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

// Advanced Risk Assessment Engine
export class AdvancedRiskAssessmentEngine {
  private monteCarloSimulator: MonteCarloRiskSimulator;
  private bayesianEngine: BayesianInferenceEngine;
  private historicalData: HistoricalData;

  constructor() {
    this.monteCarloSimulator = new MonteCarloRiskSimulator({
      iterations: 10000,
      confidenceLevel: 0.95,
      riskThresholds: {
        safe: 20,
        caution: 35,
        highRisk: 55,
        noGo: 70
      }
    });

    this.bayesianEngine = new BayesianInferenceEngine();
    this.historicalData = this.loadHistoricalData();
  }

  private loadHistoricalData(): HistoricalData {
    // In a real implementation, this would load from a database
    return {
      weatherIncidents: {
        'Thunderstorms': 0.15,
        'Heavy Rain': 0.08,
        'Snow': 0.12,
        'Ice': 0.25,
        'Fog': 0.10,
        'High Winds': 0.18,
        'Clear': 0.02,
        'Partly Cloudy': 0.03,
        'Cloudy': 0.05,
        'Light Rain': 0.06
      },
      aircraftIncidents: {
        'Boeing 737-800': 0.03,
        'Boeing 737-900': 0.025,
        'Boeing 777-200': 0.04,
        'Boeing 787-8': 0.015,
        'Airbus A320': 0.035,
        'Airbus A321': 0.03,
        'Airbus A350': 0.02,
        'Embraer E175': 0.025,
        'Bombardier CRJ900': 0.045
      },
      routeIncidents: {
        'JFK-LAX': 0.04,
        'ORD-DEN': 0.03,
        'ATL-MIA': 0.025,
        'LAX-SFO': 0.035,
        'JFK-ORD': 0.03,
        'DFW-LAX': 0.04
      },
      timeOfDayIncidents: {
        '0-6': 0.02,
        '6-12': 0.04,
        '12-18': 0.06,
        '18-24': 0.03
      },
      seasonalFactors: {
        'winter': 1.1,
        'spring': 0.95,
        'summer': 1.05,
        'fall': 0.98
      }
    };
  }

  // Calculate temporal risk factors - ADJUSTED FOR CONSERVATIVE SCORING
  private calculateTemporalRisk(temporalFactors: AdvancedRiskFactors['temporalFactors']): number {
    let risk = 0;

    // Time of day risk - REDUCED VALUES
    const timeOfDay = temporalFactors.timeOfDay;
    if (timeOfDay >= 6 && timeOfDay <= 9) risk += 6; // Morning rush
    else if (timeOfDay >= 16 && timeOfDay <= 19) risk += 8; // Evening rush
    else if (timeOfDay >= 22 || timeOfDay <= 5) risk += 10; // Night operations

    // Day of week risk - REDUCED
    if (temporalFactors.dayOfWeek === 0 || temporalFactors.dayOfWeek === 6) risk += 3; // Weekend

    // Seasonal risk - REDUCED IMPACT
    const seasonalMultiplier = this.historicalData.seasonalFactors[temporalFactors.season] || 1.0;
    risk *= seasonalMultiplier;

    // Holiday factor - REDUCED IMPACT
    risk *= (1 + temporalFactors.holidayFactor * 0.1);

    return Math.min(25, Math.max(0, risk)); // CAPPED AT 25
  }

  // Calculate environmental risk factors - ADJUSTED FOR CONSERVATIVE SCORING
  private calculateEnvironmentalRisk(envFactors: AdvancedRiskFactors['environmentalFactors']): number {
    let risk = 0;

    // Solar activity impact - REDUCED VALUES
    if (envFactors.solarActivity > 0.7) risk += 6;
    else if (envFactors.solarActivity > 0.5) risk += 3;

    // Geomagnetic storms - REDUCED VALUES
    if (envFactors.geomagneticStorms > 0.6) risk += 8;
    else if (envFactors.geomagneticStorms > 0.3) risk += 4;

    // Atmospheric pressure - REDUCED IMPACT
    const pressureDeviation = Math.abs(envFactors.atmosphericPressure - 1013.25) / 1013.25;
    risk += pressureDeviation * 12;

    // Humidity - REDUCED
    if (envFactors.humidity > 0.8) risk += 2;

    return Math.min(20, Math.max(0, risk)); // CAPPED AT 20
  }

  // Main risk assessment function
  public assessRisk(factors: AdvancedRiskFactors): {
    riskScore: RiskScore;
    monteCarloResults: {
      overallRisk: number;
      confidenceInterval: [number, number];
      riskDistribution: number[];
      componentRisks: {
        weather: number;
        aircraft: number;
        route: number;
        events: number;
      };
    };
    bayesianResults: {
      riskProbability: number;
      confidence: number;
      evidenceStrength: number;
    };
    temporalRisk: number;
    environmentalRisk: number;
    uncertaintyAnalysis: {
      overallUncertainty: number;
      componentUncertainties: {
        weather: number;
        aircraft: number;
        route: number;
        events: number;
      };
    };
  } {
    // Run Monte Carlo simulation
    const monteCarloResults = this.monteCarloSimulator.runSimulation(factors);

    // Run Bayesian inference
    const bayesianResults = this.bayesianEngine.runInference(factors);

    // Calculate temporal and environmental risks
    const temporalRisk = this.calculateTemporalRisk(factors.temporalFactors);
    const environmentalRisk = this.calculateEnvironmentalRisk(factors.environmentalFactors);

    // Combine all risk factors with uncertainty weighting - ADJUSTED WEIGHTS AND CAPS
    const uncertaintyWeights = factors.uncertainty;
    const weightedRisk = 
      monteCarloResults.componentRisks.weather * 0.25 * (1 - uncertaintyWeights.weatherConfidence * 0.2) +
      monteCarloResults.componentRisks.aircraft * 0.2 * (1 - uncertaintyWeights.aircraftConfidence * 0.2) +
      monteCarloResults.componentRisks.route * 0.15 * (1 - uncertaintyWeights.routeConfidence * 0.2) +
      monteCarloResults.componentRisks.events * 0.25 * (1 - uncertaintyWeights.eventConfidence * 0.2) +
      temporalRisk * 0.08 +
      environmentalRisk * 0.07;

    const overallRisk = Math.round(Math.min(70, Math.max(0, weightedRisk))); // HARD CAP AT 70

    // Determine recommendation based on combined analysis - ADJUSTED THRESHOLDS
    let recommendation: RiskScore['recommendation'];
    if (overallRisk <= 20 && bayesianResults.riskProbability < 0.25) {
      recommendation = 'safe';
    } else if (overallRisk <= 35 && bayesianResults.riskProbability < 0.4) {
      recommendation = 'caution';
    } else if (overallRisk <= 55 && bayesianResults.riskProbability < 0.6) {
      recommendation = 'high-risk';
    } else {
      recommendation = 'no-go';
    }

    // Calculate uncertainty analysis
    const overallUncertainty = (
      uncertaintyWeights.weatherConfidence +
      uncertaintyWeights.aircraftConfidence +
      uncertaintyWeights.routeConfidence +
      uncertaintyWeights.eventConfidence
    ) / 4;

    return {
      riskScore: {
        overall: overallRisk,
        weather: monteCarloResults.componentRisks.weather,
        events: monteCarloResults.componentRisks.events,
        aircraft: monteCarloResults.componentRisks.aircraft,
        route: monteCarloResults.componentRisks.route,
        recommendation
      },
      monteCarloResults,
      bayesianResults,
      temporalRisk,
      environmentalRisk,
      uncertaintyAnalysis: {
        overallUncertainty,
        componentUncertainties: {
          weather: uncertaintyWeights.weatherConfidence,
          aircraft: uncertaintyWeights.aircraftConfidence,
          route: uncertaintyWeights.routeConfidence,
          events: uncertaintyWeights.eventConfidence
        }
      }
    };
  }
}

// Export the advanced assessment function
export function calculateAdvancedRiskScore(factors: AdvancedRiskFactors) {
  const engine = new AdvancedRiskAssessmentEngine();
  return engine.assessRisk(factors);
}