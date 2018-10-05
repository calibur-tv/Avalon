<style lang="scss">
#question-panel {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  padding: 16px 0;
  margin-bottom: 10px;

  .qaq-question {
    margin-left: 15px;

    .qaq-tags {
      .tag {
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }

    .title {
      h1 {
        margin-top: 12px;
        margin-bottom: 4px;
        font-size: 22px;
        font-weight: 600;
        line-height: 32px;
        color: #1a1a1a;
      }
    }

    .content {
      .collapsed-content {
        margin-bottom: 1em;
        font-size: 15px;
        line-height: 1.6;
        @extend %breakWord;
      }

      .text-area {
        p {
          margin: 1em 0;
          font-size: 15px;
          line-height: 1.6;
          @extend %breakWord;

          &:first-child {
            margin-top: 0;
          }
        }
      }

      .image-package {
        .image {
          margin: 15px 0;
        }
      }
    }

    .panel {
      &:hover {
        .report-btn {
          opacity: 1;
        }
      }

      .el-button,
      .v-share {
        margin-right: 16px;
        margin-left: 0;
      }

      .el-button--text,
      .share-btn {
        color: $color-text-normal !important;
      }

      .v-share {
        display: inline-block;
      }

      .report-btn {
        opacity: 0;
      }
    }
  }

  .question-aside {
    margin-left: 15px;

    .meta-item {
      margin-top: 5px;
      margin-bottom: 10px;

      .meta-text {
        font-size: 18px;
        color: #1a1a1a;
        font-weight: 600;
        margin-bottom: 5px;
      }
    }
  }
}
</style>

<template>
  <div
    v-if="qaq"
    id="question-panel"
  >
    <v-layout>
      <div
        slot="main"
        class="qaq-question"
      >
        <ul class="qaq-tags">
          <li
            v-for="tag in qaq.tags"
            :key="tag.id"
            class="tag"
          >
            <a
              :href="$alias.bangumi(tag.id)"
              class="tag-btn"
              target="_blank"
              v-text="tag.name"
            />
          </li>
        </ul>
        <div class="title">
          <h1 v-text="qaq.title"/>
        </div>
        <div class="content">
          <div
            v-if="collapsed"
            class="collapsed-content"
          >
            {{ collapsedContent }}
            <el-button
              type="text"
              size="mini"
              @click="collapsed = false"
            >
              显示全部
              <i class="el-icon-arrow-down"/>
            </el-button>
          </div>
          <template v-else>
            <div
              class="text-area"
              v-html="qaq.content"
            />
            <div
              v-for="(img, idx) in qaq.images"
              :key="idx"
              class="image-package"
            >
              <v-img
                :src="img.url"
                :width="img.width"
                :height="img.height"
                :full="true"
                class="image"
              />
            </div>
          </template>
        </div>
        <div class="panel">
          <follow-button
            :id="id"
            :followed="qaq.followed"
            :theme="qaq.followed ? 'info' : 'primary'"
            :round="false"
            followed-text="取消关注"
            un-follow-text="关注问题"
            size="medium"
            type="question"
            @submit="toggleFollowQAQ"
          />
          <template v-if="qaq.my_answer">
            <template v-if="answerPage">
              <el-button
                v-if="isMyAnswer"
                plain
                size="medium"
                type="primary"
                @click="editMyAnswer"
              >
                <i class="el-icon-edit"/>
                编辑回答
              </el-button>
              <a
                v-else-if="qaq.my_answer.published_at"
                :href="$alias.answer(qaq.my_answer.id)"
                target="_blank"
              >
                <el-button
                  plain
                  size="medium"
                >
                  <i class="el-icon-view"/>
                  查看回答
                </el-button>
              </a>
            </template>
            <template v-else>
              <a
                v-if="qaq.my_answer.published_at"
                :href="$alias.answer(qaq.my_answer.id)"
                target="_blank"
              >
                <el-button
                  plain
                  size="medium"
                >
                  <i class="el-icon-view"/>
                  查看回答
                </el-button>
              </a>
              <el-button
                v-else
                plain
                size="medium"
                type="primary"
                @click="editMyAnswer"
              >
                <i class="el-icon-edit"/>
                编辑回答
              </el-button>
            </template>
          </template>
          <el-button
            v-else
            plain
            size="medium"
            @click="beginWriteAnswer"
          >
            <i class="el-icon-edit"/>
            写回答
          </el-button>
          <el-button
            type="text"
            size="medium"
            @click="loadQAQComment"
          >
            <i class="iconfont icon-pinglun1"/>
            {{ qaq.comment_count ? qaq.comment_count + ' 条评论' : '添加评论' }}
          </el-button>
          <v-share
            :url="$alias.question(id)"
            :title="qaq.title"
            :desc="qaq.intro"
            type="button"
          />
          <report-dialog
            :id="id"
            type="question"
          >
            <el-button
              type="text"
              size="medium"
              icon="el-icon-phone"
            >举报</el-button>
          </report-dialog>
          <el-button
            v-if="!collapsed"
            type="text"
            size="medium"
            class="fr"
            @click="collapsedQAQ"
          >
            <i class="el-icon-arrow-up"/>
            收起
          </el-button>
        </div>
        <v-dialog
          v-model="showCommentModal"
          :header="false"
          :footer="false"
          :fullscreen="true"
          class="comment-dialog"
        >
          <div style="max-width: 700px;margin: 0 auto">
            <comment-main
              :id="id"
              :master-id="qaq.user_id"
              :auto="true"
              empty-text="还没有评论"
              type="question"
              @delete-main-comment="handleCommentChange(-1)"
              @create-main-comment="handleCommentChange(1)"
            />
          </div>
        </v-dialog>
      </div>
      <div
        slot="aside"
        class="question-aside"
      >
        <div class="meta-item">
          <div class="meta-text">
            被浏览 {{ qaq.view_count }}
          </div>
        </div>
        <div class="meta-item">
          <div class="meta-text">
            关注者 {{ followers.total }}
          </div>
          <ava-dialog
            v-if="followers.total"
            :users="followers.list"
            :fetch="fetchMoreFollowers"
            :title="`《${followers.total}》人关注了`"
            :loading="loadingFollowers"
            :no-more="followers.noMore"
          />
        </div>
      </div>
    </v-layout>
    <create-answer-form
      v-model="showCreateAnswerForm"
      :title="qaq.title"
      :question-id="id"
      :answer-id="qaq.my_answer ? qaq.my_answer.id : 0"
      :published="qaq.my_answer ? !!qaq.published_at : false"
    />
  </div>
</template>

<script>
import FollowButton from "~/components/common/FollowButton";
import CreateAnswerForm from "~/components/question/CreateAnswerForm";
import QuestionApi from "~/api/questionApi";
import CommentMain from "~/components/comments/CommentMain";

export default {
  name: "QuestionPanel",
  components: {
    FollowButton,
    CommentMain,
    CreateAnswerForm
  },
  data() {
    return {
      collapsed: true,
      loadingFollowers: false,
      showCommentModal: false,
      showCreateAnswerForm: false
    };
  },
  computed: {
    id() {
      return this.qaq.id;
    },
    qaq() {
      return this.$store.state.question.qaq;
    },
    collapsedContent() {
      let text = this.qaq.intro.substring(0, 78);
      if (this.qaq.images.length) {
        text += "[图片]";
      }
      return `${text}...`;
    },
    followers() {
      return this.qaq.follow_users;
    },
    answerPage() {
      return this.$route.name === "answer-show";
    },
    answer() {
      return this.$store.state.question.answers.list[0];
    },
    isGuest() {
      return !this.$store.state.login;
    },
    isMyAnswer() {
      if (this.isGuest || !this.answerPage) {
        return false;
      }
      return this.answer.user.id === this.$store.state.user.id;
    },
    isMyQAQ() {
      if (this.isGuest || this.answerPage) {
        return false;
      }
      return this.qaq.user.id === this.$store.state.user.id;
    }
  },
  created() {
    this.collapsed = this.qaq.intro || this.qaq.images.length;
  },
  mounted() {
    this.$channel.$on("open-write-answer-dialog", (isEdit = false) => {
      if (!this.$store.state.login) {
        this.$toast.info("继续操作前请先登录");
        this.$channel.$emit("sign-in");
        return;
      }
      if (isEdit) {
        this.editMyAnswer();
      } else {
        this.showCreateAnswerForm = true;
      }
    });
  },
  methods: {
    async fetchMoreFollowers() {
      if (this.loadingFollowers) {
        return;
      }
      this.loadingFollowers = true;
      const api = new Api(this);
      const type = "follow";
      try {
        const result = await api.users({
          id: this.id,
          take: 15,
          last_id: this.followers.list[this.followers.list.length - 1].id,
          model: "question",
          type
        });
        this.$store.commit("question/FETCH_QAQ_SOCIAL_USERS", { type, result });
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loadingFollowers = false;
      }
    },
    toggleFollowQAQ(result) {
      const user = this.$store.state.user;
      this.$store.commit("question/QAQ_SOCIAL_TOGGLE", {
        key: "follow",
        value: result,
        user: {
          id: user.id,
          zone: user.zone,
          nickname: user.nickname,
          avatar: user.avatar
        }
      });
    },
    async editMyAnswer() {
      try {
        await this.$store.dispatch("editor/getData", {
          api: new QuestionApi(this),
          id: this.qaq.my_answer.id
        });
        this.showCreateAnswerForm = true;
      } catch (e) {
        this.$toast.error(e);
      }
    },
    loadQAQComment() {
      this.showCommentModal = true;
      this.$nextTick(() => {
        this.$channel.$emit(`fire-load-comment-question-${this.id}`);
      });
    },
    collapsedQAQ() {
      this.collapsed = true;
      window.scrollTo(0, 0);
    },
    handleCommentChange(count) {
      this.$store.commit("question/COMMENT_CHANGE_COUNT", {
        id: this.id,
        key: "qaq",
        value: count
      });
    },
    beginWriteAnswer() {
      if (!this.$store.state.login) {
        this.$toast.info("继续操作前请先登录");
        this.$channel.$emit("sign-in");
        return;
      }
      this.showCreateAnswerForm = true;
    }
  }
};
</script>
