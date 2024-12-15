// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';

import { ChartClasses } from "../../utils";

interface CalendarProp {
  className?: string;
  title?: string
  dateList?: any
  dateRange?: any
}

const Calendar : React.FC<CalendarProp> = ({className,title, dateList, dateRange}) => {

  const chartRef = useRef(null);
  const [option, setOption] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const defaultDateRange = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  const range = dateRange ?? defaultDateRange;

  useEffect(() => {
    // --------------------
    const lunarData = [];
    const heatmapData = [];
    //  -------------------
    for (let i = 0; i < dateList.length; i++) {
      heatmapData.push([dateList[i][0], Math.random() * 30]);
      lunarData.push([dateList[i][0], 1, dateList[i][1], dateList[i][2]]);
    }
    const option = {
      tooltip: { formatter: function (params) { return '降雨量: ' + params.value[1].toFixed(2);} },
      visualMap: {
        show: false, min: 0,max: 30, calculable: true, seriesIndex: [2], 
        orient: 'horizontal',left: 'center',bottom: 20,
        inRange: { color: ['#e0ffff', '#006edd'], opacity: 0.3 },
        controller: { inRange: { opacity: 0.5 } }
      },
      calendar: [
        {
          left: 'center', top: 'middle', cellSize: 70,
          orient: 'vertical',
          yearLabel: { show: true, nameMap: 'cn', nameLocation: 'start', fontFamily:'Roboto', fontSize: 24, fontWeight: 200, color: 'yellow', margin:15 },
          dayLabel: { firstDay: 1, nameMap: 'cn', fontFamily:'Roboto', fontSize: 16, fontWeight: 200, color: 'yellow', margin:2 },
          monthLabel: { show: true, fontFamily:'Roboto', fontSize: 24, fontWeight: 200, color: 'yellow', margin:20 },
          range: range
        }
      ],
      series: [
        {
          type: 'scatter', coordinateSystem: 'calendar', symbolSize: 0,
          data: lunarData, silent: true,
          label: { 
            show: true, color: 'black',
            fontFamily:'Roboto', fontSize:14, fontWeight: 300,
            formatter: function (params:any) {
              var d = echarts.number.parseDate(params.value[0]);
              return d.getDate() + '\n' + params.value[2] + '\n';
            }
          },
        },
        {
          type: 'scatter', coordinateSystem: 'calendar',symbolSize: 0,
          data: lunarData, silent: true,
          label: { show: true,
            formatter: function (params:any) { return '\n\n\n' + (params.value[3] || ''); },
            fontFamily:'Roboto', fontSize: 14, fontWeight: 300, color: 'blue'
          },
        },
        { name: '降雨量', type: 'heatmap', coordinateSystem: 'calendar', data: heatmapData }
      ]
    };
    setOption(option)
  }, [dateRange]);

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
        style={{width:'850px',height:'450px'}}
      />
      {title}
    </div>
  );
};

const propsAreEqual = (prevProps: CalendarProp, nextProps: CalendarProp) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.title === nextProps.title 
  );
};
export default React.memo(Calendar,propsAreEqual);
