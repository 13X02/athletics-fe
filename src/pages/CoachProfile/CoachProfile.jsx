import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../component/Navbar';
import { getToken, getUserRole } from '../../utils/AppUtils';

const CoachProfile = () => {
  const [coach, setCoach] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const { coachId } = useParams();
  const token = getToken();
  const role = getUserRole(token);

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/coaches/${coachId}`);
        setCoach(response.data);
        setAchievements(response.data.achievements || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coach data', error);
        setLoading(false);
      }
    };

    fetchCoachData();
  }, [coachId]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessage('');
    setError(null);
    setSuccess(null);
  };

  const handleRequestAssistance = async () => {
    if (role !== 'ATHLETE') return;

    setLoadingRequest(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('coachId', coachId);
      formData.append('message', message);

      const response = await axios.post('http://localhost:8081/athletes/request-assistance', 
        formData, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 201) {
        setSuccess('Assistance request sent successfully!');
        handleCloseModal();
      } 
    } catch (error) {
        setError(error.response?.status === 409 ? 'Assistance request already exists.' : 'Failed to send assistance request.');
    } finally {
      setLoadingRequest(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <>
      <Navbar/>
      <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
        {coach && (
          <div className="bg-white shadow-md rounded-lg p-4 md:p-6 lg:p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center mb-6">
              <img
                src={coach.photoUrl}
                alt={`${coach.firstName} ${coach.lastName}`}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold mb-2">{coach.firstName} {coach.lastName}</h1>
                <p className="text-gray-700">{coach.gender}, {new Date(coach.birthDate).toLocaleDateString()}</p>
                <p className="text-gray-500">{coach.category}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Achievements</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500">Meet Name</th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500">Event</th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500">Score</th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {achievements.map((achievement) => (
                      <tr key={achievement.achievementId}>
                        <td className="py-2 px-4 border-b">{achievement.meetName}</td>
                        <td className="py-2 px-4 border-b">{achievement.event}</td>
                        <td className="py-2 px-4 border-b">{achievement.score}</td>
                        <td className="py-2 px-4 border-b">{achievement.performance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {role === 'ATHLETE' && (
              <div className="flex justify-center mt-6">
                <button 
                  className="px-4 py-2 bg-black text-white rounded-full shadow hover:bg-gray-700 transition duration-300"
                  onClick={handleOpenModal}
                >
                  Request Assistance
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal for requesting assistance */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Request Assistance</h3>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows="4"
                placeholder="Enter your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {error && <p className="text-red-500 mb-2">{error}</p>}
              {success && <p className="text-green-500 mb-2">{success}</p>}
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-300"
                  onClick={handleRequestAssistance}
                  disabled={loadingRequest}
                >
                  {loadingRequest ? 'Sending...' : 'Send Request'}
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition duration-300"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CoachProfile;
