import { gql, useQuery } from '@apollo/client';
import { Box, Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';

const GET_REVIEW_METRICS = gql`
  query {
    reviews {
      rating
    }
  }
`;

export default function RecentMetrics() {
  const { data: reviewData, loading, refetch } = useQuery(GET_REVIEW_METRICS);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000); // Fetch new data every 5 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  const calculateAverageRating = () => {
    if (reviewData && reviewData.reviews.length > 0) {
      const totalRating = reviewData.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
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
      <Typography variant='h5' gutterBottom>
        Review Metrics
      </Typography>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='value' fill='#8884d8' />
        </BarChart>
      )}
    </Box>
  );
}
