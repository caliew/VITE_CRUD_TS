import { GetIcon , GetLEDDisplay, GetSensorUNIT, 
         CardClasses, CardHeaderClasses, 
         CardTitleClasses, CardTitleGroupClasses, CardTitleNameClasses,
         CardIconClasses, CardSensorIDClasses } from "../utils";
import { SimpleGauge } from '../components';
interface ButtonProp {
  className?: string,
  sensorType?: string,
  name?: string,
  sensorId?: string,
  group?: string,
  reading?: any,
  unitSystem?: any,
  onClick?: any,
  children?: any,
  px?: string,
  white?: string
}

const Card = ({ className, sensorType, name, sensorId, group, reading, unitSystem, onClick, children, px, white }: ButtonProp) => {

  	const Card1classes = `button relative inline-flex items-center justify-center 
      h-11 transition-colors hover:text-color-1 flex flex-col h-full py-5 mb-15
      border border-color-2 border-b-2 border-r-2 ${px || "px-7"} 
      ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
    
    const Icon = GetIcon(sensorType);
    const MailIcon = GetIcon('Mail');
    const BellOnIcon = GetIcon('BellOn');
    const ChartLineIcon = GetIcon('ChartLine');
    const ChartPieIcon = GetIcon('ChartPie');
    const BatteryIcon = GetIcon('Battery');
    const Battery100Icon = GetIcon('Battery100');
    const Battery50Icon = GetIcon('Battery50');
    const Battery10Icon = GetIcon('Battery10');
    const Battery0Icon = GetIcon('Battery0');
    const MessageCircle = GetIcon('MessageCircle');
    const MessageSquare = GetIcon('MessageSquare');
    //<AlignCenterVertical size={28} color="#ce1c1c" strokeWidth={0.75} absoluteStrokeWidth />

    // const DisplayValue = reading['CURR'] ?? reading['PRESS'] ?? reading['TEMP'] ?? 0;
    const RsltKEY = Object.keys(reading);
    const DisplayValue = reading[RsltKEY[0]] ?? 0;

    const renderCard = () => (
    <div className={CardClasses()} >
        <div className={CardHeaderClasses}>
          <Icon className={`${CardIconClasses} size-14 stroke-[1.0] text-cyan-300 absoluteStrokeWidth`}  />
          <div className="px-2 text-1xl py-2">{sensorType}</div>
        </div>
        <div className={CardTitleClasses}>
          <div className={CardTitleGroupClasses}>{group}</div>
          <div className={CardTitleNameClasses}>{name}</div>
        </div>
        <div className={CardSensorIDClasses}>{sensorId}</div>
        <div className='flex font-Roboto text-lg font-extralight justify-center items-center'>
        {RsltKEY[0]}<span className="px-2"/> {GetLEDDisplay({id:sensorId,reading:DisplayValue,sensorType})}<span className="px-1"/>{unitSystem}
        </div>
        <SimpleGauge value={DisplayValue} className='' name={name} min={0} max={100} unit={GetSensorUNIT(sensorType)} />

        <div className='flex'>
        <MailIcon className={CardIconClasses}/><MessageCircle className={CardIconClasses}/><MessageSquare className={CardIconClasses}/>
        <BellOnIcon className={CardIconClasses}/><ChartLineIcon className={CardIconClasses}/><ChartPieIcon className={CardIconClasses}/>
        </div>
        <div className="flex">
        <BatteryIcon className={CardIconClasses}/><Battery100Icon className={CardIconClasses}/>
        <Battery50Icon className={CardIconClasses}/><Battery10Icon className={CardIconClasses}/><Battery0Icon className={CardIconClasses}/>
        </div>
        {children}
    </div>
  );

  return renderCard();
};

export default Card;
