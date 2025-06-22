# Aviation API Setup Guide

This application integrates with free aviation APIs to provide accurate flight tracking and turbulence data.

## Required API Keys (Optional)

Create a `.env.local` file in the `flight-log` directory with the following API key (optional):

```env
# OpenWeatherMap API (free tier available)
# Get your key at: https://openweathermap.org/api
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

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