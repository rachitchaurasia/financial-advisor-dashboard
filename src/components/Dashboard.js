import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import AssetAllocation from './AssetAllocation';
import InvestmentPerformance from './InvestmentPerformance';
import CashFlow from './CashFlow';
import Budget from './Budget';
import ExpenseCategories from './ExpenseCategories';
import FinancialGoals from './FinancialGoals';
import Insights from './Insights';
import { generateMockData } from '../mockData';
import { DarkModeContext } from '../contexts/DarkModeContext';
import DarkModeToggle from './DarkModeToggle';

function Dashboard({ user, setLoggedInUser }) {
  const navigate = useNavigate();
  const data = generateMockData(user.id);
  const { isDarkMode } = useContext(DarkModeContext);

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/');
  };

  const recentTransactionsChartData = {
    labels: data.recentTransactions.map(t => `${t.date}: ${t.description}`),
    datasets: [{
      label: 'Transaction Amount',
      data: data.recentTransactions.map(t => t.amount),
      backgroundColor: data.recentTransactions.map(t => t.amount > 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)'),
    }]
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  };

  return (
    <motion.div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 p-8 ${isDarkMode ? 'dark' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hi, {user.name}!</h1>
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div><AssetAllocation data={data.assetAllocation} /></motion.div>
          <motion.div><InvestmentPerformance data={data.investmentPerformance} /></motion.div>
          <motion.div><CashFlow data={data.cashFlow} /></motion.div>
          <motion.div><Budget data={data.budget} /></motion.div>
          <motion.div><ExpenseCategories data={data.expenseCategories} /></motion.div>
          <motion.div><FinancialGoals goals={user.financialGoals || []} /></motion.div>
          <motion.div className="col-span-full"><Insights insights={data.insights || []} /></motion.div>
        </div>
        <motion.div className="mt-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Transactions</h2>
            <div className="h-64">
              <Bar data={recentTransactionsChartData} options={chartOptions} />
            </div>
            <div className="mt-4 space-y-2">
              {data.recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">{transaction.date}: {transaction.description}</span>
                  <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;