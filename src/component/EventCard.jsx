import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken, getUserRole } from '../utils/AppUtils';

const EventCard = ({ eventId, eventTitle, eventDate, meetName, category, photoUrl, eventType }) => {
    const navigate = useNavigate();
    const token = getToken();
    const role = getUserRole(token);
    const [errorMessage, setErrorMessage] = useState('');

    // Default photo URL if none provided
    photoUrl = photoUrl || 'https://via.placeholder.com/500';

    const handleClick = () => {
        // Route based on event type
        if (eventType === "result") {
            navigate(`/result/${eventId}`);
        } else {
            navigate(`/event/${eventId}`);
        }
    };

    const handleRegister = async (e) => {
        e.stopPropagation();
        try {
            const response = await axios.post(`http://localhost:8081/event/register/${eventId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 201) {
                alert("Registered successfully!");
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 409) {
                setErrorMessage("You are already registered for this event.");
            } else {
                
                setErrorMessage("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div 
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col"
            onClick={handleClick}
        >
            <img
                className="w-full h-40 object-cover"
                src={photoUrl}
                alt={eventTitle}
            />
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{eventTitle}</h2>
                <p className="text-gray-600 mb-2 truncate">{`Date: ${new Date(eventDate).toLocaleDateString()}`}</p>
                
                <p className="text-gray-600 mb-2 truncate">{`Meet: ${meetName}`}</p>
                
                <p className="text-gray-600 mb-4 truncate">{`Category: ${category}`}</p>
                {role === 'ATHLETE' && (
                    <div className="flex justify-center mt-auto">
                        <button onClick={handleRegister} className="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition duration-300">
                            Register
                        </button>
                    </div>
                )}
                {errorMessage && (
                    <p className="text-red-500 text-center mt-2">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default EventCard;
