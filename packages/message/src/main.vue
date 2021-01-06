<template>
  <transition name="slide-fade" @after-leave="handleAfterLeave">
    <div
      :class="['zkj-message', type ? 'zkj-message--' + type : '']"
      v-show="visible"
      :style="positionStyle"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      verticalOffset: 20,
      visible: false,
      type: 'info',
      duration: 3000,
      timer: null,
      closed: false
    };
  },
  computed: {
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`
      };
    }
  },
  watch: {
    closed(n) {
      if (n) {
        this.visible = false;
      }
    }
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    }
  },
  mounted() {
    this.startTimer();
  }
};
</script>
