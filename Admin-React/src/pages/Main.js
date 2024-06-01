import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Outlet, useNavigate } from 'react-router-dom';
import { Stack, Box, Typography } from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

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

const RECENT_REVIEWS_QUERY = gql`
  query {
    reviews(limit: 3, order: "created_at_DESC") {
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
  const { data: recentReviewsData, loading, error, subscribeToMore } = useQuery(RECENT_REVIEWS_QUERY);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NEW_REVIEW_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newReview = subscriptionData.data.newReview;
        const updatedReviews = [newReview, ...prev.reviews.slice(0, 2)];
        return {
          ...prev,
          reviews: updatedReviews,
        };
      },
    });

    return () => unsubscribe();
  }, [subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recentReviews = recentReviewsData?.reviews.slice(0, 3) || [];

  return (
    <Stack alignItems='center' sx={{ mt: 5 }}>
      <Stack
        direction='row'
        justifyContent='flex-end'
        sx={{ width: '80%', mb: 2 }}
      >
        <TableContainer component={Paper} sx={{ padding: 2 }}>
          <Typography variant='h4' sx={{ marginBottom: 2 }}>
            Recent Reviews
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentReviews.map((review) => (
                <TableRow
                  key={review.review_id}
                  sx={
                    review.title.toLowerCase().includes('disappointed') ||
                    review.content.toLowerCase().includes('poor quality') ||
                    review.content.toLowerCase().includes('fuck')
                      ? { backgroundColor: '#ffcccc' }
                      : {}
                  }
                >
                  <TableCell>{review.title}</TableCell>
                  <TableCell>{review.user.username}</TableCell>
                  <TableCell>{review.product.name}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.content}</TableCell>
                  <TableCell>{new Date(parseInt(review.created_at)).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
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
      {/* Menus */}
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