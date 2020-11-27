<template>
  <div>
    <div class="zkj-slider" ref="slider">
      <div class="zkj-slider__bar" :style="{ width: newPosition + '%' }"></div>
      <div
        class="zkj-slider__button-wrapper"
        :class="{ hover: hovering, dragging: dragging }"
        :style="{ left: newPosition + '%' }"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousedown="onButtonDown"
        @touchstart="onButtonDown"
      >
        <div
          class="zkj-slider__button"
          :class="{ hover: hovering, dragging: dragging }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStyle } from '../../../src/utils/dom';
export default {
  name: 'ZkjSlider',
  props: {
    value: {
      type: Number,
      defalut: 0
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      hovering: false,
      dragging: false,
      totalWidth: 0,
      barWidth: 0,
      startX: 0,
      startPosition: 0,
      newPosition: 0
    };
  },
  watch: {
    value(n) {
      this.newPosition = n;
    }
  },
  methods: {
    getTotalWidth() {
      this.totalWidth = parseFloat(getStyle(this.$refs.slider, 'width'));
    },
    handleMouseEnter() {
      this.hovering = true;
    },
    handleMouseLeave() {
      this.hovering = false;
    },
    onButtonDown(event) {
      event.preventDefault();
      this.onDragStart(event);
      window.addEventListener('mousemove', this.onDragging);
      window.addEventListener('touchmove', this.onDragging);
      window.addEventListener('mouseup', this.onDragEnd);
      window.addEventListener('touchend', this.onDragEnd);
      window.addEventListener('contextmenu', this.onDragEnd);
    },
    onButtonMove(e) {
      console.log(e);
    },
    onDragStart(event) {
      this.dragging = true;
      if (event.type === 'touchstart') {
        event.clientY = event.touches[0].clientY;
        event.clientX = event.touches[0].clientX;
      }
      if (this.vertical) {
        this.startY = event.clientY;
      } else {
        this.startX = event.clientX;
      }
      this.startPosition = this.value;
    },
    onDragging(event) {
      if (this.dragging) {
        let diff = 0;
        if (event.type === 'touchmove') {
          event.clientY = event.touches[0].clientY;
          event.clientX = event.touches[0].clientX;
        }
        this.currentX = event.clientX;
        diff = ((this.currentX - this.startX) / this.totalWidth) * 100;
        this.newPosition = this.startPosition + diff;
        this.setPosition(this.newPosition);
      }
    },
    onDragEnd() {
      if (this.dragging) {
        setTimeout(() => {
          this.dragging = false;
          this.startPosition = this.newPosition;
          this.$emit('change', this.newPosition);
        }, 0);
        window.removeEventListener('mousemove', this.onDragging);
        window.removeEventListener('touchmove', this.onDragging);
        window.removeEventListener('mouseup', this.onDragEnd);
        window.removeEventListener('touchend', this.onDragEnd);
        window.removeEventListener('contextmenu', this.onDragEnd);
      }
    },

    setPosition(newPosition) {
      if (newPosition === null || isNaN(newPosition)) return;
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > 100) {
        newPosition = 100;
      }
      this.newPosition = newPosition;
    }
  },
  mounted() {
    this.getTotalWidth();
    this.newPosition = this.value;
  }
};
</script>
