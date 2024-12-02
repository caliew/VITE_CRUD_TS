import { Button } from "../components";
import { grid } from '../assets';
import { Utensils, User } from 'lucide-react';

const HomePage = () => {

  return (
    <div className="flex flex-col pt-5 items-center gap-5">
      <div className="font-Roboto font-extralight text-4xl mt-15 mb-15">HOME PAGE</div>
      <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
        <img
          className="absolute top-0 left-0 max-w-full"
          src={grid}
          width={550}
          height={550}
          alt="Grid"
        />
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-2" href='/restaurants'>
          <div className="inline-flex p-15"><Utensils /><span className="px-5"/>RESTAURANTS LISTS</div>
        </Button>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-2" href="/workers">
          <div><User className="inline-flex"/><span className="px-5"/>WORKERS LISTS</div>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
