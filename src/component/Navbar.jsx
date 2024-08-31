import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Ensure react-router-dom is installed
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { isLoggedIn,getUserRole } from '../utils/AppUtils';// Adjust the path as needed

const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const loggedIn = isLoggedIn();
    setIsUserLoggedIn(loggedIn);

    if (loggedIn) {
      const role = getUserRole(token);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsUserLoggedIn(false);
    setUserRole('');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md font-poppins">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Brand</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
          <Link to="/news" className="hover:bg-gray-700 px-3 py-2 rounded">News</Link>
          {isUserLoggedIn && userRole === 'Athlete' && (
            <Link to="/wellness" className="hover:bg-gray-700 px-3 py-2 rounded">Wellness</Link>
          )}
          <Link to="/event" className="hover:bg-gray-700 px-3 py-2 rounded">Event</Link>
          <Link to="/result" className="hover:bg-gray-700 px-3 py-2 rounded">Result</Link>
          <Link to="/coach" className="hover:bg-gray-700 px-3 py-2 rounded">Coach</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {isUserLoggedIn ? (
            <>
              <Link to="/profile" className="hidden md:flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded">
                <FaUser />
                <span>Profile</span>
              </Link>
              <button onClick={handleLogout} className="hover:bg-gray-700 px-3 py-2 rounded flex items-center">
                <FaSignOutAlt />
                <span className="ml-2">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded flex items-center">
                <FaSignInAlt />
                <span className="ml-2">Login</span>
              </Link>
              <Link to="/signup" className="hover:bg-gray-700 px-3 py-2 rounded">
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
