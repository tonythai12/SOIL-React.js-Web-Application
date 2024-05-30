import React from 'react';

function Bill({ setIsCheckout, cartItems, totalCost, setCartProducts }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto'>
      <div className='fixed inset-0 bg-black opacity-75'></div>
      <div className='relative bg-white rounded-lg p-8 shadow-lg '>
        <div className='flex justify-between items-center mb-6  bg-green-400 p-5 rounded-md'>
          <h2 className='text-xl font-semibold'>Payment 💰</h2>
          <button
            className='text-gray-500 hover:text-gray-800'
            onClick={() => {
              alert('Payment Canceled');
              setIsCheckout(false);
            }}
          >
            X
          </button>
        </div>
        <div className='mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Items</h3>
          <ul className='divide-y divide-gray-200'>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className='py-4 flex items-center justify-between'
              >
                <div className='flex items-center'>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='w-12 h-12 rounded-full object-cover mr-4'
                  />
                  <div>
                    <p className='text-lg font-semibold'>{item.name}</p>
                    <p className='text-sm text-gray-500 pt-5'>
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className='text-md font-semibold'>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className='mb-6'>
          <h3 className='text-lg font-semibold'>Total Cost</h3>
          <p className='text-xl font-semibold text-green-500'>
            ${totalCost.toFixed(2)}
          </p>
        </div>
        <div className='flex justify-center'>
          <button
            onClick={() => {
              alert('Payment Successful!');
              setIsCheckout(false);
              setCartProducts([]);
            }}
            className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300'
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bill;
