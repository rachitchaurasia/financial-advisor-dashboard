import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Pie, Line } from 'react-chartjs-2';
import { DarkModeContext } from '../contexts/DarkModeContext';
import { generateMockData } from '../mockData';

function Bills({ user }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const data = generateMockData(user.id);
  const [creditCardPayment, setCreditCardPayment] = useState('');

  const upcomingBillsChartData = {
    labels: data.upcomingBills.map(bill => bill.description),
    datasets: [{
      data: data.upcomingBills.map(bill => bill.amount),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  const handleCreditCardPayment = (e) => {
    e.preventDefault();
    alert(`Payment of $${creditCardPayment} submitted!`);
    setCreditCardPayment('');
  };

  const creditCardData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Credit Usage',
        data: [3000, 3500, 4200, 3800, 4000, 4500],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const creditCardOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
      },
    },
  };

  const recurringPayments = data.upcomingBills.filter(bill => 
    ['Internet Bill', 'Gym Membership', 'Rent'].includes(bill.description)
  );

  return (
    <motion.div
      className={`min-h-screen pt-16 bg-gray-100 dark:bg-gray-900 p-8 ${isDarkMode ? 'dark' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Bills & Payments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Upcoming Bills</h2>
            <Pie data={upcomingBillsChartData} options={chartOptions} />
            <div className="mt-4 space-y-2">
              {data.upcomingBills.map((bill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">{bill.dueDate}: {bill.description}</span>
                  <span className="text-red-600">${bill.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Credit Card Overview</h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Card Number</p>
                <p className="text-lg font-semibold">**** **** **** 4802</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Credit Limit</p>
                <p className="text-lg font-semibold">$5,000</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Balance</p>
                <p className="text-2xl font-bold text-blue-600">$4,000</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Available Credit</p>
                <p className="text-lg font-semibold text-green-600">$1,000</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Minimum Payment</p>
                <p className="text-lg font-semibold text-red-600">$200</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Due Date</p>
                <p className="text-lg font-semibold">Dec 25, 2024</p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Credit Usage - Last 6 Months</h3>
              <Line data={creditCardData} options={creditCardOptions} />
            </div>
            <form onSubmit={handleCreditCardPayment} className="space-y-4">
              <input
                type="number"
                value={creditCardPayment}
                onChange={(e) => setCreditCardPayment(e.target.value)}
                placeholder="Enter payment amount"
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
                Make Payment
              </button>
            </form>
          </motion.div>

          <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow col-span-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recurring Payments</h2>
            <div className="space-y-2">
              {recurringPayments.map((bill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">{bill.description}</span>
                  <span className="text-red-600">${bill.amount.toFixed(2)} / month</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Bills;