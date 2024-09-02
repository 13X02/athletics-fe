import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Navbar from '../../component/Navbar';

const AthleteDetails = () => {
    const { id } = useParams();
    const [athlete, setAthlete] = useState(null);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchAthleteDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/athletes/${id}`);
                setAthlete(response.data);
            } catch (error) {
                console.error('Error fetching athlete details:', error);
            }
        };

        const fetchAthleteResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/results/${id}`);
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching athlete results:', error);
            }
        };

        fetchAthleteDetails();
        fetchAthleteResults();
    }, [id]);

    // Sort results by score and get top 3 performances
    const topPerformances = results
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    return (
       <>
       <Navbar/>
       <div className="container mx-auto p-4">
            {athlete && (
                <div className="flex flex-col md:flex-row md:space-x-8">
                    <div className="md:w-1/3 flex justify-center items-center">
                        <img
                            src={athlete.photoUrl}
                            alt={`${athlete.firstName} ${athlete.lastName}`}
                            className="w-48 h-48 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-3xl font-bold mb-2">{athlete.firstName} {athlete.lastName}</h1>
                        <p><strong>Date of Birth:</strong> {new Date(athlete.birthDate).toLocaleDateString()}</p>
                        <p><strong>Gender:</strong> {athlete.gender}</p>
                        <p><strong>Height:</strong> {athlete.height}</p>
                        <p><strong>Weight:</strong> {athlete.weight}</p>
                        <p><strong>Category:</strong> {athlete.category}</p>
                        <p><strong>Coach:</strong> {athlete.coach ? athlete.coach.name : 'N/A'}</p>
                    </div>
                </div>
            )}

<div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Top Performances</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meet Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {topPerformances.map((performance) => (
                            <tr key={performance.resultId}>
                                <td className="px-6 py-4 whitespace-nowrap">{performance.event?.meet?.meetName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{performance.event?.eventTitle}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{performance.score}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{performance.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Performance Results</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meet Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {results.map((result) => (
                            <tr key={result.resultId}>
                                <td className="px-6 py-4 whitespace-nowrap">{result.event?.meet?.meetName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{result.event?.eventTitle}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{result.event?.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{result.event?.venue}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{result.score}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{result.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

           
        </div>
       </>
    );
};

export default AthleteDetails;
