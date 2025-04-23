// my-app/src/components/WorkerPage.tsx
import { Key, useEffect, useMemo, useState } from "react";
import { alg, Graph } from "@dagrejs/graphlib";
import { Button, CPAGanttChart, GanttChart } from "@shared/components";

import { grid } from "@assets/index";
import { HeaderTitle, PageAction } from "@shared/components";
import { GetIcon } from "@utils/icon";
import {
  PageClasses,
  PageHeaderClasses,
  PageContainClasses,
  GridClasses,
  ButtonLINKClasses,
} from "@shared/utils/classname";

import mockProjects from "./data/projectMockData.json";
import dataCPA1 from "./data/cpa-data1.json";
import dataCPA2 from "./data/cpa-data2.json";
import dataCPA3 from "./data/cpa-data3.json";
import dataCPA4 from "./data/cpa-data4.json";
import { title } from "process";

interface Project {
  WBS: string;
  CriticalPath: string[];
  Slack: number;
  Duration: number; // Calculate from dates
}
interface Project {
  WBS: string;
  CriticalPath: string[];
  Slack: number;
  Duration: number;
}
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

const Mode = {
  Dashboard: "Dashboard",
  CPAAnalysis: "CPAAnalysis",
};
const View = {
  ProjectView: "Project",
  TimelineView: "Timeline",
  EffortView: "Effort",
  StatusView: "Status",
  DocumentationView: "Documentation",
};
const ProjectView = [
  "WBS",
  "ProjectName",
  "PrimaryPM",
  "%Clocked",
  "Status",
  "NextAction",
];
const TimelineView = [
  "WBS",
  "ProjectName",
  "StartDate",
  "EndDate",
  "CriticalPath",
  "Slack",
];
const EffortView = [
  "WBS",
  "PlannedMD",
  "ActualWork",
  "%Clocked",
  "Budget",
  "Variance",
];
const StatusView = ["WBS", "Status", "NextAction", "PMRemark", "RiskLevel"];
const DocumentationView = [
  "WBS",
  "ReqSignOffDoc",
  "BuildCompleteDoc",
  "GoLiveDoc",
  "PostLiveDoc",
];

function calculateDays(project) {
  const start = new Date(project.CharterStartDate);
  const finish = new Date(project.CharterFinishDate);
  const today = new Date();

  const daysTotal = Math.ceil((finish - start) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.max(
    0,
    Math.ceil((today - start) / (1000 * 60 * 60 * 24))
  );
  const daysRemaining = Math.max(0, daysTotal - daysElapsed);
  const daysUntil = Math.max(
    0,
    Math.ceil((start - today) / (1000 * 60 * 60 * 24))
  );

  return {
    daysTotal,
    daysElapsed,
    daysRemaining,
    daysUntil,
  };
}
const totalDays = (project) => {};
const calculateProgramCriticalPath = (projects: Project[]) => {
  const graph = new Graph({ directed: true });

  // Add nodes with duration
  projects.forEach((project) => {
    console.log(project);
    graph.setNode(project.WBS, {
      duration: project.Duration,
      slack: project.Slack,
    });
  });

  // Add dependencies (you'll need to define these)
  projects.forEach((project) => {
    project.CriticalPath.forEach((dep) => {
      if (projects.some((p) => p.WBS === dep)) {
        graph.setEdge(dep, project.WBS);
      }
    });
  });
  console.log(graph);

  // Perform CPA calculations
  const results = {
    criticalPath: alg.topsort(graph),
    totalDuration: calculateTotalDuration(graph),
  };

  return projects.filter(
    (p) => results.criticalPath.includes(p.WBS) || p.Slack === 0
  );
};
const detectHighRiskProjects = (projects: any[]) => {
  return projects.filter((project) => {
    const { daysTotal, daysElapsed, daysRemaining, daysUntil } =
      calculateDays(project);

    const progressRatio = project["%Clocked"] / 100;
    const timeRatio = daysElapsed / daysTotal;

    return (
      project.RiskLevel === "Critical" ||
      project.BudgetVariance < -project.TotalITBudget * 0.1 ||
      (progressRatio < 0.8 && timeRatio > 0.5) ||
      !project.ReqSignoffDoc
    );
  });
};
const checkDocumentationCompliance = (projects: any[]) => {
  return projects.map((project) => ({
    WBS: project.WBS,
    MissingDocs: [
      ...(!project.ReqSignoffDoc ? ["Requirements"] : []),
      ...(!project.BuildCompleteDoc ? ["Build"] : []),
      ...(!project.GoLiveDoc ? ["GoLive"] : []),
      ...(!project.PostLiveDoc ? ["PostLive"] : []),
    ],
    ComplianceStatus:
      project.ReqSignoffDoc &&
      project.BuildCompleteDoc &&
      project.GoLiveDoc &&
      project.PostLiveDoc
        ? "Fully Compliant"
        : "Partial",
  }));
};
const analyzeBudgetHealth = (projects: any[]) => {
  return projects.map((project) => {
    const burnRate = project.ActualWork / project.TotalPlannedMDs;
    const budgetHealth = project.BudgetVariance / project.TotalITBudget;

    return {
      WBS: project.WBS,
      BurnRateStatus: burnRate > 1.1 ? "Overburning" : "Normal",
      BudgetHealth:
        budgetHealth < -0.15
          ? "Critical"
          : budgetHealth < -0.05
          ? "Warning"
          : "Healthy",
    };
  });
};
const generateRecommendations = (project: any) => {
  const recommendations = [];
  const { daysTotal, daysElapsed, daysRemaining, daysUntil } =
    calculateDays(project);
  if (project.Slack <= 2 && project.Slack > 0) {
    recommendations.push({
      WBS: project.WBS,
      recommendation: "Consider resource reallocation to prevent delays",
    });
  }

  if (project.BudgetVariance < -project.TotalITBudget * 0.1) {
    recommendations.push({
      WBS: project.WBS,
      recommendation: "Immediate cost review required",
    });
  }

  if (!project.ReqSignoffDoc && daysUntil < 14) {
    recommendations.push({
      WBS: project.WBS,
      recommendation: "Urgent requirement signoff needed",
    });
  }

  return recommendations;
};

export class GraphCPA {
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

const getViewParams = (view: string) => {
  const views = {
    [View.ProjectView]: ProjectView,
    [View.TimelineView]: TimelineView,
    [View.EffortView]: EffortView,
    [View.StatusView]: StatusView,
    [View.DocumentationView]: DocumentationView,
  };
  return views[view];
};

const processCPAData = ({ data, projectstatus = null }) => {
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
  const projectProgress = projectstatus ?? Math.floor(Math.random() * 101);
  const progressRatio = projectProgress / 100;
  const currentTime = progressRatio * totalDuration;

  const scheduleJSON = result.tasks.map((task) => {
    let status;
    if (currentTime >= task.end) {
      status = "completed";
    } else if (currentTime >= task.start) {
      status = "inProgress";
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
    case "inProgress":
      return "bg-green-500";
    case "completed":
      return "bg-gray-800";
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
      <td className="text-center">{activity.dependencies.join(",")}</td>
      <td className="text-center font-Roboto text-lg">
        {" "}
        <span
          className={`px-2 py-1 rounded-none text-white ${getStatusColor(
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
const TableDashboard = ({ view, viewData }) => {
  if (view === null) return;
  const params = useMemo(() => getViewParams(view), [view]);
  useEffect(() => {}, [view]);
  const renderRow = (data: any) => {
    switch (view) {
      case View.ProjectView:
        return (
          <tr>
            <td>{data.WBS}</td>
            <td>{data.ProjectName}</td>
            <td>{data.PrimaryPM}</td>
            <td>{data["%Clocked"]}</td>
            <td>{data.Status}</td>
            <td>{data.NextAction}</td>
          </tr>
        );
      case View.TimelineView:
        return (
          <tr>
            <td>{data.WBS}</td>
            <td>{data.ProjectName}</td>
            <td>{data.StartDate}</td>
            <td>{data.EndDate}</td>
            <td>{data.CriticalPath}</td>
            <td>{data.Slack}</td>
          </tr>
        );
      case View.EffortView:
        return (
          <tr>
            <td>{data.WBS}</td>
            <td>{data.PlannedMD}</td>
            <td>{data.ActualWork}</td>
            <td>{data["%Clocked"]}</td>
            <td>{data.Budget}</td>
            <td>{data.Variance}</td>
          </tr>
        );
      case View.StatusView:
        return (
          <tr>
            <td>{data.WBS}</td>
            <td>{data.Status}</td>
            <td>{data.NextAction}</td>
            <td>{data.PMRemark}</td>
            <td>{data.RiskLevel}</td>
          </tr>
        );
      case View.DocumentationView:
        return (
          <tr>
            <td>{data.WBS}</td>
            <td>{data.ReqSignoffDoc ? "YES" : "NO"}</td>
            <td>{data.BuildCompleteDoc ? "YES" : "NO"}</td>
            <td>{data.GoLiveDoc ? "YES" : "NO"}</td>
            <td>{data.PostLiveDoc ? "YES" : "NO"}</td>
          </tr>
        );
    }
  };
  return (
    <div>
      <table className="table-auto border-separate border-spacing-x-15 font-Roboto font-extralight text-2xl ">
        <thead className="">
          <tr className="text-center font-Tahoma font-extralight text-2xl">
            {params &&
              params.map((key) => (
                <th className="font-normal decoration-underline border-b-2">
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>{viewData && viewData.map((data) => renderRow(data))}</tbody>
      </table>
    </div>
  );
};

const CPAPage = () => {
  const [cpaData, setCPAData] = useState<any>([]);
  const [cpaResult, setCPAResult] = useState<any>({});
  const [titles, setTitles] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTitle, setSelTitle] = useState(null);
  const [selectedActivity, setSelActivity] = useState(null);
  const [mode, setMode] = useState<Mode>(null);
  const [view, setView] = useState(null);
  const [projectViewData, setProjectViewData] = useState(null);
  const [timelineViewData, setTimelineViewData] = useState(null);
  const [effortViewData, setEffortViewData] = useState(null);
  const [statusViewData, setStatusViewData] = useState(null);
  const [documentationViewData, setDocumentationViewData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [highRiskProjects, setHighRiskProjects] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const MockProjects = mockProjects["mockProjects"];
    const projectViewData = MockProjects.map((proj) => ({
      WBS: proj.WBS,
      ProjectName: proj.ProjectName,
      PrimaryPM: proj.PrimaryPM,
      "%Clocked": `${proj["%Clocked"]}%`,
      Status: proj.Status,
      NextAction: proj.NextAction,
    }));
    const timelineViewData = MockProjects.map((proj) => ({
      WBS: proj.WBS,
      ProjectName: proj.ProjectName,
      StartDate: proj.CharterStartDate,
      EndDate: proj.CharterFinishDate,
      CriticalPath: proj.CriticalPath.join(" → "),
      Slack: `${proj.Slack} days`,
    }));
    const effortViewData = MockProjects.map((proj) => ({
      WBS: proj.WBS,
      PlannedMD: proj.TotalPlannedMDs,
      ActualWork: proj.ActualWork,
      "%Clocked": proj["%Clocked"],
      Budget: proj.TotalITBudget,
      Variance: proj.BudgetVariance,
    }));
    const statusViewData = MockProjects.map((proj) => ({
      WBS: proj.WBS,
      Status: proj.Status,
      NextAction: proj.NextAction,
      PMRemark: proj.PMRemark,
      RiskLevel: proj.RiskLevel,
    }));
    const documentationViewData = MockProjects.map((proj) => ({
      WBS: proj.WBS,
      ReqSignoffDoc: proj.ReqSignoffDoc,
      BuildCompleteDoc: proj.BuildCompleteDoc,
      GoLiveDoc: proj.GoLiveDoc,
      PostLiveDoc: proj.PostLiveDoc,
    }));
    setProjectViewData(projectViewData);
    setTimelineViewData(timelineViewData);
    setEffortViewData(effortViewData);
    setStatusViewData(statusViewData);
    setDocumentationViewData(documentationViewData);
    //
    const HighRiskProjects = detectHighRiskProjects(
      mockProjects["mockProjects"]
    );
    const BudgetHealth = analyzeBudgetHealth(mockProjects["mockProjects"]);

    const Recommendations = MockProjects.map((project) =>
      generateRecommendations(project)
    );

    setHighRiskProjects(HighRiskProjects);
    setRecommendations(Recommendations);
    console.log(Recommendations);
  }, [mockProjects]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCPAResult((prevResults) => {
        const updatedResults = {};
        const updatedTitles = [];
        for (const title in prevResults) {
          let newProgress = prevResults[title].projectProgress + 1;
          newProgress = Math.min(newProgress, 100);
          const progressRatio = newProgress / 100;
          const currentTime = progressRatio * prevResults[title].totalDuration;
          const updatedSchedule = prevResults[title].scheduleJSON.map(
            (task) => {
              let status;
              if (currentTime >= task.end) {
                status = "completed";
              } else if (currentTime >= task.start) {
                status = "inProgress";
              } else {
                status = "pending";
              }
              return { ...task, status };
            }
          );
          if (newProgress < 100) {
            updatedResults[title] = {
              ...prevResults[title],
              projectProgress: newProgress,
              scheduleJSON: updatedSchedule,
            };
            updatedTitles.push(title);
          }
        }
        setTitles(updatedTitles);
        return updatedResults;
      });
    }, 1000); // Update every second
    return () => clearInterval(interval);
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
      setCPAData((prevResults) => ({
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
    // processData(dataCPA3);
    // processData(dataCPA4);
    // -------------------
  }, []);

  const handleUpdate = (newDuration, newResources, newDependencies) => {
    setCPAResult((prevResults) => {
      const updatedResults = { ...prevResults };
      const workflow = updatedResults[selectedTitle];
      const updatedActivities = workflow.scheduleJSON.map((task) => {
        if (task.id === selectedActivity.id) {
          return {
            ...task,
            duration: newDuration,
            resources: newResources,
            dependencies: newDependencies,
          };
        }
        return task;
      });
      const updatedData = {
        activity: updatedActivities.map(
          ({ id, name, duration, dependencies, resources }) => ({
            id,
            name,
            duration,
            dependencies,
            resources,
          })
        ),
        title: selectedTitle,
      };
      const {
        graphCPA,
        scheduleJSON,
        criticalPath,
        executionOrder,
        totalDuration,
        projectProgress,
      } = processCPAData({ data: updatedData.activity });
      updatedResults[selectedTitle] = {
        graphCPA,
        scheduleJSON,
        criticalPath,
        executionOrder,
        totalDuration,
        projectProgress,
      };
      return updatedResults;
    });
    setShowModal(false);
  };
  const handleRowClick = (title, activity) => {
    console.log(activity);
    setSelTitle(title);
    setSelActivity(activity);
    setShowModal(true);
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
  const simulateDisruption = (title: string) => {
    setCPAResult((prevResults) => {
      const updatedResults = { ...prevResults };
      const workflow = updatedResults[title];
      const currentTime =
        (workflow.projectProgress / 100) * workflow.totalDuration;
      // Identify the current task
      const currentTask = workflow.scheduleJSON.find(
        (task) => task.start <= currentTime && task.end > currentTime
      );
      if (!currentTask) return prevResults;
      // Increase the duration by 50%
      const updatedActivities = workflow.scheduleJSON.map((task) => {
        if (task.id === currentTask.id) {
          return {
            ...task,
            duration: Math.ceil(task.duration * 1.5),
          };
        }
        return task;
      });
      // Reconstruct the data for processing
      const updatedData = {
        activity: updatedActivities.map(
          ({ id, name, duration, dependencies, resources }) => ({
            id,
            name,
            duration,
            dependencies,
            resources,
          })
        ),
        title,
      };
      const currentTaskTitle = updatedData?.title ?? "";
      const ProjectProgress = prevResults[currentTaskTitle]?.projectProgress;
      // Reprocess the CPA data
      const {
        graphCPA,
        scheduleJSON,
        criticalPath,
        executionOrder,
        totalDuration,
        projectProgress,
      } = processCPAData({
        data: updatedData.activity,
        projectstatus: ProjectProgress,
      });
      updatedResults[title] = {
        graphCPA,
        scheduleJSON,
        criticalPath,
        executionOrder,
        totalDuration,
        projectProgress,
      };
      return updatedResults;
    });
  };
  const initiateRandomTask = () => {
    if (cpaData.length === 0) return;
    const titles = Object.keys(cpaData);
    const randomIndex = Math.floor(Math.random() * titles.length);
    const selTitle = titles[randomIndex];
    const selectedTask = cpaData[selTitle];
    setCPAResult((prevResults) => {
      if (prevResults[selTitle]) return prevResults; // Avoid duplicates
      return {
        ...prevResults,
        [selTitle]: {
          ...selectedTask,
          projectProgress: 0,
        },
      };
    });
    setTitles((prevTitles) => [...prevTitles, selTitle]);
  };

  const getDashboardFeatures = useMemo(
    () => (
      <div>
        <Button
          Icon={GetIcon("home")}
          className={ButtonLINKClasses}
          onClick={() => setView(View.ProjectView)}
        >
          PROJECT
        </Button>
        <Button
          Icon={GetIcon("home")}
          className={ButtonLINKClasses}
          onClick={() => setView(View.TimelineView)}
        >
          TIMELINE
        </Button>
        <Button
          Icon={GetIcon("home")}
          className={ButtonLINKClasses}
          onClick={() => setView(View.EffortView)}
        >
          EFFORT
        </Button>
        <Button
          Icon={GetIcon("home")}
          className={ButtonLINKClasses}
          onClick={() => setView(View.StatusView)}
        >
          STATUS
        </Button>
        <Button
          Icon={GetIcon("home")}
          className={ButtonLINKClasses}
          onClick={() => setView(View.DocumentationView)}
        >
          DOCUMENTATION
        </Button>
      </div>
    ),
    [mode]
  );
  const getCPAnalysisFeatures = useMemo(
    () => (
      <div>
        <Button
          Icon={GetIcon("home")}
          className={ButtonLINKClasses}
          onClick={initiateRandomTask}
        >
          INITIATE RANDOM TASKS
        </Button>
        <Button Icon={GetIcon("home")} className={ButtonLINKClasses}>
          COMPLETED TASKS
        </Button>
        <Button Icon={GetIcon("home")} className={ButtonLINKClasses}>
          PENDING TASKS
        </Button>
      </div>
    ),
    [mode]
  );
  const dataToRender = () => {
    switch (view) {
      case View.ProjectView:
        return projectViewData;
      case View.TimelineView:
        return timelineViewData;
      case View.EffortView:
        return effortViewData;
      case View.StatusView:
        return statusViewData;
      case View.DocumentationView:
        return documentationViewData;
      default:
        return null;
    }
  };

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("Scheduler")}
        className={PageHeaderClasses}
        title="CRITICAL PATH ANALYSIS"
      />
      <div>
        <Button
          Icon={GetIcon("home")}
          className={ButtonLINKClasses}
          onClick={() => setMode(Mode.Dashboard)}
        >
          DASHBOARD
        </Button>
        <Button
          Icon={GetIcon("home")}
          className={ButtonLINKClasses}
          onClick={() => setMode(Mode.CPAAnalysis)}
        >
          CPANALYSIS
        </Button>
      </div>

      {mode === Mode.CPAAnalysis && getCPAnalysisFeatures}
      {mode === Mode.Dashboard && getDashboardFeatures}

      {mode === Mode.CPAAnalysis && (
        <>
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
              <button onClick={() => simulateDisruption(title)}>
                Disrupt Schedule
              </button>
              {showModal && selectedTitle === title && EditForm()}
            </div>
          ))}
        </>
      )}
      {mode === Mode.Dashboard && (
        <>
          <div className="border m-5 p-5 text-Tahoma text-2xl">
            IMPORTANT NOTE
            {recommendations &&
              recommendations.map((recommendation, index) => {
                if (recommendation.length === 0) return null;
                return (
                  <div className="font-Tahoma text-2xl align-left">
                    {recommendation[0].WBS} {recommendation[0].recommendation}
                  </div>
                );
              })}
            <img className={GridClasses} src={grid} alt="Grid" />
          </div>
          <TableDashboard view={view} viewData={dataToRender()} />
        </>
      )}
      <PageAction />
    </div>
  );
};

export default CPAPage;
