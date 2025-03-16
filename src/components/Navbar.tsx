import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/crop-recommendation', label: 'Medicine Recommender' },
    { path: '/yield-prediction', label: 'Medicine Scheduler' },
    { path: '/fertilizer-guide', label: 'Doc Chat' },
    { path: '/disease-detection', label: 'Disease Information' },
    { path : '/about', label : 'LOGIN'}
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sprout className="h-8 w-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">Fharma</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative ${
                  location.pathname === item.path
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400'
                } transition-colors duration-200`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 dark:bg-green-400"
                  />
                )}
              </Link>
            ))}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-orange-100 dark:bg-slate-800 
                       border-2 border-orange-500 dark:border-indigo-500
                       transition-colors duration-200"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-slate-800" />
                  ) : (
                    <Sun className="w-5 h-5 text-orange-400" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className="h-6 w-6 text-slate-800 dark:text-white" />
                  ) : (
                    <Menu className="h-6 w-6 text-slate-800 dark:text-white" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-slate-900 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 ${
                    location.pathname === item.path
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="w-full p-2 mt-2 rounded-lg bg-orange-100 dark:bg-slate-800 
                         border-2 border-orange-500 dark:border-indigo-500
                         flex items-center justify-center space-x-2
                         transition-colors duration-200"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-5 h-5 text-slate-800" />
                    <span className="text-slate-800">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-5 h-5 text-orange-400" />
                    <span className="text-white">Light Mode</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}