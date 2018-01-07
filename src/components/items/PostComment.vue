<style lang="scss">
  .post-comment-item {
    padding-top: 10px;
    line-height: 20px;

    .comment-content {
      font-size: 14px;
      color: #222;
    }

    .from-user {
      margin-right: 10px;
      vertical-align: middle;
      display: inline-block;
    }

    .reply-area {
      text-align: right;
      line-height: 13px;

      button {
        margin-left: 5px;
      }
    }
  }
</style>

<template>
  <li class="post-comment-item">
    <a class="from-user" :href="$alias.user(comment.from_user_zone)" target="_blank">
      <v-img class="avatar" :src="comment.from_user_avatar" width="32" height="32"></v-img>
    </a>
    <a class="href-fade-blue" :href="$alias.user(comment.from_user_zone)" target="_blank" v-text="comment.from_user_name"></a>
    <template v-if="comment.to_user_zone">
      回复
      <a class="href-fade-blue" :href="$alias.user(comment.to_user_zone)" target="_blank" v-text="comment.to_user_name"></a>
    </template>
    :
    <span class="comment-content">{{ comment.content }}</span>
    <div class="reply-area">
      <v-time v-model="comment.created_at"></v-time>
      <button @click="openComment = !openComment" v-if="(comment.from_user_id !== currentUserId)">
        {{ openComment ? '收起' : '回复' }}
      </button>
    </div>
    <div class="input-field" v-if="openComment">
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
                 :loading="loading"
                 size="mini"
      >发表</el-button>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'PostCommentItem',
    props: {
      comment: {
        type: Object,
        required: true
      },
      postId: {
        type: Number,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    computed: {
      currentUserId () {
        return this.$store.state.login ? this.$store.state.user.id : 0
      }
    },
    data () {
      return {
        loading: false,
        content: '',
        openComment: false
      }
    },
    methods: {
      async submit () {
        if (!this.content) {
          return
        }
        this.loading = true
        await this.$store.dispatch('post/setComment', {
          ctx: this,
          index: this.index,
          postId: this.postId,
          targetUserId: this.comment.from_user_id,
          content: this.content
        })
        this.openComment = false
        this.content = ''
        this.loading = false
      },
      async getComments () {
        try {
          await this.$store.dispatch('post/getComments', {
            index: this.index,
            postId: this.item.id
          })
        } catch (e) {
          console.log(e)
          this.$toast.error('网络错误，请稍后再试！')
        }
      }
    }
  }
</script>
