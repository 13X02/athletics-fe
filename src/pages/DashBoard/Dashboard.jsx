import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { FaCalendarDay, FaUserAlt, FaUserTie } from 'react-icons/fa';
import Navbar from '../../component/Navbar';

// Register required components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const formatDate = (dateTime) => {
  const date = new Date(dateTime);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

const StatsDashboard = () => {
  const [eventStats, setEventStats] = useState(null);
  const [overviewStats, setOverviewStats] = useState(null);

  useEffect(() => {
    // Fetch data from Event Stats API
    axios.get('http://localhost:8081/event/statistics')
      .then((response) => setEventStats(response.data))
      .catch((error) => console.error('Error fetching event stats:', error));

    // Fetch data from Coaches Overview API
    axios.get('http://localhost:8081/coaches/overview')
      .then((response) => setOverviewStats(response.data))
      .catch((error) => console.error('Error fetching overview stats:', error));
  }, []);

  if (!eventStats || !overviewStats) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  // Prepare data for Line Charts
  const eventDates = Object.keys(eventStats.dailyEventCounts).map(formatDate);
  const eventCounts = Object.values(eventStats.dailyEventCounts);

  const athleteDates = Object.keys(overviewStats.athletesCreatedPerDay).map(formatDate);
  const athleteCounts = Object.values(overviewStats.athletesCreatedPerDay);

  const coachDates = Object.keys(overviewStats.coachesCreatedPerDay).map(formatDate);
  const coachCounts = Object.values(overviewStats.coachesCreatedPerDay);

  // Data for Line Charts
  const eventData = {
    labels: eventDates,
    datasets: [
      {
        label: 'Events Per Day',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        data: eventCounts,
        fill: false,
      },
    ],
  };

  const athleteData = {
    labels: athleteDates,
    datasets: [
      {
        label: 'Athletes Created Per Day',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        data: athleteCounts,
        fill: false,
      },
    ],
  };

  const coachData = {
    labels: coachDates,
    datasets: [
      {
        label: 'Coaches Created Per Day',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        data: coachCounts,
        fill: false,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto font-poppins p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-600 text-white text-center p-6 rounded-lg shadow-lg flex items-center justify-center square">
            <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg mr-4">
              <FaCalendarDay size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Total Events</h2>
              <p className="text-4xl font-bold">{eventStats.totalEvents}</p>
            </div>
          </div>
          <div className="bg-green-600 text-white text-center p-6 rounded-lg shadow-lg flex items-center justify-center square">
            <div className="w-16 h-16 bg-white text-green-600 rounded-full flex items-center justify-center shadow-lg mr-4">
              <FaUserAlt size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Total Athletes</h2>
              <p className="text-4xl font-bold">{overviewStats.totalAthletes}</p>
            </div>
          </div>
          <div className="bg-red-600 text-white text-center p-6 rounded-lg shadow-lg flex items-center justify-center square">
            <div className="w-16 h-16 bg-white text-red-600 rounded-full flex items-center justify-center shadow-lg mr-4">
              <FaUserTie size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Total Coaches</h2>
              <p className="text-4xl font-bold">{overviewStats.totalCoaches}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-lg square">
            <h3 className="text-lg font-semibold mb-4">Events Per Day</h3>
            <div className="h-full w-full">
              <Line data={eventData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg square">
            <h3 className="text-lg font-semibold mb-4">Athletes Created Per Day</h3>
            <div className="h-full w-full">
              <Line data={athleteData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg square">
            <h3 className="text-lg font-semibold mb-4">Coaches Created Per Day</h3>
            <div className="h-full w-full">
              <Line data={coachData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsDashboard;
