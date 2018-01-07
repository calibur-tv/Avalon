<style lang="scss" scoped="">

</style>

<template>
  <li>
    <a :href="$alias.user(comment.from_user_zone)" target="_blank">
      <v-img class="avatar" :src="comment.from_user_avatar" width="32" height="32"></v-img>
    </a>
    <a :href="$alias.user(comment.from_user_zone)" target="_blank" v-text="comment.from_user_name"></a>
    <template v-if="comment.to_user_zone">
      回复
      <a :href="$alias.user(comment.to_user_zone)" target="_blank" v-text="comment.to_user_name"></a>
    </template>
    :
    {{ comment.content }}
    <div>
      <v-time v-model="comment.created_at"></v-time>
      <button @click="openComment = true" v-if="(comment.from_user_id !== currentUserId) && openComment === false">
        回复
      </button>
    </div>
    <div class="input-field" v-if="openComment">
      <input type="text"
             placeholder="请缩减至50字以内"
             v-model="content"
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
      submit () {

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
