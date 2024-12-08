// my-app/src/components/EChart.tsx
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartClasses } from "../../utils";

interface SimpleGaugeProp {
  value: number;
  className?: string;
  name?:string;
  min:number;
  max:number;
  unit?:string;
}

const SimpleGauge: React.FC<SimpleGaugeProp> = ({value,className,name,min,max,unit}) => {

  const [option, setOption] = useState({});

  useEffect(() => {
    const option = {
      darkmode:false,
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
      series: [
        {
          name: 'Radial 1', type: "gauge", min: min, max: max, splitNumber: 12,
          startAngle: 200, endAngle: -20, center: ["50%", "60%"], 
          itemStyle: { color: "#FFAB91" },
          progress: { show: true, width: 30 },
          axisLine: { lineStyle: { width: 30 } },
          axisTick: { distance: -40, splitNumber: 5, lineStyle: { width: 1, color: "#999" }},
          splitLine: { distance: -50, length: 15, lineStyle: { width: 1, color: "#999" } },
          axisLabel: { distance: 5, color: "#999", fontSize: 15, fontFamily: "Tahoma",  
                       formatter: function (value) { return value.toFixed(0); } },
          anchor: { },
          pointer: { show: false },
          title: { color: 'cyan', fontSize: 24, fontFamily: 'Roboto', fontWeight: 80, offsetCenter: [0, 40] },
          detail: {
            offsetCenter: ['0%', '0%'], fontSize: 14,
            formatter: `{a|{value}}{b|${unit}}`, 
            rich: { 
              a: { fontSize: 28, fontFamily: 'Roboto', fontWeight: 80, color: '#fff', align: 'center', padding: [0, 5, 0, 0] },
              b: { fontSize: 15, fontFamily: 'Roboto', fontWeight: 80, color: '#fff', padding: [0, 0, 20, 0] }
            }
          },
          data: [{ value: value, name: name }],
        },
        {
          name: 'Radial 2', type: "gauge", min: min, max: max, 
          startAngle: 200, endAngle: -20, center: ["50%", "60%"],
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
    <div className="flex flex-wrap justify-center items-center font-Roboto text-xl overflow-hidden">
      <ReactECharts
        className={`${ChartClasses} ${className}`}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={""}
        onChartReady={onChartReadyCallback}
        onEvents={onEvents}
        style={{width:'250px'}}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};

export default SimpleGauge;
