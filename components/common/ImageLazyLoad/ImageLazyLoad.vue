<style lang="scss" module>
$transition: 0.4s linear;
$placeholder-color: RGB(241, 243, 244);

.inline {
  position: relative;
  background-color: transparent;
  transition: $transition;
  overflow: hidden;
  display: inline-block;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  &.unload-blur {
    filter: blur(5px);
  }
}

.block {
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  background-color: transparent;
  transition: $transition;
  overflow: hidden;
  display: block;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  &.unload-blur {
    filter: blur(16px);
  }
}

.avatar {
  border-radius: 50%;
}

.retry {
  background-color: $placeholder-color;
  position: relative;
  cursor: pointer;

  img {
    display: none;
  }
}

.message {
  color: #000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.padding {
  width: 100%;
  height: 0;
}

.shim {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;

  img {
    margin: 0 auto;
  }
}

.unload-fade {
  background-color: $placeholder-color;

  img {
    display: none;
  }
}

.unload-blur {
  $placeholder-color: RGB(241, 243, 244);
  transition: 1s cubic-bezier(0.78, 0.14, 0.15, 0.86) !important;
}
</style>

<template>
  <div
    v-if="full"
    :class="[
      $style.block,
      {
        [$style.unloadFade]: !loaded && !blur,
        [$style.unloadBlur]: !loaded && blur,
        [$style.retry]: error,
        [$style.avatar]: avatar,
      }
    ]"
    :style="lazyFullStyle"
  >
    <div
      :style="fullImagePaddingShim"
      :class="$style.padding"
    />
    <div
      ref="shim"
      :class="$style.shim"
    >
      <img
        v-if="!error"
        ref="img"
        :src="$isServer ? blur ? placeholderImage : '' : loaded ? fullImageSrc : computePlaceholder"
        :style="{ width: computeShimWidth }"
        @error="handleImageLoadError"
        @load="handleImageLoadSuccess"
      >
    </div>
    <div
      v-if="error"
      :class="$style.error"
    >
      <span
        :class="$style.message"
        v-text="message"
      />
    </div>
  </div>
  <span
    v-else
    :class="[
      $style.inline,
      {
        [$style.unloadFade]: !loaded && !blur,
        [$style.unloadBlur]: !loaded && blur,
        [$style.avatar]: avatar
      }
    ]"
    :style="normalImageStyle"
  >
    <img
      ref="img"
      :src="error ? errorPlaceholder : $isServer ? blur ? placeholderImage : '' : loaded ? flowImageSrc : computePlaceholder"
      @error="handleImageLoadError"
    >
  </span>
</template>

<script>
import utils from './utils'

// TODO large height image cropper & click show all
// TODO large GIF click load
// TODO test render when use v-show
// TODO watch src change

export default {
  name: 'VImg',
  props: {
    src: {
      required: true,
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 0
    },
    height: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [Number, String],
      default: 0
    },
    full: {
      type: Boolean,
      default: false
    },
    mime: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: true
    },
    blur: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loaded: false,
      error: false,
      containerWidth: 0,
      message: '',
      placeholderImage: '',
      errorPlaceholder: '',
      errorMessage: '',
      retryMessage: '',
      heightLimit: 0
    }
  },
  computed: {
    lazyFullStyle() {
      return {
        width: `${this.width}px`,
        height: this.computeContainerHeight
          ? `${this.computeContainerHeight}px`
          : 'auto'
      }
    },
    computePlaceholder() {
      if (this.blur) {
        if (this.full) {
          const { width, height } = this.fullScreenImageSize
          return this.$resize(this.src, {
            width: parseInt(width / 3),
            height: parseInt(height / 3)
          })
        }
        return this.$resize(
          this.src,
          this.size
            ? {
                width: parseInt(this.size / 3)
              }
            : this.width === 'auto'
              ? {
                  height: parseInt(this.height / 3),
                  mode: 2
                }
              : {
                  width: parseInt(this.convertImageReallyWidth / 3),
                  height: parseInt(this.height / 3)
                }
        )
      }
      return this.placeholderImage
    },
    computeContainerHeight() {
      if (this.$isServer) {
        return 0
      }
      if (this.width >= this.containerWidth) {
        return parseInt((this.height / this.width) * this.containerWidth, 10)
      }
      return this.height
    },
    fullImagePaddingShim() {
      if (this.width >= this.containerWidth) {
        return {
          paddingTop: `${(this.height / this.width) * 100}%`
        }
      }
      return {
        paddingTop: `${(this.height / this.containerWidth) * 100}%`
      }
    },
    computeShimWidth() {
      return this.width >= this.containerWidth ? '100%' : `${this.width}px`
    },
    convertImageReallyWidth() {
      const numberWidth = +this.width
        .toString()
        .replace('px', '')
        .replace('%', '')
      return parseInt(
        /%$/.test(this.width)
          ? (this.containerWidth / 50) * numberWidth
          : numberWidth * 2,
        10
      )
    },
    normalImageStyle() {
      return this.size
        ? {
            width: this.convertSize(this.size),
            height: this.convertSize(this.size)
          }
        : {
            width: this.convertSize(this.width),
            height: this.convertSize(this.height)
          }
    },
    shouldClickToLoad() {
      return !!(this.mime && /gif/i.test(this.mime))
    },
    fullImageSrc() {
      return this.$resize(this.src, this.fullScreenImageSize)
    },
    fullScreenImageSize() {
      let resultWidth
      let resultHeight
      if (this.width > this.containerWidth * 2) {
        resultWidth = this.containerWidth * 2
        resultHeight = this.computeContainerHeight * 2
      } else {
        resultWidth = this.width
        resultHeight = this.height
      }
      if (resultWidth > 9999) {
        resultHeight = parseInt((9999 / resultWidth) * resultHeight, 10)
        resultWidth = 9999
      }
      if (resultHeight > 9999) {
        resultWidth = parseInt((9999 / resultHeight) * resultWidth, 10)
        resultHeight = 9999
      }
      return {
        width: resultWidth,
        height: resultHeight
      }
    },
    flowImageSrc() {
      if (this.full) {
        return this.width > this.containerWidth
          ? this.$resize(this.src, {
              width: this.containerWidth * 2,
              height: this.computeContainerHeight * 2
            })
          : this.$resize(this.src, {
              width: this.width,
              height: this.height
            })
      }
      return this.$resize(
        this.src,
        this.size
          ? {
              width: +this.size * 2
            }
          : this.width === 'auto'
            ? {
                height: +this.height * 2,
                mode: 2
              }
            : {
                width: this.convertImageReallyWidth,
                height: +this.height * 2
              }
      )
    }
  },
  mounted() {
    this.containerWidth = this.$el.parentNode.offsetWidth
    this.$nextTick(() => {
      if (
        !this.lazy ||
        window.__closeImageLazy__ ||
        utils.checkInView(this.$el, 1)
      ) {
        this.loaded = true
      } else {
        this.bindLazyEvent()
      }
    })
  },
  methods: {
    bindLazyEvent() {
      const eventId = utils.on(
        document,
        'scroll',
        this.$utils.throttle(() => {
          if (utils.checkInView(this.$el, 1)) {
            this.loaded = true
            utils.off(eventId)
          }
        }, 200),
        false
      )
    },
    bindRetryEvent() {
      const eventId = utils.on(
        this.$el,
        'click',
        e => {
          this.message = this.retryMessage
          this.loaded = true
          this.error = false
          utils.off(eventId)
          e.stopPropagation()
        },
        false
      )
    },
    convertSize(size) {
      if (/px$/.test(size)) {
        return size
      }
      if (/%$/.test(size)) {
        return size
      }
      return `${size}px`
    },
    handleImageLoadSuccess() {
      this.error = false
    },
    handleImageLoadError() {
      this.error = true
      if (this.full) {
        this.message = this.errorMessage
        this.bindRetryEvent()
      }
    }
  }
}
</script>
