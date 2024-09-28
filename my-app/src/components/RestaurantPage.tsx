import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getRestaurants } from '../utils/api/restaurants';
import { Restaurant } from '../models/Restaurant';

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    getRestaurants()
      .then((data) => setRestaurants(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box sx={{ textAlign: 'center', margin: '0 auto', padding: 4, maxWidth: 800 }}>
      <Typography variant="h2" component="h1">
        Restaurants
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.id}</TableCell>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" component={Link} to="/">
          Back to Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default RestaurantPage;