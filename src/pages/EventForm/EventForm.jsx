import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isLoggedIn, getUserRole, getToken } from '../../utils/AppUtils';
import Navbar from '../../component/Navbar';

const EventForm = () => {
    const [formData, setFormData] = useState({
        eventTitle: '',
        eventDate: '',
        meetId: '',
        venue: '',
        category: '',
        eventDescription: '',
        photo: null,
    });
    const [error, setError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null); 
    const [showForm, setShowForm] = useState(false);
    const [meets, setMeets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMeets, setFilteredMeets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeets = async () => {
            try {
                const response = await axios.get('http://localhost:8081/meet'); 
                setMeets(response.data);
                setFilteredMeets(response.data);
            } catch (error) {
                console.error('Error fetching meets:', error);
            }
        };

        fetchMeets();
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredMeets(meets);
        } else {
            setFilteredMeets(
                meets.filter(meet =>
                    meet.meetName.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, meets]);

    useEffect(() => {
        const token = getToken();
        if (isLoggedIn() && getUserRole(token) === 'ATHLETE') {
            setShowForm(true);
        } else {
            setShowForm(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if all fields are filled
        for (const key in formData) {
            if (formData[key] === '' || formData[key] === null) {
                setError('All fields are required.');
                return;
            }
        }

        // Check if description length is valid
        if (formData.eventDescription.length > 1000) {
            setDescriptionError('Event description must be under 1000 characters.');
            return;
        } else {
            setDescriptionError(null);
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const token = getToken();
            const response = await axios.post('http://localhost:8081/event/create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Event created successfully");
            navigate('/dashboard');
            console.log(response.data);
            // Handle success (e.g., show a message or redirect)
        } catch (err) {
            setError('An error occurred while submitting the form');
            console.error(err);
        }
    };

    if (!showForm) {
        return <p className="text-center text-red-500">You must be logged in as an ATHLETE to view this form.</p>;
    }

    return (
        <div>
            <Navbar />

            <div className="max-w-3xl my-10 font-poppins mx-auto p-10 bg-white shadow-xl rounded-lg border border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Create New Event</h1>
                {error && <p className="text-red-600 text-center mb-6">{error}</p>}
                {descriptionError && <p className="text-red-600 text-center mb-6">{descriptionError}</p>} {/* Display description error */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Event Title</label>
                            <input
                                type="text"
                                name="eventTitle"
                                value={formData.eventTitle}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter event title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Event Date</label>
                            <input
                                type="date"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Meet</label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Search for a meet"
                            />
                            <select
                                name="meetId"
                                value={formData.meetId}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="" disabled>Select a meet</option>
                                {filteredMeets.map((meet) => (
                                    <option key={meet.meetId} value={meet.meetId}>
                                        {meet.meetName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Venue</label>
                            <input
                                type="text"
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter venue"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter category"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Event Description</label>
                        <textarea
                            name="eventDescription"
                            value={formData.eventDescription}
                            onChange={handleChange}
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            rows="6"
                            placeholder="Describe the event"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700">Photo</label>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            className="mt-2 block w-full text-sm text-gray-500 file:py-3 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
