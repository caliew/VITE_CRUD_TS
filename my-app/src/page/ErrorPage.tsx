import { GetIcon } from "../utils";
{/* <Ban size={48} strokeWidth={3} /> */}
const ErrorPage = () => {
  const Icon = GetIcon('404');
  return (
    <div className="flex flex-col pt-5 items-center gap-5 mt-52">
      <div className="font-Roboto font-extralight text-4xl mb-15">
        <Icon className="inline-flex size-24"/>
        <span className="px-5"/>
        ERROR PAGE (404)
      </div>
    </div>
  );
};

export default ErrorPage;
