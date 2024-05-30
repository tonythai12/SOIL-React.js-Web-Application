import React from 'react';
import Main from './pages/Main';
import Users from './pages/Users';
import Products from './pages/Products';
import Reviews from './pages/Reviews';

const routes = [
  { path: '/', element: <Main /> },

  {
    path: '/admin',
    element: <Main />,
    children: [
      { path: 'user', element: <Users /> },
      { path: 'product', element: <Products /> },
      { path: 'review', element: <Reviews /> },
    ],
  },
];

export default routes;
