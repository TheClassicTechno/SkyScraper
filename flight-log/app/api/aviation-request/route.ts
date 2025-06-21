/**
 * This part of the code takes in a request with iata
 * Example: /v1/flights?access_key=YOURKEY&flight_iata=UA2557
 * using AviationStack using axios and NextJSRequest/Response
 */

import axios from 'axios';


//TODO no flight number as a string yet flightNumber: string
export async function fetchFlightData() {
  const flightData = "DL1102";
  const accessKey = "edf76f86d8cdc89c062d049b94370a78"; // or process.env.AVIATION_STACK_KEY for server-side

  if (!accessKey) {
    throw new Error("AviationStack API key is missing.");
  }

  if (!flightData) {
    throw new Error("Flight number is required.");
  }

  const url = `https://api.aviationstack.com/v1/flights?access_key=${accessKey}&flight_iata=${flightData.toUpperCase()}`;

  try {
    const response = await axios.get(url);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Sorry! not a valid airport");
    throw new Error("Failed to fetch flight data.");
  }
}
