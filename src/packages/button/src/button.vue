<template>
  <button
    class="zkj-button"
    :class="[
      type ? 'zkj-button--' + type : '',
      size ? 'zkj-button--' + size : ''
    ]"
    type="button"
  >
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: "ZkjButton",
  props: {
    type: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "default",
    },
  },
};
</script>
