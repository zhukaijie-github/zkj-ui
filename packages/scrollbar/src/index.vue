<template>
  <div
    :class="['zkj-scrollbar', isHover ? 'is-hover' : '']"
    ref="scrollbar"
    @mouseenter="handlerMouseenter"
    @mouseleave="handlerMouseleave"
  >
    <div class="zkj-scrollbar__wrapper" ref="scrollbarWrapper">
      <div class="zkj-scrollbar__view" ref="scrollbarView">
        <slot />
      </div>
    </div>
    <div class="zkj-scrollbar__bar is-horizontal">
      <div
        class="zkj-scrollbar__thumb"
        @mousedown="clickThumbHandler"
        :style="horizontalStyle"
      ></div>
    </div>
    <div class="zkj-scrollbar__bar is-vertical">
      <div
        class="zkj-scrollbar__thumb"
        @mousedown="clickThumbHandler"
        :style="verticalStyle"
      ></div>
    </div>
  </div>
</template>

<script>
import { on, off, getStyle } from '../../../src/utils/dom';
import {
  addResizeListener,
  removeResizeListener
} from '../../../src/utils/resize-event';

export default {
  name: 'ZkjScrollbar',
  data() {
    return {
      // 滚动条横向样式
      horizontalStyle: {
        width: 0
      },
      // 滚动条纵向样式
      verticalStyle: {
        height: 0
      },
      scrollbar: {},
      scrollbarView: {},
      verticalBar: {
        height: 0,
        startY: 0
      },
      horizontalBar: {
        width: 0,
        startX: 0
      },
      scrollTop: 0,
      scrollLeft: 0,
      isHover: false
    };
  },
  methods: {
    getData() {
      let scrollbar = {
        w: parseFloat(getStyle(this.$refs.scrollbar, 'width')),
        h: parseFloat(getStyle(this.$refs.scrollbar, 'height'))
      };

      var w = 0;
      var h = 0;
      for (var slot of this.$slots.default) {
        w = w + slot.elm.offsetWidth;
        h = h + slot.elm.offsetHeight;
      }
      let scrollbarView = {
        w,
        h
      };
      if (scrollbarView.w > scrollbar.w) {
        this.horizontalStyle = {
          ...this.horizontalStyle,
          width: (scrollbar.w / scrollbarView.w) * 100 + '%'
        };
      }
      if (scrollbarView.h > scrollbar.h) {
        this.verticalStyle = {
          ...this.verticalStyle,
          height: (scrollbar.h / scrollbarView.h) * 100 + '%'
        };
      }
      this.scrollbar = scrollbar;
      this.scrollbarView = scrollbarView;
      this.verticalBar.height =
        (parseFloat(this.verticalStyle.height) / 100) * this.scrollbar.h;
      this.horizontalBar.width =
        (parseFloat(this.horizontalStyle.width) / 100) * this.scrollbar.w;
      this.addEventListener();
    },
    handleScrollbar(e) {
      console.log(e.target.scrollTop);
      let scrollTop = e.target.scrollTop;
      let scrollLeft = e.target.scrollLeft;
      let barScrollTop = (scrollTop / this.scrollbarView.h) * this.scrollbar.h;
      let barScrollLeft =
        (scrollLeft / this.scrollbarView.w) * this.scrollbar.w;
      this.$set(
        this.verticalStyle,
        'transform',
        `translateY(${(barScrollTop / this.verticalBar.height) * 100}%)`
      );
      this.$set(
        this.horizontalStyle,
        'transform',
        `translateX(${(barScrollLeft / this.horizontalBar.width) * 100}%)`
      );
    },
    // 监听滚动条
    addEventListener() {
      off(this.$refs.scrollbarWrapper, 'scroll', this.handleScrollbar);
      on(this.$refs.scrollbarWrapper, 'scroll', this.handleScrollbar);
    },

    // 鼠标按下
    clickThumbHandler(e) {
      if (e.ctrlKey || e.button === 2) {
        return;
      }

      this.verticalBar.startY = e.clientY;
      this.horizontalBar.startX = e.clientX;
      this.scrollTop = this.$refs.scrollbarWrapper.scrollTop;
      this.scrollLeft = this.$refs.scrollbarWrapper.scrollLeft;
      this.startDrag(e);
    },
    startDrag(e) {
      e.stopImmediatePropagation();
      on(document, 'mousemove', this.mouseMoveDocumentHandler);
      on(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
    },
    mouseMoveDocumentHandler(e) {
      // console.log('move', e);
      let moveY = e.clientY;
      let moveX = e.clientX;
      let y = moveY - this.verticalBar.startY;
      let x = moveX - this.horizontalBar.startX;
      let moveScrolltop = 0;
      let moveScrollLeft = 0;
      let totalScrolltop = 0;
      let totalScrollLeft = 0;
      moveScrolltop = (y / this.scrollbar.h) * this.scrollbarView.h;
      moveScrollLeft = (x / this.scrollbar.w) * this.scrollbarView.w;
      totalScrolltop = this.scrollTop + moveScrolltop;
      totalScrollLeft = this.scrollLeft + moveScrollLeft;
      this.$refs.scrollbarWrapper.scrollTop = totalScrolltop;
      this.$refs.scrollbarWrapper.scrollLeft = totalScrollLeft;
    },

    mouseUpDocumentHandler() {
      off(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    },

    handlerMouseenter() {
      this.isHover = true;
    },
    handlerMouseleave() {
      this.isHover = false;
    }
  },
  mounted() {
    this.$refs.scrollbarWrapper.style.marginRight = '-17px';
    this.$refs.scrollbarWrapper.style.marginBottom = '-17px';
    addResizeListener(this.$refs.scrollbarView, this.getData);
  },
  beforeDestroyed() {
    off(this.$refs.scrollbarWrapper, 'scroll', this.handleScrollbar);
    off(document, 'mouseup', this.mouseUpDocumentHandler);
    removeResizeListener(this.$refs.scrollbarView, this.getData);
  }
};
</script>
