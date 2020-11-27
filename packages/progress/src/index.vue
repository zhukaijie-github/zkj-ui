<template>
  <div :class="['zkj-progress', status ? 'is-' + status : '']">
    <div class="zkj-progress-bar">
      <div class="zkj-progress-bar__out">
        <div
          class="zkj-progress-bar__in"
          :style="{ width: percent + '%', backgroundColor: color }"
        >
          <div class="zkj-progress-bar__inText" v-if="textInside">
            {{ percent + '%' }}
          </div>
        </div>
      </div>
    </div>
    <div class="zkj-progress__text" v-if="!textInside">{{ percent + '%' }}</div>
  </div>
</template>

<script>
export default {
  name: 'ZkjProgress',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: ''
    },
    textInside: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  }
};
</script>
