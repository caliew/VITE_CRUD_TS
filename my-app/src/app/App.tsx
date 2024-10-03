import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import RestaurantPage from './RestaurantPage';
import WorkerPage from './WorkerPage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import './app.css';

const App = () => {
  return (
    <div>
      <BrowserRouter >
        <Header />
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={2} sx={{ padding: 2 }}>
              <Sidebar />
            </Grid>
            <Grid item xs={10} sx={{ padding: 2 }}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/restaurants" element={<RestaurantPage />} />
                <Route path="/workers" element={<WorkerPage />} />
              </Routes>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;