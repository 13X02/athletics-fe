import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../component/Navbar';
import { getToken } from '../../utils/AppUtils';

const ResultFormPage = () => {
    const { eventId } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = getToken(); 
    useEffect(() => {
        
        axios.get(`http://localhost:8081/event/approvedregistrations/event/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                const initializedResults = response.data.map(reg => ({
                    regId: reg.registrationId,
                    score: '',   
                    comment: '',
                    eventId: eventId  
                }));
                setResults(initializedResults);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching registrations:', error);
                setLoading(false);
            });
    }, [eventId, token]);

    const handleInputChange = (index, field, value) => {
        const updatedResults = [...results];
        updatedResults[index][field] = value;
        setResults(updatedResults);
    };

    const handleSave = () => {
        axios.post('http://localhost:8081/event/result', results, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                alert('Results saved successfully!');
                navigate("/dashboard")

            })
            .catch(error => {
                console.error('Error saving results:', error);
            });
        }
    if (loading) return <p>Loading...</p>;

    return (
        <>
        <Navbar/>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Result Form for Event {eventId}</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">Registration ID</th>
                        <th className="border-b px-4 py-2">Score</th>
                        <th className="border-b px-4 py-2">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={result.regId}>
                            <td className="border-b px-4 py-2">{result.regId}</td>
                            <td className="border-b px-4 py-2">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={result.score}
                                    onChange={(e) => handleInputChange(index, 'score', e.target.value)}
                                    className="border border-gray-300 px-2 py-1 rounded w-full"
                                />
                            </td>
                            <td className="border-b px-4 py-2">
                                <input
                                    type="text"
                                    value={result.comment}
                                    onChange={(e) => handleInputChange(index, 'comment', e.target.value)}
                                    className="border border-gray-300 px-2 py-1 rounded w-full"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <button
                    onClick={handleSave}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Save
                </button>
            </div>
        </div>
        </>
    );
};

export default ResultFormPage;
