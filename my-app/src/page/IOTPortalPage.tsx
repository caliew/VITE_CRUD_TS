import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { grid } from '../assets'
import { Button, HeaderTitle, Card, SunburstChart } from '../components';
import { GetIcon, GetSensorREADING, GetFINALChildrenNOES,
         PageClasses, HeaderClasses, IOTSensorsClasses, 
         ButtonLINKClasses, PageContainClasses, GridClasses } from '../utils';

import { fetchIOTPortal } from '../redux/features/iotPortalSlice';

const IOTPortalPage = () => {

  const dispatch = useDispatch();
  const iotPortal = useSelector((state: any) => state.iotPortal.iotPortal);
  const [iotSensors, setIOTSensors] = useState({});
  const [iotSensorData, setIOTSensorData] = useState([]);
  // ----------------------------------------------------
  const [selIOTSensors, setSelIOTSensors] = useState(null);
  const [groupIOTSensors, setGroupIOTSensorData] = useState(null);

  useEffect(()=>{
    dispatch(fetchIOTPortal());
  },[dispatch])

  useEffect(()=>{
    let IOTSensors = iotPortal?.['settings']?.['IOT_SENSORS'] || {};
    let IOTSensorData = iotPortal?.['sensorData'] || [];
    IOTSensorData = IOTSensorData.filter((data:any)=>data['MODE']=='RS485');
    setIOTSensors(IOTSensors);
    setIOTSensorData(IOTSensorData);
    const SensorIDs = Object.keys(IOTSensors);
    setSelIOTSensors(SensorIDs);
    // -----------------------------
    const prepareGroupIOTSensorData = async() => {
      const GroupIOTSensors = Object.keys(IOTSensors).reduce((acc:any, sensorId:any) => {
        let sensor = IOTSensors[sensorId][1];
        const GroupName = sensor['GROUP'];
        const SensorType = sensor['TYPE'];
        // -------------------------------
        if (!acc[GroupName]) acc[GroupName] = {};
        if (!acc[GroupName][SensorType]) acc[GroupName][SensorType] = [];
        // ----------------------------------
        const _ObjSensor = IOTSensors[sensorId][1];
        const _SensorDatas = IOTSensorData.filter((data:any)=>data['DTU.ID']==sensorId);
        const _HEX = _SensorDatas?.[_SensorDatas.length-1]?.['RCV.BYTES'] || 0;
        // const READING = parseInt(_HEX,  16)/10.0;
        const READING = GetSensorREADING({..._ObjSensor,HEX:_HEX,ID:sensorId,FLAG:false});
        sensor = {...sensor, ID:sensorId, HEX:_HEX, READING:READING['CURR'] ?? READING['PRESS'] ?? READING['TEMP'] ?? 0 };
        acc[GroupName][SensorType].push(sensor);
        return acc;
      }, {});
      // ---------
      setGroupIOTSensorData(GroupIOTSensors);
    }
    prepareGroupIOTSensorData();
    // ---------
  },[iotPortal]);
  
  const getSensorHEX = (sensorId:any) => {
    let sensorData = iotSensorData.filter((data:any)=>data['DTU.ID']==sensorId);
    let _data = sensorData[sensorData.length-1];
    let _HEX = _data?.['RCV.BYTES'] || 0;
    return _HEX;
  }
  const onEventCallback = (nodes:any) => {
    const SelectionNodes = GetFINALChildrenNOES(nodes);
    const _IDs = SelectionNodes.map(obj => obj.id);
    setSelIOTSensors(_IDs);
  };
  // absolute top-0 left-0 w-full max-w-full bg-blend-luminosity
  return (
    <div className={PageClasses}>
      <HeaderTitle Icon={GetIcon('iotportal')} className={HeaderClasses} title='IOT PORTAL' />
      <div className={PageContainClasses}>
        <img className={GridClasses} src={grid} alt="Grid" />
        <div className={IOTSensorsClasses}>
          { groupIOTSensors && <SunburstChart data={groupIOTSensors} onEventCallback={onEventCallback}/> }
          { selIOTSensors && selIOTSensors.map((sensorId,index)=>{
            const ObjSensor = iotSensors[sensorId][1];
            let _HEX = getSensorHEX(sensorId);
            let READING = GetSensorREADING({...ObjSensor,HEX:_HEX,ID:sensorId});
            return <Card className='font-Roboto font-extralight text-xl' 
                         sensorType={ObjSensor["TYPE"]} 
                         group={ObjSensor['GROUP']||'UNDEFINED'}
                         name={ObjSensor['NAME']||'UNDEFINED'}
                         sensorId={sensorId}
                         reading={READING}
                         unitSystem={ObjSensor.UNITSYSTEM}
                         px='px-10' />
            }) } 
        </div>
      </div>
      <div className=''>
        <Button Icon={GetIcon('home')} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default IOTPortalPage;
