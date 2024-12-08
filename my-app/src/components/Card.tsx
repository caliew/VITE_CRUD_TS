import { GetIcon , GetLEDDisplay, GetSensorUNIT, 
         CardClasses, CardHeaderClasses, CardTitleClasses, CardIconClasses, CardSensorIDClasses } from "../utils";
import { SimpleGauge } from '../components';
interface ButtonProp {
  className?: string,
  sensorType?: string,
  name?: string,
  sensorId?: string,
  group?: string,
  reading?: string,
  onClick?: any,
  children?: any,
  px?: string,
  white?: string
}

const Card = ({ className, sensorType, name, sensorId, group, reading, onClick, children, px, white }: ButtonProp) => {

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

    const renderCard = () => (
    <div className={CardClasses()} >
        <div className={CardHeaderClasses}>
          <Icon className={`${CardIconClasses} size-14 stroke-[1.0] text-cyan-300 absoluteStrokeWidth`}  />
          <div className="px-2 text-1xl py-2">{sensorType}</div>
        </div>
        <div className={CardTitleClasses}>
          <div>{group}</div>
          <div>{name}</div>
        </div>
        <div className={CardSensorIDClasses}>{sensorId}</div>
        {GetLEDDisplay({reading,sensorType})}
        <SimpleGauge value={reading} className='' name={name} min={0} max={100} unit={GetSensorUNIT(sensorType)} />

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
