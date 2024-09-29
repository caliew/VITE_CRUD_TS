// my-app/src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1.5, fontSize: 32, fontWeight: 100 }}>
          Application Name
        </Typography>
        <Link to="/">
          <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>HOME</Typography>
        </Link>
        <Link to="/restaurants">
          <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>RESTAURANTS</Typography>
        </Link>
        <Link to="/workers">
          <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>WORKERS</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;