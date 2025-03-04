import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Leaf } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 right-0 m-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-sm font-semibold text-emerald-700 flex items-center">
          <Leaf className="h-4 w-4 mr-1 text-emerald-500" />
          {destination.ecoScore}/100
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{destination.name}</h3>
            <p className="text-gray-600">{destination.country}</p>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
        
        <div className="flex space-x-3 mb-4">
          <div className="flex items-center" style={{ color: destination.airQuality.color }}>
            <Wind className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{destination.airQuality.status}</span>
          </div>
          
          <div className="flex items-center" style={{ color: destination.pollen.color }}>
            <Droplets className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{destination.pollen.level}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {destination.sustainableOptions.transportation.slice(0, 2).map((option, index) => (
            <span key={index} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full">
              {option}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;