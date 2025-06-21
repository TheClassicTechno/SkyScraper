import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// Create Groq client using OpenAI-compatible interface
const groq = createOpenAI({
  name: 'groq',
  apiKey: process.env.GROQ_API_KEY ?? '',
  baseURL: 'https://api.groq.com/openai/v1',
})

export async function POST(req: Request) {
  const { messages, flightData } = await req.json()

  const systemPrompt = `You are an expert aviation safety AI assistant with deep knowledge of:
- Flight risk assessment and safety protocols
- Weather impact on aviation operations
- Air Traffic Control (ATC) procedures and load management
- Aircraft operations and maintenance
- Regulatory compliance (FAA, ICAO standards)
- Emergency procedures and crisis management
- Flight scheduling and optimization

Current flight data context:
${JSON.stringify(flightData, null, 2)}

Key guidelines:
- Always prioritize safety in your recommendations
- Provide specific, actionable advice
- Reference actual flight data when relevant
- Explain risk factors clearly
- Suggest concrete next steps
- Be concise but thorough
- Use aviation terminology appropriately
- Alert users to high-risk situations (>60% risk score)

Risk Score Interpretation:
- 0-39%: Low risk, normal operations
- 40-59%: Medium risk, monitor closely
- 60-79%: High risk, consider rescheduling
- 80-100%: Critical risk, immediate action required

IMPORTANT: If you assess the current situation has a risk score above 60%, you MUST prominently recommend that the user consider leaving or rescheduling their flight. Use clear, urgent language like "⚠️ HIGH RISK ALERT" to get their attention.`

  const result = await streamText({
    model: groq("llama-3.1-70b-versatile"), // or "mixtral-8x7b-32768" for faster responses
    system: systemPrompt,
    messages,
    temperature: 0.1, // Lower temperature for more consistent safety assessments
  })

  return result.toDataStreamResponse()
}