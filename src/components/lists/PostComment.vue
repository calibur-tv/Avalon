<style lang="scss">
  .post-comments-wrap {
    background-color: #f7f8fa;
    position: relative;

    .comments-collapsed-btn {
      position: absolute;
      right: 0;
      top: -22px;
      font-size: 13px;
      margin-right: 15px;
    }

    .comments {
      padding: 4px 15px;

      li {
        display: block;
        width: 100%;
      }

      .avatar {
        @include avatar(32px)
      }
    }

    .comment-reply-area {
      padding: 0 15px 10px;
      height: 45px;
      line-height: 35px;

      .open-comment {
        float: right;
        font-size: 13px;
        margin-top: 10px;
      }
    }

    .comment-reply {
      padding: 4px 15px 14px;
    }
  }
</style>

<template>
  <div class="post-comments-wrap">
    <!-- 如果已经有评论了，那么点击这个按钮只是展开和收起评论 -->
    <button class="comments-collapsed-btn" @click="collapsed = !collapsed" v-if="comments.length">
      {{ collapsed ? `回复(${item.comment_count})` : '收起回复' }}
    </button>
    <!-- 如果没有评论，那么这个按钮就是发起评论，允许自己给自己评论 -->
    <button class="comments-collapsed-btn" @click="openComment = !openComment" v-else>
      {{ openComment ? '收起回复' : '回复' }}
    </button>
    <el-collapse-transition>
      <ul v-show="comments.length && !collapsed" class="comments">
        <post-comment-item v-for="comment in comments"
                           :key="comment.id"
                           :comment="comment"
                           :post-id="postId"
                           :index="index"
        ></post-comment-item>
      </ul>
    </el-collapse-transition>
    <div class="comment-reply-area" v-if="comments.length && !collapsed">
      <!-- 如果有评论了，再显示这里的加载更多和评论按钮，允许给自己评论 -->
      <button class="open-comment" @click="openComment = !openComment">我也说一句</button>
      <el-button v-if="!noMore"
                 type="primary"
                 @click="getComments"
                 :loading="loadingMore"
                 size="mini"
      >点击加载更多</el-button>
      <span>共 {{ item.comment_count }} 条</span>
    </div>
    <div class="comment-reply" v-if="openComment">
      <input type="text"
             placeholder="请缩减至50字以内"
             v-model.trim="content"
             autofocus
             maxlength="50">
      <el-button size="mini"
                 @click="openComment = false"
                 type="info"
                 plain
      >取消</el-button>
      <el-button type="primary"
                 @click="submit"
                 :loading="loadingSubmit"
                 size="mini"
      >发表</el-button>
    </div>
  </div>
</template>

<script>
  import PostCommentItem from '~/components/items/PostComment'

  export default {
    name: 'PostCommentList',
    components: {
      PostCommentItem
    },
    props: {
      index: {
        required: true,
        type: Number
      }
    },
    computed: {
      item () {
        return this.$store.state.post.show.data.list[this.index]
      },
      comments () {
        return this.item.comments
      },
      postId () {
        return this.item.id
      },
      noMore () {
        return this.comments.length >= this.item.comment_count
      },
      isMe () {
        if (!this.$store.state.login) {
          return false
        }
        return this.$store.state.user.id === this.item.user.id
      }
    },
    data () {
      return {
        collapsed: false,
        openComment: false,
        content: '',
        loadingSubmit: false,
        loadingMore: false
      }
    },
    methods: {
      async getComments () {
        this.loadingMore = true
        await this.$store.dispatch('post/getComments', {
          index: this.index,
          postId: this.postId
        })
        this.loadingMore = false
      },
      async submit () {
        if (!this.content) {
          return
        }
        this.loadingSubmit = true
        await this.$store.dispatch('post/setComment', {
          ctx: this,
          index: this.index,
          postId: this.postId,
          targetUserId: this.isMe ? 0 : this.item.user.id,
          content: this.content
        })
        this.openComment = false
        this.content = ''
        this.loadingSubmit = false
      }
    }
  }
</script>
