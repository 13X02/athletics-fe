import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('COACH'); 
    const navigate = useNavigate();

    function handleSubmit() {
      const requestBody = {
        username: username,
        email: email,
        password: password,
        role: role
      };
      console.log("i am here")
    
      axios.post("http://localhost:8081/auth/register", requestBody)
      .then((res) => {
        console.log('Registration successful:', res.data);
        const token = res.data; // Adjust based on actual response structure
        if (token) {
          localStorage.setItem('authToken', token); // Save token in localStorage
          console.log('Token saved:', token);
          if (role === 'COACH') {
     // Redirect to coach form
     navigate('/coach-form')
          } else if (role === 'ATHLETE') {
            navigate("/athlete-form")// Redirect to athlete form
          }
        } else {
          console.error('Token not found in response');
        }
      })
      .catch((err) => {
        console.error('Error during registration:', err);
      });
    }
    
    return (
      <div className="flex flex-col font-poppins items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Register</h1>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded-md"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="COACH">Coach</option>
            <option value="ATHLETE">Athlete</option>
            {/* Add more roles as needed */}
          </select>
          <button
            onClick={handleSubmit}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    );
  
}

export default SignUp