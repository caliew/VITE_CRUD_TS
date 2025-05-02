// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

import { ChartClasses } from "@shared/utils/classname";
import { wrap } from "module";
import { color } from "echarts";
import { Padding } from "@mui/icons-material";

interface BubbleChartProp {
  className?: string;
  title?: string;
  data: any;
}

const BubbleChart: React.FC<BubbleChartProp> = ({ className, title, data }) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});

  useEffect(() => {
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
        left: "60%",
        right: "5%",
        top: "5%",
        padding: [380, 0, 0, -10], // add padding to control width
        textStyle: {
          fontSize: 22, // change font size to 18
          fontWeight: "normal", // change font weight to bold
          fontFamily: "Tahoma", // change font family to Arial
          color: "blue",
          wrap: true,
          rich: {
            align: "left",
            verticalAlign: "top",
          },
        },
      },
      legend: {
        right: "10%",
        top: "3%",
        data: ["1990", "2015"],
      },
      grid: {
        left: "10%",
        top: "15%",
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: "solid",
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
            return Math.sqrt(data[5]) / 0.2;
          },
          label: {
            show: true,
            formatter: function (params: any) {
              return params.data[3];
            },
            position: "bottom",
            fontSize: 13,
            wrap: true,
            fontWeight: "normal",
            color: "black",
          },
          emphasis: {
            focus: "series",
            label: {
              show: true,
              formatter: function (param: any) {
                return (
                  param.data[3] +
                  "\n" +
                  param.data[4] +
                  "\n" +
                  "RESOURCE =" +
                  param.data[5] +
                  "/" +
                  param.data[2]
                );
              },
              position: "top",
              fontSize: 14,
              fontWeight: "normal",
              color: "white",
              backgroundColor: "blue", // add this line
              padding: [10, 10, 10, 10],
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
        style={{ width: "650px", height: "450px" }}
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
