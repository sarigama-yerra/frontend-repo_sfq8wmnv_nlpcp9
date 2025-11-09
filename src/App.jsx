import React from 'react';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import Generator from './components/Generator';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <FeatureGrid />
      <Generator />
      <Footer />
    </div>
  );
}
