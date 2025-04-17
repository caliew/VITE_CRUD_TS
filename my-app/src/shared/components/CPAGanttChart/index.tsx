import React from "react";
import "./index.css";

type Task = {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  isCritical: boolean;
};

export const CPAGanttChart: React.FC<{
  title: string;
  tasks: Task[];
  projectProgress: number; // in same units as start/end
}> = ({ title, tasks, projectProgress }) => {
  const scale = 20; // px per time unit
  const labelWidthPx = 160; // your name‐column width
  const maxEnd = Math.max(...tasks.map((t) => t.end));
  const timelinePx = maxEnd * scale; // total chart width
  const progressPx = (projectProgress / 100) * timelinePx;
  const leftPx = labelWidthPx + progressPx;

  return (
    <div className="gantt-container w-full p-4 overflow-x-auto text-black font-Tahoma text-lg">
      {/* Title */}
      <div className="text-lg mb-2 font-medium">
        {title} [{projectProgress}%]
        <br />
        (CRITICAL PATH ANALYSIS)
      </div>

      {/* Vertical progress marker */}
      <div
        className="absolute w-px bg-orange-500 pointer-events-none z-10"
        style={{ top: "3rem", bottom: "1rem", left: `${leftPx}px` }}
      />

      {/* Time Axis */}
      <div
        className="grid mb-2 text-xs text-center"
        style={{ gridTemplateColumns: `160px repeat(${maxEnd}, ${scale}px)` }}
      >
        <div></div>
        {Array.from({ length: maxEnd }).map((_, i) => (
          <div key={i}>{i}</div>
        ))}
      </div>

      {/* Task Bars */}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="grid items-center mb-1"
          style={{ gridTemplateColumns: `160px repeat(${maxEnd}, ${scale}px)` }}
        >
          <div className="text-sm pr-2">{task.name}</div>
          {Array.from({ length: maxEnd }).map((_, i) => {
            const inRange = i >= task.start && i < task.end;
            return (
              <div
                key={i}
                className={`h-6 ${
                  inRange
                    ? task.isCritical
                      ? "bg-red-500"
                      : "bg-blue-400"
                    : ""
                }`}
                title={
                  inRange
                    ? `Task ${task.name} — Start: ${task.start}, End: ${task.end}`
                    : undefined
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
