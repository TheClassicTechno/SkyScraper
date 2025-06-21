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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 relative overflow-hidden">
            {/* Animated Clouds */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Cloud 1 */}
                <div className="absolute top-20 left-10 animate-pulse">
                    <div className="text-8xl opacity-60">☁️</div>
                </div>
                {/* Cloud 2 */}
                <div className="absolute top-32 right-20 animate-pulse" style={{ animationDelay: '1s' }}>
                    <div className="text-7xl opacity-55">☁️</div>
                </div>
                {/* Cloud 3 */}
                <div className="absolute top-16 right-1/3 animate-pulse" style={{ animationDelay: '2s' }}>
                    <div className="text-6xl opacity-65">☁️</div>
                </div>
                {/* Cloud 4 */}
                <div className="absolute top-40 left-1/4 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <div className="text-7xl opacity-60">☁️</div>
                </div>
                {/* Cloud 5 */}
                <div className="absolute top-60 right-1/4 animate-pulse" style={{ animationDelay: '1.5s' }}>
                    <div className="text-6xl opacity-55">☁️</div>
                </div>
                {/* Cloud 7 */}
                <div className="absolute top-96 right-10 animate-pulse" style={{ animationDelay: '2.2s' }}>
                    <div className="text-7xl opacity-55">☁️</div>
                </div>
                {/* Cloud 8 */}
                <div className="absolute top-72 left-16 animate-pulse" style={{ animationDelay: '1.2s' }}>
                    <div className="text-6xl opacity-65">☁️</div>
                </div>
                {/* Additional clouds for better visibility */}
                <div className="absolute top-120 left-1/3 animate-pulse" style={{ animationDelay: '0.3s' }}>
                    <div className="text-7xl opacity-60">☁️</div>
                </div>
                <div className="absolute top-140 right-1/3 animate-pulse" style={{ animationDelay: '1.8s' }}>
                    <div className="text-6xl opacity-55">☁️</div>
                </div>
            </div>

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
                                        onClick={fetchFlightData}
                                        disabled={!flightNumber || !selectedAirline}
                                        className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                                    >
                                        <Search className="h-5 w-5 mr-2" />
                                        Track Flight
                                    </Button>
                                </Link>

                            </div>
                        </div>
                    </CardContent>
                </Card>
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