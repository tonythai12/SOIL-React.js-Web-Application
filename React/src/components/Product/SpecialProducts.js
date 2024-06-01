import React, { useState } from 'react';
import Modal from '../Cart/Modal';
import AddCartBtn from '../Cart/AddCartBtn';

// Component displaying special deals based on the selected vegetable
export function SpecialProducts({
  specialProducts,
  userData,
  addToCart,
  showReviewDetail,
}) {
  const [selectedProduct, setSelectedProduct] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState();

  const handleAddToCart = async (product) => {
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
          🔥 Special Products 🔥
        </h2>
        <div className='mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {specialProducts.map((item, index) => (
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
                    <div className='flex'>
                      <p className='mt-1  text-sm text-gray-500 line-through'>
                        {`$${item.price}`}
                      </p>
                      <p className='mt-1 text-sm text-red-600 ml-2'>{`$${item.salePrice}`}</p>
                    </div>
                    <p
                      onClick={() => showReviewDetail(item?.bestReviews)}
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
