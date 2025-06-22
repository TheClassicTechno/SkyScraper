'use client';

import React, { useEffect, useState } from 'react';
import { Plane, Wind, Cloud, Zap } from 'lucide-react';

interface AppleTimelineProps {
  turbulenceData: Array<{
    id: string;
    severity: 'light' | 'moderate' | 'severe' | 'extreme';
    description: string;
    latitude?: number;
    longitude?: number;
    altitude?: number;
    edrValue?: number;
    source?: string;
    timestamp?: string;
    etaToSmootherAir?: number;
    affectedAltitudeRange?: [number, number];
    weather_conditions?: string;
    wind_shear?: number;
    temperature_gradient?: number;
  }>;
  onSegmentClick: (turbulence: any) => void;
  className?: string;
}

const AppleTimeline: React.FC<AppleTimelineProps> = ({ 
  turbulenceData, 
  onSegmentClick, 
  className = '' 
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('⏰ AppleTimeline: Component mounted with', {
      turbulenceDataLength: turbulenceData.length,
      className
    });
  }, [turbulenceData.length, className]);

  // Start animation when component mounts
  useEffect(() => {
    console.log('⏰ AppleTimeline: Starting animation');
    setIsAnimating(true);
    const duration = 4000; // 4 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCurrentProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        console.log('⏰ AppleTimeline: Animation completed');
      }
    };

    requestAnimationFrame(animate);
  }, [turbulenceData]);

  // Get current turbulence at progress position
  const getCurrentTurbulence = () => {
    if (turbulenceData.length === 0) return null;
    const index = Math.floor(currentProgress * (turbulenceData.length - 1));
    return turbulenceData[index] || turbulenceData[0];
  };

  const currentTurbulence = getCurrentTurbulence();

  // Get icon for turbulence severity
  const getTurbulenceIcon = (severity: string) => {
    switch (severity) {
      case 'light':
        return <Wind className="w-4 h-4" />;
      case 'moderate':
        return <Cloud className="w-4 h-4" />;
      case 'severe':
        return <Zap className="w-4 h-4" />;
      case 'extreme':
        return <Zap className="w-4 h-4 text-red-500" />;
      default:
        return <Wind className="w-4 h-4" />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Timeline Bar */}
      <div className="relative h-3 apple-glass rounded-full overflow-hidden shadow-inner border border-gray-200/50">
        {/* Animated plane indicator */}
        <div 
          className="absolute top-0 left-0 w-6 h-6 -mt-1.5 transition-all duration-300 ease-out"
          style={{ 
            left: `${currentProgress * 100}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-lg border-2 border-blue-500 flex items-center justify-center animate-pulse">
            <Plane className="w-3 h-3 text-blue-600 transform rotate-45 animate-pulse" />
          </div>
        </div>

        {/* Progress glow effect */}
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400/30 to-transparent rounded-full transition-all duration-300"
          style={{ width: `${currentProgress * 100}%` }}
        />

        {/* Apple Maps-style gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-orange-300 via-red-400 to-red-600 opacity-80" />
      </div>

      {/* Current Status Indicator */}
      {currentTurbulence && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="apple-glass rounded-full px-4 py-2 shadow-lg border border-gray-200/50 flex items-center gap-2">
            {getTurbulenceIcon(currentTurbulence.severity)}
            <span className="text-sm font-medium text-gray-700">
              {currentTurbulence.severity.charAt(0).toUpperCase() + currentTurbulence.severity.slice(1)} Turbulence
            </span>
          </div>
        </div>
      )}

      {/* Flight Progress Labels */}
      <div className="flex justify-between mt-4 text-xs text-gray-600">
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mb-1 animate-pulse"></div>
          <span className="font-medium">Takeoff</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mb-1 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <span className="font-medium">25%</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mb-1 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <span className="font-medium">50%</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mb-1 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <span className="font-medium">75%</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mb-1 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <span className="font-medium">Landing</span>
        </div>
      </div>

      {/* Interactive Segments (hidden but clickable) */}
      <div className="absolute top-0 left-0 w-full h-3">
        {turbulenceData.map((turbulence, index) => {
          const progress = index / (turbulenceData.length - 1);
          const width = 100 / turbulenceData.length;
          return (
            <div
              key={turbulence.id}
              className="absolute h-full cursor-pointer opacity-0 hover:opacity-20 transition-opacity duration-200"
              style={{
                left: `${progress * 100}%`,
                width: `${width}%`,
                backgroundColor: 
                  turbulence.severity === 'light' ? '#fef3c7' :
                  turbulence.severity === 'moderate' ? '#fdba74' :
                  turbulence.severity === 'severe' ? '#f87171' : '#dc2626'
              }}
              onClick={() => onSegmentClick(turbulence)}
              title={`${Math.round(progress * 100)}% - ${turbulence.description}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AppleTimeline; 