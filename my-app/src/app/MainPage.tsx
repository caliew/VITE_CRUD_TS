import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Box sx={{ textAlign: 'center', margin: '0 auto', padding: 4, maxWidth: 800 }}>
        <Typography variant="h3" component="h3">
          HOME PAGE
        </Typography>
        <Box sx={{ marginTop: 4 }}>
          <Button variant="contained" component={Link} to="/bookings">
            <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>VIEW BOOKINGS</Typography>
          </Button>
          <Button variant="contained" component={Link} to="/facilities" sx={{ marginLeft: 2 }}>
            <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>VIEW FACILITIES</Typography>
          </Button>
          <Button variant="contained" component={Link} to="/visitors" sx={{ marginLeft: 2 }}>
            <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>VIEW VISITORS</Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;