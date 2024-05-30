import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Outlet, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

export default function MainPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('user');

  const handleNavigate = (pathName) => {
    setSelectedTab(pathName);
    navigate(`/admin/${pathName}`);
  };
  return (
    <Stack
      sx={{
        height: '100vh',
        width: '`100%',
      }}
    >
      <AppBar position='static'>
        <Toolbar>
          <h1 style={{ flexGrow: 1 }}>SOIL</h1>
          <Tabs value={selectedTab}>
            <Tab
              label='Users'
              onClick={() => handleNavigate('user')}
              sx={{
                backgroundColor:
                  selectedTab === 'user' ? '#2196f3' : 'transparent',
                color: '#000',
                fontWeight: 600,
                fontSize: 20,
              }}
            />
            <Tab
              label='Products'
              onClick={() => handleNavigate('product')}
              sx={{
                backgroundColor:
                  selectedTab === 'product' ? '#2196f3' : 'transparent',
                color: '#000',
                fontWeight: 600,
                fontSize: 20,
              }}
            />
            <Tab
              label='Reviews'
              onClick={() => handleNavigate('review')}
              sx={{
                backgroundColor:
                  selectedTab === 'review' ? '#2196f3' : 'transparent',
                color: '#000',
                fontWeight: 600,
                fontSize: 20,
              }}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Stack>
  );
}
