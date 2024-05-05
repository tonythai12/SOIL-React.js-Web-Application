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
    route: '/',
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
  const {
    logOut,
    userData,
    userListData,
    handleDeleteUser,
    setUserData,
    setUserListData,
  } = useAuth();
  const navigate = useNavigate();
  const [isEdit, setisEdit] = useState(false); // when click edit icon, user can edit info
  const [userEditInfo, setUserEditInfo] = useState({
    name: userData?.name,
    email: userData?.email,
    address: userData?.address,
    password: userData?.password,
    registration_date: userData?.date,
  }); // user edit info
  const [errorMessage, setErrorMessage] = useState('');

  const userInfo = {
    name: userData?.name,
    email: userData?.email,
    address: userData?.address || 'Spenser st, Melbourne, Australia',
    password: userData?.password,
    registration_date: userData?.date,
  };

  const userNameLists = userListData.map((data) => data.name);

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

  const handleEditComplete = () => {
    if (errorMessage) {
      setErrorMessage('');
    }
    // Check if name, email, and password are not empty
    if (!userEditInfo?.name || !userEditInfo?.password) {
      setErrorMessage('Please fill in all fields.');
    } else if (userEditInfo.password.length < 8) {
      // check the password length
      setErrorMessage('Password must be at least 8 characters long.');
    } // check Email duplication
    else if (userNameLists.includes(userEditInfo?.name)) {
      alert('This name is already in use.');
    } else {
      // update edited user data to setUserData (a user logged in now)
      setUserData({
        ...userData,
        name: userEditInfo.name,
        // email: userEditInfo.email,
        address: userEditInfo.address,
        password: userEditInfo.password,
      });

      // update edited user data to localStorage.
      localStorage.setItem('loginName', userEditInfo.name);
      // localStorage.setItem('loginEmail', userEditInfo.email);
      localStorage.setItem('address', userEditInfo.address);
      localStorage.setItem('loginPW', userEditInfo.password);

      // updated edited user data to userListData(All user data list).
      const updated = userListData.map((data) => {
        if (data.email === userData.email) {
          return {
            ...data,
            name: userData.name,
            address: userData.address,
            password: userData.password,
          };
        } else {
          return data;
        }
      });
      setUserListData([...updated]);
      alert('Successfully modified!');
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
                src={userInfo.imgUrl ? userInfo.imgUrl : '/img/wonbin.jpeg'}
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
                      name='name'
                      value={userEditInfo.name}
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  userInfo.name
                )}
              </h2>
              <p className='mt-2 text-sm text-green-700'>
                <span className='font-semibold mr-1'>Email :</span>
                {userInfo?.email}
              </p>
              <p className='mt-2 text-sm text-green-700'>
                {' '}
                <span className='font-semibold mr-1'>Address :</span>
                {isEdit ? (
                  <input
                    name='address'
                    value={
                      !userEditInfo.address
                        ? 'Spenser st, Melbourne, Australia'
                        : userEditInfo.address
                    }
                    onChange={handleInputChange}
                  />
                ) : (
                  userInfo?.address || 'Spenser st, Melbourne, Australia'
                )}
              </p>
              <p className='mt-2 text-sm text-green-700'>
                <span className='font-semibold mr-1'>Registration Date :</span>
                {userInfo.registration_date}
              </p>
              <p className='mt-2 text-sm text-green-700'>
                <span className='font-semibold mr-1'>Password :</span>
                {isEdit ? (
                  <input
                    name='password'
                    value={userEditInfo.password}
                    onChange={handleInputChange}
                  />
                ) : (
                  userInfo.password
                )}
              </p>
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
                    onClick={() => handleDeleteUser(userData)}
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
