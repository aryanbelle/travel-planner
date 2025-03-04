import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedDestinations from './components/FeaturedDestinations';
import EcoTips from './components/EcoTips';
import Footer from './components/Footer';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          <FeaturedDestinations />
          <EcoTips />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;