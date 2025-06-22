'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useFlight } from '../contexts/FlightContext';
import { fetchFlightData } from '../api/aviation-request/route';

export default function FlightButton({ flightNumber, selectedAirline }: { flightNumber: string; selectedAirline: string }) {
  const router = useRouter();
  const { setFlightData } = useFlight();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!flightNumber || !selectedAirline) return;
    setLoading(true);

    try {
      await fetchFlightData(flightNumber, (data) => {
        setFlightData(data);  // ✅ context update happens here!
      });
      router.push('/flight-score');
    } catch (error) {
      console.error(error);
      router.push('/error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={!flightNumber || !selectedAirline || loading}
      className="w-full h-10 sm:h-12 text-base sm:text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200"
    >
      <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
      {loading ? 'Loading...' : 'Track Flight'}
    </Button>
  );
}
