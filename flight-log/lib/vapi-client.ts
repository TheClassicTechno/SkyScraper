/**
 * Vapi Client - AI-powered calling and messaging
 * Get your API key at: https://vapi.ai
 * 
 * Note: This client is for server-side API operations (outbound calls, messages)
 * For client-side voice interactions, use the VapidAgent component with Vapi Web SDK
 */

interface VapiCallRequest {
  phoneNumber: string
  message?: string
  assistantId?: string
  workflowId?: string  // Added support for workflows
  metadata?: Record<string, any>
}

interface VapiMessageRequest {
  phoneNumber: string
  message: string
  assistantId?: string
  workflowId?: string  // Added support for workflows
}

interface VapiResponse {
  success: boolean
  message: string
  callId?: string
  error?: string
  data?: any  // Added for additional response data
}

interface VapiAssistant {
  id: string
  name: string
  model?: string
  voice?: string
  firstMessage?: string
}

interface VapiWorkflow {
  id: string
  name: string
  description?: string
}

class VapiClient {
  private apiKey: string
  private baseURL = 'https://api.vapi.ai'

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY || process.env.VAPI_API_KEY || ''
  }

  /**
   * Validate phone number format
   */
  private validatePhoneNumber(phoneNumber: string): boolean {
    // Basic phone number validation - should be at least 10 digits
    const cleanNumber = phoneNumber.replace(/\D/g, '')
    return cleanNumber.length >= 10 && cleanNumber.length <= 15
  }

  /**
   * Sanitize phone number for API calls
   */
  private sanitizePhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters except + at the beginning
    let sanitized = phoneNumber.replace(/[^\d+]/g, '')
    
    // Ensure it starts with + for international format
    if (!sanitized.startsWith('+')) {
      // Assume US number if no country code
      sanitized = '+1' + sanitized.replace(/^1/, '')
    }
    
    return sanitized
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.apiKey) {
      throw new Error('Vapi API key not configured. Please set NEXT_PUBLIC_VAPI_API_KEY or VAPI_API_KEY in your environment variables.')
    }

    const url = `${this.baseURL}${endpoint}`
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `Vapi API error: ${response.status}`
        
        try {
          const errorJson = JSON.parse(errorText)
          errorMessage += ` - ${errorJson.message || errorJson.error || errorText}`
        } catch {
          errorMessage += ` - ${errorText}`
        }
        
        throw new Error(errorMessage)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return response.json()
      } else {
        return { message: await response.text() }
      }
    } catch (error: any) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Unable to connect to Vapi API. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Place an AI-powered phone call
   */
  async placeCall(request: VapiCallRequest): Promise<VapiResponse> {
    try {
      // Safety check: Validate phone number
      if (!this.validatePhoneNumber(request.phoneNumber)) {
        return {
          success: false,
          message: 'Invalid phone number format. Please provide a valid phone number.',
          error: 'Phone number validation failed'
        }
      }

      const sanitizedPhone = this.sanitizePhoneNumber(request.phoneNumber)
      
      // Prepare call payload
      const callPayload: any = {
        phoneNumber: sanitizedPhone,
        metadata: {
          source: 'vapid-agent',
          safety: 'traffic-controller-verified',
          ...request.metadata
        },
      }

      // Add assistant or workflow ID
      if (request.assistantId) {
        callPayload.assistantId = request.assistantId
      } else if (request.workflowId) {
        callPayload.workflowId = request.workflowId
      }

      // Add custom message if provided
      if (request.message) {
        callPayload.message = request.message
      }

      // Use the correct Vapi API endpoint for calls
      const response = await this.makeRequest('/call', {
        method: 'POST',
        body: JSON.stringify(callPayload),
      })

      return {
        success: true,
        message: 'Call initiated successfully',
        callId: response.id || response.callId,
        data: response
      }
    } catch (error: any) {
      console.error('Vapi call error:', error)
      return {
        success: false,
        message: 'Failed to place call',
        error: error.message,
      }
    }
  }

  /**
   * Send an AI-powered text message
   */
  async sendMessage(request: VapiMessageRequest): Promise<VapiResponse> {
    try {
      // Safety check: Validate phone number
      if (!this.validatePhoneNumber(request.phoneNumber)) {
        return {
          success: false,
          message: 'Invalid phone number format. Please provide a valid phone number.',
          error: 'Phone number validation failed'
        }
      }

      const sanitizedPhone = this.sanitizePhoneNumber(request.phoneNumber)
      
      // Prepare message payload
      const messagePayload: any = {
        phoneNumber: sanitizedPhone,
        message: request.message,
        metadata: {
          source: 'vapid-agent',
          safety: 'traffic-controller-verified'
        }
      }

      // Add assistant or workflow ID
      if (request.assistantId) {
        messagePayload.assistantId = request.assistantId
      } else if (request.workflowId) {
        messagePayload.workflowId = request.workflowId
      }

      // Use the correct Vapi API endpoint for messages
      const response = await this.makeRequest('/message', {
        method: 'POST',
        body: JSON.stringify(messagePayload),
      })

      return {
        success: true,
        message: 'Message sent successfully',
        callId: response.id || response.messageId,
        data: response
      }
    } catch (error: any) {
      console.error('Vapi message error:', error)
      return {
        success: false,
        message: 'Failed to send message',
        error: error.message,
      }
    }
  }

  /**
   * Get call history and summaries
   */
  async getCallHistory(): Promise<any[]> {
    try {
      const response = await this.makeRequest('/calls')
      return response.data || response.calls || []
    } catch (error: any) {
      console.error('Failed to fetch call history:', error)
      return []
    }
  }

  /**
   * Get call summary by ID
   */
  async getCallSummary(callId: string): Promise<string> {
    try {
      const response = await this.makeRequest(`/call/${callId}/summary`)
      return response.summary || response.transcript || 'No summary available'
    } catch (error: any) {
      console.error('Failed to fetch call summary:', error)
      return 'Unable to retrieve call summary'
    }
  }

  /**
   * Get available assistants
   */
  async getAssistants(): Promise<VapiAssistant[]> {
    try {
      const response = await this.makeRequest('/assistants')
      return response.data || response.assistants || []
    } catch (error: any) {
      console.error('Failed to fetch assistants:', error)
      return []
    }
  }

  /**
   * Get available workflows
   */
  async getWorkflows(): Promise<VapiWorkflow[]> {
    try {
      const response = await this.makeRequest('/workflows')
      return response.data || response.workflows || []
    } catch (error: any) {
      console.error('Failed to fetch workflows:', error)
      return []
    }
  }

  /**
   * Get specific call details
   */
  async getCall(callId: string): Promise<any> {
    try {
      const response = await this.makeRequest(`/call/${callId}`)
      return response
    } catch (error: any) {
      console.error('Failed to fetch call details:', error)
      return null
    }
  }

  /**
   * Cancel/end an active call
   */
  async endCall(callId: string): Promise<VapiResponse> {
    try {
      const response = await this.makeRequest(`/call/${callId}/end`, {
        method: 'POST',
      })

      return {
        success: true,
        message: 'Call ended successfully',
        data: response
      }
    } catch (error: any) {
      console.error('Failed to end call:', error)
      return {
        success: false,
        message: 'Failed to end call',
        error: error.message,
      }
    }
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      // Try to fetch assistants as a health check
      await this.makeRequest('/assistants')
      return true
    } catch (error) {
      console.error('API connection test failed:', error)
      return false
    }
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey.length > 0
  }

  /**
   * Get API key status (for debugging)
   */
  getApiKeyStatus(): { configured: boolean; keyType: string; maskedKey: string } {
    if (!this.apiKey) {
      return { configured: false, keyType: 'none', maskedKey: '' }
    }
    
    const keyType = this.apiKey.startsWith('pk_') ? 'public' : 
                   this.apiKey.startsWith('sk_') ? 'private' : 'unknown'
    const maskedKey = this.apiKey.substring(0, 8) + '...' + this.apiKey.substring(this.apiKey.length - 4)
    
    return { configured: true, keyType, maskedKey }
  }

  /**
   * Validate configuration for web client usage
   */
  validateWebConfig(): { valid: boolean; issues: string[] } {
    const issues: string[] = []
    
    if (!this.apiKey) {
      issues.push('API key not configured')
    }
    
    if (this.apiKey && this.apiKey.startsWith('sk_')) {
      issues.push('Using private key in client-side code (security risk)')
    }
    
    if (!process.env.NEXT_PUBLIC_WORKFLOW_ID && !process.env.WORKFLOW_ID) {
      issues.push('Workflow ID not configured')
    }
    
    return {
      valid: issues.length === 0,
      issues
    }
  }
}

// Export singleton instance
export const vapiClient = new VapiClient()

// Export types for use in components
export type { VapiCallRequest, VapiMessageRequest, VapiResponse, VapiAssistant, VapiWorkflow }