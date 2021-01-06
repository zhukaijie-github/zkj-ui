<template>
  <div class="zkj-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZkjCheckboxGroup',
  componentName: 'ZkjCheckboxGroup',
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    disabled: Boolean
  },
  methods: {
    setValue(arr) {
      this.$emit('input', arr);
      this.$emit('change', arr);
    }
  }
};
</script>
