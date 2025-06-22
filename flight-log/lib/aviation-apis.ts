import axios from 'axios';
import moment from 'moment';

// API Configuration - Only Free APIs
const API_CONFIG = {
  // OpenWeatherMap API (free tier available)
  openweather: {
    baseURL: 'https://api.openweathermap.org/data/2.5',
    apiKey: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '',
  },
  // Aviation Weather Center API (free)
  aviationWeather: {
    baseURL: 'https://aviationweather.gov/cgi-bin/data',
  },
};

// Types
export interface RealFlightData {
  icao24: string;
  callsign: string;
  origin_country: string;
  time_position: number;
  time_velocity: number;
  longitude: number;
  latitude: number;
  altitude: number;
  on_ground: boolean;
  velocity: number;
  true_track: number;
  vertical_rate: number;
  squawk: string;
  spi: boolean;
  position_source: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_direction: number;
  visibility: number;
  conditions: string;
  turbulence_index: number;
}

export interface TurbulenceReport {
  id: string;
  latitude: number;
  longitude: number;
  altitude: number;
  severity: 'light' | 'moderate' | 'severe' | 'extreme';
  edrValue: number;
  source: 'EDR' | 'PIREP' | 'WEATHER';
  timestamp: string;
  etaToSmootherAir: number;
  description: string;
  affectedAltitudeRange: [number, number];
  weather_conditions: string;
  wind_shear: number;
  temperature_gradient: number;
}

export interface FlightRoute {
  origin: { lat: number; lng: number; name: string; icao: string };
  destination: { lat: number; lng: number; name: string; icao: string };
  waypoints: Array<{ lat: number; lng: number; name?: string; icao?: string }>;
  currentPosition?: { lat: number; lng: number; altitude: number; timestamp: number };
  flightNumber?: string;
  aircraftType?: string;
}

// Aviation API Service - Free APIs Only
class AviationAPIService {
  private async makeRequest(url: string, params: any = {}, headers: any = {}) {
    try {
      const response = await axios.get(url, { params, headers, timeout: 10000 });
      return response.data;
    } catch (error) {
      console.error(`API request failed for ${url}:`, error);
      return null;
    }
  }

  // Get real-time flight data from OpenSky Network (free API)
  async getRealTimeFlightData(flightNumber?: string, bounds?: [number, number, number, number]): Promise<RealFlightData[]> {
    try {
      const url = 'https://opensky-network.org/api/states/all';
      const params: any = {};
      
      if (bounds) {
        params.lamin = bounds[0];
        params.lomin = bounds[1];
        params.lamax = bounds[2];
        params.lomax = bounds[3];
      }

      const response = await axios.get(url, { params, timeout: 15000 });
      
      if (response.data && response.data.states) {
        let flights = response.data.states.map((state: any) => ({
          icao24: state[0],
          callsign: state[1]?.trim(),
          origin_country: state[2],
          time_position: state[3],
          time_velocity: state[4],
          longitude: state[5],
          latitude: state[6],
          altitude: state[7],
          on_ground: state[8],
          velocity: state[9],
          true_track: state[10],
          vertical_rate: state[11],
          squawk: state[12],
          spi: state[13],
          position_source: state[14]
        }));

        // Filter by flight number if provided
        if (flightNumber) {
          flights = flights.filter((flight: RealFlightData) => 
            flight.callsign && flight.callsign.includes(flightNumber)
          );
        }

        return flights.filter((flight: RealFlightData) => 
          flight.latitude && flight.longitude && flight.altitude
        );
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching real-time flight data:', error);
      return [];
    }
  }

  // Get weather data for specific coordinates (OpenWeatherMap only)
  async getWeatherData(lat: number, lng: number): Promise<WeatherData | null> {
    try {
      // Use OpenWeatherMap
      if (API_CONFIG.openweather.apiKey) {
        const url = `${API_CONFIG.openweather.baseURL}/weather`;
        const params = {
          lat,
          lon: lng,
          appid: API_CONFIG.openweather.apiKey,
          units: 'metric'
        };

        const data = await this.makeRequest(url, params);
        if (data) {
          return {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            wind_direction: data.wind.deg,
            visibility: data.visibility / 1000, // Convert to km
            conditions: data.weather[0].main,
            turbulence_index: this.calculateTurbulenceIndex(data)
          };
        }
      }

      // If no API key, return simulated weather data
      return this.getSimulatedWeatherData(lat, lng);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getSimulatedWeatherData(lat, lng);
    }
  }

  // Simulated weather data when API key is not available
  private getSimulatedWeatherData(lat: number, lng: number): WeatherData {
    // Generate realistic weather based on location and time
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour <= 18;
    
    return {
      temperature: 15 + Math.sin((hour - 6) * Math.PI / 12) * 10 + (Math.random() - 0.5) * 5,
      humidity: 60 + Math.random() * 30,
      pressure: 1013 + (Math.random() - 0.5) * 20,
      wind_speed: 5 + Math.random() * 15,
      wind_direction: Math.random() * 360,
      visibility: 10 + Math.random() * 20,
      conditions: isDay ? 'Clear' : 'Clear',
      turbulence_index: 2 + Math.random() * 3
    };
  }

  // Get PIREPs (Pilot Reports) from Aviation Weather Center
  async getPIREPs(bounds?: [number, number, number, number]): Promise<any[]> {
    try {
      const url = `${API_CONFIG.aviationWeather.baseURL}/pirep.php`;
      const params: any = {
        format: 'json',
        type: 'all'
      };

      if (bounds) {
        params.bbox = `${bounds[0]},${bounds[1]},${bounds[2]},${bounds[3]}`;
      }

      const data = await this.makeRequest(url, params);
      return data?.features || [];
    } catch (error) {
      console.error('Error fetching PIREPs:', error);
      return [];
    }
  }

  // Get SIGMETs (Significant Meteorological Information)
  async getSIGMETs(): Promise<any[]> {
    try {
      const url = `${API_CONFIG.aviationWeather.baseURL}/sigmet.php`;
      const params = {
        format: 'json',
        type: 'all'
      };

      const data = await this.makeRequest(url, params);
      return data?.features || [];
    } catch (error) {
      console.error('Error fetching SIGMETs:', error);
      return [];
    }
  }

  // Calculate turbulence index from weather data
  private calculateTurbulenceIndex(weatherData: any): number {
    let index = 0;
    
    // Wind speed factor
    if (weatherData.wind.speed > 20) index += 2;
    else if (weatherData.wind.speed > 15) index += 1;
    
    // Wind shear factor
    if (weatherData.wind.gust) {
      const gustFactor = weatherData.wind.gust - weatherData.wind.speed;
      if (gustFactor > 10) index += 3;
      else if (gustFactor > 5) index += 2;
    }
    
    // Temperature gradient factor
    if (weatherData.main.temp < -20 || weatherData.main.temp > 35) index += 1;
    
    // Pressure gradient factor
    if (weatherData.main.pressure < 1000 || weatherData.main.pressure > 1030) index += 1;
    
    return Math.min(index, 10); // Cap at 10
  }

  // Get comprehensive turbulence data
  async getTurbulenceData(route: FlightRoute): Promise<TurbulenceReport[]> {
    const turbulenceReports: TurbulenceReport[] = [];
    
    try {
      // Get weather data along the route
      const routePoints = [
        { lat: route.origin.lat, lng: route.origin.lng },
        ...route.waypoints,
        { lat: route.destination.lat, lng: route.destination.lng }
      ];

      // Sample weather data at multiple points along the route
      for (let i = 0; i < routePoints.length; i++) {
        const point = routePoints[i];
        const weather = await this.getWeatherData(point.lat, point.lng);
        
        if (weather && weather.turbulence_index > 3) {
          const severity = this.getTurbulenceSeverity(weather.turbulence_index);
          const edrValue = this.calculateEDR(weather);
          
          turbulenceReports.push({
            id: `weather-${i}-${Date.now()}`,
            latitude: point.lat,
            longitude: point.lng,
            altitude: 35000, // Typical cruising altitude
            severity,
            edrValue,
            source: 'WEATHER',
            timestamp: new Date().toISOString(),
            etaToSmootherAir: this.calculateETAtoSmootherAir(point, route.currentPosition),
            description: `Weather-based turbulence: ${weather.conditions} with wind speed ${weather.wind_speed.toFixed(1)} m/s`,
            affectedAltitudeRange: [30000, 40000],
            weather_conditions: weather.conditions,
            wind_shear: weather.wind_speed,
            temperature_gradient: weather.temperature
          });
        }
      }

      // Get PIREPs
      const bounds: [number, number, number, number] = [
        Math.min(...routePoints.map(p => p.lat)) - 1,
        Math.min(...routePoints.map(p => p.lng)) - 1,
        Math.max(...routePoints.map(p => p.lat)) + 1,
        Math.max(...routePoints.map(p => p.lng)) + 1
      ];

      const pireps = await this.getPIREPs(bounds);
      
      pireps.forEach((pirep: any, index: number) => {
        if (pirep.geometry && pirep.properties) {
          const coords = pirep.geometry.coordinates;
          const props = pirep.properties;
          
          if (coords && coords.length >= 2) {
            const severity = this.parsePIREPSeverity(props.raw_text || '');
            const edrValue = this.estimateEDRFromPIREP(severity);
            
            turbulenceReports.push({
              id: `pirep-${index}-${Date.now()}`,
              latitude: coords[1],
              longitude: coords[0],
              altitude: props.altitude_ft || 35000,
              severity,
              edrValue,
              source: 'PIREP',
              timestamp: props.obs_time || new Date().toISOString(),
              etaToSmootherAir: this.calculateETAtoSmootherAir(
                { lat: coords[1], lng: coords[0] },
                route.currentPosition
              ),
              description: props.raw_text || 'Pilot reported turbulence',
              affectedAltitudeRange: [
                (props.altitude_ft || 35000) - 2000,
                (props.altitude_ft || 35000) + 2000
              ],
              weather_conditions: 'PIREP',
              wind_shear: 0,
              temperature_gradient: 0
            });
          }
        }
      });

      // Get SIGMETs for severe weather
      const sigmets = await this.getSIGMETs();
      
      sigmets.forEach((sigmet: any, index: number) => {
        if (sigmet.geometry && sigmet.properties) {
          const coords = sigmet.geometry.coordinates[0]; // First polygon
          const props = sigmet.properties;
          
          if (coords && coords.length > 0) {
            // Use centroid of SIGMET area
            const centroid = this.calculateCentroid(coords);
            
            turbulenceReports.push({
              id: `sigmet-${index}-${Date.now()}`,
              latitude: centroid[1],
              longitude: centroid[0],
              altitude: 35000,
              severity: 'severe',
              edrValue: 0.4,
              source: 'EDR',
              timestamp: new Date().toISOString(),
              etaToSmootherAir: this.calculateETAtoSmootherAir(
                { lat: centroid[1], lng: centroid[0] },
                route.currentPosition
              ),
              description: `SIGMET: ${props.raw_text || 'Severe weather conditions'}`,
              affectedAltitudeRange: [25000, 45000],
              weather_conditions: 'SIGMET',
              wind_shear: 0,
              temperature_gradient: 0
            });
          }
        }
      });

    } catch (error) {
      console.error('Error fetching comprehensive turbulence data:', error);
    }

    return turbulenceReports.sort((a, b) => {
      const severityOrder = { extreme: 4, severe: 3, moderate: 2, light: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }

  // Helper methods
  private getTurbulenceSeverity(index: number): 'light' | 'moderate' | 'severe' | 'extreme' {
    if (index >= 8) return 'extreme';
    if (index >= 6) return 'severe';
    if (index >= 4) return 'moderate';
    return 'light';
  }

  private calculateEDR(weather: WeatherData): number {
    // Simplified EDR calculation based on weather conditions
    let edr = 0.1; // Base value
    
    if (weather.wind_speed > 20) edr += 0.2;
    if (weather.turbulence_index > 6) edr += 0.15;
    if (weather.conditions.includes('Thunderstorm')) edr += 0.25;
    
    return Math.min(edr, 0.5);
  }

  private estimateEDRFromPIREP(severity: string): number {
    switch (severity) {
      case 'extreme': return 0.45;
      case 'severe': return 0.35;
      case 'moderate': return 0.25;
      case 'light': return 0.15;
      default: return 0.2;
    }
  }

  private parsePIREPSeverity(rawText: string): 'light' | 'moderate' | 'severe' | 'extreme' {
    const text = rawText.toLowerCase();
    if (text.includes('extreme') || text.includes('severe turbulence')) return 'extreme';
    if (text.includes('severe') || text.includes('moderate to severe')) return 'severe';
    if (text.includes('moderate') || text.includes('light to moderate')) return 'moderate';
    return 'light';
  }

  private calculateETAtoSmootherAir(
    turbulencePoint: { lat: number; lng: number },
    currentPosition?: { lat: number; lng: number; altitude: number }
  ): number {
    if (!currentPosition) return 30; // Default 30 minutes
    
    const R = 6371; // Earth's radius in km
    const lat1 = currentPosition.lat * Math.PI / 180;
    const lat2 = turbulencePoint.lat * Math.PI / 180;
    const dLat = (turbulencePoint.lat - currentPosition.lat) * Math.PI / 180;
    const dLng = (turbulencePoint.lng - currentPosition.lng) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    const aircraftSpeed = 800; // km/h
    return Math.round((distance / aircraftSpeed) * 60); // Convert to minutes
  }

  private calculateCentroid(coords: number[][]): [number, number] {
    let x = 0, y = 0;
    for (const coord of coords) {
      x += coord[0];
      y += coord[1];
    }
    return [x / coords.length, y / coords.length];
  }

  // Get flight route information
  async getFlightRoute(flightNumber: string): Promise<FlightRoute | null> {
    try {
      // Try to get flight data from OpenSky
      const flights = await this.getRealTimeFlightData(flightNumber);
      
      if (flights.length > 0) {
        const flight = flights[0];
        return {
          origin: { lat: 0, lng: 0, name: 'Unknown', icao: 'UNKN' },
          destination: { lat: 0, lng: 0, name: 'Unknown', icao: 'UNKN' },
          waypoints: [],
          currentPosition: {
            lat: flight.latitude,
            lng: flight.longitude,
            altitude: flight.altitude,
            timestamp: flight.time_position
          },
          flightNumber: flight.callsign,
          aircraftType: 'Unknown'
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching flight route:', error);
      return null;
    }
  }
}

export const aviationAPIService = new AviationAPIService(); 