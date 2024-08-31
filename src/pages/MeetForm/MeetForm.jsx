import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const MeetForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('meetName', data.meetName);
      formData.append('photo', data.photo[0]);

      // Retrieve Bearer token from localStorage
      const authHeader = `Bearer ${localStorage.getItem('authToken')}`;

      const response = await axios.post('http://localhost:8081/meet/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': authHeader,
        },
      });

      alert('Meet created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('There was an error creating the meet!', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Meet</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
          <div>
            <label htmlFor="meetName" className="block text-sm font-medium text-gray-700">Meet Name</label>
            <input
              id="meetName"
              type="text"
              {...register('meetName', { required: 'Meet name is required' })}
              className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            {errors.meetName && <p className="text-red-500 text-xs mt-1">{errors.meetName.message}</p>}
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
            <input
              id="photo"
              type="file"
              {...register('photo', { required: 'Photo is required' })}
              className="mt-1 block w-full h-12 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-white file:bg-blue-500 hover:file:bg-blue-600"
            />
            {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MeetForm;
