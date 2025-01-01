// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

import { ChartClasses } from "../../utils";

interface SimpleGaugeProp {
  value: number;
  name?: string;
  className?: string;
  title?: string;
  min?: number;
  max?: number;
  unit?: string;
}

const SimpleGauge: React.FC<SimpleGaugeProp> = ({
  value,
  name,
  className,
  title,
  min,
  max,
  unit,
}) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});

  useEffect(() => {
    const option = {
      darkmode: false,
      backgroundColor: "rgba(0, 0, 0, 0.0)",
      series: [
        {
          name: "Radial 1",
          type: "gauge",
          min: min,
          max: max,
          splitNumber: 12,
          startAngle: 200,
          endAngle: -20,
          center: ["50%", "50%"],
          itemStyle: { color: "#FFAB91" },
          progress: { show: true, width: 30 },
          axisLine: { lineStyle: { width: 30 } },
          axisTick: {
            distance: -40,
            splitNumber: 5,
            lineStyle: { width: 1, color: "#999" },
          },
          splitLine: {
            distance: -50,
            length: 15,
            lineStyle: { width: 1, color: "#999" },
          },
          axisLabel: {
            distance: 5,
            color: "#999",
            fontSize: 14,
            fontFamily: "Tahoma",
            formatter: function (value) {
              return value.toFixed(0);
            },
          },
          anchor: {},
          pointer: { show: false },
          title: {
            color: "cyan",
            fontSize: 22,
            fontFamily: "Roboto",
            fontWeight: 80,
            offsetCenter: [0, 60],
          },
          detail: {
            offsetCenter: ["0%", "20%"],
            fontSize: 8,
            formatter: `{a|{value}}{b|${unit}}`,
            rich: {
              a: {
                fontSize: 22,
                fontFamily: "Roboto",
                fontWeight: 80,
                color: "#fff",
                align: "center",
                padding: [0, 5, 0, 0],
              },
              b: {
                fontSize: 13,
                fontFamily: "Roboto",
                fontWeight: 80,
                color: "#fff",
                padding: [0, 0, 10, 0],
              },
            },
          },
          data: [{ value: value, name: title }],
        },
        {
          name: "Radial 2",
          type: "gauge",
          min: min,
          max: max,
          startAngle: 200,
          endAngle: -20,
          center: ["50%", "50%"],
          itemStyle: { color: "green" },
          progress: { show: true, width: 15 },
          pointer: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          detail: { show: false },
          data: [{ value: value }],
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
    <div className="flex flex-col flex-wrap justify-center items-center font-Roboto font-extralight text-2xl overflow-hidden">
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
        style={{ width: "240px" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};

const propsAreEqual = (
  prevProps: SimpleGaugeProp,
  nextProps: SimpleGaugeProp
) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.title === nextProps.title
  );
};
export default React.memo(SimpleGauge, propsAreEqual);
