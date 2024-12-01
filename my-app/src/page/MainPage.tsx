import { Button } from "../components";

const HomePage = () => {

  return (
    <div className="flex flex-col pt-5 items-center gap-5">
      <div className="font-Roboto font-extralight text-5xl mt-15 mb-15">HOME PAGE</div>
      <div className='mt-10 flex '>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href='/'>RESTAURANTS</Button>
        <Button className="hidden lg:flex font-Roboto font-extralight text-2xl m-5" href="/workers">WORKERS</Button>
      </div>
    </div>
  );
};

export default HomePage;
