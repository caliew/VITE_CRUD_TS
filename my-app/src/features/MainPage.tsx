// my-app/src/components/HomePage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "react-error-boundary";
import { APP_NAME } from "@shared/utils/api/configs/URL";
import { grid } from "@assets/index";
import { Button, HeaderTitle, Clock } from "@shared/components";
import {
  GetIcon,
  GetJWTToken,
  ButtonClasses,
  ButtonLINKClasses,
  PageClasses,
  PageHeaderClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils";

const HomePage = () => {
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  useEffect(() => {
    const token = GetJWTToken();
    if (!token) {
      navigate("/404", {
        replace: true,
        state: { error: "Invalid or expired token" },
      });
    }
  }, []);

  const GetAppTitle = () => `${APP_NAME}`

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("home")}
        className={PageHeaderClasses}
        title={GetAppTitle()}
      />
      <Clock />
      <div className={PageContainClasses}>
        <img className={GridClasses} src={grid} alt="Grid" />
        <div className="flex flex-col mt-5">
          <Button Icon={GetIcon("")} className={ButtonClasses}>
            FEATURES
          </Button>
          <Button
            Icon={GetIcon("IOTPortal")}
            className={ButtonLINKClasses}
            to="/IOTPortals"
          >
            IOT PORTAL
          </Button>
          <Button
            Icon={GetIcon("SPKAPortal")}
            className={ButtonLINKClasses}
            to="/SPKAPortals"
          >
            SPKA PORTAL
          </Button>
          <Button
            Icon={GetIcon("MapPinHouse")}
            className={ButtonLINKClasses}
            to="/sitemap"
          >
            SITE MAP
          </Button>
          <Button
            Icon={GetIcon("Gauge")}
            className={ButtonLINKClasses}
            to="/gauge"
          >
            GAUGE
          </Button>
          <Button
            Icon={GetIcon("ChartSpline")}
            className={ButtonLINKClasses}
            to="/charting"
          >
            CHARTING
          </Button>
          <Button
            Icon={GetIcon("Calendar")}
            className={ButtonLINKClasses}
            to="/calendar"
          >
            CALENDER
          </Button>
          <Button
            Icon={GetIcon("Sunburst")}
            className={ButtonLINKClasses}
            to="/sunburst"
          >
            SUNBURST
          </Button>
          {/* <Button Icon={GetIcon('workers')} className={ButtonLINKClasses} to="/workers">WORKERS LISTS</Button> */}
          {/* <Button Icon={GetIcon('restaurants')} className={ButtonLINKClasses} to='/restaurants'>RESTAURANTS LISTS</Button> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
