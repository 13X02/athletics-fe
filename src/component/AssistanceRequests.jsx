import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

// Dummy data
const dummyRequests = [
  {
    assistanceRequestId: 'AS_00001',
    athlete: { athleteId: 'ATH_00001', firstName: 'John', lastName: 'Doe' },
    remarks: 'Needs assistance with training.',
  },
  {
    assistanceRequestId: 'AS_00002',
    athlete: { athleteId: 'ATH_00002', firstName: 'Jane', lastName: 'Smith' },
    remarks: 'Requires dietary guidance.',
  },
  // Add more dummy requests if needed
];

const AssistanceRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(dummyRequests);

  const handleApprove = (requestId) => {
    // Handle approve action (mock implementation)
    alert(`Approved request ${requestId}`);
  };

  const handleReject = (requestId) => {
    // Handle reject action (mock implementation)
    alert(`Rejected request ${requestId}`);
  };

  const handleRedirectToAthlete = (athleteId) => {
    navigate(`/athlete/${athleteId}`);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Assistance Requests</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Request ID</th>
            <th className="px-4 py-2 border-b">Athlete Name</th>
            <th className="px-4 py-2 border-b">Remarks</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.assistanceRequestId}>
              <td className="px-4 py-2 border-b">{request.assistanceRequestId}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleRedirectToAthlete(request.athlete.athleteId)}
                  className="text-blue-500 hover:underline"
                >
                  {request.athlete.firstName} {request.athlete.lastName}
                </button>
              </td>
              <td className="px-4 py-2 border-b">{request.remarks}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleApprove(request.assistanceRequestId)}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request.assistanceRequestId)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
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
};

export default AssistanceRequests;
