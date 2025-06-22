/**
 * This part of the code takes in a request with iata
 * Example: /v1/flights?access_key=YOURKEY&flight_iata=UA2557
 * using AviationStack using axios and NextJSRequest/Response
 */
import axios from 'axios';
//TODO no flight number as a string yet flightNumber: string
//Parse Output:

const mockData = {
  pagination: {
    limit: 100,
    offset: 0,
    count: 1,
    total: 1
  },
  data: [
    {
      flight_date: "2025-06-20",
      flight_status: "landed",
      departure: {
        airport: "Mineta San Jose International Airport",
        timezone: "America/Los_Angeles",
        iata: "SJC",
        icao: "KSJC",
        terminal: "A",
        gate: "12",
        delay: 3,
        scheduled: "2025-06-20T22:25:00+00:00",
        estimated: "2025-06-20T22:25:00+00:00",
        actual: "2025-06-20T22:28:00+00:00",
        estimated_runway: "2025-06-20T22:28:00+00:00",
        actual_runway: "2025-06-20T22:28:00+00:00"
      },
      arrival: {
        airport: "Hartsfield-Jackson Atlanta International",
        timezone: "America/New_York",
        iata: "ATL",
        icao: "KATL",
        terminal: "S",
        gate: "B27",
        baggage: "4",
        scheduled: "2025-06-21T06:03:00+00:00",
        delay: null,
        estimated: "2025-06-21T05:36:00+00:00",
        actual: "2025-06-21T05:38:00+00:00",
        estimated_runway: "2025-06-21T05:38:00+00:00",
        actual_runway: "2025-06-21T05:38:00+00:00"
      },
      airline: {
        name: "Delta Air Lines",
        iata: "DL",
        icao: "DAL"
      },
      flight: {
        number: "1102",
        iata: "DL1102",
        icao: "DAL1102",
        codeshared: null
      },
      aircraft: null,
      live: null
    }
  ]
} as const;

export async function fetchFlightData(flightData: string) {

  const accessKey = "87c8bc19fb3b07fa55d3f9d374434400"; // or process.env.AVIATION_STACK_KEY

  if (!accessKey) {
    throw new Error("AviationStack API key is missing.");
  }

  const url = `https://api.aviationstack.com/v1/flights?access_key=${accessKey}&flight_iata=${flightData.toUpperCase()}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Sorry! Not a valid airport or failed request.", error);
    throw new Error("Failed to fetch flight data.");
  }
}
