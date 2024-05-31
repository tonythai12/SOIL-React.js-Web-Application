import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';

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
  {
    id: 7,
    username: 'user7',
    email: 'user7@example.com',
    created_at: '2022-05-31',
    blocked: false,
  },
  {
    id: 8,
    username: 'user8',
    email: 'user8@example.com',
    created_at: '2022-05-31',
    blocked: false,
  },
  {
    id: 9,
    username: 'user9',
    email: 'user9@example.com',
    created_at: '2022-05-31',
    blocked: false,
  },
  {
    id: 10,
    username: 'user10',
    email: 'user10@example.com',
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
      sx={{ textAlign: 'center' }}
    >
      <Stack sx={{ mt: 5, width: '80%' }}>
        <Stack>
          <Typography variant='h4' sx={{ margin: 2, textAlign: 'left' }}>
            Users : {initialUsers.length}
          </Typography>
        </Stack>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 700, overflow: 'auto' }}
        >
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell
                  align='center'
                  sx={{ fontWeight: 400, fontSize: '17px' }}
                >
                  Number
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontWeight: 400, fontSize: '17px' }}
                >
                  Username
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontWeight: 400, fontSize: '17px' }}
                >
                  Email
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontWeight: 400, fontSize: '17px' }}
                >
                  Created At
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontWeight: 400, fontSize: '17px' }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell align='center'>{user.username}</TableCell>
                  <TableCell align='center'>{user.email}</TableCell>
                  <TableCell align='center'>{user.created_at}</TableCell>
                  <TableCell align='center'>
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
