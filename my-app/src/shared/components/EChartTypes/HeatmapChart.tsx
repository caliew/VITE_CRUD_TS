// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

import { ChartClasses } from "@shared/utils/classname";
import { fontSize, height } from "@mui/system";

interface HeatmapChartProp {
  className?: string;
  title?: string;
  calenderData: any;
}

const HeatmapChart: React.FC<HeatmapChartProp> = ({
  className,
  title,
  calenderData,
}) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});

  useEffect(() => {
    if (calenderData === null) return;
    const daysOfYear = calenderData.daysOfYear;
    const ObjResources = calenderData?.resourceArrays ?? null;
    if (ObjResources === null) return;
    const ResourcesKEY = Object.keys(ObjResources);
    const _data = calenderData?.calender ?? null;
    if (_data === null || Object.keys(_data).length === 0) return;

    let ObjDataArr: any[][] = [];
    Object.entries(_data).forEach(([day, resources]) => {
      const dayIndex = daysOfYear.indexOf(parseInt(day));
      Object.keys(resources).forEach((resource) => {
        const resourceIndex = ResourcesKEY.indexOf(resource);
        const totalResource = resources[resource];
        ObjDataArr.push([dayIndex, resourceIndex, totalResource]);
      });
    });

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
        data: ResourcesKEY,
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
        nameGap: 50,
      },
      visualMap: {
        min: 0,
        max: 3,
        calculable: true,
        orient: "vertical", // change from "horizontal" to "vertical"
        right: "0%", // add this property to set the visualMap to the right
        top: "middle", // add this property to center the visualMap vertically
        height: "80%",
        inRange: {
          color: ["#00FF00", "#FF0000"], // green to red
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
      console.log(params);
    },
  };

  return (
    <div className="flex flex-col flex-wrap justify-center items-center font-Roboto font-extralight text-2xl">
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
