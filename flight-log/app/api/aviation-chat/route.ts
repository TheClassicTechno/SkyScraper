import { streamText } from "ai"
import { createAnthropic } from "@ai-sdk/anthropic"

// Create Anthropic client for Claude
const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? '',
})

export async function POST(req: Request) {
  try {
    const { messages, flightData } = await req.json()

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ 
        error: "API key not configured",
        message: "Please configure the ANTHROPIC_API_KEY environment variable"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const systemPrompt = `You are an expert aviation safety AI assistant named skAI with deep knowledge of:
- Flight risk assessment and safety protocols
- Weather impact on aviation operations
- Air Traffic Control (ATC) procedures and load management
- Aircraft operations and maintenance
- Regulatory compliance (FAA, ICAO standards)
- Emergency procedures and crisis management
- Flight scheduling and optimization

You are a friendly and short and concise assistant who answers questions without any fluff.

Current flight data context:
${JSON.stringify(flightData, null, 2)}

Key guidelines:
- Always prioritize safety in your recommendations
- Provide specific, actionable advice based on the actual flight data provided
- Reference specific flights, risk scores, and conditions when relevant
- Explain risk factors clearly and their potential impact
- Suggest concrete next steps for risk mitigation
- Be concise but thorough in your responses
- Use aviation terminology appropriately
- Alert users to high-risk situations (>60% risk score)
- Answer questions based on the information available in the flight data
- If asked about specific flights, analyze their risk factors and provide recommendations
- If asked about weather impact, reference the weather data in the flight information
- If asked about ATC load, consider the current traffic situation

Risk Score Interpretation:
- 0-39%: Low risk, normal operations
- 40-59%: Medium risk, monitor closely
- 60-79%: High risk, consider rescheduling
- 80-100%: Critical risk, immediate action required

IMPORTANT: 
- Always base your responses on the actual flight data provided
- If you assess the current situation has a risk score above 60%, you MUST prominently recommend that the user consider leaving or rescheduling their flight
- Use clear, urgent language like "⚠️ HIGH RISK ALERT" to get their attention
- Provide specific recommendations based on the available information
- If asked about something not covered in the flight data, acknowledge the limitation and suggest what additional information would be helpful`

    // Check if client wants streaming response
    const acceptHeader = req.headers.get('accept') || ''
    const wantsStreaming = acceptHeader.includes('text/event-stream')

    if (wantsStreaming) {
      const result = await streamText({
        model: anthropic("claude-3-5-sonnet-20241022"),
        system: systemPrompt,
        messages,
        temperature: 0.1,
      })
      return result.toDataStreamResponse()
    } else {
      // Regular JSON response for non-streaming clients
      const result = await streamText({
        model: anthropic("claude-3-5-sonnet-20241022"),
        system: systemPrompt,
        messages,
        temperature: 0.1,
      })

      // Collect the full text from the stream
      let fullText = ''
      for await (const chunk of result.textStream) {
        fullText += chunk
      }
      
      return new Response(JSON.stringify({ 
        message: fullText,
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

  } catch (error) {
    console.error('Error in aviation chat API:', error)
    
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      message: "An error occurred while processing your request. Please try again."
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}