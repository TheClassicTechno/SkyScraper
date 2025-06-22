'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plane, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { getRealFlightData, getWeatherData, type FlightRoute } from '@/lib/turbulence-data';
import { aviationAPIService, type RealFlightData } from '@/lib/aviation-apis';

interface FlightSearchProps {
  onFlightSelect: (route: FlightRoute) => void;
  className?: string;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ onFlightSelect, className }) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<RealFlightData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!flightNumber.trim()) {
      setError('Please enter a flight number');
      return;
    }

    setIsSearching(true);
    setError(null);
    setSearchResults([]);

    try {
      const flights = await getRealFlightData(flightNumber);
      
      if (flights.length === 0) {
        setError('No flights found with that flight number');
      } else {
        setSearchResults(flights);
      }
    } catch (error) {
      setError('Error searching for flights. Please try again.');
      console.error('Flight search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFlightSelect = async (flight: RealFlightData) => {
    try {
      // Create a flight route from the real flight data
      const route: FlightRoute = {
        origin: { 
          lat: 0, 
          lng: 0, 
          name: 'Unknown Origin', 
          icao: 'UNKN' 
        },
        destination: { 
          lat: 0, 
          lng: 0, 
          name: 'Unknown Destination', 
          icao: 'UNKN' 
        },
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

      onFlightSelect(route);
    } catch (error) {
      console.error('Error selecting flight:', error);
      setError('Error selecting flight. Please try again.');
    }
  };

  const formatFlightInfo = (flight: RealFlightData) => {
    const timestamp = flight.time_position ? new Date(flight.time_position * 1000) : new Date();
    const timeAgo = Math.floor((Date.now() - timestamp.getTime()) / 60000); // minutes ago
    
    return {
      timeAgo: timeAgo < 1 ? 'Just now' : `${timeAgo} min ago`,
      altitude: flight.altitude ? `${Math.round(flight.altitude * 0.3048)}m` : 'Unknown',
      speed: flight.velocity ? `${Math.round(flight.velocity * 1.852)} km/h` : 'Unknown',
      track: flight.true_track ? `${Math.round(flight.true_track)}°` : 'Unknown'
    };
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Real Flights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter flight number (e.g., AA123, UAL456)"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">
              Found {searchResults.length} flight(s)
            </h3>
            
            {searchResults.map((flight, index) => {
              const info = formatFlightInfo(flight);
              
              return (
                <div 
                  key={`${flight.icao24}-${index}`}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleFlightSelect(flight)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-lg">
                        {flight.callsign || 'Unknown'}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {flight.origin_country || 'Unknown'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {info.timeAgo}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium">Position</div>
                        <div className="text-gray-600">
                          {flight.latitude?.toFixed(4)}, {flight.longitude?.toFixed(4)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 text-gray-400">⛰️</div>
                      <div>
                        <div className="font-medium">Altitude</div>
                        <div className="text-gray-600">{info.altitude}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 text-gray-400">🚀</div>
                      <div>
                        <div className="font-medium">Speed</div>
                        <div className="text-gray-600">{info.speed}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 text-gray-400">🧭</div>
                      <div>
                        <div className="font-medium">Track</div>
                        <div className="text-gray-600">{info.track}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>ICAO24: {flight.icao24}</span>
                      <span>Status: {flight.on_ground ? 'On Ground' : 'In Flight'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <div className="font-medium mb-1">Data Sources:</div>
          <ul className="space-y-1">
            <li>• OpenSky Network - Real-time flight tracking (Free)</li>
            <li>• Aviation Weather Center - PIREPs and SIGMETs (Free)</li>
            <li>• OpenWeatherMap - Weather conditions (Free tier available)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightSearch; 