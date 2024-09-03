import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../component/Navbar';

const AdminDashboard = () => {
    const [meets, setMeets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/meet')
            .then(response => setMeets(response.data))
            .catch(error => console.error('Error fetching meets:', error));
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 md:p-6 lg:p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
                <div className="mb-8 flex flex-wrap justify-center p-10 gap-4">
                    <Link
                        to="/event-form"
                        className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition duration-300"
                    >
                        Create Event
                    </Link>
                    <Link
                        to="/meet-form"
                        className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition duration-300"
                    >
                        Create Meet
                    </Link>
                    <Link
                        to="/adminevent"
                        className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition duration-300"
                    >
                        Shortlist Candidates
                    </Link>
                    <Link
                        to="/publishresult"
                        className="bg-black text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition duration-300"
                    >
                        Publish Results
                    </Link>
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Created Meets</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border-b px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meet ID</th>
                                <th className="border-b px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meet Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meets.length > 0 ? (
                                meets.map(meet => (
                                    <tr key={meet.meetId} className="hover:bg-gray-50">
                                        <td className="border-b px-4 py-3">{meet.meetId}</td>
                                        <td className="border-b px-4 py-3">{meet.meetName}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="border-b px-4 py-3 text-center">No Meets Available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
