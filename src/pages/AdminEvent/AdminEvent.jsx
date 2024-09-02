// EventsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminEvent = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch all events
        axios.get('http://localhost:8081/event/all')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredEvents = events.filter(event =>
        event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.meetName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Events</h1>
            <input
                type="text"
                placeholder="Search by meet name or event title"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border border-gray-300 px-4 py-2 rounded mb-4 w-full"
            />
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">Event ID</th>
                        <th className="border-b px-4 py-2">Event Title</th>
                        <th className="border-b px-4 py-2">Meet Name</th>
                        <th className="border-b px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEvents.map(event => (
                        <tr key={event.eventId}>
                            <td className="border-b px-4 py-2">{event.eventId}</td>
                            <td className="border-b px-4 py-2">{event.eventTitle}</td>
                            <td className="border-b px-4 py-2">{event.meetName}</td>
                            <td className="border-b px-4 py-2">
                                <Link
                                    to={`/shortlist/${event.eventId}`}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    View Registrations
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminEvent;

