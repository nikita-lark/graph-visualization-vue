import Graph from '../../components/graph/component.vue';

import SpringyService from '../../services/SpringyService';

import data1 from '../../data/1593437264028.json';
import data2 from '../../data/1593437284744.json';

export default {
  components: { Graph },
  props: [],
  data: () => ({
    radio: '',
    loading: false,
    width: 900,
    height: 600,
    layout: undefined,
    graph: {
      id: '',
      nodes: [],
      edges: [],
    },
  }),
  mounted() {
    if (!localStorage.getItem('graphs')) {
      localStorage.setItem('graphs', '{}');
    }
  },
  watch: {
    radio(newVal) {
      const key = newVal.toLowerCase();
      const cache = JSON.parse(localStorage.getItem('graphs'));
      if (cache.hasOwnProperty(key)) {
        this.graph = cache[key];
      } else {
        const data = key === 'graph1' ? data1 : data2;
        const graph = SpringyService.buildSpringyGraph(newVal.toLowerCase(), data);
        // eslint-disable-next-line no-undef
        this.layout = new Springy.Layout.ForceDirected(graph, this.width, this.height, 0.5);
        this.layout.start(this.render, this.onRenderStop, this.onRenderStart);
      }
    },
    // not the best idea!
    graph: {
      deep: true,
      handler() {
        const cache = JSON.parse(localStorage.getItem('graphs'));
        cache[this.graph.id] = this.graph;
        localStorage.setItem('graphs', JSON.stringify(cache));
      },
    },
  },
  computed: { },
  methods: {
    render() {},
    onRenderStop() {
      this.loading = false;
      this.graph = SpringyService.buildGraphFromSpringyLayout(this.layout, this.width, this.height);
    },
    onRenderStart() {
      this.loading = true;
    },
  },
  filters: {},
};
