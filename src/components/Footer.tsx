import React from 'react';
import { Leaf, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="ml-2 text-xl font-bold">EcoTravel</span>
            </div>
            <p className="text-gray-400 mb-4">
              Helping you discover eco-friendly destinations with clean air and low pollen levels for a healthier travel experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Eco Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Air Quality Index</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Pollen Forecast</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Sustainable Travel Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Carbon Offset Programs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Eco-Certifications</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-emerald-400 mr-2 mt-0.5" />
                <span className="text-gray-400">123 Eco Street, Green City, Earth</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-emerald-400 mr-2" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-emerald-400 mr-2" />
                <span className="text-gray-400">info@ecotravel.example</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} EcoTravel. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;