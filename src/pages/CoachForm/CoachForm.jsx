import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/AppUtils';

const CoachForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('birthDate', data.birthDate);
      formData.append('gender', data.gender);
      formData.append('category', data.category);
      formData.append('photo', data.photo[0]);

      const authHeader = `Bearer ${getToken()}`;

      const response = await axios.post('http://localhost:8081/coaches/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': authHeader,
        },
      });

      alert('Coach profile created successfully!');
      console.log(response.data);
      navigate("/")
      
    } catch (error) {
      console.error('There was an error creating the profile!', error);
    }
  };

  return (
    <div className="flex font-poppins items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                id="firstName"
                type="text"
                {...register('firstName', { required: 'First name is required' })}
                className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="lastName"
                type="text"
                {...register('lastName', { required: 'Last name is required' })}
                className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth Date</label>
              <input
                id="birthDate"
                type="date"
                {...register('birthDate', { required: 'Birth date is required' })}
                className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate.message}</p>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                {...register('gender', { required: 'Gender is required' })}
                className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                id="category"
                type="text"
                {...register('category', { required: 'Category is required' })}
                className="mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                id="photo"
                type="file"
                {...register('photo', { required: 'Photo is required' })}
                className="mt-1 block w-full h-12 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-white file:bg-black hover:file:bg-gray-600"
              />
              {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoachForm;
