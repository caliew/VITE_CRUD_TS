// my-app/src/components/Header.tsx
import { Link } from "react-router-dom";

const Header = () => {
  const spanClasses = "relative x-2 px-2";
  return (
    <div className="fixed z-30 w-full flex flex-row gap-5 p-5 justify-between text-xl font-Roboto font-extralight">
      <div className="">Application Name</div>
      <div className="flex">
        <Link to="/" className={spanClasses}>HOME</Link>
        <Link to="/restaurants" className={spanClasses}>RESTAURANTS</Link>
        <Link to="/workers" className={spanClasses}>WORKERS</Link>
      </div>
    </div>
  );
};

export default Header;
