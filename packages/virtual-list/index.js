import VirtualList from './src/index.vue';

VirtualList.install = function(Vue) {
  Vue.component(VirtualList.name, VirtualList);
};

export default VirtualList;
