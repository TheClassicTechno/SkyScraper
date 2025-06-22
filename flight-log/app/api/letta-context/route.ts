import { NextRequest, NextResponse } from 'next/server';
import { lettaAgent } from '@/lib/letta-agent';

export async function POST(req: Request) {
  try {
    const { userId = 'demo-user', query, flightData } = await req.json();

    // Generate Letta context
    const lettaContext = await lettaAgent.generateClaudeContext(userId, query, flightData);
    
    // Get user stats for the response
    const userStats = await lettaAgent.getUserStats(userId);

    return NextResponse.json({
      success: true,
      lettaContext,
      userStats,
      message: "Letta context generated successfully"
    });

  } catch (error) {
    console.error('Error generating Letta context:', error);
    
    return NextResponse.json({
      success: false,
      error: "Failed to generate Letta context",
      message: "An error occurred while processing your request"
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'demo-user';

    // Get user statistics
    const userStats = await lettaAgent.getUserStats(userId);
    const userProfile = await lettaAgent.getUserProfile(userId);
    
    return NextResponse.json({
      success: true,
      userStats,
      userProfile,
      message: "User profile retrieved successfully"
    });

  } catch (error) {
    console.error('Error retrieving user profile:', error);
    
    return NextResponse.json({
      success: false,
      error: "Failed to retrieve user profile",
      message: "An error occurred while processing your request"
    }, { status: 500 });
  }
} 