<style lang="scss">
#question-panel {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  padding: 16px 0;
  margin-bottom: 10px;

  .qaq-question {
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
                :blur="true"
                :full="true"
                class="image"
              />
            </div>
          </template>
        </div>
        <div class="panel">
          <el-button
            :loading="followState.follow_loading"
            :type="followState.follow ? 'info' : 'default'"
            icon="iconfont icon-follow"
            size="medium"
            @click="toggleQuestionFollow"
          >
            {{ followState.follow ? '取消关注' : '关注问题' }}
          </el-button>
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
          :close="false"
          height="600px"
          class="comment-dialog"
        >
          <comment-main
            :id="id"
            :master-id="qaq.user_id"
            :auto="true"
            empty-text="还没有评论"
            type="question"
            @delete-main-comment="handleCommentChange(-1)"
            @create-main-comment="handleCommentChange(1)"
          />
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
            关注者 {{ followState.follow_users.total }}
          </div>
          <ava-dialog
            v-if="followState.follow_users.total"
            :title="`《${followState.follow_users.total}》人关注了`"
            :id="id"
            type="question"
            action="follow"
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
import CreateAnswerForm from '~/components/question/CreateAnswerForm'
import CommentMain from '~/components/comments/CommentMain'
import { getEditAnswerData } from '~/api/answerApi'

export default {
  name: 'QuestionPanel',
  components: {
    CommentMain,
    CreateAnswerForm
  },
  props: {
    qaq: {
      required: true,
      type: Object
    },
    answer: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      collapsed: true,
      loadingFollowers: false,
      showCommentModal: false,
      showCreateAnswerForm: false
    }
  },
  computed: {
    id() {
      return this.qaq.id
    },
    followState() {
      return this.$store.getters['social/getState']('question', this.id)
    },
    collapsedContent() {
      let text = this.qaq.intro.substring(0, 78)
      if (this.qaq.images.length) {
        text += '[图片]'
      }
      return `${text}...`
    },
    answerPage() {
      return !!this.answer
    },
    isGuest() {
      return !this.$store.state.login
    },
    isMyAnswer() {
      if (this.isGuest || !this.answerPage) {
        return false
      }
      return this.answer.user.id === this.$store.state.user.id
    },
    isMyQAQ() {
      if (this.isGuest || this.answerPage) {
        return false
      }
      return this.qaq.user.id === this.$store.state.user.id
    }
  },
  created() {
    this.collapsed = this.qaq.intro || this.qaq.images.length
  },
  mounted() {
    this.$channel.$on('open-write-answer-dialog', (isEdit = false) => {
      if (!this.$store.state.login) {
        this.$toast.info('继续操作前请先登录')
        this.$channel.$emit('sign-in')
        return
      }
      if (isEdit) {
        this.editMyAnswer()
      } else {
        this.showCreateAnswerForm = true
      }
    })
  },
  methods: {
    async editMyAnswer() {
      try {
        const data = await getEditAnswerData(this, {
          id: this.qaq.my_answer.id
        })
        this.$store.commit('editor/INIT_SECTION', data)
        this.showCreateAnswerForm = true
      } catch (e) {
        this.$toast.error(e)
      }
    },
    loadQAQComment() {
      this.showCommentModal = true
      this.$nextTick(() => {
        this.$channel.$emit(`fire-load-comment-question-${this.id}`)
      })
    },
    collapsedQAQ() {
      this.collapsed = true
      window.scrollTo(0, 0)
    },
    handleCommentChange(count) {
      this.qaq.comment_count += count
    },
    beginWriteAnswer() {
      if (!this.$store.state.login) {
        this.$toast.info('继续操作前请先登录')
        this.$channel.$emit('sign-in')
        return
      }
      this.showCreateAnswerForm = true
    },
    toggleQuestionFollow() {
      this.$store.dispatch('social/toggleAction', {
        id: this.id,
        type: 'question',
        action: 'follow'
      })
    }
  }
}
</script>
