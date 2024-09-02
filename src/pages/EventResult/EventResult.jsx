import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../component/Navbar';
import axios from 'axios';

const EventResult = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch event details
        const eventResponse = await axios.get(`http://localhost:8081/event/${eventId}`);
        setEvent(eventResponse.data);

        // Fetch results
        const resultsResponse = await axios.get(`http://localhost:8081/event/${eventId}/result`);
        setResults(resultsResponse.data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="p-4">
        {event && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Section */}
            <div className="md:col-span-1">
              <img 
                src={event.photoUrl} 
                alt={event.eventTitle} 
                className="w-full  object-cover "  // Adjust width and height for fixed image
              />
            </div>

            {/* Details Section */}
            <div className="md:col-span-1">
              <h1 className="text-2xl font-bold mb-4">{event.eventTitle}</h1>
              <p><strong>Date:</strong> {event.eventDate}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Description:</strong> {event.eventDescription}</p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Athlete Results</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Athlete</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {result.athlete.firstName} {result.athlete.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.score}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.comment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EventResult;
