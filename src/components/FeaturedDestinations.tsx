import React from 'react';
import { motion } from 'framer-motion';
import DestinationGrid from './DestinationGrid';

const FeaturedDestinations: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Eco-Friendly Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover destinations that prioritize sustainability, offer clean air, and maintain low pollen levels for a healthier travel experience.
          </p>
        </motion.div>
        
        <DestinationGrid />
      </div>
    </section>
  );
};

export default FeaturedDestinations;