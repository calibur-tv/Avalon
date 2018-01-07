<style lang="scss">
  .post-item {

    .user {
      .avatar {
        display: block;
        margin: 20px auto 5px auto;
        @include avatar(80px)
      }

      .nickname {
        display: block;
        background: #fff;
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
      padding: 22px 0 14px;
      border-top: 1px solid #e5e9ef;

      .main {
        min-height: 80px;
      }

      .image {
        width: 100%;
        height: auto;
        margin-bottom: 12px;
        cursor: zoom-in;
      }

      .text-area {
        line-height: 24px;
        padding: 2px 0;
        font-size: 14px;
        overflow: hidden;
        word-wrap: break-word;
      }

      .footer {
        color: #99a2aa;
        line-height: 26px;
        font-size: 12px;

        .info-bar {
          height: 30px;
          line-height: 30px;

          button, span {
            margin-right: 20px;
          }
        }
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
      <div class="main">
        <v-img v-for="(img, idx) in post.images"
               class="image"
               :src="img"
               width="500"
               mode="2"
               @click="handleImagePreview(post.images, idx)"
        ></v-img>
        <div class="text-area" v-html="post.content"></div>
      </div>
      <div class="footer">
        <div class="info-bar">
          <button v-if="canDelete" @click="deletePost">删除</button>
          <span>{{ index + 2 }}楼</span>
          <v-time v-model="post.created_at"></v-time>
        </div>
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
