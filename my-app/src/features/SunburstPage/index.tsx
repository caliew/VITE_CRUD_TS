import { useEffect } from "react";

import { grid } from "@assets/index";
import { HeaderTitle, SunburstChart, PageAction } from "@shared/components";
import { GetIcon } from "@utils/icon";
import {
  PageClasses,
  PageHeaderClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils/classname";

const SunburstPage = () => {
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

      <PageAction />
    </div>
  );
};

export default SunburstPage;
