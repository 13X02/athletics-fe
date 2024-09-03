import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'; 
import { isLoggedIn, getUserRole } from '../utils/AppUtils'; 
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
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
    localStorage.removeItem('authToken'); 
    setIsUserLoggedIn(false);
    window.location.href='/'
    setUserRole('');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className="bg-white text-black shadow-md font-poppins">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Athletics</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleSidebar} className="text-black focus:outline-none">
            {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          isUserLoggedIn={isUserLoggedIn}
          userRole={userRole}
          onLogout={handleLogout}
        />
        <div className="hidden md:flex flex-row items-center space-x-4">
          <Link to="/news" className="hover:text-blue-700 px-3 py-2 rounded">News</Link>
          {isUserLoggedIn && userRole === 'Athlete' && (
            <Link to="/wellness" className="hover:bg-gray-700 px-3 py-2 rounded">Wellness</Link>
          )}
          <Link to="/events" className="hover:text-blue-700 px-3 py-2 rounded">Events</Link>
          <Link to="/results" className="hover:text-blue-700 px-3 py-2 rounded">Results</Link>
          <Link to="/coaches" className="hover:text-blue-700 px-3 py-2 rounded">Coaches</Link>
          <Link to="/athletes" className="hover:text-blue-700 px-3 py-2 rounded">Athletes</Link>

          <div className="flex items-center space-x-4">
            {isUserLoggedIn ? (
              <>
                <Link to="/dashboard" className="hidden md:flex items-center space-x-2 hover:text-blue-700 px-3 py-2 rounded">
                  <FaUser />
                  <span>Profile</span>
                </Link>
                <button onClick={handleLogout} className="hover:text-blue-700 px-3 py-2 rounded flex items-center">
                  <FaSignOutAlt />
                  <span className="ml-2">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-700 px-3 py-2 rounded flex items-center">
                  <FaSignInAlt />
                  <span className="ml-2">Login</span>
                </Link>
                <Link to="/signup" className="hover:text-blue-700 px-3 py-2 rounded">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
