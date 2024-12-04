import { CircuitBoard, Camera } from "lucide-react";
import { Button, HeaderTitle, Card } from '../components';
import { grid } from '../assets'
import { useSelector, useDispatch } from 'react-redux';
import { fetchIOTPortal } from '../redux/features/iotPortalSlice';
import { useEffect, useState } from "react";

const IOTPortalPage = () => {

  const dispatch = useDispatch();
  const iotPortal = useSelector((state: any) => state.iotPortal.iotPortal);
  const [iotSensors, setIotSensors] = useState({})

  useEffect(()=>{
    dispatch(fetchIOTPortal());
  },[dispatch])

  useEffect(()=>{
    setIotSensors(iotPortal?.['settings']?.['IOT_SENSORS']);
  },[iotPortal]);

  return (
    <div className="mt-15 font-Roboto flex flex-col items-center justify-center">
      <HeaderTitle Icon={CircuitBoard} className="inline-flex size-24" title='IOT PORTAL'/>
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
              return <Card className='font-Roboto font-extralight text-xl' 
                           title={iotSensors[sensorId]["1"]["NAME"]} 
                           subtitle={sensorId} 
                           sensorType={iotSensors[sensorId]["1"]["TYPE"]} px='px-10' />
            })
          }
        </div>
        <div className='mt-10 font-Roboto font-extralight text-2xl'>
          <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href="/">
            <div><Camera className="inline-flex"/><span className="px-5"/>BACK TO HOME</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IOTPortalPage;
