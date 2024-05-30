import React, { useState } from 'react';

function UserProfileForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    eatingHabit: '',
    healthGoal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data
    onSubmit(formData);
  };

  return (
    <div className='rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 pt-10 pb-7 flex items-center justify-center w-full'>
      <button
        className='absolute top-5 right-0 mt-4 mr-10 text-white text-xl cursor-pointer'
        onClick={onClose}
      >
        X
      </button>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded px-8 pt-8 pb-4 mb-4 w-[80%]'
      >
        <h2 className='text-3xl text-center text-gray-800 font-bold mb-6'>
          Create Your Profile ✨
        </h2>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='age'
          >
            Age:
          </label>
          <input
            type='number'
            id='age'
            name='age'
            value={formData.age}
            onChange={handleChange}
            className='appearance-none bg-white border-2 border-purple-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-purple-100'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='weight'
          >
            Weight (kg):
          </label>
          <input
            type='number'
            id='weight'
            name='weight'
            value={formData.weight}
            onChange={handleChange}
            className='appearance-none bg-white border-2 border-purple-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-purple-100'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='height'
          >
            Height (cm):
          </label>
          <input
            type='number'
            id='height'
            name='height'
            value={formData.height}
            onChange={handleChange}
            className='appearance-none bg-white border-2 border-purple-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-purple-100'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='activityLevel'
          >
            Activity Level:
          </label>
          <input
            type='text'
            id='activityLevel'
            name='activityLevel'
            value={formData.activityLevel}
            onChange={handleChange}
            className='appearance-none bg-white border-2 border-purple-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-purple-100'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='eatingHabit'
          >
            Eating Habit:
          </label>
          <input
            type='text'
            id='eatingHabit'
            name='eatingHabit'
            value={formData.eatingHabit}
            onChange={handleChange}
            className='appearance-none bg-white border-2 border-purple-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-purple-100'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='healthGoal'
          >
            Health Goal:
          </label>
          <input
            type='text'
            id='healthGoal'
            name='healthGoal'
            value={formData.healthGoal}
            onChange={handleChange}
            className='appearance-none bg-white border-2 border-purple-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-purple-100'
            required
          />
          <p className='text-xs text-gray-500 mt-1'>
            ex: Loss Weight, Muscle, Diet, Low Carb, High Protein..
          </p>
        </div>
        <button
          type='submit'
          className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserProfileForm;
