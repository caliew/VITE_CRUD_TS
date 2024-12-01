// my-app/src/components/Header.tsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed z-30 w-full flex flex-row gap-5 p-5 justify-between text-xl font-Roboto font-extralight">
      <div className="">Application Name</div>
      <div className="flex">
        <Link to="/" className="px-2">
          <h1>HOME</h1>
        </Link>
        <span />
        <Link to="/restaurants" className="px-2">
          <h1>RESTAURANTS</h1>          
        </Link>
        <span />
        <Link to="/workers" className="px-2">
          <h1>WORKERS</h1>          
        </Link>
      </div>
    </div>
  );
};

export default Header;
