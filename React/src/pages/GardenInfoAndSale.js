import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthProvider';
import AddCartBtn from '../components/Cart/AddCartBtn';
import { useCart } from '../context/CartProvider';
import Modal from '../components/Cart/Modal';
import { useProduct } from '../context/ProductProvider';

// Component displaying helpful information for growing small vegetables.
function SmallVegetableInfo({ tip, imageUrl }) {
  console.log(tip && tip);
  return (
    <div className='py-12 bg-gray-100'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-green-600'>
          🌱 Vegetable Gardening Tips 🌱
        </h2>
        <div className='mt-6 bg-white shadow-md rounded-md p-6 flex items-center'>
          <img src={imageUrl} alt='Tip' className='w-1/4 mr-6' />
          <p className='text-lg text-gray-700 flex-1'>{tip}</p>
        </div>
      </div>
    </div>
  );
}

// Component displaying special deals based on the selected vegetable
function SpecialSale({ specials, userData }) {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState();

  const handleAddToCart = async (productId) => {
    const product = specials.filter(
      (special) => special.product_id === productId
    )[0];

    if (!userData?.email) {
      return alert(
        `We need a login feature.\nAfter logging in, you can add items to your shopping cart.`
      );
    } else {
      setSelectedProduct(product);
      const res = await addToCart(product);

      setStatus(res?.status);
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };
  return (
    <div className='py-12 bg-white'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
          🔥 Special Sale Items 🔥
        </h2>
        <div className='mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {specials.map((item, index) => (
            <div className='flex flex-col'>
              <div key={index} className='group relative mb-3'>
                <div className='w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='w-full h-full object-center object-cover lg:w-full lg:h-full'
                  />
                </div>
                <div className='mt-4 flex justify-between'>
                  <div>
                    <h3 className='text-sm text-gray-700'>{item.name}</h3>
                    <p className='mt-1 text-sm text-gray-500 line-through'>
                      {`$${item.price}`}
                    </p>
                    <p className='mt-1 text-sm text-red-600'>{`$${item.salePrice}`}</p>
                  </div>
                </div>
              </div>

              <AddCartBtn onClick={() => handleAddToCart(item.product_id)} />
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <Modal
          isOpen2={isOpen}
          setIsOpen2={setIsOpen}
          status={status}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}

export default function GardenInfoAndSale() {
  const { userData, setUserData, httpClient } = useAuth();
  const { saleProducts } = useProduct();
  const [selectedVegetable, setSelectedVegetable] = useState('Tomatoes');
  const [showModal, setShowModal] = useState(false);
  const [vegetablesInfo, setVegetablesInfo] = useState({});

  const getPreference = async () => {
    const res = await httpClient.fetch(`/soil/sale/${userData?.user_id}`, {
      method: 'GET',
    });
    console.log(res.status);
    if (res.status === 200) {
      if (!res.data[0]?.product_name) {
        setSelectedVegetable('Tomatoes');
      } else {
        setSelectedVegetable(res.data[0]?.product_name);
      }
    } else {
      setSelectedVegetable('Tomatoes');
    }
  };

  useEffect(() => {
    if (saleProducts) {
      setVegetablesInfo(saleProducts);
    }
    console.log(selectedVegetable);
    getPreference();
  }, [saleProducts, userData]);

  const handleVegetableSelect = async (vegetable) => {
    setSelectedVegetable(vegetable);
    setShowModal(false);
  };

  const handleShowModal = () => {
    if (!userData?.email) {
      return alert('Member Exclusive Button. Please use after logging in');
    }
    setShowModal(true);
  };

  const handlePreferenceSelect = async (preference) => {
    const res = await httpClient.fetch(`/soil/sale/${userData.user_id}`, {
      method: 'POST',
      body: JSON.stringify({
        product_name: preference,
      }),
    });
    if (res.status === 201) {
      setSelectedVegetable(preference);
      setUserData({ ...userData, preference: preference });
      setShowModal(false);
    }
  };

  console.log(vegetablesInfo[selectedVegetable]);
  return (
    <div>
      <div className='py-12 bg-blue-50'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
              🌱 Select a Vegetable to Grow 🌱
            </h2>
            <button
              onClick={handleShowModal}
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out'
            >
              <svg
                className='-ml-1 mr-2 h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path fillRule='evenodd' d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                <path
                  fillRule='evenodd'
                  d='M17.6 12a7.5 7.5 0 10-15 0h15zM4 12a4 4 0 118 0 4 4 0 01-8 0z'
                />
              </svg>
              Choose your preference
            </button>
          </div>
          <div className='mt-6 relative'>
            <div className='grid grid-cols-3 gap-4'>
              {Object.keys(vegetablesInfo).map((vegetable, index) => (
                <button
                  key={index}
                  onClick={() => handleVegetableSelect(vegetable)}
                  className={`flex items-center justify-center px-4 py-3 border border-green-600 rounded-md shadow-sm text-lg font-medium text-green-600 bg-white hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out ${
                    vegetable === selectedVegetable
                      ? 'bg-green-500'
                      : 'bg-white'
                  }`}
                >
                  {vegetable}
                  {vegetable === selectedVegetable && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className='ml-2 text-green-500'
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedVegetable && vegetablesInfo[selectedVegetable] && (
        <>
          <SmallVegetableInfo
            tip={vegetablesInfo[selectedVegetable]?.tips}
            imageUrl={vegetablesInfo[selectedVegetable]?.imageUrl}
          />
          <SpecialSale
            specials={vegetablesInfo[selectedVegetable]?.specials}
            userData={userData}
          />
        </>
      )}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 pt-4 rounded-lg'>
            <div className='flex justify-end'>
              <button
                onClick={() => setShowModal(false)}
                className='text-gray-700 hover:text-gray-900'
              >
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <h2 className='text-2xl font-semibold mb-4'>
              Choose Your Preference
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {Object.keys(vegetablesInfo).map((vegetable, index) => (
                <button
                  key={index}
                  onClick={() => handlePreferenceSelect(vegetable)}
                  className={`flex items-center justify-center px-4 py-3 border border-green-600 rounded-md shadow-sm text-lg font-medium text-green-600 bg-white hover:bg-green-200 ${
                    vegetable === selectedVegetable
                      ? 'bg-green-200'
                      : 'bg-white'
                  }`}
                >
                  {vegetable}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
