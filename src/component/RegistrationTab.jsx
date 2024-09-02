import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab } from '@headlessui/react';

function RegistrationTabs({ athleteId }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch registrations by athlete ID
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/event/results/${athleteId}`);
        setRegistrations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [athleteId]);

  // Filter registrations by status
  const filteredRegistrations = (status) => {
    return registrations.filter(reg => reg.status === status);
  };

  // Helper function for rendering the registration table
  const renderTable = (regs) => (
    <table className="min-w-full table-auto">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {regs.map(reg => (
          <tr key={reg.registrationId}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.event.eventId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.event.eventTitle}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.event.category}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (loading) return <p>Loading...</p>;

  return (
    <Tab.Group>
      <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
        <Tab className={({ selected }) => `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg 
          ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}>
          Overview
        </Tab>
        <Tab className={({ selected }) => `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg 
          ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}>
          Pending
        </Tab>
        <Tab className={({ selected }) => `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg 
          ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}>
          Approved
        </Tab>
        <Tab className={({ selected }) => `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg 
          ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}>
          Rejected
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel>
          {renderTable(registrations)}
        </Tab.Panel>
        <Tab.Panel>
          {renderTable(filteredRegistrations('PENDING'))}
        </Tab.Panel>
        <Tab.Panel>
          {renderTable(filteredRegistrations('APPROVED'))}
        </Tab.Panel>
        <Tab.Panel>
          {renderTable(filteredRegistrations('REJECTED'))}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default RegistrationTabs;
