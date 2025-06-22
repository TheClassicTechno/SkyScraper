'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RadarOverlayProps {
  map: any;
  visible: boolean;
  opacity: number;
  timeOffset?: number; // Minutes from current time
}

const RadarOverlay: React.FC<RadarOverlayProps> = ({ 
  map, 
  visible, 
  opacity = 0.5,
  timeOffset = 0 
}) => {
  const radarLayerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!map || !visible) return;

    // Remove existing layer
    if (radarLayerRef.current) {
      map.removeLayer(radarLayerRef.current);
    }

    // Create radar tile layer
    try {
      // Use a mock radar tile source for demonstration
      // In production, you'd use NOAA NEXRAD or a commercial provider
      const radarLayer = (window as any).L.tileLayer(
        'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=demo', // Mock URL
        {
          opacity: opacity,
          attribution: 'Weather Data',
          zIndex: 1000,
          // Add time parameter for historical data
          time: new Date(currentTime.getTime() + timeOffset * 60000).toISOString()
        }
      );

      radarLayerRef.current = radarLayer;
      map.addLayer(radarLayer);
    } catch (error) {
      console.warn('Radar layer not available:', error);
      
      // Fallback: create a simple colored overlay
      const bounds = map.getBounds();
      const fallbackLayer = (window as any).L.rectangle(bounds, {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: opacity * 0.3,
        weight: 0
      });
      
      radarLayerRef.current = fallbackLayer;
      map.addLayer(fallbackLayer);
    }

    return () => {
      if (radarLayerRef.current && map) {
        map.removeLayer(radarLayerRef.current);
      }
    };
  }, [map, visible, opacity, timeOffset, currentTime]);

  return null;
};

export default RadarOverlay; 