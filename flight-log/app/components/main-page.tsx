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
                <div className="absolute top-4 sm:top-8 md:top-20 left-2 sm:left-6 md:left-10">
                    <div className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl opacity-40">☁️</div>
                </div>
                {/* Cloud 2 */}
                <div className="absolute top-8 sm:top-12 md:top-32 right-2 sm:right-6 md:right-20">
                    <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl opacity-35">☁️</div>
                </div>
                {/* Cloud 3 */}
                <div className="absolute top-4 sm:top-8 md:top-16 right-1/4 sm:right-1/3">
                    <div className="text-xl sm:text-3xl md:text-4xl lg:text-6xl opacity-45">☁️</div>
                </div>
                {/* Cloud 4 */}
                <div className="absolute top-12 sm:top-16 md:top-40 left-1/6 sm:left-1/4">
                    <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl opacity-40">☁️</div>
                </div>
                {/* Cloud 5 */}
                <div className="absolute top-16 sm:top-24 md:top-60 right-1/6 sm:right-1/4">
                    <div className="text-xl sm:text-3xl md:text-4xl lg:text-6xl opacity-35">☁️</div>
                </div>
                {/* Cloud 7 */}
                <div className="absolute top-20 sm:top-32 md:top-96 right-2 sm:right-6 md:right-10">
                    <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl opacity-35">☁️</div>
                </div>
                {/* Cloud 8 */}
                <div className="absolute top-14 sm:top-20 md:top-72 left-4 sm:left-8 md:left-16">
                    <div className="text-xl sm:text-3xl md:text-4xl lg:text-6xl opacity-45">☁️</div>
                </div>
                {/* Additional clouds for better visibility */}
                <div className="absolute top-24 sm:top-32 md:top-120 left-1/4 sm:left-1/3">
                    <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl opacity-40">☁️</div>
                </div>
                <div className="absolute top-28 sm:top-36 md:top-140 right-1/4 sm:right-1/3">
                    <div className="text-xl sm:text-3xl md:text-4xl lg:text-6xl opacity-35">☁️</div>
                </div>
            </div>

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg sm:rounded-xl">
                                <Plane className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-gray-900">SkyScraper</h1>
                                <p className="text-xs text-gray-600">Real-time Flight Tracking</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <nav className="hidden sm:flex items-center gap-4">
                                <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                                    Home
                                </Link>
                                <Link href="/flight-score" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                                    Flight Dashboard
                                </Link>
                            </nav>
                            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 text-xs sm:text-sm">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></div>
                                Live Data
                            </Badge>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 md:py-12">
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-100 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                        Trusted by millions of travelers worldwide
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                        Track Your Flight
                        <span className="block text-blue-600">With Confidence</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
                        Get real-time updates, safety scores, and comprehensive flight information. Stay informed and travel with
                        peace of mind.
                    </p>
                </div>

                {/* Search Card */}
                <Card className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-4 sm:p-6 md:p-8">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="text-center">
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Find Your Flight</h2>
                                <p className="text-sm sm:text-base text-gray-600">Enter your flight details to get started</p>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                {/* Airline Selection */}
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-gray-700">Select Airline</label>
                                    <Select value={selectedAirline} onValueChange={setSelectedAirline}>
                                        <SelectTrigger className="h-10 sm:h-12 text-left">
                                            <SelectValue placeholder="Choose your airline" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {popularAirlines.map((airline) => (
                                                <SelectItem key={airline.code} value={airline.code}>
                                                    <div className="flex items-center gap-2 sm:gap-3">
                                                        <span className="text-base sm:text-lg">{airline.logo}</span>
                                                        <div>
                                                            <div className="font-medium text-sm sm:text-base">{airline.name}</div>
                                                            <div className="text-xs text-gray-500">{airline.code}</div>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Flight Number Input */}
                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-gray-700">Flight Number</label>
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
                                            className="h-10 sm:h-12 pl-3 sm:pl-4 pr-10 sm:pr-12 text-base sm:text-lg"
                                            maxLength={6}
                                        />
                                        <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                            <Plane className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <Link href="/flight-score">
                                    <Button
                                        onClick={() => fetchFlightData(flightNumber)}
                                        disabled={!flightNumber || !selectedAirline}
                                        className="w-full h-10 sm:h-12 text-base sm:text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                                    >
                                        <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                                        Track Flight
                                    </Button>
                                </Link>

                                {/* Quick Access Button */}
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-2">Or</p>
                                    <Link href="/flight-score">
                                        <Button variant="outline" className="w-full h-10 sm:h-12 text-base sm:text-lg">
                                            View Flight Dashboard
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Footer */}
            <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-12 sm:mt-16 md:mt-20">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
                    <div className="text-center text-gray-600">
                        <p className="text-sm sm:text-base">&copy; 2024 SkyScraper. Keeping you informed and secure in the skies.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default MainPage