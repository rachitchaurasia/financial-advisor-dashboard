import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseCategories({ data }) {
  const { isDarkMode } = useContext(DarkModeContext);

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? 'white' : 'black',
        },
      },
      title: {
        display: true,
        text: 'Expense Categories',
        color: isDarkMode ? 'white' : 'black',
      },
    },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Expense Categories</h2>
      <Doughnut data={chartData} options={options} />
    </motion.div>
  );
}

export default ExpenseCategories;
