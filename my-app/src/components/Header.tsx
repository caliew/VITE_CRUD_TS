// my-app/src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppConfig } from '../config';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'block'}}>
        <div style={{ margin:'5px' }}>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1.5, fontSize: 32, fontWeight: 100 }}>{AppConfig.applicationName}</Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Link to="/"><Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>HOME</Typography></Link>
          <Link to="/restaurants"><Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>RESTAURANTS</Typography></Link>
          <Link to="/workers"><Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white', marginLeft: 2 }}>WORKERS</Typography></Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;