import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function LogIn({
  isLogin,
  toggleForm,
  userListData,
  userEmailLists,
  logIn,
  isValidEmail,
}) {
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
    const storedPassword = localStorage.getItem('pwForRememberMe');
    if (storedEmail && storedPassword) {
      setRememberMe(true);
      formik.setValues({ email: storedEmail, password: storedPassword });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (values) => {
    const { email, password } = values;
    const correctPassword = userListData.find(
      (user) => user.email === email
    )?.password;

    if (!userEmailLists.includes(email)) {
      formik.setFieldError('email', 'User does not exist');
    } else if (correctPassword !== password) {
      formik.setFieldError('password', 'Incorrect password');
    } else {
      if (rememberMe) {
        localStorage.setItem('emailForRememberMe', email);
        localStorage.setItem('pwForRememberMe', password);
      } else {
        localStorage.removeItem('emailForRememberMe');
        localStorage.removeItem('pwForRememberMe');
      }

      const user = userListData.find((user) => user.email === email);
      console.log(user);
      logIn({
        name: user.name,
        email: email,
        password: password,
        date: user.date,
        preference: user?.preference,
        dietProfile: user?.dietProfile,
        dietPlan: user?.dietPlan,
        imgUrl: user?.imgUrl,
      });

      alert('Login successful');
      navigate(`/soil/${email}`);
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
