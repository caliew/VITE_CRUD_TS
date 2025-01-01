// my-app/src/components/EChart.tsx
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

import { ChartClasses } from "@shared/utils/classname";

interface SunburstProp {
  className?: string;
  title?: string;
  data?: any;
  onEvents?: any;
  onEventCallback?: any;
}

const ColorCode = [];
ColorCode[0] = { color: "#FFFFFF" }; // WHITE
ColorCode[1] = { color: "#C0C0C0" }; // SILVER
ColorCode[2] = { color: "#808080" }; // GRAY
ColorCode[3] = { color: "#000000" }; // BLACK
ColorCode[4] = { color: "#FF0000" }; // RED
ColorCode[5] = { color: "#800000" }; // MAROON
ColorCode[6] = { color: "#FFFF00" }; // YELLOW
ColorCode[7] = { color: "#808000" }; // OLIVE
ColorCode[8] = { color: "#00FF00" }; // LIME
ColorCode[9] = { color: "#008000" }; // GREEN
ColorCode[10] = { color: "#00FFFF" }; // AQUA
ColorCode[11] = { color: "#008080" }; // TEAL
ColorCode[12] = { color: "#000080" }; // NAVY
ColorCode[13] = { color: "#FF00FF" }; // FUCHSIA
ColorCode[14] = { color: "#800080" }; // PURPLE
// children: [{ name: 'FLAG', value: 1, itemStyle: ColorCode[4] }] } ]
// children: [{ name: 'FLAG', value: 1 }]
const dataMock = [
  {
    name: "ZONE 1",
    children: [
      {
        name: "MONT KIARA",
        children: [
          { name: "PLAZA MONT KIARA", children: [{ name: "FLAG", value: 1 }] },
          { name: "KAIRAMS DANAI", children: [{ name: "FLAG", value: 1 }] },
          {
            name: "KAMPUNG SEGAMBUT",
            children: [{ name: "FLAG", value: 1, itemStyle: ColorCode[4] }],
          },
        ],
      },
      {
        name: "MUTIARA DAMANSARA",
        children: [
          { name: "HAUNTU MALAYSIA", children: [{ name: "FLAG", value: 1 }] },
          {
            name: "IPC SHOPPING CENTER",
            children: [{ name: "FLAG", value: 1 }],
          },
          { name: "MUTIARA HOMES", children: [{ name: "FLAG", value: 1 }] },
        ],
      },
      {
        name: "BUKIT DAMANSARA",
        children: [
          { name: "SRI BERINGIN", children: [{ name: "FLAG", value: 1 }] },
          { name: "DESA DAMANSARA", children: [{ name: "FLAG", value: 1 }] },
          { name: "ISTANA NEGARA", children: [{ name: "FLAG", value: 1 }] },
        ],
      },
      {
        name: "TAMAN DUTA",
        children: [
          { name: "BUKIT TUNKU", children: [{ name: "FLAG", value: 1 }] },
          { name: "TAMAN DUTA", children: [{ name: "FLAG", value: 1 }] },
        ],
      },
    ],
  },
  {
    name: "ZONE 2",
    children: [
      {
        name: "KAMPUNG BARU",
        children: [
          { name: "PWTC", children: [{ name: "FLAG", value: 1 }] },
          { name: "KL HOSPITAL", children: [{ name: "FLAG", value: 1 }] },
          { name: "RAJA UDA", children: [{ name: "FLAG", value: 1 }] },
          { name: "CHOW KIT", children: [{ name: "FLAG", value: 1 }] },
        ],
      },
      {
        name: "TITIWANGSA",
        children: [
          { name: "ISTANA BUDAYA", children: [{ name: "FLAG", value: 1 }] },
          {
            name: "NATIONAL ART GALLERY",
            children: [{ name: "FLAG", value: 1 }],
          },
          { name: "TMPOINT SETAPAK", children: [{ name: "FLAG", value: 1 }] },
          { name: "WISMA PERWIRA", children: [{ name: "FLAG", value: 1 }] },
        ],
      },
    ],
  },
  {
    name: "ZONE 3",
    children: [
      {
        name: "TAMAN KERAMAT",
        children: [
          { name: "JLN ENGGANG", children: [{ name: "FLAG", value: 1 }] },
          {
            name: "TAMAN DESA KERAMAT",
            children: [{ name: "FLAG", value: 1 }],
          },
          { name: "JALAN AU", children: [{ name: "FLAG", value: 1 }] },
        ],
      },
    ],
  },
  {
    name: "ZONE 4",
    children: [
      {
        name: "AMPANG JAYA",
        children: [
          { name: "AMPANG POINT", children: [{ name: "FLAG", value: 1 }] },
          { name: "PANDAN INDAH", children: [{ name: "FLAG", value: 1 }] },
          { name: "TAMAN MUDA", children: [{ name: "FLAG", value: 1 }] },
          { name: "KETUMBAR HILL", children: [{ name: "FLAG", value: 1 }] },
        ],
      },
      {
        name: "CHERAS",
        children: [
          { name: "TAMAN MIDAH", children: [{ name: "FLAG", value: 1 }] },
          { name: "BANDAR TUN RAZAK", children: [{ name: "FLAG", value: 1 }] },
          {
            name: "BANDAR SRI PERMAISURI",
            children: [{ name: "FLAG", value: 1 }],
          },
          { name: "TAMAN IKAN EMAS", children: [{ name: "FLAG", value: 1 }] },
        ],
      },
    ],
  },
  {
    name: "ZONE 6",
    children: [
      {
        name: "TAMAN OUG",
        children: [
          { name: "TAMAN YARL", children: [{ name: "FLAG", value: 1 }] },
          { name: "HAPPY GARDEN", children: [{ name: "FLAG", value: 1 }] },
          { name: "TAMAN SRI SENTOSA", children: [{ name: "FLAG", value: 1 }] },
          { name: "TAMAN SRI MANJA", children: [{ name: "FLAG", value: 1 }] },
        ],
      },
      {
        name: "BUKIT JALIL",
        children: [
          { name: "SRI PETALING", children: [{ name: "FLAG", value: 1 }] },
          { name: "MIMOS", children: [{ name: "FLAG", value: 1 }] },
          { name: "TAMAN BUKIT JALIL", children: [{ name: "FLAG", value: 1 }] },
          { name: "BANDAR KINRAR", children: [{ name: "FLAG", value: 1 }] },
        ],
      },
    ],
  },
];

function transformData(data: any) {
  const result = [];
  console.log(data);
  Object.keys(data).forEach((room) => {
    const roomData = data[room];
    const children = [];
    Object.keys(roomData).forEach((sensorType) => {
      const sensorData = roomData[sensorType];
      const sensorChildren = sensorData.map((sensor) => {
        const _RSLT = sensor.READING;
        const _VAR = Object.keys(_RSLT);
        const _READING = _VAR.map((key) => `${key}=${_RSLT[key]}\n`);
        return {
          name: `${_READING}`,
          children: [{ name: `${sensor?.NAME}`, id: sensor?.ID, value: 1 }],
        };
      });
      children.push({ name: sensorType, children: sensorChildren });
    });
    result.push({ name: room, children });
  });
  return result;
}

const SunburstChart: React.FC<SunburstProp> = ({
  className,
  title,
  data,
  onEventCallback,
}) => {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});

  useEffect(() => {
    let convData;
    data && (convData = transformData(data));

    const option = {
      textStyle: {
        fontFamily: "Roboto",
        fontSize: 10,
        fontWeight: 100,
        color: "#FFFFFF",
      },
      series: [
        {
          radius: ["15%", "99%"],
          type: "sunburst",
          sort: undefined,
          emphasis: { focus: "ancestor" },
          data: convData ?? dataMock,
          label: {
            rotate: 0,
            fontSize: 12,
            fontFamily: "Roboto",
            fontWeight: 300,
            color: "#000000",
          },
          levels: [{}],
        },
      ],
    };
    setOption(option);
  }, [data]);

  const onChartReadyCallback = () => {};
  const onEvents = {
    click: (params: any) => {
      const nodes = params.data;
      onEventCallback && onEventCallback(nodes);
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
        style={{ width: "850px", height: "650px" }}
        opts={{ renderer: "svg" }}
      />
      {title}
    </div>
  );
};

const propsAreEqual = (prevProps: SunburstProp, nextProps: SunburstProp) => {
  return (
    prevProps.className === nextProps.className &&
    prevProps.title === nextProps.title &&
    prevProps.data === nextProps.data
  );
};

export default React.memo(SunburstChart, propsAreEqual);
