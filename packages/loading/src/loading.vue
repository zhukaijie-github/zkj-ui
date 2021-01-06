<template>
  <transition name="loading-fade">
    <div
      :class="['zkj-loading__mask', fullscreen ? 'is-full-screen' : '']"
      v-if="visible"
    >
      <div class="zkj-loading"></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(n) {
      if (!n) {
        document.body.style.overflow = '';
      }
    }
  },
  methods: {
    close() {
      this.visible = false;
      document.body.style.overflow = '';
    }
  }
};
</script>
