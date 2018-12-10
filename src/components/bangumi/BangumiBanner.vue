<style lang="scss">
.bangumi-banner {
  .banner-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(#000, 0.3);
  }

  .info {
    width: 60%;
    min-width: 600px;
    margin: 120px auto 0 auto;
    color: $color-white;
    position: relative;

    .title,
    .summary {
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

      .follow-button {
        &.is-followed {
          background-color: transparent;
          border-color: $color-white;
          text-shadow: 0 1px 10px gray;
          color: #fff;

          &:hover {
            background-color: rgba(#fff, 0.25);
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

  .bangumi-header-bottom {
    position: absolute;
    height: 40px;
    left: 0;
    right: 0;
    bottom: 10px;

    .meta {
      float: left;
      line-height: 40px;
      color: $color-white;
      text-shadow: 0 1px 10px gray;

      span {
        margin-right: 20px;
      }
    }

    .v-share {
      float: right;
    }
  }
}
</style>

<template>
  <v-header
    v-if="info"
    :banner="info.banner"
    type="mask"
    height="400px"
    class="bangumi-banner"
  >
    <div class="banner-mask"/>
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
        <follow-button
          :id="info.id"
          :classes="info.followed ? 'is-followed' : 'not-follow'"
          :followed="info.followed"
          type="bangumi"
          @submit="handleFollowAction"
        />
      </div>
    </div>
    <div class="bangumi-header-bottom">
      <v-layout>
        <div class="meta">
          <span v-if="info.follow_users">关注人数：{{ info.follow_users.total }}</span>
          <span v-if="info.power">活跃度：{{ info.power }}</span>
        </div>
        <v-share type="panel"/>
      </v-layout>
    </div>
  </v-header>
</template>

<script>
import FollowButton from '~/components/common/FollowButton'

export default {
  name: 'BangumiBanner',
  components: {
    FollowButton
  },
  data() {
    return {
      loadingFollow: false
    }
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info
    }
  },
  methods: {
    handleFollowAction(result) {
      this.$store.commit('bangumi/SET_FOLLOW', { result })
    }
  }
}
</script>
