// my-app/src/components/Footer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: 2, backgroundColor: '#f0f0f0' }}>
      <Typography variant="body2" component="p">
        &copy; 2023 My App
      </Typography>
    </Box>
  );
};

export default Footer;