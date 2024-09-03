import React, { useState, useEffect } from 'react';
import CoachCard from '../../component/CoachCard'; 
import axios from 'axios';
import Navbar from '../../component/Navbar';

const API_URL = 'http://localhost:8081'; 

export const fetchAllCoaches = async () => {
    try {
        const response = await axios.get(`${API_URL}/coaches`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coaches:', error);
        throw error;
    }
};

const CoachesPage = () => {
    const [allCoaches, setAllCoaches] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const coachesPerPage = 8; 
    useEffect(() => {
        const loadCoaches = async () => {
            try {
                const data = await fetchAllCoaches();
                setAllCoaches(data);
                updateCoaches(data, page, searchQuery);
            } catch (error) {
                console.error('Failed to load coaches:', error);
            }
        };

        loadCoaches();
    }, []);

    useEffect(() => {
        updateCoaches(allCoaches, page, searchQuery);
    }, [page, searchQuery, allCoaches]);

    const updateCoaches = (data, currentPage, query) => {
        const filteredCoaches = data.filter(coach =>
            `${coach.firstName} ${coach.lastName}`.toLowerCase().includes(query.toLowerCase())
        );
        const startIndex = (currentPage - 1) * coachesPerPage;
        const paginatedCoaches = filteredCoaches.slice(startIndex, startIndex + coachesPerPage);

        setCoaches(paginatedCoaches);
        setTotalPages(Math.ceil(filteredCoaches.length / coachesPerPage));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1); 
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="p-6">
            <div className="p-12 mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search Coaches"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
                />
            </div>
            <div className="p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {coaches.map(coach => (
                    <CoachCard
                        key={coach.coachId}
                        name={`${coach.firstName} ${coach.lastName}`}
                        photoUrl={coach.photoUrl}
                        category={coach.category}
                        coachId={coach.coachId}
                    />
                ))}
            </div>
            <div className="mt-6 flex justify-center items-center space-x-4">
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

export default CoachesPage;
