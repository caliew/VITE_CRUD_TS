import { useState, useCallback } from "react";
import { GraphCPA } from "./index";
import type { ScheduleTask, CPAResult } from "./types/cpa.types";

export const useCPAProcessor = (initialSchedule: ScheduleTask[]) => {
  const [cpaResult, setCPAResult] = useState<CPAResult>(() => {
    const forward = GraphCPA.forwardPass(initialSchedule);
    const full = GraphCPA.backwardPass(forward);
    return full;
  });

  const recalculateCPA = useCallback((schedule: ScheduleTask[]) => {
    const forward = GraphCPA.forwardPass(schedule);
    const full = GraphCPA.backwardPass(forward);
    setCPAResult(full);
  }, []);

  const updateTaskDuration = useCallback(
    (activityId: string, newDuration: number) => {
      const updated = cpaResult.scheduleJSON.map((task) =>
        task.activityId === activityId
          ? { ...task, duration: newDuration }
          : task
      );
      recalculateCPA(updated);
    },
    [cpaResult, recalculateCPA]
  );

  return {
    cpaResult,
    recalculateCPA,
    updateTaskDuration,
  };
};
