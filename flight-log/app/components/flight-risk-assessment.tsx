"use client"

import { useState, useEffect } from "react"
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  MapPin, 
  Plane, 
  Shield, 
  TrendingDown, 
  DollarSign,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  BarChart3,
  Brain,
  Zap
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  calculateRiskScore, 
  findSaferAlternatives, 
  getFAAAlerts, 
  getMechanicalReports,
  generateRiskRecommendation,
  type FlightRiskFactors,
  type RiskScore,
  type AlternativeFlight,
  type FAAMessage,
  type MechanicalReport
} from "@/lib/flight-risk-assessment"
import { 
  calculateAdvancedRiskScore,
  type AdvancedRiskFactors 
} from "@/lib/advanced-risk-assessment"

interface FlightRiskAssessmentProps {
  flightNumber: string;
  airline: string;
  departure: string;
  arrival: string;
  date: string;
  aircraftModel: string;
}

function RiskScoreCircle({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getColor = (score: number) => {
    if (score >= 70) return "#ef4444" // red
    if (score >= 60) return "#f59e0b" // amber
    if (score >= 40) return "#eab308" // yellow
    return "#22c55e" // green
  }

  const getRiskLevel = (score: number) => {
    if (score >= 70) return "No-Go"
    if (score >= 60) return "High Risk"
    if (score >= 40) return "Caution"
    return "Safe"
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth="8"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-bold">{score}%</div>
          <div className="text-xs text-muted-foreground">{getRiskLevel(score)}</div>
        </div>
      </div>
    </div>
  )
}

function ConfidenceInterval({ interval, score }: { interval: [number, number]; score: number }) {
  const [lower, upper] = interval;
  const range = upper - lower;
  const position = ((score - lower) / range) * 100;

  return (
    <div className="mt-2">
      <div className="text-xs text-gray-500 mb-1">Confidence Interval (95%)</div>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div 
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{ 
            left: `${Math.max(0, (lower / 100) * 100)}%`,
            width: `${(range / 100) * 100}%`
          }}
        />
        <div 
          className="absolute w-1 h-4 bg-red-500 rounded-full -top-1"
          style={{ left: `${Math.max(0, Math.min(100, (score / 100) * 100))}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>{lower}%</span>
        <span>{upper}%</span>
      </div>
    </div>
  )
}

function UncertaintyIndicator({ uncertainty }: { uncertainty: number }) {
  const getUncertaintyColor = (uncertainty: number) => {
    if (uncertainty <= 0.2) return "text-green-600";
    if (uncertainty <= 0.4) return "text-yellow-600";
    if (uncertainty <= 0.6) return "text-orange-600";
    return "text-red-600";
  };

  const getUncertaintyText = (uncertainty: number) => {
    if (uncertainty <= 0.2) return "Very Low";
    if (uncertainty <= 0.4) return "Low";
    if (uncertainty <= 0.6) return "Medium";
    if (uncertainty <= 0.8) return "High";
    return "Very High";
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${getUncertaintyColor(uncertainty).replace('text-', 'bg-')}`} />
      <span className={`text-sm ${getUncertaintyColor(uncertainty)}`}>
        Uncertainty: {getUncertaintyText(uncertainty)} ({(uncertainty * 100).toFixed(0)}%)
      </span>
    </div>
  )
}

function FAAMessageCard({ message }: { message: FAAMessage }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-4 w-4" />
      case 'warning': return <AlertCircle className="h-4 w-4" />
      case 'info': return <Info className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  return (
    <Card className="border-l-4 border-l-red-500">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getTypeIcon(message.type)}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-sm">{message.title}</h4>
              <Badge className={`text-xs ${getSeverityColor(message.severity)}`}>
                {message.severity.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{message.description}</p>
            <div className="text-xs text-gray-500">
              Affected: {message.affectedAirports.join(', ')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MechanicalReportCard({ report }: { report: MechanicalReport }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'major': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'minor': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'investigating': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'open': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getStatusIcon(report.status)}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-sm">{report.issue}</h4>
              <Badge className={`text-xs ${getSeverityColor(report.severity)}`}>
                {report.severity.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              Aircraft: {report.aircraftId} • {report.aircraftModel}
            </p>
            <div className="text-xs text-gray-500">
              Status: {report.status} • Reported: {new Date(report.reportedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AlternativeFlightCard({ flight, onSelect }: { flight: AlternativeFlight; onSelect: (flight: AlternativeFlight) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(flight)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-semibold">{flight.airline}</h4>
            <p className="text-sm text-gray-600">{flight.id}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">${flight.price}</div>
            <Badge variant={flight.riskScore <= 30 ? "default" : "secondary"}>
              {flight.riskScore}% Risk
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs text-gray-500">Departure</p>
            <p className="font-medium">{flight.departureTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Arrival</p>
            <p className="font-medium">{flight.arrivalTime}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Delay Rate:</span>
            <span className={flight.delayRate <= 10 ? "text-green-600" : "text-yellow-600"}>
              {flight.delayRate}%
            </span>
          </div>
          
          <div className="space-y-1">
            {flight.safetyLogs.slice(0, 2).map((log, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="h-3 w-3 text-green-500" />
                {log}
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full mt-3" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          Book Alternative
        </Button>
      </CardContent>
    </Card>
  )
}

export default function FlightRiskAssessment({ 
  flightNumber, 
  airline, 
  departure, 
  arrival, 
  date, 
  aircraftModel 
}: FlightRiskAssessmentProps) {
  const [riskScore, setRiskScore] = useState<RiskScore | null>(null)
  const [advancedResults, setAdvancedResults] = useState<any>(null)
  const [faaAlerts, setFaaAlerts] = useState<FAAMessage[]>([])
  const [mechanicalReports, setMechanicalReports] = useState<MechanicalReport[]>([])
  const [alternatives, setAlternatives] = useState<AlternativeFlight[]>([])
  const [loading, setLoading] = useState(true)
  const [useAdvancedModel, setUseAdvancedModel] = useState(true)

  useEffect(() => {
    const assessFlightRisk = async () => {
      setLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate mock risk factors based on flight data
      const baseRiskFactors: FlightRiskFactors = {
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

      // Use advanced model if enabled
      if (useAdvancedModel) {
        const advancedFactors: AdvancedRiskFactors = {
          ...baseRiskFactors,
          uncertainty: {
            weatherConfidence: Math.random() * 0.4 + 0.6, // 0.6-1.0
            aircraftConfidence: Math.random() * 0.3 + 0.7, // 0.7-1.0
            routeConfidence: Math.random() * 0.5 + 0.5, // 0.5-1.0
            eventConfidence: Math.random() * 0.6 + 0.4, // 0.4-1.0
          },
          temporalFactors: {
            timeOfDay: Math.floor(Math.random() * 24),
            dayOfWeek: Math.floor(Math.random() * 7),
            season: ['winter', 'spring', 'summer', 'fall'][Math.floor(Math.random() * 4)],
            holidayFactor: Math.random() > 0.9 ? 1 : 0,
          },
          environmentalFactors: {
            solarActivity: Math.random(),
            geomagneticStorms: Math.random(),
            atmosphericPressure: Math.random() * 100 + 950, // 950-1050 hPa
            humidity: Math.random(),
          },
        }

        const advancedAssessment = calculateAdvancedRiskScore(advancedFactors)
        setAdvancedResults(advancedAssessment)
        setRiskScore(advancedAssessment.riskScore)
      } else {
        const calculatedRisk = calculateRiskScore(baseRiskFactors)
        setRiskScore(calculatedRisk)
      }
      
      // Get FAA alerts and mechanical reports
      setFaaAlerts(getFAAAlerts([departure, arrival]))
      setMechanicalReports(getMechanicalReports(aircraftModel))
      
      // Find safer alternatives if risk is high
      const currentRisk = useAdvancedModel ? advancedResults?.riskScore.overall : riskScore?.overall
      if (currentRisk && currentRisk > 40) {
        setAlternatives(findSaferAlternatives(flightNumber, departure, arrival, date))
      }
      
      setLoading(false)
    }
    
    assessFlightRisk()
  }, [flightNumber, airline, departure, arrival, date, aircraftModel, useAdvancedModel])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {useAdvancedModel ? 'Running advanced risk analysis...' : 'Analyzing flight safety...'}
          </p>
          {useAdvancedModel && (
            <div className="mt-2 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <Brain className="h-4 w-4" />
                <span>Bayesian Inference</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Monte Carlo Simulation</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!riskScore) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">Unable to assess flight risk</p>
      </div>
    )
  }

  const isHighRisk = riskScore.overall > 40
  const isNoGo = riskScore.overall > 70

  return (
    <div className="space-y-6">
      {/* Model Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Risk Assessment Model</h3>
              <p className="text-sm text-gray-600">
                {useAdvancedModel ? 'Advanced AI-powered analysis' : 'Standard risk calculation'}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseAdvancedModel(!useAdvancedModel)}
            >
              {useAdvancedModel ? 'Switch to Basic' : 'Switch to Advanced'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Flight Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{airline}{flightNumber}</h2>
              <p className="text-gray-600">{departure} → {arrival}</p>
              <p className="text-sm text-gray-500">{date} • {aircraftModel}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Safety Assessment</span>
                {useAdvancedModel && <Zap className="h-4 w-4 text-purple-600" />}
              </div>
              <Badge variant={isNoGo ? "destructive" : isHighRisk ? "secondary" : "default"}>
                {riskScore.recommendation.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Overall Risk Score
              {useAdvancedModel && <Brain className="h-4 w-4 text-purple-600" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <RiskScoreCircle score={riskScore.overall} size={140} />
            
            {useAdvancedModel && advancedResults && (
              <div className="mt-4 w-full">
                <ConfidenceInterval 
                  interval={advancedResults.monteCarloResults.confidenceInterval}
                  score={riskScore.overall}
                />
                <UncertaintyIndicator uncertainty={advancedResults.uncertaintyAnalysis.overallUncertainty} />
              </div>
            )}
            
            <p className="text-sm text-gray-600 mt-4 text-center">
              {generateRiskRecommendation(riskScore)}
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Risk Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Weather Risk</span>
                <span>{riskScore.weather}%</span>
              </div>
              <Progress value={riskScore.weather} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Recent Events</span>
                <span>{riskScore.events}%</span>
              </div>
              <Progress value={riskScore.events} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Aircraft Safety</span>
                <span>{riskScore.aircraft}%</span>
              </div>
              <Progress value={riskScore.aircraft} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Route Risk</span>
                <span>{riskScore.route}%</span>
              </div>
              <Progress value={riskScore.route} className="h-2" />
            </div>
            
            {useAdvancedModel && advancedResults && (
              <>
                <Separator />
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Temporal Risk</span>
                    <span>{advancedResults.temporalRisk}%</span>
                  </div>
                  <Progress value={advancedResults.temporalRisk} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Environmental Risk</span>
                    <span>{advancedResults.environmentalRisk}%</span>
                  </div>
                  <Progress value={advancedResults.environmentalRisk} className="h-2" />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analysis Results */}
      {useAdvancedModel && advancedResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Advanced Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Bayesian Inference</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Risk Probability:</span>
                    <span className="font-medium">{(advancedResults.bayesianResults.riskProbability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidence:</span>
                    <span className="font-medium">{(advancedResults.bayesianResults.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Evidence Strength:</span>
                    <span className="font-medium">{(advancedResults.bayesianResults.evidenceStrength * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Monte Carlo Simulation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Simulations:</span>
                    <span className="font-medium">10,000 iterations</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidence Level:</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Range:</span>
                    <span className="font-medium">
                      {advancedResults.monteCarloResults.confidenceInterval[0]}% - {advancedResults.monteCarloResults.confidenceInterval[1]}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAA Alerts */}
      {faaAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              FAA Alerts ({faaAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {faaAlerts.map((alert) => (
              <FAAMessageCard key={alert.id} message={alert} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Mechanical Reports */}
      {mechanicalReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-orange-500" />
              Mechanical Reports ({mechanicalReports.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mechanicalReports.map((report) => (
              <MechanicalReportCard key={report.id} report={report} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Safer Alternatives */}
      {isHighRisk && alternatives.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Safer Alternatives
            </CardTitle>
            <p className="text-sm text-gray-600">
              Consider these flights with better safety conditions and lower risk scores
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {alternatives.map((flight) => (
                <AlternativeFlightCard 
                  key={flight.id} 
                  flight={flight} 
                  onSelect={(selectedFlight) => {
                    console.log('Selected alternative:', selectedFlight)
                    // Handle booking logic here
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No-Go Warning */}
      {isNoGo && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Flight Not Recommended</h3>
                <p className="text-red-700">
                  This flight has a high risk score ({riskScore.overall}%). We strongly recommend 
                  finding an alternative flight or rescheduling your travel.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 