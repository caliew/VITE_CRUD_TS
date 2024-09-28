import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box sx={{ textAlign: 'center', margin: '0 auto', padding: 4, maxWidth: 800 }}>
      <Typography variant="h2" component="h1">
        Welcome to our application!
      </Typography>
      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" component={Link} to="/restaurants">
          View Restaurants
        </Button>
        <Button variant="contained" component={Link} to="/workers" sx={{ marginLeft: 2 }}>
          View Workers
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;