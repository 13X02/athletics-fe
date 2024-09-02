// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../component/Navbar';

const AdminDashboard = () => {
    const [meets, setMeets] = useState([]);

    useEffect(() => {
        // Fetch list of meets
        axios.get('http://localhost:8081/meet')
            .then(response => setMeets(response.data))
            .catch(error => console.error('Error fetching meets:', error));
    }, []);

    return (
        <>
        <Navbar/>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="mb-6">
                <Link
                    to="/event-form"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                >
                    Create Event
                </Link>
                <Link
                    to="/meet-form"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                >
                    Create Meet
                </Link>
                <Link
                    to="/adminevent"
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2"
                >
                    Shortlist Candidates
                </Link>
                <Link
                    to="/publishresult"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Publish Results
                </Link>
            </div>
            <h2 className="text-xl font-semibold mb-4">Created Meets</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">Meet ID</th>
                        <th className="border-b px-4 py-2">Meet Name</th>
                    </tr>
                </thead>
                <tbody>
                    {meets.map(meet => (
                        <tr key={meet.meetId}>
                            <td className="border-b px-4 py-2">{meet.meetId}</td>
                            <td className="border-b px-4 py-2">{meet.meetName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default AdminDashboard;
