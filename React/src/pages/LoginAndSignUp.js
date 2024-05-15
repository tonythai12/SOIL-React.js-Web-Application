import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import LogIn from '../components/Login/Login';
import SignUp from '../components/Login/Signup';
import { useNavigate } from 'react-router-dom';

function LoginAndSignUp() {
  const navigate = useNavigate();
  const { userListData, logIn, signUp } = useAuth(); // get context value
  const [isLogin, setIsLogin] = useState(true); // check login or sign up UI

  // make new Array for emailList and nameList from userListData
  const userEmailLists = userListData.map((data) => data.email);
  const userNameLists = userListData.map((data) => data.name);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      {/* background Img */}
      <div
        className='absolute inset-0 bg-cover bg-center z-0'
        style={{
          backgroundImage: `url('/img/bg.jpg')`,
          // filter: 'blur(5px)',
        }}
      ></div>
      <div className='relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h1 className='text-3xl font-semibold text-center text-gray-800 mb-8'>
          {isLogin ? 'Welcome back!' : 'Create an Account'}
        </h1>
        <div className='space-y-4'>
          {/* Login Component */}
          <LogIn
            isLogin={isLogin}
            toggleForm={toggleForm}
            userListData={userListData}
            userEmailLists={userEmailLists}
            logIn={logIn}
            isValidEmail={isValidEmail}
          />
          {/* Sign Up Component */}
          <SignUp
            isLogin={isLogin}
            toggleForm={toggleForm}
            userListData={userListData}
            userEmailLists={userEmailLists}
            userNameLists={userNameLists}
            signUp={signUp}
            isValidEmail={isValidEmail}
          />
        </div>
        <p className='mt-4 text-sm text-gray-600 text-center'>
          <button
            onClick={() => navigate('/')}
            className='text-blue-500 hover:text-blue-700  font-semibold focus:outline-none'
          >
            Go Back to home
          </button>
        </p>
      </div>
    </div>
  );
}

// Simple email validation
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default LoginAndSignUp;
