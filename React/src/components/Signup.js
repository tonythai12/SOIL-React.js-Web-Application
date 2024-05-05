import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignUp({
  isLogin,
  toggleForm,
  userEmailLists,
  userNameLists,
  signUp,
  isValidEmail,
}) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  // Yup Schema definition.
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
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
    // imgUrl: Yup.string().url('Invalid URL format'),
  });

  // Validation using formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      imgUrl: '',
    },
    validationSchema,

    onSubmit: async (values) => {
      const currentTimeInMillis = Date.now();
      const currentDate = new Date(currentTimeInMillis);

      // Check Email duplication
      if (userEmailLists.includes(values.email)) {
        setErrorMessage('This email is already in use.');
        return;
      }

      // Check Name duplication
      if (userNameLists.includes(values.name)) {
        setErrorMessage('This name is already in use.');
        return;
      }

      // Proceed with sign up if all fields are valid
      signUp({ ...values, date: currentDate.toISOString().split('T')[0] });
      alert('Sign up successful');
      navigate('/');
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`space-y-4 ${isLogin ? 'hidden' : 'block'}`}
    >
      <input
        type='text'
        name='name'
        placeholder='Name'
        className='w-full h-10 px-3 bg-gray-200 rounded-md'
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name && (
        <p className='text-red-500'>{formik.errors.name}</p>
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
      {/* ImgUrl */}
      {formik.touched.password && formik.errors.password && (
        <p className='text-red-500'>{formik.errors.password}</p>
      )}
      <input
        type='text'
        name='imgUrl'
        placeholder='Image URL'
        className='w-full h-10 px-3 bg-gray-200 rounded-md'
        value={formik.values.imgUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.imgUrl && formik.errors.imgUrl && (
        <p className='text-red-500'>{formik.errors.imgUrl}</p>
      )}
      {/* Error message */}
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <input
        type='submit'
        className='w-full py-2 text-white bg-purple-500 rounded-md cursor-pointer'
        value='Sign Up'
      />
      <button
        className='w-full py-2 text-white bg-blue-600 rounded-md cursor-pointer'
        onClick={toggleForm}
      >
        Back to Login
      </button>
    </form>
  );
}
