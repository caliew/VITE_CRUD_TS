// my-app/src/components/WorkerPage.tsx
import { useEffect, useState } from "react";
import { alg, Graph } from "@dagrejs/graphlib";
import { GanttChart } from "@shared/components";

import { grid } from "@assets/index";
import { HeaderTitle, PageAction } from "@shared/components";
import { GetIcon } from "@utils/icon";
import {
  PageClasses,
  PageHeaderClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils/classname";

import dataCPA1 from "./cpa-data1.json";
import dataCPA2 from "./cpa-data2.json";
import dataCPA3 from "./cpa-data3.json";
import { title } from "process";
import { data } from "react-router-dom";

interface Node {
  id: string;
  name: string;
  duration: number;
  dependencies: string[];
  resources: string[];
}
interface TaskSchedule {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
  isCritical: boolean;
  slack: number;
  resources: string[];
  dependencies: string[];
}
class GraphCPA {
  private graph: Graph;

  constructor() {
    this.graph = new Graph({ directed: true });
  } // Add a node with metadata (duration, resources, etc.)
  addNode(node: Node) {
    this.graph.setNode(node.id, { ...node });
  }
  // Add a directed dependency: from → to
  addDependency(from: string, to: string) {
    this.graph.setEdge(from, to);
  }
  isAcyclic() {
    return alg.isAcyclic(this.graph);
  }
  getExecutionOrder(): string[] {
    if (!this.isAcyclic()) {
      throw new Error("Graph has cycles. Cannot proceed.");
    }
    return alg.topsort(this.graph);
  }
  analyze(): {
    tasks: TaskSchedule[];
    criticalPath: string[];
    totalDuration: number;
  } {
    const order = this.getExecutionOrder();
    const durations: Record<string, number> = {};
    const earliestStart: Record<string, number> = {};
    const earliestEnd: Record<string, number> = {};

    // Step 1: Calculate Earliest Start/End Times (Forward Pass)
    for (const id of order) {
      const node = this.graph.node(id);
      durations[id] = node.duration || 0;
      const preds = this.graph.predecessors(id) || [];

      earliestStart[id] =
        preds.length === 0 ? 0 : Math.max(...preds.map((p) => earliestEnd[p]));

      earliestEnd[id] = earliestStart[id] + durations[id];
    }

    const totalDuration = Math.max(...order.map((id) => earliestEnd[id]));

    // Step 2: Latest Start/End Times (Backward Pass)
    const latestEnd: Record<string, number> = {};
    const latestStart: Record<string, number> = {};

    const reversedOrder = [...order].reverse();
    for (const id of reversedOrder) {
      const succs = this.graph.successors(id) || [];

      latestEnd[id] =
        succs.length === 0
          ? totalDuration
          : Math.min(...succs.map((s) => latestStart[s]));

      latestStart[id] = latestEnd[id] - durations[id];
    }

    // Step 3: Determine Critical Path + Slack
    const tasks: TaskSchedule[] = order.map((id) => {
      const node = this.graph.node(id);
      const slack = latestStart[id] - earliestStart[id];
      return {
        id,
        name: node.name,
        duration: durations[id],
        start: earliestStart[id],
        end: earliestEnd[id],
        isCritical: slack === 0,
        slack,
        resources: node.resources,
        dependencies: node.dependencies,
      };
    });

    const criticalPath = tasks.filter((t) => t.isCritical).map((t) => t.id);

    return {
      tasks,
      criticalPath,
      totalDuration,
    };
  }
  // Utility
  getNodeData(id: string) {
    return this.graph.node(id);
  }

  getGraph() {
    return this.graph;
  }
}

const printTasks = (tasks: any[]) => {
  console.log("\n📊 Task Schedule:");
  tasks.forEach((task) => {
    console.log(
      `- ${task.name} [${task.id}]: ${task.start}h → ${task.end}h | Critical: ${
        task.isCritical ? "Yes" : "No"
      } | Slack: ${task.slack}`
    );
  });
};
const printGantt = (tasks: any[]) => {
  console.log("\n🗂 Gantt Timeline (Hours)");
  tasks.forEach((task) => {
    const bar = "=".repeat(task.duration);
    const prefix = " ".repeat(task.start);
    console.log(`${task.id}: ${prefix}${bar} (${task.name})`);
  });
};
const processCPAData = ({ title, data }) => {
  const graphCPA = new GraphCPA();
  data.forEach((node: any) => {
    graphCPA.addNode(node);
    node.dependencies.forEach((dependency) => {
      if (data.find((n) => n.id === dependency)) {
        graphCPA.addDependency(dependency, node.id);
      }
    });
  });
  const result = graphCPA.analyze();
  const criticalPath = result.criticalPath;
  const scheduleJSON = result.tasks.map((task) => ({
    id: task.id,
    name: task.name,
    start: task.start,
    end: task.end,
    duration: task.duration,
    critical: task.isCritical,
    slack: task.slack,
    resources: task.resources,
    dependencies: task.dependencies,
    isCritical: criticalPath.includes(task.id),
  }));
  return { graphCPA, scheduleJSON, criticalPath };
};

const CPAPage = () => {
  const [scheduleJSON1, setScheduleJSON1] = useState<any>([]);
  const [scheduleJSON2, setScheduleJSON2] = useState<any>([]);
  const [scheduleJSON3, setScheduleJSON3] = useState<any>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const data1 = dataCPA1["activity"];
    const data2 = dataCPA2["activity"];
    const data3 = dataCPA3["activity"];
    const { graphCPA: graphCPA1, scheduleJSON: scheduleJSON1 } = processCPAData(
      { title: data1?.title ?? "", data: data1 }
    );
    const { graphCPA: graphCPA2, scheduleJSON: scheduleJSON2 } = processCPAData(
      { title: data2?.title ?? "", data: data2 }
    );
    const { graphCPA: graphCPA3, scheduleJSON: scheduleJSON3 } = processCPAData(
      { title: data3?.title ?? "", data: data3 }
    );
    // -----------------------------
    setScheduleJSON1(scheduleJSON1);
    setScheduleJSON2(scheduleJSON2);
    setScheduleJSON3(scheduleJSON3);
  }, [dataCPA1, dataCPA2, dataCPA3]);

  const TableCPAHeaders = ({ className }: any) => {
    return (
      <thead className={className}>
        <tr className="">
          <th className={className}>ID</th>
          <th className={className}>ACTIVITY</th>
          <th className={className}>DUR</th>
          <th className={className}>RESOURCES</th>
          <th className={className}>START</th>
          <th className={className}>END</th>
          <th className={className}>SLACK</th>
          <th className={className}>DEP</th>
        </tr>
      </thead>
    );
  };

  const TableRowCPAComponent = ({ activity }: { activity: Node }) => {
    return (
      <tr key={activity.id}>
        <td>{activity.id}</td>
        <td>{activity.name}</td>
        <td className="text-center">{activity.duration}</td>
        <td className="text-center">{activity.resources.join(",")}</td>
        <td className="text-center">{activity.start}</td>
        <td className="text-center">{activity.end}</td>
        <td className="text-center">{activity.slack}</td>
        <td className="text-center">{activity.dependencies.join("-")}</td>
      </tr>
    );
  };

  const TableCPA = ({ title, scheduleJSON }: any) => (
    <div className={PageContainClasses}>
      <div>
        <div className="font-Roboto text-3xl font-extralight py-5">{title}</div>
        <table className="table-auto border-separate border-spacing-x-15 font-Roboto font-extralight text-2xl ">
          <TableCPAHeaders className="font-extralight border-b-2" />
          <tbody className="items-center justify-center">
            {scheduleJSON &&
              scheduleJSON.map((schdeule, index) => {
                return <TableRowCPAComponent key={index} activity={schdeule} />;
              })}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-gray-50">
        <GanttChart tasks={scheduleJSON} />
      </div>
    </div>
  );

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("Scheduler")}
        className={PageHeaderClasses}
        title="CRITICAL PATH ANALYSIS"
      />

      <img className={GridClasses} src={grid} alt="Grid" />
      {TableCPA({ title: dataCPA1?.title, scheduleJSON: scheduleJSON1 })}
      {TableCPA({ title: dataCPA2?.title, scheduleJSON: scheduleJSON2 })}
      {TableCPA({ title: dataCPA3?.title, scheduleJSON: scheduleJSON3 })}
      <PageAction />
    </div>
  );
};

export default CPAPage;
