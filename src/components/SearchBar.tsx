import React, { useState } from 'react';
import { Search, Calendar, Users, Wind, Droplets, Leaf } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SearchFilters } from '../types';

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    destination: '',
    startDate: null,
    endDate: null,
    travelers: 2,
    airQualityImportance: 5,
    pollenSensitivity: 5,
    ecoFriendlyPriority: 5
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setFilters(prev => ({
      ...prev,
      startDate: start,
      endDate: end
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden backdrop-blur-md">
      <form onSubmit={handleSearch} className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="destination"
              value={filters.destination}
              onChange={handleInputChange}
              placeholder="Where to? (city, country)"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <DatePicker
              selected={filters.startDate}
              onChange={handleDateChange}
              startDate={filters.startDate}
              endDate={filters.endDate}
              selectsRange
              placeholderText="Select dates"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div className="md:w-40 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="travelers"
              value={filters.travelers}
              onChange={handleInputChange}
              min="1"
              max="10"
              placeholder="Travelers"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md"
          >
            Search
          </button>
        </div>
        
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors duration-200"
          >
            {isAdvancedOpen ? 'Hide advanced options' : 'Show advanced options'}
          </button>
        </div>
        
        {isAdvancedOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Wind className="h-4 w-4 mr-2 text-emerald-500" />
                  Air Quality Importance
                </label>
                <span className="text-sm font-medium text-emerald-600">{filters.airQualityImportance}</span>
              </div>
              <input
                type="range"
                name="airQualityImportance"
                min="0"
                max="10"
                value={filters.airQualityImportance}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Not important</span>
                <span>Very important</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Droplets className="h-4 w-4 mr-2 text-emerald-500" />
                  Pollen Sensitivity
                </label>
                <span className="text-sm font-medium text-emerald-600">{filters.pollenSensitivity}</span>
              </div>
              <input
                type="range"
                name="pollenSensitivity"
                min="0"
                max="10"
                value={filters.pollenSensitivity}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Not sensitive</span>
                <span>Very sensitive</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Leaf className="h-4 w-4 mr-2 text-emerald-500" />
                  Eco-Friendly Priority
                </label>
                <span className="text-sm font-medium text-emerald-600">{filters.ecoFriendlyPriority}</span>
              </div>
              <input
                type="range"
                name="ecoFriendlyPriority"
                min="0"
                max="10"
                value={filters.ecoFriendlyPriority}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low priority</span>
                <span>High priority</span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;