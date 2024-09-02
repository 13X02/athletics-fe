import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getUserRole } from '../utils/AppUtils';

const CoachCard = ({ name, photoUrl, category, coachId }) => {
    const navigate = useNavigate();
    const token = getToken();
    const role = getUserRole(token);

    const handleClick = () => {
        navigate(`/coach/${coachId}`);
    };

    return (
        <div 
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
            onClick={handleClick}
        >
            <img
                className="w-full h-48 object-cover"
                src={'https://images.pexels.com/photos/209722/pexels-photo-209722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                alt={`${name}'s photo`}
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
                <p className="text-gray-600 mb-4">{category}</p>
                {role === 'ATHLETE' && (
                    <div className="flex justify-center">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition duration-300">
                            Request Assistance
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoachCard;
