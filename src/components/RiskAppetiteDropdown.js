import React from 'react';

function RiskAppetiteDropdown({ selectedRisk, setSelectedRisk }) {
  const handleChange = (event) => {
    setSelectedRisk(event.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="risk-appetite" className="block text-gray-700 dark:text-gray-300 mb-2">
        Select Risk Appetite:
      </label>
      <select
        id="risk-appetite"
        value={selectedRisk}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
      >
        <option value="low">Low</option>
        <option value="moderate">Moderate</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default RiskAppetiteDropdown;