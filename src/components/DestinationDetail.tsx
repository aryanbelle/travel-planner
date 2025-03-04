import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wind, Droplets, Leaf, Calendar, Users, Car, Home, MapPin } from 'lucide-react';
import { Destination, TripPlan } from '../types';
import { getAirQualityForecast, getPollenForecast } from '../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface DestinationDetailProps {
  destination: Destination;
  onClose: () => void;
}

const DestinationDetail: React.FC<DestinationDetailProps> = ({ destination, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [airQualityData, setAirQualityData] = useState<any>(null);
  const [pollenData, setPollenData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tripPlan, setTripPlan] = useState<Partial<TripPlan>>({
    destination: destination,
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    travelers: 2,
    transportation: destination.sustainableOptions.transportation[0],
    accommodation: destination.sustainableOptions.accommodation[0],
    activities: [destination.sustainableOptions.activities[0]],
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [airQuality, pollen] = await Promise.all([
          getAirQualityForecast(destination.coordinates),
          getPollenForecast(destination.coordinates)
        ]);
        
        setAirQualityData(airQuality);
        setPollenData(pollen);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [destination]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTripPlan(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setTripPlan(prev => ({
      ...prev,
      startDate: start || undefined,
      endDate: end || undefined
    }));
  };
  
  const handleActivityChange = (activity: string, isChecked: boolean) => {
    setTripPlan(prev => {
      const currentActivities = prev.activities || [];
      if (isChecked) {
        return { ...prev, activities: [...currentActivities, activity] };
      } else {
        return { ...prev, activities: currentActivities.filter(a => a !== activity) };
      }
    });
  };
  
  const handlePlanTrip = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the trip plan to a database
    alert('Trip planned successfully! Check your email for details.');
    onClose();
  };
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-xl overflow-hidden shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-3xl font-bold text-white">{destination.name}</h2>
              <p className="text-xl text-gray-200">{destination.country}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`pb-3 px-4 font-medium ${activeTab === 'overview' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`pb-3 px-4 font-medium ${activeTab === 'health' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('health')}
              >
                Health Data
              </button>
              <button
                className={`pb-3 px-4 font-medium ${activeTab === 'plan' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('plan')}
              >
                Plan Trip
              </button>
            </div>
            
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">About {destination.name}</h3>
                  <p className="text-gray-700 mb-6">{destination.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-3">Eco Score</h4>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-4 rounded-full"
                        style={{ width: `${destination.ecoScore}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-sm text-gray-600">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Wind className="h-5 w-5 mr-2" style={{ color: destination.airQuality.color }} />
                        <h4 className="font-medium">Air Quality</h4>
                      </div>
                      <p className="text-lg font-semibold" style={{ color: destination.airQuality.color }}>
                        {destination.airQuality.status}
                      </p>
                      <p className="text-sm text-gray-600">AQI: {destination.airQuality.aqi}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Droplets className="h-5 w-5 mr-2" style={{ color: destination.pollen.color }} />
                        <h4 className="font-medium">Pollen Level</h4>
                      </div>
                      <p className="text-lg font-semibold" style={{ color: destination.pollen.color }}>
                        {destination.pollen.level}
                      </p>
                      <p className="text-sm text-gray-600">{destination.pollen.forecast}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-3">Sustainable Options</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Transportation</h5>
                        <div className="flex flex-wrap gap-2">
                          {destination.sustainableOptions.transportation.map((option, index) => (
                            <span key={index} className="bg-emerald-50 text-emerald-700 text-sm px-3 py-1 rounded-full">
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Accommodation</h5>
                        <div className="flex flex-wrap gap-2">
                          {destination.sustainableOptions.accommodation.map((option, index) => (
                            <span key={index} className="bg-emerald-50 text-emerald-700 text-sm px-3 py-1 rounded-full">
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Activities</h5>
                        <div className="flex flex-wrap gap-2">
                          {destination.sustainableOptions.activities.map((option, index) => (
                            <span key={index} className="bg-emerald-50 text-emerald-700 text-sm px-3 py-1 rounded-full">
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-[500px]">
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <div className="h-full rounded-lg overflow-hidden border border-gray-200">
                    <MapContainer 
                      center={destination.coordinates} 
                      zoom={10} 
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={destination.coordinates}>
                        <Popup>
                          <div>
                            <h3 className="font-medium">{destination.name}</h3>
                            <p className="text-sm">{destination.country}</p>
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'health' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Air Quality Forecast</h3>
                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <h4 className="font-medium">5-Day Forecast</h4>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {airQualityData?.forecast.map((day: any, index: number) => (
                            <div key={index} className="p-4 flex justify-between items-center">
                              <div>
                                <p className="font-medium">{day.date}</p>
                                <p className="text-sm text-gray-600">AQI: {day.aqi}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                day.aqi < 50 ? 'bg-green-100 text-green-800' : 
                                day.aqi < 100 ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {day.aqi < 50 ? 'Good' : day.aqi < 100 ? 'Moderate' : 'Unhealthy'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Air Quality Information</h4>
                      <p className="text-sm text-blue-700">
                        Air Quality Index (AQI) is a measure of air pollution. Lower values indicate cleaner air.
                        People with respiratory conditions should consider destinations with good air quality.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Pollen Forecast</h3>
                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                          <h4 className="font-medium">5-Day Forecast</h4>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {pollenData?.forecast.map((day: any, index: number) => (
                            <div key={index} className="p-4 flex justify-between items-center">
                              <div>
                                <p className="font-medium">{day.date}</p>
                                <p className="text-sm text-gray-600">Level: {day.level}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                day.level === 'Low' ? 'bg-green-100 text-green-800' : 
                                day.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {day.level}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Pollen Information</h4>
                      <p className="text-sm text-blue-700">
                        Pollen levels can significantly impact travelers with allergies or asthma.
                        Consider planning your trip during seasons with lower pollen counts if you're sensitive.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Health Recommendations</h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-5">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800">Best Time to Visit</h4>
                        <p className="text-gray-700 mt-1">
                          Based on air quality and pollen data, the best time to visit {destination.name} is 
                          {destination.pollen.level === 'Low' ? ' year-round, as pollen levels remain consistently low.' : 
                           destination.pollen.level === 'Medium' ? ' during fall and winter when pollen levels are lower.' :
                           ' during winter months when pollen counts are at their lowest.'}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800">For Allergy Sufferers</h4>
                        <p className="text-gray-700 mt-1">
                          {destination.pollen.level === 'Low' ? 
                            `${destination.name} is an excellent choice for travelers with allergies due to its consistently low pollen levels.` : 
                           destination.pollen.level === 'Medium' ? 
                            `If you have allergies, consider bringing appropriate medication when visiting ${destination.name}, especially during spring.` :
                            `Travelers with severe allergies should exercise caution when visiting ${destination.name}, particularly during peak pollen seasons.`}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800">For Respiratory Conditions</h4>
                        <p className="text-gray-700 mt-1">
                          {destination.airQuality.status === 'Good' ? 
                            `The excellent air quality in ${destination.name} makes it suitable for travelers with respiratory conditions.` : 
                           destination.airQuality.status === 'Moderate' ? 
                            `The moderate air quality in ${destination.name} is generally acceptable, but sensitive individuals should monitor conditions.` :
                            `Those with respiratory conditions should check daily air quality reports when in ${destination.name} and limit outdoor activities on poor air quality days.`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'plan' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Plan Your Eco-Friendly Trip</h3>
                <form onSubmit={handlePlanTrip}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Travel Dates
                        </label>
                        <DatePicker
                          selected={tripPlan.startDate}
                          onChange={handleDateChange}
                          startDate={tripPlan.startDate}
                          endDate={tripPlan.endDate}
                          selectsRange
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Users className="h-4 w-4 inline mr-1" />
                          Number of Travelers
                        </label>
                        <input
                          type="number"
                          name="travelers"
                          value={tripPlan.travelers}
                          onChange={handleInputChange}
                          min="1"
                          max="10"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Car className="h-4 w-4 inline mr-1" />
                          Sustainable Transportation
                        </label>
                        <select
                          name="transportation"
                          value={tripPlan.transportation}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          {destination.sustainableOptions.transportation.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Home className="h-4 w-4 inline mr-1" />
                          Eco-Friendly Accommodation
                        </label>
                        <select
                          name="accommodation"
                          value={tripPlan.accommodation}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          {destination.sustainableOptions.accommodation.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          Sustainable Activities
                        </label>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                          {destination.sustainableOptions.activities.map((activity, index) => (
                            <div key={index} className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                id={`activity-${index}`}
                                checked={(tripPlan.activities || []).includes(activity)}
                                onChange={(e) => handleActivityChange(activity, e.target.checked)}
                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                              />
                              <label htmlFor={`activity-${index}`} className="ml-2 text-sm text-gray-700">
                                {activity}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium text-emerald-800 mb-2">Environmental Impact</h4>
                        <div className="flex items-center mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <span className="text-sm font-medium text-emerald-800">Low Impact</span>
                        </div>
                        <p className="text-sm text-emerald-700">
                          Your trip plan to {destination.name} has a low environmental footprint thanks to your sustainable choices.
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Health Considerations</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Air Quality: {destination.airQuality.status}</li>
                          <li>• Pollen Level: {destination.pollen.level}</li>
                          <li>• {destination.pollen.forecast}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 px-6 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md"
                    >
                      Plan My Eco-Trip
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DestinationDetail;