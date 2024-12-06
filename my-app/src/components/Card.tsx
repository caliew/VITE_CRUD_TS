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

 const classes = `button relative inline-flex items-center justify-center 
    h-11 transition-colors hover:text-color-1 
    flex flex-col h-full py-5 mb-15
    border border-color-2 
    border-b-2 border-r-2
    ${px || "px-7"} 
    ${white ? "text-n-8" : "text-n-1"} 
    ${className || ""}`;

  const Icon = GetIcon(sensorType);

  const renderCard = () => (
    <button className={classes} onClick={onClick}>        
        <div className="flex items-center"><Icon className="inline-flex size-12 px-2"/>{sensorType}</div>
        <div>{group}</div>
        <div>{name}</div>
        <div className='py-2'>ID={sensorId}</div>
        {GetLEDDisplay(reading)}
        {children}
    </button>
  );

  return renderCard();
};

export default Card;
