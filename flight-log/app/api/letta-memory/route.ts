import { NextRequest, NextResponse } from 'next/server';
import { lettaAgent } from '@/lib/letta-agent';

export async function POST(req: Request) {
  try {
    const { userId, flightNumber, riskScore, weather, userActions } = await req.json();

    // Store flight memory in Letta
    const memoryId = await lettaAgent.storeFlightMemory(
      userId,
      flightNumber,
      riskScore,
      weather,
      userActions || []
    );

    return NextResponse.json({
      success: true,
      memoryId,
      message: "Flight memory stored successfully"
    });

  } catch (error) {
    console.error('Error storing flight memory:', error);
    
    return NextResponse.json({
      success: false,
      error: "Failed to store flight memory",
      message: "An error occurred while storing flight memory"
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'demo-user';
    const query = searchParams.get('query') || '';

    // Get relevant memories
    const memories = await lettaAgent.getRelevantMemories(userId, query, 10);

    return NextResponse.json({
      success: true,
      memories,
      message: "Memories retrieved successfully"
    });

  } catch (error) {
    console.error('Error retrieving memories:', error);
    
    return NextResponse.json({
      success: false,
      error: "Failed to retrieve memories",
      message: "An error occurred while retrieving memories"
    }, { status: 500 });
  }
} 