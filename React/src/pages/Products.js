import React, { useState } from 'react';
import Modal from '../components/Cart/Modal';
import { useProduct } from '../context/ProductProvider';
import { useAuth } from '../context/AuthProvider';
import { useCart } from '../context/CartProvider';
import AddCartBtn from '../components/Cart/AddCartBtn';

export default function Products() {
  const { userData } = useAuth();
  const { products } = useProduct();
  const { addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // show product detail modal
  const [isOpen2, setIsOpen2] = useState(false); // show confirmation modal to check product which is added to cart
  const [status, setStatus] = useState();
  // calculate discount percentage and add to product as a property
  products.forEach((product) => {
    const discountPercentage =
      ((product.price - product.salePrice) / product.price) * 100;
    product.percentage = discountPercentage.toFixed(0);
  });

  const handleAddToCart = async (product) => {
    if (!userData?.email) {
      return alert(
        `We need a login feature.\nAfter logging in, you can add items to your shopping cart.`
      );
    } else {
      setSelectedProduct(product);
      const res = await addToCart(product);
      setStatus(res.status);
      setIsOpen2(true);
      setTimeout(() => {
        setIsOpen2(false);
        setStatus(null);
      }, 3000);
    }
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    setIsOpen(false);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <div
            key={product.id}
            className='border border-gray-200 rounded-md overflow-hidden shadow-md hover:shadow-lg transition duration-300'
          >
            <img
              onClick={() => {
                setSelectedProduct(product);
                setIsOpen(true);
              }}
              src={product.imageUrl}
              alt={product.name}
              style={{ cursor: 'pointer' }}
              className='w-full h-56 object-cover'
            />
            <div className='p-4 flex flex-col'>
              <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
              <p className='text-gray-700 mb-2'>{product.desc}</p>
              <div className='flex text-lg font-semibold'>
                <span className='text-orange-600 mb-2'>
                  %{product?.percentage}
                </span>
                <p className='text-gray-700  mb-2 ml-3'>${product.price}</p>
              </div>
              <AddCartBtn onClick={() => handleAddToCart(product)} />
            </div>
          </div>
        ))}
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
      {/* confirm products when user add product to cart */}
      {isOpen2 && (
        <Modal
          isOpen2={isOpen2}
          setIsOpen2={setIsOpen2}
          status={status}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}
