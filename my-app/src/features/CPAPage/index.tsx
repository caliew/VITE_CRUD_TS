// my-app/src/components/WorkerPage.tsx
import { Key, useEffect, useState } from "react";
import { alg, Graph } from "@dagrejs/graphlib";
import { CPAGanttChart, GanttChart } from "@shared/components";

import { grid } from "@assets/index";
import { HeaderTitle, PageAction } from "@shared/components";
import { GetIcon } from "@utils/icon";
import {
  PageClasses,
  PageHeaderClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils/classname";

import dataCPA1 from "./data/cpa-data1.json";
import dataCPA2 from "./data/cpa-data2.json";
import dataCPA3 from "./data/cpa-data3.json";
import dataCPA4 from "./data/cpa-data4.json";
const fileNames = [
  "./data/cpa-data1.json",
  "./data/cpa-data2.json",
  "./data/cpa-data3.json",
  "./data/cpa-data4.json",
];

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
  status: "pending" | "inProgress" | "completed";
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
    executionOrder: any;
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
    const executionOrder = alg.topsort(this.graph);
    return {
      tasks,
      criticalPath,
      executionOrder,
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

const processCPAData = ({ data }) => {
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
  const executionOrder = result.executionOrder;
  const totalDuration = result.totalDuration;
  const criticalPath = result.criticalPath;
  const projectProgress = Math.floor(Math.random() * 101);
  const progressRatio = projectProgress / 100;
  const currentTime = progressRatio * totalDuration;

  const scheduleJSON = result.tasks.map((task) => {
    let status;
    if (currentTime >= task.end) {
      status = "complete";
    } else if (currentTime >= task.start) {
      status = "in progress";
    } else {
      status = "pending";
    }
    return {
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
      status,
    };
  });
  return {
    graphCPA,
    scheduleJSON,
    criticalPath,
    executionOrder,
    totalDuration,
    projectProgress,
  };
};

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
        <th className={className}>STATUS</th>
      </tr>
    </thead>
  );
};
const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-red-500";
    case "in progress":
      return "bg-green-500";
    case "complete":
      return "bg-black-500";
  }
};

const TableRowCPAComponent = ({ activity, handleRowClick }) => {
  const onRowClick = (activity) => {
    handleRowClick(activity);
  };
  return (
    <tr key={activity.id} onClick={() => onRowClick(activity)}>
      <td>{activity.id}</td>
      <td>{activity.name}</td>
      <td className="text-center">{activity.duration}</td>
      <td className="text-center">{activity.resources.join(",")}</td>
      <td className="text-center">{activity.start}</td>
      <td className="text-center">{activity.end}</td>
      <td className="text-center">{activity.slack}</td>
      <td className="text-center">{activity.dependencies.join("-")}</td>
      <td className="text-center font-Roboto text-lg">
        {" "}
        <span
          className={`px-2 py-1 rounded-full text-white ${getStatusColor(
            activity.status
          )}`}
        >
          {activity.status}
        </span>
      </td>
    </tr>
  );
};

const TableCPA = ({
  title,
  scheduleJSON,
  projectProgress,
  handleRowClick,
}: any) => {
  const onRowClick = (activity) => {
    handleRowClick(title, activity);
  };

  return (
    <div className={PageContainClasses}>
      <div>
        <div className="font-Roboto text-3xl font-extralight py-5">{title}</div>
        <table className="table-auto border-separate border-spacing-x-15 font-Roboto font-extralight text-2xl ">
          <TableCPAHeaders className="font-extralight border-b-2" />
          <tbody className="items-center justify-center">
            {scheduleJSON &&
              scheduleJSON.map(
                (schdeule: Node, index: Key | null | undefined) => {
                  return (
                    <TableRowCPAComponent
                      key={index}
                      activity={schdeule}
                      handleRowClick={onRowClick}
                    />
                  );
                }
              )}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-gray-50">
        <CPAGanttChart
          title={title}
          tasks={scheduleJSON}
          projectProgress={projectProgress}
        />
      </div>
    </div>
  );
};

const CPAPage = () => {
  const [cpaResult, setCPAResult] = useState<any>({});
  const [titles, setTitles] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTitle, setSelTitle] = useState(null);
  const [selectedActivity, setSelActivity] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const processData = (data: any) => {
      const {
        graphCPA,
        scheduleJSON,
        criticalPath,
        executionOrder,
        totalDuration,
        projectProgress,
      } = processCPAData({ data: data?.activity });
      setTitles((prevTitles) => [...prevTitles, data?.title]);
      setCPAResult((prevResults) => ({
        ...prevResults,
        [data?.title]: {
          graphCPA,
          scheduleJSON,
          criticalPath,
          executionOrder,
          totalDuration,
          projectProgress,
        },
      }));
    };
    processData(dataCPA1);
    processData(dataCPA2);
    processData(dataCPA3);
    processData(dataCPA4);
    // -------------------
  }, []);
  const handleRowClick = (title, activity) => {
    console.log(activity);
    setSelTitle(title);
    setSelActivity(activity);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleUpdate = (newDuration, newResources, newDependencies) => {
    console.log(newDuration, newResources, newDependencies);
    // Update the data here
    setShowModal(false);
  };
  const EditForm = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Edit Data</h2>
          <form>
            <label>Duration:</label>
            <input
              type="number"
              value={selectedActivity.duration}
              onChange={(e) =>
                handleUpdate(
                  parseInt(e.target.value),
                  selectedActivity.resources,
                  selectedActivity.dependencies
                )
              }
            />
            <br />
            <label>Resources:</label>
            <input
              type="text"
              value={selectedActivity.resources.join(",")}
              onChange={(e) =>
                handleUpdate(
                  selectedActivity.duration,
                  e.target.value.split(","),
                  selectedActivity.dependencies
                )
              }
            />
            <br />
            <label>Dependencies:</label>
            <input
              type="text"
              value={selectedActivity.dependencies.join(",")}
              onChange={(e) =>
                handleUpdate(
                  selectedActivity.duration,
                  selectedActivity.resources,
                  e.target.value.split(",")
                )
              }
            />
            <br />
            <button
              onClick={() =>
                handleUpdate(
                  selectedActivity.duration,
                  selectedActivity.resources,
                  selectedActivity.dependencies
                )
              }
            >
              Update
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("Scheduler")}
        className={PageHeaderClasses}
        title="CRITICAL PATH ANALYSIS"
      />

      <img className={GridClasses} src={grid} alt="Grid" />
      {titles.map((title: string, index: number) => (
        <div>
          <TableCPA
            className="position-relative z-index-0"
            key={index}
            title={title}
            scheduleJSON={cpaResult[title].scheduleJSON}
            projectProgress={cpaResult[title].projectProgress}
            handleRowClick={handleRowClick}
          />
          {showModal && selectedTitle === title && EditForm()}
        </div>
      ))}
      <PageAction />
    </div>
  );
};

export default CPAPage;
