// Worker.ts
export interface Node {
  id: number;
  name: string;
  duration: number;
  dependencies: number[];
  resources: string[];
}

export interface ScheduleTask {
  id: string;
  activityId: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  isCritical: boolean;
  slack: number;
  resource?: string;
  dependencies: string[];
  status: "pending" | "inProgress" | "completed";
}

export interface AnnotatedTask extends ScheduleTask {
  earliestStart: number;
  earliestFinish: number;
  latestStart: number;
  latestFinish: number;
  totalSlack: number;
  isCritical: boolean;
}

export interface CPAResult {
  scheduleJSON: AnnotatedTask[];
  criticalPath: string[];
  totalDuration: number;
  currentTime?: number; // Optional, if you track simulation time
}
