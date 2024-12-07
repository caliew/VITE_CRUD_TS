// my-app/src/components/Header.tsx
import { Link } from "react-router-dom";
import { config } from "../config";	
import { useSelector, useDispatch } from 'react-redux';

const HeaderBar = () => {

  const { token, error } = useSelector((state) => state.auth);

  const spanClasses = "relative x-2 px-2";
  const AppName = config.applicationName;
  const logo = config.applicationLogo;
  const loaded = () => {
    if (!token) return;
    return (
      <>
        <Link to="/" className={spanClasses}>HOME</Link>
        <Link to="/iotportals" className={spanClasses}>IOT PORTAL</Link>
        <Link to="/sitemap" className={spanClasses}>SITE MAP</Link>
        <Link to="/charting" className={spanClasses}>CHARTING</Link>
        <Link to="/restaurants" className={spanClasses}>RESTAURANTS</Link>
        <Link to="/workers" className={spanClasses}>WORKERS</Link>
        <Link to="/login" className={spanClasses}>{token ? 'LOGOUT':'LOGIN'}</Link>
      </>
    )

  }
  return (
    <div className="fixed top-0 left-0 z-30 w-full flex flex-row gap-5 p-5 justify-between text-xl font-Roboto font-extralight">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-15 w-15 mr-2 fill-white" />
        <span>{AppName}</span>
      </div>      
      <div className="flex">{loaded()}</div>
    </div>
  );
};

export default HeaderBar;
