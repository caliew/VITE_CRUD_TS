// my-app/src/components/WorkerPage.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Worker } from '../models/Worker';
import { fetchWorkers } from '../redux/features/workersSlice';
import { Button } from '../components';

const TableHeaders = () => {
  return (
    <thead>
      <tr className=''>
        <td>ID</td>
        <td>NAME</td>
        <td>RESTAURANT ID</td>
      </tr>
    </thead>
  );
};

const TableRowComponent = ({ worker }:{ worker: Worker}) => {
  return (
    <tr key={worker.id}>
      <td>{worker.id}</td>
      <td>{worker.name}</td>
      <td className='text-center'>{worker.restaurantId}</td>
    </tr>
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
    <div className='mt-5 font-Roboto flex flex-col items-center justify-center'>
      <div className='font-Roboto font-extralight text-5xl justify-center items-center mt-15 mb-15'>WORKERS</div>
      <table className='border-separate border-spacing-x-15 table-auto font-Roboto font-extralight text-2xl '>
        <TableHeaders />
        <tbody className='items-center justify-center'>
          {workers.map((worker:Worker) => (
            <TableRowComponent key={worker.id} worker={worker} />
          ))}
        </tbody>
      </table>
      <div className='mt-10 font-Roboto font-extralight text-2xl'>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default WorkerPage;