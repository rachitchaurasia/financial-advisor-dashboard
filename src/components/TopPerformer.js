// TopPerformer.js
import React from 'react';
import { motion } from 'framer-motion';

const TopPerformer = ({ name, stats }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{name}</h3>
    <div className="space-y-2">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">{key}:</span>
          <span className="font-medium text-gray-900 dark:text-white">{value}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default TopPerformer;