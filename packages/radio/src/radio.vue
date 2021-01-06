<template>
  <label
    :class="[
      'zkj-radio',
      model === label ? 'is-checked' : '',
      isDisabled ? 'is-disabled' : ''
    ]"
  >
    <span :class="['zkj-radio__input']">
      <span class="zkj-radio__inner"></span>
      <input
        class="zkj-radio__original"
        type="radio"
        :value="label"
        v-model="model"
        :disabled="isDisabled"
        @change="handlerChange"
      />
    </span>
    <span class="zkj-radio__label"
      ><slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import Emitter from '../../../src/utils/mixins/emitter';

export default {
  name: 'ZkjRadio',
  mixins: [Emitter],
  props: {
    value: {},
    label: {},
    disabled: Boolean
  },
  computed: {
    radioGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'ZkjRadioGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.radioGroup ? this.radioGroup.value : this.value;
      },
      set(val) {
        if (this.radioGroup) {
          this.dispatch('ZkjRadioGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
        }
      }
    },
    isDisabled() {
      return this.radioGroup
        ? this.radioGroup.disabled || this.disabled
        : this.disabled;
    }
  },
  methods: {
    handlerChange() {}
  }
};
</script>
