// my-app/src/components/WorkerPage.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Worker } from '../models/Worker';
import { fetchWorkers } from '../redux/features/workersSlice';
import { Button } from '../components';
import { grid } from '../assets';

const TableHeaders = ({className}:any) => {
  return (
    <thead className={className}>
      <tr className=''>
        <th className={className}>ID</th>
        <th className={className}>NAME</th>
        <th className={className}>RESTAURANT ID</th>
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
      <div className='font-Roboto font-extralight text-4xl justify-center items-center mt-15 mb-15'>WORKERS</div>
      <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
        <img
          className="absolute top-0 left-0 w-full"
          src={grid}
          width={550}
          height={550}
          alt="Grid"
        />
        <table className='table-auto border-separate border-spacing-x-15 font-Roboto font-extralight text-2xl '>
          <TableHeaders className='font-extralight border-b-2'/>
          <tbody className='items-center justify-center'>
            {workers.map((worker:Worker) => (
              <TableRowComponent key={worker.id} worker={worker} />
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-10 font-Roboto font-extralight text-2xl'>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default WorkerPage;