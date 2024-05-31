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

const initialReviews = [
  {
    id: 1,
    username: 'John Doe',
    title: 'Great Product!',
    productName: 'Product A',
    rating: 5,
    content: 'This product exceeded my expectations.',
    created_at: '2024-05-31',
  },
  {
    id: 2,
    username: 'Jane Smith',
    title: 'Disappointed',
    productName: 'Product B',
    rating: 2,
    content: 'Poor quality, not worth the price.',
    created_at: '2024-05-30',
  },
  {
    id: 6,
    username: 'Emily Johnson',
    title: 'Highly Recommended!',
    productName: 'Product C',
    rating: 4,
    content: 'I love this product, it works great!',
    created_at: '2024-06-01',
  },
  {
    id: 7,
    username: 'Michael Brown',
    title: 'Not Bad',
    productName: 'Product D',
    rating: 3,
    content: "It's okay, but I expected more.",
    created_at: '2024-06-02',
  },
  {
    id: 8,
    username: 'Sophia Martinez',
    title: 'Excellent Service!',
    productName: 'Product E',
    rating: 5,
    content: 'The customer service was outstanding!',
    created_at: '2024-06-03',
  },
  {
    id: 9,
    username: 'William Taylor',
    title: 'Amazing Product',
    productName: 'Product F',
    rating: 5,
    content: "I'm so impressed with the quality!",
    created_at: '2024-06-04',
  },
  {
    id: 10,
    username: 'Olivia Anderson',
    title: 'Worst Purchase Ever',
    productName: 'Product G',
    rating: 1,
    content: "Fuck!!!!!😡 I regret buying this, it's a waste of money.",
    created_at: '2024-06-05',
  },
];

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
  const [reviews, setReviews] = useState(initialReviews);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
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
                {reviews.map((review) => (
                  <TableRow
                    key={review.id}
                    sx={
                      review.title.toLowerCase().includes('disappointed') ||
                      review.content.toLowerCase().includes('poor quality') ||
                      review.content.toLowerCase().includes('fuck')
                        ? { backgroundColor: '#ffcccc' }
                        : {}
                    }
                  >
                    <TableCell>{review.title}</TableCell>
                    <TableCell>{review.username}</TableCell>
                    <TableCell>{review.productName}</TableCell>
                    <TableCell>{review.rating}</TableCell>
                    <TableCell>{review.content}</TableCell>
                    <TableCell>{review.created_at}</TableCell>
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
              <Typography variant='body1'>
                Are you sure you want to delete this review?
              </Typography>
              {selectedReview && (
                <>
                  <Typography
                    variant='h6'
                    sx={{ marginTop: 2, marginBottom: 1 }}
                  >
                    {selectedReview.title}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{ color: '#888', marginBottom: 1 }}
                  >
                    By: {selectedReview.username}
                  </Typography>
                  <Typography variant='body1' sx={{ marginBottom: 1 }}>
                    Product: {selectedReview.productName}
                  </Typography>
                  <Typography variant='body1' sx={{ marginBottom: 1 }}>
                    Rating: {selectedReview.rating}
                  </Typography>
                  <Typography variant='body1' sx={{ marginBottom: 1 }}>
                    {selectedReview.content}
                  </Typography>
                  <Typography variant='caption' sx={{ color: '#888' }}>
                    Created at: {selectedReview.created_at}
                  </Typography>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDialog}
                sx={{
                  bgcolor: '#FF9330',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#FF9D6E', // 호버됐을 때의 배경색
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteReview(selectedReview.id)}
                sx={{
                  bgcolor: '#f44336',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: '#FF5722', // 호버됐을 때의 배경색
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
