'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FlightRoute, TurbulenceData } from '@/lib/turbulence-data';
import { FlightRecommendation } from '@/lib/ai-flight-recommendations';
import { AlternativeFlight } from '@/lib/flight-risk-assessment';

// Extended recommendation type that includes flight information
interface ExtendedFlightRecommendation extends FlightRecommendation {
  flight: AlternativeFlight;
  bookingOptions?: string[];
  availability?: boolean;
  riskImprovement?: number;
  priceComparison?: {
    originalPrice: number;
    alternativePrice: number;
    savings: number;
  };
}

interface AIRecommendationsPanelProps {
  currentRoute: FlightRoute;
  turbulenceData: TurbulenceData[];
  onRouteSelect?: (route: FlightRoute) => void;
}

export default function AIRecommendationsPanel({
  currentRoute,
  turbulenceData,
  onRouteSelect
}: AIRecommendationsPanelProps) {
  const [recommendations, setRecommendations] = useState<ExtendedFlightRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<'safety' | 'efficiency' | 'comfort' | 'balanced'>('balanced');
  const [selectedAircraft, setSelectedAircraft] = useState('B737');
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null);

  const aircraftTypes = [
    { value: 'B737', label: 'Boeing 737' },
    { value: 'B777', label: 'Boeing 777' },
    { value: 'A320', label: 'Airbus A320' },
    { value: 'A350', label: 'Airbus A350' },
    { value: 'CRJ', label: 'Bombardier CRJ' }
  ];

  const priorityOptions = [
    { value: 'safety', label: 'Safety First', description: 'Prioritize turbulence avoidance' },
    { value: 'efficiency', label: 'Fuel Efficiency', description: 'Optimize for fuel savings' },
    { value: 'comfort', label: 'Passenger Comfort', description: 'Minimize passenger discomfort' },
    { value: 'balanced', label: 'Balanced', description: 'Balance all factors' }
  ];

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          route: currentRoute,
          aircraftType: selectedAircraft,
          priority: selectedPriority,
          includeTurbulenceData: true
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } else {
        console.error('Failed to generate recommendations');
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only generate recommendations when the component first mounts with valid data
    // Remove automatic generation on priority/aircraft changes to prevent rapid API calls
    if (currentRoute && turbulenceData.length > 0 && recommendations.length === 0) {
      generateRecommendations();
    }
  }, [currentRoute, turbulenceData]); // Removed selectedPriority and selectedAircraft from dependencies

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'safety': return 'bg-red-100 text-red-800';
      case 'efficiency': return 'bg-blue-100 text-blue-800';
      case 'comfort': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-blue-600">🤖</span>
            AI Flight Recommendations
          </CardTitle>
          <CardDescription>
            Intelligent route optimization based on real-time weather and aircraft capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Aircraft Type</label>
              <Select value={selectedAircraft} onValueChange={setSelectedAircraft}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {aircraftTypes.map(aircraft => (
                    <SelectItem key={aircraft.value} value={aircraft.value}>
                      {aircraft.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <Select value={selectedPriority} onValueChange={(value: 'safety' | 'efficiency' | 'comfort' | 'balanced') => setSelectedPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={generateRecommendations} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Analyzing Routes...' : 'Generate Recommendations'}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recommended Routes</h3>
            <Badge variant="outline">
              {recommendations.length} alternatives analyzed
            </Badge>
          </div>

          {recommendations.map((recommendation, index) => (
            <Card 
              key={recommendation.id}
              className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                expandedRecommendation === recommendation.id ? 'ring-2 ring-blue-200' : ''
              }`}
              onClick={() => setExpandedRecommendation(
                expandedRecommendation === recommendation.id ? null : recommendation.id
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {recommendation.flight.airline} {recommendation.flight.id}
                      </CardTitle>
                      <CardDescription>
                        {recommendation.flight.departure} → {recommendation.flight.arrival} • 
                        {recommendation.timePenalty > 0 ? ` +${formatTime(recommendation.timePenalty)}` : ' No delay'}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(recommendation.priority)}>
                      {recommendation.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Time Impact</div>
                    <div className="text-lg font-semibold text-blue-600">
                      {recommendation.timePenalty > 0 ? `+${formatTime(recommendation.timePenalty)}` : 'No delay'}
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm font-medium">Fuel Savings</div>
                    <div className="text-lg font-semibold text-green-600">
                      {recommendation.fuelSavings > 0 ? `+${recommendation.fuelSavings}%` : `${recommendation.fuelSavings}%`}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRecommendation === recommendation.id && (
                  <div className="space-y-3 pt-4 border-t">
                    <div>
                      <h4 className="font-medium mb-2">AI Explanation</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Weather:</strong> {recommendation.explanation.weatherAvoidance}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Flight Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Flight Number</div>
                          <div className="font-medium">{recommendation.flight.id}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Airline</div>
                          <div className="font-medium">{recommendation.flight.airline}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Departure</div>
                          <div className="font-medium">{recommendation.flight.departureTime}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Arrival</div>
                          <div className="font-medium">{recommendation.flight.arrivalTime}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Price</div>
                          <div className="font-medium">${recommendation.flight.price}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Risk Score</div>
                          <div className="font-medium">{recommendation.flight.riskScore}/100</div>
                        </div>
                      </div>
                    </div>

                    {onRouteSelect && (
                      <Button 
                        onClick={() => onRouteSelect(recommendation.route)}
                        className="w-full"
                        variant="outline"
                      >
                        Use This Route
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Recommendations State */}
      {!loading && recommendations.length === 0 && currentRoute && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-gray-500">
              <div className="text-4xl mb-2">🤖</div>
              <div className="font-medium">No AI recommendations available</div>
              <div className="text-sm">Try adjusting your aircraft type or priority settings</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 