import React from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

export function Hero() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden
                      bg-gradient-to-b from-orange-50 to-green-50
                      dark:from-slate-900 dark:to-emerald-950">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595339619862-3b7d9bbb5e17?auto=format&fit=crop&q=80')] 
                      bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Sprout className="w-16 h-16 mx-auto mb-6 text-green-600 dark:text-green-400" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800 dark:text-white">
            Fharma
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-600 dark:text-slate-300">
          
  This platform provides tools for <strong>Medication Recommendation</strong>, <strong>Medicine Scheduler</strong>, <strong>Doc Chat</strong>, and <strong>Disease Information</strong>, empowering Villages with data-driven insights for sustainable and efficient Lifestyle.
</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToFeatures}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg
                     shadow-lg transition-colors duration-200"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}