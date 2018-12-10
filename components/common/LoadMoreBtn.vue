<style lang="scss" scoped>
.load-more-btn {
  width: 100%;
  font-size: 13px;
  color: $color-text-normal;
  text-align: center;
  margin-bottom: 15px;
  margin-top: 30px;
}
</style>

<template>
  <button
    class="load-more-btn"
    @click="loadMore"
  >
    <i
      v-show="loading"
      class="el-icon-loading"
    />
    {{ noMore ? '没有更多了，休息一下吧ヾ(*￣▽￣*)/' : loading ? '加载中' : '加载更多' }}
  </button>
</template>

<script>
import utils from '~/components/common/ImageLazyLoad/utils'

export default {
  name: 'LoadMoreBtn',
  props: {
    noMore: {
      required: true,
      type: Boolean
    },
    loading: {
      required: true,
      type: Boolean
    },
    auto: {
      default: false,
      type: Boolean
    }
  },
  mounted() {
    if (this.auto && !this.noMore) {
      const eventId = utils.on(
        document,
        'scroll',
        this.$utils.throttle(() => {
          if (utils.checkInView(this.$el)) {
            this.$emit('fetch')
          }
          if (this.noMore) {
            utils.off(eventId)
          }
        }, 200),
        false
      )
    }
  },
  methods: {
    loadMore() {
      if (this.loading || this.noMore) {
        return
      }
      this.$emit('fetch')
    }
  }
}
</script>
