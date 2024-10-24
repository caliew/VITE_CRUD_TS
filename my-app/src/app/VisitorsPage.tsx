// my-app/src/components/WorkerPage.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Visitor } from '../models/Visitor';
import { fetchVisitors } from '../redux/features/visitorsSlice';

const TableHeaders = () => {
  return (
    <TableRow>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>ID</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>NAME</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>EMAIL</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>PHONE</Typography></TableCell>
  </TableRow>
  );
};

const TableRowComponent = ({ visitor }: { visitor: any }) => {
  if (!visitor) return null;
  return (
    <TableRow key={visitor.id}>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{visitor.id}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{visitor.name}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{visitor.email}</Typography></TableCell>
      <TableCell><Typography sx={{ fontSize: 18, fontWeight: 100, color: 'black' }}>{visitor.phoneNumber}</Typography></TableCell>
    </TableRow>
  );
};

const VisitorsPage = () => {
  const dispatch = useDispatch();
  const visitors = useSelector((state: any) => state.visitors.visitors);
  const loading = useSelector((state: any) => state.visitors.loading);
  const error = useSelector((state: any) => state.visitors.error);

  useEffect(() => {
    dispatch(fetchVisitors());
  }, [dispatch]);

  return (
    <Box sx={{ textAlign: 'center', margin: '0 auto', padding: 4, maxWidth: 800 }}>
      <Typography variant="h2" component="h1">
        VISITORS
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableHeaders />
          </TableHead>
          <TableBody>
            {visitors.map((visitor:any, index:number) => (
              <TableRowComponent key={index} visitor={visitor} />
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

export default VisitorsPage;