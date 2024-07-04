import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../contexts/DarkModeContext';
import DarkModeToggle from './DarkModeToggle';

function LandingPage() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-800 dark:to-purple-900 flex items-center justify-center ${isDarkMode ? 'dark' : ''}`}>
      <motion.div 
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-end mb-4">
          <DarkModeToggle />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">AI Financial Advisor</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300">Your personal guide to financial success</p>
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Sign In
          </Link>
          <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
