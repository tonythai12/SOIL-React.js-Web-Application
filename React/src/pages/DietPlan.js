import React, { useState } from 'react';
import {
  FaSeedling,
  FaDumbbell,
  FaAppleAlt,
  FaLeaf,
  FaCarrot,
  FaClock,
  FaGlobe,
  FaBalanceScale,
  FaBacon,
  FaBan,
} from 'react-icons/fa'; // Example icons for diet plans
import UserProfileForm from '../components/DietPlan/UserProfileForm';
import { useAuth } from '../context/AuthProvider';

// convert icon to JSX element from json file to use in components
const iconComponents = {
  "<FaSeedling className='text-green-500 text-3xl' />": (
    <FaSeedling className='text-green-500 text-3xl' />
  ),
  "<FaDumbbell className='text-blue-500 text-3xl' />": (
    <FaDumbbell className='text-blue-500 text-3xl' />
  ),
  "<FaAppleAlt className='text-red-500 text-3xl' />": (
    <FaAppleAlt className='text-red-500 text-3xl' />
  ),
  "<FaLeaf className='text-orange-500 text-3xl' />": (
    <FaLeaf className='text-orange-500 text-3xl' />
  ),
  "<FaCarrot className='text-purple-500 text-3xl' />": (
    <FaCarrot className='text-purple-500 text-3xl' />
  ),
  "<FaClock className='text-red-500 text-3xl' />": (
    <FaClock className='text-red-500 text-3xl' />
  ),
  "<FaGlobe className='text-blue-500 text-3xl' />": (
    <FaGlobe className='text-blue-500 text-3xl' />
  ),
  "<FaDumbbell className='text-green-500 text-3xl' />": (
    <FaDumbbell className='text-green-500 text-3xl' />
  ),
  "<FaBalanceScale className='text-yellow-500 text-3xl' />": (
    <FaBalanceScale className='text-yellow-500 text-3xl' />
  ),
  "<FaBacon className='text-purple-500 text-3xl' />": (
    <FaBacon className='text-purple-500 text-3xl' />
  ),
  "<FaSeedling className='text-orange-500 text-3xl' />": (
    <FaSeedling className='text-orange-500 text-3xl' />
  ),

  "<FaBan className='text-red-500 text-3xl' />": (
    <FaBan className='text-red-500 text-3xl' />
  ),
};

export default function DietPlan() {
  const { userData, setUserData, httpClient } = useAuth();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [dietPlan, setDietPlan] = useState(
    userData?.dietPlan && userData?.dietPlan.length > 0
      ? userData?.dietPlan
      : []
  );

  const handleProfileFormOpen = () => {
    if (!userData?.email) {
      return alert(
        'This is a members-only page. You can access it after logging in'
      );
    }
    setShowProfileForm(true);
  };

  const handleProfileFormClose = () => {
    setShowProfileForm(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      handleProfileFormClose();
    }
  };

  const onSubmit = async (profileData) => {
    profileData && alert('Your profile information has been saved.');
    setShowProfileForm(false);

    // Compare profileData with dietPlan to find related diet plans
    const { healthGoal, eatingHabit } = profileData;

    const res = await httpClient.fetch(`/soil/dietplan/${userData.user_id}`, {
      method: 'POST',
      body: JSON.stringify({
        healthGoal,
        eatingHabit,
      }),
    });

    // Update dietPlan state
    if (res.status === 201) {
      setDietPlan(res.data);
      setUserData({
        ...userData,
        dietPlan: [...dietPlan],
      });
    } else if (res.status === 404) {
      alert(res.message);
    }
  };

  return (
    <div className='py-5 bg-gray-50'>
      <div className=' max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Custom Diet Plan recommended for User */}
        {userData?.dietPlan && userData?.dietPlan.length > 0 && (
          <div>
            <h2 className='text-3xl font-extrabold text-center text-gray-800 mb-6 py-5'>
              {userData?.name}'s Custom Diet Plan!
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-1'>
              {dietPlan &&
                dietPlan.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-lg shadow-lg p-6  bg-purple-200
                    `}
                  >
                    <div className='flex items-center space-x-4 mb-4'>
                      {iconComponents[plan.icon]}
                      <h3 className='font-semibold text-xl'>{plan.title}</h3>
                    </div>
                    <p className='text-gray-600 text-sm'>{plan.description}</p>
                    <ul className='list-disc list-inside mt-4 text-gray-700'>
                      {plan.products.map((product, index) => (
                        <li key={index}>{product}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* When user is not logged in */}
        {userData?.email &&
          userData.dietPlan &&
          userData.dietPlan.length === 0 && (
            <div className='flex justify-center flex-col'>
              <button
                onClick={handleProfileFormOpen}
                className='block text-xl  mt-8 mb-2 px-4 py-2 border border-transparent rounded-md shadow-sm  text-white bg-indigo-600 hover:bg-indigo-700 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Create Your Profile ⏎
              </button>
              <div className='inline-block align-bottom bg-white rounded-lg  overflow-hidden shadow-xl transform transition-all '>
                <div className='bg-yellow-200 px-6 py-8 sm:p-10 sm:pb-8 sm:rounded-lg'>
                  <div className='sm:flex sm:items-start'>
                    <div className='sm:w-full sm:text-center'>
                      <h3 className='text-3xl font-bold text-gray-800 mb-4'>
                        {' '}
                        Diet Recommendations!
                      </h3>
                      <p className='text-lg text-gray-700'>
                        Here are some diet recommendations based on your
                        profile. Remember to consult with a nutritionist or a
                        healthcare professional before starting any new diet
                        plan.
                      </p>
                      <div className='mt-6'>
                        <img
                          className='mx-auto'
                          src='/img/dietplan.jpg'
                          alt='Diet Recommendation'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {!userData?.email && (
          <div className='flex justify-center flex-col'>
            <button
              onClick={handleProfileFormOpen}
              className='block text-xl  mt-8 mb-2 px-4 py-2 border border-transparent rounded-md shadow-sm  text-white bg-indigo-600 hover:bg-indigo-700 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Create Your Profile ⏎
            </button>
            <div className='inline-block align-bottom bg-white rounded-lg  overflow-hidden shadow-xl transform transition-all '>
              <div className='bg-yellow-200 px-6 py-8 sm:p-10 sm:pb-8 sm:rounded-lg'>
                <div className='sm:flex sm:items-start'>
                  <div className='sm:w-full sm:text-center'>
                    <h3 className='text-3xl font-bold text-gray-800 mb-4'>
                      {' '}
                      Diet Recommendations!
                    </h3>
                    <p className='text-lg text-gray-700'>
                      Here are some diet recommendations based on your profile.
                      Remember to consult with a nutritionist or a healthcare
                      professional before starting any new diet plan.
                    </p>
                    <div className='mt-6'>
                      <img
                        className='mx-auto'
                        src='/img/dietplan.jpg'
                        alt='Diet Recommendation'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showProfileForm && (
          <div
            className='fixed z-10 inset-0 overflow-y-auto backdrop'
            onClick={handleBackdropClick}
          >
            <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
              <div
                className='fixed inset-0 transition-opacity'
                aria-hidden='true'
              >
                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
              </div>
              <span
                className='hidden sm:inline-block sm:align-middle sm:h-screen'
                aria-hidden='true'
              >
                &#8203;
              </span>
              <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    {/* <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'> */}
                    <UserProfileForm
                      onSubmit={onSubmit}
                      onClose={handleProfileFormClose}
                    />
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
