// my-app/src/components/WorkerPage.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchWorkers } from '../redux/features/workersSlice';

const WorkerPage = () => {
  const dispatch = useDispatch();
  const workers = useSelector((state: any) => state.workers.workers);
  const loading = useSelector((state: any) => state.workers.loading);
  const error = useSelector((state: any) => state.workers.error);

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  return (
    <Box sx={{ textAlign: 'center', margin: '0 auto', padding: 4, maxWidth: 800 }}>
      <Typography variant="h2" component="h1">
        Workers
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Restaurant ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell>{worker.id}</TableCell>
                <TableCell>{worker.name}</TableCell>
                <TableCell>{worker.restaurantId}</TableCell>
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

export default WorkerPage;