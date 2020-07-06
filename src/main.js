// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import App from './app.vue';

Vue.config.productionTip = false;

new Vue({
  render(h) {
    return h(App);
  },
}).$mount('#app');
