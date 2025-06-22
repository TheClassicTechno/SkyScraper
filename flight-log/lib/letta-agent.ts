/**
 * Letta Agent - Stateful AI Memory for Flight Tracking
 * Provides persistent memory and context management
 */

function serializeArray(arr: any[]): string {
  return JSON.stringify(arr || []);
}

function deserializeArray(str: string | null | undefined): any[] {
  if (!str) return [];
  try { return JSON.parse(str); } catch { return []; }
}

interface FlightMemory {
  id: string;
  flightNumber: string;
  date: string;
  riskScore: number;
  delay: number;
  weather: string;
  userActions: string[];
  outcome: 'on_time' | 'delayed' | 'cancelled' | 'early';
}

interface UserProfile {
  userId: string;
  riskTolerance: number; // 0-100 percentage
  preferredAirlines: string[];
  preferredTimes: string[]; // 'morning', 'afternoon', 'evening'
  flightHistory: FlightMemory[];
  safetyStreak: number;
  lastInteraction: Date;
  commonQueries: string[];
}

interface LettaContext {
  userProfile: UserProfile;
  recentFlights: FlightMemory[];
  currentFlight?: FlightMemory;
  safetyAlerts: string[];
  recommendations: string[];
}

class LettaAgent {
  private flightMemories: Map<string, FlightMemory[]> = new Map();
  private conversationHistory: Map<string, any[]> = new Map();
  private userProfiles: Map<string, UserProfile> = new Map();

  constructor() {
    // Initialize with some demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Initialize demo user profile in memory
    const demoProfile: UserProfile = {
      userId: 'demo-user',
      riskTolerance: 50,
      preferredAirlines: ['Delta', 'Southwest'],
      preferredTimes: ['morning', 'afternoon'],
      flightHistory: [],
      safetyStreak: 0,
      lastInteraction: new Date(),
      commonQueries: ['weather', 'risk', 'delay']
    };
    this.userProfiles.set('demo-user', demoProfile);
  }

  /**
   * Get or create user profile
   */
  async getUserProfile(userId: string): Promise<UserProfile> {
    let profile = this.userProfiles.get(userId);
    if (!profile) {
      profile = {
        userId,
        riskTolerance: 50,
        preferredAirlines: ['Delta', 'Southwest'],
        preferredTimes: ['morning', 'afternoon'],
        flightHistory: [],
        safetyStreak: 0,
        lastInteraction: new Date(),
        commonQueries: ['weather', 'risk', 'delay']
      };
      this.userProfiles.set(userId, profile);
    }
    return profile;
  }

  /**
   * Store flight memory
   */
  async storeFlightMemory(
    userId: string,
    flightNumber: string,
    riskScore: number,
    weather: string,
    userActions: string[] = []
  ): Promise<string> {
    const memoryId = `flight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const memory: FlightMemory = {
      id: memoryId,
      flightNumber,
      date: new Date().toISOString(),
      riskScore,
      delay: 0, // Will be updated later
      weather,
      userActions,
      outcome: 'on_time'
    };

    if (!this.flightMemories.has(userId)) {
      this.flightMemories.set(userId, []);
    }

    this.flightMemories.get(userId)!.push(memory);
    
    // Update user profile
    await this.updateUserProfileFromMemory(userId, memory);
    
    return memoryId;
  }

  /**
   * Get relevant memories for context
   */
  async getRelevantMemories(
    userId: string,
    query: string,
    limit: number = 5
  ): Promise<FlightMemory[]> {
    const memories = this.flightMemories.get(userId) || [];
    
    // Simple relevance scoring
    const scoredMemories = memories.map(memory => ({
      ...memory,
      relevance: this.calculateRelevance(query, memory)
    }));

    scoredMemories.sort((a, b) => b.relevance - a.relevance);
    return scoredMemories.slice(0, limit).map(({ relevance, ...memory }) => memory);
  }

  /**
   * Generate intelligent recommendations
   */
  async generateRecommendations(
    userId: string,
    currentFlight: any
  ): Promise<string[]> {
    const profile = await this.getUserProfile(userId);
    const recentFlights = await this.getRelevantMemories(userId, currentFlight.flight?.number || '', 10);
    
    const recommendations: string[] = [];

    // Risk-based recommendations using personal risk tolerance
    if (currentFlight.riskScore > profile.riskTolerance) {
      recommendations.push(`⚠️ Risk alert: This flight has ${currentFlight.riskScore}% risk, but your tolerance is ${profile.riskTolerance}%.`);
    }

    // Historical recommendations
    const similarFlights = recentFlights.filter(f => 
      f.flightNumber.includes(currentFlight.airline?.iata || '')
    );
    
    if (similarFlights.length > 0) {
      const avgDelay = similarFlights.reduce((sum, f) => sum + f.delay, 0) / similarFlights.length;
      if (avgDelay > 30) {
        recommendations.push(`📊 Historical data: Similar ${currentFlight.airline?.name} flights average ${Math.round(avgDelay)}min delays.`);
      }
    }

    // Preference-based recommendations
    if (profile.preferredAirlines.length > 0 && 
        !profile.preferredAirlines.includes(currentFlight.airline?.name)) {
      recommendations.push(`💡 You usually prefer ${profile.preferredAirlines.join(' or ')}. This is ${currentFlight.airline?.name}.`);
    }

    // Safety streak encouragement
    if (profile.safetyStreak > 0) {
      recommendations.push(`🏆 Safety streak: ${profile.safetyStreak} flights without issues! Keep it up!`);
    }

    return recommendations;
  }

  /**
   * Generate context for Claude AI
   */
  async generateClaudeContext(
    userId: string,
    query: string,
    flightData: any[]
  ): Promise<string> {
    const profile = await this.getUserProfile(userId);
    const relevantMemories = await this.getRelevantMemories(userId, query, 3);
    const recommendations = await this.generateRecommendations(userId, flightData[0] || {});

    let context = "=== LETTA MEMORY CONTEXT ===\n\n";
    
    // User Profile
    context += `👤 USER PROFILE:\n`;
    context += `- Risk Tolerance: ${profile.riskTolerance}%\n`;
    context += `- Preferred Airlines: ${profile.preferredAirlines.join(', ') || 'None specified'}\n`;
    context += `- Safety Streak: ${profile.safetyStreak} flights\n`;
    context += `- Common Queries: ${profile.commonQueries.join(', ')}\n\n`;

    // Recent Flight History
    if (relevantMemories.length > 0) {
      context += `📋 RECENT FLIGHT HISTORY:\n`;
      relevantMemories.forEach((memory, index) => {
        context += `${index + 1}. ${memory.flightNumber} (${memory.date.split('T')[0]}) - Risk: ${memory.riskScore}%, Weather: ${memory.weather}\n`;
        if (memory.userActions.length > 0) {
          context += `   Actions: ${memory.userActions.join(', ')}\n`;
        }
      });
      context += "\n";
    }

    // Intelligent Recommendations
    if (recommendations.length > 0) {
      context += `💡 LETTA RECOMMENDATIONS:\n`;
      recommendations.forEach(rec => {
        context += `- ${rec}\n`;
      });
      context += "\n";
    }

    // Current Flight Context
    if (flightData.length > 0) {
      context += `✈️ CURRENT FLIGHT DATA:\n`;
      context += JSON.stringify(flightData, null, 2);
      context += "\n\n";
    }

    context += "=== END LETTA CONTEXT ===\n\n";
    
    return context;
  }

  /**
   * Update user profile with new settings
   */
  async updateUserProfile(userId: string, settings: any): Promise<UserProfile> {
    const profile = await this.getUserProfile(userId);
    // Update profile with new settings
    if (settings.riskTolerance !== undefined) {
      profile.riskTolerance = settings.riskTolerance;
    }
    if (settings.preferredAirlines !== undefined) {
      profile.preferredAirlines = settings.preferredAirlines;
    }
    if (settings.preferredTimes !== undefined) {
      profile.preferredTimes = settings.preferredTimes;
    }
    profile.lastInteraction = new Date();
    
    // Also update in-memory storage
    this.userProfiles.set(userId, profile);
    
    return profile;
  }

  /**
   * Update user profile based on interactions
   */
  private async updateUserProfileFromMemory(userId: string, memory: FlightMemory): Promise<void> {
    const profile = await this.getUserProfile(userId);
    
    // Update risk tolerance based on flight choices
    if (memory.riskScore < 30) {
      profile.safetyStreak++;
    } else {
      profile.safetyStreak = 0;
    }

    // Update preferred airlines
    const airline = memory.flightNumber.replace(/\d/g, '');
    if (!profile.preferredAirlines.includes(airline)) {
      profile.preferredAirlines.push(airline);
    }

    profile.lastInteraction = new Date();
    
    // Also update in-memory storage
    this.userProfiles.set(userId, profile);
  }

  /**
   * Calculate relevance score
   */
  private calculateRelevance(query: string, memory: FlightMemory): number {
    const queryLower = query.toLowerCase();
    const flightLower = memory.flightNumber.toLowerCase();
    
    let score = 0;
    
    // Flight number match
    if (queryLower.includes(flightLower) || flightLower.includes(queryLower)) {
      score += 0.8;
    }
    
    // Weather relevance
    if (queryLower.includes('weather') && memory.weather) {
      score += 0.6;
    }
    
    // Risk relevance
    if (queryLower.includes('risk') || queryLower.includes('safety')) {
      score += 0.5;
    }
    
    // Recency bonus
    const daysAgo = (Date.now() - new Date(memory.date).getTime()) / (1000 * 60 * 60 * 24);
    if (daysAgo < 7) score += 0.3;
    if (daysAgo < 30) score += 0.2;
    
    return Math.min(score, 1.0);
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId: string): Promise<any> {
    const profile = await this.getUserProfile(userId);
    const memories = this.flightMemories.get(userId) || [];
    
    return {
      totalFlights: memories.length,
      averageRisk: memories.length > 0 ? 
        memories.reduce((sum, m) => sum + m.riskScore, 0) / memories.length : 0,
      safetyStreak: profile.safetyStreak,
      preferredAirlines: profile.preferredAirlines,
      riskTolerance: profile.riskTolerance,
    };
  }
}

// Export singleton instance
export const lettaAgent = new LettaAgent();