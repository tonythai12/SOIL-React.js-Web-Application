import React, { useState } from 'react';
import Rating from './Rating';
import ReviewInput from './ReviewInput';

const ReviewDetail = ({
  review,
  productName,
  rating,
  products,
  onDelete,
  onEdit,
  onCreate,
  setSelectedReviewIndex,
  isCreate,
  setIsCreate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState(!isCreate ? review : {});
  const [selectedProduct, setSelectedProduct] = useState(
    !isCreate ? productName : ''
  );
  const [selectedRating, setSelectedRating] = useState(
    isCreate ? null : rating ? rating : null
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedReview);
    setIsEditing(false);
  };

  const handleCreate = () => {
    onCreate(editedReview);
    // setIsEditing(false);
    console.log('create!');
  };

  return (
    <div className='flex flex-col h-full items-center justify-center mt-10 mb-5 max-w-2xl'>
      {isCreate && <h1 className='text-white text-3xl'>Create the Review !</h1>}
      <button
        className='bg-gray-600 text-white px-4 py-2 mt-2 rounded self-end'
        onClick={() => {
          if (!isCreate) {
            setSelectedReviewIndex(null);
          } else {
            setSelectedReviewIndex(null);
            setIsCreate(false);
          }
        }}
      >
        Back to List
      </button>
      <div className='max-w-2xl border mt-4 mb-12 border-gray-300 rounded-lg p-4'>
        {isEditing ? (
          <ReviewInput
            products={products}
            handleSave={handleSave}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            editedReview={editedReview}
            setEditedReview={setEditedReview}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            setIsEditing={setIsEditing}
            setSelectedReviewIndex={setSelectedReviewIndex}
            isCreate={isCreate}
            setIsCreate={setIsCreate}
          />
        ) : isCreate ? (
          <ReviewInput
            products={products}
            handleSave={handleCreate}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            editedReview={editedReview}
            setEditedReview={setEditedReview}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            setIsEditing={setIsEditing}
            setSelectedReviewIndex={setSelectedReviewIndex}
            isCreate={isCreate}
            setIsCreate={setIsCreate}
          />
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
