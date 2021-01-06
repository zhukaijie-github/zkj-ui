<template>
  <label
    :class="[
      'zkj-checkbox',
      { 'is-checked': model },
      { 'is-disabled': isDisabled }
    ]"
  >
    <span class="zkj-checkbox__input">
      <span class="zkj-checkbox__inner"></span>
      <input
        type="checkbox"
        class="zkj-checkbox__original"
        v-model="model"
        :disabled="isDisabled"
        @change="handlerChange"
      />
    </span>
    <span class="zkj-checkbox__label"
      ><slot></slot>
      <template v-if="!$slots.default">{{ label }}</template></span
    >
  </label>
</template>

<script>
import Emitter from '../../../src/utils/mixins/emitter';

export default {
  name: 'ZkjCheckbox',
  mixins: [Emitter],
  props: {
    value: {},
    label: {},
    disabled: Boolean
  },
  computed: {
    _checkboxGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'ZkjCheckboxGroup') {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    model: {
      get() {
        if (this._checkboxGroup) {
          if (this._checkboxGroup.value.indexOf(this.label) >= 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return this.value;
        }
      },
      set(val) {
        if (this._checkboxGroup) {
          console.log('val------', val);
          if (val) {
            this._checkboxGroup.setValue(
              [...this._checkboxGroup.value].concat(this.label)
            );
          } else {
            let _list = JSON.parse(JSON.stringify(this._checkboxGroup.value));
            let index = _list.indexOf(this.label);
            _list.splice(index, 1);
            this._checkboxGroup.setValue([..._list]);
          }
        } else {
          this.$emit('input', val);
        }
      }
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    isDisabled() {
      return this._checkboxGroup
        ? this._checkboxGroup.disabled
          ? this._checkboxGroup.disabled
          : false
        : this.disabled;
    }
  },
  methods: {
    handlerChange(e) {
      console.log(e.target.checked);
    }
  },
  mounted() {
    console.log(this.value);
  }
};
</script>
