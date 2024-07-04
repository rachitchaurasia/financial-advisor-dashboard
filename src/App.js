import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Bills from './components/Bills';
import Investments from './components/Investments';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <DarkModeProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={loggedInUser ? <Navigate to="/dashboard" /> : <LandingPage />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/signup" element={<SignUp setLoggedInUser={setLoggedInUser} />} />
          <Route path="/bills" element={<Bills user={loggedInUser} />} />
          <Route 
            path="/dashboard" 
            element={
              loggedInUser ? 
                <Dashboard user={loggedInUser} setLoggedInUser={setLoggedInUser} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/investments" 
            element={
              loggedInUser ? 
                <Investments /> : 
                <Navigate to="/login" />
            } 
          />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;