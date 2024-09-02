import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Navbar from '../../component/Navbar';
import { CiEdit } from "react-icons/ci";

const Coach = () => {
  const coachId = "C002"; // Use useParams() to get the dynamic coachId
  const [coach, setCoach] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [assistanceRequests, setAssistanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Achievements'); // State to manage active tab
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    category: '',
    photoUrl: ''
  });

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/coaches/${coachId}`);
        setCoach(response.data);
        setAchievements(response.data.achievements);
        setEditData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          gender: response.data.gender,
          birthDate: response.data.birthDate,
          category: response.data.category,
          photoUrl: response.data.photoUrl
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coach data', error);
        setLoading(false);
      }
    };

    const fetchAssistanceRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/coaches/${coachId}/assistance-requests`);
        setAssistanceRequests(response.data);
      } catch (error) {
        console.error('Error fetching assistance requests', error);
      }
    };

    fetchCoachData();
    fetchAssistanceRequests();
  }, [coachId]);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setEditData({
      ...editData,
      photoUrl: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8081/coaches/${coachId}`, editData);
      handleModalClose();
      // Refresh the coach data
      const response = await axios.get(`http://localhost:8081/coaches/${coachId}`);
      setCoach(response.data);
    } catch (error) {
      console.error('Error updating coach data', error);
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'Achievements') {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-2">Achievements</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meet Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {achievements.map((achievement) => (
                <tr key={achievement.achievementId}>
                  <td className="px-6 py-4 whitespace-nowrap">{achievement.meetName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{achievement.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{achievement.score}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{achievement.performance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'Assistance Requests') {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-2">Assistance Requests</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Athlete</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assistanceRequests.map((request) => (
                <tr key={request.assistanceRequestId}>
                  <td className="px-6 py-4 whitespace-nowrap">{request.assistanceRequestId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.athlete.firstName} {request.athlete.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {coach && (
          <div className="relative">
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="md:w-1/3 flex justify-center items-center">
                <img
                  src={coach.photoUrl || 'https://images.pexels.com/photos/1618042/pexels-photo-1618042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                  alt={`${coach.firstName} ${coach.lastName}`}
                  className="w-48 h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-2">{coach.firstName} {coach.lastName}</h1>
                <p><strong>Gender:</strong> {coach.gender}</p>
                <p><strong>Date of Birth:</strong> {new Date(coach.birthDate).toLocaleDateString()}</p>
                <p><strong>Category:</strong> {coach.category}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleModalOpen}
                >
                  Edit <CiEdit className="inline ml-1" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8">
              <div className="flex space-x-1 bg-blue-900/20 p-1">
                <button
                  className={`p-2 rounded-lg ${activeTab === 'Achievements' ? 'bg-white text-blue-700' : 'text-blue-700'}`}
                  onClick={() => setActiveTab('Achievements')}
                >
                  Achievements
                </button>
                <button
                  className={`p-2 rounded-lg ${activeTab === 'Assistance Requests' ? 'bg-white text-blue-700' : 'text-blue-700'}`}
                  onClick={() => setActiveTab('Assistance Requests')}
                >
                  Assistance Requests
                </button>
              </div>

              <div className="mt-4">
                {renderTabContent()}
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div className="fixed inset-0 bg-black opacity-30"></div>
            <div className="relative bg-white rounded-lg shadow-md p-6 z-10">
              <h2 className="text-2xl font-bold mb-4">Edit Coach Info</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={editData.gender}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={editData.birthDate}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={editData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {editData.photoUrl && (
                    <img src={editData.photoUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md" />
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-4 px-4 py-2 bg-gray-500 text-white rounded"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Coach;
