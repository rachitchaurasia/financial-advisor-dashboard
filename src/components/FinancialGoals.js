import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../contexts/DarkModeContext';

function FinancialGoals({ goals }) {
    // eslint-disable-next-line
  const { isDarkMode } = useContext(DarkModeContext);

  // If goals is undefined or empty, display a default message
  const hasGoals = goals && goals.length > 0;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Financial Goals</h2>
      {hasGoals ? (
        <ul className="list-disc pl-5">
          {goals.map((goal, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 mb-2">{goal}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">No financial goals set yet.</p>
      )}
    </motion.div>
  );
}

export default FinancialGoals;
