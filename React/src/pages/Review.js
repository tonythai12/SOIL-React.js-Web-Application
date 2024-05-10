import React, { useState } from 'react';
import ReviewDetail from '../components/ReviewDetail';
import ReviewList from '../components/ReviewList';

// 리뷰 컴포넌트
const Review = ({ products, userData }) => {
  const [reviews, setReviews] = useState([
    {
      title: 'A Fresh Carrot',
      content:
        'I bought fresh carrots from the grocery store. They were delicious and perfectly ripe, making for a satisfying snack or addition to any meal. Highly recommended!',
      userImage: '/img/user_default_icon.png',
      userName: 'Wonbin',
      rating: 3,
      product: {
        name: 'Healthy and Vitamin-Rich Carrot',
        imgUrl: '/img/carrot.jpg',
      },
    },
    {
      title: 'So Sweet Blueberry',
      content:
        'I purchased some fresh blueberries from the store and they were fantastic! Juicy, sweet, and bursting with flavor. They were perfect for snacking on their own, adding to yogurt, or baking into muffins. Definitely a must-buy!',
      userImage: '/img/user_default_icon.png',
      userName: 'Emma',
      rating: 2,
      product: {
        name: 'Fresh and Nutritious Blueberry',
        imgUrl: '/img/blueberry.jpg',
      },
    },
  ]);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
  const handleViewDetail = (index) => {
    setSelectedReviewIndex(index);
  };

  const handleDeleteReview = () => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(selectedReviewIndex, 1);
    setReviews(updatedReviews);
    alert('Successfully deleted!');
    setSelectedReviewIndex(null);
  };

  const handleEditReview = (editedReview) => {
    const updatedReviews = [...reviews];
    updatedReviews[selectedReviewIndex] = editedReview;
    setReviews(updatedReviews);
    alert('Successfully edited!');
  };
  return (
    <div className='bg-slate-800'>
      {!selectedReviewIndex && selectedReviewIndex !== 0 ? (
        <ReviewList reviews={reviews} handleViewDetail={handleViewDetail} />
      ) : (
        <>
          <div className='flex justify-center items-center'>
            <ReviewDetail
              review={reviews[selectedReviewIndex]}
              rating={reviews[selectedReviewIndex]?.rating}
              productName={reviews[selectedReviewIndex]?.product.name}
              products={products}
              onDelete={handleDeleteReview}
              onEdit={handleEditReview}
              setSelectedReviewIndex={setSelectedReviewIndex} // back to list
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Review;
