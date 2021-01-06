<template>
  <div class="zkj-image">
    <slot v-if="loading" name="placeholder">
      <div class="el-image__placeholder">加载中</div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="el-image__error">加载失败</div>
    </slot>
    <img
      v-else
      :src="src"
      alt=""
      class="zkj-image__inner"
      @click="handlerClick"
    />
    <template v-if="preview">
      <ImagePreview
        :visible="showViewer"
        :urlList="previewSrcList"
        :onClose="closeViewer"
      />
    </template>
  </div>
</template>

<script>
import ImagePreview from './image-preview';
export default {
  name: 'ZkjImage',
  components: {
    ImagePreview
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: false
    },
    previewSrcList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: true,
      error: false,
      showViewer: false
    };
  },
  computed: {
    preview() {
      const { previewSrcList } = this;
      return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    }
  },
  watch: {
    src(n) {
      console.log(n);
      this.loadImage();
    }
  },
  methods: {
    handlerClick() {
      if (!this.preview) return;
      document.body.style.overflow = 'hidden';
      this.showViewer = true;
    },
    closeViewer() {
      document.body.style.overflow = '';
      this.showViewer = false;
    },
    loadImage() {
      this.loading = true;
      this.error = false;
      const img = new Image();
      img.onload = e => {
        console.log(e);
        this.loading = false;
        this.error = false;
      };
      img.src = this.src;
    }
  },
  mounted() {
    this.loadImage();
  }
};
</script>
