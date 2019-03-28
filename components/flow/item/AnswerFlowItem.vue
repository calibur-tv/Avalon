<style lang="scss">
.answer-flow-item {
  padding: 16px 20px;
  position: relative;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 -1px 3px rgba(26, 26, 26, 0.1);
  border-radius: 2px;
  overflow: hidden;

  .answer-header {
    height: 40px;
    margin-bottom: 10px;

    .user-avatar {
      float: left;
      margin-right: 10px;
      @include avatar(40px);
    }

    .info {
      overflow: hidden;

      .nickname {
        color: #444;
        font-weight: 600;
        font-size: 15px;
        line-height: 1.4;
      }

      .signature {
        line-height: 1.3;
        font-size: 14px;
        color: #646464;
      }
    }
  }

  .answer-meta {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
    color: #8590a6;

    a:hover {
      text-decoration: underline;
    }
  }

  .answer-content {
    margin-bottom: 40px;
  }

  .answer-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 54px;
    padding: 10px 20px;

    &:hover {
      .report-btn {
        opacity: 1 !important;
      }
    }

    .el-button,
    .fen-think {
      margin-left: 16px;
    }

    .el-button--text,
    .fen-think-btn {
      color: $color-text-normal !important;
    }

    .fen-think {
      display: inline-block;
    }

    .report-btn {
      opacity: 0;
    }
  }
}
</style>

<template>
  <div :id="`answer-${item.id}`" class="answer-flow-item">
    <header class="answer-header">
      <user-card
        :id="item.user.id"
        :zone="item.user.zone"
        custom-class="user-avatar"
      >
        <v-img :src="item.user.avatar" width="40" height="40" />
      </user-card>
      <div class="info">
        <a
          :href="$alias.user(item.user.zone)"
          class="nickname"
          target="_blank"
          v-text="item.user.nickname"
        />
        <p class="oneline signature" v-text="item.user.signature" />
      </div>
    </header>
    <div v-if="item.vote_count" class="answer-meta">
      <span v-if="item.source_url">
        <a :href="item.source_url" target="_blank">
          原文链接
        </a>
        &nbsp;·&nbsp;
      </span>
      <span v-if="item.created_at === item.published_at">
        发布于
        <v-time v-model="item.created_at" />
      </span>
      <span v-else>
        编辑于
        <el-tooltip
          :content="`发布于：${item.created_at}`"
          placement="top"
          effect="dark"
        >
          <v-time v-model="item.published_at" />
        </el-tooltip>
      </span>
      &nbsp;·&nbsp;
      <span> {{ item.vote_count }} 赞同了该回答 </span>
    </div>
    <main class="answer-content">
      <json-content :content="item.content" />
    </main>
    <footer class="answer-footer">
      <vote-button
        :id="item.id"
        :total="item.vote_count"
        :score="item.voted"
        :author-id="item.user.id"
        type="answer"
      />
      <el-button type="text" size="medium" @click="loadAnswerComment">
        <i class="iconfont icon-pinglun1" />
        {{ item.comment_count ? item.comment_count + ' 条评论' : '添加评论' }}
      </el-button>
      <v-share
        :url="$alias.answer(item.id)"
        :title="qaq.title"
        :desc="item.intro"
        type="button"
      />
      <template v-if="isMine">
        <el-button
          type="text"
          size="medium"
          @click="$channel.$emit('open-write-answer-dialog', true)"
        >
          <i class="el-icon-edit" />
          编辑
        </el-button>
        <el-button type="text" size="medium" @click="deleteAnswer">
          <i class="el-icon-delete" />
          删除
        </el-button>
      </template>
      <report-dialog :id="item.id" type="answer">
        <el-button type="text" size="medium" icon="el-icon-phone">
          举报
        </el-button>
      </report-dialog>
    </footer>
    <v-dialog
      v-model="showCommentModal"
      :header="false"
      :footer="false"
      :close="false"
      height="600px"
      class="comment-dialog"
    >
      <comment-main
        :id="item.id"
        :master-id="item.user.id"
        :auto="true"
        empty-text="还没有评论"
        type="answer"
        @delete-main-comment="handleCommentChange(-1)"
        @create-main-comment="handleCommentChange(1)"
      />
    </v-dialog>
  </div>
</template>

<script>
import JsonContent from '~/components/jsonEditor/JsonContent'
import VoteButton from '~/components/common/VoteButton'
import CommentMain from '~/components/comments/CommentMain'
import { deleteAnswer } from '~/api/answerApi'

export default {
  name: 'AnswerFlowItem',
  components: {
    JsonContent,
    VoteButton,
    CommentMain
  },
  props: {
    item: {
      required: true,
      type: Object
    },
    qaq: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      showCommentModal: false
    }
  },
  computed: {
    isMine() {
      return this.$store.state.login
        ? this.$store.state.user.id === this.item.user.id
        : false
    }
  },
  methods: {
    loadAnswerComment() {
      this.showCommentModal = true
      this.$nextTick(() => {
        this.$channel.$emit(`fire-load-comment-answer-${this.item.id}`)
      })
    },
    deleteAnswer() {
      this.$confirm('删除后无法找回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            await deleteAnswer(this, {
              id: this.item.id
            })
            this.$toast.success('删除成功').then(() => {
              window.location.reload()
            })
          } catch (e) {
            // do nothing
          }
        })
        .catch(() => {})
    },
    handleCommentChange(count) {
      this.item.comment_count += count
    }
  }
}
</script>
