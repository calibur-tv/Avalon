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

      .comments-wrap {
        background-color: #f7f8fa;

        .comments {
          padding: 4px 15px 14px;

          li {
            display: block;
            width: 100%;
          }

          .avatar {
            @include avatar(32px)
          }
        }

        .comment-reply {
          padding: 4px 15px 14px;
        }
      }
    }
  }
</style>

<template>
  <el-row class="post-item">
    <el-col class="user" :span="5">
      <a :href="$alias.user(item.user.zone)" target="_blank">
        <v-img class="avatar" :src="item.user.avatar" :width="80" :height="80"></v-img>
      </a>
      <a class="nickname oneline" :href="$alias.user(item.user.zone)" target="_blank" v-text="item.user.nickname"></a>
    </el-col>
    <el-col class="content" :span="19">
      <div v-for="img in item.images" @click="handleImagePreview(img)">
        <v-img class="image" :src="img" :width="500"></v-img>
      </div>
      <div v-html="item.content"></div>
      <div class="footer">
        <span>{{ index + 1 }}楼</span>
        <v-time v-model="item.created_at"></v-time>
        <button @click="toggleCommentForm(index)"
                v-if="item.comments.length"
        >{{ item.state.collapsed ? `回复(${item.comment_count})` : '收起回复' }}</button>
        <button @click="toggleCommentForm(index, false, 0)" v-else>{{ item.state.openComment ? '收起回复' : '回复' }}</button>
        <div class="comments-wrap">
          <el-collapse-transition>
            <ul v-show="item.comments.length && !item.state.collapsed" class="comments">
              <li v-for="comment in comments" :key="comment.id">
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
                  <button @click="toggleCommentForm(index, false, comment.user_id)"
                          v-if="comment.user_id !== currentUserId"
                  >回复</button>
                </div>
              </li>
            </ul>
          </el-collapse-transition>
          <template v-if="item.comments.length && !item.state.collapsed">
            <button @click="toggleCommentForm(index, false, 0)">我也说一句</button>
            <el-pagination small
                           layout="prev, pager, next"
                           :page-size="take"
                           :total="item.comment_count"
                           v-if="item.comment_count / take > 1"
                           @current-change="getComments"
            ></el-pagination>
          </template>
          <div class="comment-reply" v-if="item.state.openComment">
            <input type="text"
                   placeholder="请缩减至50字以内"
                   :value="item.state.comment"
                   @input="updateCommit($event, index)"
                   autofocus
                   maxlength="50">
            <el-button type="primary"
                       @click="submitCommit(item, index)"
                       :loading="item.state.replying"
                       size="mini"
            >发表</el-button>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'post-item',
    props: {
      index: {
        type: Number,
        required: true
      },
      item: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        take: 10,
        curPage: 1,
        targetUserId: 0
      }
    },
    computed: {
      list () {
        return this.$store.state.post.list
      },
      post () {
        return this.$store.state.post.post
      },
      comments () {
        const begin = (this.curPage - 1) * this.take
        return this.item.comments.slice(begin, begin + this.take)
      },
      currentUserId () {
        return this.$store.state.login ? this.$store.state.user.id : 0
      }
    },
    methods: {
      toggleCommentForm (index, isCollapse = true, targetUserId) {
        if (index) {
          if (isCollapse) {
            this.changeState(index, 'collapsed', !this.list[index].state.collapsed)
          } else {
            this.targetUserId = targetUserId
            this.changeState(index, 'openComment', !this.list[index].state.openComment)
          }
        } else {
          this.$channel.$emit('side-bar-click-post')
        }
      },
      updateCommit (e, index) {
        this.changeState(index, 'comment', e.target.value)
      },
      handleImagePreview (url) {
        this.$emit('image-preview', url)
      },
      async submitCommit (post, index) {
        const content = this.list[index].state.comment
        if (!content) {
          return
        }
        this.changeState(index, 'replying', true)

        try {
          await this.$store.dispatch('post/setComment', {
            index: this.index,
            postId: this.item.id,
            targetUserId: this.targetUserId,
            content,
            ctx: this
          })
          this.changeState(index, 'comment', '')
          this.changeState(index, 'openComment', false)
          this.$toast.success('回复成功')
        } catch (e) {
          console.log(e)
        }
        this.changeState(index, 'replying', false)
      },
      async getComments (page) {
        try {
          await this.$store.dispatch('post/getComments', {
            index: this.index,
            postId: this.item.id,
            page,
            take: this.take
          })
          this.curPage = page
        } catch (e) {
          console.log(e)
          this.$toast.error('网络错误，请稍后再试！')
        }
      },
      changeState (index, key, value) {
        this.$store.commit('post/setState', {
          id: this.post.id,
          index,
          key,
          value
        })
      }
    }
  }
</script>
