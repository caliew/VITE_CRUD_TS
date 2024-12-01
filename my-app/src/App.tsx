import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { MainPage, RestaurantPage, WorkerPage } from './page';
import { Header, Footer, Sidebar } from './components';

const App = () => {
  return (
    <div className=''>
      <Router >
        <Header />
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={2} sx={{ padding: 2 }}>
              <Sidebar />
            </Grid>
            <Grid item xs={10} sx={{ padding: 2 }}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/restaurants" element={<RestaurantPage />} />
                <Route path="/workers" element={<WorkerPage />} />
              </Routes>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Router>
    </div>
  );
};

export default App;