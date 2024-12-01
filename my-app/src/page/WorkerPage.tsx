// my-app/src/components/WorkerPage.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Worker } from '../models/Worker';
import { fetchWorkers } from '../redux/features/workersSlice';

const TableHeaders = () => {
  return (
    <TableRow>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>ID</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>NAME</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>RESTAURANT ID</Typography></TableCell>
  </TableRow>
  );
};

const TableRowComponent = ({ worker }) => {
  return (
    <TableRow key={worker.id}>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.id}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.name}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.restaurantId}</Typography></TableCell>
  </TableRow>
  );
};

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
            <TableHeaders />
          </TableHead>
          <TableBody>
            {workers.map((worker:Worker) => (
              <TableRowComponent key={worker.id} worker={worker} />
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

export default WorkerPage;