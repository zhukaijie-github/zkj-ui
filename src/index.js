import Button from '../packages/button/index';
import Scrollbar from '../packages/scrollbar/index';
import Progress from '../packages/progress/index';
import VirtualList from '../packages/virtual-list/index';
import Switch from '../packages/switch/index';
import Slider from '../packages/slider/index';
import Message from '../packages/message/index';
import MessageBox from '../packages/messageBox/index';
import Image from '../packages/image/index';
import Loading from '../packages/loading/index';
import Radio from '../packages/radio/index';
import RadioGroup from '../packages/radio-group/index';
import Checkbox from '../packages/checkbox/index';
import CheckboxGroup from '../packages/checkbox-group/index';

const components = [
  Button,
  Scrollbar,
  Progress,
  VirtualList,
  Switch,
  Slider,
  Image,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup
];

const install = function(Vue) {
  if (install.installed) return;
  components.map(component => {
    Vue.component(component.name, component);
  });

  Vue.use(Loading.directive);
  Vue.prototype.$message = Message;
  Vue.prototype.$messageBox = MessageBox;
  Vue.prototype.$loading = Loading.service;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  Button,
  Scrollbar,
  Progress,
  VirtualList,
  Switch,
  Slider,
  Message,
  MessageBox,
  Image,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup
};
export default {
  install,
  Button,
  Scrollbar,
  Progress,
  VirtualList,
  Switch,
  Slider,
  Message,
  MessageBox,
  Image,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup
};
