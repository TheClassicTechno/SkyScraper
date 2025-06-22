-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightNumber" TEXT NOT NULL,
    "iataCode" TEXT NOT NULL,
    "icaoCode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "airlineId" TEXT NOT NULL,
    "departureId" TEXT NOT NULL,
    "arrivalId" TEXT NOT NULL,
    "aircraftId" TEXT,
    "departureTime" DATETIME NOT NULL,
    "arrivalTime" DATETIME NOT NULL,
    "departureDelay" INTEGER NOT NULL DEFAULT 0,
    "arrivalDelay" INTEGER NOT NULL DEFAULT 0,
    "departureTerminal" TEXT,
    "arrivalTerminal" TEXT,
    "departureGate" TEXT,
    "arrivalGate" TEXT,
    "departureRunway" TEXT,
    "arrivalRunway" TEXT,
    "baggageClaim" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "altitude" REAL,
    "speed" REAL,
    "heading" REAL,
    "verticalRate" REAL,
    "onGround" BOOLEAN NOT NULL DEFAULT false,
    "lastUpdate" DATETIME,
    "riskScore" INTEGER NOT NULL DEFAULT 0,
    "weather" TEXT NOT NULL DEFAULT 'Unknown',
    "atcLoad" TEXT NOT NULL DEFAULT 'Unknown',
    CONSTRAINT "Flight_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flight_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "Airport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flight_arrivalId_fkey" FOREIGN KEY ("arrivalId") REFERENCES "Airport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flight_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircraft" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Airline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "iataCode" TEXT NOT NULL,
    "icaoCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AirlineHub" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "airlineId" TEXT NOT NULL,
    "airportId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AirlineHub_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AirlineHub_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Airport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "iataCode" TEXT NOT NULL,
    "icaoCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "altitude" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Aircraft" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registration" TEXT NOT NULL,
    "iataCode" TEXT NOT NULL,
    "icaoCode" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "maxPassengers" INTEGER NOT NULL,
    "maxRange" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FlightRoute" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "airlineId" TEXT NOT NULL,
    "originId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "duration" REAL NOT NULL,
    "frequency" TEXT NOT NULL DEFAULT 'daily',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FlightRoute_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FlightRoute_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Airport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FlightRoute_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Airport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeatherAlert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "altitude" INTEGER NOT NULL,
    "radius" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RiskAssessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "overallRisk" INTEGER NOT NULL,
    "weatherRisk" INTEGER NOT NULL,
    "aircraftRisk" INTEGER NOT NULL,
    "routeRisk" INTEGER NOT NULL,
    "crewRisk" INTEGER NOT NULL,
    "factors" TEXT NOT NULL,
    "recommendations" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RiskAssessment_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Flight_flightNumber_key" ON "Flight"("flightNumber");

-- CreateIndex
CREATE INDEX "Flight_flightNumber_idx" ON "Flight"("flightNumber");

-- CreateIndex
CREATE INDEX "Flight_date_idx" ON "Flight"("date");

-- CreateIndex
CREATE INDEX "Flight_status_idx" ON "Flight"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Airline_iataCode_key" ON "Airline"("iataCode");

-- CreateIndex
CREATE UNIQUE INDEX "Airline_icaoCode_key" ON "Airline"("icaoCode");

-- CreateIndex
CREATE UNIQUE INDEX "AirlineHub_airlineId_airportId_key" ON "AirlineHub"("airlineId", "airportId");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_iataCode_key" ON "Airport"("iataCode");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_icaoCode_key" ON "Airport"("icaoCode");

-- CreateIndex
CREATE UNIQUE INDEX "Aircraft_registration_key" ON "Aircraft"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "FlightRoute_airlineId_originId_destinationId_key" ON "FlightRoute"("airlineId", "originId", "destinationId");

-- CreateIndex
CREATE INDEX "WeatherAlert_type_idx" ON "WeatherAlert"("type");

-- CreateIndex
CREATE INDEX "WeatherAlert_severity_idx" ON "WeatherAlert"("severity");

-- CreateIndex
CREATE INDEX "WeatherAlert_startTime_idx" ON "WeatherAlert"("startTime");

-- CreateIndex
CREATE UNIQUE INDEX "RiskAssessment_flightId_key" ON "RiskAssessment"("flightId");
