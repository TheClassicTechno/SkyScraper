# Aviation API Setup Guide

This application integrates with free aviation APIs to provide accurate flight tracking and turbulence data.

## Required API Keys (Optional)

Create a `.env.local` file in the `flight-log` directory with the following API keys (all optional):

```env
# Vapi AI - AI-powered calling and messaging
# Get your key at: https://vapi.ai
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key_here

# OpenWeatherMap API (free tier available)
# Get your key at: https://openweathermap.org/api
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here

# FlightLabs API (free tier available)
# Get your key at: https://www.goflightlabs.com/
FLIGHTLABS_API_KEY=your_flightlabs_api_key_here
```

# Vapi AI Setup Guide

## Getting Started with Vapi AI

Your flight tracking app now includes **VapidAgent** - an AI-powered phone assistant that can make calls, send texts, and summarize conversations.

### 1. Get Your Free Vapi API Key

1. Visit [Vapi.ai](https://vapi.ai)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier includes: **100 minutes of calls per month**

### 2. Configure Your Environment

Add to your `.env.local` file:

```bash
# Vapi AI Configuration
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key_here
```

### 3. Features Available

✅ **AI-Powered Phone Calls**
- Natural language call initiation
- Intelligent conversation handling
- Call summaries and transcripts
- Multi-language support

✅ **Smart Text Messaging**
- AI-generated responses
- Context-aware conversations
- Message history tracking
- Automated follow-ups

✅ **Call Management**
- Call history and analytics
- Conversation summaries
- Voice-to-text transcription
- Integration with flight data

### 4. Testing Your Setup

1. Add your Vapi API key to `.env.local`
2. Restart your development server
3. Open the VapidAgent chat (green phone icon)
4. Try commands like:
   - "Call +1234567890 to check flight status"
   - "Send a text to +1234567890 about weather conditions"
   - "Summarize my last call"

### 5. Safety Features

- **Traffic Controller Mindset**: All operations prioritize user safety
- **Call Validation**: Phone numbers are validated before calls
- **Error Handling**: Graceful fallbacks when API is unavailable
- **Rate Limiting**: Respects Vapi's usage limits

### 6. Free Tier Limitations

- **100 minutes of calls per month**
- Basic AI assistant features
- Standard voice quality
- Rate limiting applies

### 7. Upgrading (Optional)

For production use, consider upgrading to paid plans:
- **Starter**: $10/month - 1,000 minutes
- **Professional**: $50/month - 5,000 minutes
- **Enterprise**: Custom pricing

### 8. Integration with Flight Data

VapidAgent can:
- Call airlines for flight status updates
- Send weather alerts to pilots
- Summarize flight-related conversations
- Schedule follow-up calls for delays

## Current Status

Your VapidAgent is now configured with:
- ✅ Real Vapi AI integration
- ✅ Safety-first design principles
- ✅ Graceful API key handling
- ✅ Comprehensive error messages
- ✅ User-friendly setup instructions

The VapidAgent will work in demo mode without an API key, and when you add your Vapi API key, it will provide real AI calling and messaging capabilities!

## Free APIs (No Key Required)

- **OpenSky Network**: Real-time flight tracking data
- **Aviation Weather Center**: PIREPs and SIGMETs

## API Features

### 1. Real-Time Flight Tracking
- **OpenSky Network**: Provides real-time position data for aircraft worldwide (FREE)

### 2. Weather Data
- **OpenWeatherMap**: Current weather conditions, wind data, temperature (FREE tier: 1000 calls/day)
- **Simulated Weather**: Realistic weather data when API key is not available

### 3. Aviation Weather
- **Aviation Weather Center**: Official PIREPs (Pilot Reports) and SIGMETs (FREE)
- **PIREPs**: Real pilot reports of turbulence and weather conditions
- **SIGMETs**: Significant meteorological information for aviation

## Getting Started

1. **Optional: Get OpenWeatherMap API Key**:
   - Sign up at https://openweathermap.org/api (1000 calls/day free)
   - This provides real weather data for more accurate turbulence calculations

2. **Create Environment File** (optional):
   ```bash
   # Create .env.local in flight-log directory
   echo "NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key_here" > .env.local
   ```

3. **Start the Application**:
   ```bash
   npm run dev
   ```

## Data Sources

The application uses multiple data sources to provide comprehensive aviation information:

- **Flight Tracking**: OpenSky Network (real-time aircraft positions) - FREE
- **Weather Conditions**: OpenWeatherMap (with fallback to simulated data)
- **Turbulence Reports**: Aviation Weather Center PIREPs - FREE
- **Severe Weather**: Aviation Weather Center SIGMETs - FREE

## Fallback System

If no API keys are provided, the application will:
1. Use free APIs (OpenSky, Aviation Weather Center)
2. Generate realistic simulated weather data
3. Continue to function with full flight tracking capabilities

## Rate Limits

- **OpenWeatherMap**: 1000 calls/day (free tier)
- **OpenSky Network**: No rate limit (free)
- **Aviation Weather Center**: No rate limit (free)

## Testing the Application

The application works immediately without any API keys:

1. **Flight Search**: Search for real flights using OpenSky Network
2. **Weather Data**: Uses simulated weather data (realistic and time-based)
3. **PIREPs**: Real pilot reports from Aviation Weather Center
4. **SIGMETs**: Real severe weather alerts

## Troubleshooting

If you encounter issues:

1. **No API Keys**: The app works completely without API keys
2. **Network Issues**: Check internet connection for API access
3. **Rate Limits**: Only applies if using OpenWeatherMap API key
4. **Fallback Mode**: The app automatically uses simulated data if APIs fail

## Security Notes

- API keys are prefixed with `NEXT_PUBLIC_` for client-side access
- Only use free tier API keys for development
- Never commit API keys to version control
- The app works perfectly without any API keys

# FlightLabs API Setup Guide

## Getting Started with FlightLabs

Your flight tracking app is now configured to use **FlightLabs** for comprehensive flight data including origin/destination airports and complete flight paths.

### 1. Get Your Free FlightLabs API Key

1. Visit [FlightLabs](https://www.goflightlabs.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier includes: **100 requests per month**

### 2. Configure Your Environment

Create a `.env.local` file in your project root:

```bash
# FlightLabs API Configuration
FLIGHTLABS_API_KEY=your_flightlabs_api_key_here

# Optional: OpenWeatherMap API for weather data
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### 3. Features Available

✅ **Complete Flight Path Data**
- Origin and destination airports
- Flight schedules and times
- Aircraft information
- Real-time tracking (when available)

✅ **Multiple Data Sources**
- FlightLabs (primary)
- OpenSky Network (real-time positions)
- Mock data (fallback)

✅ **Comprehensive Flight Information**
- Airport details (IATA/ICAO codes)
- Flight status and delays
- Aircraft registration and type
- Route waypoints and distance

### 4. Testing Your Setup

1. Add your FlightLabs API key to `.env.local`
2. Restart your development server
3. Test with flight numbers like:
   - `DL1102` (Delta Airlines)
   - `AA456` (American Airlines)
   - `UA1234` (United Airlines)

### 5. API Endpoints

- `GET /api/aviation-request?flight=DL1102` - Get flight data
- `POST /api/aviation-request` - Search flights

### 6. Free Tier Limitations

- **100 requests per month**
- Basic flight data
- No real-time live tracking
- Rate limiting applies

### 7. Upgrading (Optional)

For production use, consider upgrading to paid plans:
- **Starter**: $9.99/month - 1,000 requests
- **Professional**: $19.99/month - 5,000 requests
- **Business**: $49.99/month - 15,000 requests

### 8. Alternative APIs

If you need more data, consider:
- **AeroDataBox** - 1,000 free requests/month
- **AirLabs** - 100 free requests/hour
- **OpenSky Network** - Already integrated for real-time positions

## Current Status

Your app is now running with:
- ✅ Clean FlightLabs integration
- ✅ Mock data fallback
- ✅ Complete flight path information
- ✅ Origin/destination airport data
- ✅ Real-time position tracking (OpenSky)
- ✅ Error handling and graceful degradation

The application will work immediately with mock data, and when you add your FlightLabs API key, it will provide real flight data! 