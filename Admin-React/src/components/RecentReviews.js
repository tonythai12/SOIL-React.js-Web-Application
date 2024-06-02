import { gql, useSubscription } from '@apollo/client';
import React, { useEffect, useState } from 'react';

const NEW_REVIEW_SUBSCRIPTION = gql`
  subscription {
    newReview {
      review_id
      user {
        username
      }
      title
      product {
        name
      }
      rating
      content
      userImage
      created_at
    }
  }
`;

export default function RecentReviews() {
  const { data: newReviewData, loading: subscriptionLoading } = useSubscription(
    NEW_REVIEW_SUBSCRIPTION
  );

  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    if (!subscriptionLoading && newReviewData) {
      setRecentReviews((prevReviews) => [
        newReviewData.newReview,
        ...prevReviews.slice(0, 1),
      ]);
    }
  }, [newReviewData, subscriptionLoading]);

  return (
    <div>
      <h3>Recent Reviews</h3>
      {recentReviews.map((review) => (
        <div key={review.review_id}>
          <p>Title: {review.title}</p>
          <p>User: {review.user.username}</p>
          <p>Product: {review.product.name}</p>
          <p>Rating: {review.rating}</p>
          <p>Content: {review.content}</p>
        </div>
      ))}
    </div>
  );
}
