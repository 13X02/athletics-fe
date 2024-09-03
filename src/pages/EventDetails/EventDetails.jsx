import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getToken, getUserRole } from '../../utils/AppUtils';
import { fetchEventNews } from '../../utils/newsApi';
import Navbar from '../../component/Navbar';

const API_URL = 'http://localhost:8081'; // Replace with your API URL

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [newsArticles, setNewsArticles] = useState([]);
    const token = getToken();
    const role = getUserRole(token);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`${API_URL}/event/${id}`);
                setEvent(response.data);

                // Fetch news related to the event
                const news = await fetchEventNews(response.data.eventTitle);
                setNewsArticles(news);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent();
    }, [id]);

 

    if (!event) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 flex flex-col font-poppins">
            <div className="flex flex-col lg:flex-row lg:space-x-8 bg-white rounded-lg shadow-lg mx-4 my-6 lg:my-8 lg:mx-8 overflow-hidden p-10 flex-grow">
                <div className="lg:w-1/2 flex-shrink-0">
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={event.photoUrl || 'https://via.placeholder.com/500'}
                        alt={event.eventTitle}
                    />
                </div>
                <div className="lg:w-1/2 p-16 flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-800 mb-4">{event.eventTitle}</h1>
                        <p className="text-lg text-gray-600 mb-2">{`Date: ${new Date(event.eventDate).toLocaleDateString()}`}</p>
                        <p className="text-lg text-gray-600 mb-2">{`Meet: ${event.meet?.meetName || 'N/A'}`}</p>
                        <p className="text-lg text-gray-600 mb-2">{`Venue: ${event.venue}`}</p>
                        <p className="text-lg text-gray-600 mb-2">{`Category: ${event.category}`}</p>
                        <p className="text-lg text-gray-700 mt-4">{event.eventDescription}</p>
                    </div>
                    
                </div>
            </div>
            <div className="p-6 max-w-6xl mx-auto mt-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Related News</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {newsArticles.length > 0 ? (
                        newsArticles.map((article, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4">
                                <img
                                    src={article.urlToImage || 'https://via.placeholder.com/150'}
                                    alt={article.title}
                                    className="w-full h-32 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h3>
                                <p className="text-gray-600 mb-2">{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Read more
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No news available.</p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default EventDetails;