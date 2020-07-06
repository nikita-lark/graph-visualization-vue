class SpringyService {
  // eslint-disable-next-line no-empty-function
  constructor() { }

  static buildGraphFromSpringyLayout(layout, width, height) {
    const graph = {
      id: layout.graph.id,
      nodes: [],
      edges: [],
    };
    const box = layout.getBoundingBox();
    layout.graph.nodes.forEach((node) => {
      const point = layout.nodePoints[node.id].p;
      const { x, y } = this.getScreenCoords(point, box, width, height);
      graph.nodes.push({
        id: node.id,
        label: node.data.label,
        x,
        y,
      });
    });
    layout.graph.edges.forEach((edge) => {
      const spring = layout.edgeSprings[edge.id];
      const coords1 = this.getScreenCoords(spring.point1.p, box, width, height);
      const coords2 = this.getScreenCoords(spring.point2.p, box, width, height);
      graph.edges.push({
        id: edge.id,
        point1: {
          id: edge.source.id,
          x: coords1.x,
          y: coords1.y,
        },
        point2: {
          id: edge.target.id,
          x: coords2.x,
          y: coords2.y,
        },
      });
    });

    return graph;
  }

  static getScreenCoords(point, box, width, height) {
    const size = box.topright.subtract(box.bottomleft);
    return {
      x: point.subtract(box.bottomleft).divide(size.x).x * width,
      y: point.subtract(box.bottomleft).divide(size.y).y * height,
    };
  }

  static buildSpringyGraph(id, data) {
    // eslint-disable-next-line no-undef
    const graph = new Springy.Graph();
    graph.id = id;
    data.nodes.forEach((node) => {
      // eslint-disable-next-line no-undef
      graph.addNode(new Springy.Node(node.id, {
        label: node.name,
        type: node.nodeType,
      }));
    });
    data.relationships.forEach((relationship) => {
      const node1 = graph.nodes.find((node) => node.id === relationship.from);
      const node2 = graph.nodes.find((node) => node.id === relationship.to);
      // eslint-disable-next-line no-undef
      graph.addEdge(new Springy.Edge(relationship.id, node1, node2, { }));
    });

    return graph;
  }
}

export default SpringyService;
