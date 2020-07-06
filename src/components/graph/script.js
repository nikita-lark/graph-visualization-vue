import Node from '../node/component.vue';

export default {
  components: { Node },
  props: ['data', 'width', 'height'],
  data: () => ({
    points: [],
    edges: [],
  }),
  mounted() { },
  watch: { },
  computed: {
    graph: {
      get() {
        return this.data;
      },
      set(value) {
        this.$emit('update:data', value);
      },
    },
  },
  methods: {
    onNodeDrag(coords) {
      /* eslint-disable no-param-reassign */
      const newGraph = JSON.parse(JSON.stringify(this.graph));
      newGraph.nodes.forEach((node) => {
        if (node.id === coords.id) {
          node.x = coords.newX;
          node.y = coords.newY;
        }
      });
      newGraph.edges.forEach((edge) => {
        if (edge.point1.id === coords.id) {
          edge.point1.x = coords.newX;
          edge.point1.y = coords.newY;
        } else if (edge.point2.id === coords.id) {
          edge.point2.x = coords.newX;
          edge.point2.y = coords.newY;
        }
      });
      this.graph = newGraph;
      /* eslint-enable no-param-reassign */
    },
    onNodeClick(node) {
      alert(`The node '${node.label}' is clicked!`);
    },
  },
  filters: { },
};
