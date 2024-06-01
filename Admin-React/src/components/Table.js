import {
  Button,
  Paper,
  Stack,
  TableContainer,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

export default function Table({
  rows,
  title,
  bgcolor,
  bgcolorHover,
  columns,
  handleOpen,
}) {
  <TableContainer component={Paper} sx={{ padding: 2 }}>
    <Stack
      direction='row'
      justifyContent='space-between'
      sx={{ width: '100%', mb: 2 }}
    >
      <Typography variant='h4' sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      {handleOpen && (
        <Button
          variant='contained'
          sx={{
            mt: 2,
            bgcolor: bgcolor,
            '&:hover': {
              bgcolor: bgcolorHover,
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
      )}
    </Stack>
    <DataGrid
      rows={rows}
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
  </TableContainer>;
}
