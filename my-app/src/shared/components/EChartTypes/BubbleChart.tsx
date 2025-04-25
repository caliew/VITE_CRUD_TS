// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

import { ChartClasses } from "@shared/utils/classname";

interface BubbleChartProp {
  className?: string;
  title?: string;
  data: any;
}

const BubbleChart: React.FC<BubbleChartProp> = ({ className, title, data }) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});
  console.log("BUBBLE CHART COMPONENT=", data);

  useEffect(() => {
    console.log("USE EFFECT=", data);
    const _option = {
      backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
        {
          offset: 0,
          color: "#f7f8fa",
        },
        {
          offset: 1,
          color: "#cdd0d5",
        },
      ]),
      title: {
        text: title,
        left: "55%",
        top: "3%",
      },
      legend: {
        right: "10%",
        top: "3%",
        data: ["1990", "2015"],
      },
      grid: {
        left: "15%",
        top: "15%",
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
        scale: true,
      },
      series: [
        {
          name: "ACTIVE",
          data: data,
          type: "scatter",
          symbolSize: function (data) {
            return Math.sqrt(data[2]) / 0.4;
          },
          label: {
            show: true,
            formatter: function (params: any) {
              return params.data[3];
            },
            position: "middle",
            fontSize: 12,
            fontWeight: "bold",
            color: "black",
          },
          emphasis: {
            focus: "series",
            label: {
              show: true,
              formatter: function (param: any) {
                return param.data[3];
              },
              position: "top",
              fontSize: 12,
              fontWeight: "bold",
              color: "black",
            },
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(120, 36, 50, 0.5)",
            shadowOffsetY: 5,
            color: function (params: any) {
              // return a color based on the data item
              switch (params.data[4].toUpperCase()) {
                case "AT RISK":
                  return "rgb(255, 0, 0)"; // red
                case "ON TRACK":
                  return "rgb(0, 255, 0)"; // green
                case "COMPLETED":
                  return "rgb(0, 0, 255)"; // blue
                case "DELAYED":
                  return "rgb(255, 255, 0)"; // yellow
                case "ON HOLD":
                  return "rgb(255, 0, 255)"; // magenta
              }
            },
          },
        },
      ],
    };
    setOption(_option);
  }, [data]);

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
        style={{ width: "450px", height: "450px" }}
      />
    </div>
  );
};

const propsAreEqual = (
  prevProps: BubbleChartProp,
  nextProps: BubbleChartProp
) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.title === nextProps.title &&
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
  );
};

export default React.memo(BubbleChart, propsAreEqual);
