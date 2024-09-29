// my-app/src/components/TableRowWithActions.tsx
import React from 'react';
import { TableRow, TableCell, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Restaurant } from '../models/Restaurant';
import { useDispatch } from 'react-redux';
import { fetchRestaurants, deleteRestaurant } from '../redux/features/restaurantsSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface TableRowWithActionsProps {
  restaurant: Restaurant;
}

const TableRowWithActions: React.FC<TableRowWithActionsProps> = ({ restaurant }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteRestaurant(restaurant.id));
    dispatch(fetchRestaurants());
  };

  const handleSelect = () => {
    // TO DO: implement select functionality
  };

  return (
    <TableRow key={restaurant.id}>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{restaurant.id}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{restaurant.name}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{restaurant.address}</Typography></TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={handleSelect}>
          Select
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableRowWithActions;