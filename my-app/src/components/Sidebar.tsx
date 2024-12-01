// my-app/src/components/Sidebar.tsx
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WorkIcon from '@mui/icons-material/Work';

const Sidebar = () => {

  const spanClasses = "relative z-10 px-2";

  return (
    <div className='fixed mt-20 flex flex-col font-Roboto font-extralight text-xl p-5 gap-5'>
      <Link to="/" className='px-2'><HomeIcon /><span className={spanClasses}>HOME</span></Link>
      <Link to="/restaurants" className='px-2'><RestaurantIcon /><span className={spanClasses}>RESTAURANTS</span></Link>
      <Link to="/workers" className='px-2'><WorkIcon /><span className={spanClasses}>WORKERS</span></Link>
    </div>
  );
};

export default Sidebar;