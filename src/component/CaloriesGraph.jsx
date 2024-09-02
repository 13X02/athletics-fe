import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import 'tailwindcss/tailwind.css';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const CaloriesGraph = () => {
  const [dailyDietData, setDailyDietData] = useState([]);
  const [weightPlan, setWeightPlan] = useState(null);
  const [showWeightPlanModal, setShowWeightPlanModal] = useState(false);
  const [showDailyDietModal, setShowDailyDietModal] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  // Weight Plan form state
  const [weightPlanForm, setWeightPlanForm] = useState({
    startWeight: '',
    targetWeight: '',
    preference: '',
    dailyCalorieGoal: ''
  });

  // Daily Diet form state
  const [dailyDietForm, setDailyDietForm] = useState({
    date: '',
    calories: '',
    currentWeight: ''
  });

  useEffect(() => {
    fetchDailyDietData();
  }, []);

  const fetchDailyDietData = async () => {
    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
      const response = await axios.get('/api/daily-diet', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDailyDietData(response.data);
    } catch (error) {
      console.error('Error fetching daily diet data:', error);
    }
  };

  const handleAddOrEditWeightPlan = () => {
    setShowWeightPlanModal(true);
  };

  const handleAddDailyDiet = () => {
    setShowDailyDietModal(true);
  };

  const handleGetRecommendation = async () => {
    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
      const response = await axios.get('/api/recommendation', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecommendation(response.data);
    } catch (error) {
      console.error('Error fetching AI recommendation:', error);
    }
  };

  // Weight Plan form handlers
  const handleWeightPlanChange = (e) => {
    const { name, value } = e.target;
    setWeightPlanForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleWeightPlanSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
      await axios.post('/api/weight-plan', weightPlanForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowWeightPlanModal(false);
    } catch (error) {
      console.error('Error submitting weight plan:', error);
    }
  };

  // Daily Diet form handlers
  const handleDailyDietChange = (e) => {
    const { name, value } = e.target;
    setDailyDietForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleDailyDietSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
      await axios.post('/api/daily-diet', dailyDietForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowDailyDietModal(false);
    } catch (error) {
      console.error('Error submitting daily diet:', error);
    }
  };

  const data = {
    labels: dailyDietData.map(d => d.date),
    datasets: [
      {
        label: 'Calories per Day',
        data: dailyDietData.map(d => d.calories),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)'
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Calories Graph</h1>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <button
            onClick={handleAddOrEditWeightPlan}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
          >
            Add/Edit Weight Plan
          </button>
          <button
            onClick={handleAddDailyDiet}
            className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 w-full sm:w-auto"
          >
            Add Daily Diet
          </button>
          <button
            onClick={handleGetRecommendation}
            className="px-5 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition duration-300 w-full sm:w-auto"
          >
            Get AI Recommendation
          </button>
        </div>
        
        <div className="mb-6">
          <Line data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true }, tooltip: { mode: 'index' }}}} />
        </div>
        
        {/* Weight Plan Modal */}
        {showWeightPlanModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Weight Plan</h2>
              <form onSubmit={handleWeightPlanSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="startWeight">Start Weight (kg)</label>
                  <input
                    type="number"
                    id="startWeight"
                    name="startWeight"
                    value={weightPlanForm.startWeight}
                    onChange={handleWeightPlanChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="targetWeight">Target Weight (kg)</label>
                  <input
                    type="number"
                    id="targetWeight"
                    name="targetWeight"
                    value={weightPlanForm.targetWeight}
                    onChange={handleWeightPlanChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="preference">Preference</label>
                  <input
                    type="text"
                    id="preference"
                    name="preference"
                    value={weightPlanForm.preference}
                    onChange={handleWeightPlanChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="dailyCalorieGoal">Daily Calorie Goal</label>
                  <input
                    type="number"
                    id="dailyCalorieGoal"
                    name="dailyCalorieGoal"
                    value={weightPlanForm.dailyCalorieGoal}
                    onChange={handleWeightPlanChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWeightPlanModal(false)}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Daily Diet Modal */}
        {showDailyDietModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Daily Diet</h2>
              <form onSubmit={handleDailyDietSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={dailyDietForm.date}
                    onChange={handleDailyDietChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="calories">Calories</label>
                  <input
                    type="number"
                    id="calories"
                    name="calories"
                    value={dailyDietForm.calories}
                    onChange={handleDailyDietChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="currentWeight">Current Weight (kg)</label>
                  <input
                    type="number"
                    id="currentWeight"
                    name="currentWeight"
                    value={dailyDietForm.currentWeight}
                    onChange={handleDailyDietChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDailyDietModal(false)}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* AI Recommendation */}
        {recommendation && (
          <div className="mt-8 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">AI Recommended Meal Plan</h3>
            <p><strong>Breakfast:</strong> {recommendation.breakfast}</p>
            <p><strong>Lunch:</strong> {recommendation.lunch}</p>
            <p><strong>Dinner:</strong> {recommendation.dinner}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaloriesGraph;
