// my-app/src/components/HomePage.tsx
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

import { grid } from '../assets';
import { Button, HeaderTitle } from "../components";
import { GetIcon, GetToken, ButtonClasses, HeaderClasses } from '../utils';

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const token = GetToken();
    if (!token) {
      navigate('/login', { replace: true, state: { error: 'Invalid or expired token' } });
    }
  },[])  

  return (
    <div className="mt-15 font-Roboto flex flex-col items-center justify-center">
      <HeaderTitle Icon={GetIcon('home')} className={HeaderClasses} title='MAIN MENU'/>
      <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
        <img
          className="absolute top-0 left-0 max-w-full"
          src={grid}
          width={550}
          height={550}
          alt="Grid"
        />
        <Button Icon={GetIcon('iotportal')} className={ButtonClasses} href='/iotportals'>IOT PORTAL</Button>
        {/* <Button Icon={GetIcon('restaurants')} className={ButtonClasses} href='/restaurants'>RESTAURANTS LISTS</Button> */}
        {/* <Button Icon={GetIcon('workers')} className={ButtonClasses} href="/workers">WORKERS LISTS</Button> */}
      </div>
    </div>
  );
};

export default HomePage;
