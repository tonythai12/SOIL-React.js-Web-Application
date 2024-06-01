import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';

const GET_USERS = gql`
  query {
    users {
      user_id
      username
      email
      created_at
      blocked
    }
  }
`;

const BLOCK_USER = gql`
  mutation BlockUser($userId: ID!) {
    blockUser(user_id: $userId) {
      user_id
      blocked
    }
  }
`;

const UNBLOCK_USER = gql`
  mutation UnblockUser($userId: ID!) {
    unblockUser(user_id: $userId) {
      user_id
      blocked
    }
  }
`;

export default function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [blockUser] = useMutation(BLOCK_USER, {
    update(cache, { data: { blockUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      const updatedUsers = users.map((user) =>
        user.user_id === blockUser.user_id ? { ...user, blocked: true } : user
      );
      cache.writeQuery({
        query: GET_USERS,
        data: { users: updatedUsers },
      });
    },
  });

  const [unblockUser] = useMutation(UNBLOCK_USER, {
    update(cache, { data: { unblockUser } }) {
      const { users } = cache.readQuery({ query: GET_USERS });
      const updatedUsers = users.map((user) =>
        user.user_id === unblockUser.user_id ? { ...user, blocked: false } : user
      );
      cache.writeQuery({
        query: GET_USERS,
        data: { users: updatedUsers },
      });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const toggleBlockUser = (userId) => {
    const user = data.users.find((user) => user.user_id === userId);
    if (user.blocked) {
      unblockUser({ variables: { userId } });
    } else {
      blockUser({ variables: { userId } });
    }
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
  {data.users.map((user, index) => {
    const createdAtTimestamp = parseInt(user.created_at);
    const createdAtDate = new Date(createdAtTimestamp);
    const createdAt = createdAtDate.toLocaleDateString();
    return (
      <TableRow key={user.user_id}>
        <TableCell align='center'>{index + 1}</TableCell>
        <TableCell align='center'>{user.username}</TableCell>
        <TableCell align='center'>{user.email}</TableCell>
        <TableCell align='center'>{createdAt}</TableCell>
        <TableCell align='center'>
          <Button
            variant='contained'
            color={user.blocked ? 'secondary' : 'primary'}
            onClick={() => toggleBlockUser(user.user_id)}
          >
            {user.blocked ? 'Unblock' : 'Block'}
          </Button>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}