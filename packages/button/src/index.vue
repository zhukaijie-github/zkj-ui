<template>
  <button
    class="zkj-button"
    :type="nativeType"
    :class="[
      type ? 'zkj-button--' + type : '',
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled
      }
    ]"
    @click="handleClick"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'ZkjButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    disabled: Boolean
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
};
</script>
