import ZkjButton from './src/button';

/* istanbul ignore next */
ZkjButton.install = function(Vue) {
  Vue.component(ZkjButton.name, ZkjButton);
};

export default ZkjButton;
