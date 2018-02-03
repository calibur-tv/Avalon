<style lang="scss">
  #post-trending {
    #posts {
      li {
        float: none;
        padding: 10px 10px 10px 65px;
        position: relative;

        &:not(:last-child) {
          border-bottom: 1px dotted #e4e6eb;
        }

        .header {
          position: relative;
          height: 32px;

          .avatar {
            display: block;
            float: left;
            margin-right: 10px;
            margin-top: 4px;
            position: relative;
            z-index: 1;

            img {
              display: block;
              width: 24px;
              height: 24px;
            }
          }

          .title {
            font-size: 14px;
            line-height: 32px;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            padding-left: 34px;
            padding-right: 200px;
            z-index: 0;
          }

          .time {
            float: right;
            display: block;
            line-height: 32px;
            color: #999;
            font-size: 12px;
            position: relative;
            z-index: 1;
          }
        }

        .content {
          margin-top: 3px;
          color: #666;
          font-size: 12px;
          line-height: 22px;

          a {
            font-size: 12px;
            line-height: 22px;
            color: #262626;
            font-weight: 600;
          }
        }

        .images {
          height: 90px;
          overflow: hidden;
          margin-top: 10px;
          margin-bottom: 15px;

          .image-box {
            margin-right: 10px;
            height: 100%;
            position: relative;
            float: left;
            cursor: zoom-in;

            &:after {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: #fff;
              opacity: 0;
            }

            &:hover {
              &:after {
                opacity: 0.1;
              }
            }

            img {
              height: 100%;
              width: auto;
            }
          }
        }

        .counter {
          position: absolute;
          left: 0;
          top: 12px;
          width: 50px;
          height: 30px;
          line-height: 26px;
          font-size: 12px;
          text-align: center;
          background-color: RGB(247, 247, 247);
          display: block;
          border: 1px solid #e4e6eb;
          border-radius: 3px;
        }

        .footer {
          text-align: right;
          font-size: 13px;
          color: $color-text-light;

          span {
            margin-left: 5px;
            line-height: 20px;
            font-size: 13px;
          }

          i {
            line-height: 20px;
            font-size: 13px;
          }
        }
      }
    }

    #load-post-btn {
      margin-top: 20px;
      width: 100%;
    }
  }
</style>

<template>
  <div id="post-trending">
    <v-banner></v-banner>
    <div class="container">
      <div class="col-main">
        <div class="breadcrumb-links">
          <router-link :to="$alias.postTrending('new')">最新</router-link>
          <router-link :to="$alias.postTrending('hot')">最热</router-link>
        </div>
        <ul id="posts">
          <li v-for="item in post.data" :key="item.id">
            <div class="header clearfix">
              <el-tooltip effect="dark" :content="item.bangumi.name" placement="top">
                <a class="avatar" :href="$alias.bangumi(item.bangumi.id)" target="_blank">
                  <v-img :src="item.bangumi.avatar" width="32" height="32"></v-img>
                </a>
              </el-tooltip>
              <a class="title oneline href-fade-blue" target="_blank" :href="$alias.post(item.id)" v-text="item.title"></a>
              <el-tooltip effect="dark" :content="`发表于：${item.created_at}`" placement="top" v-if="item.updated_at !== item.created_at">
                <span class="time">
                  最后回复于: <v-time v-model="item.updated_at"></v-time>
                </span>
              </el-tooltip>
              <span class="time" v-else>
                发表于: <v-time v-model="item.updated_at"></v-time>
              </span>
            </div>
            <p class="content twoline">
              <a :href="$alias.user(item.user.zone)">{{ item.user.nickname }}</a>
              :
              {{ item.desc }}
            </p>
            <div class="images clearfix" v-if="item.images.length">
              <div class="image-box"
                   :key="image"
                   v-for="(image, index) in item.images"
                   @click="previewImages(item.images, index)">
                <v-img :src="image" height="90" mode="2"></v-img>
              </div>
            </div>
            <span class="counter" v-text="item.comment_count"></span>
            <div class="footer">
              <span v-if="item.view_count">
                <i class="iconfont icon-ai-eye"></i>
                {{ item.view_count }}
              </span>
              <span v-if="item.mark_count">
                <i class="iconfont icon-buoumaotubiao44"></i>
                {{ item.mark_count }}
              </span>
              <span v-if="item.like_count">
                <i class="iconfont icon-guanzhu"></i>
                {{ item.like_count }}
              </span>
            </div>
          </li>
        </ul>
        <el-button :loading="loading"
                   v-if="!post.noMore"
                   id="load-post-btn"
                   @click="loadMore"
                   type="info"
                   plain
        >{{ loading ? '加载中' : '加载更多' }}</el-button>
        <no-content v-if="post.noMore && !post.data.length"></no-content>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PostNews',
    async asyncData ({ store, route }) {
      await store.dispatch('post/getTrending', {
        sort: route.params.sort
      })
    },
    computed: {
      sort () {
        return this.$route.params.sort
      },
      post () {
        return this.$store.state.post.trending[this.sort]
      }
    },
    data () {
      return {
        loading: false
      }
    },
    watch: {
      '$route' () {
        this.loadMore()
      }
    },
    methods: {
      async loadMore () {
        if (this.loading) {
          return
        }
        this.loading = true

        await this.$store.dispatch('post/getTrending', {
          sort: this.sort
        })
        this.loading = false
      }
    }
  }
</script>
