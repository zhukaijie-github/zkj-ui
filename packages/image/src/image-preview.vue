<template>
  <transition name="viewer-fade">
    <div class="zkj-image-preview" v-if="visible">
      <div class="zkj-image-preview__close" @click="hide">
        <i class="zkj-icon-close"></i>
      </div>
      <div class="zkj-image-preview__arrow is-prev" @click="handlerPrev"></div>
      <div class="zkj-image-preview__arrow is-next" @click="handlerNext"></div>
      <template v-for="(item, index) in urlList">
        <img
          :class="[
            'zkj-image-preview__canvas',
            isMouseDown ? 'isMouseDown' : ''
          ]"
          :src="item"
          alt=""
          :key="index"
          v-if="index === currentIndex"
          :style="imageStyle"
          @mousedown="handleMouseDown"
        />
      </template>
      <div class="zkj-image-preview__actions">
        <i class="zkj-icon-zoomin" @click="handleActions('zoomIn')"></i>
        <i class="zkj-icon-zoomout" @click="handleActions('zoomOut')"></i>
        <i
          class="zkj-icon-refresh-left"
          @click="handleActions('anticlocelise')"
        ></i>
        <i
          class="zkj-icon-refresh-right"
          @click="handleActions('clocelise')"
        ></i>
      </div>
    </div>
  </transition>
</template>

<script>
import { on, off } from '../../../src/utils/dom';
import { isFirefox } from '../../../src/utils/util';
const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';
export default {
  props: {
    onClose: {
      type: Function,
      default: () => {}
    },
    urlList: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: 0,
      transform: {
        rotate: 0,
        scale: 0.6,
        offsetX: 0,
        offsetY: 0
      },
      isMouseDown: false,
      startX: 0,
      startY: 0
    };
  },
  computed: {
    imageStyle() {
      const { rotate, scale, offsetX, offsetY } = this.transform;
      return {
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        maxHeight: '100%',
        maxWidth: '100%',
        transition: 'transform 0.3s ease 0s',
        marginLeft: `${offsetX}px`,
        marginTop: `${offsetY}px`
      };
    }
  },
  methods: {
    handleMouseDown(e) {
      console.log(e);
      this.isMouseDown = true;
      this.startX = e.pageX;
      this.startY = e.pageY;
      const { offsetX, offsetY } = this.transform;
      this._draghandler = e => {
        const startX = e.pageX;
        const startY = e.pageY;
        this.transform.offsetX = offsetX + startX - this.startX;
        this.transform.offsetY = offsetY + startY - this.startY;
      };

      on(document, 'mousemove', this._draghandler);
      on(document, 'mouseup', () => {
        this.isMouseDown = false;
        off(document, 'mousemove', this._draghandler);
        this._draghandler = null;
      });
      e.preventDefault();
    },
    handlerPrev() {
      let index = this.currentIndex - 1;
      if (index < 0) {
        this.currentIndex = this.urlList.length + index;
      } else {
        this.currentIndex = index;
      }
      this.resetStyle();
    },
    handlerNext() {
      let index = this.currentIndex + 1;
      if (index > this.urlList.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = index;
      }
      this.resetStyle();
    },
    resetStyle() {
      this.transform = {
        rotate: 0,
        scale: 0.6,
        offsetX: 0,
        offsetY: 0
      };
      this.startX = 0;
      this.startY = 0;
    },
    handleActions(type) {
      const zoomRate = 0.2;
      const rotateDeg = 90;
      switch (type) {
        case 'zoomIn':
          this.transform.scale += zoomRate;
          break;
        case 'zoomOut':
          this.transform.scale -= zoomRate;
          if (this.transform.scale < 0.2) {
            this.transform.scale = 0.2;
          }
          break;
        case 'anticlocelise':
          this.transform.rotate -= rotateDeg;
          break;
        case 'clocelise':
          this.transform.rotate += rotateDeg;
          break;
        default:
          break;
      }
    },
    deviceSupportInstall() {
      this._mounsewhell = e => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          this.handleActions('zoomIn');
        } else {
          this.handleActions('zoomOut');
        }
      };
      on(document, mousewheelEventName, this._mounsewhell);
    },
    hide() {
      off(document, mousewheelEventName, this._mounsewhell);
      this._mounsewhell = null;
      this.onClose();
    }
  },
  mounted() {
    this.deviceSupportInstall();
  }
};
</script>
