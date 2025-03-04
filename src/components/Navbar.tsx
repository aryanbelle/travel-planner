import React, { useState } from 'react';
import { Leaf, Menu, X, Search, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Leaf className="h-8 w-8 text-emerald-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">EcoTravel</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-emerald-500 px-3 py-2 text-sm font-medium transition-colors duration-200">Home</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 px-3 py-2 text-sm font-medium transition-colors duration-200">Destinations</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 px-3 py-2 text-sm font-medium transition-colors duration-200">Eco Tips</a>
            <a href="#" className="text-gray-700 hover:text-emerald-500 px-3 py-2 text-sm font-medium transition-colors duration-200">About</a>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full text-gray-500 hover:text-emerald-500 hover:bg-gray-100 transition-colors duration-200">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:text-emerald-500 hover:bg-gray-100 transition-colors duration-200">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-emerald-500 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-50 transition-colors duration-200">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-50 transition-colors duration-200">Destinations</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-50 transition-colors duration-200">Eco Tips</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-50 transition-colors duration-200">About</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 rounded-full bg-gray-100 p-2 text-gray-500" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Guest User</div>
                <div className="text-sm font-medium text-gray-500">Sign in to plan your eco-trip</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;