import React from 'react';
import Main from './pages/Main';
import LoginAndSignUp from './pages/LoginAndSignUp';
import MyPage from './pages/MyPage';
import DietPlan from './pages/DietPlan';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Review from './pages/Review';

const routes = [
  { path: '/', element: <Main /> },

  {
    path: '/soil',
    element: <Main />,
    children: [
      { path: 'product', element: <Products /> },
      { path: 'dietplan', element: <DietPlan /> },
      { path: 'cart', element: <Cart /> },
      { path: 'review', element: <Review /> },
    ],
  },
  { path: '/soil/:id', element: <MyPage /> },
  { path: '/soil/login', element: <LoginAndSignUp /> },
];

export default routes;
