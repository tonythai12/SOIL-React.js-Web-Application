import React from 'react';
import Main from './pages/Main';

const routes = [
  { path: '/', element: <Main /> },

  {
    path: '/',
    element: <Main />,
    // children: [
    //   { path: 'product', element: <Products /> },
    //   { path: 'sale', element: <GardenInfoAndSale /> },
    //   { path: 'dietplan', element: <DietPlan /> },
    //   { path: 'cart', element: <Cart /> },
    //   { path: 'review', element: <Review /> },
    // ],
  },
];

export default routes;
