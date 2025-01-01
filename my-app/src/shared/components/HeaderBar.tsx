// my-app/src/components/Header.tsx
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { APP_NAME } from "@shared/utils/api/configs/URL";

import { NavHeaderClass } from "@shared/utils";
import { config } from "../config";

const HeaderBar = () => {
  const { token, error } = useSelector((state) => state.auth);

  const spanClasses = "relative x-2 px-2 text-Roboto font-extralight text-lg hover:text-rose-500";
  const logo = config.applicationLogo;

  const loaded = () => {
    if (!token) return;
    return (
      <>
        <Link to="/" className={spanClasses}>HOME</Link>
        <Link to="/IOTPortals" className={spanClasses}>IOT PORTAL</Link>
        <Link to="/SPKAPortals" className={spanClasses}>SPKA PORTAL</Link>
        <Link to="/sitemap" className={spanClasses}>SITE MAP</Link>
        <Link to="/charting" className={spanClasses}>CHARTING</Link>
        <Link to="/gauge" className={spanClasses}>GAUGE</Link>
        <Link to="/calendar" className={spanClasses}>CALENDAR</Link>
        <Link to="/sunburst" className={spanClasses}>SUNBURST</Link>
        {/* <Link to="/restaurants" className={spanClasses}>
          RESTAURANTS
        </Link>
        <Link to="/workers" className={spanClasses}>
          WORKERS
        </Link> */}
        <Link to="/login" className={spanClasses}>{token ? "LOGOUT" : "LOGIN"}</Link>
      </>
    );
  };

  return (
    <div className="container mx-auto p-4 text-Roboto font-extralight text-lg shadow-indigo-500/50 ">
      <header className="fixed top-0 left-0 w-full py-4 z-10 ">
        <div className={NavHeaderClass}>
          <div className={'flex'}>
            <img src={logo} alt="Logo" className="h-auto w-10 mr-2 fill-red" />
            <span>{APP_NAME}</span>
          </div>
          <div className={''}>{loaded()}</div>
        </div>
      </header>
    </div>
  );
};

export default HeaderBar;
