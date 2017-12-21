<style lang="scss">
  #side-bar-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    pointer-events: none;
    background-color: transparent;

    $item-size: 50px;
    #side-bar {
      position: absolute;
      bottom: 80px;
      right: -$item-size;
      background-color: transparent;
      width: $item-size;
      pointer-events: all;

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

    @media (max-width: 1150px) {
      #side-bar {
        right: $item-size;
      }
    }

    .v-modal {
      min-width: 720px;
    }
  }
</style>

<template>
  <div id="side-bar-container" class="container">
    <div id="side-bar" v-show="$route.name !== 'homepage'">
      <el-tooltip placement="left" effect="dark" :content="postTooltip">
        <div class="item icon-fatie1" @click="showPostModal"></div>
      </el-tooltip>
      <el-tooltip placement="left" effect="dark" content="反馈">
        <div class="item icon-fankui" @click="showFeedModal"></div>
      </el-tooltip>
      <el-tooltip placement="left" effect="dark" content="返回顶部">
        <transition name="el-fade-in">
          <div v-show="showToTop" class="item icon-fanhuidingbu" @click="$scrollToY(0)"></div>
        </transition>
      </el-tooltip>
    </div>
    <v-post></v-post>
    <v-feedback></v-feedback>
  </div>
</template>

<script>
  import vPost from '~/components/creates/Post'
  import vFeedback from '~/components/creates/Feedback'

  export default {
    name: 'v-side-bar',
    components: {
      vPost, vFeedback
    },
    data () {
      return {
        showToTop: false
      }
    },
    methods: {
      computeShow () {
        this.showToTop = window.scrollY > window.innerHeight
      },
      showFeedModal () {
        this.$channel.$emit('show-create-feedback-modal')
      },
      showPostModal () {
        this.$channel.$emit('show-create-post-modal')
      }
    },
    computed: {
      postTooltip () {
        return this.$route.name === 'post-show' ? '回复' : '发帖'
      }
    },
    mounted () {
      this.computeShow()
      document.addEventListener('scroll', this.$throttle(() => {
        this.computeShow()
      }, 500))
      window.addEventListener('resize', this.$throttle(() => {
        this.computeShow()
      }, 500))
    }
  }
</script>
