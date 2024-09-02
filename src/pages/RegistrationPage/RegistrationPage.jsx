// RegistrationPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../component/Navbar';
import { getToken } from '../../utils/AppUtils';

const RegistrationPage = () => {
    const  {eventId}  = useParams();
    console.log(eventId)
    const [registrations, setRegistrations] = useState([]);
    const token = getToken();
    useEffect(() => {
        // Fetch registrations for the event
        axios.get(`http://localhost:8081/event/registrations/event/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => setRegistrations(response.data))
            .catch(error => console.error('Error fetching registrations:', error));
    }, [eventId, token]);

    const handleApprove = (registrationId) => {
        // Call API to approve registration
        axios.put(`http://localhost:8081/event/registrations/${registrationId}/approve`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                // Update the state or refetch the registrations
                setRegistrations(registrations.map(reg =>
                    reg.registrationId === registrationId ? { ...reg, status: 'APPROVED' } : reg
                ));
            })
            .catch(error => console.error('Error approving registration:', error));
    };

    const handleReject = (registrationId) => {
        // Call API to reject registration
        axios.put(`http://localhost:8081/event/registrations/${registrationId}/reject`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                // Update the state or refetch the registrations
                setRegistrations(registrations.map(reg =>
                    reg.registrationId === registrationId ? { ...reg, status: 'REJECTED' } : reg
                ));
            })
            .catch(error => console.error('Error rejecting registration:', error));
    };


    return (
        <>
        <Navbar/>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Registrations for Event {eventId}</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">Athlete ID</th>
                        <th className="border-b px-4 py-2">Status</th>
                        <th className="border-b px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map(reg => (
                        <tr key={reg.registrationId}>
                            <td className="border-b px-4 py-2">
                                <Link to={`/athlete/${reg.athleteId}`} className="text-blue-500 hover:underline">
                                    {reg.athleteId}
                                </Link>
                            </td>
                            <td className="border-b px-4 py-2">{reg.status}</td>
                            <td className="border-b px-4 py-2">
                                <button
                                    onClick={() => handleApprove(reg.registrationId)}
                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(reg.registrationId)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default RegistrationPage;
