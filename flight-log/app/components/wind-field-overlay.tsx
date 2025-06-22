'use client';

import React, { useEffect, useRef, useState } from 'react';

interface WindFieldOverlayProps {
  map: any;
  visible: boolean;
  intensity: number; // 0-1 scale for wind intensity
}

interface WindData {
  header: {
    parameterNumberName: string;
    parameterUnit: string;
    dx: number;
    dy: number;
    la1: number;
    la2: number;
    lo1: number;
    lo2: number;
    nx: number;
    ny: number;
    parameterNumber: number;
    refTime: string;
  };
  data: number[];
}

const WindFieldOverlay: React.FC<WindFieldOverlayProps> = ({ map, visible, intensity }) => {
  const windLayerRef = useRef<any>(null);
  const [windData, setWindData] = useState<WindData | null>(null);

  // Generate mock wind data for demonstration
  const generateMockWindData = (): WindData => {
    const nx = 50;
    const ny = 50;
    const data = [];
    
    for (let i = 0; i < nx * ny; i++) {
      // Generate wind vectors (u and v components)
      const u = (Math.random() - 0.5) * 20 * intensity; // East-west component
      const v = (Math.random() - 0.5) * 20 * intensity; // North-south component
      data.push(u, v);
    }

    return {
      header: {
        parameterNumberName: 'Wind',
        parameterUnit: 'm/s',
        dx: 0.5,
        dy: 0.5,
        la1: 90,
        la2: -90,
        lo1: -180,
        lo2: 180,
        nx,
        ny,
        parameterNumber: 2,
        refTime: new Date().toISOString()
      },
      data
    };
  };

  useEffect(() => {
    console.log('🌪️ WindFieldOverlay useEffect:', { map: !!map, visible, intensity });
    
    if (!map || !visible) {
      console.log('🌪️ WindFieldOverlay: Skipping - map or visible not ready');
      return;
    }

    // Generate wind data
    const data = generateMockWindData();
    setWindData(data);
    console.log('🌪️ WindFieldOverlay: Generated wind data');

    // Create wind layer if available
    if (windLayerRef.current) {
      console.log('🌪️ WindFieldOverlay: Removing existing wind layer');
      map.removeLayer(windLayerRef.current);
    }

    // Check if wind layer is available
    if (typeof window !== 'undefined' && (window as any).L && (window as any).L.WindLayer) {
      console.log('🌪️ WindFieldOverlay: Creating new wind layer');
      try {
        const windLayer = new (window as any).L.WindLayer(data, {
          frameRate: 20,
          speedFactor: 0.25 * intensity,
          dropRate: 0.003,
          dropRateBump: 0.01,
          speedExp: 0.15,
          lineWidth: 2,
          particleAge: 90,
          fadeOpacity: 0.996,
          streamlineSteps: 100,
          streamlineTime: 0.5,
          particleMultiplier: 1 / 300,
          maxParticles: 5000,
          velocityScale: 0.005 * intensity,
          colorScale: [
            [0, '#ffffff'],
            [0.2, '#87ceeb'],
            [0.4, '#4682b4'],
            [0.6, '#4169e1'],
            [0.8, '#0000cd'],
            [1, '#000080']
          ]
        });

        windLayerRef.current = windLayer;
        map.addLayer(windLayer);
        console.log('✅ WindFieldOverlay: Wind layer added successfully');
      } catch (error) {
        console.warn('❌ WindFieldOverlay: Failed to create wind layer:', error);
      }
    } else {
      console.warn('❌ WindFieldOverlay: WindLayer not available', {
        hasWindow: typeof window !== 'undefined',
        hasL: !!(window as any).L,
        hasWindLayer: !!(window as any).L?.WindLayer
      });
    }

    return () => {
      if (windLayerRef.current && map) {
        console.log('🌪️ WindFieldOverlay: Cleaning up wind layer');
        map.removeLayer(windLayerRef.current);
      }
    };
  }, [map, visible, intensity]);

  return null; // This component doesn't render anything visible
};

export default WindFieldOverlay; 