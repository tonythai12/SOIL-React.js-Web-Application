import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FaAddressBook,
  FaAppleAlt,
  FaCarrot,
  FaShoppingCart,
  FaUser,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';
import Slider from '../components/Slider';
import { useCart } from '../context/CartProvider';

const tabs = [
  {
    label: 'Products',
    icon: <FaAppleAlt />,
    value: 'product',
    route: '/soil/product',
  },
  {
    label: 'Diet Plan',
    icon: <FaCarrot />,
    value: 'dietplan',
    route: '/soil/dietplan',
  },
  {
    label: 'Cart',
    icon: <FaShoppingCart />,
    value: 'cart',
    route: '/soil/cart',
  },
  {
    label: 'Review',
    icon: <FaAddressBook />,
    value: 'review',
    route: '/soil/review',
  },
];

function Main() {
  // navigate
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  // get Auth Context
  const { userData } = useAuth();
  const { cartProducts } = useCart();

  // change selected tab color
  const [selectedTab, setSelectedTab] = useState();

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Hero Section */}
      <div className='bg-green-700 text-white text-center p-12'>
        <h1
          onClick={() => {
            setSelectedTab('');
            navigate('/');
          }}
          className='text-5xl font-bold mb-4 cursor-pointer'
        >
          <span className='text-yellow-500'>SOIL</span> : Fresh to Your Door
        </h1>
        <p className='text-xl'>
          Discover the best in fresh produce and healthy eating.
        </p>
        <button
          onClick={() => {
            setSelectedTab('product');
            navigate('/soil/product');
          }}
          className='mt-6 px-6 py-3 bg-white text-green-700 font-semibold rounded hover:bg-gray-200 transition duration-300'
        >
          Shop Now
        </button>
      </div>

      {/* Navigation */}
      <nav className='flex justify-center space-x-14  p-4 bg-white shadow-lg py-6'>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setSelectedTab(tab.value);
              navigate(tab?.route);
            }}
            className={`relative flex items-center gap-2 text-xl font-semibold text-green-700 border hover:text-white hover:bg-green-500 transition-colors duration-300 rounded-lg px-4 py-2 ${
              selectedTab === tab.value || tab.value === state
                ? 'bg-green-500 text-white'
                : ''
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.value === 'cart' && (
              <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 border text-white bg-orange-400 rounded-full w-7 h-7 text-md'>
                {cartProducts?.length > 0 ? cartProducts?.length : 0}
              </span>
            )}
          </button>
        ))}
        {/* if it is logged in , login tab will be changed to persnal info */}
        {userData?.email ? (
          <button
            onClick={() => navigate(`/soil/${userData?.email}`)}
            className='flex items-center gap-2 text-xl font-semibold text-green-700 hover:text-white hover:bg-green-500 transition-colors duration-300 rounded-lg px-4 py-2'
          >
            <FaUser />
            {`Hi ${userData?.username}! 🥰`}
          </button>
        ) : (
          <button
            onClick={() => navigate('/soil/login')}
            className='flex items-center gap-2 text-xl font-semibold text-green-700 hover:text-white hover:bg-green-500 transition-colors duration-300 rounded-lg px-4 py-2'
          >
            <FaUser />
            Login/Sign in
          </button>
        )}
      </nav>
      {/* Outlet for child routes */}
      <Outlet />
      {/* Main Image Slider */}
      {window.location.pathname === '/' && (
        <div className='flex flex-col justify-center items-center w-full pt-2 pb-2'>
          <Slider />
        </div>
      )}

      {/* Footer */}
      <footer className='mt-auto bg-gray-100 p-4 text-center'>
        SOIL © 2024
      </footer>
    </div>
  );
}

export default Main;
