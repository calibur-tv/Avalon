<style lang="scss" module>
.image-preview {
  .container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 2009;
  }

  $previewBarSize: 44px;
  .bar {
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

  .wrap {
    position: absolute;
    top: $previewBarSize;
    bottom: $previewBarSize;
    width: 100%;
    z-index: 0;
  }

  .item {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: zoom-out;
  }

  .top-bar {
    padding: 0 12px;
    height: 44px;
    font-size: 13px;
    line-height: 44px;

    .close {
      float: right;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .foot-bar {
    text-align: center;

    .download {
      display: block;
      color: #fff;
      width: 100px;
      height: 34px;
      line-height: 32px;
      border-radius: 17px;
      border: 1px solid #fff;
      margin: 5px auto;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }

  .prev-btn,
  .next-btn {
    color: #fff;
    width: 70px;
    height: 100px;
    background-color: transparent;
    position: absolute;
    top: 50%;
    margin-top: -50px;

    i {
      display: inline-block;
      height: 32px;
      width: 32px;
      background-color: rgba(0, 0, 0, 0.3);
      text-align: center;
      line-height: 32px;
      font-size: 20px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  .prev-btn {
    left: 0;
    text-align: left;
  }

  .next-btn {
    right: 0;
    text-align: right;
  }
}
</style>

<template>
  <div
    :class="$style.imagePreview"
    @click="handleClick"
  >
    <div
      v-if="show"
      :class="$style.container"
      @click="handleClose"
    >
      <div :class="[$style.bar, $style.topBar]">
        <span
          v-if="total"
          :class="$style.total"
        >
          {{ currentIndex + 1 }}/{{ total }}
        </span>
        <span :class="$style.close">
          &times;
        </span>
      </div>
      <div :class="[$style.bar, $style.footBar]">
        <a
          v-if="currentImage && download"
          :href="currentImage.url"
          :class="$style.download"
          target="_blank"
          @click.stop
        >
          下载原图
        </a>
      </div>
      <div
        v-if="currentImage"
        :class="$style.wrap"
      >
        <div
          :style="{
            backgroundImage: `url(${$resize(currentImage.url, { webP: !download })})`,
            width: `${currentImage.finalWidth}px`,
            height: `${currentImage.finalHeight}px`
          }"
          :class="$style.item"
        />
        <template v-if="total > 1">
          <button 
            :class="$style.prevBtn"
            @click.stop="switchImage(false)"
          >
            <i class="el-icon-caret-left"/>
          </button>
          <button 
            :class="$style.nextBtn"
            @click.stop="switchImage(true)"
          >
            <i class="el-icon-caret-right"/>
          </button>
        </template>
      </div>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  props: {
    images: {
      type: Array,
      default: () => []
    },
    query: {
      type: String,
      default: ''
    },
    download: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      currentIndex: -1,
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
    }
  },
  computed: {
    total() {
      return this.images.length
    },
    currentImage() {
      if (this.currentIndex === -1) {
        return null
      }
      return this.displayImages[this.currentIndex]
    }
  },
  mounted() {
    this.getScreenSize()
    window.addEventListener('resize', this.getScreenSize)
  },
  methods: {
    handleClose() {
      this.show = false
    },
    handleClick(e) {
      if (!this.total) {
        return
      }
      const target = e.target
      const isIMG = target.tagName.toLowerCase() === 'img'
      if (!this.query && !isIMG) {
        return
      }
      if (this.query && target.className.indexOf(this.query) === -1) {
        return
      }
      let imageUrl = ''
      if (isIMG) {
        imageUrl = target.getAttribute('src').split('?')[0]
      } else {
        const img = target.querySelector('img')
        if (!img) {
          return
        }
        imageUrl = img.getAttribute('src').split('?')[0]
      }
      this.getClickImageIndex(imageUrl)
      this.computeDisplaySize(this.currentIndex)
      /*
      if (this.total <= 3) {
        this.computeDisplaySize(0);
        this.computeDisplaySize(1);
        this.computeDisplaySize(2);
      } else {
        const index = this.getSiblingsIndex(this.currentIndex);
        this.computeDisplaySize(index[0]);
        this.computeDisplaySize(index[2]);
      }
      */
      this.show = true
    },
    getClickImageIndex(src) {
      this.images.forEach((image, index) => {
        if (image.url === src) {
          this.currentIndex = index
        }
      })
    },
    getScreenSize() {
      this.maxWidth = window.innerWidth
      this.maxHeight = window.innerHeight - 88
    },
    switchImage(isNext) {
      if (isNext && this.currentIndex === this.total - 1) {
        return
      }
      if (!isNext && this.currentIndex === 0) {
        return
      }
      const newIndex = isNext ? this.currentIndex + 1 : this.currentIndex - 1
      this.computeDisplaySize(newIndex)
      this.currentIndex = newIndex
    },
    getSiblingsIndex(currentIndex) {
      let prevIndex
      let nextIndex
      if (this.currentIndex === 0) {
        prevIndex = this.total - 1
        nextIndex = 1
      } else if (this.currentIndex === this.total - 1) {
        prevIndex = this.total - 2
        nextIndex = 0
      } else {
        prevIndex = this.currentIndex - 1
        nextIndex = this.currentIndex + 1
      }
      return [prevIndex, currentIndex, nextIndex]
    },
    computeDisplaySize(index) {
      if (typeof this.images[index] === 'undefined') {
        return
      }
      const image = this.images[index]
      if (image.finalWidth && image.finalHeight) {
        return
      }
      const imageWidth = image.width
      const imageHeight = image.height
      const maxWidth = this.maxWidth
      const maxHeight = this.maxHeight
      let finalWidth
      let finalHeight
      if (maxWidth >= imageWidth && maxHeight >= imageHeight) {
        // 小图，展示原图大小
        finalWidth = imageWidth
        finalHeight = imageHeight
      } else if (maxWidth < imageWidth && maxHeight < imageHeight) {
        // 超大图，计算一个缩放比例
        const widthRadio = imageWidth / maxHeight
        const heightRadio = imageHeight / maxHeight
        if (widthRadio >= heightRadio) {
          finalWidth = maxWidth
          finalHeight = parseInt(imageHeight / widthRadio, 10)
        } else {
          finalWidth = parseInt(imageWidth / heightRadio, 10)
          finalHeight = maxHeight
        }
      } else if (imageHeight < maxHeight) {
        // 超宽图
        const widthRadio = imageWidth / maxHeight
        finalWidth = maxWidth
        finalHeight = parseInt(imageHeight / widthRadio, 10)
      } else {
        // 超宽图
        const heightRadio = imageHeight / maxHeight
        finalWidth = parseInt(imageWidth / heightRadio, 10)
        finalHeight = maxHeight
      }
      this.displayImages[index].finalWidth = finalWidth || maxWidth
      this.displayImages[index].finalHeight = finalHeight || maxHeight
    },
    handleSwitch(oldVal, val) {
      this.currentIndex = val
    }
  }
}
</script>
