import { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Copenhagen',
    country: 'Denmark',
    description: 'One of the world\'s most sustainable cities with excellent bike infrastructure and renewable energy.',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    coordinates: [55.6761, 12.5683],
    ecoScore: 92,
    airQuality: {
      aqi: 22,
      status: 'Good',
      color: '#4CAF50'
    },
    pollen: {
      level: 'Low',
      forecast: 'Low pollen levels throughout summer',
      color: '#4CAF50'
    },
    sustainableOptions: {
      transportation: ['Bike rental', 'Electric buses', 'Walking tours'],
      accommodation: ['Eco-certified hotels', 'Green hostels'],
      activities: ['Urban farming tours', 'Sustainable food tours', 'Harbor swimming']
    }
  },
  {
    id: '2',
    name: 'Costa Rica',
    country: 'Costa Rica',
    description: 'A pioneer in ecotourism with rich biodiversity and renewable energy initiatives.',
    image: 'https://images.unsplash.com/photo-1518259102261-b40117eabbc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    coordinates: [9.7489, -83.7534],
    ecoScore: 89,
    airQuality: {
      aqi: 18,
      status: 'Good',
      color: '#4CAF50'
    },
    pollen: {
      level: 'Medium',
      forecast: 'Moderate levels during flowering season',
      color: '#FF9800'
    },
    sustainableOptions: {
      transportation: ['Shared shuttles', 'Public buses', 'Electric car rentals'],
      accommodation: ['Eco-lodges', 'Sustainable resorts'],
      activities: ['Wildlife conservation tours', 'Rainforest hikes', 'Sustainable coffee farm visits']
    }
  },
  {
    id: '3',
    name: 'Kyoto',
    country: 'Japan',
    description: 'A city that balances traditional culture with modern sustainability practices.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    coordinates: [35.0116, 135.7681],
    ecoScore: 85,
    airQuality: {
      aqi: 35,
      status: 'Good',
      color: '#4CAF50'
    },
    pollen: {
      level: 'High',
      forecast: 'High cedar pollen in spring',
      color: '#F44336'
    },
    sustainableOptions: {
      transportation: ['Bicycle rentals', 'Efficient public transit', 'Walking tours'],
      accommodation: ['Traditional ryokans with sustainable practices', 'Green hotels'],
      activities: ['Temple gardens tours', 'Traditional crafts workshops', 'Bamboo forest walks']
    }
  },
  {
    id: '4',
    name: 'Vancouver',
    country: 'Canada',
    description: 'A coastal city with strong environmental policies and access to stunning nature.',
    image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80',
    coordinates: [49.2827, -123.1207],
    ecoScore: 88,
    airQuality: {
      aqi: 25,
      status: 'Good',
      color: '#4CAF50'
    },
    pollen: {
      level: 'Medium',
      forecast: 'Moderate tree pollen in spring',
      color: '#FF9800'
    },
    sustainableOptions: {
      transportation: ['SkyTrain', 'Seabus', 'Bike share programs'],
      accommodation: ['LEED-certified hotels', 'Eco-friendly B&Bs'],
      activities: ['Stanley Park tours', 'Sustainable food tours', 'Nearby hiking']
    }
  },
  {
    id: '5',
    name: 'Ljubljana',
    country: 'Slovenia',
    description: 'Europe\'s green capital with car-free zones and extensive recycling programs.',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    coordinates: [46.0569, 14.5058],
    ecoScore: 90,
    airQuality: {
      aqi: 28,
      status: 'Good',
      color: '#4CAF50'
    },
    pollen: {
      level: 'Low',
      forecast: 'Generally low except during peak spring',
      color: '#4CAF50'
    },
    sustainableOptions: {
      transportation: ['Bicycle rentals', 'Electric tourist train', 'Walking'],
      accommodation: ['Eco-friendly hotels', 'Green hostels'],
      activities: ['Urban beekeeping tours', 'Local food markets', 'River kayaking']
    }
  },
  {
    id: '6',
    name: 'Reykjavik',
    country: 'Iceland',
    description: 'Powered almost entirely by renewable geothermal energy with pristine air quality.',
    image: 'https://images.unsplash.com/photo-1504284769000-7dadc0d2d2a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    coordinates: [64.1466, -21.9426],
    ecoScore: 94,
    airQuality: {
      aqi: 15,
      status: 'Good',
      color: '#4CAF50'
    },
    pollen: {
      level: 'Low',
      forecast: 'Very low pollen counts year-round',
      color: '#4CAF50'
    },
    sustainableOptions: {
      transportation: ['Electric buses', 'Walking tours', 'Bike rentals'],
      accommodation: ['Geothermally-powered hotels', 'Eco-certified guesthouses'],
      activities: ['Geothermal plant tours', 'Whale watching', 'Hot spring bathing']
    }
  }
];