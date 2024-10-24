// my-app/src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1.5, fontSize: 32, fontWeight: 100 }}>
          CORPORATE PASS BOOKING SYSTEM
        </Typography>
        <Link to="/">
          <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>HOME</Typography>
        </Link>
        <Link to="/bookings">
          <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>BOOKING</Typography>
        </Link>
        <Link to="/facilities">
          <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>FACILITIES</Typography>
        </Link>
        <Link to="/visitors">
          <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>VISITORS</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;