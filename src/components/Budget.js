import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Budget({ data }) {
  const { isDarkMode } = useContext(DarkModeContext);

  const chartData = {
    labels: data.map(item => `Month ${item.month}`),
    datasets: [
      {
        label: 'Planned',
        data: data.map(item => item.planned),
        backgroundColor: isDarkMode ? 'rgba(75, 192, 192, 0.6)' : 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Actual',
        data: data.map(item => item.actual),
        backgroundColor: isDarkMode ? 'rgba(255, 99, 132, 0.6)' : 'rgba(255, 99, 132, 0.6)',
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
        text: 'Budget Comparison',
        color: isDarkMode ? 'white' : 'black',
      },
    },
    scales: {
      x: {
        ticks: { color: isDarkMode ? 'white' : 'black' },
        grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
      },
      y: {
        ticks: { color: isDarkMode ? 'white' : 'black' },
        grid: { color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
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
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Budget Comparison</h2>
      <Bar data={chartData} options={options} />
    </motion.div>
  );
}

export default Budget;
