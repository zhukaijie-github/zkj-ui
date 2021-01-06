import Vue from 'vue';
import Main from './main.vue';

const MessageBoxConstructor = Vue.extend(Main);

let instance = null;

const MessageBox = function(options) {
  if (typeof options === 'string') {
    options = {
      content: options
    };
  }
  if (!instance) {
    instance = new MessageBoxConstructor({ data: options });
    instance.$mount();
    document.body.appendChild(instance.$el);
  }

  Vue.nextTick(() => {
    instance.visible = true;
  });

  return new Promise((resolve, reject) => {
    instance.resolve = () => {
      instance.visible = false;
      resolve();
    };
    instance.reject = () => {
      instance.visible = false;
      reject();
    };
  });
};

export default MessageBox;
