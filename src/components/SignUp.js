import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { users } from '../mockData';
import { DarkModeContext } from '../contexts/DarkModeContext';
import DarkModeToggle from './DarkModeToggle';

function SignUp({ setLoggedInUser }) {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    password: '',
    age: '',
    income: '',
    assets: '',
    liabilities: '',
  });
  const [error, setError] = useState('');
  const [bankStatement, setBankStatement] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useContext(DarkModeContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setBankStatement(file);
      setError('');
    } else {
      setBankStatement(null);
      setError('Please upload a CSV file');
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 2000); // Simulate a 2-second upload
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users.some(u => u.phoneNumber === formData.phoneNumber)) {
      setError('Phone number already exists');
    } else {
      if (bankStatement) {
        simulateUpload();
      }
      const newUser = { ...formData, id: users.length + 1 };
      users.push(newUser);
      setLoggedInUser(newUser);
      navigate('/dashboard');
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-800 dark:to-purple-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'dark' : ''}`}>
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-end">
          <DarkModeToggle />
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="sr-only">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                id={key}
                name={key}
                type={key === 'password' ? 'password' : 'text'}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div>
            <label htmlFor="bankStatement" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Bank Statement (CSV only)
            </label>
            <input
              id="bankStatement"
              name="bankStatement"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm dark:bg-gray-700"
            />
          </div>

          {isUploading && (
            <p className="text-blue-500 dark:text-blue-400 text-sm">Uploading bank statement...</p>
          )}

          {uploadSuccess && (
            <p className="text-green-500 dark:text-green-400 text-sm">Bank statement uploaded successfully!</p>
          )}

          {error && <p className="text-red-500 dark:text-red-400 text-xs italic">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              Sign Up
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default SignUp;