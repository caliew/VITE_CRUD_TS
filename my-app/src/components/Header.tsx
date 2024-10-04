// my-app/src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppConfig } from '../config';
import { getToken } from '../utils/api/auth';
import HomeIcon from '../assets/verified.svg';

const Header = () => {
  const token = getToken();

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
          <Link to="/restaurants"><Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>RESTAURANTS</Typography></Link>
          <Link to="/workers"><Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>WORKERS</Typography></Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;