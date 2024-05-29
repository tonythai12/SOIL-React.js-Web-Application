import React, { useEffect, useState } from 'react';
import ReviewDetail from '../components/Review/ReviewDetail';
import ReviewList from '../components/Review/ReviewList';
import { useAuth } from '../context/AuthProvider';
import { useProduct } from '../context/ProductProvider';

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

  const handleDeleteReview = async (reviewId) => {
    const res = await httpClient.fetch(`/soil/review/${reviewId}`, {
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

  const handleEditReview = async (editedReview) => {
    const res = await httpClient.fetch(
      `/soil/review/${editedReview.review_id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          title: editedReview.title,
          product_id: editedReview.product_id,
          rating: editedReview.rating,
          content: editedReview.content,
        }),
      }
    );

    if (res.status === 200) {
      const updatedReviews = [...reviews];
      updatedReviews[selectedReviewIndex] = editedReview;
      setReviews(updatedReviews);
      alert('Successfully Edited!');
    }
  };

  const handleCreateReview = async (createReview) => {
    console.log(createReview);
    const { user_id, title, product_id, rating, content } = createReview;
    const res = await httpClient.fetch(`/soil/review`, {
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
              review={reviews && reviews[selectedReviewIndex]}
              rating={reviews && reviews[selectedReviewIndex]?.rating}
              userData={userData}
              productName={
                reviews && reviews[selectedReviewIndex]?.product?.name
              }
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
