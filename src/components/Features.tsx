import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sprout, LineChart, TestTube, Bug } from 'lucide-react';

const features = [
  {
    icon: Sprout,
    title: 'Medicine Recommender',
    description: 'Get personalized medicine suggestions based on your health issues.',
    link: '/crop-recommendation',
    color: 'orange',
  },
  {
    icon: LineChart,
    title: 'Medicine Scheduler',
    description: 'Schedule your medicines according to your time and dosage.',
    link: '/yield-prediction',
    color: 'green',
  },
  {
    icon: TestTube,
    title: 'Doc Chat',
    description: 'Get expert help from experts.',
    link: '/fertilizer-guide',
    color: 'blue',
  },
  {
    icon: Bug,
    title: 'Disease Information',
    description: 'Get detailed information about your health conditions.',
    link: '/disease-detection',
    color: 'purple',
  },
];

const colorClasses = {
  orange: 'bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 dark:hover:bg-orange-950/50',
  green: 'bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/50',
  blue: 'bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50',
  purple: 'bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-950/50',
};

export function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.link}
              className={`group p-6 rounded-xl shadow-lg ${colorClasses[feature.color]} 
                        transition-all duration-300 transform hover:scale-105`}
            >
              <feature.icon className="w-12 h-12 mb-4 text-slate-800 dark:text-white" />
              <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}