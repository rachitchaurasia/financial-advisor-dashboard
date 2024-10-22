import React, { useContext, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function InvestmentPerformance({ data }) {
  const { isDarkMode } = useContext(DarkModeContext);

  const chartData = useMemo(() => ({
    labels: data.map(item => `Month ${item.month}`),
    datasets: [
      {
        label: 'Portfolio',
        data: data.map(item => item.portfolio),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Benchmark',
        data: data.map(item => item.benchmark),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }
    ]
  }), [data]);

  const options = useMemo(() => ({
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
        text: 'Investment Performance',
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
  }), [isDarkMode]);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-8"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Investment Performance</h2>
      <Line data={chartData} options={options} />
    </motion.div>
  );
}

export default React.memo(InvestmentPerformance);