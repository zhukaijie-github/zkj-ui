import Vue from 'vue';
import main from './loading.vue';
import { addClass } from '../../../src/utils/dom';

const LoadingConstructor = Vue.extend(main);

const loadingDirective = {};
let instance = null;
loadingDirective.install = Vue => {
  const tobuildLoading = el => {
    addClass(el, 'zkj-loading__parnet');
    instance = new LoadingConstructor({
      data: {}
    });
    instance.$mount();
    el.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.visible = true;
    });
  };

  Vue.directive('loading', {
    bind(el, binding) {
      // console.log('bind------------', el, binding, vnode);
      binding.value && tobuildLoading(el, binding);
    },
    update(el, binding) {
      // console.log('update----------', el, binding, vnode);
      if (binding.oldValue === binding.value) return;
      if (!instance) {
        binding.value && tobuildLoading(el, binding);
      } else {
        if (!binding.value) {
          instance.visible = false;
        }
      }
    },
    unbind() {
      // console.log('unbind----------', el, binding, vnode);
      instance = null;
    }
  });
};

export default loadingDirective;
