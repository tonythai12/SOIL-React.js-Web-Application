import React, { useEffect, useState } from 'react';
import ReviewDetail from '../components/Review/ReviewDetail';
import ReviewList from '../components/Review/ReviewList';
import { useAuth } from '../context/AuthProvider';
import { useProduct } from '../context/ProductProvider';

// const defaultReviews = [
//   {
//     user_id: '0000',
//     title: 'A Fresh Carrot',
//     content:
//       'I bought fresh carrots from the grocery store. They were delicious and perfectly ripe, making for a satisfying snack or addition to any meal. Highly recommended!',
//     userImage: '/img/user_default_icon.png',
//     userName: 'Wonbin',
//     rating: 3,
//     product: {
//       name: 'Healthy and Vitamin-Rich Carrot',
//       imgUrl: '/img/carrot.jpg',
//     },
//   },
//   {
//     user_id: '1111',
//     title: 'So Sweet Blueberry',
//     content:
//       'I purchased some fresh blueberries from the store and they were fantastic! Juicy, sweet, and bursting with flavor. They were perfect for snacking on their own, adding to yogurt, or baking into muffins. Definitely a must-buy!',
//     userImage: '/img/user_default_icon.png',
//     userName: 'Emma',
//     rating: 2,
//     product: {
//       name: 'Fresh and Nutritious Blueberry',
//       imgUrl: '/img/blueberry.jpg',
//     },
//   },
// ];

const Review = () => {
  const { userData, httpClient } = useAuth();
  const { products } = useProduct();
  const [reviews, setReviews] = useState([]);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null); // go to view detail.
  const [isCreate, setIsCreate] = useState(false); // go to create review.

  const getReviews = async () => {
    const res = await httpClient.fetch('/soil/review', {
      method: 'GET',
    });
    console.log(res.data);
    if (res.status === 200) {
      setReviews(res.data);
    } else {
      setReviews([]);
      console.error(res.message);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  // when it has selected review index, it can move to view detail.
  const handleViewDetail = (index) => {
    setSelectedReviewIndex(index);
  };

  const handleDeleteReview = (reviewId) => {
    const res = httpClient.fetch(`/soil/review/${reviewId}`, {
      method: 'DELETE',
    });

    if (res.status === 204) {
      const updatedReviews = [...reviews];
      updatedReviews.splice(selectedReviewIndex, 1);
      setReviews(updatedReviews);
      alert('Successfully deleted!');
      setSelectedReviewIndex(null);
    }
  };

  const handleEditReview = (editedReview) => {
    const res = httpClient.fetch(`/soil/review/${editedReview.review_id}`, {
      method: 'PUT',
    });

    if (res.status === 200) {
      const updatedReviews = [...reviews];
      updatedReviews[selectedReviewIndex] = editedReview;
      setReviews(updatedReviews);
      alert('Successfully Edited!');
    }
  };

  const handleCreateReview = (createReview) => {
    const { user_id, title, product_id, rating, content } = createReview;
    const res = httpClient.fetch(`/soil/review`, {
      method: 'POST',
      body: JSON.stringify({
        user_id,
        title,
        product_id,
        rating,
        content,
      }),
    });

    if (res.status === 201) {
      const updatedReviews = [...reviews];
      updatedReviews.push(createReview);
      setReviews(updatedReviews);

      setIsCreate(false);
      alert('Successfully Created!');
    } else {
      alert(res.message);
    }
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
