import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../contexts/DarkModeContext';

function InvestmentRecommendations({ riskAppetite }) {
    // eslint-disable-next-line
  const { isDarkMode } = useContext(DarkModeContext);

  const recommendations = {
    low: [
      {
        strategy: "Government Bonds",
        description: "Invest in Treasury bonds or TIPS (Treasury Inflation-Protected Securities) for steady, low-risk returns.",
        pros: "Extremely low risk, backed by government",
        cons: "Lower returns compared to other investments",
        tip: "Consider laddering bonds with different maturities to balance yield and liquidity."
      },
      {
        strategy: "High-Yield Savings Accounts",
        description: "Utilize online banks offering competitive interest rates on savings accounts.",
        pros: "FDIC insured, highly liquid",
        cons: "Returns may not keep pace with inflation",
        tip: "Compare rates across multiple banks and be aware of any account restrictions or fees."
      },
      {
        strategy: "Low-Risk Mutual Funds",
        description: "Invest in mutual funds focusing on high-quality, short-term debt instruments.",
        pros: "Professional management, diversification",
        cons: "Fees can eat into returns",
        tip: "Look for funds with low expense ratios and no load fees."
      }
    ],
    moderate: [
      {
        strategy: "Balanced Stock and Bond Portfolio",
        description: "Create a diversified portfolio with a mix of stocks and bonds, adjusted to your risk tolerance.",
        pros: "Balances growth potential with stability",
        cons: "Requires more active management",
        tip: "Consider a 60/40 stock/bond split as a starting point, adjusting based on your age and risk tolerance."
      },
      {
        strategy: "Index Funds",
        description: "Invest in low-cost index funds that track broad market indices like the S&P 500.",
        pros: "Low fees, broad market exposure",
        cons: "Lack of downside protection in market downturns",
        tip: "Look for funds with the lowest expense ratios to maximize long-term returns."
      },
      {
        strategy: "Real Estate Investment Trusts (REITs)",
        description: "Invest in companies that own and operate income-producing real estate.",
        pros: "Provides real estate exposure without direct property ownership",
        cons: "Can be sensitive to interest rate changes",
        tip: "Research different REIT sectors (e.g., residential, commercial, healthcare) to diversify your real estate investments."
      }
    ],
    high: [
      {
        strategy: "Growth Stocks in Emerging Markets",
        description: "Invest in high-potential companies in developing economies.",
        pros: "High growth potential",
        cons: "Higher volatility and political/economic risks",
        tip: "Consider using actively managed funds for emerging markets to navigate complex local regulations and market conditions."
      },
      {
        strategy: "Cryptocurrency Investments",
        description: "Allocate a small portion of your portfolio to established cryptocurrencies like Bitcoin or Ethereum.",
        pros: "Potential for high returns, portfolio diversification",
        cons: "Extremely volatile, regulatory uncertainties",
        tip: "Only invest what you can afford to lose, and use reputable exchanges with strong security measures."
      },
      {
        strategy: "Venture Capital Opportunities",
        description: "Invest in startups and early-stage companies through venture capital funds or platforms.",
        pros: "Potential for extremely high returns",
        cons: "High risk of loss, illiquid investments",
        tip: "Diversify across multiple startups and sectors, and be prepared for a long investment horizon."
      }
    ]
  };

  const getRecommendations = () => {
    switch (riskAppetite) {
      case 'low':
        return recommendations.low;
      case 'moderate':
        return recommendations.moderate;
      case 'high':
        return recommendations.high;
      default:
        return recommendations.moderate;
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Investment Recommendations</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">Based on your {riskAppetite} risk appetite:</p>
      <div className="space-y-6">
        {getRecommendations().map((rec, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{rec.strategy}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{rec.description}</p>
            <p className="text-green-600 dark:text-green-400"><strong>Pros:</strong> {rec.pros}</p>
            <p className="text-red-600 dark:text-red-400"><strong>Cons:</strong> {rec.cons}</p>
            <p className="text-blue-600 dark:text-blue-400 mt-2"><strong>Tip:</strong> {rec.tip}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default InvestmentRecommendations;