import { Link } from 'react-router-dom';

import ButtonSvg from "../assets/svg/ButtonSvg";

interface ButtonProp {
  className?: string,
  Icon?: any,
  to?: string,
  onClick?: any,
  children?: any,
  px?: string,
  white?: string
}

const Button = ({ className, Icon, to, onClick, children, px, white }: ButtonProp) => {

  const classes = `button relative inline-flex items-center justify-center h-11 
    transition-colors 
    text-decoration-underline text-inherit 
    ${px || "px-7"} 
    ${white ? "text-n-8" : "text-n-1"} 
    ${className || ""}`;  
  const spanClasses:any = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      {children}
      {ButtonSvg(white)}
    </button>
  );
  const renderLink = () => (
    <Link to={to} className={classes}>
      <Icon className={className}/>
      {children}
      {ButtonSvg(white)}
    </Link>
  );

  return to ? renderLink() : renderButton();
};

export default Button;
