import React from 'react';
import { useNavigate } from 'react-router-dom';

const AthleteCard = ({ athleteId, name, category, photoUrl }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/athlete/${athleteId}`);
    };

    return (
        <div 
            className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" 
            onClick={handleClick}
        >
            <img
                className="w-full h-48 object-cover"
                src={photoUrl || 'https://via.placeholder.com/500'}
                alt={`${name}'s photo`}
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
                <p className="text-gray-600">{category}</p>
                <p className="text-gray-600 mt-2">ID: {athleteId}</p>
            </div>
        </div>
    );
};

export default AthleteCard;
