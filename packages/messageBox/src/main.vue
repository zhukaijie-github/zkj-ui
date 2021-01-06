<template>
  <transition name="msgbox-fade">
    <div class="zkj-message-box" v-show="visible">
      <div class="zkj-message-box__body">
        <div class="zkj-message-box__title">{{ title ? title : '提示' }}</div>
        <div class="zkj-message-box__content">{{ content }}</div>
        <div class="zkj-message-box__footer">
          <ZkjButton type="primary" @click="confim">确定</ZkjButton>
          <ZkjButton @click="cancel">取消</ZkjButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from '../../../src/utils/popup';
import ZkjButton from '../../button/src/index';
export default {
  mixins: [Popup],
  components: {
    ZkjButton
  },
  data() {
    return {
      content: '',
      title: ''
    };
  },
  methods: {
    // 确定
    confim() {
      this.resolve('confim');
    },
    // 取消
    cancel() {
      this.reject('cancel');
    }
  }
};
</script>
