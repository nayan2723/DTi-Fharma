import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600 dark:text-green-400" />
              <span className="text-xl font-bold text-slate-800 dark:text-white">Fharma</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Empowering villages with modern healthcare technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/crop-recommendation" className="text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400">
                  Medication Recommender
                </Link>
              </li>
              <li>
                <Link to="/yield-prediction" className="text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400">
                  Medicine Scheduler
                </Link>
              </li>
              <li>
                <Link to="/fertilizer-guide" className="text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400">
                  Doc Chat
                </Link>
              </li>
              <li>
                <Link to="/disease-detection" className="text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400">
                  Disease Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Phone className="h-5 w-5" />
                <span>+91 9999999999</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Mail className="h-5 w-5" />
                <span>Fharma@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <MapPin className="h-5 w-5" />
                <span>Bennett University, Greater Noida</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">Newsletter</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Subscribe to our newsletter for updates and farming tips.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 
                         border border-slate-200 dark:border-slate-700
                         focus:ring-2 focus:ring-green-500 focus:border-transparent
                         text-slate-800 dark:text-white"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 
                         text-white rounded-lg transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-center text-slate-600 dark:text-slate-300">
            © {new Date().getFullYear()} Fharma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}