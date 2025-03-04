import axios from 'axios';
import { destinations } from '../data/destinations';
import { Destination, SearchFilters } from '../types';

// Simulated API calls since we're using mock data
// In a real app, these would connect to actual APIs

export const fetchDestinations = async (): Promise<Destination[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return destinations;
};

export const searchDestinations = async (filters: SearchFilters): Promise<Destination[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  let results = [...destinations];
  
  // Filter by name or country if provided
  if (filters.destination) {
    const searchTerm = filters.destination.toLowerCase();
    results = results.filter(
      dest => dest.name.toLowerCase().includes(searchTerm) || 
              dest.country.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply air quality filter based on importance
  if (filters.airQualityImportance > 0) {
    results = results.sort((a, b) => {
      const airQualityWeight = filters.airQualityImportance / 10;
      return (b.airQuality.aqi * airQualityWeight) - (a.airQuality.aqi * airQualityWeight);
    });
  }
  
  // Apply pollen sensitivity filter
  if (filters.pollenSensitivity > 0) {
    const pollenLevelScore = {
      'Low': 3,
      'Medium': 2,
      'High': 1
    };
    
    results = results.sort((a, b) => {
      const pollenWeight = filters.pollenSensitivity / 10;
      const aScore = pollenLevelScore[a.pollen.level] * pollenWeight;
      const bScore = pollenLevelScore[b.pollen.level] * pollenWeight;
      return bScore - aScore;
    });
  }
  
  // Apply eco-friendly priority filter
  if (filters.ecoFriendlyPriority > 0) {
    results = results.sort((a, b) => {
      const ecoWeight = filters.ecoFriendlyPriority / 10;
      return (b.ecoScore * ecoWeight) - (a.ecoScore * ecoWeight);
    });
  }
  
  return results;
};

export const getDestinationById = async (id: string): Promise<Destination | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return destinations.find(dest => dest.id === id);
};

// Simulated Air Quality API
export const getAirQualityForecast = async (coordinates: [number, number]): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Return mock data
  return {
    forecast: [
      { date: '2023-10-01', aqi: Math.floor(Math.random() * 50) + 10 },
      { date: '2023-10-02', aqi: Math.floor(Math.random() * 50) + 10 },
      { date: '2023-10-03', aqi: Math.floor(Math.random() * 50) + 10 },
      { date: '2023-10-04', aqi: Math.floor(Math.random() * 50) + 10 },
      { date: '2023-10-05', aqi: Math.floor(Math.random() * 50) + 10 },
    ]
  };
};

// Simulated Pollen API
export const getPollenForecast = async (coordinates: [number, number]): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock data
  const levels = ['Low', 'Medium', 'High'];
  
  return {
    forecast: [
      { date: '2023-10-01', level: levels[Math.floor(Math.random() * 3)] },
      { date: '2023-10-02', level: levels[Math.floor(Math.random() * 3)] },
      { date: '2023-10-03', level: levels[Math.floor(Math.random() * 3)] },
      { date: '2023-10-04', level: levels[Math.floor(Math.random() * 3)] },
      { date: '2023-10-05', level: levels[Math.floor(Math.random() * 3)] },
    ]
  };
};