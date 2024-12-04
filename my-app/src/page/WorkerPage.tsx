// my-app/src/components/WorkerPage.tsx
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets';
import { Camera, User } from 'lucide-react';
import { Worker } from '../models/Worker';
import { fetchWorkers } from '../redux/features/workersSlice';
import { Button, HeaderTitle } from '../components';
import { getToken } from '../utils/api/auth';

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
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workers = useSelector((state: any) => state.workers.workers);

  useEffect(()=>{
    const token = getToken();
    if (!token) {
      navigate('/login', { replace: true, state: { error: 'Invalid or expired token' } });
    }
  },[])

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  return (
    <div className='mt-15 font-Roboto flex flex-col items-center justify-center'>
      <HeaderTitle Icon={User} className="inline-flex size-24" title='WORKERS'/>
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
            {workers && workers.map((worker:Worker) => (
              <TableRowComponent key={worker.id} worker={worker} />
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-10 font-Roboto font-extralight text-2xl'>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href="/">
        <div><Camera className="inline-flex"/><span className="px-5"/>BACK TO HOME</div>
        </Button>
      </div>
    </div>
  );
};

export default WorkerPage;