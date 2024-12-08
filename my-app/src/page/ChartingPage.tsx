import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets'
import { Button, HeaderTitle, SimpleGauge, CarGauge, LineChart } from '../components';
import { GetIcon, PageClasses, HeaderClasses, ButtonLINKClasses, PageContainClasses, GridClasses } from '../utils';

const ChartingPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
  },[])

  const Series = ['PREP(2015)','PREP(2016)']
  const DataX = ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12'];
  const DataY = [[ 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3 ],
                 [ 3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7 ]]

  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('ChartSpline')} className={HeaderClasses} title='CHARTING'/>
      <div className={PageContainClasses} >
        <img
          className={GridClasses}
          src={grid}
          alt="Grid"
        />
        <div className='flex flex-wrap'>
          <div>
            <SimpleGauge value={35} className='' name='TEMP' min={20} max={65} unit='°C' />
            <SimpleGauge value={75} className='' name='RH' min={0} max={100} unit='RH' />
          </div>
          <CarGauge className='' name='CUSTOMED GAUGE'/>
          <LineChart className='' name='LINE PLOT' dataX={DataX} dataY={DataY} series={Series}/>
        </div>
      </div>
      <div className='mt-5'>
        <Button Icon={GetIcon('home')} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default ChartingPage;
