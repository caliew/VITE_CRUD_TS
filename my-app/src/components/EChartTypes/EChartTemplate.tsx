// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts/core';

import { ChartClasses } from "../../utils";

interface EChartProp {
  className?: string;
  title?: string
}

const EChart : React.FC<EChartProp> = ({className,title}) => {

  const chartRef = useRef(null);
  const [option, setOption] = useState({});

  useEffect(() => {
    const option = {};
    setOption(option)
  }, []);

  const onChartReadyCallback = () => {};
  const onEvents = {
    click: (params: any) => {
      console.log(params);
    },
  };

  return (
    <div className="flex flex-wrap justify-center items-center font-Roboto font-extralight text-2xl">
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
        style={{width:'850px',height:'450px'}}
      />
      {title}
    </div>
  );
};

const propsAreEqual = (prevProps: EChartProp, nextProps: EChartProp) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.title === nextProps.title 
  );
};
export default React.memo(EChart,propsAreEqual);
