import { useEffect, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ReactECharts from 'echarts-for-react';

import { grid } from '../assets'
import { Button, HeaderTitle } from '../components';
import { GetIcon, PageClasses, HeaderClasses, ChartClasses, ButtonLINKClasses, PageContainClasses, GridClasses } from '../utils';

const ChartingPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
  },[])

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('ChartSpline')} className={HeaderClasses} title='CHARTING'/>
      <div className={PageContainClasses} >
        <img
          className={GridClasses}
          src={grid}
          alt="Grid"
        />
        <div className='font-Roboto font-extralight text-4xl'>
            <ReactECharts className={ChartClasses} option={options} />;
        </div>
      </div>
      <div className='mt-5'>
        <Button Icon={GetIcon('home')} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default ChartingPage;
