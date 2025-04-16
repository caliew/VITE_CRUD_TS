import React from "react";

type Task = {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  isCritical: boolean;
};

export const GanttChart: React.FC<{ tasks: Task[] }> = ({ title, tasks }) => {
  const scale = 20; // 1 unit = 20px
  const maxEnd = Math.max(...tasks.map((t) => t.end));

  return (
    <div className="w-full p-4 overflow-x-auto text-black font-Tahoma text-LG">
      <div className="text-lg mb-2 font-medium">
        {title}
        <br />
        (CRITICAL PATH ANALYSIS)
      </div>

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
