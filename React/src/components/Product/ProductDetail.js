import React from 'react';

export default function ProductDetail({ isOpen, setIsOpen, product }) {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75' />
            </div>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            ></span>
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              {/* Header */}
              <div className='px-4 py-2 bg-green-500 text-white'>
                <h3 className='text-lg leading-6 font-medium'>
                  {product.name}
                </h3>
              </div>
              <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    {/* Product Image Slideshow */}
                    <div className='w-full h-auto'>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className='w-full h-auto'
                      />
                    </div>
                    <div className='text-gray-600 mb-2 pt-2'>
                      {/* <p className='font-bold'>{product.name}</p> */}
                      <p className='font-bold'>{product.desc}</p>
                      Price: <span className='font-bold'>{product.price}</span>
                    </div>
                    {/* Additional Information */}
                    <div className='text-gray-700 mb-4'></div>
                  </div>
                </div>
              </div>
              {/* Close Button */}
              <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  onClick={closeModal}
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
