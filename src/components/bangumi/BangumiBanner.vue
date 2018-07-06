<style lang="scss">
  $banner-height: 400px;

  #bangumi-banner {
    position: relative;
    width: 100%;
    height: $banner-height;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    box-shadow: inset 0 0 15px 0 rgba(0,0,0,.5);
    margin-bottom: 35px;
    z-index: 1;

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

    .info {
      width: 60%;
      min-width: 600px;
      color: $color-white;

      .title, .summary {
        text-shadow: 0 1px 10px gray;
      }

      .title {
        text-align: center;
        font-size: 24px;
        font-weight: 700;
      }

      .summary {
        word-break: break-all;
        word-wrap: break-word;
        text-indent: 2em;
        font-size: 13px;
        line-height: 20px;
        margin: 40px 0 20px 0;
      }

      .console {
        text-align: center;

        .follow {
          padding: 10px 30px;
          height: 40px;
          font-size: 15px;
          border-radius: 40px;
          border: 1px solid;
          color: $color-white;

          &.is-followed {
            background-color: transparent;
            border-color: $color-white;
            text-shadow: 0 1px 10px gray;

            &:hover {
              background-color: rgba(#fff, .25);
            }
          }

          &.not-follow {
            background-color: $color-pink-deep;
            border-color: $color-pink-deep;

            &:hover {
              border-color: $color-pink-normal;
              background-color: $color-pink-normal;
            }
          }

          i {
            margin-right: 5px;
          }
        }
      }
    }

    .v-share {
      position: absolute;
      right: 40px;
      bottom: 10px;
    }
  }
</style>

<template>
  <div id="bangumi-banner">
    <div
      :style="{ backgroundImage: info ? `url(${$resize(info.banner, { width: 1920, mode: 0 })})` : '' }"
      class="img bg"
    />
    <div class="info">
      <h1
        class="title"
        v-text="info.name"
      />
      <p
        class="summary"
        v-text="info.summary"
      />
      <div class="console">
        <button
          :class="[ info.followed ? 'is-followed' : 'not-follow' ]"
          class="follow"
          @click="follow"
        >
          <i class="iconfont icon-guanzhu"/>
          {{ info.followed ? '已关注' : '关注' }}
        </button>
      </div>
    </div>
    <v-share type="panel"/>
  </div>
</template>

<script>
  export default {
    name: 'BangumiBanner',
    components: {

    },
    props: {

    },
    data () {
      return {
        loadingFollow: false
      }
    },
    computed: {
      info () {
        return this.$store.state.bangumi.info
      },
      id () {
        return this.$route.params.id
      },
    },
    methods: {
      async follow () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.loadingFollow) {
          return
        }
        this.loadingFollow = true
        try {
          await this.$store.dispatch('bangumi/follow', {
            ctx: this,
            id: this.info.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingFollow = false
        }
      },
    }
  }
</script>
