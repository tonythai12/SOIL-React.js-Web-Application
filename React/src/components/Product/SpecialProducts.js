import React from 'react';
import AddCartBtn from '../Cart/AddCartBtn';

// Component displaying special deals based on the selected vegetable
export function SpecialProducts({
  specialProducts,
  selectedProduct,
  setSelectedProduct,
  handleAddToCart,
  showReviewDetail,
  handleCloseDetail,
  setIsOpen,
  isOpen,
}) {
  return (
    <div className='py-12 bg-white z-0'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
          🔥 Special Products 🔥
        </h2>
        <div className='mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {specialProducts.map((item, index) => (
            <div className='flex flex-col'>
              <div key={index} className='group relative mb-3'>
                <div className='w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
                  <img
                    onClick={() => {
                      setSelectedProduct(item);
                      setIsOpen(true);
                    }}
                    src={item.imageUrl}
                    alt={item.name}
                    className='w-full h-full object-center object-cover lg:w-full lg:h-full'
                  />
                </div>
                <div className='mt-4 flex justify-between'>
                  <div>
                    <h3 className='text-sm text-gray-700'>{item.name}</h3>
                    <div className='flex'>
                      <p className='mt-1  text-sm text-gray-500 line-through'>
                        {`$${item.price}`}
                      </p>
                      <p className='mt-1 text-sm text-red-600 ml-2'>{`$${item.salePrice}`}</p>
                    </div>
                    <p
                      onClick={() => {
                        setSelectedProduct(item);
                        showReviewDetail(item);
                      }}
                      className='text-yellow-700 cursor-pointer border border-yellow-300 bg-yellow-100 rounded-lg px-4 mb-3 mt-2 shadow-md hover:bg-yellow-200 transition duration-300 ease-in-out'
                    >
                      best reviews: {item?.bestReviews.length}
                    </p>
                  </div>
                </div>
              </div>

              <AddCartBtn onClick={() => handleAddToCart(item)} />
            </div>
          ))}
        </div>
      </div>
      {isOpen && selectedProduct && (
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
              <div className='px-4 py-2 bg-green-500 text-white'>
                <h3 className='text-lg leading-6 font-medium'>
                  {selectedProduct.name}
                </h3>
              </div>
              <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <div className='w-full h-auto'>
                      <img
                        src={selectedProduct.imageUrl}
                        alt={selectedProduct.name}
                        className='w-full h-auto'
                      />
                    </div>
                    <div className='text-gray-600 mb-2 pt-2'>
                      <p className='font-bold'>{selectedProduct.desc}</p>
                      <p className='font-bold'>
                        Price: ${selectedProduct.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  onClick={handleCloseDetail}
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
