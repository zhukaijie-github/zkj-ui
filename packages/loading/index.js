import service from './src/index';
import directive from './src/directive';

export default {
  install(Vue) {
    Vue.use(directive);
    Vue.prototype.$loading = service;
  },
  service,
  directive
};
