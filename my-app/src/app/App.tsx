import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import MainPage from './MainPage';
import BookingsPage from './BookingsPage';
import FacilitiesPage from './FacilitiesPage';
import VisitorsPage from './VisitorsPage';
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
                <Route path="/" element={<MainPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/facilities" element={<FacilitiesPage />} />
                <Route path="/visitors" element={<VisitorsPage />} />
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