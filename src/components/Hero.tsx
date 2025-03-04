import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Leaf } from 'lucide-react';
import SearchBar from './SearchBar';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
      {/* Background image */}
      <div className="absolute top-0 w-full h-full bg-center bg-cover" 
           style={{ 
             backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
           }}>
        <span className="w-full h-full absolute opacity-50 bg-black"></span>
      </div>
      
      <div className="container relative mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-white font-semibold text-5xl mb-6">
                Travel <span className="text-emerald-400">Sustainably</span>, Breathe <span className="text-emerald-400">Freely</span>
              </h1>
              <p className="mt-4 text-lg text-gray-200">
                Discover eco-friendly destinations with clean air and low pollen levels. 
                Plan your next trip with the environment and your health in mind.
              </p>
              
              <div className="flex justify-center mt-8 space-x-6">
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                    <Wind className="h-6 w-6 text-white" />
                  </div>
                  <span className="mt-2 text-white text-sm">Air Quality</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                    <Droplets className="h-6 w-6 text-white" />
                  </div>
                  <span className="mt-2 text-white text-sm">Pollen Levels</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <span className="mt-2 text-white text-sm">Eco-Friendly</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <SearchBar />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;