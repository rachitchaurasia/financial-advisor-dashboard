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

function Dashboard({ user, setLoggedInUser }) {
  const navigate = useNavigate();
  const data = generateMockData(user.id);
  const { isDarkMode } = useContext(DarkModeContext);

  // eslint-disable-next-line
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
    maintainAspectRatio: false,
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
      className={`min-h-screen pt-20 sm:pt-24 bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8 ${isDarkMode ? 'dark' : ''}`}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0 lg:mt-16">Hi, {user.name}!</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <motion.div className="col-span-1"><AssetAllocation data={data.assetAllocation} /></motion.div>
          <motion.div className="col-span-1"><InvestmentPerformance data={data.investmentPerformance} /></motion.div>
          <motion.div className="col-span-1"><CashFlow data={data.cashFlow} /></motion.div>
          <motion.div className="col-span-1"><Budget data={data.budget} /></motion.div>
          <motion.div className="col-span-1"><ExpenseCategories data={data.expenseCategories} /></motion.div>
          <motion.div className="col-span-1"><FinancialGoals goals={user.financialGoals || []} /></motion.div>
          <motion.div className="col-span-full"><Insights insights={data.insights || []} /></motion.div>
        </div>
        <motion.div className="mt-6 sm:mt-8">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Transactions</h2>
            <div className="h-64 sm:h-80">
              <Bar data={recentTransactionsChartData} options={chartOptions} />
            </div>
            <div className="mt-4 space-y-2 overflow-y-auto max-h-40 sm:max-h-60">
              {data.recentTransactions.map((transaction, index) => (
                <div key={index} className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600 dark:text-gray-300 truncate mr-2">{transaction.date}: {transaction.description}</span>
                  <span className={`${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'} whitespace-nowrap`}>
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