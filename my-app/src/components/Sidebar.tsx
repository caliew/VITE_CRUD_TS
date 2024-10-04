// my-app/src/components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../redux/features/authSlice';
import { removeToken, getToken } from '../utils/api/auth';

const Sidebar = () => {

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <List>
      <ListItem button component={Link} to="/home">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText>
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>HOME</Typography>
        </ListItemText>
      </ListItem>
      {token && (
        <>
          <ListItem button component={Link} to="/restaurants">
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText>
            <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>RESTAURANTS</Typography>
            </ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/workers">
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText>
            <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>WORKERS</Typography>
            </ListItemText>
          </ListItem>
        </>)
      }
      <ListItem button onClick={handleLogout} component={Link} to="/">
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>
        <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>LOGOUT</Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default Sidebar;