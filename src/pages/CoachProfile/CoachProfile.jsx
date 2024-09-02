// src/pages/CoachProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../component/Navbar';
const CoachProfile = () => {
  const [coach, setCoach] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const { coachId } = useParams(); // Extract coachId from route parameters

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/coaches/${coachId}`);
        setCoach(response.data);
        setAchievements(response.data.achievements);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coach data', error);
        setLoading(false);
      }
    };

    fetchCoachData();
  }, [coachId]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      {coach && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <img
              src={'https://images.pexels.com/photos/1618042/pexels-photo-1618042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
              alt={`${coach.firstName} ${coach.lastName}`}
              className="w-24 h-24 rounded-full object-cover mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold">{coach.firstName} {coach.lastName}</h1>
              <p className="text-gray-700">{coach.gender}, {coach.birthDate}</p>
              <p className="text-gray-500">{coach.category}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Achievements</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Meet Name</th>
                  <th className="py-2 px-4 border-b">Event</th>
                  <th className="py-2 px-4 border-b">Score</th>
                  <th className="py-2 px-4 border-b">Performance</th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((achievement) => (
                  <tr key={achievement.achievmentId}>
                    <td className="py-2 px-4 border-b">{achievement.meetName}</td>
                    <td className="py-2 px-4 border-b">{achievement.event}</td>
                    <td className="py-2 px-4 border-b">{achievement.score}</td>
                    <td className="py-2 px-4 border-b">{achievement.perfomance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CoachProfile;
