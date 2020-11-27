import Button from '../packages/button/index';
import Scrollbar from '../packages/scrollbar/index';
import Progress from '../packages/progress/index';
import VirtualList from '../packages/virtual-list/index';
import Switch from '../packages/switch/index';
import Slider from '../packages/slider/index';

const components = [Button, Scrollbar, Progress, VirtualList, Switch, Slider];

const install = function(Vue) {
  if (install.installed) return;
  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { Button, Scrollbar, Progress, VirtualList, Switch, Slider };
export default {
  install,
  Button,
  Scrollbar,
  Progress,
  VirtualList,
  Switch,
  Slider
};
