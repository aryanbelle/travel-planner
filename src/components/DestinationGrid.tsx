import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DestinationCard from './DestinationCard';
import DestinationDetail from './DestinationDetail';
import { fetchDestinations } from '../services/api';
import { Destination } from '../types';

const DestinationGrid: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await fetchDestinations();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDestinations();
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
  
  return (
    <>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {destinations.map((destination) => (
          <motion.div key={destination.id} variants={item}>
            <DestinationCard 
              destination={destination} 
              onClick={() => setSelectedDestination(destination)}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {selectedDestination && (
        <DestinationDetail 
          destination={selectedDestination} 
          onClose={() => setSelectedDestination(null)} 
        />
      )}
    </>
  );
};

export default DestinationGrid;