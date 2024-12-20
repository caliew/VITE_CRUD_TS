import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets'
import { Button, HeaderTitle, SimpleGauge, CarGauge, LineChart, BarChart, Calender } from '../components';
import { GetIcon, PageClasses, PageHeaderClasses, ButtonLINKClasses, PageContainClasses, GridClasses } from '../utils';

const GaugePage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
  },[])

  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('Gauge')} className={PageHeaderClasses} title='GAUGE'/>
      <div className={PageContainClasses} >
        <img
          className={GridClasses}
          src={grid}
          alt="Grid"
        />
        <div className='flex justify-center items-center flex-wrap gap-5'>
          <div className=''>
            <SimpleGauge value={35} className='w-[850]' title='TEMP' min={20} max={65} unit='°C' />
            <SimpleGauge value={75} className='' title='RH' min={0} max={100} unit='RH' />
          </div>
          <CarGauge className='' title='CUSTOMED GAUGE'/>
        </div>
      </div>
      <div className='mt-5'>
        <Button Icon={GetIcon('home')} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default GaugePage;
