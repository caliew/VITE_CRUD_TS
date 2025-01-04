import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { grid } from "@assets/index";
import { Button, HeaderTitle, Card, SunburstChart } from "@shared/components";
import { GetIcon } from '@utils/icon';
import { Get485SensorREADING, GetFINALChildrenNOES } from "@utils/sensor";
import {
  PageClasses,
  PageHeaderClasses,
  IOTSensorsClasses,
  ButtonLINKClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils/classname";

import { fetchIOTPortal } from "@features/IOTPortal/stores/iotPortalSlice";

const IOTPortalPage = () => {
  const dispatch = useDispatch();
  const iotPortal = useSelector((state: any) => state.iotPortal.iotPortal);
  const isLoading = useSelector((state: any) => state.iotPortal.isLoading);
  const handleError = useErrorHandler();

  const LoadingIcon = GetIcon("Loading");

  const [iotSensors, setIOTSensors] = useState({});
  const [iotSensorData, setIOTSensorData] = useState([]);
  // ----------------------------------------------------
  const [selIOTSensors, setSelIOTSensors] = useState(null);
  const [groupIOTSensors, setGroupIOTSensorData] = useState(null);

  useEffect(() => {
    dispatch(fetchIOTPortal());
  }, [dispatch]);

  useEffect(() => {
    //
    let IOTSensors = iotPortal?.["settings"]?.["IOT_SENSORS"] || {};
    let IOT485SensorData = iotPortal?.["sensorData"] || [];
    let WISensorData = iotPortal?.["WISensor"] || [];
    //
    IOT485SensorData = IOT485SensorData.filter(
      (data: any) => data["MODE"] == "RS485"
    );
    const SensorIDs = Object.keys(IOTSensors) ?? [];
    const IOTSensorData = { "485": IOT485SensorData, WISensor: WISensorData };
    // -----------------------
    setIOTSensors(IOTSensors);
    setIOTSensorData(IOTSensorData);
    setSelIOTSensors(SensorIDs);
    // -----------------------------
    const prepareGroupIOTSensorData = async () => {
      const GroupIOTSensors = Object.keys(IOTSensors).reduce(
        (acc: any, sensorId: any) => {
          let sensor = IOTSensors[sensorId][1];
          const GroupName = sensor["GROUP"];
          const SensorType = sensor["TYPE"];
          // -------------------------------
          if (!acc[GroupName]) acc[GroupName] = {};
          if (!acc[GroupName][SensorType]) acc[GroupName][SensorType] = [];
          // ----------------------------------
          const _ObjSensor = IOTSensors[sensorId][1];
          const _TYPE = String(_ObjSensor["TYPE"]).toUpperCase();
          let _SensorDatas, _SensorData, _RSLT, _HEX;
          if (_TYPE == "WISENSOR") {
            _SensorDatas = WISensorData[sensorId];
            _SensorData = _SensorDatas[_SensorDatas.length - 1];
            _RSLT = getWISensorData(_SensorData);
            sensor = { ...sensor, ID: sensorId, READING: _RSLT };
          } else {
            _SensorDatas = IOTSensorData["485"].filter(
              (data: any) => data["DTU.ID"] == sensorId
            );
            _SensorData = _SensorDatas[_SensorDatas.length - 1];
            _HEX = _SensorData?.["RCV.BYTES"] || "00";
            const _READING = Get485SensorREADING({
              ..._ObjSensor,
              HEX: _HEX,
              SensorData: _SensorData,
            });
            sensor = { ...sensor, ID: sensorId, HEX: _HEX, READING: _READING };
          }
          acc[GroupName][SensorType].push(sensor);
          return acc;
        },
        {}
      );
      // ---------
      setGroupIOTSensorData(GroupIOTSensors);
    };
    prepareGroupIOTSensorData();
    // ---------
  }, [iotPortal]);

  const getWISensorData = (SensorData: any) => {
    let _TEMP = SensorData?.["Temperature"] ?? 0;
    let _HUMD = SensorData?.["Humidity"] ?? 0;
    return { TEMP: Number(_TEMP).toFixed(2), HUMD: Number(_HUMD).toFixed(2) };
  };
  const getSensorHEX = (sensorId: any) => {
    let sensorData;
    const _TYPE = iotSensors[sensorId][1]["TYPE"];
    if (_TYPE == "WISENSOR") {
      sensorData = iotSensorData["WISensor"][sensorId];
    } else {
      sensorData = iotSensorData["485"].filter(
        (data: any) => data["DTU.ID"] == sensorId
      );
    }
    let _data = sensorData[sensorData.length - 1];
    let _HEX = _data?.["RCV.BYTES"] || "00";
    return _HEX;
  };
  const onEventCallback = (nodes: any) => {
    const SelectionNodes = GetFINALChildrenNOES(nodes);
    const _IDs = SelectionNodes.map((obj) => obj.id);
    setSelIOTSensors(_IDs);
  };

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("IOTPortal")}
        className={PageHeaderClasses}
        title="IOT PORTAL"
      />
      <div className={PageContainClasses}>
        <img className={GridClasses} src={grid} alt="Grid" />
        {isLoading && (
          <div className="flex justify-center items-center w-full h-full font-Roboto font-extralight text-4xl">
            <LoadingIcon className="size-36 text-white stroke-[0.75] absoluteStrokeWidth animate-spin" />
            Loading...
          </div>
        )}
        <div className={IOTSensorsClasses}>
          {groupIOTSensors && (
            <div className="relative w-auto m-1">
              <SunburstChart
                className=""
                data={groupIOTSensors}
                onEventCallback={onEventCallback}
              />
            </div>
          )}
          {selIOTSensors &&
            selIOTSensors.map((sensorId: any) => {
              let _HEX;
              let _READING;
              const ObjSensor = iotSensors[sensorId][1];
              const _TYPE = ObjSensor["TYPE"];
              if (_TYPE == "WISENSOR") {
                const _SensorDatas = iotSensorData["WISensor"][sensorId];
                const _SensorData = _SensorDatas[_SensorDatas.length - 1];
                _READING = getWISensorData(_SensorData);
              } else {
                _HEX = getSensorHEX(sensorId);
                _READING = Get485SensorREADING({ ...ObjSensor, HEX: _HEX });
              }
              return (
                <Card
                  className="font-Roboto font-extralight text-xl"
                  sensorType={ObjSensor["TYPE"]}
                  group={ObjSensor["GROUP"] || "UNDEFINED"}
                  name={ObjSensor["NAME"] || "UNDEFINED"}
                  sensorId={sensorId}
                  reading={_READING}
                  unitSystem={ObjSensor.UNITSYSTEM}
                  px="px-10"
                />
              );
            })}
        </div>
      </div>
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
    </div>
  );
};

export default IOTPortalPage;
