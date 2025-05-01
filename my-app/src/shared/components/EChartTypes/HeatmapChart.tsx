// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { Button } from "@shared/components";
import { ButtonLINKClasses, ChartClasses } from "@shared/utils/classname";
import { GetIcon } from "@shared/utils/icon";
import { data } from "react-router-dom";

interface HeatmapChartProp {
  className?: string;
  title?: string;
  calenderData: any;
  increaseProjectResource: (resourceKey: string, day: number) => void;
}

const HeatmapChart: React.FC<HeatmapChartProp> = ({
  className,
  title,
  calenderData,
  increaseProjectResource = () => {},
}) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});
  const [resources, setResources] = useState(null);
  const [daysOfYear, setDaysOfYear] = useState(null);
  const [showHideResourceMap, setShowHideResourceMap] = useState(true);

  useEffect(() => {
    if (calenderData === null) return;
    const daysOfYear = calenderData.daysOfYear;
    const ObjResources = calenderData?.resourceArrays ?? null;
    if (ObjResources === null) return;
    setResources(ObjResources);
    setDaysOfYear(daysOfYear);
    const ResourcesKEY = Object.keys(ObjResources);

    const resourceTotals = {};
    Object.keys(calenderData.calender).forEach((day) => {
      Object.keys(calenderData.calender[day]).forEach((resource) => {
        if (!resourceTotals[resource]) {
          resourceTotals[resource] = 0;
        }
        resourceTotals[resource] += calenderData.calender[day][resource];
      });
    });
    const yAxisData = Object.keys(resourceTotals).map(
      (resource) => `${resource}: (${resourceTotals[resource]})`
    );

    const _data = calenderData?.calender ?? null;
    if (_data === null || Object.keys(_data).length === 0) return;

    const sums = {};
    Object.keys(ObjResources).forEach((key) => {
      sums[key] = ObjResources[key].reduce((acc, current) => acc + current, 0);
    });
    let ObjDataArr: any[][] = [];
    Object.entries(_data).forEach(([day, resources]) => {
      const dayIndex = daysOfYear.indexOf(parseInt(day));
      Object.keys(resources).forEach((resource) => {
        const resourceIndex = ResourcesKEY.indexOf(resource);
        const totalResource = resources[resource];
        ObjDataArr.push([dayIndex, resourceIndex, totalResource]);
      });
    });

    const maxResourceCounts = {};
    Object.values(calenderData.calender).forEach((dayResources) => {
      Object.keys(dayResources).forEach((resourceKey) => {
        const count = dayResources[resourceKey];
        if (
          !maxResourceCounts[resourceKey] ||
          count > maxResourceCounts[resourceKey]
        ) {
          maxResourceCounts[resourceKey] = count;
        }
      });
    });
    const maxResource = Math.max(...Object.values(maxResourceCounts));

    const _option = {
      title: {
        text: title,
        left: "center",
        top: "top",
        textStyle: {
          fontSize: 24,
          color: "#FFF",
          fontFamily: "Tahoma", // control the font family
          fontWeight: "normal", // control the font weight
        },
      },
      tooltip: {
        position: "top",
      },
      grid: {
        height: "80%",
        top: "10%",
      },
      xAxis: {
        type: "category",
        data: daysOfYear,
        name: "Day of Year",
        nameLocation: "middle",
        splitArea: {
          show: true,
        },
        axisLabel: {
          fontSize: 14, // control the label size
          color: "rgba(255, 255, 255, 0.8)", // control the label color
          fontFamily: "Tahoma", // control the font family
          fontWeight: "normal", // control the font weight
        },
        nameTextStyle: {
          fontSize: 16,
          fontWeight: "normal",
          color: "#FFF",
        },
        nameGap: 30,
      },
      yAxis: {
        type: "category",
        data: yAxisData,
        name: "Resources",
        nameLocation: "middle",
        splitArea: {
          show: true,
        },
        axisLabel: {
          fontSize: 14, // control the label size
          color: "rgba(255, 255, 255, 0.8)", // control the label color
          fontFamily: "Tahoma", // control the font family
          fontWeight: "normal", // control the font weight
        },
        nameTextStyle: {
          fontSize: 16,
          fontWeight: "normal",
          color: "#FFF",
        },
        nameGap: 80,
      },
      visualMap: {
        min: 0,
        max: maxResource * 1.15,
        calculable: true,
        orient: "vertical", // change from "horizontal" to "vertical"
        right: "0%", // add this property to set the visualMap to the right
        top: "middle", // add this property to center the visualMap vertically
        height: "80%",
        inRange: {
          color: ["#0000FF", "#00FF00", "#FF0000"], // green to red
        },
      },
      series: [
        {
          name: "Resources",
          type: "heatmap",
          data: ObjDataArr,
          label: {
            show: true,
            fontSize: 16,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    setOption(_option);
  }, [calenderData]);

  const onChartReadyCallback = () => {};
  const onEvents = {
    click: (params: any) => {
      const day = daysOfYear[params.value[0]];
      const resourceKEY = Object.entries(resources)[params.value[1]][0];
      if (typeof increaseProjectResource === "function") {
        increaseProjectResource(resourceKEY, day);
      }
    },
  };
  const onClickSHOWHIDERESOURCECALENDER = () => {
    setShowHideResourceMap((prevValue) => !prevValue);
  };

  return (
    <div className="flex flex-col flex-wrap justify-center items-center font-Roboto font-extralight text-2xl">
      <Button
        Icon={GetIcon("home")}
        className={ButtonLINKClasses}
        onClick={onClickSHOWHIDERESOURCECALENDER}
      >
        {showHideResourceMap ? "HIDE" : "SHOW"} RESOURCE CALENDER
      </Button>
      {showHideResourceMap && (
        <ReactECharts
          ref={chartRef}
          echarts={echarts}
          className={`${ChartClasses} ${className}`}
          option={option}
          notMerge={true}
          lazyUpdate={true}
          theme={""}
          onChartReady={onChartReadyCallback}
          onEvents={onEvents}
          opts={{ renderer: "svg" }}
          style={{ width: "1150px", height: "550px" }}
        />
      )}
    </div>
  );
};

const propsAreEqual = (
  prevProps: HeatmapChartProp,
  nextProps: HeatmapChartProp
) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.title === nextProps.title &&
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(prevProps.calenderData) ===
      JSON.stringify(nextProps.calenderData)
  );
};

export default React.memo(HeatmapChart, propsAreEqual);
