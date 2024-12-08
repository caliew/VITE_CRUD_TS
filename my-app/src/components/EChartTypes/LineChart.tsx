// my-app/src/components/EChart.tsx
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { ChartClasses } from "../../utils";

interface LineChartProp {
  className?: string;
  name?: string;
  series?: any;
  dataX: any;
  dataY: any;
}

const LineChart : React.FC<LineChartProp> = ({className,name,series,dataX,dataY}) => {

  const [option, setOption] = useState({});

  useEffect(() => {
    const colors = ['#5470C6', '#EE6666'];

    const option = {
      color: colors,
      title: { left: 'center',bottom: '0',text: name, 
               textStyle: { fontFamily: 'Roboto', fontSize: 24, fontWeight: 1, color: '#fff', }},
      tooltip: {
        trigger: 'none',
        axisPointer: { type: 'cross' } },
      legend: { textStyle: { fontFamily: 'Roboto', fontSize: 24, fontWeight: 1, color: '#fff', }},
      grid: { top: 70, bottom: 70 },
      xAxis: [ {
        type: 'category',
        axisLabel: { fontSize:18, fontFamily: 'Roboto', fontWeight: 1, color: '#fff' },
        axisTick: { alignWithLabel: true },
        axisLine: { onZero: false, lineStyle: { color: colors[1] } },
        axisPointer: { label: { formatter: function (params) { return ( 'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '') ); } } },
        // prettier-ignore
        data: dataX 
      }],
      yAxis: [ { 
        type: 'value', 
        axisLabel: { fontSize:18, fontFamily: 'Roboto', fontWeight: 1, color: '#fff' }
      }],
      series: [
        { name: series[0], type: 'line', xAxisIndex: 0, smooth: true, 
          emphasis: { focus: 'series' },
          data: dataY[0] },
        { name: series[1], type: 'line', xAxisIndex: 0, smooth: true, 
          emphasis: { focus: 'series' },
          data: dataY[1] }
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
    <div className="flex flex-wrap justify-center items-center font-Roboto text-xl">
      <ReactECharts
        className={`${ChartClasses} ${className}`}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={""}
        onChartReady={onChartReadyCallback}
        onEvents={onEvents}
        style={{width:'850px',height:'650px'}}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};

export default LineChart;
