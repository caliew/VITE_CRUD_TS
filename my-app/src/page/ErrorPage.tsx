import { Ban } from "lucide-react";
{/* <Ban size={48} strokeWidth={3} /> */}
const ErrorPage = () => {
  return (
    <div className="flex flex-col pt-5 items-center gap-5">
      <div className="font-Roboto font-extralight text-4xl mt-15 mb-15">
        <Ban className="inline-flex size-24"/><span className="px-5"/>
        ERROR PAGE (404)
      </div>
    </div>
  );
};

export default ErrorPage;
