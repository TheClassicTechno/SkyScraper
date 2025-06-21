"use client"

import { useState } from "react"
import { Search, Plane, Shield, Clock, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { fetchFlightData } from "../api/aviation-request/route"

import Link from "next/link"

const popularAirlines = [
    { code: "AA", name: "American Airlines", logo: "🇺🇸" },
    { code: "DL", name: "Delta Air Lines", logo: "🔺" },
    { code: "UA", name: "United Airlines", logo: "🌐" },
    { code: "SW", name: "Southwest Airlines", logo: "❤️" },
    { code: "BA", name: "British Airways", logo: "🇬🇧" },
    { code: "LH", name: "Lufthansa", logo: "🇩🇪" },
    { code: "AF", name: "Air France", logo: "🇫🇷" },
    { code: "KL", name: "KLM", logo: "🇳🇱" },
    { code: "EK", name: "Emirates", logo: "🇦🇪" },
    { code: "QR", name: "Qatar Airways", logo: "🇶🇦" },
]

const MainPage = () => {
    const [flightNumber, setFlightNumber] = useState("")
    const [selectedAirline, setSelectedAirline] = useState("")

    const handleSearch = () => {
        if (flightNumber && selectedAirline) {
            console.log(`Searching for flight: ${selectedAirline}${flightNumber}`)
            // Add your search logic here
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-xl">
                                <Plane className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">FlightSafe</h1>
                                <p className="text-xs text-gray-600">Real-time Flight Tracking</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                Live Data
                            </Badge>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Shield className="h-4 w-4" />
                        Trusted by millions of travelers worldwide
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Track Your Flight
                        <span className="block text-blue-600">With Confidence</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Get real-time updates, safety scores, and comprehensive flight information. Stay informed and travel with
                        peace of mind.
                    </p>
                </div>

                {/* Search Card */}
                <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-8">
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Find Your Flight</h2>
                                <p className="text-gray-600">Enter your flight details to get started</p>
                            </div>

                            <div className="space-y-4">
                                {/* Airline Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Select Airline</label>
                                    <Select value={selectedAirline} onValueChange={setSelectedAirline}>
                                        <SelectTrigger className="h-12 text-left">
                                            <SelectValue placeholder="Choose your airline" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {popularAirlines.map((airline) => (
                                                <SelectItem key={airline.code} value={airline.code}>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-lg">{airline.logo}</span>
                                                        <div>
                                                            <div className="font-medium">{airline.name}</div>
                                                            <div className="text-xs text-gray-500">{airline.code}</div>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Flight Number Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Flight Number</label>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            placeholder="e.g., 1234 or AB12"
                                            value={flightNumber}
                                            onChange={(e) =>
                                                setFlightNumber(
                                                    e.target.value
                                                        .replace(/[^0-9A-Z]/gi, "")  // Remove anything not 0-9 or A-Z
                                                        .toUpperCase()               // Convert all letters to uppercase
                                                )
                                            }
                                            className="h-12 pl-4 pr-12 text-lg"
                                            maxLength={6}
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <Plane className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <Link href="/flight-score">
                                    <Button
                                        onClick={() => fetchFlightData(flightNumber)}
                                        disabled={!flightNumber || !selectedAirline}
                                        className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                                    >
                                        <Search className="h-5 w-5 mr-2" />
                                        Track Flight
                                    </Button>
                                </Link>

                            </div>

                            {/* Example */}
                            <div className="text-center pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500">
                                    Example: Select "American Airlines" and enter "1234" for flight AA1234
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Features Section */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center p-6 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety First</h3>
                        <p className="text-gray-600">Real-time safety scores and risk assessments for every flight</p>
                    </Card>

                    <Card className="text-center p-6 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Updates</h3>
                        <p className="text-gray-600">Get instant notifications about delays, gate changes, and more</p>
                    </Card>

                    <Card className="text-center p-6 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-200">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <MapPin className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Coverage</h3>
                        <p className="text-gray-600">Track flights worldwide with comprehensive airport data</p>
                    </Card>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 text-center">
                    <p className="text-gray-500 mb-6">Trusted by travelers from</p>
                    <div className="flex items-center justify-center gap-8 opacity-60">
                        <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" />
                            <span className="font-semibold">4.8/5</span>
                            <span className="text-gray-500">Rating</span>
                        </div>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">2M+</span>
                            <span className="text-gray-500">Active Users</span>
                        </div>
                        <div className="w-px h-6 bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">99.9%</span>
                            <span className="text-gray-500">Uptime</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600">
                        <p>&copy; 2024 FlightSafe. Keeping you informed and secure in the skies.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default MainPage