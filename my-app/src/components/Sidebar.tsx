// my-app/src/components/Sidebar.tsx
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WorkIcon from '@mui/icons-material/Work';

const Sidebar = () => {
  return (
    <div className='fixed mt-20 flex flex-col font-Roboto font-extralight text-xl p-5 gap-5'>
      <Link to="/" className='px-2'><span/><HomeIcon /><span />HOME</Link>
      <Link to="/restaurants" className='px-2'><RestaurantIcon className='svg fill-red-500'/>RESTAURANTS</Link>
      <Link to="/workers" className='px-2'><WorkIcon />WORKERS</Link>
    </div>
  );
};

export default Sidebar;