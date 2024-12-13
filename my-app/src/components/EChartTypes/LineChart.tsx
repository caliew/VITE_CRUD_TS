// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts/core';

import { ChartClasses } from "../../utils";

interface LineChartProp {
  className?: string;
  title?: string;
  seriesLabels?: any;
  legendsLabels?: any;
  merge?: boolean;
  inverse?: boolean;
  dataX: any;
  dataY: any;
}

const colors = ['#5470C6', '#EE6666'];
const getYAxisNameTextStyle = { fontFamily: 'Roboto', fontStyle: 'normal', fontSize: 18, fontWeight: 1, color: 'cyan', padding: [0, 0, 20, 0] };
const getGrid = true ? { top: 80, bottom: 80, left: 80,right: 50 } : [{left: 80,right: 50,height: '35%'},{left: 80,right: 50,top: '55%',height: '35%'}];

const LineChart : React.FC<LineChartProp> = ({className,title,seriesLabels,legendsLabels,merge,inverse,dataX,dataY}) => {

  const chartRef = useRef(null);
  const [option, setOption] = useState({});

  const getXAxis = [
    { type: 'category', boundaryGap: false, axisLabel: { fontSize:14, fontFamily: 'Roboto', fontWeight: 1, color: 'white' }, axisLine: { onZero: true }, data: dataX },
    { type: 'category', boundaryGap: false, axisLabel: { fontSize:14, fontFamily: 'Roboto', fontWeight: 1, color: 'white' }, axisLine: { onZero: true }, data: dataX } ]
  const getYAxis = merge ? 
    {  type: 'value', name:seriesLabels[0], nameLocation :'center', inverse, nameTextStyle: getYAxisNameTextStyle, axisLabel: { fontSize:18, fontFamily: 'Roboto', fontWeight: 1, color: 'white' } } :
    [
      { type: 'value', name:seriesLabels[0], nameLocation :'center', nameTextStyle: getYAxisNameTextStyle, axisLabel: { fontSize:18, fontFamily: 'Roboto', fontWeight: 1, color: 'white' } },
      { type: 'value', name:seriesLabels[1], gridIndex: 0, nameLocation :'center', inverse, nameTextStyle: getYAxisNameTextStyle, axisLabel: { fontSize:18, fontFamily: 'Roboto', fontWeight: 1, color: 'white' } }
    ]

  const getYAxisIndex = true ? 0 : 1;

  useEffect(() => {
    const option = {
      color: colors,
      title: { left: 'center',bottom: '0',text: title, textStyle: { fontFamily: 'Roboto', fontSize: 24, fontWeight: 1, color: '#fff', }},
      legend: { padding:15, orient:'vertical', top:'15%', left:'15%', textStyle: { fontFamily: 'Roboto', fontSize: 16, fontWeight: 1, color: 'yellow', padding: [0, 0, 0, 0]} },
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross', animation: false, label: { backgroundColor: '#505765' } } },
      grid: getGrid,
      xAxis: getXAxis,
      yAxis: getYAxis,
      series: [
        { name: legendsLabels[0], type: 'line', 
          markArea:{silent: true, itemStyle: { opacity: 0.75 }, data:[[{xAxis:'2009/6/12 5:00'},{xAxis:'2009/6/12 9:00'}]]},
          yAxisIndex:0, smooth: true, emphasis: { focus: 'series' }, data: dataY[0] },
        { name: legendsLabels[1], type: 'line', yAxisIndex: getYAxisIndex,  smooth: true, emphasis: { focus: 'series' }, data: dataY[1] }
      ]
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
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={""}
        onChartReady={onChartReadyCallback}
        onEvents={onEvents}
        opts={{ renderer: "svg" }}
        style={{width:'450px',height:'450px'}}
      />
    </div>
  );
};

const propsAreEqual = (prevProps: LineChartProp, nextProps: LineChartProp) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.title === nextProps.title 
  );
};

export default React.memo(LineChart,propsAreEqual);
