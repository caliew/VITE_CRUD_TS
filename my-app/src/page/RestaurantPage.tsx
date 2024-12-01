// my-app/src/components/RestaurantPage.tsx
import { useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Restaurant } from '../models/Restaurant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurants } from '../redux/features/restaurantsSlice';

const TableHeaders = () => {
  return (
    <TableRow>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>ID</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>NAME</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>ADDRESS</Typography></TableCell>
    </TableRow>
  );
};

const TableRowComponent = ({ restaurant }) => {
  return (
    <TableRow key={restaurant.id}>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{restaurant.id}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{restaurant.name}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{restaurant.address}</Typography></TableCell>
    </TableRow>
  );
};

const RestaurantPage = () => {

  const dispatch = useDispatch();
  const restaurants = useSelector((state: any) => state.restaurants.restaurants);

  useEffect(() => {
    console.log('Fetching Restaurants...')
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <Box sx={{ textAlign: 'center', margin: '0 auto', padding: 4, maxWidth: 800 }}>
      <Typography variant="h2" component="h1">
        Restaurants
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableHeaders />
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant:Restaurant) => (
              <TableRowComponent key={restaurant.id} restaurant={restaurant} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" component={Link} to="/">
          <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>BACK TO HOME PAGE</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default RestaurantPage;