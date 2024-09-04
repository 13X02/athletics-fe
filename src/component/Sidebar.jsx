import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose, isUserLoggedIn, userRole, onLogout }) => {
  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
      <div className="w-64 h-full bg-white p-4">
        <button onClick={onClose} className="text-black text-2xl absolute top-4 right-4">
          <FaSignOutAlt />
        </button>
        <div className="mt-8 space-y-4">
          <Link to="/news" className="block px-4 py-2 rounded hover:bg-gray-200">News</Link>
          {isUserLoggedIn && userRole === 'Athlete' && (
            <Link to="/wellness" className="block px-4 py-2 rounded hover:bg-gray-200">Wellness</Link>
          )}
          <Link to="/events" className="block px-4 py-2 rounded hover:bg-gray-200">Events</Link>
          <Link to="/results" className="block px-4 py-2 rounded hover:bg-gray-200">Results</Link>
          <Link to="/coaches" className="block px-4 py-2 rounded hover:bg-gray-200">Coaches</Link>
          <Link to="/athletes" className="block px-4 py-2 rounded hover:bg-gray-200">Athletes</Link>
          
          <div className="mt-8">
            {isUserLoggedIn ? (
              <>
                <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-200 flex items-center">
                  <FaUser />
                  <span className="ml-2">Profile</span>
                </Link>
                <button onClick={onLogout} className="block px-4 py-2 rounded hover:bg-gray-200 flex items-center w-full">
                  <FaSignOutAlt />
                  <span className="ml-2">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 rounded hover:bg-gray-200 flex items-center">
                  <FaSignInAlt />
                  <span className="ml-2">Login</span>
                </Link>
                <Link to="/signup" className="block px-4 py-2 rounded hover:bg-gray-200">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
