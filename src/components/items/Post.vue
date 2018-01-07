<style lang="scss">
  .post-item {
    background-color: RGB(251, 251, 253);
    border-left: 1px solid #E5E5E5;
    border-right: 1px solid #E5E5E5;
    border-bottom: 1px solid #E1E4E6;

    .user {
      .avatar {
        display: block;
        margin: 20px auto;
        @include avatar(80px)
      }

      .nickname {
        display: block;
        background: #fff;
        border: solid 1px #e6e6e6;
        width: 98px;
        height: 28px;
        line-height: 24px;
        margin: 0 auto;
        text-align: center;
      }
    }

    .content {
      background: #fff;
      min-height: 170px;
      padding: 20px 20px 8px 20px;

      .image {
        width: 100%;
        height: auto;
        margin-bottom: 12px;
        cursor: zoom-in;
      }

      p {
        line-height: 24px;
        font-size: 14px;
        word-wrap: break-word;
        overflow: hidden;
      }
    }
  }
</style>

<template>
  <el-row class="post-item">
    <el-col class="user" :span="5">
      <a :href="$alias.user(post.user.zone)" target="_blank">
        <v-img class="avatar" :src="post.user.avatar" :width="80" :height="80"></v-img>
      </a>
      <a class="nickname oneline" :href="$alias.user(post.user.zone)" target="_blank" v-text="post.user.nickname"></a>
    </el-col>
    <el-col class="content" :span="19">
      <div v-for="(img, idx) in post.images" @click="handleImagePreview(post.images, idx)">
        <v-img class="image" :src="img" width="500" mode="2"></v-img>
      </div>
      <div v-html="post.content"></div>
      <div class="footer">
        <button v-if="canDelete" @click="deletePost">删除</button>
        <span>{{ index + 2 }}楼</span>
        <v-time v-model="post.created_at"></v-time>
        <post-comment-list :index="index"></post-comment-list>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import PostCommentList from '~/components/lists/PostComment'

  export default {
    name: 'post-item',
    components: {
      PostCommentList
    },
    props: {
      index: {
        type: Number,
        required: true
      },
      post: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        targetUserId: 0
      }
    },
    computed: {
      canDelete () {
        if (!this.$store.state.login) {
          return false
        }
        const currentUserId = this.$store.state.user.id
        return currentUserId === this.post['user_id'] || currentUserId === this.$store.state.post.show.info.post['user_id']
      }
    },
    methods: {
      deletePost () {
        this.$emit('delete')
      }
    }
  }
</script>
