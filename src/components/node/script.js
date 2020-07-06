export default {
  components: { },
  props: ['id', 'x', 'y', 'label'],
  data: () => ({
    clientX: undefined,
    clientY: undefined,
    xDiff: 0,
    yDiff: 0,
  }),
  mounted() { },
  watch: { },
  computed: { },
  methods: {
    onMouseDown(event) {
      event.preventDefault();
      this.clientX = event.clientX;
      this.clientY = event.clientY;
      this.xDiff = 0;
      this.yDiff = 0;
      document.onmousemove = this.onMouseMove;
      document.onmouseup = this.onMouseUp;
    },
    onMouseMove(event) {
      event.preventDefault();
      this.xDiff = this.clientX - event.clientX;
      this.yDiff = this.clientY - event.clientY;
      this.clientX = event.clientX;
      this.clientY = event.clientY;
      this.$emit('drag', {
        id: this.id,
        x: this.x,
        y: this.y,
        newX: this.x - this.xDiff,
        newY: this.y - this.yDiff,
      });
    },
    onMouseUp() {
      if (this.xDiff === 0 && this.yDiff === 0) {
        this.$emit('click', {
          id: this.id,
          label: this.label,
        });
      }
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
  filters: { },
};
