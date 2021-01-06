<template>
  <div class="zkj-radio-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ZkjRadioGroup',
  componentName: 'ZkjRadioGroup',
  props: {
    value: {},
    disabled: Boolean
  },
  watch: {
    value(n) {
      this.$emit('change', n);
    }
  }
};
</script>
