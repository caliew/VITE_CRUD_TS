// my-app/src/components/WorkerPage.tsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { grid } from "@assets/index";
import { HeaderTitle, PageAction } from "@shared/components";
import { GetIcon } from "@utils/icon";
import {
  PageClasses,
  PageHeaderClasses,
  PageContainClasses,
  GridClasses,
} from "@shared/utils/classname";

import { Node } from "./types/cpa.types";
import data from "./cpa-data.json";

interface Node {
  id: string;
  name: string;
  duration: number;
  dependencies: string[];
  predecessors: string[];
  successors: string[];
}

// Define the CPA class
class CPA {
  private graph: { [id: string]: Node };
  private criticalPath: Node[];
  private est: { [id: string]: number };
  private lst: { [id: string]: number };
  private slack: { [id: string]: number };

  constructor() {
    this.graph = {};
    this.criticalPath = [];
    this.est = {};
    this.lst = {};
    this.slack = {};
  }

  // Add a node to the graph
  addNode(node: Node) {
    this.graph[node.id] = node;
    node.successors = [];
    node.predecessors = [];
  }

  // Add a dependency between two nodes
  addDependency(from: string, to: string) {
    const fromNode = this.graph[from];
    const toNode = this.graph[to];

    if (fromNode && toNode) {
      fromNode.successors.push(to);
      toNode.predecessors.push(from);
    }
  }

  // Perform critical path analysis
  analyze() {
    const visited: { [id: string]: boolean } = {};
    const stack: Node[] = [];

    // Perform DFS to find critical path
    Object.keys(this.graph).forEach((id) => {
      const node = this.graph[id];
      if (!visited[node.id]) {
        this.dfs(node, visited, stack);
      }
    });

    // Extract critical path from stack
    this.criticalPath = stack.reverse();
  }

  // Depth-first search to find critical path
  private dfs(node: Node, visited: { [id: string]: boolean }, stack: Node[]) {
    visited[node.id] = true;
    // Calculate EST for the current node
    let est = 0;
    if (node.predecessors.length > 0) {
      est = Math.max(
        ...node.predecessors.map((predecessorId) => this.est[predecessorId])
      );
    }
    this.est[node.id] = est + node.duration;
    node.successors.forEach((successorId) => {
      const successorNode = this.graph[successorId];
      if (!visited[successorId]) {
        this.dfs(successorNode, visited, stack);
      }
    });
    stack.push({ ...node, est: this.est[node.id] });
  }
  // Get the critical path
  getCriticalPath() {
    return this.criticalPath;
  }
}

const TableActivitiesHeaders = ({ className }: any) => {
  return (
    <thead className={className}>
      <tr className="">
        <th className={className}>ID</th>
        <th className={className}>ACTIVITY</th>
        <th className={className}>DUR</th>
        <th className={className}>DEP</th>
      </tr>
    </thead>
  );
};
const TableCPAHeaders = ({ className }: any) => {
  return (
    <thead className={className}>
      <tr className="">
        <th className={className}>ID</th>
        <th className={className}>ACTIVITY</th>
        <th className={className}>EST</th>
      </tr>
    </thead>
  );
};

const TableRowActivitiesComponent = ({ activity }: { activity: Node }) => {
  return (
    <tr key={activity.id}>
      <td>{activity.id}</td>
      <td>{activity.name}</td>
      <td className="text-center">{activity.duration}</td>
      <td className="text-center">{activity.predecessors}</td>
    </tr>
  );
};
const TableRowCPAComponent = ({ activity }: { activity: Node }) => {
  return (
    <tr key={activity.id}>
      <td>{activity.id}</td>
      <td className="text-center">{activity.name}</td>
      <td className="text-center">{activity.est}</td>
    </tr>
  );
};

const CPAPage = () => {
  const workers = useSelector((state: any) => state.workers.workers);
  const [graphNode, setGraphNode] = useState<Node[]>([]);
  const [criticalPath, setCriticalPath] = useState<Node[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cpa = new CPA();
    // Add nodes to the graph
    data.forEach((node) => {
      cpa.addNode(node);
      node.dependencies.forEach((dependency) => {
        if (data.find((n) => n.id === dependency)) {
          cpa.addDependency(dependency, node.id);
        }
      });
    });
    // Perform critical path analysis
    cpa.analyze();
    // Get the critical path
    const criticalPath = cpa.getCriticalPath();
    setGraphNode(cpa.graph);
    setCriticalPath(criticalPath);
  }, [data]);

  return (
    <div className={PageClasses}>
      <HeaderTitle
        Icon={GetIcon("Scheduler")}
        className={PageHeaderClasses}
        title="CRITICAL PATH ANALYSIS"
      />
      <div className={PageContainClasses}>
        <div>
          <img className={GridClasses} src={grid} alt="Grid" />
          <table className="table-auto border-separate border-spacing-x-15 font-Roboto font-extralight text-2xl ">
            <TableActivitiesHeaders className="font-extralight border-b-2" />
            <tbody className="items-center justify-center">
              {data &&
                data.map((ObjData, index) => {
                  return (
                    <TableRowActivitiesComponent
                      key={ObjData.id}
                      activity={ObjData}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        <div>
          <img className={GridClasses} src={grid} alt="Grid" />
          <table className="table-auto border-separate border-spacing-x-15 font-Roboto font-extralight text-2xl ">
            <TableCPAHeaders className="font-extralight border-b-2" />
            <tbody className="items-center justify-center">
              {criticalPath &&
                Object.keys(criticalPath).map((ObjData, index) => {
                  const _ObjData = criticalPath[index];
                  return (
                    <TableRowCPAComponent key={index} activity={_ObjData} />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <PageAction />
    </div>
  );
};

export default CPAPage;
