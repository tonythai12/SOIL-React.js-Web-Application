import React, { useState } from 'react';
import { FaTrashAlt, FaMinus, FaPlus } from 'react-icons/fa';
import Bill from '../components/Cart/Bill';
import { useAuth } from '../context/AuthProvider';
import { useCart } from '../context/CartProvider';

export default function Cart() {
  const { userData, httpClient } = useAuth();
  const { cartProducts, setCartProducts, updateQuantity, removeItem } =
    useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  const totalCost =
    cartProducts &&
    cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

  return (
    <div className='container mx-auto p-6'>
      {!userData?.email || (cartProducts && cartProducts.length === 0) ? (
        <div className='flex items-center justify-center h-full mt-40'>
          <p className='text-2xl text-gray-600 font-semibold'>
            No Products Added
          </p>
        </div>
      ) : (
        <div>
          <div className='flex flex-col gap-6 '>
            {cartProducts &&
              cartProducts.map((item) => (
                <div
                  key={item.product_id}
                  className='flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:bg-gray-200 hover:scale-100 transform transition-all duration-150 ease-in-out cursor-pointer'
                >
                  <div className='flex items-center gap-4'>
                    <img
                      src={item.image_url}
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
                      onClick={() =>
                        updateQuantity(item.cart_id, item.product_id, -1)
                      }
                      className='text-gray-600 hover:text-gray-900'
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.cart_id, item.product_id, 1)
                      }
                      className='text-gray-600 hover:text-gray-900'
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => removeItem(item.cart_id, item.product_id)}
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
              Total Cost: ${totalCost && totalCost.toFixed(2)}
            </p>
            <button
              onClick={() => setIsCheckout(true)}
              className='mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300'
            >
              Checkout
            </button>
          </div>
          {isCheckout && (
            <Bill
              userId={userData?.user_id}
              httpClient={httpClient}
              setIsCheckout={setIsCheckout}
              cartItems={cartProducts}
              totalCost={totalCost}
              setCartProducts={setCartProducts}
            />
          )}
        </div>
      )}
    </div>
  );
}
