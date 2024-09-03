import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/Navbar';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('COACH');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [fieldError, setFieldError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const checkExistingData = async () => {
        try {
            const usernameResponse = await axios.get(`http://localhost:8081/auth/exists/${username}`);
            const emailResponse = await axios.get(`http://localhost:8081/auth/existsby/${email}`);

            if (usernameResponse.data) {
                setUsernameError('Username already exists.');
                return false;
            } else {
                setUsernameError('');
            }

            if (emailResponse.data) {
                setEmailError('Email already exists.');
                return false;
            } else {
                setEmailError('');
            }

            return true;
        } catch (error) {
            console.error('Error checking existing data:', error);
            return false;
        }
    };

    const handleSubmit = async () => {
        if (!username || !email || !password) {
            setFieldError('All fields are required.');
            return;
        }

        if (!validateEmail(email)) {
            setEmailValid(false);
            return;
        } else {
            setEmailValid(true);
        }

        const isDataValid = await checkExistingData();
        if (!isDataValid) {
            return;
        }

        const requestBody = {
            username,
            email,
            password,
            role
        };

        axios.post("http://localhost:8081/auth/register", requestBody)
            .then((res) => {
                console.log('Registration successful:', res.data);
                const token = res.data; 
                if (token) {
                    localStorage.setItem('authToken', token); 
                    console.log('Token saved:', token);
                    if (role === 'COACH') {
                        navigate('/coach-form');
                    } else if (role === 'ATHLETE') {
                        navigate('/athlete-form');
                    }
                } else {
                    console.error('Token not found in response');
                }
            })
            .catch((err) => {
                console.error('Error during registration:', err);
            });
    };

    return (
        <>
        <Navbar/>
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
                {usernameError && <p className="text-red-500">{usernameError}</p>}
                <input
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 w-full p-2 border border-gray-300 rounded-md"
                />
                {emailError && <p className="text-red-500">{emailError}</p>}
                {!emailValid && <p className="text-red-500">Invalid email format.</p>}
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
                </select>
                {fieldError && <p className="text-red-500">{fieldError}</p>}
                <button
                    onClick={handleSubmit}
                    className="w-full p-2 bg-black text-white rounded-md hover:bg-gray-600 transition duration-200"
                >
                    Submit
                </button>
            </div>
        </div>
        </>
    );
};

export default SignUp;
