// my-app/src/components/Sidebar.tsx
import { Link } from "react-router-dom";
import { Camera, Utensils, User } from 'lucide-react';

const Sidebar = () => {
  const spanClasses = "relative z-10 px-2";

  return (
    <div className="fixed mt-20 flex flex-col font-Roboto font-extralight text-xl p-5 gap-5">
      <Link to="/" className="px-2 flex"><Camera/><span className="px-2"/>HOME</Link>
      <Link to="/restaurants" className="px-2 flex"><Utensils /><span className="px-2"/>RESTAURANTS</Link>
      <Link to="/workers" className="px-2 flex"><User /><span className="px-2"/>WORKERS</Link>
    </div>
  );
};

export default Sidebar;
