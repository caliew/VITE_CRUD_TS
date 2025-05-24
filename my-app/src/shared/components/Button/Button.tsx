import ButtonSvg from "@shared/assets/svg/ButtonSvg";
import { Link } from "react-router-dom";

interface ButtonProp {
  className?: string;
  Icon?: React.ComponentType<any>;
  iconClassName?: string; // 新增：专门给 Icon 的类名
  to?: string;
  onClick?: any;
  children?: any;
  px?: string;
  white?: string;
}

const Button = ({
  className,
  Icon,
  iconClassName, // 新增
  to,
  onClick,
  children,
  px,
  white,
}: ButtonProp) => {
  const classes = `button relative inline-flex items-center justify-center h-11 
    transition-colors 
    text-decoration-underline text-inherit
    hover:text-rose-500
    ${px || "px-7"} 
    ${white ? "text-n-8" : "text-n-1"} 
    ${className || ""}`;

  const spanClasses: any = "px-5";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      {Icon && <Icon className={iconClassName} />}
      {children}
      {ButtonSvg(white)}
    </button>
  );
  const renderLink = () => (
    <Link to={to} className={classes}>
      {Icon && <Icon className={iconClassName} />}
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </Link>
  );

  return to ? renderLink() : renderButton();
};

export default Button;
