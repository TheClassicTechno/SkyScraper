'use client';

import React, { useState } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

interface RadarTimeSliderProps {
  onTimeChange: (timeOffset: number) => void;
  className?: string;
}

const RadarTimeSlider: React.FC<RadarTimeSliderProps> = ({ onTimeChange, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Minutes from current time
  const [isDragging, setIsDragging] = useState(false);

  const maxTime = 60; // 1 hour of radar data

  const handleSliderChange = (value: number) => {
    setCurrentTime(value);
    onTimeChange(value);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentTime(0);
    onTimeChange(0);
    setIsPlaying(false);
  };

  const formatTime = (minutes: number) => {
    if (minutes === 0) return 'Now';
    if (minutes < 0) return `${Math.abs(minutes)}m ago`;
    return `+${minutes}m`;
  };

  return (
    <div className={`apple-glass p-4 rounded-lg border border-gray-200/50 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Radar Timeline</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayPause}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={handleReset}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {/* Time display */}
        <div className="text-center">
          <span className="text-lg font-semibold text-gray-800">
            {formatTime(currentTime)}
          </span>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min={-maxTime}
            max={0}
            value={currentTime}
            onChange={(e) => handleSliderChange(parseInt(e.target.value))}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((currentTime + maxTime) / maxTime) * 100}%, #e5e7eb ${((currentTime + maxTime) / maxTime) * 100}%, #e5e7eb 100%)`
            }}
          />
          
          {/* Slider thumb */}
          <div
            className="absolute top-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-lg transform -translate-y-1/2 transition-transform duration-200"
            style={{
              left: `${((currentTime + maxTime) / maxTime) * 100}%`,
              transform: `translate(-50%, -50%) ${isDragging ? 'scale(1.2)' : 'scale(1)'}`
            }}
          />
        </div>

        {/* Time labels */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>1h ago</span>
          <span>30m ago</span>
          <span>Now</span>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default RadarTimeSlider; 