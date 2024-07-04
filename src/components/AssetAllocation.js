import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../contexts/DarkModeContext';

function AssetAllocation({ data }) {
  const { isDarkMode } = useContext(DarkModeContext);

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
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
        text: 'Asset Allocation',
        color: isDarkMode ? 'white' : 'black',
      }
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Asset Allocation</h2>
      <Pie data={chartData} options={options} />
    </motion.div>
  );
}

export default AssetAllocation;
