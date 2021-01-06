import Vue from 'vue';
import Main from './main.vue';

const MessageConstructor = Vue.extend(Main);

let seed = 0;
let instance = null;
let instances = [];

const Message = function(options) {
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  let userOnClose = options.onClose;
  let id = 'message-' + seed++;
  let verticalOffset = options.offset || 20;
  options.onClose = function() {
    Message.close(id, userOnClose);
  };
  instance = new MessageConstructor({
    data: options
  });

  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  return instance;
};

['success', 'error', 'info', 'waring'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});

Message.close = function(id, userOnClose) {
  let len = instances.length;
  let index = -1;
  let removeHeiht = 0;
  for (let i = 0; i < instances.length; i++) {
    if (id === instances[i].id) {
      index = i;
      removeHeiht = instances[i].$el.offsetHeight;
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }

  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = 0; i < instances.length; i++) {
    let dom = instances[i].$el;
    dom.style['top'] = `${parseInt(dom.style['top'], 10) - removeHeiht - 16}px`;
  }
};

export default Message;
