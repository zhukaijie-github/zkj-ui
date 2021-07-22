import Button from './packages/button'

const components = [Button]

const install = function (Vue, options = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
  install,
  Button
}
