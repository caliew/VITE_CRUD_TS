// my-app/src/components/WorkerPage.tsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Worker } from '../models/Worker';
import { fetchWorkers, deleteWorker } from '../redux/features/workersSlice';

interface TableRowComponentProps {
  worker: Worker;
  isEditingRow: null|boolean;
  setIsEditingRow: (id: number) => void;
}

const TableHeaders = () => {
  return (
    <TableRow>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>ID</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>NAME</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>RESTAURANT ID</Typography></TableCell>
  </TableRow>
  );
};

const TableRowComponent : React.FC<TableRowComponentProps> = ({ worker, isEditingRow, setIsEditingRow }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteWorker(worker.id));
  };  
  return (
    <TableRow key={worker.id}>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.id}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.name}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.restaurantId}</Typography></TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
  </TableRow>
  );
};

const WorkerPage = () => {
  const dispatch = useDispatch();
  const workers = useSelector((state: any) => state.workers.workers);
  const [isEditingRow, setIsEditingRow] = useState<boolean | null>(null);

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  const handleUpdateClick = (id:any) => {
    if (isEditingRow !== id) {
      setIsEditingRow(id);
    } else {
      setIsEditingRow(null);
    }
  };

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
              <TableRowComponent key={worker.id} worker={worker} isEditingRow={isEditingRow} setIsEditingRow={handleUpdateClick} />
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