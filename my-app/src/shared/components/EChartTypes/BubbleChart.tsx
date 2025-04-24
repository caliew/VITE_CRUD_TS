// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

import { ChartClasses } from "@shared/utils/classname";

interface BubbleChartProp {
  className?: string;
  title?: string;
  seriesLabels?: any;
  legendsLabels?: any;
  merge?: boolean;
  inverse?: boolean;
  dataX: any;
  dataY: any;
}

const data = [
  [
    [45, 5.12, 850, "ERP System Implementation", "ON TRACK"],
    [68, 4.08, 420, "Mobile App Development", "AT RISK"],
    [22, 6.86, 1200, "Cloud Migration", "DELAYED"],
    [92, 2.52, 300, "CRM System Upgrade", "COMPLETED"],
    [33, 4.41, 600, "Data Analytics Platform", "ON HOLD"],
  ],
];
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
    text: "Effort Vs. Progress",
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
      data: data[0],
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
          switch (params.data[4]) {
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

const colors = ["#5470C6", "#EE6666"];
const getYAxisNameTextStyle = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontSize: 18,
  fontWeight: 1,
  color: "cyan",
  padding: [0, 0, 20, 0],
};
const getGrid = true
  ? { top: 80, bottom: 80, left: 80, right: 50 }
  : [
      { left: 80, right: 50, height: "35%" },
      { left: 80, right: 50, top: "55%", height: "35%" },
    ];

const BubbleChart: React.FC<BubbleChartProp> = ({
  className,
  title,
  seriesLabels,
  legendsLabels,
  merge,
  inverse,
  dataX,
  dataY,
}) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});

  const getXAxis = [
    {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        fontSize: 14,
        fontFamily: "Roboto",
        fontWeight: 1,
        color: "white",
      },
      axisLine: { onZero: true },
      data: dataX,
    },
    {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        fontSize: 14,
        fontFamily: "Roboto",
        fontWeight: 1,
        color: "white",
      },
      axisLine: { onZero: true },
      data: dataX,
    },
  ];
  const getYAxis = merge
    ? {
        type: "value",
        name: seriesLabels[0],
        nameLocation: "center",
        inverse,
        nameTextStyle: getYAxisNameTextStyle,
        axisLabel: {
          fontSize: 18,
          fontFamily: "Roboto",
          fontWeight: 1,
          color: "white",
        },
      }
    : [
        {
          type: "value",
          name: seriesLabels[0],
          nameLocation: "center",
          nameTextStyle: getYAxisNameTextStyle,
          axisLabel: {
            fontSize: 18,
            fontFamily: "Roboto",
            fontWeight: 1,
            color: "white",
          },
        },
        {
          type: "value",
          name: seriesLabels[1],
          gridIndex: 0,
          nameLocation: "center",
          inverse,
          nameTextStyle: getYAxisNameTextStyle,
          axisLabel: {
            fontSize: 18,
            fontFamily: "Roboto",
            fontWeight: 1,
            color: "white",
          },
        },
      ];

  const getYAxisIndex = true ? 0 : 1;

  useEffect(() => {
    const option = {
      color: colors,
      title: {
        text: title,
        left: "center",
        bottom: "0",
        textStyle: {
          fontFamily: "Roboto",
          fontSize: 24,
          fontWeight: 1,
          color: "#fff",
        },
      },
      legend: {
        padding: 15,
        orient: "vertical",
        top: "15%",
        left: "15%",
        textStyle: {
          fontFamily: "Roboto",
          fontSize: 16,
          fontWeight: 1,
          color: "yellow",
          padding: [0, 0, 0, 0],
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          animation: false,
          label: { backgroundColor: "#505765" },
        },
      },
      grid: getGrid,
      xAxis: getXAxis,
      yAxis: getYAxis,
      series: [
        {
          name: legendsLabels[0],
          type: "line",
          markArea: {
            silent: true,
            itemStyle: { opacity: 0.75 },
            data: [[{ xAxis: "2009/6/12 5:00" }, { xAxis: "2009/6/12 9:00" }]],
          },
          yAxisIndex: 0,
          smooth: true,
          emphasis: { focus: "series" },
          data: dataY[0],
        },
        {
          name: legendsLabels[1],
          type: "line",
          yAxisIndex: getYAxisIndex,
          smooth: true,
          emphasis: { focus: "series" },
          data: dataY[1],
        },
      ],
    };
    setOption(option);
  }, []);

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
        option={_option}
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
    prevProps.title === nextProps.title
  );
};

export default React.memo(BubbleChart, propsAreEqual);
