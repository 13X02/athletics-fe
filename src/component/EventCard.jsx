import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getUserRole } from '../utils/AppUtils';

const EventCard = ({ eventId, eventTitle, eventDate, meetName, category, photoUrl, eventType }) => {
    const navigate = useNavigate();
    const token = getToken();
    const role = getUserRole(token);

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
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition duration-300">
                            Register
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCard;
