<template>
  <div id="app">
    <h1>Graph Vue</h1>
    <Graphs />
  </div>
</template>

<script>
  import Graphs from './views/graphs/component';

  export default {
    name: 'App',
    components: { Graphs },
    props: ['data'],
    data: () => ({ }),
    mounted() { },
    watch: { },
    computed: { },
    methods: { },
    filters: {},
  }
</script>

<style scoped></style>
