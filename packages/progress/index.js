import Progress from './src/index.vue';

Progress.install = function(Vue) {
  Vue.component(Progress.name, Progress);
};

export default Progress;
