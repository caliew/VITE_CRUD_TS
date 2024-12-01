// my-app/src/components/Header.tsx
import { Link } from "react-router-dom";
import { config } from "../config";	

const Header = () => {
  const spanClasses = "relative x-2 px-2";
  const AppName = config.applicationName;
  const logo = config.applicationLogo;
  return (
    <div className="fixed z-30 w-full flex flex-row gap-5 p-5 justify-between text-xl font-Roboto font-extralight">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-15 w-15 mr-2 fill-white" />
        <span>{AppName}</span>
      </div>      
      <div className="flex">
        <Link to="/" className={spanClasses}>HOME</Link>
        <Link to="/restaurants" className={spanClasses}>RESTAURANTS</Link>
        <Link to="/workers" className={spanClasses}>WORKERS</Link>
      </div>
    </div>
  );
};

export default Header;
