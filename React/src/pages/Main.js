import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaAppleAlt,
  FaCarrot,
  FaSeedling,
  FaShoppingCart,
  FaUser,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';
import Slider from '../components/Slider';
import Products from './Products';
import GardenInfoAndSale from './GardenInfoAndSale';
import Cart from './Cart';
import DietPlan from './DietPlan';

const tabs = [
  {
    label: 'Products',
    icon: <FaAppleAlt />,
    value: 'product',
    // route: '/soil/product',
  },
  {
    label: 'Special Sale',
    icon: <FaSeedling />,
    value: 'sale',
    // route: '/soil/sale',
  },
  {
    label: 'Diet Plan',
    icon: <FaCarrot />,
    value: 'plan',
    // route: '/soil/plan',
  },
  {
    label: 'Cart',
    icon: <FaShoppingCart />,
    value: 'cart',
    // route: '/soil/cart',
  },
];

function Main() {
  // navigate
  const navigate = useNavigate();
  const location = useLocation();

  // get Auth Context
  const { userData, savePreference, saveDietProfile } = useAuth();

  // get info
  const userEmail = userData?.email;
  const userCartStorage = userEmail ? localStorage.getItem(userEmail) : null;

  // state
  const [cartProducts, setCartProducts] = useState(
    userCartStorage ? { [userEmail]: JSON.parse(userCartStorage) } : {}
  ); // The list of items in the shopping cart with user email
  const [products, setProducts] = useState();
  const [selectedTab, setSelectedTab] = useState('');

  useEffect(() => {
    // get products list from product.json
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error('An error occurred while loading the data.', error)
      );
  }, []);

  // when navigate from my page, set the selectedTab with state.
  useEffect(() => {
    const selectedTab = location?.state;
    selectedTab && setSelectedTab(selectedTab);
  }, [location?.state]);

  // add products to cart.
  const addToCart = (product) => {
    const userEmail = userData.email;
    const parsedCartStorage =
      userEmail && userCartStorage ? JSON.parse(userCartStorage) : [];

    let updatedCartProducts;

    // Check if there is an existing product with the same ID
    const existingProductIndex = parsedCartStorage.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // If the same product exists, increase the quantity
      updatedCartProducts = [...parsedCartStorage];
      updatedCartProducts[existingProductIndex].quantity += 1;
    } else {
      // If the same product doesn't exist, add a new product
      updatedCartProducts = [...parsedCartStorage, { ...product, quantity: 1 }];
    }

    setCartProducts((prevCartProducts) => {
      localStorage.setItem(userEmail, JSON.stringify(updatedCartProducts));
      return { ...prevCartProducts, [userEmail]: updatedCartProducts };
    });
  };

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Hero Section */}
      <div className='bg-green-700 text-white text-center p-12'>
        <h1
          onClick={() => setSelectedTab('')}
          className='text-5xl font-bold mb-4 cursor-pointer'
        >
          <span className='text-yellow-500'>SOIL</span> : Fresh to Your Door
        </h1>
        <p className='text-xl'>
          Discover the best in fresh produce and healthy eating.
        </p>
        <button
          onClick={() => setSelectedTab('product')}
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
            }}
            className={`relative flex items-center gap-2 text-xl font-semibold text-green-700 border hover:text-white hover:bg-green-500 transition-colors duration-300 rounded-lg px-4 py-2 ${
              selectedTab === tab.value ? 'bg-green-500 text-white' : ''
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.value === 'cart' && (
              <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 border text-white bg-orange-400 rounded-full w-7 h-7 text-md'>
                {JSON.parse(userCartStorage)?.length > 0
                  ? JSON.parse(userCartStorage)?.length
                  : 0}
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
            {`Hi ${userData?.name}! 🥰`}
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
      {/* <Outlet /> */}
      {selectedTab === '' && (
        <div className='flex flex-col justify-center items-center w-full pt-2 pb-2'>
          {/* <img src={'/img/corn.png'} alt={'corn'} /> */}
          <Slider />
        </div>
      )}
      {/* Contents */}
      {selectedTab === 'product' && (
        <Products
          products={products}
          addToCart={addToCart}
          userData={userData}
        />
      )}
      {selectedTab === 'sale' && (
        <GardenInfoAndSale
          products={products}
          userData={userData}
          savePreference={savePreference}
        />
      )}
      {selectedTab === 'plan' && (
        <DietPlan userData={userData} saveDietProfile={saveDietProfile} />
      )}
      {selectedTab === 'cart' && (
        <Cart
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          userData={userData}
        />
      )}
      {/* Footer */}
      <footer className='mt-auto bg-gray-100 p-4 text-center'>
        SOIL © 2024
      </footer>
    </div>
  );
}

export default Main;
