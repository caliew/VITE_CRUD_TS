// my-app/src/components/HomePage.tsx
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

import { grid } from '../assets';
import { Button, HeaderTitle, Clock, EChartTemplate } from "../components";
import { GetIcon, GetJWTToken, ButtonClasses, ButtonLINKClasses, PageClasses, 
         PageHeaderClasses, PageContainClasses, GridClasses } from '../utils';

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
      <HeaderTitle Icon={GetIcon('home')} className={PageHeaderClasses} title='MAIN MENU'/>
      <Clock />
      <div className={PageContainClasses}>
        <img
          className={GridClasses}
          src={grid}
          alt="Grid"
        />
        <div className='flex flex-col mt-5'>
        <Button Icon={GetIcon('')} className={ButtonClasses} >FEATURES</Button>
        <Button Icon={GetIcon('IOTPortal')} className={ButtonLINKClasses} to='/IOTPortals'>IOT PORTAL</Button>
        <Button Icon={GetIcon('SPKAPortal')} className={ButtonLINKClasses} to='/SPKAPortals'>SPKA PORTAL</Button>
        <Button Icon={GetIcon('MapPinHouse')} className={ButtonLINKClasses} to='/sitemap'>SITE MAP</Button>
        <Button Icon={GetIcon('Gauge')} className={ButtonLINKClasses} to='/gauge'>GAUGE</Button>
        <Button Icon={GetIcon('ChartSpline')} className={ButtonLINKClasses} to='/charting'>CHARTING</Button>
        <Button Icon={GetIcon('Calendar')} className={ButtonLINKClasses} to='/calendar'>CALENDER</Button>
        <Button Icon={GetIcon('Sunburst')} className={ButtonLINKClasses} to='/sunburst'>SUNBURST</Button>
        {/* <Button Icon={GetIcon('workers')} className={ButtonLINKClasses} to="/workers">WORKERS LISTS</Button> */}
        {/* <Button Icon={GetIcon('restaurants')} className={ButtonLINKClasses} to='/restaurants'>RESTAURANTS LISTS</Button> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
