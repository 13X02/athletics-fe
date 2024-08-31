// src/pages/EventDashboard.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [totalEvents, setTotalEvents] = useState(0);
    const [eventCounts, setEventCounts] = useState({});

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch('http://localhost:8081/event/statistics');
                const data = await response.json();
                
                setTotalEvents(data.totalEvents);
                setEventCounts(data.dailyEventCounts);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, []);

    // Prepare data for the bar chart
    const chartData = {
        labels: Object.keys(eventCounts),
        datasets: [
            {
                label: 'Events per Date',
                data: Object.values(eventCounts),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw} events`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Events',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h1>Event Dashboard</h1>
            <h2>Total Events: {totalEvents}</h2>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Dashboard;
