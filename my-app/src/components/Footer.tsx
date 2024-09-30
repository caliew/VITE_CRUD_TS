// my-app/src/components/Footer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { AppConfig } from '../config';


const Footer = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: 2, backgroundColor: '#f0f0f0' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>
        &copy; 2023 {AppConfig.companyName}
      </Typography>
    </Box>
  );
};

export default Footer;