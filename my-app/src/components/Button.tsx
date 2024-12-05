import ButtonSvg from "../assets/svg/ButtonSvg";
import { Link } from 'react-router-dom';

interface ButtonProp {
  className?: string,
  Icon?: any,
  href?: string,
  onClick?: any,
  children?: any,
  px?: string,
  white?: string
}

const Button = ({ className, Icon, href, onClick, children, px, white }: ButtonProp) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      {children}
      {ButtonSvg(white)}
    </button>
  );

  const renderLink = () => (
    <Link to={href} className={classes}>
      <Icon className={className}/>
      {children}
      {ButtonSvg(white)}
    </Link>
  );

  return href ? renderLink() : renderButton();
};

export default Button;
