export class GraphSize {
  graph: any;

  constructor(graph: any) {
    this.graph = graph;
  }

  get bounds() {
    return this.graph.getGraphBounds();
  }

  get scale() {
    return this.graph.view.scale;
  }

  get height() {
    const { bounds, scale } = this;
    return Math.ceil(bounds.height / scale);
  }

  get width() {
    const { bounds, scale } = this;
    return Math.ceil(bounds.width / scale);
  }

  get size() {
    const { width, height } = this;
    return {
      width,
      height,
    };
  }
}
