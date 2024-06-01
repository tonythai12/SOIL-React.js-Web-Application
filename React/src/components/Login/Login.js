import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthProvider';

export default function LogIn({ isLogin, toggleForm, logIn }) {
  const { httpClient, tokenStorage } = useAuth();
  const [rememberMe, setRememberMe] = useState(false); // State to remember login
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        handleLogin(values);
      }, 400);
    },
  });

  // Remember email & password if 'remember me' is checked after logout.
  useEffect(() => {
    const storedEmail = localStorage.getItem('emailForRememberMe');
    // const storedPassword = localStorage.getItem('pwForRememberMe');
    if (storedEmail) {
      setRememberMe(true);
      formik.setValues({ email: storedEmail });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (values) => {
    const { email, password } = values;

    const res = await httpClient.fetch('/soil/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status === 401) {
      return alert(res.message);
    } else if (res.status === 204) {
      return alert('Your account has been blocked');
    } else {
      // if email, password is passed.
      if (rememberMe) {
        localStorage.setItem('emailForRememberMe', email);
      } else {
        localStorage.removeItem('emailForRememberMe');
      }

      logIn({
        user_id: res.data?.user_id,
        username: res.data?.username,
        email: res.data.email,
        created_at: res.data.created_at,
        preference: res.data.preference,
        dietPlan: res.data.dietPlan,
      });

      // save token in localStorage.
      tokenStorage.saveToken(res.data.token);
      alert('Login successful');
      navigate(`/soil/${res.data.email}`);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`space-y-4 ${isLogin ? 'block' : 'hidden'}`}
      id='login-form'
    >
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full h-10 px-3 bg-gray-200 rounded-md ${
          formik.touched.email && formik.errors.email && 'border-red-500'
        }`}
      />
      {formik.touched.email && formik.errors.email && (
        <p className='text-red-500'>{formik.errors.email}</p>
      )}
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`w-full h-10 px-3 bg-gray-200 rounded-md ${
          formik.touched.password && formik.errors.password && 'border-red-500'
        }`}
      />
      {formik.touched.password && formik.errors.password && (
        <p className='text-red-500'>{formik.errors.password}</p>
      )}
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          id='remember'
          className='w-4 h-4'
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor='remember' className='text-sm text-gray-600'>
          remember me
        </label>
      </div>
      <input
        type='submit'
        className='w-full py-2 text-white bg-green-600 rounded-md cursor-pointer'
        id='login_btn'
        value='Login'
      />
      {/* Submit button */}
      <button
        type='button'
        className='w-full py-2 text-white bg-purple-600 rounded-md cursor-pointer'
        id='signup_btn'
        onClick={toggleForm}
      >
        Sign Up
      </button>
    </form>
  );
}
