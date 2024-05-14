import React from 'react';

function Modal({ isOpen2, setIsOpen2, selectedProduct }) {
  if (!isOpen2) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-8 rounded-md shadow-md'>
        <p className='text-xl text-center font-semibold pt-3 pr-2 pl-2'>
          {selectedProduct.name}
        </p>
        <p className='text-xl text-center text-green-800 pb-3'>
          has been added to the cart.🧺
        </p>
        <button
          className='mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300'
          onClick={() => setIsOpen2(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
