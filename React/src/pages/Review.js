import React, { useEffect, useState } from 'react';
import ReviewDetail from '../components/Review/ReviewDetail';
import ReviewList from '../components/Review/ReviewList';
import { useAuth } from '../context/AuthProvider';
import { useProduct } from '../context/ProductProvider';

const defaultReviews = [
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
];

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
      const newReviews = res.data.map((review) => {
        if (review.followingUserInfos.length === 0) {
          return { ...review, heart: false };
        } else {
          const checkFollowing = review.followingUserInfos.filter(
            (info) => info.user_id === userData?.user_id
          );
          console.log(`checkFollowing =>`, checkFollowing);
          return {
            ...review,
            heart: checkFollowing[0] ? true : false,
          };
        }
      });

      setReviews(newReviews);
    } else {
      setReviews(defaultReviews);
      console.error(res.message);
    }
  };
  console.log(`reviews =>`, reviews);
  useEffect(() => {
    getReviews();
  }, [userData]);

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
    const { user_id, title, product_id, rating, content } = createReview;
    if (!content) {
      return alert('There is no written content.');
    } else if (!title) {
      return alert('Please enter a title.');
    } else if (!product_id) {
      return alert('Please select a product to review.');
    } else if (!rating) {
      return alert('Please rate the product.');
    }
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
          httpClient={httpClient}
          getReviews={getReviews}
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

// 1. Review를 가져올때  user_id에 해당하는 모든 Follow를 배열에 담아서 가져오고 그 개수와 유저의 이름들을 UI에 표기한다.
// 2. 로그인한 유저가 follow를 하면 Follow db에 생성이되고, 언팔을 하면 삭제된다.
// 3. 로그인한 유저의 id가 해당 유저의 follow 정보에 있으면 unfollow가 보여지고 없으면 follow가 보여진다 (하트로 리스트 겉에 두기 , 자기꺼는 하트모양 안나옴.)
