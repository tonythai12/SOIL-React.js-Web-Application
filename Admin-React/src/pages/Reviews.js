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
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation DeleteReview($review_id: ID!) {
    deleteReview(review_id: $review_id)
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export default function Reviews() {
  const { loading, error, data, refetch } = useQuery(GET_REVIEWS);
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeleteReview = async (reviewId) => {
    await deleteReview({ variables: { review_id: reviewId } });
    refetch();
    setOpenDialog(false);
  };

  const handleOpenDialog = (review) => {
    setSelectedReview(review);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedReview(null);
    setOpenDialog(false);
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
                    <TableCell>{new Date(parseInt(review.created_at)).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleOpenDialog(review)}
                        variant='contained'
                        color='secondary'
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle style={{ backgroundColor: '#FF9364', color: '#fff' }}>
              Delete Review
            </DialogTitle>
            <DialogContent>
              <Typography
                variant='body1'
                sx={{
                  mt: 2,
                  mb: 2,
                  fontWeight: 600,
                }}
              >
                ❗️Are you sure you want to{' '}
                <span style={{ color: 'red' }}>delete this review?</span>
              </Typography>
              {selectedReview && (
                <Stack
                  sx={{
                    border: '2px dashed #FF9364',
                    padding: '10px',
                  }}
                >
                  <Typography variant='h6' sx={{ marginBottom: 1 }}>
                    {selectedReview.title}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{ color: '#888', marginBottom: 1 }}
                  >
                    By: {selectedReview.user.username}
                  </Typography>
                  <Typography variant='body1' sx={{ marginBottom: 1 }}>
                    Product: {selectedReview.product.name}
                  </Typography>
                  <Typography variant='body1' sx={{ marginBottom: 1 }}>
                    Rating: {selectedReview.rating}
                  </Typography>
                  <Typography variant='body1' sx={{ marginBottom: 1 }}>
                    {selectedReview.content}
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#888' }}>
                    Created at: {new Date(parseInt(selectedReview.created_at)).toLocaleDateString()}
                  </Typography>
                </Stack>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDialog}
                sx={{
                  bgcolor: '#FF9330',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#FF9D6E',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteReview(selectedReview.review_id)}
                sx={{
                  bgcolor: '#f44336',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#FF5722',
                  },
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </Stack>
    </Stack>
  );
}