import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { grid } from "@assets/index";
import { Button, HeaderTitle, SunburstChart } from "@shared/components";
import {
  GetIcon,
  PageClasses,
  PageHeaderClasses,
  ButtonLINKClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils";

const SunburstPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  useEffect(() => {}, []);

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("Sunburst")}
        className={PageHeaderClasses}
        title="SUNBURST"
      />
      <div className={PageContainClasses}>
        <img className={GridClasses} src={grid} alt="Grid" />
        <div className="font-Roboto text-2xl font-extralight">
          <SunburstChart />
          SUNBURST
        </div>
      </div>
      <div className="mt-15 flex flex-wrap flex-col">
        <Button Icon={GetIcon("home")} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
        <Button Icon={GetIcon("404")} className={ButtonLINKClasses} onClick={() => { handleError(new Error('Simulated error')) }}>SIMULATE ERROR</Button>
      </div>
    </div>
  );
};

export default SunburstPage;
