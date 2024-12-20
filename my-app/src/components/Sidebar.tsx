// my-app/src/components/Sidebar.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera, FileKey2, CircuitBoard, Utensils, User } from 'lucide-react';
import { GetIcon, SidebarClasses } from "../utils";
import { useSelector, useDispatch } from 'react-redux';


const SideBar = () => {

  const { token, error } = useSelector((state) => state.auth);
  const spanClasses = "relative z-10 px-2";

  const HomeIcon = GetIcon('home');
  const IOTIcon = GetIcon('IOTPortal');
  const SPKAIcon = GetIcon('SPKAPortal');
  const MapPinHouseIcon = GetIcon('MapPinHouse');
  const ChartingIcon = GetIcon('ChartSpline');
  const GaugeIcon = GetIcon('Gauge');
  const CalendarIcon = GetIcon('Calendar');
  const RestaurantIcon = GetIcon('restaurants');
  const RainbowIcon = GetIcon('Sunburst');
  const WorkerIcon = GetIcon('workers');
  const LogoutIcon = GetIcon('logout');

  useEffect(()=>{
  },[])

  const loaded = () => {
    if (!token) return;
    return (
      <>
      <Link to="/" className="px-2 flex hover:text-rose-500"><HomeIcon /><span className={spanClasses}/>HOME</Link>
      <Link to="/IOTPortals" className="px-2 flex hover:text-rose-500"><IOTIcon /><span className={spanClasses}/>IOT PORTAL</Link>
      <Link to="/SPKAPortals" className="px-2 flex hover:text-rose-500"><SPKAIcon /><span className={spanClasses}/>SPKA PORTAL</Link>
      <Link to="/sitemap" className="px-2 flex hover:text-rose-500"><MapPinHouseIcon /><span className={spanClasses}/>SITE MAP</Link>
      <Link to="/charting" className="px-2 flex hover:text-rose-500"><ChartingIcon /><span className={spanClasses}/>CHARTING</Link>
      <Link to="/gauge" className="px-2 flex hover:text-rose-500"><GaugeIcon /><span className={spanClasses}/>GAUGE</Link>
      <Link to="/calendar" className="px-2 flex hover:text-rose-500"><CalendarIcon /><span className={spanClasses}/>CALENDAR</Link>
      <Link to="/Sunburst" className="px-2 flex hover:text-rose-500"><RainbowIcon /><span className={spanClasses}/>SUNBURST</Link>
      {/* <Link to="/restaurants" className="px-2 flex"><RestaurantIcon /><span className={spanClasses}/>RESTAURANTS</Link>
      <Link to="/workers" className="px-2 flex"><WorkerIcon /><span className={spanClasses}/>WORKERS</Link> */}
      </>
    )
  }

  return (
    <aside className={SidebarClasses}>
      <ul className="flex flex-col space-y-4">
        { loaded() }
        <Link to="/login" className="px-2 flex"><LogoutIcon /><span className={spanClasses}/>
        {token ? 'LOGOUT':'LOGIN'}
        </Link>
      </ul>
    </aside>
  );
};

export default SideBar;
