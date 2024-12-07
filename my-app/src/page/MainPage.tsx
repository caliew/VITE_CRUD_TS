// my-app/src/components/HomePage.tsx
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

import { grid } from '../assets';
import { Button, HeaderTitle } from "../components";
import { GetIcon, GetJWTToken, ButtonClasses, ButtonLINKClasses, PageClasses, HeaderClasses, PageContainClasses, GridClasses } from '../utils';

const HomePage = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const token = GetJWTToken();
    if (!token) {
      navigate('/404', { replace: true, state: { error: 'Invalid or expired token' } });
    }
  },[])  

  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('home')} className={HeaderClasses} title='MAIN MENU'/>
      <div className={PageContainClasses}>
        <img
          className={GridClasses}
          src={grid}
          alt="Grid"
        />
        <div className='flex flex-col mt-5'>
        <Button Icon={GetIcon('')} className={ButtonClasses} >FEATURES</Button>
        <Button Icon={GetIcon('iotportal')} className={ButtonLINKClasses} to='/iotportals'>IOT PORTAL</Button>
        <Button Icon={GetIcon('MapPinHouse')} className={ButtonLINKClasses} to='/layout'>SITE MAP</Button>
        <Button Icon={GetIcon('workers')} className={ButtonLINKClasses} to="/workers">WORKERS LISTS</Button>
        <Button Icon={GetIcon('restaurants')} className={ButtonLINKClasses} to='/restaurants'>RESTAURANTS LISTS</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
