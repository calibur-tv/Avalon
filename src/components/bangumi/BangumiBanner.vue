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
  </v-header>
</template>

<script>
export default {
  name: "BangumiBanner",
  components: {},
  props: {},
  data() {
    return {
      loadingFollow: false
    };
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info;
    },
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    async follow() {
      if (!this.$store.state.login) {
        this.$channel.$emit("sign-in");
        return;
      }
      if (this.loadingFollow) {
        return;
      }
      this.loadingFollow = true;
      try {
        await this.$store.dispatch("bangumi/follow", {
          ctx: this,
          id: this.info.id
        });
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loadingFollow = false;
      }
    }
  }
};
</script>
