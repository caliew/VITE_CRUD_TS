import { Graph } from "@dagrejs/graphlib";

export const printTasks = (tasks: any[]) => {
  console.log("\n📊 Task Schedule:");
  tasks.forEach((task) => {
    console.log(
      `- ${task.name} [${task.id}]: ${task.start}h → ${task.end}h | Critical: ${
        task.isCritical ? "Yes" : "No"
      } | Slack: ${task.slack}`
    );
  });
};
export const printGantt = (tasks: any[]) => {
  console.log("\n🗂 Gantt Timeline (Hours)");
  tasks.forEach((task) => {
    const bar = "=".repeat(task.duration);
    const prefix = " ".repeat(task.start);
    console.log(`${task.id}: ${prefix}${bar} (${task.name})`);
  });
};
export const printExecutionOrder = (
  executionOrder: any[],
  complexGraph: Graph
) => {
  console.log("Execution Order:");
  executionOrder.forEach((nodeId, index) => {
    console.log(`${index + 1}. ${nodeId} -`, complexGraph.node(nodeId).name);
  });
};
export const printTaskDetails = (
  executionOrder: any[],
  complexGraph: Graph
) => {
  console.log("\nTask Details for Optimization Analysis:");
  executionOrder.forEach((nodeId) => {
    const node = complexGraph.node(nodeId);
    // For demonstration, show basic info:
    console.log(
      `Task: ${node.name}, Duration: ${
        node.duration
      } unit(s), Resources: ${node.resources.join(", ")}`
    );
  });
};
export const printOptimizationAnalysis = (tasks: any[]) => {
  console.log("\nOptimization Insights (Forecast Shortfalls):");
  tasks
    .filter((node) => node.name.startsWith("Forecast"))
    .forEach((node) => {
      const deviation =
        node.forecast.expectedUsage -
        (node.inventory ? node.inventory.current : 0);
      console.log(node);
      if (deviation > 0) {
        console.log(
          `${node.name} for ${node.drug}: Shortfall of ${deviation} units.`
        );
      }
    });
};
