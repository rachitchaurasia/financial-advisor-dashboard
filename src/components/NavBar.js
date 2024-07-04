import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../contexts/DarkModeContext';
import DarkModeToggle from './DarkModeToggle';

function NavBar({ loggedInUser, setLoggedInUser }) {
  const { isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/login');
  };

  if (!loggedInUser) return null; // Don't render NavBar if user is not logged in

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg fixed top-0 left-0 right-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/dashboard" className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-lg font-bold`}>
                FinAdvisor
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/dashboard" className={`${isDarkMode ? 'text-white' : 'text-gray-800'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Dashboard</Link>
              <Link to="/investments" className={`${isDarkMode ? 'text-white' : 'text-gray-800'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Investments</Link>
              <Link to="/bills" className={`${isDarkMode ? 'text-white' : 'text-gray-800'} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Bills</Link>
              <DarkModeToggle />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-2"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/dashboard" className={`${isDarkMode ? 'text-white' : 'text-gray-800'} hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}>Dashboard</Link>
            <Link to="/investments" className={`${isDarkMode ? 'text-white' : 'text-gray-800'} hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}>Investments</Link>
            <Link to="/bills" className={`${isDarkMode ? 'text-white' : 'text-gray-800'} hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}>Bills</Link>
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mt-2"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;