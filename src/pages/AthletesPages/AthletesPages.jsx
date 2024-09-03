import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AthleteCard from '../../component/AthleteCard';
import Navbar from '../../component/Navbar';

const API_URL = 'http://localhost:8081'; 

export const fetchAllAthletes = async () => {
    try {
        const response = await axios.get(`${API_URL}/athletes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching athletes:', error);
        throw error;
    }
};

const AthletesPage = () => {
    const [athletes, setAthletes] = useState([]);
    const [filteredAthletes, setFilteredAthletes] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const athletesPerPage = 8; 

    useEffect(() => {
        const loadAthletes = async () => {
            try {
                const data = await fetchAllAthletes();
                setAthletes(data);
                updateAthletes(data, page, searchQuery);
            } catch (error) {
                console.error('Failed to load athletes:', error);
            }
        };

        loadAthletes();
    }, []);

    useEffect(() => {
        updateAthletes(athletes, page, searchQuery);
    }, [page, searchQuery, athletes]);

    const updateAthletes = (data, currentPage, query) => {
        const filtered = data.filter(athlete => 
            `${athlete.firstName} ${athlete.lastName}`.toLowerCase().includes(query.toLowerCase())
        );
        const startIndex = (currentPage - 1) * athletesPerPage;
        const paginatedAthletes = filtered.slice(startIndex, startIndex + athletesPerPage);

        setFilteredAthletes(paginatedAthletes);
        setTotalPages(Math.ceil(filtered.length / athletesPerPage));
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
       <div className="p-12 font-poppins bg-gray-100 min-h-screen">
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAthletes.length > 0 ? (
                    filteredAthletes.map(athlete => (
                        <AthleteCard
                            key={athlete.athleteId}
                            athleteId={athlete.athleteId}
                            name={`${athlete.firstName} ${athlete.lastName}`}
                            category={athlete.category}
                            photoUrl={athlete.photoUrl}
                        />
                    ))
                ) : (
                    <p className="text-gray-600 col-span-full">No athletes found.</p>
                )}
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

export default AthletesPage;