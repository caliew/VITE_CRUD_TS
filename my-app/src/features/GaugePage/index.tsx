import { useEffect } from "react";

import { grid } from "@assets/index";
import {
  HeaderTitle,
  SimpleGauge,
  CarGauge,
  PageAction,
} from "@shared/components";
import { GetIcon } from "@utils/icon";
import {
  PageClasses,
  PageHeaderClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils/classname";

const GaugePage = () => {
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

      <PageAction />
    </div>
  );
};

export default GaugePage;
