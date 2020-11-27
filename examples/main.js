import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ZkjUi from '../src/index';
import '@packages/theme-chalk/src/index.scss';

Vue.use(ZkjUi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
