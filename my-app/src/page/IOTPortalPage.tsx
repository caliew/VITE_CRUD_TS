import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets'
import { Button, HeaderTitle, Card } from '../components';
import { GetIcon, PageClasses, HeaderClasses, IOTSensorsClasses, ButtonLINKClasses, PageContainClasses, GridClasses } from '../utils';

import { fetchIOTPortal } from '../redux/features/iotPortalSlice';

const IOTPortalPage = () => {

  const dispatch = useDispatch();
  const iotPortal = useSelector((state: any) => state.iotPortal.iotPortal);
  const [iotSensors, setIOTSensors] = useState({});
  const [iotSensorData, setIOTSensorData] = useState([]);

  useEffect(()=>{
    dispatch(fetchIOTPortal());
  },[dispatch])

  useEffect(()=>{
    let IOTSensors = iotPortal?.['settings']?.['IOT_SENSORS'] || {};
    let IOTSensorData = iotPortal?.['sensorData'] || [];
    IOTSensorData = IOTSensorData.filter((data:any)=>data['MODE']=='RS485');
    setIOTSensors(IOTSensors);
    setIOTSensorData(IOTSensorData);
  },[iotPortal]);

  const getREADING = (sensorId:any) => {
    let sensorData = iotSensorData.filter((data:any)=>data['DTU.ID']==sensorId);
    let _data = sensorData[sensorData.length-1];
    let _HEX = _data?.['RCV.BYTES'] || 0;
    const decimalNumber = parseInt(_HEX, 16);
    return String(decimalNumber/10.0);
  }
  // absolute top-0 left-0 w-full max-w-full bg-blend-luminosity
  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('iotportal')} className={HeaderClasses} title='IOT PORTAL'/>
      <div className={PageContainClasses}>
        <img
          className={GridClasses}
          src={grid}
          alt="Grid"
        />
        <div className={IOTSensorsClasses}>
          {
            iotSensors && Object.keys(iotSensors).map((sensorId,index)=>{
              const ObjSensor = iotSensors[sensorId][1];
              let READING = getREADING(sensorId);
              return <Card className='font-Roboto font-extralight text-xl' 
                           sensorType={ObjSensor["TYPE"]} 
                           group={ObjSensor['GROUP']||'UNDEFINED'}
                           name={ObjSensor['NAME']||'UNDEFINED'}
                           sensorId={sensorId}
                           reading={READING}
                           px='px-10' />
            })
          }
        </div>
      </div>
      <div className=''>
        <Button Icon={GetIcon('home')} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default IOTPortalPage;
