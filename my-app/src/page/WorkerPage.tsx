// my-app/src/components/WorkerPage.tsx
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets';
import { Button, HeaderTitle } from '../components';
import { GetIcon, GetJWTToken, PageClasses, PageHeaderClasses, ButtonClasses, ButtonLINKClasses, PageContainClasses, GridClasses } from '../utils';

import { Worker } from '../models/Worker';
import { fetchWorkers } from '../redux/features/workersSlice';

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
    const token = GetJWTToken();
    if (!token) {
      navigate('/login', { replace: true, state: { error: 'Invalid or expired token' } });
    }
  },[])

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('workers')} className={PageHeaderClasses} title='WORKERS'/>
      <div className={PageContainClasses}>
        <img
          className={GridClasses}
          src={grid}
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
      <div className=''>
        <Button Icon={GetIcon('home')} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default WorkerPage;