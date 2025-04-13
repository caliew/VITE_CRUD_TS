import { ButtonLINKClasses } from "@shared/utils/classname";
import { GetIcon } from "@shared/utils/icon";
import { Button } from "@shared/components";
import { useErrorHandler } from "react-error-boundary";

const PageAction = () => {
  const handleError = useErrorHandler();

  return (
    <div className="mt-15 flex flex-wrap flex-col">
      <Button Icon={GetIcon("home")} className={ButtonLINKClasses} to="/">
        BACK TO HOME
      </Button>
      <Button
        Icon={GetIcon("404")}
        className={ButtonLINKClasses}
        onClick={() => {
          handleError(new Error("Simulated error"));
        }}
      >
        SIMULATE ERROR
      </Button>
    </div>
  );
};

export default PageAction;
