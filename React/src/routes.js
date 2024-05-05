import React from 'react';
import Main from './pages/Main';
// import Cart from './pages/Cart';
// import DietPlan from './pages/DietPlan';
// import Products from './pages/Products';
// import SpecialSale from './pages/SpecialSale';
import LoginAndSignUp from './pages/LoginAndSignUp';
import MyPage from './pages/MyPage';

const routes = [
  { path: '/', element: <Main /> },

  {
    path: '/soil',
    element: <Main />,
    // children: [
    //   { path: 'product', element: <Products /> },
    //   { path: 'sale', element: <SpecialSale /> },
    //   { path: 'plan', element: <DietPlan /> },
    //   { path: 'cart', element: <Cart /> },
    // ],
  },
  { path: '/soil/:id', element: <MyPage /> },
  { path: '/soil/login', element: <LoginAndSignUp /> },
];

export default routes;
