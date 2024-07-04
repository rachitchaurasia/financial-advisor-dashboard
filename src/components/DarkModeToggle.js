import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-600"
    >
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
}

export default DarkModeToggle;
