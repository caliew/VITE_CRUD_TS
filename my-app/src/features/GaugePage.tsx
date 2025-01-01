import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { grid } from "@assets/index";
import {
  Button,
  HeaderTitle,
  SimpleGauge,
  CarGauge
} from "@shared/components";
import { GetIcon } from "@shared/utils";
import {
  PageClasses,
  PageHeaderClasses,
  ButtonLINKClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils/classname";

const GaugePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  useEffect(() => {}, []);

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("Gauge")}
        className={PageHeaderClasses}
        title="GAUGE"
      />
      <div className={PageContainClasses}>
        <img className={GridClasses} src={grid} alt="Grid" />
        <div className="flex justify-center items-center flex-wrap gap-5">
          <div className="">
            <SimpleGauge
              value={35}
              className="w-[850]"
              title="TEMP"
              min={20}
              max={65}
              unit="°C"
            />
            <SimpleGauge
              value={75}
              className=""
              title="RH"
              min={0}
              max={100}
              unit="RH"
            />
          </div>
          <CarGauge className="" title="CUSTOMED GAUGE" />
        </div>
      </div>
      <div className="mt-15 flex flex-wrap flex-col">
        <Button Icon={GetIcon("home")} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
        <Button Icon={GetIcon("404")} className={ButtonLINKClasses} onClick={() => { handleError(new Error('Simulated error')) }}>SIMULATE ERROR</Button>
      </div>
    </div>
  );
};

export default GaugePage;
