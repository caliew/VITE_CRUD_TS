type Location = { x: number; y: number };
type TSPNode = {
  id: string;
  location: Location;
  duration: number;
};

class TSPOptimizer {
  private distanceMatrix: number[][] = [];

  constructor(private nodes: TSPNode[], private travelSpeed: number) {
    if (nodes.length === 0)
      throw new Error("No nodes provided for TSP optimization");
    if (travelSpeed <= 0) throw new Error("Travel speed must be positive");
    this.buildDistanceMatrix();
  }

  private buildDistanceMatrix() {
    this.distanceMatrix = this.nodes.map((a) =>
      this.nodes.map((b) => this.calculateDistance(a.location, b.location))
    );
  }

  // Add remaining methods unchanged but with safety checks...

  nearestNeighbor(): string[] {
    if (this.nodes.length === 0) return [];

    const unvisited = new Set(this.nodes.map((n) => n.id));
    const path: string[] = [];
    let current = this.nodes[0];

    // ... existing implementation with added null checks ...
  }

  optimizeWith2Opt(route: string[]): string[] {
    if (route.length !== this.nodes.length) {
      throw new Error("Invalid route length for 2-opt optimization");
    }
    // ... existing implementation with safety checks ...
  }
}

export { TSPOptimizer };
export type { Location, TSPNode };
