import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  TableContainer,
  Paper,
} from '@mui/material';

const initialProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    salePrice: 80,
    imageUrl: 'http://example.com/image1.jpg',
    isSale: true,
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 200,
    salePrice: 180,
    imageUrl: 'http://example.com/image2.jpg',
    isSale: false,
  },
  // Add more initial products if needed
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpen = (product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const handleSave = () => {
    if (editingProduct.id) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? editingProduct : product
        )
      );
    } else {
      setProducts([
        ...products,
        { ...editingProduct, id: products.length + 1 },
      ]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'salePrice', headerName: 'Sale Price', width: 120 },
    { field: 'imageUrl', headerName: 'Image URL', width: 230 },
    {
      field: 'isSale',
      headerName: 'Is Sale',
      width: 100,
      renderCell: (params) => (params.value ? 'Yes' : 'No'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpen(params.row)}>Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Stack alignItems='center' sx={{ mt: 5 }}>
      <div style={{ height: 400, width: '80%' }}>
        <TableContainer component={Paper} sx={{ padding: 2 }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            sx={{ width: '100%', mb: 2 }}
          >
            <Typography variant='h4' sx={{ marginBottom: 2 }}>
              Products
            </Typography>
            <Button
              variant='contained'
              sx={{
                mt: 2,
                backgroundColor: '#329632',
                '&:hover': {
                  backgroundColor: '#4BAF4B',
                },
              }}
              onClick={() =>
                handleOpen({
                  name: '',
                  description: '',
                  price: '',
                  salePrice: '',
                  imageUrl: '',
                  isSale: false,
                })
              }
            >
              Add Product
            </Button>
          </Stack>
          {/* <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ width: '100%', mb: 2 }}
        >
          <Typography variant='h4' sx={{ marginBottom: 2 }}>
            Products
          </Typography>
          <Button
            variant='contained'
            sx={{
              mt: 2,
              backgroundColor: '#329632',
              '&:hover': {
                backgroundColor: '#4BAF4B',
              },
            }}
            onClick={() =>
              handleOpen({
                name: '',
                description: '',
                price: '',
                salePrice: '',
                imageUrl: '',
                isSale: false,
              })
            }
          >
            Add Product
          </Button>
        </Stack> */}
          <DataGrid
            rows={products}
            columns={columns}
            pageSize={5}
            componentsProps={{
              columnHeaders: {
                style: {
                  backgroundColor: '#f55',
                  color: '#000',
                  fontSize: '500px',
                },
              },
            }}
          />
        </TableContainer>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingProduct?.id ? 'Edit Product' : 'Add Product'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            name='name'
            label='Name'
            fullWidth
            value={editingProduct?.name || ''}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='description'
            label='Description'
            fullWidth
            value={editingProduct?.description || ''}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='price'
            label='Price'
            fullWidth
            type='number'
            value={editingProduct?.price || ''}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='salePrice'
            label='Sale Price'
            fullWidth
            type='number'
            value={editingProduct?.salePrice || ''}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='imageUrl'
            label='Image URL'
            fullWidth
            value={editingProduct?.imageUrl || ''}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editingProduct?.isSale || false}
                onChange={handleChange}
                name='isSale'
              />
            }
            label='Is Sale'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            {editingProduct?.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
