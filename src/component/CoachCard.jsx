import React from 'react';
import { useNavigate } from 'react-router-dom';

const CoachCard = ({ name, photoUrl, category, coachId }) => {
    const navigate = useNavigate();

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
                src={photoUrl || 'https://images.pexels.com/photos/209722/pexels-photo-209722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                alt={`${name}'s photo`}
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
                <p className="text-gray-600 mb-4">{category}</p>
            </div>
        </div>
    );
};

export default CoachCard;
