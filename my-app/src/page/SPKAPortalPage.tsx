// my-app/src/components/HomePage.tsx
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

import { grid } from '../assets';
import { Button, HeaderTitle, Clock, MapBox, 
         LineChart, MapChart, SunburstChart, BarChart, CarGauge, EChartTemplate } from "../components";
import { GetIcon, GetJWTToken, ButtonClasses, ButtonLINKClasses, PageClasses, SPKAPageClasses, PageHeaderClasses, PageContainClasses, GridClasses } from '../utils';


const geojson = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [
      { id: 1,
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [101.662264, 3.172387]},
        properties: { title: 'BUILDING 1' }
      },
      {
        id: 2,
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [101.660025, 3.175400] },
        properties: { title: 'BUILDING 2' }
      },
      {
        id: 3,
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [101.651125, 3.166300] },
        properties: { title: 'BUILDING 3' }
      }
    ]
  }
}


const SPKAPortalPage = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const token = GetJWTToken();
    if (!token) {
      navigate('/404', { replace: true, state: { error: 'Invalid or expired token' } });
    }
  },[])  

  const LegendsLabels = ['Evaporation','Rainfall']
  const SeriesLabels = ['Evaporation(m³/s)','Rainfall(mm)']
  const DataX = ['2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00', '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00', '2009/6/12 12:00', '2009/6/12 13:00'];
  const DataY = [[ 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3 ],
                 [ 3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7 ]]

  return (
    <div className={SPKAPageClasses}>
      <div className='flex flex-wrap'>
        <HeaderTitle Icon={GetIcon('SPKAPortal')} className={PageHeaderClasses} title='SPKA PORTAL'/>
        <Clock />
      </div>
      <div className={PageContainClasses}>
        <img className={GridClasses} src={grid} alt="Grid" />
        <div><SunburstChart /></div>
        <div><MapBox GeoJSON={geojson}/></div>
        <div><MapChart className='h-[250px]' title=''/></div>
        <div className='flex flex-row justify-center items-center flex-wrap gap-5'>
          <div>
            <LineChart className='' title='' 
                       dataX={DataX} dataY={DataY} merge={true} 
                       seriesLabels={SeriesLabels} legendsLabels={LegendsLabels} />
          </div>
          <div><BarChart className='w-[500px] h-[250px]' title=''
                         seriesLabels={SeriesLabels} legendsLabels={LegendsLabels} /></div>
        </div>
      </div>
    </div>
  );
};

export default SPKAPortalPage;
