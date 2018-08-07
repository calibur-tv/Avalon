<style lang="scss">
.bangumi-banner {
  .info {
    width: 60%;
    min-width: 600px;
    margin: 120px auto 0 auto;
    color: $color-white;

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

  .v-share {
    position: absolute;
    right: 40px;
    bottom: 10px;
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
    <v-share type="panel"/>
  </v-header>
</template>

<script>
import FollowButton from "~/components/common/FollowButton";

export default {
  name: "BangumiBanner",
  components: {
    FollowButton
  },
  data() {
    return {
      loadingFollow: false
    };
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info;
    }
  },
  methods: {
    handleFollowAction(result) {
      this.$store.commit("bangumi/SET_FOLLOW", { result });
    }
  }
};
</script>
