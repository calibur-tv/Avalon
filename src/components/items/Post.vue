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
      <div v-for="img in item.images" @click="handlePreviewImage(img)">
        <v-img class="image" :src="img" :width="500"></v-img>
      </div>
      <div v-html="item.content"></div>
      <div class="footer">
        <span>{{ index + 1 }}楼</span>
        <v-time v-model="item.created_at"></v-time>
        <button @click="toggleCommentForm(index, true)"
                v-if="item.comments.length"
        >{{ item.state.collapsed ? `回复(${item.comment_count})` : '收起回复' }}</button>
        <button @click="toggleCommentForm(index, false)" v-else>{{ item.state.openComment ? '收起回复' : '回复' }}</button>
        <div class="comments-wrap">
          <el-collapse-transition>
            <ul v-show="item.comments.length && !item.state.collapsed" class="comments">
              <li v-for="comment in item.comments" :key="comment.id">
                <a :href="$alias.user(comment.from_user_zone)" target="_blank">
                  <v-img class="avatar" :src="comment.from_user_avatar" width="32" height="32"></v-img>
                </a>
                <a :href="$alias.user(comment.from_user_zone)" target="_blank" v-text="comment.from_user_name"></a>
                回复
                <a :href="$alias.user(comment.to_user_zone)" target="_blank" v-text="comment.to_user_name"></a>
                ：
                {{ comment.content }}
                <div>
                  <v-time v-model="comment.created_at"></v-time>
                </div>
              </li>
            </ul>
          </el-collapse-transition>
          <template v-if="item.comments.length && !item.state.collapsed">
            <button @click="toggleCommentForm(index, false)">我也说一句</button>
            <el-pagination small
                           layout="prev, pager, next"
                           :total="1000"
                           @current-change="handleCurrentChange"
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
                       @click="submitCommit(item, item.user_id, index)"
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
  import Api from '~/api/postApi'

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
      },
      postId: {
        required: true
      }
    },
    computed: {
      list () {
        return this.$store.state.post.list[this.postId].data
      },
      post () {
        return this.list[0]
      }
    },
    methods: {
      toggleCommentForm (index, haveComment) {
        index
          ? haveComment
          ? this.changeState(index, 'collapsed', !this.list[index].state.collapsed)
          : this.changeState(index, 'openComment', !this.list[index].state.openComment)
          : this.$channel.$emit('side-bar-click-post')
      },
      updateCommit (e, index) {
        this.changeState(index, 'comment', e.target.value)
      },
      async submitCommit (post, target, index) {
        const content = this.list[index].state.comment
        if (!content) {
          return
        }
        this.changeState(index, 'replying', true)

        const api = new Api(this)
        try {
          const data = await api.comment({
            postId: post.id,
            targetUserId: target,
            content
          })
          this.changeState(index, 'comment', '')
          this.changeState(index, 'openComment', false)
          this.$toast.success('回复成功')
          this.$store.commit('post/setComment', {
            data,
            id: this.post.id,
            index
          })
        } catch (e) {
          console.log(e)
        }
        this.changeState(index, 'replying', false)
      },
      handleCurrentChange (val) {
        console.log(val)
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
