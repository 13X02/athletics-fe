import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventResult = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDummyData = async () => {
      try {
        setLoading(true);

        // Simulate a delay to mimic an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dummy event data
        const dummyEvent = {
          eventTitle: 'Dummy Sports Event',
          photoUrl: 'https://via.placeholder.com/150',
          eventDate: '2024-09-01',
          venue: 'Dummy Stadium',
          eventDescription: 'This is a description of a dummy sports event.',
        };

        // Dummy results data
        const dummyResults = [
          {
            athlete: { firstName: 'John', lastName: 'Doe' },
            score: 95,
            comment: 'Excellent performance!',
          },
          {
            athlete: { firstName: 'Jane', lastName: 'Smith' },
            score: 88,
            comment: 'Great effort!',
          },
          {
            athlete: { firstName: 'Emily', lastName: 'Johnson' },
            score: 92,
            comment: 'Outstanding!',
          },
        ];

        setEvent(dummyEvent);
        setResults(dummyResults);
      } catch (err) {
        setError('Failed to load dummy data');
      } finally {
        setLoading(false);
      }
    };

    fetchDummyData();
  }, [eventId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      {event && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">{event.eventTitle}</h1>
          <img src={event.photoUrl} alt={event.eventTitle} className="mb-4" />
          <p><strong>Date:</strong> {event.eventDate}</p>
          <p><strong>Venue:</strong> {event.venue}</p>
          <p><strong>Description:</strong> {event.eventDescription}</p>
        </div>
      )}

      <div>
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
  );
};

export default EventResult;