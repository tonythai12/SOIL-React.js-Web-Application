import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Outlet, useNavigate } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';
import { useSubscription, useQuery, gql } from '@apollo/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

const GET_REVIEW_METRICS = gql`
  query {
    reviews {
      rating
    }
  }
`;

const RecentReviews = () => {
  const { data: newReviewData, loading: subscriptionLoading } = useSubscription(NEW_REVIEW_SUBSCRIPTION);

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
};

const ReviewMetrics = () => {
  const { data: reviewData, loading, refetch } = useQuery(GET_REVIEW_METRICS);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000); // Fetch new data every 5 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  const calculateAverageRating = () => {
    if (reviewData && reviewData.reviews.length > 0) {
      const totalRating = reviewData.reviews.reduce((sum, review) => sum + review.rating, 0);
      return (totalRating / reviewData.reviews.length).toFixed(2);
    }
    return 0;
  };

  const averageRating = calculateAverageRating();
  const reviewCount = reviewData ? reviewData.reviews.length : 0;

  const data = [
    { name: 'Average Rating', value: parseFloat(averageRating) },
    { name: 'Review Count', value: reviewCount },
  ];

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Review Metrics
      </Typography>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      )}
    </Box>
  );
};

export default function MainPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('');
  const pathName = window.location.pathname.split('/')[2];
  const appBarBgColor =
    selectedTab === 'product'
      ? '	#46BD7B'
      : selectedTab === 'review'
      ? '#FF9364'
      : '#1478CD';
  const handleNavigate = (pathName) => {
    setSelectedTab(pathName);
    navigate(`/admin/${pathName}`);
  };

  console.log(pathName);
  useEffect(() => {
    setSelectedTab(pathName);
  }, [pathName]);

  return (
    <Stack
      sx={{
        height: '100vh',
        width: '`100%',
      }}
    >
      <AppBar position='static' sx={{ bgcolor: appBarBgColor }}>
        <Toolbar>
          <h1 style={{ flexGrow: 1 }}>
            <span
              onClick={() => {
                navigate('/');
                setSelectedTab('');
              }}
              style={{ cursor: 'pointer' }}
            >
              {' '}
              SOIL
            </span>
          </h1>
          <Tabs value={selectedTab}>
            <Tab
              label='Users'
              onClick={() => handleNavigate('user')}
              sx={{
                backgroundColor:
                  selectedTab === 'user' ? '#2196f3' : 'transparent',
                color: '#000',
                fontWeight: 600,
                fontSize: 20,
                borderRadius: '10px',
              }}
            />
            <Tab
              label='Products'
              onClick={() => handleNavigate('product')}
              sx={{
                backgroundColor:
                  selectedTab === 'product' ? '	#82F9B7' : 'transparent',
                color: '#000',
                fontWeight: 600,
                fontSize: 20,
                borderRadius: '10px',
              }}
            />
            <Tab
              label='Reviews'
              onClick={() => handleNavigate('review')}
              sx={{
                backgroundColor:
                  selectedTab === 'review' ? '#FFCA9B' : 'transparent',
                color: '#000',
                fontWeight: 600,
                fontSize: 20,
                borderRadius: '10px',
              }}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      <RecentReviews />
      <ReviewMetrics />
      <Outlet />
    </Stack>
  );
}