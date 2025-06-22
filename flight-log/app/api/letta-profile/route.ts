import { NextRequest, NextResponse } from 'next/server';
import { lettaAgent } from '@/lib/letta-agent';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'demo-user';

    // Get current profile
    const profile = await lettaAgent.getUserProfile(userId);
    
    return NextResponse.json({ 
      success: true, 
      profile,
      message: "Profile retrieved successfully"
    });

  } catch (error) {
    console.error('Error retrieving profile:', error);
    
    return NextResponse.json({
      success: false,
      error: "Failed to retrieve profile",
      message: "An error occurred while retrieving your profile"
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, settings } = await req.json();
    
    console.log('API received settings:', settings);
    console.log('API received userId:', userId);

    // Update user profile with new settings
    const updatedProfile = await lettaAgent.updateUserProfile(userId, settings);
    
    console.log('Updated profile:', updatedProfile);
    
    return NextResponse.json({
      success: true,
      profile: updatedProfile,
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    
    return NextResponse.json({
      success: false,
      error: "Failed to update profile",
      message: "An error occurred while updating your profile"
    }, { status: 500 });
  }
} 