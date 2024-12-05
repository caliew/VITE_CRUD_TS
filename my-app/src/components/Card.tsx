import ButtonSvg from "../assets/svg/ButtonSvg";
import { Link } from 'react-router-dom';

interface ButtonProp {
  className?: string,
  title?: string,
  subtitle?: string,
  sensorType?: string,
  name?: string,
  sensorId?: string,
  group?: string,
  onClick?: any,
  children?: any,
  px?: string,
  white?: string
}

const Card = ({ className, title, subtitle, sensorType, name, sensorId, group, onClick, children, px, white }: ButtonProp) => {
  const classes = `button relative inline-flex items-center justify-center 
    h-11 transition-colors hover:text-color-1 
    flex flex-col h-full py-5 mb-15
    border border-color-2 
    border-b-2 border-r-2
    ${px || "px-7"} 
    ${white ? "text-n-8" : "text-n-1"} 
    ${className || ""}`;
  const spanClasses = "relative z-10";

  const renderCard = () => (
    <button className={classes} onClick={onClick}>
        <div>{sensorType}</div>
        <div>{group}</div>
        <div>{name}</div>
        <div className="py-2">{sensorId}</div>
        {children}
    </button>
  );

  return renderCard();
};

export default Card;
