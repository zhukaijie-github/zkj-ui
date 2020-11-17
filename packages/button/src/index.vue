<template>
  <button :type="nativeType" :class="['zkj-button', 'zkj-button--' + type]">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ZkjButton',
  props: {
    // 类型-> primary / success / warning / danger / info / text
    type: {
      type: String,
      default: 'default'
    },
    // 尺寸-> large / small / mini
    size: String,
    nativeType: {
      type: String,
      default: 'button'
    },
    // 朴素
    plain: Boolean,
    // 圆角
    round: Boolean,
    // 圆形
    circle: Boolean,
    // 禁止
    disabled: Boolean
  }
};
</script>
