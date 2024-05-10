import React, { useState } from 'react';
import Rating from './Rating';

const ReviewDetail = ({
  review,
  productName,
  rating,
  products,
  onDelete,
  onEdit,
  setSelectedReviewIndex,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState(review);
  const [selectedProduct, setSelectedProduct] = useState(productName);
  const [selectedRating, setSelectedRating] = useState(rating ? rating : null);
  console.log(selectedProduct);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedReview);
    setIsEditing(false);
  };

  return (
    <div className='flex flex-col h-full items-center justify-center mt-5 max-w-2xl'>
      <button
        className='bg-gray-600 text-white px-4 py-2 mt-2 rounded self-end'
        onClick={() => setSelectedReviewIndex(null)}
      >
        Back to List
      </button>
      <div className='max-w-2xl border mt-4 mb-4 border-gray-300 rounded-lg p-4'>
        {isEditing ? (
          <div>
            <h1 className='text-2xl text-white font-bold mb-4'>
              {review?.title}
            </h1>
            <select
              className='border p-2 mb-2 w-full'
              value={selectedProduct}
              onChange={(e) => {
                return (
                  setSelectedProduct(e.target.value),
                  setEditedReview({
                    ...editedReview,
                    product: {
                      ...editedReview.product,
                      name: e.target.value,
                    },
                  })
                );
              }}
            >
              <option>Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                  <img src={product.imageUrl} alt='' />
                </option>
              ))}
            </select>

            <select
              className='border p-2 mb-2 w-full'
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              <option value=''>Select a rating</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {Array(rating).fill('★').join('')}
                </option>
              ))}
            </select>
            <textarea
              className='border p-2 mb-2 w-full h-48 resize-none'
              value={editedReview.content}
              onChange={(e) =>
                setEditedReview({ ...editedReview, content: e.target.value })
              }
            ></textarea>
            <div className='flex justify-end'>
              <button
                className='bg-green-500 text-white px-4 py-2 rounded mr-2'
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className='bg-gray-500 text-white px-4 py-2 rounded'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className='h-900 text-white flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold mb-5'>{review?.title}</h1>
            <img className='w-full' src={review?.product?.imgUrl} alt='' />
            <div className='mt-5'>
              <Rating rating={rating} width={'w-10'} />
            </div>
            <p className=' pt-5 pb-5 text-lg break-all'>{review?.content}</p>
            <div className='flex self-end'>
              <button
                className='bg-yellow-500 text-white px-4 py-2 mt-2 rounded'
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className='bg-red-500 text-white px-4 py-2 mt-2 rounded ml-2'
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
