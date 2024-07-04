export const users = [
    {
      id: 1,
      name: "Rachit Chaurasia",
      phoneNumber: "+61412345678",
      password: "password123",
      age: 35,
      income: 80000,
      assets: 200000,
      liabilities: 150000,
      riskAppetite: "moderate",
      financialGoals: ["Buy a house in 5 years", "Save for retirement"],
      lastLogin: "2024-07-03T10:30:00Z"
    },
    {
      id: 2,
      name: "Jane Smith",
      phoneNumber: "+61423456789",
      password: "password456",
      age: 28,
      income: 65000,
      assets: 100000,
      liabilities: 50000,
      riskAppetite: "high",
      financialGoals: ["Start a business", "Travel the world"],
      lastLogin: "2024-07-02T15:45:00Z"
    }
  ];
  
  export const generateMockData = (userId) => {
    const user = users.find(u => u.id === userId) || users[0];
    
    return {
      assetAllocation: [
        { name: "Stocks", value: user.assets * 0.6 },
        { name: "Bonds", value: user.assets * 0.3 },
        { name: "Cash", value: user.assets * 0.1 }
      ],
      investmentPerformance: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        portfolio: Math.random() * 10000 + 90000,
        benchmark: Math.random() * 8000 + 92000
      })),
      cashFlow: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        income: user.income / 12,
        expenses: (user.income / 12) * (Math.random() * 0.2 + 0.7)
      })),
      budget: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        planned: user.income / 12,
        actual: (user.income / 12) * (Math.random() * 0.2 + 0.8)
      })),
      expenseCategories: [
        { name: "Housing", value: user.income * 0.3 },
        { name: "Transportation", value: user.income * 0.15 },
        { name: "Food", value: user.income * 0.1 },
        { name: "Utilities", value: user.income * 0.05 },
        { name: "Entertainment", value: user.income * 0.1 },
        { name: "Healthcare", value: user.income * 0.05 },
        { name: "Other", value: user.income * 0.25 }
      ],
      recentTransactions: [
        { date: '2024-07-01', description: 'Grocery Shopping', amount: -150.75 },
        { date: '2024-07-02', description: 'Salary Deposit', amount: 3000 },
        { date: '2024-07-03', description: 'Electricity Bill', amount: -180 },
        { date: '2024-07-04', description: 'Online Purchase', amount: -79.99 },
        { date: '2024-07-05', description: 'Restaurant Dinner', amount: -120 }
      ],
      upcomingBills: [
        { dueDate: '2024-07-15', description: 'Internet Bill', amount: 79.99 },
        { dueDate: '2024-07-20', description: 'Car Insurance', amount: 150 },
        { dueDate: '2024-07-25', description: 'Gym Membership', amount: 50 },
        { dueDate: '2024-07-31', description: 'Rent', amount: 1500 }
      ],
      insights: [
        "Your spending on entertainment has increased by 15% compared to last month.",
        "You've consistently stayed under budget for groceries over the past 3 months.",
        "Consider increasing your emergency fund to cover 6 months of expenses.",
        "Your investment portfolio is outperforming the benchmark by 2.3% this year.",
        "You're on track to reach your retirement savings goal by age 65."
      ]
    };
  };
  