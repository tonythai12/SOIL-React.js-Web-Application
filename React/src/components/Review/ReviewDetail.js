import React, { useState } from 'react';
import ReviewInput from './ReviewInput';
import ReviewInfo from './ReviewInfo';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// UTC 플러그인을 추가
dayjs.extend(utc);

const ReviewDetail = ({
  review,
  productName,
  rating,
  userData,
  products,
  specialProducts,
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

  const allProducts = [...products, ...specialProducts];
  const handleSave = () => {
    const { userName, product, ...newEditedReview } = editedReview;
    onEdit(newEditedReview); // Pass the new object excluding userName and product
    setIsEditing(false);
  };

  const handleCreate = () => {
    const createdAt = dayjs()
      .utcOffset('+10:00')
      .format('ddd,D MMM,YYYY h:mm A');
    onCreate({
      user_id: userData?.user_id,
      userName: userData?.username,
      ...editedReview,
      createdAt,
    });
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
            products={allProducts}
            userData={userData}
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
            products={allProducts}
            userData={userData}
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
            userData={userData}
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
