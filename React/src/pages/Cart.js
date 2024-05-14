import React, { useState } from 'react';
import { FaTrashAlt, FaMinus, FaPlus } from 'react-icons/fa';
import Bill from '../components/Cart/Bill';
import { useAuth } from '../context/AuthProvider';
import { useCart } from '../context/CartProvider';

export default function Cart() {
  const { userData } = useAuth();
  const { cartProducts, setCartProducts } = useCart();

  const userEmail = userData?.email;
  const userCartStorage = userEmail ? localStorage.getItem(userEmail) : null;
  const [isCheckout, setIsCheckout] = useState(false);
  const [cartItems, setCartItems] = useState(
    userCartStorage
      ? JSON.parse(userCartStorage)
      : cartProducts[userEmail]
      ? cartProducts[userEmail]
      : []
  );

  const updateQuantity = (id, delta) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    // update quantity in Cart component UI
    setCartItems([...updatedCartItems]);
    // update quantity in real cart item list info
    setCartProducts((prevCartProducts) => {
      localStorage.setItem(userEmail, JSON.stringify(updatedCartItems));
      return { ...prevCartProducts, [userEmail]: [...updatedCartItems] };
    });
  };

  console.log(`cartProducts => ${JSON.stringify(cartProducts)}`);
  console.log(`cartItems => ${JSON.stringify(cartProducts)}`);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setCartProducts(
      userCartStorage
        ? { [userEmail]: cartItems.filter((item) => item.id !== id) }
        : {}
    );
    localStorage.setItem(
      userEmail,
      JSON.stringify(cartItems.filter((item) => item.id !== id))
    );
  };

  const handleCheckOut = () => {
    setCartItems([]);
    setCartProducts({});
    localStorage.removeItem(userEmail);
  };

  const totalCost = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleCheckout = () => {
    setIsCheckout(true);
  };
  return (
    <div className='container mx-auto p-6'>
      {!userData?.email || Object.values(cartItems).length === 0 ? (
        <div className='flex items-center justify-center h-full mt-40'>
          <p className='text-2xl text-gray-600 font-semibold'>
            No Products Added
          </p>
        </div>
      ) : (
        <div>
          <div className='flex flex-col gap-6 '>
            {Object.values(cartItems).map((item) => (
              <div
                key={item.id}
                className='flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:bg-gray-200 hover:scale-100 transform transition-all duration-150 ease-in-out cursor-pointer'
              >
                <div className='flex items-center gap-4'>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='w-20 h-20 rounded-full object-cover'
                  />
                  <div>
                    <h3 className='text-lg font-semibold'>{item.name}</h3>
                    <p className='text-sm text-gray-600'>${item.price}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className='text-gray-600 hover:text-gray-900'
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className='text-gray-600 hover:text-gray-900'
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-6 bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-lg font-semibold'>Summary</h2>
            <p className='text-sm text-gray-600'>
              Total Cost: ${totalCost.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className='mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300'
            >
              Checkout
            </button>
          </div>
          {isCheckout && (
            <Bill
              setIsCheckout={setIsCheckout}
              cartItems={Object.values(cartItems)}
              totalCost={totalCost}
              handleCheckOut={handleCheckOut}
            />
          )}
        </div>
      )}
    </div>
  );
}
