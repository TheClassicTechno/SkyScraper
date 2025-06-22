"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Brain, 
  Plane, 
  Shield, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  Trophy,
  Zap
} from "lucide-react"

interface FlightMemory {
  id: string;
  flightNumber: string;
  date: string;
  riskScore: number;
  delay: number;
  weather: string;
  userActions: string[];
  outcome: 'on_time' | 'delayed' | 'cancelled' | 'early';
}

interface UserStats {
  totalFlights: number;
  averageRisk: number;
  safetyStreak: number;
  preferredAirlines: string[];
  riskTolerance: number;
}

interface UserProfile {
  userId: string;
  riskTolerance: number;
  preferredAirlines: string[];
  preferredTimes: string[];
  flightHistory: FlightMemory[];
  safetyStreak: number;
  lastInteraction: Date;
  commonQueries: string[];
  notificationPreferences: string[];
}

export function LettaMemoryDashboard({ userId = 'demo-user', userProfile }: { userId?: string; userProfile?: any }) {
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [userId])

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/letta-context?userId=${userId}`)
      const data = await response.json()
      
      if (data.success) {
        setUserStats(data.userStats)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <span className="text-sm text-gray-600">Loading Letta Memory...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!userStats || !userProfile) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center text-gray-600">
            <Brain className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>No memory data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getRiskLevel = (risk: number) => {
    if (risk < 30) return { level: 'Low', color: 'bg-green-100 text-green-800', icon: Shield }
    if (risk < 60) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle }
    return { level: 'High', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
  }

  const getSafetyStreakColor = (streak: number) => {
    if (streak >= 10) return 'bg-purple-100 text-purple-800'
    if (streak >= 5) return 'bg-blue-100 text-blue-800'
    if (streak >= 2) return 'bg-green-100 text-green-800'
    return 'bg-gray-100 text-gray-800'
  }

  const riskLevel = getRiskLevel(userStats.averageRisk)
  const RiskIcon = riskLevel.icon

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <CardTitle className="text-lg">Letta Memory Agent</CardTitle>
            </div>
            <Badge variant="outline" className="bg-white/50">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Flights */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Plane className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Flights</p>
                <p className="text-2xl font-bold">{userStats.totalFlights}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Streak */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Safety Streak</p>
                <p className="text-2xl font-bold">{userStats.safetyStreak}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Risk */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RiskIcon className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Risk</p>
                <p className="text-2xl font-bold">{Math.round(userStats.averageRisk)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Tolerance */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Risk Tolerance</p>
                <p className="text-2xl font-bold">{userStats.riskTolerance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>AI Memory Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Preferred Airlines</h4>
              <div className="flex flex-wrap gap-1">
                {(userProfile?.preferredAirlines || []).map((airline: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {airline}
                  </Badge>
                ))}
                {(!userProfile?.preferredAirlines || userProfile.preferredAirlines.length === 0) && (
                  <span className="text-xs text-gray-500">None specified</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Preferred Times</h4>
              <div className="flex flex-wrap gap-1">
                {(userProfile?.preferredTimes || []).map((time: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {time}
                  </Badge>
                ))}
                {(!userProfile?.preferredTimes || userProfile.preferredTimes.length === 0) && (
                  <span className="text-xs text-gray-500">None specified</span>
                )}
              </div>
            </div>
          </div>

          {/* Safety Streak Badge */}
          {userStats.safetyStreak > 0 && (
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-semibold text-green-800">
                  🏆 Safety Streak: {userStats.safetyStreak} flights!
                </p>
                <p className="text-sm text-green-600">
                  Keep up the great safety record!
                </p>
              </div>
            </div>
          )}

          {/* Common Queries */}
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Frequent Questions</h4>
            <div className="flex flex-wrap gap-1">
              {(userProfile?.commonQueries || []).map((query: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {query}
                </Badge>
              ))}
              {(!userProfile?.commonQueries || userProfile.commonQueries.length === 0) && (
                <span className="text-xs text-gray-500">No frequent questions yet</span>
              )}
            </div>
          </div>

          {/* Details Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full"
          >
            {showDetails ? 'Hide' : 'Show'} Memory Details
          </Button>

          {/* Detailed Stats */}
          {showDetails && (
            <div className="space-y-3 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Last Interaction:</span>
                  <span className="ml-2 font-medium">
                    {userProfile?.lastInteraction ? new Date(userProfile.lastInteraction).toLocaleDateString() : 'Never'}
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>💡 Letta remembers your preferences and uses them to provide personalized flight recommendations.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 