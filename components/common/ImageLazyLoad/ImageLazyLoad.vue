<style lang="scss" module>
$placeholder-color: RGB(241, 243, 244);

.inline {
  position: relative;
  overflow: hidden;
  display: inline-block;

  img {
    display: block;
  }

  &.avatar {
    border-radius: 50%;
  }

  .image-wrap {
    width: 100%;
    height: 100%;
    transition: 1s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
}

.block {
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: block;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  &.retry {
    cursor: pointer;

    img {
      display: none;
    }
  }

  // padding-top 用 js 来计算
  .padding-shim {
    background-color: $placeholder-color;
    width: 100%;
    height: 0;
  }

  // 因为需要 padding-shim 来撑起高度，所以这里只能绝对定位了
  .image-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: 1s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }

  // 居中
  .message {
    position: absolute;
    color: #969696;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .load-gif {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    cursor: pointer;

    span {
      color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -25px;
      margin-top: -25px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: solid 1px currentColor;
      line-height: 48px;
      text-align: center;
      user-select: none;

      &:before {
        content: '';
        position: absolute;
        left: -1px;
        top: 24px;
        width: 50px;
        height: 1px;
        border-left: solid 5px currentColor;
        border-right: solid 5px currentColor;
      }

      &:after {
        content: '';
        position: absolute;
        left: 24px;
        top: -1px;
        width: 1px;
        height: 50px;
        border-top: solid 5px currentColor;
        border-bottom: solid 5px currentColor;
      }
    }

    @include keyframes(rolling) {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .rolling:before,
    .rolling:after {
      animation: rolling 0.8s infinite linear;
    }
  }
}

.poster {
  border-radius: 10%;
}

.css-blur .image-wrap {
  filter: blur(10px);
}

.css-fade .image-wrap {
  opacity: 0;
}
</style>

<style lang="scss">
.img-zoom-enter-active,
.img-zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.img-zoom-enter,
.img-zoom-leave-active {
  transform: scale(0);
}
</style>

<template>
  <!-- block 模式，主要是富文本中的图片 -->
  <div
    v-if="full"
    :class="[
      $style.block, // block 的默认样式
      blockModeClasses
    ]"
    :style="blockModeWrapStyle"
  >
    <div :style="blockModeShimPadding" :class="$style.paddingShim" />
    <div :class="$style.imageWrap">
      <img
        v-if="!error"
        :src="
          $isServer
            ? placeholderImage
            : loaded
            ? blockModeImageSrc
            : computePlaceholder
        "
        @error="handleImageLoadError"
        @load="handleImageLoadSuccess"
      />
    </div>
    <span v-if="error" :class="$style.message" v-text="errorMessage" />
    <span v-if="retrying" :class="$style.message" v-text="retryMessage" />
    <transition name="img-zoom">
      <div
        v-if="displayGifMask"
        :class="$style.loadGif"
        @click="clickToLoadGIF"
      >
        <span :class="{ [$style.rolling]: toggleClick }">GIF</span>
      </div>
    </transition>
  </div>
  <!-- inline 模式，主要是用户头像、横排图 -->
  <span
    v-else
    :class="[
      $style.inline,
      {
        [$style.cssFade]: !loaded && !blur, // 如果未加载，并且是默认（fade）动画
        [$style.cssBlur]: !loaded && blur, // 如果未加载，并且是 blur 动画
        [$style.avatar]: avatar, // 如果图片类型是头像，就添加样式为圆形
        [$style.poster]: poster
      }
    ]"
    :style="inlineModeWrapStyle"
  >
    <div :class="$style.imageWrap">
      <img
        :src="
          error
            ? errorPlaceholder
            : $isServer
            ? ''
            : loaded
            ? inlineModeImageSrc
            : computePlaceholder
        "
        :style="inlineImageStyle"
        @error="handleImageLoadError"
      />
    </div>
  </span>
</template>

<script>
import utils from './utils'

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
    full: {
      type: Boolean,
      default: false // 通过 full 参数来判断是做 inline 渲染还是 block 渲染
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
    poster: {
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
      toggleClick: false,
      displayGifMask: false,
      retrying: false,
      containerWidth: 0,
      placeholderImage: '',
      errorPlaceholder: '',
      errorMessage: '',
      retryMessage: '',
      heightLimit: 0
    }
  },
  computed: {
    blockModeWrapStyle() {
      /**
       * block 模式下懒加载图片的容器宽高
       * block 模式下图片有两种一种是宽度 >= 父容器，一种是宽度 < 父容器
       * -----
       * 如果宽度小于父容器，那么图片是需要居中展示的，所以这里不能直接使用：width: 100%
       * 而是给一个具体的 px，然后通过 margin:0 auto 来居中
       * 如果宽度大于父容器，我们使用了 max-width: 100% 来让它不会超出父容器，也就是缩放了图片宽度
       * 图片的高度在 computeContainerHeight 已经缩放过了
       * -----
       * container 的高度通过一个内部元素的 padding 来撑起来
       */
      return {
        width: `${this.width}px`
      }
    },
    blockModeClasses() {
      const result = []
      if (this.error) {
        result.push(this.$style.retry)
      }
      if (this.poster) {
        result.pust(this.$style.poster)
      }
      if (!this.loaded) {
        if (this.gifNeedClickToLoad) {
          result.push(this.$style.cssGif)
        } else if (this.blur) {
          result.push(this.$style.cssBlur)
        } else {
          result.push(this.$style.cssFade)
        }
      }
      return result
    },
    computeContainerHeight() {
      /**
       * 计算懒加载图片容器的高度
       * 如果是服务端，返回 0
       * 如果是客户端，根据图片宽度和父容器宽度进行计算
       * 图片宽度如果大于容器宽度，那么就要对高度进行缩放，否则直接返回图片高度
       */
      if (this.$isServer) {
        return 0
      }
      if (this.width > this.containerWidth) {
        return parseInt((this.height / this.width) * this.containerWidth, 10)
      }
      return this.height
    },
    blockModeShimPadding() {
      /**
       * block 模式下，在服务端无法获取父容器高度，因此要用 padding 来撑起懒加载区域
       */
      return {
        paddingTop: `${parseFloat(this.height / this.width).toFixed(3) * 100}%`
      }
    },
    computePlaceholder() {
      /**
       * 懒加载占位图的 src
       * 如果是 blur 就计算当前图片的一个缩略图，否则用 config 的图
       * 此处用 1/3 的尺寸来做 loading 图
       */
      if (!this.blur) {
        return this.placeholderImage
      }
      if (this.full) {
        const { width, height } = this.blockModeImageDisplaySize
        const percent = this.gifNeedClickToLoad ? 0.5 : 5
        return this.$resize(this.src, {
          width: parseInt(width / percent),
          height: parseInt(height / percent),
          format: 'png'
        })
      }
      return this.$resize(
        this.src,
        this.width === 'auto'
          ? {
              height: parseInt(this.height / 5),
              mode: 2,
              format: 'png'
            }
          : {
              width: parseInt(this.inlineModeImageDisplayWidth / 5),
              height: parseInt(this.height / 5),
              format: 'png'
            }
      )
    },
    inlineModeImageDisplayWidth() {
      /**
       * 计算要展示的图片的真实宽度，我们采用2倍图展示
       * 传入图片的宽度可能是数字、px、%
       * 如果是百分比，那么就根据父容器的宽度来计算一个展示宽度
       * 否则，就是传入宽度的2倍
       */
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
    inlineModeWrapStyle() {
      /**
       * inline 模式下，传入的宽高值格式化后直接使用
       */
      return {
        width: this.width ? this.convertSizeToPx(this.width) : 'auto',
        height: this.height ? this.convertSizeToPx(this.height) : 'auto'
      }
    },
    inlineImageStyle() {
      if (this.width === 'auto') {
        return {
          height: '100%',
          width: 'auto'
        }
      }
      const widthBiggerHeight = this.width > this.height
      if (this.width && this.height) {
        return {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          '-webkit-transform': 'translate(-50%, -50%)',
          width: widthBiggerHeight ? 'auto' : '100%',
          height: widthBiggerHeight ? '100%' : 'auto'
        }
      }
      return {}
    },
    gifNeedClickToLoad() {
      /**
       * GIF需要点击后再加载
       */
      return !!(this.mime && /gif/i.test(this.mime))
    },
    blockModeImageDisplaySize() {
      /**
       * 计算 block 模式下图片展示的宽高
       */
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
    blockModeImageSrc() {
      return this.$resize(this.src, this.blockModeImageDisplaySize)
    },
    inlineModeImageSrc() {
      return this.$resize(
        this.src,
        this.width === 'auto'
          ? {
              height: +this.height * 2,
              mode: 2
            }
          : {
              width: this.inlineModeImageDisplayWidth,
              height: +this.height * 2
            }
      )
    }
  },
  mounted() {
    // 获取父容器的宽度，如果父容器有 padding，就会有 bug
    this.containerWidth = this.$el.parentNode.offsetWidth
    if (this.gifNeedClickToLoad) {
      this.displayGifMask = true
      return
    }
    this.$nextTick(() => {
      if (
        !this.lazy ||
        window.__closeImageLazy__ ||
        utils.checkInView(this.$el)
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
          if (utils.checkInView(this.$el)) {
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
          this.loaded = true
          this.retrying = true
          this.error = false
          utils.off(eventId)
          e.stopPropagation()
        },
        false
      )
    },
    convertSizeToPx(size) {
      if (/auto/.test(size)) {
        return size
      }
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
      this.retrying = false
      if (this.toggleClick) {
        this.toggleClick = false
        this.displayGifMask = false
        this.bindStopGifEvent()
      }
    },
    bindStopGifEvent() {
      const eventId = utils.on(
        this.$el,
        'click',
        e => {
          this.displayGifMask = true
          this.loaded = false
          utils.off(eventId)
          e.stopPropagation()
        },
        false
      )
    },
    handleImageLoadError() {
      this.error = true
      this.retrying = false
      if (this.full) {
        this.bindRetryEvent()
      }
    },
    clickToLoadGIF() {
      if (this.toggleClick) {
        return
      }
      this.toggleClick = true
      this.loaded = true
    }
  }
}
</script>
