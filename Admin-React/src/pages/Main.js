import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Outlet, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

export default function MainPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('');
  const pathName = window.location.pathname.split('/')[2];
  const appBarBgColor =
    selectedTab === 'product'
      ? '	#46BD7B'
      : selectedTab === 'review'
      ? '#FF9364'
      : '#1478CD';
  const handleNavigate = (pathName) => {
    setSelectedTab(pathName);
    navigate(`/admin/${pathName}`);
  };

  useEffect(() => {
    setSelectedTab(pathName);
  }, [pathName]);

  return (
    <Stack
      sx={{
        height: '100vh',
        width: '`100%',
      }}
    >
      {/* Menus */}
      <AppBar position='static' sx={{ bgcolor: appBarBgColor }}>
        <Toolbar>
          <h1 style={{ flexGrow: 1 }}>
            <span
              onClick={() => {
                navigate('/');
                setSelectedTab('');
              }}
              style={{ cursor: 'pointer' }}
            >
              {' '}
              SOIL
            </span>
          </h1>
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
                borderRadius: '10px',
              }}
            />
            <Tab
              label='Products'
              onClick={() => handleNavigate('product')}
              sx={{
                backgroundColor:
                  selectedTab === 'product' ? '	#82F9B7' : 'transparent',
                color: '#000',
                fontWeight: 600,
                fontSize: 20,
                borderRadius: '10px',
              }}
            />
            <Tab
              label='Reviews'
              onClick={() => handleNavigate('review')}
              sx={{
                backgroundColor:
                  selectedTab === 'review' ? '#FFCA9B' : 'transparent',
                color: '#000',
                fontWeight: 600,
                fontSize: 20,
                borderRadius: '10px',
              }}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Stack>
  );
}
