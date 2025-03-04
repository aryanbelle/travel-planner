export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  coordinates: [number, number];
  ecoScore: number;
  airQuality: {
    aqi: number;
    status: 'Good' | 'Moderate' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
    color: string;
  };
  pollen: {
    level: 'Low' | 'Medium' | 'High';
    forecast: string;
    color: string;
  };
  sustainableOptions: {
    transportation: string[];
    accommodation: string[];
    activities: string[];
  };
}

export interface TripPlan {
  id: string;
  destination: Destination;
  startDate: Date;
  endDate: Date;
  travelers: number;
  transportation: string;
  accommodation: string;
  activities: string[];
  carbonFootprint: number;
}

export interface SearchFilters {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  travelers: number;
  airQualityImportance: number;
  pollenSensitivity: number;
  ecoFriendlyPriority: number;
}