import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import Navbar from '../../component/Navbar';
import { getToken, getUserId } from '../../utils/AppUtils';

const Coach = () => {
  const [coachId, setCoachId] = useState(""); 
  const token = getToken();
  const [coach, setCoach] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [assistanceRequests, setAssistanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [achievementData, setAchievementData] = useState({
    meetName: '',
    event: '',
    score: '',
    performance: ''
  });
  
  const [activeTab, setActiveTab] = useState('Achievements');
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
        const response = await axios.get(`http://localhost:8081/coaches/fetch`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCoachId(response.data.coachId);
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
        const response = await axios.get(`http://localhost:8081/coaches/requests`, {
          headers: { Authorization: `Bearer ${token}` }
        });
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

  const handleAchievementModalOpen = () => setIsAchievementModalOpen(true);
  const handleAchievementModalClose = () => setIsAchievementModalOpen(false);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleAchievementChange = (e) => {
    setAchievementData({ ...achievementData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('firstName', editData.firstName);
      formData.append('lastName', editData.lastName);
      formData.append('gender', editData.gender);
      formData.append('birthDate', editData.birthDate);
      formData.append('category', editData.category);

      if (editData.photoUrl instanceof File) {
        formData.append('photo', editData.photoUrl);
      }

      await axios.put(`http://localhost:8081/coaches/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      handleModalClose();
      const response = await axios.get(`http://localhost:8081/coaches/${coachId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoach(response.data);
    } catch (error) {
      console.error('Error updating coach data', error);
    }
  };

  const handleAchievementSubmit = async () => {
    try {
      await axios.post(`http://localhost:8081/coaches/achievements`, achievementData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      handleAchievementModalClose();
      const response = await axios.get(`http://localhost:8081/coaches/${coachId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoach(response.data); // Refresh coach data
    } catch (error) {
      console.error('Error adding achievement', error);
    }
  };
  
  const handleApprove = async (requestId) => {
    try {
      await axios.post(`http://localhost:8081/coaches/requests/approve/${requestId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedRequests = assistanceRequests.map((request) =>
        request.assistanceRequestId === requestId ? { ...request, status: 'Approved' } : request
      );
      setAssistanceRequests(updatedRequests);
    } catch (error) {
      console.error('Error approving request', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(`http://localhost:8081/coaches/requests/decline/${requestId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedRequests = assistanceRequests.map((request) =>
        request.assistanceRequestId === requestId ? { ...request, status: 'Rejected' } : request
      );
      setAssistanceRequests(updatedRequests);
    } catch (error) {
      console.error('Error rejecting request', error);
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'Achievements') {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-2">Achievements</h2>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleAchievementModalOpen}
          >
            Add Achievement
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 mt-4">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assistanceRequests.map((request) => (
                <tr key={request.assistanceRequestId}>
                  <td className="px-6 py-4 whitespace-nowrap">{request.assistanceRequestId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.athlete.firstName} {request.athlete.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                      onClick={() => handleApprove(request.assistanceRequestId)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => handleReject(request.assistanceRequestId)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-4">
          <img
            src={coach.photoUrl}
            alt={`${coach.firstName} ${coach.lastName}`}
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-semibold">{coach.firstName} {coach.lastName}</h1>
            <p className="text-gray-600">Gender: {coach.gender}</p>
            <p className="text-gray-600">Date of Birth: {coach.birthDate}</p>
            <p className="text-gray-600">Category: {coach.category}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleModalOpen}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'Achievements' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            onClick={() => setActiveTab('Achievements')}
          >
            Achievements
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'Assistance Requests' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            onClick={() => setActiveTab('Assistance Requests')}
          >
            Assistance Requests
          </button>
        </div>

        {renderTabContent()}

        {/* Edit Profile Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              <input
                type="text"
                name="firstName"
                value={editData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                name="lastName"
                value={editData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                name="gender"
                value={editData.gender}
                onChange={handleChange}
                placeholder="Gender"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="date"
                name="birthDate"
                value={editData.birthDate}
                onChange={handleChange}
                placeholder="Birth Date"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                name="category"
                value={editData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="file"
                name="photoUrl"
                onChange={(e) => setEditData({ ...editData, photoUrl: e.target.files[0] })}
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Achievement Modal */}
        {isAchievementModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add Achievement</h2>
              <input
                type="text"
                name="meetName"
                value={achievementData.meetName}
                onChange={handleAchievementChange}
                placeholder="Meet Name"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                name="event"
                value={achievementData.event}
                onChange={handleAchievementChange}
                placeholder="Event"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                name="score"
                value={achievementData.score}
                onChange={handleAchievementChange}
                placeholder="Score"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                name="performance"
                value={achievementData.performance}
                onChange={handleAchievementChange}
                placeholder="Performance"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                  onClick={handleAchievementModalClose}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleAchievementSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coach;
