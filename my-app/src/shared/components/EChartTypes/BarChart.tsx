// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

import { ChartClasses } from "@shared/utils/classname";

interface BarChartProp {
  className?: string;
  title?: string;
  subtitle?: string;
  seriesLabels?: any;
  legendsLabels?: any;
}

const BarChart: React.FC<BarChartProp> = ({
  className,
  title,
  subtitle,
  seriesLabels,
  legendsLabels,
}) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});

  useEffect(() => {
    const option = {
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
      tooltip: { trigger: "axis" },
      legend: {
        show: false,
        padding: 15,
        orient: "vertical",
        top: "15%",
        left: "15%",
        textStyle: {
          fontFamily: "Roboto",
          fontSize: 16,
          fontWeight: 1,
          color: "white",
          padding: [0, 0, 0, 0],
        },
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      ],
      yAxis: [{ type: "value" }],
      series: [
        {
          name: seriesLabels[0],
          type: "bar",
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
          ],
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: { data: [{ type: "average", name: "Avg" }] },
        },
        {
          name: seriesLabels[1],
          type: "bar",
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
          ],
          markPoint: {
            data: [
              { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
              { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
            ],
          },
          markLine: { data: [{ type: "average", name: "Avg" }] },
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
    <div className="flex flex-col flex-wrap justify-center items-center font-Roboto  font-extralight text-2xl">
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
        style={{ width: "850px", height: "450px" }}
      />
    </div>
  );
};

const propsAreEqual = (prevProps: BarChartProp, nextProps: BarChartProp) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.title === nextProps.title
  );
};

export default React.memo(BarChart, propsAreEqual);
