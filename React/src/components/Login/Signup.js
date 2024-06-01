import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthProvider';

export default function SignUp({ isLogin, toggleForm }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { httpClient, tokenStorage } = useAuth();

  // Yup Schema definition.
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Invalid email address'
      )
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });

  // Validation using formik
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      password2: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, email, password, password2 } = values;

      if (!password2) {
        return alert('Please confirm your password');
      }

      if (password !== password2) {
        return alert('Passwords do not match. Please try again');
      }
      try {
        const res = await httpClient.fetch('/soil/auth/signup', {
          method: 'POST',
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        if (res.status === 201) {
          alert('Sign up successful');
          // save token in localStorage.
          tokenStorage.saveToken(res.data.token);
          navigate('/');
        } else {
          setErrorMessage(res.message);
        }
      } catch (error) {
        console.error('Error during sign up:', error);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`space-y-4 ${isLogin ? 'hidden' : 'block'}`}
    >
      <input
        type='text'
        name='username'
        placeholder='Name'
        className='w-full h-10 px-3 bg-gray-200 rounded-md'
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.username && formik.errors.username && (
        <p className='text-red-500'>{formik.errors.username}</p>
      )}
      <input
        type='email'
        name='email'
        placeholder='Email'
        className='w-full h-10 px-3 bg-gray-200 rounded-md'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && (
        <p className='text-red-500'>{formik.errors.email}</p>
      )}
      <input
        type='password'
        name='password'
        placeholder='Password'
        className='w-full h-10 px-3 bg-gray-200 rounded-md'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password && formik.errors.password && (
        <p className='text-red-500'>{formik.errors.password}</p>
      )}
      <input
        type='password'
        name='password2'
        placeholder='Confirm Password'
        className='w-full h-10 px-3 bg-gray-200 rounded-md'
        value={formik.values.password2}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password2 && formik.errors.password2 && (
        <p className='text-red-500'>{formik.errors.password2}</p>
      )}
      {/* Error message */}
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <input
        type='submit'
        className='w-full py-2 text-white bg-purple-500 rounded-md cursor-pointer'
        value='Sign Up'
      />
      <button
        type='button'
        className='w-full py-2 text-white bg-blue-600 rounded-md cursor-pointer'
        onClick={toggleForm}
      >
        Back to Login
      </button>
    </form>
  );
}
