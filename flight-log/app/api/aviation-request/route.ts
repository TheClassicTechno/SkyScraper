/**
 * This part of the code takes in a request with iata
 * Example: /v1/flights?access_key=YOURKEY&flight_iata=UA2557
 * using AviationStack using axios and NextJSRequest/Response
 */
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
//TODO no flight number as a string yet flightNumber: string
//Parse Output:

// Helper function to generate mock data
function getMockData(flightData: string) {
  const flightNumber = flightData.replace(/[A-Z]/g, '');
  const airline = flightData.replace(/[0-9]/g, '');
  
  return {
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
          airport: "Los Angeles International Airport",
          timezone: "America/Los_Angeles",
          iata: "LAX",
          icao: "KLAX",
          terminal: "B",
          gate: "15",
          baggage: "3",
          scheduled: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          delay: null,
          estimated: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          actual: null,
          estimated_runway: null,
          actual_runway: null
        },
        airline: {
          name: `${airline} Airlines`,
          iata: airline,
          icao: airline
        },
        flight: {
          number: flightNumber,
          iata: flightData.toUpperCase(),
          icao: `${airline}${flightNumber}`,
          codeshared: null
        },
        aircraft: {
          registration: "N12345",
          iata: "B738",
          icao: "B738",
          model: "Boeing 737-800"
        },
        live: null
      }
    ]
  };
}

export async function fetchFlightData(flightData: string) {
  const accessKey = "87c8bc19fb3b07fa55d3f9d374434400"; // or process.env.AVIATION_STACK_KEY

  if (!accessKey) {
    console.log("No API key found, using mock data");
    return getMockData(flightData);
  }

  const url = `https://api.aviationstack.com/v1/flights?access_key=${accessKey}&flight_iata=${flightData.toUpperCase()}`;

  try {
    const response = await axios.get(url);
    
    // Check if the API returned valid data
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data;
    } else {
      console.log("API returned empty data, using mock data for flight:", flightData);
      return getMockData(flightData);
    }
  } catch (error) {
    console.error("API request failed, using mock data for flight:", flightData, error);
    return getMockData(flightData);
  }
}

// Next.js API route handlers
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const flightNumber = searchParams.get('flight');

  if (!flightNumber) {
    return NextResponse.json(
      { error: 'Flight number is required' },
      { status: 400 }
    );
  }

  try {
    const data = await fetchFlightData(flightNumber);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flight data' },
      { status: 500 }
    );
  }
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

    const data = await fetchFlightData(flightNumber);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flight data' },
      { status: 500 }
    );
  }
}
