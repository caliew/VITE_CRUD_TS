import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets'
import { Button, HeaderTitle, SimpleGauge, CarGauge, LineChart, BarChart, Calender } from '../components';
import { GetIcon, PageClasses, PageHeaderClasses, ButtonLINKClasses, PageContainClasses, GridClasses } from '../utils';

const ChartingPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
  },[])

  const LegendsLabels = ['Evaporation','Rainfall']
  const SeriesLabels = ['Evaporation(m³/s)','Rainfall(mm)']
  const DataX = ['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00', '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00', '2009/6/12 12:00', '2009/6/12 13:00'];
  const DataY = [[ 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3 ],
                 [ 3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7 ]]

  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('ChartSpline')} className={PageHeaderClasses} title='CHARTING'/>
      <div className={PageContainClasses} >
        <img
          className={GridClasses}
          src={grid}
          alt="Grid"
        />
        <div className='flex justify-center items-center flex-wrap gap-5'>
          <div className='container flex'>
            <div>
            <LineChart className='' title='Line Plot (MERGE)' dataX={DataX} dataY={DataY} merge={true} 
                        seriesLabels={SeriesLabels} legendsLabels={LegendsLabels} />
            </div>
            <div>
            <LineChart className='' title='Line Plot (NOT MERGE)' dataX={DataX} dataY={DataY} merge={false} 
                        seriesLabels={SeriesLabels} legendsLabels={LegendsLabels}/>
            </div>
          </div>
          <BarChart className='w-[800px]' title="Rainfall vs Evaporation" subtitle='Fake Data'
                    seriesLabels={SeriesLabels} legendsLabels={LegendsLabels}/>
        </div>
      </div>
      <div className='mt-5'>
        <Button Icon={GetIcon('home')} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default ChartingPage;
