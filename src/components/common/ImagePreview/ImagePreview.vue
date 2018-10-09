<style lang="scss">
.image-preview {
  .image-preview-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 2009;

    $previewBarSize: 44px;
    .image-preview-bar {
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      height: $previewBarSize;
      width: 100%;
      color: #fff;
      z-index: 1;

      &.top-bar {
        top: 0;
      }

      &.foot-bar {
        bottom: 0;
      }
    }

    .image-preview-carousel {
      position: relative;
      top: $previewBarSize;
      z-index: 0;
    }

    .image-preview-item-wrap {
      position: relative;
    }

    .image-preview-item {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      cursor: zoom-in;
    }
  }
}
</style>

<template>
  <div
    class="image-preview"
    @click="handleClick"
  >
    <div
      v-if="show"
      class="image-preview-container"
    >
      <div class="image-preview-bar top-bar">top</div>
      <div class="image-preview-bar foot-bar">foot</div>
      <el-carousel
        :initial-index="showIndex"
        :loop="false"
        :autoplay="false"
        :height="`${maxHeight}px`"
        arrow="always"
        indicator-position="none"
        easing="ease-in-out"
        class="image-preview-carousel"
        @click="show = false"
        @on-change="handleSwitch"
      >
        <el-carousel-item
          v-for="item in filterImages"
          :key="item.src"
          class="image-preview-item-wrap"
        >
          <div
            :style="{
              backgroundImage: `url(${item.src})`,
              width: `${item.finalWidth}px`,
              height: `${item.finalHeight}px`
            }"
            class="image-preview-item"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "ImagePreview",
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      currentIndex: -1,
      showIndex: -1,
      maxWidth: 0,
      maxHeight: 0,
      displayImages: this.images.map(_ =>
        Object.assign(
          {
            finalWidth: 0,
            finalHeight: 0,
            loading: true
          },
          _
        )
      )
    };
  },
  computed: {
    total() {
      return this.images.length;
    },
    filterImages() {
      if (this.total <= 3) {
        return this.displayImages;
      }
      const index = this.getSiblingsIndex(this.currentIndex);
      console.log(index);
      return [
        this.displayImages[index[0]],
        this.displayImages[index[1]],
        this.displayImages[index[2]]
      ];
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.getScreenSize();
    window.addEventListener("resize", this.getScreenSize);
  },
  methods: {
    handleClick(e) {
      if (!this.total) {
        return;
      }
      if (e.target.tagName.toLowerCase() !== "img") {
        return;
      }
      this.getClickImage(e.target.getAttribute("src").split("?")[0]);
      this.computeDisplaySize(this.currentIndex);
      console.log(e.target.getAttribute("src"));
      console.log(this.currentIndex);
      if (this.total <= 3) {
        this.computeDisplaySize(0);
        this.computeDisplaySize(1);
        this.computeDisplaySize(2);
        this.showIndex = this.currentIndex;
        return;
      }
      const index = this.getSiblingsIndex(this.currentIndex);
      this.showIndex = 1;
      this.computeDisplaySize(index[0]);
      this.computeDisplaySize(index[2]);
    },
    getClickImage(src) {
      this.images.forEach((image, index) => {
        if (image.src === src) {
          this.currentIndex = index;
        }
      });
    },
    getScreenSize() {
      this.maxWidth = window.innerWidth;
      this.maxHeight = window.innerHeight - 88;
    },
    getSiblingsIndex(currentIndex) {
      let prevIndex;
      let nextIndex;
      if (this.currentIndex === 0) {
        prevIndex = this.total - 1;
        nextIndex = 1;
      } else if (this.currentIndex === this.total - 1) {
        prevIndex = this.total - 2;
        nextIndex = 0;
      } else {
        prevIndex = this.currentIndex - 1;
        nextIndex = this.currentIndex + 1;
      }
      return [prevIndex, currentIndex, nextIndex];
    },
    computeDisplaySize(index) {
      if (typeof this.images[index] === "undefined") {
        return;
      }
      const image = this.images[index];
      if (image.finalWidth && image.finalHeight) {
        return;
      }
      const imageWidth = image.width;
      const imageHeight = image.height;
      const maxWidth = this.maxWidth;
      const maxHeight = this.maxHeight;
      let finalWidth;
      let finalHeight;
      if (maxWidth >= imageWidth && maxHeight >= imageHeight) {
        // 小图，展示原图大小
        finalWidth = imageWidth;
        finalHeight = imageHeight;
      } else if (maxWidth < imageWidth && maxHeight < imageHeight) {
        // 超大图，计算一个缩放比例
        const widthRadio = imageWidth / maxHeight;
        const heightRadio = imageHeight / maxHeight;
        if (widthRadio >= heightRadio) {
          finalWidth = maxWidth;
          finalHeight = parseInt(imageHeight / widthRadio, 10);
        } else {
          finalWidth = parseInt(imageWidth / heightRadio, 10);
          finalHeight = maxHeight;
        }
      } else if (imageHeight < maxHeight) {
        // 超宽图
        const widthRadio = imageWidth / maxHeight;
        finalWidth = maxWidth;
        finalHeight = parseInt(imageHeight / widthRadio, 10);
      } else {
        // 超宽图
        const heightRadio = imageHeight / maxHeight;
        finalWidth = parseInt(imageWidth / heightRadio, 10);
        finalHeight = maxHeight;
      }
      this.displayImages[index].finalWidth = finalWidth;
      this.displayImages[index].finalHeight = finalHeight;
      this.show = true;
    },
    handleSwitch(oldVal, val) {
      console.log(oldVal);
      console.log(val);
      this.currentIndex = val;
    }
  }
};
</script>
