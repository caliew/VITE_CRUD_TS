import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) navigate('/');
  }, []);

  if (!token) return null;

  return (
    <div>
      <Box sx={{ textAlign: 'center', margin: '0 auto', padding: 4, maxWidth: 800 }}>
      <Typography sx={{ fontSize: 32, fontWeight: 200, margin:'25px', color: 'black' }}>
          HOME PAGE
        </Typography>
        <Box sx={{ marginTop: 4 }}>
          <Button variant="contained" component={Link} to="/restaurants">
            <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>VIEW RESTAURANTS</Typography>
          </Button>
          <Button variant="contained" component={Link} to="/workers" sx={{ marginLeft: 2 }}>
            <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>VIEW WORKERS</Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;