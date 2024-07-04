import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../contexts/DarkModeContext';

function Insights({ insights }) {
    // eslint-disable-next-line
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Financial Insights</h2>
      <ul className="list-disc pl-5">
        {insights.map((insight, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300 mb-2">{insight}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default Insights;
