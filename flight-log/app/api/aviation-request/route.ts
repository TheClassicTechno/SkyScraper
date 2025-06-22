/**
 * Flight data API with THREE hardcoded flights only
 * Provides complete flight path data for DL1102, AA456, and BA001
 */
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const FLIGHTLABS_API_KEY = process.env.FLIGHTLABS_API_KEY;

// THREE hardcoded flights with specific stats
const HARDCODED_FLIGHTS: Record<string, any> = {
  'DL1102': {
    pagination: {
      limit: 100,
      offset: 0,
      count: 1,
      total: 1
    },
    data: [
      {
        flight_date: new Date().toISOString().split('T')[0],
        flight_status: "scheduled",
        departure: {
          airport: "Hartsfield-Jackson Atlanta International Airport",
          timezone: "America/New_York",
          iata: "ATL",
          icao: "KATL",
          terminal: "A",
          gate: "12",
          delay: 0,
          scheduled: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          estimated: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          actual: null,
          estimated_runway: null,
          actual_runway: null
        },
        arrival: {
          airport: "Miami International Airport",
          timezone: "America/New_York",
          iata: "MIA",
          icao: "KMIA",
          terminal: "B",
          gate: "15",
          baggage: "3",
          scheduled: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          delay: null,
          estimated: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          actual: null,
          estimated_runway: null,
          actual_runway: null
        },
        airline: {
          name: "Delta Airlines",
          iata: "DL",
          icao: "DL"
        },
        flight: {
          number: "1102",
          iata: "DL1102",
          icao: "DL1102",
          codeshared: null
        },
        aircraft: {
          registration: "N12345",
          iata: "B738",
          icao: "B738",
          model: "Boeing 737-800"
        },
        live: null,
        route: {
          waypoints: ["ATL", "MIA"],
          distance: 965,
          duration: 135
        }
      }
    ],
    source: 'hardcoded'
  },
  'AA456': {
    pagination: {
      limit: 100,
      offset: 0,
      count: 1,
      total: 1
    },
    data: [
      {
        flight_date: new Date().toISOString().split('T')[0],
        flight_status: "scheduled",
        departure: {
          airport: "John F. Kennedy International Airport",
          timezone: "America/New_York",
          iata: "JFK",
          icao: "KJFK",
          terminal: "8",
          gate: "A5",
          delay: 15,
          scheduled: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
          estimated: new Date(Date.now() + 1.25 * 60 * 60 * 1000).toISOString(),
          actual: null,
          estimated_runway: null,
          actual_runway: null
        },
        arrival: {
          airport: "Los Angeles International Airport",
          timezone: "America/Los_Angeles",
          iata: "LAX",
          icao: "KLAX",
          terminal: "4",
          gate: "B12",
          baggage: "2",
          scheduled: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          delay: 15,
          estimated: new Date(Date.now() + 6.25 * 60 * 60 * 1000).toISOString(),
          actual: null,
          estimated_runway: null,
          actual_runway: null
        },
        airline: {
          name: "American Airlines",
          iata: "AA",
          icao: "AA"
        },
        flight: {
          number: "456",
          iata: "AA456",
          icao: "AA456",
          codeshared: null
        },
        aircraft: {
          registration: "N78901",
          iata: "B777",
          icao: "B777",
          model: "Boeing 777-200"
        },
        live: null,
        route: {
          waypoints: ["JFK", "LAX"],
          distance: 2789,
          duration: 360
        }
      }
    ],
    source: 'hardcoded'
  },
  'BA001': {
    pagination: {
      limit: 100,
      offset: 0,
      count: 1,
      total: 1
    },
    data: [
      {
        flight_date: new Date().toISOString().split('T')[0],
        flight_status: "scheduled",
        departure: {
          airport: "London Heathrow Airport",
          timezone: "Europe/London",
          iata: "LHR",
          icao: "EGLL",
          terminal: "5",
          gate: "A23",
          delay: 0,
          scheduled: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          estimated: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          actual: null,
          estimated_runway: null,
          actual_runway: null
        },
        arrival: {
          airport: "New York John F. Kennedy International Airport",
          timezone: "America/New_York",
          iata: "JFK",
          icao: "KJFK",
          terminal: "7",
          gate: "B8",
          baggage: "4",
          scheduled: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          delay: null,
          estimated: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          actual: null,
          estimated_runway: null,
          actual_runway: null
        },
        airline: {
          name: "British Airways",
          iata: "BA",
          icao: "BA"
        },
        flight: {
          number: "001",
          iata: "BA001",
          icao: "BA001",
          codeshared: null
        },
        aircraft: {
          registration: "G-BOAC",
          iata: "A380",
          icao: "A380",
          model: "Airbus A380-800"
        },
        live: null,
        route: {
          waypoints: ["LHR", "JFK"],
          distance: 3451,
          duration: 420
        }
      }
    ],
    source: 'hardcoded'
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get('flight');

  if (!flightNumber) {
    return NextResponse.json(
      { error: 'Flight number is required' },
      { status: 400 }
    );
  }

  // Check if the flight number is one of our three allowed flights
  const upperFlightNumber = flightNumber.toUpperCase();
  if (!HARDCODED_FLIGHTS[upperFlightNumber]) {
    return NextResponse.json(
      { 
        error: `Flight ${upperFlightNumber} not found. Only DL1102, AA456, and BA001 are available.`,
        availableFlights: ['DL1102', 'AA456', 'BA001']
      },
      { status: 404 }
    );
  }

  // Return the hardcoded flight data
  console.log(`✅ Returning hardcoded data for flight ${upperFlightNumber}`);
  return NextResponse.json(HARDCODED_FLIGHTS[upperFlightNumber]);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { flightNumber } = body;

    if (!flightNumber) {
      return NextResponse.json(
        { error: 'Flight number is required' },
        { status: 400 }
      );
    }

    // Reuse the GET logic for POST
    const mockRequest = new NextRequest(`http://localhost/api/aviation-request?flight=${flightNumber}`);
    return GET(mockRequest);
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
