import { Button } from "../components";
import { grid } from '../assets';

const HomePage = () => {

  return (
    <div className="flex flex-col pt-5 items-center gap-5">
      <div className="font-Roboto font-extralight text-5xl mt-15 mb-15">HOME PAGE</div>
      <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
        <div className="absolute top-0 left-0 max-w-full">
        <img
          className="w-full"
          src={grid}
          width={550}
          height={550}
          alt="Grid"
        />
        </div>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href='/restaurants'>RESTAURANTS LISTS</Button>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href="/workers">WORKERS LISTS</Button>
      </div>
    </div>
  );
};

export default HomePage;
