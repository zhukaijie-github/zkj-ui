import Vue from 'vue';
import router from './router/index';
import App from './App.vue';
import ZkjUI from '../src/index';
import '../theme-chalk/src/index.scss';

Vue.use(ZkjUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
