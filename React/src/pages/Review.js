import React, { useState } from 'react';
import ReviewDetail from '../components/Review/ReviewDetail';
import ReviewList from '../components/Review/ReviewList';
import { useAuth } from '../context/AuthProvider';
import { useProduct } from '../context/ProductProvider';

const Review = () => {
  const { userData } = useAuth();
  const { products } = useProduct();

  const [reviews, setReviews] = useState([
    {
      user_id: '0000',
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
      user_id: '1111',
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
  ]); // get all review from db
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null); // go to view detail.
  const [isCreate, setIsCreate] = useState(false); // go to create review.

  // when it has selected review index, it can move to view detail.
  const handleViewDetail = (index) => {
    setSelectedReviewIndex(index);
  };

  const handleDeleteReview = () => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(selectedReviewIndex, 1);
    // db로 할 때는 user_id랑 같고 해당 review인 것을 찾아서 지워주기
    // 생성 수정은 해당 user_id를 가지고 추가 수정하지만 지울때는 해당 유저가 작성한것들이 많을 수 있기 때문에 해당 리뷰에 대한 추가정보도 필요함.
    // 리뷰 자체 생성할때 생성되는 id를 가지고 삭제하자.(리뷰 고유 아이디)
    setReviews(updatedReviews);
    alert('Successfully deleted!');
    setSelectedReviewIndex(null);
  };

  const handleEditReview = (editedReview) => {
    const updatedReviews = [...reviews];
    updatedReviews[selectedReviewIndex] = editedReview;
    setReviews(updatedReviews);
    alert('Successfully Edited!');
  };

  const handleCreateReview = (createReview) => {
    const updatedReviews = [...reviews];

    const newReview = {
      // temp data to check UI
      ...createReview,
      userImage: userData?.imgUrl
        ? userData?.imgUrl
        : '/img/user_default_icon.png',
      userName: userData?.name,
    };

    updatedReviews.push(newReview);
    setReviews(updatedReviews);
    setIsCreate(false);
    alert('Successfully Created!');
  };
  return (
    <div className='bg-slate-800'>
      {!selectedReviewIndex && selectedReviewIndex !== 0 && !isCreate ? (
        <ReviewList
          reviews={reviews}
          userData={userData}
          handleViewDetail={handleViewDetail}
          setIsCreate={setIsCreate}
        />
      ) : (
        <div>
          <div className='flex justify-center items-center'>
            <ReviewDetail
              review={reviews[selectedReviewIndex]}
              rating={reviews[selectedReviewIndex]?.rating}
              userData={userData}
              productName={reviews[selectedReviewIndex]?.product?.name}
              products={products}
              onDelete={handleDeleteReview}
              onEdit={handleEditReview}
              onCreate={handleCreateReview}
              setSelectedReviewIndex={setSelectedReviewIndex} // back to list
              isCreate={isCreate}
              setIsCreate={setIsCreate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
