// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts/core';

// import MapSVG from '../../assets/Map_of_Iceland.svg?raw';
import MapSVG from '/assets/floorplan.svg?raw';
import axios from 'axios';

import { ChartClasses } from "../../utils";

interface MapProp {
  className?: string;
  title?: string
}

const MapChart : React.FC<MapProp> = ({className,title}) => {

  const chartRef = useRef(null);
  const [option, setOption] = useState({});
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    const fetchSvg = async () => {
      const url = 'https://cors-anywhere.herokuapp.com/https://echarts.apache.org/examples/data/asset/geo/Map_of_Iceland.svg';
      const response = await axios.get(url);
      const svg = response.data;
      setSvg(svg);
    };
    fetchSvg();
  }, []);


  useEffect(() => {
    // Initializd the Chart
    if (MapSVG) {
      echarts.registerMap('FloorPlan_svg', { svg: MapSVG });
      const option = {
        tooltip: { formatter: (params: any) => { return `${params.data[2]}`; } },
        geo: {
          tooltip: { show: true },
          map: 'FloorPlan_svg', roam: true
        },
        series: {
          type: 'custom', coordinateSystem: 'geo', geoIndex: 0, zlevel: 2,
          label: { show: true },
          data: [ [220, 150, 'A'], [650, 120, 'B'], [280, 300, 'C'], [580, 300, 'D'], [100, 500, 'E'], [420, 450, 'F'] ],
          renderItem(params, api) {
            const coord = api.coord([api.value(0, params.dataIndex),api.value(1, params.dataIndex),api.value(2, params.dataIndex)]);
            const circles = [];
            for (let i = 0; i < 5; i++) {
              circles.push({
                type: 'circle', shape: { cx: 0, cy: 0, r: 50 },
                style: { stroke: 'red', fill: 'none', lineWidth: 10 },
                // Ripple animation
                keyframeAnimation: {
                  duration: 4000, loop: true, delay: (-i / 4) * 4000,
                  keyframes: [
                    { percent: 0, scaleX: 0, scaleY: 0, style: { opacity: 1 } },
                    { percent: 1, scaleX: 1, scaleY: 0.4, style: { opacity: 0 } }
                  ]
                }
              });
            }
            return {
              type: 'group', x: coord[0], y: coord[1],
              children: [ 
                ...circles,
                {
                  type: 'path',
                  shape: {
                    d: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
                    x: -10, y: -35, width: 20, height: 40
                  },
                  style: { fill: 'red' },
                  // Jump animation.
                  keyframeAnimation: {
                    duration: 1000, loop: true, delay: Math.random() * 1000,
                    keyframes: [
                      { y: -10, percent: 0.5, easing: 'cubicOut' },
                      { y: 0, percent: 1, easing: 'bounceOut' }
                    ]
                  }
                }
              ]
            } as echarts.CustomSeriesRenderItemReturn;
          }
        },
        color:'#000',
        backgroundColor:'#fff',
      };
      setOption(option)
    }
  }, [svg]);

  const onChartReadyCallback = () => {};
  const onEvents = {
    click: (params: any) => { },
  };

  return (
    <div className="flex flex-col flex-wrap justify-center items-center font-Roboto font-extralight text-2xl ">
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
        style={{width:'850px',height:'500px'}}
      />
      <div className="flex flex-col flex-wrap justify-center items-center pt-5">
        {title}
      </div>
    </div>
  );
};

const propsAreEqual = (prevProps: MapProp, nextProps: MapProp) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.title === nextProps.title 
  );
};
export default React.memo(MapChart,propsAreEqual);
