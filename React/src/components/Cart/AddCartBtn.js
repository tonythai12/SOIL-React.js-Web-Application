import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

export default function AddCartBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className='flex items-center justify-center bg-white text-green-500 py-2 px-4 rounded-lg hover:bg-green-100 transition duration-300 flex-grow border border-green-500'
    >
      <FaShoppingCart />
      <span className='ml-2'>Add to Cart</span>
    </button>
  );
}
