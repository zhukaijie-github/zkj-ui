<template>
  <div
    :class="['zkj-switch', checked ? 'on' : '', disabled ? 'is-disabled' : '']"
    @click="toggler"
  >
    <div class="zkj-switch__bar"></div>
  </div>
</template>

<script>
export default {
  name: 'ZkjSwitch',
  props: {
    disabled: Boolean,
    checked: Boolean
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  methods: {
    toggler() {
      if (this.disabled) return;
      this.$emit('change', !this.checked);
    }
  }
};
</script>
