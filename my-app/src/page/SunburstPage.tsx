import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets'
import { Button, HeaderTitle, SunburstChart } from '../components';
import { GetIcon, PageClasses, HeaderClasses, ButtonLINKClasses, PageContainClasses, GridClasses } from '../utils';

const SunburstPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
  },[])

  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('Sunburst')} className={HeaderClasses} title='SUNBURST'/>
      <div className={PageContainClasses} >
        <img
          className={GridClasses}
          src={grid}
          alt="Grid"
        />
        <div className='font-Roboto text-2xl font-extralight'>
          <SunburstChart />
        SUNBURST
        </div>
      </div>
      <div className='mt-5'>
        <Button Icon={GetIcon('home')} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default SunburstPage;
