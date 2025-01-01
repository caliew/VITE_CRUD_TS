import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { grid } from "@assets/index";
import {
  Button,
  HeaderTitle,
  MapBox,
  MapChart,
  TiltedImage,
} from "@shared/components";
import { GetIcon } from "@shared/utils";
import {
  PageClasses,
  PageHeaderClasses,
  ButtonLINKClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils/classname";

const geojson = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: [
      {
        id: 1,
        type: "Feature",
        geometry: { type: "Point", coordinates: [101.662264, 3.172387] },
        properties: { title: "BUILDING 1" },
      },
      {
        id: 2,
        type: "Feature",
        geometry: { type: "Point", coordinates: [101.660025, 3.1754] },
        properties: { title: "BUILDING 2" },
      },
      {
        id: 3,
        type: "Feature",
        geometry: { type: "Point", coordinates: [101.651125, 3.1663] },
        properties: { title: "BUILDING 3" },
      },
    ],
  },
};

const SiteMapPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  useEffect(() => {}, []);

  // absolute top-0 left-0 w-full max-w-full bg-blend-luminosity
  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("MapPinHouse")}
        className={PageHeaderClasses}
        title="SITE MAP"
      />
      <div className={PageContainClasses}>
        <div className="flex flex-row flex-wrap justify-center items-center">
          <img className={GridClasses} src={grid} alt="Grid" />
          <div className="flex flex-wrap">
            <div>
              <MapBox GeoJSON={geojson} />
            </div>
            <div className="flex flex-col flex-wrap justify-center items-center">
              {geojson.data.features.map((ObjSite: any) => (
                <div className="flex flex-col px-5 justify-center items-center font-Roboto text-2xl font-extralight">
                  {ObjSite.id} - {ObjSite.properties.title}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col flex-wrap">
            <MapChart className="" title="SITE LAYOUT" />
            <TiltedImage className="w-[350px] h-[350px]" />
          </div>
        </div>
      </div>
      <div className="mt-15 flex flex-wrap flex-col">
        <Button Icon={GetIcon("home")} className={ButtonLINKClasses} to="/">BACK TO HOME</Button>
        <Button Icon={GetIcon("404")} className={ButtonLINKClasses} onClick={() => { handleError(new Error('Simulated error')) }}>SIMULATE ERROR</Button>
      </div>
    </div>
  );
};

export default SiteMapPage;
