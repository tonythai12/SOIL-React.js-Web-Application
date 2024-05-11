import React, { useState } from 'react';
import ReviewInput from './ReviewInput';
import ReviewInfo from './ReviewInfo';

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

  const handleSave = () => {
    onEdit(editedReview);
    setIsEditing(false);
  };

  const handleCreate = () => {
    onCreate(editedReview);
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
          // edit review
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
          // create review
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
          // content of review
          <ReviewInfo
            review={review}
            rating={rating}
            setIsEditing={setIsEditing}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
