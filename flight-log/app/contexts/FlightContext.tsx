'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type FlightDataType = any; // You can replace 'any' with a precise type if desired

type FlightContextType = {
  flightData: FlightDataType | null;
  setFlightData: (data: FlightDataType) => void;
  clearFlightData: () => void;
};

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [flightData, setFlightDataState] = useState<FlightDataType | null>(null);

  const setFlightData = (data: FlightDataType) => setFlightDataState(data);
  const clearFlightData = () => setFlightDataState(null);

  return (
    <FlightContext.Provider value={{ flightData, setFlightData, clearFlightData }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlight must be used within a FlightProvider');
  }
  return context;
};
