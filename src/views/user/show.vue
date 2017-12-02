<style lang="scss">
  #user-show {
    $banner-height: 400px;

    #banner {
      position: relative;
      width: 100%;
      overflow: hidden;
      box-shadow: inset 0 0 15px 0 rgba(0,0,0,.5);
      z-index: 1;
      height: $banner-height;
      margin-bottom: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .img {
        width: 110%;
        height: $banner-height;
        margin: -$banner-height / 2 -55%;
        position: absolute;
        top: 50%;
        left: 50%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -1;
        @include filter-blur();
      }
    }

    .container {
      .el-tabs__active-bar:after {
        display: none;
      }
    }
  }
</style>

<template>
  <div id="user-show">
    <section id="banner">
      <div class="img bg" :style="{ backgroundImage: `url(${$resize(user.banner, { width: 1920, mode: 0 })})`}"></div>
    </section>
    <div class="container">
      <el-tabs tab-position="left" @tab-click="handleTabClick">
        <el-tab-pane v-for="tab in tabs" :label="tab">{{ tab }}</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData ({ route, store, ctx }) {
      await store.dispatch('users/getUser', {
        ctx,
        zone: route.params.slug
      })
    },
    head () {
      return {
        title: this.user.nickname,
        meta: [
          { hid: 'description', name: 'description', content: this.user.signature },
          { hid: 'keywords', name: 'keywords', content: `calibur,用户,天下漫友是一家,${this.user.zone},${this.user.nickname}` }
        ]
      }
    },
    computed: {
      slug () {
        return this.$route.params.slug
      },
      user () {
        return this.$store.state.users.list[this.slug]
      },
      isMe () {
        return this.slug === this.$store.state.user.zone
      },
      tabs () {
        return [
          '番剧',
          '帖子',
          '图片',
          '朋友圈'
        ].concat(this.isMe ? [
          '收件箱',
          '黑历史',
          '个人资料',
          '设置'
        ] : [])
      }
    },
    data () {
      return {

      }
    },
    beforeMount () {
      this.$channel.$emit('change-page-background', {
        img: '',
        theme: 'mask'
      })
    },
    methods: {
      handleTabClick (tab) {
        console.log(tab.index)
      }
    }
  }
</script>
