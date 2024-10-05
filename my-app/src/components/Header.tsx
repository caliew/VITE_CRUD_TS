// my-app/src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppConfig } from '../config';
import HomeIcon from '../assets/verified.svg';
import { logout } from '../redux/features/authSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'block'}}>
        <div style={{ margin:'5px' }}>
          <IconButton edge="start" color="inherit" >
            <img src={HomeIcon} style={{width: 64, height: 64}} alt="Home Icon" />
            <Typography variant="h3" component="div" sx={{ flexGrow: 1.5, fontSize: 32, fontWeight: 100 }}>{AppConfig.applicationName}</Typography>
          </IconButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}>
          <Link to="/home"><Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>HOME</Typography></Link>
          { token && (
            <>
              <Link to="/restaurants"><Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>RESTAURANTS</Typography></Link>
              <Link to="/workers"><Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>WORKERS</Typography></Link>
            </>
           )}
           <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2, cursor: 'pointer' }} onClick={handleLogout}>LOGOUT</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;