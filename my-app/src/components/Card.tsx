import { GetIcon } from "../utils";
import { GetLEDDisplay } from "../utils";
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

 const Cardclasses = `button relative inline-flex items-center justify-center 
    h-11 transition-colors hover:text-color-1 
    flex flex-col h-full py-5 mb-15
    border border-color-2 
    border-b-2 border-r-2
    ${px || "px-7"} 
    ${white ? "text-n-8" : "text-n-1"} 
    ${className || ""}`;
  
  const Iconclasses = `size-8`;

  const Icon = GetIcon(sensorType);
  const MailIcon = GetIcon('Mail');
  const BellOnIcon = GetIcon('BellOn');
  const BellOffIcon = GetIcon('BellOff');
  const ChartLineIcon = GetIcon('ChartLine');
  const ChartPieIcon = GetIcon('ChartPie');
  const BatteryIcon = GetIcon('Battery');
  const Battery100Icon = GetIcon('Battery100');
  const Battery50Icon = GetIcon('Battery50');
  const Battery10Icon = GetIcon('Battery10');
  const Battery0Icon = GetIcon('Battery0');
  const MessageCircle = GetIcon('MessageCircle');
  const MessageSquare = GetIcon('MessageSquare');
  
  const renderCard = () => (
    <button className={Cardclasses} onClick={onClick}>        
        <div className="flex items-center m-2 border-t-2 border-color-0 border-b-2">
          <Icon className={Iconclasses}/>
          <div className="px-2 text-1xl py-2">{sensorType}</div>
        </div>
        <div className="inflex flex-wrap pb-2">
          <div>{group}</div>
          <div>{name}</div>
        </div>
        <div className='m-2 font-Roboto text-2xl border-b-2 border-t-2 border-color-0'>{sensorId}</div>
        {GetLEDDisplay({reading,sensorType})}
        <div className='flex'>
        <MailIcon className={Iconclasses}/><MessageCircle className={Iconclasses}/><MessageSquare className={Iconclasses}/>
        </div>
        <div className="flex">
        <BellOnIcon className={Iconclasses}/><ChartLineIcon className={Iconclasses}/><ChartPieIcon className={Iconclasses}/>
        </div>
        <div className="flex">
        <BatteryIcon className={Iconclasses}/><Battery100Icon className={Iconclasses}/>
        <Battery50Icon className={Iconclasses}/><Battery10Icon className={Iconclasses}/><Battery0Icon className={Iconclasses}/>
        </div>
        {children}
    </button>
  );

  return renderCard();
};

export default Card;
