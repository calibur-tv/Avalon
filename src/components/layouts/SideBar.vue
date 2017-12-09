<style lang="scss">
  $item-size: 50px;
  #side-bar {
    position: fixed;
    bottom: 80px;
    background-color: transparent;
    width: $item-size;
    z-index: 10;

    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity .5s
    }
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0
    }

    .item {
      background-color: $color-gray-deep;
      width: $item-size;
      height: $item-size;
      margin-bottom: 5px;
      border-radius: 4px;
      font-size: 30px;
      text-align: center;
      line-height: 50px;
      color: $color-white;
      cursor: pointer;
      font-family: 'iconfont' !important;
      transition: opacity .5s;

      &:hover {
        background-color: $color-dark-light;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>

<template>
    <transition name="fade">
      <div id="side-bar" v-show="right && show" :style="{ right: `${right}px` }">
        <el-tooltip placement="left" effect="dark" content="发帖">
          <div class="item icon-fatie1"
               @click.stop.prevent="showPostModal = true">
            <v-modal v-model="showPostModal">
              create post modal
            </v-modal>
          </div>
        </el-tooltip>
        <el-tooltip placement="left" effect="dark" content="反馈">
          <div class="item icon-fankui"
               @click.stop.prevent="showFeedModal = true">
            <v-modal v-model="showFeedModal">
              feedback modal
            </v-modal>
          </div>
        </el-tooltip>
        <el-tooltip placement="left" effect="dark" content="返回顶部">
          <div v-show="showToTop" class="item icon-fanhuidingbu"
               @click="$scrollToY(0)"
          ></div>
        </el-tooltip>
      </div>
    </transition>
</template>

<script>
  export default {
    name: 'v-side-bar',
    data () {
      return {
        show: true,
        right: 0,
        showToTop: false,
        showPostModal: false,
        showFeedModal: false
      }
    },
    methods: {
      computeShow () {
        this.showToTop = window.scrollY > window.innerHeight
      },
      computeOffset () {
        this.right = (document.body.offsetWidth - document.querySelector('.container').offsetWidth) / 2 - 50
      }
    },
    beforeMount () {
      this.$channel.$on('toggle-side-bar', (toggle) => {
        this.show = toggle
      })
    },
    mounted () {
      this.computeOffset()
      this.computeShow()
      document.addEventListener('scroll', this.$throttle(() => {
        this.computeShow()
      }, 500))
      window.addEventListener('resize', this.$throttle(() => {
        this.computeOffset()
        this.computeShow()
      }, 500))
    }
  }
</script>
