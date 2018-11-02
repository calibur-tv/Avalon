<style lang="scss">
#user-draft {
  .el-radio-group {
    margin-left: 0 !important;
    margin-top: 6px;
  }

  .score-draft {
    padding-bottom: 15px;
    padding-top: 20px;
    &:not(:last-child) {
      border-bottom: 1px solid #f4f5f7;
    }

    .header {
      height: 30px;
      line-height: 30px;

      .title {
        overflow: hidden;
      }

      .bangumi {
        float: right;

        img {
          width: 30px;
          height: 30px;
          border-radius: 3px;
        }
      }
    }

    .body {
      display: block;
      font-size: 13px;
      @include twoline(16px);
    }
  }

  .answer-draft {
    padding-bottom: 15px;
    padding-top: 20px;
    &:not(:last-child) {
      border-bottom: 1px solid #f4f5f7;
    }

    .title {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.6;
      color: #1a1a1a;
      margin-bottom: 6px;

      &:hover {
        color: $color-blue-deep;
      }
    }

    .intro {
      line-height: 25px;
      max-height: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }

  #no-content {
    margin-top: 25px;
  }
}
</style>

<template>
  <div id="user-draft">
    <div>
      <el-radio-group
        v-model="active"
        size="mini"
        @change="handleTabSwitch"
      >
        <el-radio-button label="漫评"/>
        <el-radio-button label="回答"/>
      </el-radio-group>
    </div>
    <template v-if="active === '漫评'">
      <div
        v-for="item in scores.list"
        :key="item.id"
        class="score-draft"
      >
        <div class="header">
          <a
            :href="$alias.bangumi(item.bangumi.id)"
            class="bangumi"
            target="_blank"
          >
            <img :src="$resize(item.bangumi.avatar, { width: 60 })">
          </a>
          <div class="title">
            <a
              :href="$alias.editScore(item.id)"
              class="href-fade-blue"
              target="_blank"
              v-text="item.title"
            />
          </div>
        </div>
        <a
          :href="$alias.editScore(item.id)"
          class="body"
          target="_blank"
          v-text="item.intro"
        />
      </div>
      <no-content v-if="scores.noMore && !scores.list.length"/>
    </template>
    <template v-else-if="active === '回答'">
      <div
        v-for="item in answers.list"
        :key="item.id"
        class="answer-draft"
      >
        <a
          :href="$alias.question(item.question.id)"
          target="_blank"
        >
          <h5
            class="title"
            v-text="item.question.title"
          />
        </a>
        <a
          :href="$alias.answer(item.id)"
          target="_blank"
          class="intro"
          v-text="item.intro"
        />
      </div>
      <no-content v-if="answers.noMore && !answers.list.length"/>
    </template>
  </div>
</template>

<script>
export default {
  name: "UserDraft",
  async asyncData({ store, ctx }) {
    await store.dispatch("users/getUserDrafts", {
      type: "score",
      ctx
    });
  },
  data() {
    return {
      active: "漫评"
    };
  },
  computed: {
    zone() {
      return this.$route.params.zone;
    },
    isMe() {
      return this.$store.state.login
        ? this.zone === this.$store.state.user.zone
        : false;
    },
    scores() {
      return this.$store.state.users.drafts.score;
    },
    answers() {
      return this.$store.state.users.drafts.answer;
    }
  },
  mounted() {
    if (!this.isMe) {
      this.$router.replace({
        name: "user-bangumi"
      });
    }
  },
  methods: {
    handleTabSwitch(label) {
      if (label === "漫评") {
        this.getUserDrafts("score");
      } else if (label === "回答") {
        this.getUserDrafts("answer");
      }
    },
    async getUserDrafts(type) {
      await this.$store.dispatch("users/getUserDrafts", {
        type,
        ctx: this
      });
    }
  }
};
</script>
