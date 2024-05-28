import React, { useState } from 'react';
import { MdEdit, MdHome } from 'react-icons/md';
import {
  FaReceipt,
  FaShoppingBasket,
  FaUser,
  FaBell,
  FaTruck,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const purchaseHistory = [
  { icon: <MdHome size={45} />, title: 'Back to Home', route: '/' },
  {
    icon: <FaReceipt size={45} />,
    title: 'Payment History',
  },
  {
    icon: <FaShoppingBasket size={45} />,
    title: 'Shopping Cart',
    route: '/soil/cart',
    selectedTab: 'cart',
  },
  {
    icon: <FaUser size={45} />,
    title: 'Personal Information',
  },
  { icon: <FaBell size={45} />, title: 'Notifications' },
  { icon: <FaTruck size={45} />, title: 'Order Delivery' },
];

const MyPage = () => {
  const { logOut, userData, setUserData, handleDeleteUser, httpClient } =
    useAuth();
  const navigate = useNavigate();
  const [isEdit, setisEdit] = useState(false); // when click edit icon, user can edit info
  const [userEditInfo, setUserEditInfo] = useState({
    user_id: userData?.user_id,
    username: userData?.username,
    email: userData?.email,
    password: userData?.password,
    registration_date: userData?.created_at.split('T')[0],
  }); // user edit info
  const [errorMessage, setErrorMessage] = useState('');

  const userInfo = {
    user_id: userData?.user_id,
    username: userData?.username,
    email: userData?.email,
    password: userData?.password,
    registration_date: userData?.created_at.split('T')[0],
  };
  console.log(userData);
  const handleEditProfile = () => {
    setisEdit(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserEditInfo({
      ...userEditInfo,
      [name]: value,
    });
  };

  const handleEditComplete = async () => {
    if (errorMessage) {
      setErrorMessage('');
    }
    // Check if name, email, and password are not empty
    if (!userEditInfo?.username || !userEditInfo?.password) {
      setErrorMessage('Please fill in all fields.');
    } else if (userEditInfo.password.length < 8) {
      // check the password length
      setErrorMessage('Password must be at least 8 characters long.');
    } else {
      // Users db update
      const res = await httpClient.fetch(
        `/soil/auth/mypage/${userData.user_id}`,
        {
          method: 'POST',
          body: JSON.stringify({
            username: userEditInfo.username,
            email: userEditInfo.email,
            password: userEditInfo.password,
          }),
        }
      );

      if (res.status === 200) {
        // update edited user data to setUserData (a user logged in now)
        setUserData({
          ...userData,
          username: userEditInfo.username,
          // email: userEditInfo.email,
          password: userEditInfo.password,
        });
      } else {
        setErrorMessage(res.message);
      }

      // back to uneditable state
      setisEdit(false);
    }
  };

  const handleNavigate = (item) => {
    if (!item.route) {
      return alert('Service is currently preparing.');
    }
    navigate(item?.route, {
      state: item?.selectedTab ? item?.selectedTab : '',
    });
  };

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  // Account deletion
  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      const res = await httpClient.fetch(`/soil/auth/mypage/${userId}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        handleDeleteUser();
        navigate('/');
      } else {
        throw new Error(res.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('An error occurred while deleting the user:', error);
      throw error;
    }
  };

  return (
    <div className='bg-green-50 min-h-screen py-8'>
      <div className='container mx-auto flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold text-center text-green-800 mb-8'>
          My Page
        </h1>

        <div className='bg-gradient-to-br from-white to-white shadow-md rounded-lg overflow-hidden w-full md:w-96 mb-8 relative border-dashed border-4 border-green-700'>
          <button
            className='absolute top-4 right-4 text-green-700 hover:text-green-500 focus:outline-none'
            onClick={handleEditProfile}
          >
            <MdEdit className='w-6 h-6' />
          </button>
          <div className='px-4 py-6'>
            <div className='flex items-center justify-center'>
              <img
                className='w-36 h-36 object-cover rounded-full border-4 border-green-600'
                src='/img/user_default_icon.png'
                alt='profile'
              />
            </div>
            <div className='text-center mt-4'>
              <h2 className='text-xl font-semibold text-green-800'>
                {isEdit ? (
                  <div className='text-center'>
                    <span className='font-semibold mr-1'>Name :</span>
                    <input
                      className='text-center w-20'
                      name='username'
                      value={userEditInfo?.username}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  userInfo?.username
                )}
              </h2>
              <p className='mt-2 text-sm text-green-700'>
                <span className='font-semibold mr-1'>Email :</span>
                {userInfo?.email}
              </p>

              <p className='mt-2 text-sm text-green-700'>
                <span className='font-semibold mr-1'>Registration Date :</span>
                {userInfo.registration_date}
              </p>

              {isEdit && (
                <p className='mt-2 text-sm text-green-700'>
                  <span className='font-semibold mr-1'>Password :</span>
                  <input
                    name='password'
                    value={userEditInfo.password}
                    onChange={handleInputChange}
                  />
                </p>
              )}

              {isEdit ? (
                <button
                  className='mt-5 mr-2 text-sm border border-green-700 rounded-md px-4 py-2 bg-green-700 text-white transition-colors duration-300 hover:opacity-90'
                  onClick={handleEditComplete}
                >
                  Edit Complete 🙌🏻
                </button>
              ) : (
                <div className='flex justify-center'>
                  <button
                    className='mt-5 mr-2 text-sm border border-green-700 rounded-md px-4 py-2 bg-green-700 text-white transition-colors duration-300 hover:opacity-90'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <button
                    className='mt-5 text-sm border border-green-700 rounded-md px-4 py-2 bg-red-700 text-white transition-colors duration-300 hover:opacity-90'
                    onClick={() => handleDelete(userData.user_id)}
                  >
                    Delete User
                  </button>
                </div>
              )}
            </div>
            {/* Error message */}
            {errorMessage && (
              <p className='text-red-500 text-center'>{errorMessage}</p>
            )}
          </div>
        </div>

        <div className='bg-trnasparent w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {purchaseHistory.map((item, index) => (
              <div
                key={index}
                className='bg-white shadow-md rounded-full overflow-hidden'
              >
                <div
                  onClick={() => handleNavigate(item)}
                  className='p-6 flex justify-center items-center cursor-pointer'
                >
                  <div className='rounded-full bg-green-200 p-4'>
                    {item.icon}
                  </div>
                </div>
                <div className='text-center py-2'>
                  <p className='text-lg font-semibold text-green-800'>
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
