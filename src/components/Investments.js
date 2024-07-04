import React, { useState, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../contexts/DarkModeContext';
import TopPerformer from './TopPerformer';
import InvestmentPerformance from './InvestmentPerformance';

const investmentOptions = [
  { value: 'stocks', label: 'Stocks' },
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'property', label: 'Property' },
  { value: 'bonds', label: 'Bonds' },
  { value: 'etfs', label: 'ETFs' },
];

const riskLevels = ['Low', 'Medium', 'High'];

// Mock data for top performers
const mockTopPerformers = {
    stocks: [
      { name: 'CBA.AX', stats: { 'Price': '$98.50', 'P/E Ratio': '18.2', '52W High': '$102.30', '52W Low': '$86.85', 'Dividend Yield': '3.8%' } },
      { name: 'BHP.AX', stats: { 'Price': '$47.20', 'P/E Ratio': '12.5', '52W High': '$54.55', '52W Low': '$39.90', 'Dividend Yield': '5.2%' } },
      { name: 'CSL.AX', stats: { 'Price': '$267.30', 'P/E Ratio': '35.8', '52W High': '$320.42', '52W Low': '$242.00', 'Dividend Yield': '1.1%' } },
    ],
    crypto: [
      { name: 'Bitcoin', stats: { 'Price': '$45,230', '24h Change': '+2.5%', 'Market Cap': '$850B', '24h Volume': '$28B', 'Circulating Supply': '18.7M BTC' } },
      { name: 'Ethereum', stats: { 'Price': '$3,250', '24h Change': '+3.2%', 'Market Cap': '$380B', '24h Volume': '$18B', 'Circulating Supply': '117M ETH' } },
      { name: 'Cardano', stats: { 'Price': '$1.20', '24h Change': '+1.8%', 'Market Cap': '$38B', '24h Volume': '$1.5B', 'Circulating Supply': '32B ADA' } },
    ],
    property: [
      { name: 'Sydney', stats: { 'Median Price': '$1.2M', 'YoY Growth': '+23.8%', 'Rental Yield': '2.5%', 'Vacancy Rate': '2.2%', 'Days on Market': '28' } },
      { name: 'Melbourne', stats: { 'Median Price': '$950K', 'YoY Growth': '+18.6%', 'Rental Yield': '2.8%', 'Vacancy Rate': '3.1%', 'Days on Market': '32' } },
      { name: 'Brisbane', stats: { 'Median Price': '$650K', 'YoY Growth': '+27.4%', 'Rental Yield': '3.7%', 'Vacancy Rate': '1.3%', 'Days on Market': '24' } },
    ],
    bonds: [
      { name: 'Australian Government Bonds', stats: { 'Yield': '1.5%', 'Duration': '7 years', 'Credit Rating': 'AAA', 'Coupon': '2.75%', 'Maturity Date': '21 Nov 2028' } },
      { name: 'Treasury Indexed Bonds', stats: { 'Yield': '0.5%', 'Duration': '10 years', 'Credit Rating': 'AAA', 'Coupon': '1.25%', 'Maturity Date': '21 Aug 2032' } },
      { name: 'Corporate Bonds', stats: { 'Yield': '3.2%', 'Duration': '5 years', 'Credit Rating': 'A-', 'Coupon': '3.5%', 'Maturity Date': '15 Jun 2026' } },
    ],
    etfs: [
      { name: 'VAS', stats: { 'Price': '$92.50', 'AUM': '$8.2B', 'P/E Ratio': '17.5', 'Dividend Yield': '4.2%', 'YTD Return': '+12.8%' } },
      { name: 'IOZ', stats: { 'Price': '$30.80', 'AUM': '$3.5B', 'P/E Ratio': '17.2', 'Dividend Yield': '4.1%', 'YTD Return': '+13.1%' } },
      { name: 'A200', stats: { 'Price': '$49.20', 'AUM': '$1.8B', 'P/E Ratio': '16.8', 'Dividend Yield': '4.3%', 'YTD Return': '+12.5%' } },
    ],
  };

function Investments({ user }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const [selectedInvestment, setSelectedInvestment] = useState('');
  const [riskAppetite, setRiskAppetite] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const recommendation = getRecommendation(selectedInvestment, riskAppetite, user);
      setRecommendation(recommendation);
      setIsLoading(false);
    }, 1500);
  };

  const getRecommendation = (investmentType, risk, user) => {
    // Use default values if user prop is not provided
    const { assets = 100000, liabilities = 50000, income = 75000 } = user || {};
    const netWorth = assets - liabilities;
    const riskScore = getRiskScore(risk);
    const investibleAmount = Math.max(0, netWorth * 0.1 + income * 0.2);

    let recommendation = {
      suitable: false,
      reason: '',
      alternatives: [],
      topPerformers: []
    };

    switch (investmentType) {
      case 'stocks':
        if (riskScore >= 2 && investibleAmount > 5000) {
          recommendation.suitable = true;
          recommendation.reason = "Based on your risk appetite and financial situation, investing in Australian stocks could be a good option.";
          recommendation.topPerformers = mockTopPerformers.stocks;
        } else {
          recommendation.reason = "Your risk appetite or investible amount might be too low for direct stock investments.";
          recommendation.alternatives = ["ETFs", "Bonds"];
        }
        break;
      case 'crypto':
        if (riskScore === 3 && investibleAmount > 10000) {
          recommendation.suitable = true;
          recommendation.reason = "Cryptocurrency investments align with your high risk appetite, but be cautious as they're highly volatile.";
          recommendation.topPerformers = mockTopPerformers.crypto;
        } else {
          recommendation.reason = "Cryptocurrency might be too risky given your risk appetite or financial situation.";
          recommendation.alternatives = ["Stocks", "ETFs"];
        }
        break;
      case 'property':
        if (riskScore >= 2 && investibleAmount > 100000) {
          recommendation.suitable = true;
          recommendation.reason = "Property investment could be a good long-term option given your financial situation.";
          recommendation.topPerformers = mockTopPerformers.property;
        } else {
          recommendation.reason = "Direct property investment might require more capital than you currently have available.";
          recommendation.alternatives = ["REITs", "Property-focused ETFs"];
        }
        break;
      case 'bonds':
        if (riskScore === 1) {
          recommendation.suitable = true;
          recommendation.reason = "Bonds align well with your low risk appetite and can provide stable returns.";
          recommendation.topPerformers = mockTopPerformers.bonds;
        } else {
          recommendation.reason = "While bonds are low-risk, they might not align with your risk appetite for potentially higher returns.";
          recommendation.alternatives = ["Stocks", "ETFs"];
        }
        break;
      case 'etfs':
        recommendation.suitable = true;
        recommendation.reason = "ETFs can be suitable for various risk appetites and provide diversification.";
        recommendation.topPerformers = mockTopPerformers.etfs;
        break;
      default:
        recommendation.reason = "Please select an investment type.";
    }

    return recommendation;
  };

  const performanceData = useMemo(() => {
    return [
      { month: 1, portfolio: 100, benchmark: 100 },
      { month: 2, portfolio: 105, benchmark: 102 },
      { month: 3, portfolio: 110, benchmark: 104 },
      { month: 4, portfolio: 108, benchmark: 103 },
      { month: 5, portfolio: 112, benchmark: 105 },
      { month: 6, portfolio: 115, benchmark: 107 },
    ];
  }, []);

  const getRiskScore = (risk) => {
    switch (risk) {
      case 'Low': return 1;
      case 'Medium': return 2;
      case 'High': return 3;
      default: return 0;
    }
  };


  return (
    <motion.div
    className={`min-h-screen pt-16 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'dark' : ''}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Investment Recommendations</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Where do you want to invest?
            </label>
            <select
              value={selectedInvestment}
              onChange={(e) => setSelectedInvestment(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select an investment type</option>
              {investmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              What's your risk appetite?
            </label>
            <select
              value={riskAppetite}
              onChange={(e) => setRiskAppetite(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select risk level</option>
              {riskLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Get Recommendation'}
          </button>
        </form>

        {isLoading && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">Fetching recommendations...</p>
          </div>
        )}

        {recommendation && !isLoading && (
          <div className="mt-8 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Investment Recommendation
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-700">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Suitability</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {recommendation.suitable ? 'Suitable' : 'Not Recommended'}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Reason</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {recommendation.reason}
                  </dd>
                </div>
                {recommendation && !isLoading && recommendation.suitable && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Top Performers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTopPerformers[selectedInvestment].map((performer, index) => (
                <TopPerformer key={index} name={performer.name} stats={performer.stats} />
              ))}
            </div>
          </div>
        )}
                {recommendation.alternatives.length > 0 && (
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Alternatives</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                      {recommendation.alternatives.join(', ')}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        )}
      </div>
      {recommendation && !isLoading && (
        <InvestmentPerformance data={performanceData} />
      )}
    </motion.div>
  );
}

export default Investments;