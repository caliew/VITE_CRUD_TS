// my-app/src/components/WorkerPage.tsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Worker } from '../models/Worker';
import { fetchWorkers, deleteWorker, updateWorker } from '../redux/features/workersSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>FUNCTION</Typography></TableCell>
  </TableRow>
  );
};

const TableRowComponent : React.FC<TableRowComponentProps> = ({ worker, isEditingRow, setIsEditingRow }) => {

  const dispatch = useDispatch();

  const handleDelete = async () => await dispatch(deleteWorker(worker.id));
  const handleUpdate = async () => setIsEditingRow(worker.id);
  const handleCancel = async () => setIsEditingRow(null);

  return (
    <TableRow key={worker.id}>
      { isEditingRow === worker.id ? (
        <Formik
          initialValues={{
            id: worker.id,
            name: worker.name,
            restaurantId: worker.restaurantId,
          }}
          onSubmit={async (values) => {
            try {
              await dispatch(updateWorker(values));
              await dispatch(fetchWorkers());
              setIsEditingRow(null);
            } catch (error) {
              console.error(error);
            }
          }} >
          {({ isSubmitting, values, handleChange, handleSubmit }) => (
            <>
              <TableCell>
                <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'red' }}>{values.id}</Typography>
              </TableCell>
              <TableCell>
                <Field 
                  type="text" 
                  name="name" 
                  placeholder="Wroker Name" 
                  value={values.name} 
                  onChange={handleChange}
                  style={{ fontSize: 18, fontWeight: 50, color: 'red' }} />
              </TableCell>
              <TableCell>
                <Field 
                  type="text" 
                  name="restaurantId" 
                  placeholder="Restaurant Ids" 
                  value={values.restaurantId} 
                  onChange={handleChange}
                  style={{ fontSize: 18, fontWeight: 50, color: 'red' }} />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" disabled={isSubmitting} onClick={handleSubmit}>UPDATE</Button>
                <Button variant="contained" color="secondary" disabled={isSubmitting} onClick={handleCancel}>CANCEL</Button>
              </TableCell>
            </>
          )}
        </Formik>
      ) : (
      <>
        <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.id}</Typography></TableCell>
        <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.name}</Typography></TableCell>
        <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.restaurantId}</Typography></TableCell>
        <TableCell>
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            UPDATE
          </Button>
        </TableCell>
      </>)}
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
      <Typography variant="h3" component="h1">
        WORKERS LISTS
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