<template>
  <div class="zkj-virtual">
    <div
      class="zkj-virtual__container"
      ref="container"
      @scroll="scrollListener"
    >
      <ul class="zkj-virtual__list" ref="list">
        <li
          v-for="(item, index) in showList"
          :key="index"
          :style="{ height: itemHeight + 'px' }"
        >
          <slot :row="item" :$index="index" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZkjVirtualList',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    showNum: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      itemHeight: 50,
      start: 0
    };
  },
  computed: {
    showList() {
      return this.list.slice(this.start, this.start + this.showNum);
    }
  },
  watch: {
    list() {
      this.initData();
    }
  },
  methods: {
    initData() {
      this.$refs.container.style.height = this.itemHeight * this.showNum + 'px';
      this.$refs.list.style.height = this.list.length * this.itemHeight + 'px';
    },

    // 监听滚动
    scrollListener() {
      const scrollTop = this.$refs.container.scrollTop;
      this.start = Math.floor(scrollTop / this.itemHeight);
      this.$refs.list.style.paddingTop = this.start * this.itemHeight + 'px';
    }
  },
  mounted() {
    this.initData();
  }
};
</script>
