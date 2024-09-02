import React, { useState, useEffect } from 'react';
import EventCard from '../../component/EventCard';
import axios from 'axios';
import Navbar from '../../component/Navbar';

const API_URL = 'http://localhost:8081'; // Replace with your API URL

export const fetchAllEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/event/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

const EventPage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const eventsPerPage = 12; // Adjust as needed

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await fetchAllEvents();
                setAllEvents(data);
                updateEvents(data, page, searchQuery);
            } catch (error) {
                console.error('Failed to load events:', error);
            }
        };

        loadEvents();
    }, []);

    useEffect(() => {
        updateEvents(allEvents, page, searchQuery);
    }, [page, searchQuery, allEvents]);

    const updateEvents = (data, currentPage, query) => {
        const filteredEvents = data.filter(event =>
            `${event.eventTitle} ${event.meetName} ${event.category}`.toLowerCase().includes(query.toLowerCase())
        );
        const startIndex = (currentPage - 1) * eventsPerPage;
        const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

        setEvents(paginatedEvents);
        setTotalPages(Math.ceil(filteredEvents.length / eventsPerPage));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1); // Reset to first page on search
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
       <>
       <Navbar/>
       <div className="p-16">
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search Events by Meet, Category, or Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {events.map(event => (
                    <EventCard
                        key={event.eventId}
                        eventId={event.eventId}
                        eventTitle={event.eventTitle}
                        eventDate={event.eventDate}
                        meetName={event.meetName}
                        category={event.category}
                        photoUrl={event.photoUrl}
                        eventType={"event"}
                    />
                ))}
            </div>
            <div className="mt-6 flex justify-center space-x-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-500 text-white rounded-full disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-700">Page {page} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-500 text-white rounded-full disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
       </>
    );
};

export default EventPage;
