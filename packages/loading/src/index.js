import Vue from 'vue';
import main from './loading.vue';

const LoadingConstructor = Vue.extend(main);

const loading = function(options = {}) {
  let instance = new LoadingConstructor({
    data: options
  });

  instance.$mount();
  document.body.appendChild(instance.$el);

  instance.fullscreen = true;
  Vue.nextTick(() => {
    instance.visible = true;
  });

  return instance;
};

export default loading;
