import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, Grid, Container } from '@mui/material';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

import LoginPage from './LoginPage';
import HomePage from './HomePage';
import RestaurantPage from './RestaurantPage';
import WorkerPage from './WorkerPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import './app.css';

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'headerTitle' },
          style: () => ({
            fontSize: 40,
            fontWeight: 10,
            fontFamily: 'Roboto',
            margin: 'auto',
            color: 'white',
          }),
        },
        {
          props: { variant: 'headerMenu' },
          style: () => ({
            fontSize: 18,
            fontWeight: 10,
            fontFamily: 'Roboto',
            marginLeft:15,
            color: 'white',
          }),
        },
        {
          props: { variant: 'sidebarMenu' },
          style: () => ({
            fontSize: 18,
            fontWeight: 10,
            marginLeft: 5,
            fontFamily: 'Roboto',
            color: 'black',
          }),
        },
      ],
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter >
        <Header />
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={2} lg={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/restaurants" element={<RestaurantPage />} />
                <Route path="/workers" element={<WorkerPage />} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;