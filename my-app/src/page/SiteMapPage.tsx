import { useEffect, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets'
import { Button, HeaderTitle, MapBox, MapChart, TiltedImage } from '../components';
import { GetIcon, PageClasses, PageHeaderClasses, ButtonClasses, ButtonLINKClasses, PageContainClasses, GridClasses } from '../utils';

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

const SiteMapPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
  },[])

  // absolute top-0 left-0 w-full max-w-full bg-blend-luminosity
  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('MapPinHouse')} className={PageHeaderClasses} title='SITE MAP'/>
      <div className={PageContainClasses} >
        <div className='flex flex-row flex-wrap justify-center items-center'>
          <img
            className={GridClasses}
            src={grid}
            alt="Grid"
          />
          <div className='flex flex-wrap'>
            <div><MapBox GeoJSON={geojson}/></div>
            <div className='flex flex-col flex-wrap justify-center items-center'> 
              { geojson.data.features.map((ObjSite: any) => (
                <div className='flex flex-col px-5 justify-center items-center font-Roboto text-2xl font-extralight'>{ObjSite.id} - {ObjSite.properties.title}</div>
                )) }
              </div> 
          </div>
          <div className='flex flex-col flex-wrap'>
            <MapChart className='' title='SITE LAYOUT'/>
            <TiltedImage className='w-[350px] h-[350px]'/>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <Button Icon={GetIcon('home')} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default SiteMapPage;
