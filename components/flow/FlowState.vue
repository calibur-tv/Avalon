<style lang="scss" module>
$height: 40px;
$font-size: 14px;

.flow-state {
  .error,
  .no-more,
  .nothing,
  .fetch-btn,
  .loading {
    text-align: center;
    height: $height;
    line-height: $height;

    span {
      font-size: $font-size;
    }
  }

  .loading {
    i {
      display: inline-block;
      margin-right: 8px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: 2px solid $color-text-normal;
      border-bottom-color: transparent;
      vertical-align: middle;
      animation: rolling 0.8s infinite linear;
    }

    span {
      vertical-align: middle;
    }
  }

  .fetch-btn {
    width: 100%;
    font-size: $font-size;
  }

  @include keyframes(rolling) {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>

<template>
  <div :class="$style.flowState">
    <div
      v-if="error"
      @click="fetch"
    >
      <slot name="error">
        <div :class="$style.error">
          <span>出错了，点击重试</span>
        </div>
      </slot>
    </div>
    <slot
      v-else-if="nothing"
      name="nothing"
    >
      <div :class="$style.nothing">
        <span>这里什么都没有</span>
      </div>
    </slot>
    <slot
      v-else-if="noMore"
      name="no-more"
    >
      <div :class="$style.noMore">
        <span>没有更多了</span>
      </div>
    </slot>
    <slot
      v-else-if="loading"
      name="loading"
    >
      <div :class="$style.loading">
        <i/>
        <span>加载中…</span>
      </div>
    </slot>
    <div v-else-if="!auto">
      <button
        :class="$style.fetchBtn"
        @click="fetch"
      >
        点击加载更多
      </button>
    </div>
  </div>
</template>

<script>
import Utils from '~/components/common/ImageLazyLoad/utils'

export default {
  name: 'FlowState',
  props: {
    auto: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    noMore: {
      type: Boolean,
      default: false
    },
    nothing: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    fetch: {
      type: Function,
      required: true
    }
  },
  mounted() {
    if (this.auto) {
      this.onScroll()
    }
  },
  methods: {
    onScroll() {
      if (this.error) {
        return
      }
      if (Utils.checkInView(this.$el)) {
        this.fetch()
      }
      const id = Utils.on(
        document,
        ['scroll', 'resize'],
        this.$utils.throttle(() => {
          if (this.noMore || !this.auto) {
            Utils.off(id)
            return
          }
          if (Utils.checkInView(this.$el)) {
            this.fetch()
          }
        }, 200)
      )
    }
  }
}
</script>
