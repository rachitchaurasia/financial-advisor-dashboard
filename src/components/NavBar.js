import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white">
          <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
          <Link to="/investments" className="px-3 py-2 rounded-md text-sm font-medium">Investments</Link>
          <Link to="/bills" className="px-3 py-2 rounded-md text-sm font-medium">Bills</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;