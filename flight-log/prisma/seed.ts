import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.riskAssessment.deleteMany();
  await prisma.flight.deleteMany();
  await prisma.airlineHub.deleteMany();
  await prisma.flightRoute.deleteMany();
  await prisma.aircraft.deleteMany();
  await prisma.airline.deleteMany();
  await prisma.airport.deleteMany();

  // Create Airlines
  const airlines = await Promise.all([
    prisma.airline.create({
      data: {
        name: 'American Airlines',
        iataCode: 'AA',
        icaoCode: 'AAL',
        country: 'United States'
      }
    }),
    prisma.airline.create({
      data: {
        name: 'Delta Air Lines',
        iataCode: 'DL',
        icaoCode: 'DAL',
        country: 'United States'
      }
    }),
    prisma.airline.create({
      data: {
        name: 'United Airlines',
        iataCode: 'UA',
        icaoCode: 'UAL',
        country: 'United States'
      }
    }),
    prisma.airline.create({
      data: {
        name: 'Southwest Airlines',
        iataCode: 'WN',
        icaoCode: 'SWA',
        country: 'United States'
      }
    })
  ]);

  // Create Airports
  const airports = await Promise.all([
    // Major US airports
    prisma.airport.create({
      data: {
        name: 'John F. Kennedy International Airport',
        iataCode: 'JFK',
        icaoCode: 'KJFK',
        city: 'New York',
        country: 'United States',
        timezone: 'America/New_York',
        latitude: 40.6413,
        longitude: -73.7781,
        altitude: 13
      }
    }),
    prisma.airport.create({
      data: {
        name: 'Los Angeles International Airport',
        iataCode: 'LAX',
        icaoCode: 'KLAX',
        city: 'Los Angeles',
        country: 'United States',
        timezone: 'America/Los_Angeles',
        latitude: 33.9416,
        longitude: -118.4085,
        altitude: 125
      }
    }),
    prisma.airport.create({
      data: {
        name: 'Dallas/Fort Worth International Airport',
        iataCode: 'DFW',
        icaoCode: 'KDFW',
        city: 'Dallas',
        country: 'United States',
        timezone: 'America/Chicago',
        latitude: 32.8968,
        longitude: -97.0380,
        altitude: 607
      }
    }),
    prisma.airport.create({
      data: {
        name: 'Miami International Airport',
        iataCode: 'MIA',
        icaoCode: 'KMIA',
        city: 'Miami',
        country: 'United States',
        timezone: 'America/New_York',
        latitude: 25.7932,
        longitude: -80.2906,
        altitude: 8
      }
    }),
    prisma.airport.create({
      data: {
        name: 'Princess Juliana International Airport',
        iataCode: 'SXM',
        icaoCode: 'TNCM',
        city: 'Philipsburg',
        country: 'Sint Maarten',
        timezone: 'America/Puerto_Rico',
        latitude: 18.0409,
        longitude: -63.1089,
        altitude: 14
      }
    }),
    prisma.airport.create({
      data: {
        name: 'O\'Hare International Airport',
        iataCode: 'ORD',
        icaoCode: 'KORD',
        city: 'Chicago',
        country: 'United States',
        timezone: 'America/Chicago',
        latitude: 41.9786,
        longitude: -87.9048,
        altitude: 672
      }
    }),
    prisma.airport.create({
      data: {
        name: 'Hartsfield-Jackson Atlanta International Airport',
        iataCode: 'ATL',
        icaoCode: 'KATL',
        city: 'Atlanta',
        country: 'United States',
        timezone: 'America/New_York',
        latitude: 33.6407,
        longitude: -84.4277,
        altitude: 1026
      }
    }),
    prisma.airport.create({
      data: {
        name: 'Denver International Airport',
        iataCode: 'DEN',
        icaoCode: 'KDEN',
        city: 'Denver',
        country: 'United States',
        timezone: 'America/Denver',
        latitude: 39.8561,
        longitude: -104.6737,
        altitude: 5431
      }
    })
  ]);

  // Create Aircraft
  const aircraft = await Promise.all([
    prisma.aircraft.create({
      data: {
        registration: 'N12345',
        iataCode: 'B738',
        icaoCode: 'B738',
        model: 'Boeing 737-800',
        manufacturer: 'Boeing',
        type: 'narrow-body',
        maxPassengers: 189,
        maxRange: 3200
      }
    }),
    prisma.aircraft.create({
      data: {
        registration: 'N67890',
        iataCode: 'B772',
        icaoCode: 'B772',
        model: 'Boeing 777-200',
        manufacturer: 'Boeing',
        type: 'wide-body',
        maxPassengers: 301,
        maxRange: 5200
      }
    }),
    prisma.aircraft.create({
      data: {
        registration: 'N11111',
        iataCode: 'A320',
        icaoCode: 'A320',
        model: 'Airbus A320',
        manufacturer: 'Airbus',
        type: 'narrow-body',
        maxPassengers: 180,
        maxRange: 3300
      }
    })
  ]);

  // Create specific flights with real routes
  const flights = await Promise.all([
    // AA456: SXM -> MIA (American Airlines)
    prisma.flight.create({
      data: {
        flightNumber: 'AA456',
        iataCode: 'AA456',
        icaoCode: 'AAL456',
        status: 'scheduled',
        date: new Date(),
        airlineId: airlines[0].id, // American Airlines
        departureId: airports[4].id, // SXM
        arrivalId: airports[3].id, // MIA
        aircraftId: aircraft[0].id, // Boeing 737-800
        departureTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        arrivalTime: new Date(Date.now() + 3.5 * 60 * 60 * 1000), // 3.5 hours from now
        departureTerminal: 'A',
        arrivalTerminal: 'D',
        departureGate: 'A5',
        arrivalGate: 'D12',
        riskScore: 25,
        weather: 'Clear',
        atcLoad: 'Light'
      }
    }),
    // DL1102: ATL -> LAX (Delta Airlines)
    prisma.flight.create({
      data: {
        flightNumber: 'DL1102',
        iataCode: 'DL1102',
        icaoCode: 'DAL1102',
        status: 'scheduled',
        date: new Date(),
        airlineId: airlines[1].id, // Delta Airlines
        departureId: airports[6].id, // ATL
        arrivalId: airports[1].id, // LAX
        aircraftId: aircraft[1].id, // Boeing 777-200
        departureTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000),
        arrivalTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
        departureTerminal: 'T',
        arrivalTerminal: 'B',
        departureGate: 'T15',
        arrivalGate: 'B8',
        riskScore: 35,
        weather: 'Partly Cloudy',
        atcLoad: 'Moderate'
      }
    }),
    // UA789: ORD -> DEN (United Airlines)
    prisma.flight.create({
      data: {
        flightNumber: 'UA789',
        iataCode: 'UA789',
        icaoCode: 'UAL789',
        status: 'scheduled',
        date: new Date(),
        airlineId: airlines[2].id, // United Airlines
        departureId: airports[5].id, // ORD
        arrivalId: airports[7].id, // DEN
        aircraftId: aircraft[2].id, // Airbus A320
        departureTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
        arrivalTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
        departureTerminal: 'C',
        arrivalTerminal: 'A',
        departureGate: 'C10',
        arrivalGate: 'A15',
        riskScore: 20,
        weather: 'Clear',
        atcLoad: 'Light'
      }
    }),
    // WN123: DFW -> LAX (Southwest Airlines)
    prisma.flight.create({
      data: {
        flightNumber: 'WN123',
        iataCode: 'WN123',
        icaoCode: 'SWA123',
        status: 'scheduled',
        date: new Date(),
        airlineId: airlines[3].id, // Southwest Airlines
        departureId: airports[2].id, // DFW
        arrivalId: airports[1].id, // LAX
        aircraftId: aircraft[0].id, // Boeing 737-800
        departureTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
        arrivalTime: new Date(Date.now() + 7.5 * 60 * 60 * 1000),
        departureTerminal: 'D',
        arrivalTerminal: 'C',
        departureGate: 'D8',
        arrivalGate: 'C5',
        riskScore: 30,
        weather: 'Clear',
        atcLoad: 'Moderate'
      }
    })
  ]);

  console.log(`✅ Seeded database with:
    - ${airlines.length} airlines
    - ${airports.length} airports
    - ${aircraft.length} aircraft
    - ${flights.length} flights`);

  console.log('🌱 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 