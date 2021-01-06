export default {
  methods: {
    dispatch(componentName, eventName, params) {
      // 如果没有父组件就用根组件
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;

      // 遍历父组件，查找并匹配name，直到找到对应的父组件或无
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          // 匹配到，则修改name，用于判断并推出循环
          name = parent.$options.componentName;
        }
      }

      if (parent) {
        // 有对应的父组件，则去触发对应的事件
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  }
};
