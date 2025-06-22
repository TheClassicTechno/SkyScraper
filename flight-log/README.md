# Flight Log - Aviation Safety Dashboard

A comprehensive aviation safety dashboard with AI-powered flight tracking, weather analysis, and intelligent phone assistance.

## Features

- **Real-time Flight Tracking**: Monitor flights with live position data
- **Weather Analysis**: Get detailed weather conditions and turbulence reports
- **AI Flight Recommendations**: Intelligent route optimization and safety assessments
- **VapidAgent**: AI-powered phone assistant for calls, texts, and conversation summaries
- **Traffic Controller Safety**: All features designed with aviation safety as the top priority

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Keys (Optional)

The app works completely without API keys, but you can enhance functionality by adding them to a `.env.local` file:

```env
# Vapi AI - AI-powered calling and messaging
# Get your key at: https://vapi.ai (100 free minutes/month)
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key_here

# OpenWeatherMap - Enhanced weather data
# Get your key at: https://openweathermap.org/api (1000 free calls/day)
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here

# FlightLabs - Comprehensive flight data
# Get your key at: https://www.goflightlabs.com/ (100 free requests/month)
FLIGHTLABS_API_KEY=your_flightlabs_api_key_here
```

### VapidAgent Setup

The VapidAgent provides AI-powered phone assistance:

1. **Get a Vapi API Key**: Sign up at [vapi.ai](https://vapi.ai) for 100 free minutes/month
2. **Add to Environment**: Add `NEXT_PUBLIC_VAPI_API_KEY=your_key` to `.env.local`
3. **Restart Server**: Restart your development server
4. **Test**: Click the green phone icon to open VapidAgent

**Safety Features**:
- All operations prioritize user safety (traffic controller mindset)
- Phone number validation before calls
- Graceful error handling and fallbacks
- Rate limiting to respect API limits

## Learn More

- [API Setup Guide](./API_SETUP.md) - Detailed API configuration instructions
- [AI Demo Guide](./AI_DEMO.md) - Learn about AI flight recommendations
- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
