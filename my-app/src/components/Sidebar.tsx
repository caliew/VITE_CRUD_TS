// my-app/src/components/Sidebar.tsx
import { Link } from "react-router-dom";
import { Camera, FileKey2, Utensils, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';

const Sidebar = () => {

  const { token, error } = useSelector((state) => state.auth);
  const spanClasses = "relative z-10 px-2";
  const loaded = () => {
    if (!token) return;
    return (
      <>
      <Link to="/" className="px-2 flex"><Camera/><span className={spanClasses}/>HOME</Link>
      <Link to="/restaurants" className="px-2 flex"><Utensils /><span className={spanClasses}/>RESTAURANTS</Link>
      <Link to="/workers" className="px-2 flex"><User /><span className={spanClasses}/>WORKERS</Link>
      </>
    )

  }


  return (
    <div className="fixed mt-20 flex flex-col font-Roboto font-extralight text-xl p-5 gap-5">
      <Link to="/login" className="px-2 flex"><FileKey2/><span className={spanClasses}/>LOGIN</Link>
      { loaded() }
    </div>
  );
};

export default Sidebar;
