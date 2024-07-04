import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
// eslint-disable-next-line
import { Line, Pie } from 'react-chartjs-2';
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
    // Here you would typically send this payment to your backend
    alert(`Payment of $${creditCardPayment} submitted!`);
    setCreditCardPayment('');
  };

  const recurringPayments = data.upcomingBills.filter(bill => 
    ['Internet Bill', 'Gym Membership', 'Rent'].includes(bill.description)
  );

  return (
    <motion.div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 p-8 ${isDarkMode ? 'dark' : ''}`}
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
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Credit Card</h2>
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300">Current Balance: $1,234.56</p>
              <p className="text-gray-600 dark:text-gray-300">Minimum Due: $50.00</p>
              <p className="text-gray-600 dark:text-gray-300">Due Date: 2023-07-25</p>
            </div>
            <form onSubmit={handleCreditCardPayment} className="space-y-4">
              <input
                type="number"
                value={creditCardPayment}
                onChange={(e) => setCreditCardPayment(e.target.value)}
                placeholder="Enter payment amount"
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
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