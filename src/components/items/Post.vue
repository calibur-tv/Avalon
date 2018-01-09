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
        <div class="image-package" v-for="(img, idx) in post.images" :key="img" @click="previewImages(post.images, idx)">
          <v-img class="image" :src="img" width="500" mode="2"></v-img>
        </div>
        <div class="text-area" v-html="post.content"></div>
      </div>
      <div class="footer">
        <div class="info-bar">
          <button @click="toggleLike">
            {{ post.liked ? '取消赞' : '赞' }}
            <span v-if="post.like_count">
              （{{ post.like_count }}）
            </span>
          </button>
          <button v-if="canDelete" @click="deletePost">删除</button>
          <span>{{ post.floor_count }}楼</span>
          <v-time v-model="post.created_at"></v-time>
        </div>
        <post-comment-list :post-id="post.id"></post-comment-list>
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
      post: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        loadingToggleLike: false
      }
    },
    computed: {
      canDelete () {
        return this.isMine || this.isMaster
      },
      currentUserId () {
        return this.$store.state.login ? this.$store.state.user.id : 0
      },
      isMine () {
        return this.currentUserId === this.post.user.id
      },
      isMaster () {
        return this.currentUserId === this.$store.state.post.show.info.user.id
      }
    },
    methods: {
      deletePost () {
        this.$emit('delete')
      },
      async toggleLike () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.isMine) {
          this.$toast.info('不能给自己点赞')
          return
        }
        if (this.loadingToggleLike) {
          return
        }
        this.loadingToggleLike = true
        try {
          await this.$store.dispatch('post/toggleLike', {
            ctx: this,
            id: this.post.id
          })
        } catch (err) {
          err.message.forEach(tip => {
            this.$toast.error(tip)
          })
        }
        this.loadingToggleLike = false
      }
    }
  }
</script>
