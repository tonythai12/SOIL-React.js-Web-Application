import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const initialUsers = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    created_at: '2022-05-30',
    blocked: false,
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    created_at: '2022-05-31',
    blocked: false,
  },
  {
    id: 3,
    username: 'user3',
    email: 'user3@example.com',
    created_at: '2022-05-31',
    blocked: false,
  },
  {
    id: 4,
    username: 'user4',
    email: 'user4@example.com',
    created_at: '2022-05-31',
    blocked: false,
  },
  {
    id: 5,
    username: 'user5',
    email: 'user5@example.com',
    created_at: '2022-05-31',
    blocked: false,
  },
  {
    id: 6,
    username: 'user6',
    email: 'user6@example.com',
    created_at: '2022-05-31',
    blocked: false,
  },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);

  const toggleBlockUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, blocked: !user.blocked } : user
      )
    );
  };

  return (
    <Stack
      display='flex'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
    >
      <Stack sx={{ mt: 5, width: '80%' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      color={user.blocked ? 'secondary' : 'primary'}
                      onClick={() => toggleBlockUser(user.id)}
                    >
                      {user.blocked ? 'Unblock' : 'Block'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}
