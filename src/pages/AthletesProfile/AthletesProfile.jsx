import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import Navbar from '../../component/Navbar';
import { Tab } from '@headlessui/react';
import { CiEdit } from "react-icons/ci";
import { getToken, getUserId } from '../../utils/AppUtils';
import CaloriesGraph from '../../component/CaloriesGraph'
import RegistrationTabs from '../../component/RegistrationTab';
const AthleteProfile = () => {
    const token = getToken();

    const [athleteId,setAthleteId] = useState('')
    const id = getUserId(token);
    const [athlete, setAthlete] = useState(null);
    const [results, setResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        height: '',
        weight: '',
        category: '',
        photo: null,
    });

    useEffect(() => {
        const fetchAthleteDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/athletes/fetchAthleteByUserId/${id}`);
                setAthlete(response.data);
                setAthleteId(response.data.athleteId)
                setEditData({
                    firstName: response.data.firstName || '',
                    lastName: response.data.lastName || '',
                    birthDate: response.data.birthDate || '',
                    gender: response.data.gender || '',
                    height: response.data.height || '',
                    weight: response.data.weight || '',
                    category: response.data.category || '',
                    photo: null,  // Start with null; it will be updated when a new file is chosen
                });
            } catch (error) {
                console.error('Error fetching athlete details:', error);
            }
        };

        const fetchAthleteResults = async () => {
            try {
                console.log(token)
                const response = await axios.get(`http://localhost:8081/event/resultByUserId`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setResults(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching athlete results:', error);
            }
        };

        fetchAthleteDetails();
        fetchAthleteResults();
    }, [id, token]);

    const topPerformances = results.sort((a, b) => b.score - a.score).slice(0, 3);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setEditData((prevData) => ({
            ...prevData,
            photo: e.target.files[0], // Store the file object
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        // Format date as 'yyyy-MM-dd'
        const formattedBirthDate = new Date(editData.birthDate).toISOString().split('T')[0];
    
        // Append form data
        Object.keys(editData).forEach(key => {
            if (key === 'photo' && editData.photo) {
                formData.append('photo', editData.photo); // Append the file if it exists
            } else if (key === 'birthDate') {
                formData.append(key, formattedBirthDate); // Append formatted date string
            } else if (editData[key] !== '' && editData[key] !== null) {
                formData.append(key, editData[key]);
            }
        });
    
        try {
            const response = await axios.put('http://localhost:8081/athletes/edit', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setAthlete((prev) => ({
                ...prev,
                ...editData,
                photoUrl: editData.photo ? URL.createObjectURL(editData.photo) : prev.photoUrl,
            }));
            closeModal();
        } catch (error) {
            console.error('Error updating athlete profile:', error.response || error);
        }
    };
    
    
    return (
       <> <Navbar />
       <div className="container mx-auto p-4">
           {athlete && (
               <div className="relative">
                   <div className="flex flex-col md:flex-row md:space-x-8">
                       <div className="md:w-1/3 flex justify-center items-center">
                           <img
                               src={athlete.photoUrl}
                               alt={`${athlete.firstName} ${athlete.lastName}`}
                               className="w-48 h-48 object-cover rounded-lg shadow-lg"
                           />
                       </div>
                       <div className="md:w-2/3">
                           <h1 className="text-3xl font-bold mb-2">{athlete.firstName} {athlete.lastName}</h1>
                           <p><strong>Date of Birth:</strong> {new Date(athlete.birthDate).toLocaleDateString()}</p>
                           <p><strong>Gender:</strong> {athlete.gender}</p>
                           <p><strong>Height:</strong> {athlete.height}</p>
                           <p><strong>Weight:</strong> {athlete.weight}</p>
                           <p><strong>Category:</strong> {athlete.category}</p>
                           <p><strong>Coach:</strong> {athlete.coach ? athlete.coach.name : 'N/A'}</p>
                       </div>
                   </div>
                   <button
                       className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow-lg"
                       onClick={openModal}
                   >
                      <CiEdit/>
                   </button>
               </div>
           )}

           {/* Tabs */}
           <Tab.Group>
               <Tab.List className="flex space-x-1 bg-blue-900/20 p-1">
                   <Tab
                       className={({ selected }) =>
                           selected
                               ? 'bg-white text-blue-700 p-2 rounded-lg'
                               : 'text-blue-700 p-2 rounded-lg'
                       }
                   >
                       Overview
                   </Tab>
                   <Tab
                       className={({ selected }) =>
                           selected
                               ? 'bg-white text-blue-700 p-2 rounded-lg'
                               : 'text-blue-700 p-2 rounded-lg'
                       }
                   >
                       Applied Events
                   </Tab>
                   <Tab
                       className={({ selected }) =>
                           selected
                               ? 'bg-white text-blue-700 p-2 rounded-lg'
                               : 'text-blue-700 p-2 rounded-lg'
                       }
                   >
                       Wellness
                   </Tab>
               </Tab.List>
               <Tab.Panels className="mt-4">
                   <Tab.Panel>
                       {/* Overview Content */}
                       <div className="mt-8">
                           <h2 className="text-2xl font-bold mb-4">Top Performances</h2>
                           <table className="min-w-full divide-y divide-gray-200">
                               <thead className="bg-gray-50">
                                   <tr>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meet Name</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                                   </tr>
                               </thead>
                               <tbody className="bg-white divide-y divide-gray-200">
                                   {topPerformances.map((performance) => (
                                       <tr key={performance.resultId}>
                                           <td className="px-6 py-4 whitespace-nowrap">{performance.event?.meet?.meetName}</td>
                                           <td className="px-6 py-4 whitespace-nowrap">{performance.event?.eventTitle}</td>
                                           <td className="px-6 py-4 whitespace-nowrap">{performance.score}</td>
                                           <td className="px-6 py-4 whitespace-nowrap">{performance.comment}</td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       </div>
                       <div className="mt-8">
                           <h2 className="text-2xl font-bold mb-4">Performance Results</h2>
                           <table className="min-w-full divide-y divide-gray-200">
                               <thead className="bg-gray-50">
                                   <tr>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meet Name</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                                   </tr>
                               </thead>
                               <tbody className="bg-white divide-y divide-gray-200">
                                   {results.map((result) => (
                                       <tr key={result.resultId}>
                                           <td className="px-6 py-4 whitespace-nowrap">{result.event?.meet?.meetName}</td>
                                           <td className="px-6 py-4 whitespace-nowrap">{result.event?.eventTitle}</td>
                                           <td className="px-6 py-4 whitespace-nowrap">{result.event?.category}</td>
                                           <td className="px-6 py-4 whitespace-nowrap">{result.event?.venue}</td>
                                           <td className="px-6 py-4 whitespace-nowrap">{result.score}</td>
                                           <td className="px-6 py-4 whitespace-nowrap">{result.comment}</td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       </div>
                   </Tab.Panel>
                   <Tab.Panel>
                       {/* Applied Events Content */}
                       <div className="mt-8">
                           <RegistrationTabs athleteId={athleteId}/>
                       </div>
                   </Tab.Panel>
                   <Tab.Panel>
                       {/* Wellness Content */}
                       <div className="mt-8">
                           <CaloriesGraph/>
                       </div>
                   </Tab.Panel>
               </Tab.Panels>
           </Tab.Group>

           {/* Edit Modal */}
           {isModalOpen && (
               <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                   <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
                       <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                       <form onSubmit={handleSubmit}>
                           <div className="grid grid-cols-2 gap-4">
                               <div>
                                   <label htmlFor="firstName" className="block font-medium">First Name</label>
                                   <input
                                       type="text"
                                       name="firstName"
                                       value={editData.firstName}
                                       onChange={handleInputChange}
                                       className="w-full p-2 border border-gray-300 rounded-lg"
                                   />
                               </div>
                               <div>
                                   <label htmlFor="lastName" className="block font-medium">Last Name</label>
                                   <input
                                       type="text"
                                       name="lastName"
                                       value={editData.lastName}
                                       onChange={handleInputChange}
                                       className="w-full p-2 border border-gray-300 rounded-lg"
                                   />
                               </div>
                               <div>
                                   <label htmlFor="birthDate" className="block font-medium">Birth Date</label>
                                   <input
                                       type="date"
                                       name="birthDate"
                                       value={editData.birthDate}
                                       onChange={handleInputChange}
                                       className="w-full p-2 border border-gray-300 rounded-lg"
                                   />
                               </div>
                               <div>
                                   <label htmlFor="gender" className="block font-medium">Gender</label>
                                   <select
                                       name="gender"
                                       value={editData.gender}
                                       onChange={handleInputChange}
                                       className="w-full p-2 border border-gray-300 rounded-lg"
                                   >
                                       <option value="Male">Male</option>
                                       <option value="Female">Female</option>
                                       <option value="Other">Other</option>
                                   </select>
                               </div>
                               <div>
                                   <label htmlFor="height" className="block font-medium">Height</label>
                                   <input
                                       type="text"
                                       name="height"
                                       value={editData.height}
                                       onChange={handleInputChange}
                                       className="w-full p-2 border border-gray-300 rounded-lg"
                                   />
                               </div>
                               <div>
                                   <label htmlFor="weight" className="block font-medium">Weight</label>
                                   <input
                                       type="text"
                                       name="weight"
                                       value={editData.weight}
                                       onChange={handleInputChange}
                                       className="w-full p-2 border border-gray-300 rounded-lg"
                                   />
                               </div>
                               <div>
                                   <label htmlFor="category" className="block font-medium">Category</label>
                                   <input
                                       type="text"
                                       name="category"
                                       value={editData.category}
                                       onChange={handleInputChange}
                                       className="w-full p-2 border border-gray-300 rounded-lg"
                                   />
                               </div>
                               <div>
                                   <label htmlFor="coach" className="block font-medium">Coach</label>
                                   <input
                                       type="text"
                                       name="coach"
                                       value={editData.coach}
                                       onChange={handleInputChange}
                                       className="w-full p-2 border border-gray-300 rounded-lg"
                                   />
                               </div>
                               <div>
                                   <label htmlFor="photoUrl" className="block font-medium">Photo</label>
                                   <input
                                       type="file"
                                       name="photoUrl"
                                       onChange={handleFileChange}
                                       className="w-full p-2 border border-gray-300 rounded-lg"
                                   />
                               </div>
                               <div className="col-span-2">
                                   <button
                                       type="submit"
                                       className="w-full p-2 bg-blue-500 text-white rounded-lg"
                                   >
                                       Save Changes
                                   </button>
                               </div>
                           </div>
                       </form>
                       <button
                           className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                           onClick={closeModal}
                       >
                           X
                       </button>
                   </div>
               </div>
           )}
       </div>
   </>
    );
};

export default AthleteProfile;
