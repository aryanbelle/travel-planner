import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Plane, Droplets, Wind, Sun } from 'lucide-react';

const EcoTips: React.FC = () => {
  const tips = [
    {
      icon: <Plane className="h-8 w-8 text-emerald-500" />,
      title: 'Choose Direct Flights',
      description: 'Direct flights typically use less fuel than connecting flights, reducing your carbon footprint.'
    },
    {
      icon: <Recycle className="h-8 w-8 text-emerald-500" />,
      title: 'Pack Reusable Items',
      description: 'Bring a reusable water bottle, shopping bag, and utensils to minimize waste during your travels.'
    },
    {
      icon: <Leaf className="h-8 w-8 text-emerald-500" />,
      title: 'Support Local Businesses',
      description: 'Choose locally-owned accommodations, restaurants, and tour operators to support the local economy.'
    },
    {
      icon: <Wind className="h-8 w-8 text-emerald-500" />,
      title: 'Check Air Quality',
      description: 'Research air quality conditions before booking, especially if you have respiratory sensitivities.'
    },
    {
      icon: <Droplets className="h-8 w-8 text-emerald-500" />,
      title: 'Monitor Pollen Levels',
      description: 'If you have allergies, check pollen forecasts and plan your trip during low-pollen seasons.'
    },
    {
      icon: <Sun className="h-8 w-8 text-emerald-500" />,
      title: 'Use Renewable Energy',
      description: 'Choose accommodations that use renewable energy sources like solar or wind power.'
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Eco-Friendly Travel Tips</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple ways to make your travels more sustainable and healthier for both you and the planet.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-emerald-50 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {tip.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcoTips;