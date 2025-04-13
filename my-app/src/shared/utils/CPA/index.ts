interface Node {
  id: string;
  name: string;
  duration: number;
  dependencies: string[];
  predecessors: string[];
  successors: string[];
}

// Define the CPA class
export default class CPA {
  private graph: { [id: string]: Node };
  private criticalPath: Node[];

  constructor() {
    this.graph = {};
    this.criticalPath = [];
  }

  testFunction() {
    console.log("..INTO CRITICAL PATH ANALYSIS...");
  }

  // Add a node to the graph
  addNode(node: Node) {
    this.graph[node.id] = node;
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

    node.successors.forEach((successorId) => {
      const successorNode = this.graph[successorId];
      if (!visited[successorId]) {
        this.dfs(successorNode, visited, stack);
      }
    });

    stack.push(node);
  }

  // Get the critical path
  getCriticalPath() {
    return this.criticalPath;
  }
}
