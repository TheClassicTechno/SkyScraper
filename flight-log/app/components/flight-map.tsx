'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Plane, Wind, Clock, MapPin } from 'lucide-react';

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false });

interface TurbulenceData {
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

interface FlightRoute {
  origin: { lat: number; lng: number; name: string };
  destination: { lat: number; lng: number; name: string };
  waypoints: Array<{ lat: number; lng: number; name?: string }>;
  currentPosition?: { lat: number; lng: number; altitude: number };
}

interface FlightMapProps {
  flightRoute: FlightRoute;
  turbulenceData: TurbulenceData[];
  className?: string;
}

const severityColors = {
  light: '#ffff00',
  moderate: '#ffa500',
  severe: '#ff0000',
  extreme: '#8b0000'
};

const severityLabels = {
  light: 'Light',
  moderate: 'Moderate',
  severe: 'Severe',
  extreme: 'Extreme'
};

const FlightMap: React.FC<FlightMapProps> = ({ flightRoute, turbulenceData, className }) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedTurbulence, setSelectedTurbulence] = useState<TurbulenceData | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Flight Route & Turbulence Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const center = {
    lat: (flightRoute.origin.lat + flightRoute.destination.lat) / 2,
    lng: (flightRoute.origin.lng + flightRoute.destination.lng) / 2
  };

  const routeCoordinates: [number, number][] = [
    [flightRoute.origin.lat, flightRoute.origin.lng],
    ...flightRoute.waypoints.map(wp => [wp.lat, wp.lng] as [number, number]),
    [flightRoute.destination.lat, flightRoute.destination.lng]
  ];

  const getTurbulenceRadius = (severity: string) => {
    switch (severity) {
      case 'light': return 5000;
      case 'moderate': return 8000;
      case 'severe': return 12000;
      case 'extreme': return 15000;
      default: return 5000;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Flight Route & Turbulence Map
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Plane className="h-3 w-3" />
            Route
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Wind className="h-3 w-3" />
            Turbulence
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            ETA to Smooth Air
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 rounded-lg overflow-hidden border">
          <MapContainer
            center={center}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Flight Route */}
            <Polyline
              positions={routeCoordinates}
              color="#3b82f6"
              weight={3}
              opacity={0.8}
            />

            {/* Origin Marker */}
            <Marker position={[flightRoute.origin.lat, flightRoute.origin.lng]}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold">Origin</h3>
                  <p>{flightRoute.origin.name}</p>
                </div>
              </Popup>
            </Marker>

            {/* Destination Marker */}
            <Marker position={[flightRoute.destination.lat, flightRoute.destination.lng]}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold">Destination</h3>
                  <p>{flightRoute.destination.name}</p>
                </div>
              </Popup>
            </Marker>

            {/* Current Position (if available) */}
            {flightRoute.currentPosition && (
              <Marker position={[flightRoute.currentPosition.lat, flightRoute.currentPosition.lng]}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-semibold">Current Position</h3>
                    <p>Altitude: {flightRoute.currentPosition.altitude} ft</p>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Turbulence Areas */}
            {turbulenceData.map((turbulence) => (
              <Circle
                key={turbulence.id}
                center={[turbulence.latitude, turbulence.longitude]}
                radius={getTurbulenceRadius(turbulence.severity)}
                pathOptions={{
                  color: severityColors[turbulence.severity],
                  fillColor: severityColors[turbulence.severity],
                  fillOpacity: 0.3,
                  weight: 2
                }}
                eventHandlers={{
                  click: () => setSelectedTurbulence(turbulence)
                }}
              >
                <Popup>
                  <div className="min-w-64">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className={`h-4 w-4 ${
                        turbulence.severity === 'extreme' || turbulence.severity === 'severe' 
                          ? 'text-red-500' 
                          : 'text-orange-500'
                      }`} />
                      <h3 className="font-semibold">
                        {severityLabels[turbulence.severity]} Turbulence
                      </h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">EDR Value:</span> {turbulence.edrValue.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-medium">Altitude:</span> {turbulence.altitude.toLocaleString()} ft
                      </div>
                      <div>
                        <span className="font-medium">Affected Range:</span> {turbulence.affectedAltitudeRange[0].toLocaleString()} - {turbulence.affectedAltitudeRange[1].toLocaleString()} ft
                      </div>
                      <div>
                        <span className="font-medium">Source:</span> {turbulence.source}
                      </div>
                      <div>
                        <span className="font-medium">ETA to Smooth Air:</span> {turbulence.etaToSmootherAir} min
                      </div>
                      <div>
                        <span className="font-medium">Description:</span> {turbulence.description}
                      </div>
                      <div className="text-xs text-gray-500">
                        Reported: {new Date(turbulence.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>

        {/* Turbulence Legend */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">Turbulence Severity Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(severityColors).map(([severity, color]) => (
              <div key={severity} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-medium">{severityLabels[severity as keyof typeof severityLabels]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Turbulence Details */}
        {selectedTurbulence && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-blue-900">
                {severityLabels[selectedTurbulence.severity]} Turbulence Details
              </h4>
              <button
                onClick={() => setSelectedTurbulence(null)}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">ETA to Smooth Air</span>
                </div>
                <Progress 
                  value={(selectedTurbulence.etaToSmootherAir / 60) * 100} 
                  className="h-2"
                />
                <p className="text-sm text-gray-600 mt-1">
                  {selectedTurbulence.etaToSmootherAir} minutes remaining
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">EDR Severity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${(selectedTurbulence.edrValue / 0.5) * 100}%`,
                        backgroundColor: severityColors[selectedTurbulence.severity]
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {selectedTurbulence.edrValue.toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-white rounded border">
              <p className="text-sm text-gray-700">{selectedTurbulence.description}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlightMap; 