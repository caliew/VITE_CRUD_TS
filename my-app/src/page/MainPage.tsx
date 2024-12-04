// my-app/src/components/HomePage.tsx
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Button, HeaderTitle } from "../components";
import { grid } from '../assets';
import { CircuitBoard, Utensils, House, User } from 'lucide-react';
import { getToken } from '../utils/api/auth';

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const token = getToken();
    if (!token) {
      navigate('/login', { replace: true, state: { error: 'Invalid or expired token' } });
    }
  },[])  

  return (
    <div className="mt-15 font-Roboto flex flex-col items-center justify-center">
      <HeaderTitle Icon={House} className="inline-flex size-24" title='MAIN MENU'/>
      <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
        <img
          className="absolute top-0 left-0 max-w-full"
          src={grid}
          width={550}
          height={550}
          alt="Grid"
        />
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-2" href='/iotportals'>
          <div className="flex px-5"><CircuitBoard /><span className="px-5"/>IOT PORTAL</div>
        </Button>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-2" href='/restaurants'>
          <div className="flex px-5"><Utensils /><span className="px-5"/>RESTAURANTS LISTS</div>
        </Button>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-2" href="/workers">
          <div className="flex px-5"><User className="inline-flex"/><span className="px-5"/>WORKERS LISTS</div>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
