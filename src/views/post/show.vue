<style lang="scss">
  #post-show {
    .title-wrap {
      height: 56px;
      border-bottom: 1px solid #BBBDBF;

      h1 {
        font-weight: 400;
        font-size: 16px;
        margin-left: 20px;
        line-height: 55px;
      }
    }

    .post-item {
      .wrap {
        background-color: RGB(251, 251, 253);
        border-left: 1px solid #E5E5E5;
        border-right: 1px solid #E5E5E5;
        border-bottom: 1px solid #E1E4E6;
      }

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

    .image-preview-modal .v-modal {
      max-height: 80%;
      max-width: 90%;
    }
  }
</style>

<template>
  <div id="post-show">
    <v-banner></v-banner>
    <div class="container">
      <section class="col-main">
        <header>
          <a :href="$alias.bangumi(bangumi.id)" target="_blank">
            <v-img :src="bangumi.avatar" :width="48" :height="48"></v-img>
          </a>
          <a :href="$alias.bangumi(bangumi.id)" target="_blank">《{{ bangumi.name }}》</a>
          <div class="title-wrap">
            <h1 v-text="post.title"></h1>
          </div>
        </header>
        <main>
          <div class="post-item" v-for="(item, index) in list">
            <el-row class="wrap">
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
                  <button @click="toggleCommitForm(index)">{{ item.state.openCommit ? '收起回复' : '回复' }}</button>
                  <div class="comments-wrap">
                    <ul v-if="item.comments.length" class="comments">
                      <li v-for="comment in item.comments">
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
                    <div class="comment-reply" v-if="item.state.openCommit">
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
          </div>
          <v-modal class="image-preview-modal" v-model="showPreviewImage" :footer="false" :header="false">
            <img width="100%" :src="previewImage" alt="">
          </v-modal>
        </main>
        <footer>
          <div id="post-reply-form">
            <v-post :post-id="id"
                    :last-id="lastId"
                    :bangumi-id="post.bangumi_id"
                    :master-id="masterId"
                    id="test"
            ></v-post>
          </div>
        </footer>
      </section>
      <aside class="col-aside"></aside>
    </div>
  </div>
</template>

<script>
  import vPost from '~/components/creates/Post'
  import Api from '~/api/postApi'

  const defaultParams = {
    take: 15,
    page: 1
  }

  export default {
    name: 'post-show',
    async asyncData ({ route, store, ctx }) {
      await store.dispatch('post/getPost', {
        id: route.params.id,
        ctx,
        take: defaultParams.take,
        page: defaultParams.page
      })
    },
    components: {
      vPost
    },
    head () {
      return {
        title: `${this.post.title} - 帖子`
      }
    },
    computed: {
      id () {
        return this.$route.params.id
      },
      list () {
        return this.$store.state.post.list[this.id].data
      },
      bangumi () {
        return this.$store.state.post.list[this.id].bangumi
      },
      noMore () {
        return this.$store.state.post.list[this.id].noMore
      },
      post () {
        return this.list[0]
      },
      masterId () {
        return this.post.user_id
      },
      lastId () {
        return this.list[this.list.length - 1].id
      }
    },
    data () {
      return {
        showPreviewImage: false,
        previewImage: ''
      }
    },
    methods: {
      handlePreviewImage (img) {
        this.previewImage = img
        this.showPreviewImage = true
      },
      scrollToReplyForm () {
        this.$scrollToY(document.getElementById('post-reply-form').offsetTop, 400)
      },
      toggleCommitForm (index) {
        index
          ? this.changeState(index, 'openCommit', !this.list[index].state.openCommit)
          : this.$channel.$emit('side-bar-click-post')
      },
      changeState (index, key, value) {
        this.$store.commit('post/setState', {
          id: this.post.id,
          index,
          key,
          value
        })
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
          this.changeState(index, 'openCommit', false)
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
      }
    },
    mounted () {
      this.$channel.$on('side-bar-click-post', this.scrollToReplyForm)
    }
  }
</script>
