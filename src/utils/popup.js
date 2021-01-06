import Vue from 'vue';
import { addClass, removeClass } from './dom';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalDom: null
    };
  },
  watch: {
    visible(n) {
      console.log(Vue);
      if (n) {
        this.getDom();
      } else {
        addClass(this.modalDom, 'v-modal v-modal-out');
        setTimeout(() => {
          removeClass(this.modalDom, 'v-modal-out');
        }, 200);
        document.body.removeChild(this.modalDom);
      }
      console.log(n);
      console.log(this.$el);
    }
  },
  methods: {
    getDom() {
      const dom = this.$el;
      const modalDom = document.createElement('div');
      modalDom.style.zIndex = '1999';
      console.log(addClass);
      addClass(modalDom, 'v-modal v-modal-enter');
      setTimeout(() => {
        removeClass(modalDom, 'v-modal-enter');
      }, 200);

      if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
        dom.parentNode.appendChild(modalDom);
      } else {
        document.body.appendChild(modalDom);
      }
      this.modalDom = modalDom;
    }
  }
};
