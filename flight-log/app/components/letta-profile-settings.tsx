"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Brain, 
  Settings, 
  Save, 
  RefreshCw,
  Shield,
  Clock,
  Plane,
  Bell,
  CheckCircle
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface ProfileSettings {
  riskTolerance: number;
  preferredAirlines: string[];
  preferredTimes: string[];
}

const AVAILABLE_AIRLINES = [
  'Delta', 'American', 'United', 'Southwest', 'JetBlue', 
  'Alaska', 'Spirit', 'Frontier', 'Hawaiian', 'Allegiant'
];

const TIME_OPTIONS = [
  { value: 'morning', label: 'Morning (6AM-12PM)', icon: '🌅' },
  { value: 'afternoon', label: 'Afternoon (12PM-6PM)', icon: '☀️' },
  { value: 'evening', label: 'Evening (6PM-12AM)', icon: '🌆' },
  { value: 'night', label: 'Night (12AM-6AM)', icon: '🌙' }
];

export function LettaProfileSettings({ 
  userId = 'demo-user',
  onProfileUpdate 
}: { 
  userId?: string;
  onProfileUpdate?: (profile: any) => void;
}) {
  const [settings, setSettings] = useState<ProfileSettings>({
    riskTolerance: 5,
    preferredAirlines: ['Delta', 'Southwest'],
    preferredTimes: ['morning', 'afternoon'],
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      const response = await fetch(`/api/letta-context?userId=${userId}`);
      const data = await response.json();
      
      if (data.success && data.userProfile) {
        setSettings({
          riskTolerance: data.userProfile.riskTolerance,
          preferredAirlines: data.userProfile.preferredAirlines,
          preferredTimes: data.userProfile.preferredTimes,
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const saveProfile = async () => {
    setIsSaving(true);
    try {
      console.log('Saving profile with settings:', settings);
      const response = await fetch('/api/letta-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          settings
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Save response:', result);
        setLastSaved(new Date());
        onProfileUpdate?.(settings);
      } else {
        console.error('Save failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleAirline = (airline: string) => {
    setSettings(prev => ({
      ...prev,
      preferredAirlines: prev.preferredAirlines.includes(airline)
        ? prev.preferredAirlines.filter(a => a !== airline)
        : [...prev.preferredAirlines, airline]
    }));
  };

  const toggleTime = (time: string) => {
    setSettings(prev => ({
      ...prev,
      preferredTimes: prev.preferredTimes.includes(time)
        ? prev.preferredTimes.filter(t => t !== time)
        : [...prev.preferredTimes, time]
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Letta AI Profile Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Tolerance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Maximum Risk Score
            </label>
            <Badge variant="outline">
              {settings.riskTolerance}%
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="0"
              max="100"
              value={settings.riskTolerance}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setSettings(prev => ({ ...prev, riskTolerance: Math.min(100, Math.max(0, value)) }));
              }}
              className="w-24"
              placeholder="50"
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
          <p className="text-xs text-gray-500">
            Maximum risk score you're willing to accept for a flight (0-100%)
          </p>
        </div>

        {/* Preferred Airlines */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <Plane className="w-4 h-4" />
            Preferred Airlines
          </label>
          <div className="grid grid-cols-2 gap-2">
            {AVAILABLE_AIRLINES.map((airline) => (
              <div key={airline} className="flex items-center space-x-2">
                <Checkbox
                  id={airline}
                  checked={settings.preferredAirlines.includes(airline)}
                  onCheckedChange={() => toggleAirline(airline)}
                />
                <label htmlFor={airline} className="text-sm">
                  {airline}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Preferred Times */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Preferred Flight Times
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TIME_OPTIONS.map((time) => (
              <div key={time.value} className="flex items-center space-x-2">
                <Checkbox
                  id={time.value}
                  checked={settings.preferredTimes.includes(time.value)}
                  onCheckedChange={() => toggleTime(time.value)}
                />
                <label htmlFor={time.value} className="text-sm">
                  {time.icon} {time.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <Button
              onClick={saveProfile}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
            {lastSaved && (
              <span className="text-xs text-gray-500">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
          <Button
            variant="outline"
            onClick={loadProfile}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 