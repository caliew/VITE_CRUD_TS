import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets'
import { GetIcon } from '../utils';
import { Button, HeaderTitle, Card } from '../components';

import { fetchIOTPortal } from '../redux/features/iotPortalSlice';

const IOTPortalPage = () => {

  const dispatch = useDispatch();
  const iotPortal = useSelector((state: any) => state.iotPortal.iotPortal);
  const [iotSensors, setIOTSensors] = useState({});
  const [iotSensorData, setIOTSensorData] = useState({});

  useEffect(()=>{
    dispatch(fetchIOTPortal());
  },[dispatch])

  useEffect(()=>{
    let IOTSensors = iotPortal?.['settings']?.['IOT_SENSORS'] || {};
    let IOTSensorData = iotPortal?.['sensorData'] || [];
    IOTSensorData = IOTSensorData.filter((data:any)=>data.MODE=='RS485');
    setIOTSensors(IOTSensors);
  },[iotPortal]);



  return (
    <div className="mt-15 font-Roboto flex flex-col items-center justify-center">
      <HeaderTitle Icon={GetIcon('iotportal')} className="inline-flex size-24" title='IOT PORTAL'/>
      <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
        <img
          className="absolute top-0 left-0 w-full"
          src={grid}
          width={550}
          height={550}
          alt="Grid"
        />
        <div className="flex flex-wrap gap-10 justify-center items-center w-full">
          {
            iotSensors && Object.keys(iotSensors).map((sensorId,index)=>{
              const ObjSensor = iotSensors[sensorId][1];
              return <Card className='font-Roboto font-extralight text-xl' 
                           sensorType={ObjSensor["TYPE"]} 
                           group={ObjSensor['GROUP']||'UNDEFINED'}
                           name={ObjSensor['NAME']||'UNDEFINED'}
                           sensorId={sensorId}
                           px='px-10' />
            })
          }
        </div>
        <div className='mt-10 font-Roboto font-extralight text-2xl'>
          <Button Icon={GetIcon('home')} className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href="/">BACK TO HOME</Button>
        </div>
      </div>
    </div>
  );
};

export default IOTPortalPage;
