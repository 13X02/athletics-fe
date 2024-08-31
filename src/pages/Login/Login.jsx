import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    const requestBody = {
      username: username,
      password: password
    };
  
    axios.post("http://localhost:8081/auth/login", requestBody)
      .then((res) => {
        const token = res.data;
        if (token) {
          localStorage.setItem('authToken', token);
          navigate('/dashboard'); // Redirect to the dashboard or another page
        } else {
          console.error('Token not found in response');
        }
      })
      .catch((err) => {
        console.error('Error during login:', err);
      });
  }

  return (
    <div className="flex items-center font-poppins justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Login</h1>
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
