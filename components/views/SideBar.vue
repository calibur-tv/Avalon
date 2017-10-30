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
      <div id="side-bar" v-show="show" :style="{ right: `${right}px` }">
        <!--
        <div class="item icon-fankui"
             @click.stop.prevent="showFeedModal = true">
          <v-modal v-model="showFeedModal">
            feedback modal
          </v-modal>
        </div>
        -->
        <div class="item icon-fanhuidingbu"
             @click="$scrollToY(0)"
        ></div>
      </div>
    </transition>
</template>

<script>
  export default {
    name: 'v-side-bar',
    data () {
      return {
        show: false,
        right: 0,
        showFeedModal: false
      }
    },
    methods: {
      computeShow () {
        this.show = window.scrollY > window.innerHeight
      },
      computeOffset () {
        this.right = (document.body.offsetWidth - document.querySelector('.container').offsetWidth) / 2 - 50
      }
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
