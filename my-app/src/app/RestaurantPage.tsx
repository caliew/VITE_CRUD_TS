// my-app/src/components/RestaurantPage.tsx
import { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { Link, useNavigate  } from 'react-router-dom';
import { Restaurant } from '../models/Restaurant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurants, deleteRestaurant, updateRestaurant, addRestaurant  } from '../redux/features/restaurantsSlice';
import { fetchWorkersByRestaurantId } from '../redux/features/workersSlice';
import { Formik, Form, Field } from 'formik';
import WorkerList from './WorkerList';
import { getToken } from '../utils/api/auth';


interface TableRowComponentProps {
  restaurant: Restaurant;
  isEditingRow: null|boolean;
  setIsEditingRow: (id: number) => void;
  isShowingWorkers: boolean;
  // setIsShowingWorkers: (showWorkers: boolean) => void;
}

const TableHeaders = () => {
  return (
    <TableRow>
      <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>ID</Typography></TableCell>
      <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>NAME</Typography></TableCell>
      <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>ADDRESS</Typography></TableCell>
      <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>FUNCTIONS</Typography></TableCell>
    </TableRow>
  );
};

const TableRowComponent: React.FC<TableRowComponentProps> = ({ restaurant, isEditingRow, setIsEditingRow  }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => await dispatch(deleteRestaurant(restaurant.id));
  const handleUpdate = async () => setIsEditingRow(restaurant.id);
  const handleCancel = async () => setIsEditingRow(null);
  const [isShowingWorkers, setIsShowingWorkers] = useState(true);
  
  const handleToggleWorkers = () => setIsShowingWorkers(!isShowingWorkers);

  return (
    <TableRow key={restaurant.id}>
      { isEditingRow === restaurant.id ? (
        <Formik
          initialValues={{
            id: restaurant.id,
            name: restaurant.name,
            address: restaurant.address,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Restaurant name is required';
            }
            if (!values.address) {
              errors.address = 'Restaurant address is required';
            }
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              await dispatch(fetchRestaurants());
              await dispatch(updateRestaurant(values));
              setIsEditingRow(null);
            } catch (error) {
              console.error(error);
            }
          }} >
          {({ isSubmitting, values, handleChange, handleSubmit, errors }) => (
            <>
              <TableCell>
                <Typography sx={{ fontFamily: 'Roboto',  textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'red' }}>{values.id}</Typography>
              </TableCell>
              <TableCell>
                <Field 
                  type="text" 
                  name="name" 
                  placeholder="Restaurant Name" 
                  value={values.name} 
                  onChange={handleChange}
                  style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: 18, fontWeight: 50, color: 'red' }} />
                {errors.name && <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'red' }}>{errors.name}</Typography> }
              </TableCell>
              <TableCell>
                <Field 
                  type="text" 
                  name="address" 
                  placeholder="Restaurant Address" 
                  value={values.address} 
                  onChange={handleChange}
                  style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: 18, fontWeight: 50, color: 'red' }} />
                {errors.address && <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'red' }}>{errors.address}</Typography> }
              </TableCell>
              <TableCell style={{textAlign: 'center'}}>
                <Button variant="contained" color="secondary" disabled={isSubmitting} onClick={handleSubmit}>
                  <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>SAVE</Typography>
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
          <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>{restaurant.id}</Typography></TableCell>
          <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>{restaurant.name}</Typography></TableCell>
          <TableCell><Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 100, color: 'black' }}>{restaurant.address}</Typography></TableCell>
          <TableCell style={{textAlign: 'center'}}>
            <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginRight: 5 }}>
              <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>EDIT</Typography>
            </Button>
            <Button variant="contained" color="primary" onClick={handleDelete} style={{ marginRight: 5 }}>
              <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>DELETE</Typography>
            </Button>
            <Button variant="contained" color="primary" onClick={() => {
                handleToggleWorkers();
                dispatch(fetchWorkersByRestaurantId(restaurant.id)) 
              }}>
              <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>LIST</Typography>
            </Button>
            { isShowingWorkers && <WorkerList restaurant={restaurant} /> }
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

const RestaurantPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const restaurants = useSelector((state: any) => state.restaurants.restaurants);
  const { token } = useSelector((state) => state.auth);

  const [isEditingRow, setIsEditingRow] = useState<boolean | null>(null);

  if (!token) {
    // Navigate to /main when token is available
    navigate('/home')
  }

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleAddRestaurant = async (value: Restaurant, setValues: (values: Restaurant) => void) => {
    try {
      await dispatch(addRestaurant(value));
      await dispatch(fetchRestaurants());
      setValues({ name: '', address: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <Box sx={{ textAlign: 'center', margin: '0 auto', padding: 4, maxWidth: 800 }}>
      <Typography sx={{ fontSize: 32, fontWeight: 200, margin:'25px', color: 'black' }}>
        RESTAURANTS LISTS
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableHeaders />
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant:Restaurant) => (
              <TableRowComponent 
              key={restaurant.id} 
              restaurant={restaurant} 
              isEditingRow={isEditingRow} 
              setIsEditingRow={setIsEditingRow}
            />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography sx={{ fontSize: 24, fontWeight: 200, margin:'25px', color: 'black' }}>Add New Restaurant</Typography>
      <Formik
        initialValues={{
          name: '',
          address: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Restaurant name is required';
          }
          if (!values.address) {
            errors.address = 'Restaurant address is required';
          }
          return errors;
        }}
        onSubmit={(values, { setValues }) => handleAddRestaurant(values, setValues)}
      >
        {({ isSubmitting, values, handleChange, handleSubmit, handleReset, errors }) => (
          <Form>
            <Field 
              type="text" 
              name="name" 
              placeholder="Restaurant Name" 
              style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: 18, fontWeight: 50, color: 'red' }} />
            {errors.name && <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'red' }}>{errors.name}</Typography> }
            <Field 
              type="text" 
              name="address" 
              placeholder="Restaurant Address" 
              style={{ fontFamily: 'Roboto', textAlign: 'center', fontSize: 18, fontWeight: 50, color: 'red' }} />
            {errors.address && <Typography sx={{ fontSize: 18, fontWeight: 100, color: 'red' }}>{errors.address}</Typography> }
            <div style={{marginTop:10}}>
            <Button variant="contained" color="primary" disabled={isSubmitting} onClick={handleSubmit} style={{ marginRight: 5 }}>
              <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>Add Restaurant</Typography>
            </Button>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>Reset</Typography>
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" component={Link} to="/home">
          <Typography variant="body1" sx={{ fontSize: 18, fontWeight: 100, color: 'white' }}>BACK TO HOME PAGE</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default RestaurantPage;