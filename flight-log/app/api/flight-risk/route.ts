import { NextRequest, NextResponse } from 'next/server'
import { 
  calculateRiskScore, 
  findSaferAlternatives, 
  getFAAAlerts, 
  getMechanicalReports,
  type FlightRiskFactors 
} from '@/lib/flight-risk-assessment'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { flightNumber, airline, departure, arrival, date, aircraftModel } = body

    if (!flightNumber || !airline || !departure || !arrival || !aircraftModel) {
      return NextResponse.json(
        { error: 'Missing required flight information' },
        { status: 400 }
      )
    }

    // Generate mock risk factors based on flight data
    // In a real implementation, this would fetch actual data from various APIs
    const riskFactors: FlightRiskFactors = {
      weather: {
        condition: Math.random() > 0.7 ? 'Thunderstorms' : Math.random() > 0.5 ? 'Heavy Rain' : 'Clear',
        severity: Math.random() * 100,
        visibility: Math.random() * 10 + 1,
        windSpeed: Math.random() * 40 + 5,
        turbulence: Math.random() * 100,
      },
      recentEvents: {
        radarOutages: Math.random() > 0.8 ? 1 : 0,
        mechanicalIssues: Math.random() > 0.7 ? 1 : 0,
        runwayIncidents: Math.random() > 0.9 ? 1 : 0,
        atcIssues: Math.random() > 0.8 ? 1 : 0,
      },
      aircraft: {
        model: aircraftModel,
        age: Math.random() * 20 + 2,
        maintenanceScore: Math.random() * 30 + 70,
        incidentHistory: Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0,
      },
      route: {
        congestion: Math.random() * 100,
        weatherHistory: Math.random() * 100,
        incidentHistory: Math.random() * 100,
      },
    }

    // Calculate risk score
    const riskScore = calculateRiskScore(riskFactors)

    // Get FAA alerts and mechanical reports
    const faaAlerts = getFAAAlerts([departure, arrival])
    const mechanicalReports = getMechanicalReports(aircraftModel)

    // Find safer alternatives if risk is high
    const alternatives = riskScore.overall > 40 
      ? findSaferAlternatives(flightNumber, departure, arrival, date)
      : []

    return NextResponse.json({
      success: true,
      data: {
        flightNumber,
        airline,
        departure,
        arrival,
        date,
        aircraftModel,
        riskScore,
        faaAlerts,
        mechanicalReports,
        alternatives,
        riskFactors, // Include for debugging
      }
    })

  } catch (error) {
    console.error('Flight risk assessment error:', error)
    return NextResponse.json(
      { error: 'Failed to assess flight risk' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const flightNumber = searchParams.get('flight')
  const airline = searchParams.get('airline')
  const departure = searchParams.get('from')
  const arrival = searchParams.get('to')
  const date = searchParams.get('date')
  const aircraftModel = searchParams.get('aircraft')

  if (!flightNumber || !airline || !departure || !arrival || !aircraftModel) {
    return NextResponse.json(
      { error: 'Missing required flight information' },
      { status: 400 }
    )
  }

  // Use the same logic as POST
  return POST(request)
} 