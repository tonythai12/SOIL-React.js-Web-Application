import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_REVIEWS = gql`
  query {
    reviews {
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
      blocked
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation DeleteReview($review_id: ID!) {
    deleteReview(review_id: $review_id)
  }
`;

const TOGGLE_BLOCK_REVIEW = gql`
  mutation ToggleBlockReview($review_id: ID!, $blocked: Boolean!) {
    toggleBlockReview(review_id: $review_id, blocked: $blocked) {
      review_id
      blocked
    }
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A9696',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export default function Reviews() {
  const { loading, error, data, refetch } = useQuery(GET_REVIEWS);
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const [toggleBlockReview] = useMutation(TOGGLE_BLOCK_REVIEW);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeleteReview = async (reviewId) => {
    await deleteReview({ variables: { review_id: reviewId } });
    refetch();
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setSelectedReview(null);
    setOpenDialog(false);
  };

  const handleToggleBlockReview = async (review) => {
    await toggleBlockReview({
      variables: { review_id: review.review_id, blocked: !review.blocked },
    });
    refetch();
  };

  return (
    <Stack alignItems='center' sx={{ mt: 5 }}>
      <Stack
        direction='row'
        justifyContent='flex-end'
        sx={{ width: '80%', mb: 2 }}
      >
        <ThemeProvider theme={theme}>
          <TableContainer component={Paper} sx={{ padding: 2 }}>
            <Typography variant='h4' sx={{ marginBottom: 2 }}>
              Reviews
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
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.reviews.map((review) => (
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
                    <TableCell>
                      {new Date(
                        parseInt(review.created_at)
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='contained'
                        color={review.blocked ? 'primary' : 'secondary'}
                        onClick={() => handleToggleBlockReview(review)}
                      >
                        {review.blocked ? 'Unblock' : 'Block'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
      </Stack>
    </Stack>
  );
}
