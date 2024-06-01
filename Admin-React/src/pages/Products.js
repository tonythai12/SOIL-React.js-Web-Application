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
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query {
    products {
      product_id
      name
      description
      price
      salePrice
      imageUrl
      isSpecial
      created_at
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $description: String, $price: Float!, $salePrice: Float!, $imageUrl: String!, $isSpecial: Boolean!) {
    createProduct(name: $name, description: $description, price: $price, salePrice: $salePrice, imageUrl: $imageUrl, isSpecial: $isSpecial) {
      product_id
      name
      description
      price
      salePrice
      imageUrl
      isSpecial
      created_at
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($product_id: ID!, $name: String, $description: String, $price: Float, $salePrice: Float, $imageUrl: String, $isSpecial: Boolean) {
    updateProduct(product_id: $product_id, name: $name, description: $description, price: $price, salePrice: $salePrice, imageUrl: $imageUrl, isSpecial: $isSpecial) {
      product_id
      name
      description
      price
      salePrice
      imageUrl
      isSpecial
      created_at
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($product_id: ID!) {
    deleteProduct(product_id: $product_id)
  }
`;

export default function Products() {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleOpen = (product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const handleSave = async () => {
    if (editingProduct.product_id) {
      await updateProduct({
        variables: {
          product_id: editingProduct.product_id,
          name: editingProduct.name,
          description: editingProduct.description,
          price: parseFloat(editingProduct.price),
          salePrice: parseFloat(editingProduct.salePrice),
          imageUrl: editingProduct.imageUrl,
          isSpecial: editingProduct.isSpecial,
        },
      });
    } else {
      await createProduct({
        variables: {
          name: editingProduct.name,
          description: editingProduct.description,
          price: parseFloat(editingProduct.price),
          salePrice: parseFloat(editingProduct.salePrice),
          imageUrl: editingProduct.imageUrl,
          isSpecial: editingProduct.isSpecial,
        },
      });
    }
    refetch();
    handleClose();
  };

  const handleDelete = async (productId) => {
    await deleteProduct({ variables: { product_id: productId } });
    refetch();
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
      field: 'isSpecial',
      headerName: 'Is Special',
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
          <Button onClick={() => handleDelete(params.row.product_id)}>Delete</Button>
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
                  isSpecial: false,
                })
              }
            >
              Add Product
            </Button>
          </Stack>
          <DataGrid
            rows={data?.products || []}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row.product_id}
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
          {editingProduct?.product_id ? 'Edit Product' : 'Add Product'}
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
                checked={editingProduct?.isSpecial || false}
                onChange={handleChange}
                name='isSpecial'
              />
            }
            label='Is Special'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            {editingProduct?.product_id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}