// my-app/src/components/WorkerPage.tsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Worker } from '../models/Worker';
import { fetchWorkers, deleteWorker, updateWorker, addWorker } from '../redux/features/workersSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface TableRowComponentProps {
  worker: Worker;
  isEditingRow: null|boolean;
  setIsEditingRow: (id: number) => void;
}

const TableHeaders = () => {
  return (
    <TableRow>
      <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>ID</Typography></TableCell>
      <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>NAME</Typography></TableCell>
      <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>RESTAURANT ID</Typography></TableCell>
      <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>FUNCTIONS</Typography></TableCell>
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
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Worker name is required';
            }
            if (!values.restaurantId) {
              errors.restaurantId = 'Restaurant Id is required';
            }
            return errors;
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
          {({ isSubmitting, values, handleChange, handleSubmit, errors }) => (
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
                  style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: 18, fontWeight: 50, color: 'red' }} />
                  { errors.name && <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'red' }}>{errors.name}</Typography> }
              </TableCell>
              <TableCell>
                <Field 
                  type="text" 
                  name="restaurantId" 
                  placeholder="Restaurant Ids" 
                  value={values.restaurantId} 
                  onChange={handleChange}
                  style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: 18, fontWeight: 50, color: 'red' }} />
                  { errors.restaurantId && <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'red' }}>{errors.restaurantId}</Typography> }
              </TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" disabled={isSubmitting} onClick={handleSubmit}>
                  <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>UPDATE</Typography>
                </Button>
                <Button variant="contained" color="secondary" disabled={isSubmitting} onClick={handleCancel}>
                  <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>CANCEL</Typography>                  
                </Button>
              </TableCell>
            </>
          )}
        </Formik>
      ) : (
      <>
        <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.id}</Typography></TableCell>
        <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.name}</Typography></TableCell>
        <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>{worker.restaurantId}</Typography></TableCell>
        <TableCell style={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleDelete}>
            <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>Delete</Typography>
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>UPDATE</Typography>
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

  const handleAddWorker = async (value: Worker, setValues: (values: Worker) => void) => {
    try {
      const restaurantId = parseInt(value.restaurantId);
      await dispatch(addWorker({ ...value, restaurantId }));
      await dispatch(fetchWorkers());
      // Reset the form values
      setValues({ name: '', restaurantId: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', margin: '0 auto', padding: 4, maxWidth: 800 }}>
      <Typography sx={{ fontSize: 32, fontWeight: 200, margin:'25px', color: 'black' }}>
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


      <Typography sx={{ fontSize: 24, fontWeight: 200, margin:'25px', color: 'black' }}>Add New Worker</Typography>
      <Formik
        initialValues={{
          name: '',
          restaurantId: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Worker name is required';
          }
          if (!values.restaurantId) {
            errors.restaurantId = 'Restaurant Id is required';
          }
          return errors;
        }}
        onSubmit={(values, { setValues }) => handleAddWorker(values, setValues)}
        >
        {({ isSubmitting, values, handleChange, handleSubmit, handleReset, errors }) => (
          <Form>
            <Field 
              type="text" 
              name="name" 
              placeholder="Worker Name" 
              style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: 18, fontWeight: 50, color: 'red' }} />
            {errors.name && <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'red' }}>{errors.name}</Typography> }
            <Field 
              type="text" 
              name="restaurantId" 
              placeholder="Restaurant Id" 
              style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: 18, fontWeight: 50, color: 'red' }} />
            {errors.restaurantId && <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'red' }}>{errors.restaurantId}</Typography> }

            <div style={{marginTop:10}}>
              <Button variant="contained" color="primary" disabled={isSubmitting} onClick={handleSubmit}>
                <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>Add Worker</Typography>
              </Button>
              <Button variant="contained" color="secondary" onClick={handleReset}>
                <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>Reset</Typography>
              </Button>
            </div>

          </Form>
        )}
      </Formik>

      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" component={Link} to="/">
          <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>BACK TO HOME PAGE</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default WorkerPage;