<style lang="scss">
  #image-show {
    background-color: #edecea;
    $banner-height: 350px;

    #image-banner {
      position: relative;
      width: 100%;
      overflow: hidden;
      z-index: 1;
      height: $banner-height;

      .img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -1;
      }

      .container {
        background-color: transparent;
        margin-bottom: 0;
        height: 100%;
      }

      .panel {
        position: absolute;
        top: 100px;
        left: 0;
        color: #fff;
        min-width: 260px;
        max-width: 500px;
        background-color: rgba(30,30,34,.8);
        padding: 20px;

        h1 {
          font-size: 32px;
          font-weight: 300;
          line-height: 48px;
        }

        p {
          margin-top: 5px;
          line-height: 20px;
        }
      }

      .follow {
        position: absolute;
        right: 20%;
        top: 50%;
        transform: translateY(-50%);
      }

      .v-share {
        position: absolute;
        right: 40px;
        bottom: 10px;
      }
    }

    .container {
      background-color: #fff;
      padding: 30px 27px;
    }

    @media (min-width: 1050px) {
      .container {
        width: 936px;
        margin-bottom: 100px;
      }
    }

    nav {
      border: 1px solid #d8d8d8;
      padding: 30px 20px 0;
      margin-bottom: 20px;
    }

    .images-wrap {
      margin-bottom: 20px;

      .image-package {
        position: relative;

        .sort-btn {
          position: absolute;
          right: 20px;
          width: 50px;
          height: 50px;
          font-size: 30px;
          text-align: center;
          line-height: 50px;
          background-color: rgba(0, 0, 0, .3);
          color: #fff;
          opacity: 0;
          transition: .4s;
          box-shadow: 0 0 1pc 1px rgba(255, 255, 255, 0.2);

          &:hover {
            background-color: rgba(0, 0, 0, .6);
          }
        }

        .delete-btn {
          left: 20px;
          top: 20px;
          right: auto;
        }

        .to-prev {
          top: 20px;
        }

        .to-next {
          bottom: 20px;
        }

        &:hover {
          .sort-btn {
            opacity: 1;
          }
        }
      }
    }

    .album-footer {
      min-height: 260px;
      position: relative;

      .publish-time {
        font-size: 14px;
        color: #8590a6;
      }

      .v-parts {
        margin-top: 20px;
      }

      .like-panel {
        text-align: center;
        margin-bottom: 20px;
        margin-top: 50px;
      }

      .bangumi-panel {
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .no-image {
      text-align: center;
      margin-top: 30px;
      margin-bottom: 20px;
      color: $color-text-normal;
      font-size: 13px;
    }
  }
</style>

<template>
  <div
    v-if="info"
    id="image-show"
  >
    <section
      v-if="info.is_album"
      id="image-banner"
    >
      <div
        :style="{ backgroundImage: `url(${$resize(source.url, { width: 1920, mode: 0 })})` }"
        class="img bg"
      />
      <div class="container">
        <div class="panel">
          <h1 class="title">《{{ info.name }}》</h1>
          <p class="author">
            UP：
            <a
              :href="$alias.user(user.zone)"
              target="_blank"
              v-text="user.nickname"
            />
            &nbsp;·&nbsp;
            共：{{ info.image_count }}张
          </p>
        </div>
      </div>
      <v-share type="panel"/>
    </section>
    <v-banner v-else/>
    <div class="container">
      <nav>
        <h1 class="breadcrumb">
          <a
            href="/"
            target="_blank"
          >主站</a>
          <a
            v-if="bangumi"
            :href="$alias.bangumi(bangumi.id)"
            target="_blank"
            v-text="bangumi.name"
          />
          <a href="javascript:;">{{ info.is_cartoon ? '漫画' : '相册' }}</a>
          {{ info.name }}
        </h1>
      </nav>
      <div class="images-wrap">
        <template v-if="info.is_album">
          <div
            v-for="(img, idx) in info.images"
            :key="img.id"
            class="image-package"
          >
            <v-img
              :src="img.url"
              :aspect="$computeImageAspect(img)"
              class="image"
              width="500"
              mode="2"
            />
            <template v-if="isMine">
              <el-tooltip
                placement="top"
                effect="dark"
                content="删除"
              >
                <button
                  class="sort-btn delete-btn el-icon-close"
                  @click="handleImageDelete(idx)"
                />
              </el-tooltip>
              <el-tooltip
                placement="right"
                effect="dark"
                content="上移"
              >
                <button
                  v-if="idx"
                  class="sort-btn to-prev el-icon-caret-top"
                  @click="handleSortBtnClick(idx, false)"
                />
              </el-tooltip>
              <el-tooltip
                placement="right"
                effect="dark"
                content="下移"
              >
                <button
                  v-if="idx !== info.images.length - 1"
                  class="sort-btn to-next el-icon-caret-bottom"
                  @click="handleSortBtnClick(idx, true)"
                />
              </el-tooltip>
            </template>
          </div>
        </template>
        <div
          v-else
          class="image-package"
        >
          <v-img
            :src="source.url"
            :aspect="$computeImageAspect(source)"
            class="image"
            width="500"
            mode="2"
          />
        </div>
      </div>
      <div
        v-if="info.image_count"
        class="album-footer"
      >
        <div class="publish-time">
          UP：
          <a
            :href="$alias.user(user.zone)"
            target="_blank"
            v-text="user.nickname"
          />
          &nbsp;·&nbsp;
          <span>
            发布于：<v-time v-model="info.created_at"/>
          </span>
        </div>
        <v-parts
          v-if="info.is_cartoon"
          :list="info.parts"
          :alias="$alias.image"
          :all-data="info.parts"
          v-model="showAllPart"
        >
          <span slot-scope="{ item }">
            {{ item.part }}：{{ item.name }}
          </span>
        </v-parts>
        <v-bangumi-panel
          v-else-if="bangumi"
          :id="bangumi.id"
          :name="bangumi.name"
          :avatar="bangumi.avatar"
          :summary="bangumi.summary"
          :followed="bangumi.followed"
          class="bangumi-panel"
          @follow="handleFollowAction"
        />
        <div class="like-panel">
          <el-button
            v-if="info.liked"
            :type="info.is_creator ? 'warning' : 'danger'"
            :loading="loadingFollowAlbum"
            round
            plain
            @click="handleAlbumLike"
          >
            <i class="iconfont icon-guanzhu"/>
            {{ likeAlbumBtnText }}
          </el-button>
          <el-button
            v-else
            :type="info.is_creator ? 'warning' : 'danger'"
            :loading="loadingFollowAlbum"
            round
            @click="handleAlbumLike"
          >
            <i class="iconfont icon-guanzhu"/>
            {{ likeAlbumBtnText }}
          </el-button>
        </div>
      </div>
      <p
        v-else
        class="no-image"
      >
        还没有上传图片
      </p>
      <comment-main
        v-if="info.image_count"
        :id="id"
        :master-id="user.id"
        type="image"
      />
    </div>
  </div>
</template>

<script>
  import Api from '~/api/imageApi'
  import vParts from '~/components/lists/Parts'
  import CommentMain from '~/components/comments/CommentMain'

  export default {
    name: 'ImageShow',
    async asyncData({ store, route, ctx }) {
      const id = route.params.id
      await Promise.all([
        store.dispatch('image/show', { ctx, id }),
        store.dispatch('comment/getMainComments', {
          ctx,
          id,
          type: 'image',
          seeReplyId: route.query.reply
        })
      ])
    },
    components: {
      vParts,
      CommentMain
    },
    data () {
      return {
        loadingFollowAlbum: false,
        loadingEditImages: false,
        showAllPart: false
      }
    },
    computed: {
      id () {
        return this.$route.params.id
      },
      info () {
        return this.$store.state.image.show
      },
      user () {
        return this.info.user
      },
      source () {
        return this.info.source
      },
      bangumi () {
        return this.info.bangumi
      },
      cartoon () {
        return []
      },
      likeAlbumBtnText () {
        const text = this.info.is_creator
          ? this.info.liked ? '已赞赏' : '赞赏'
          : this.info.liked ? '已喜欢' : '喜欢'

        return this.info.like_count ? `${text}(${this.info.like_count})` : text
      },
      isMine () {
        return this.$store.state.login
          ? this.user.id === this.$store.state.user.id
          : false
      }
    },
    methods: {
      handleFollowAction (result) {
        this.$store.commit('image/SHOW_FOLLOW_BANGUMI', { result })
      },
      async handleAlbumLike () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.isMine) {
          this.$toast.info('不能为自己的相册点赞')
          return
        }
        if (this.loadingFollowAlbum) {
          return
        }
        this.loadingFollowAlbum = true
        if (this.info.is_creator && !this.info.liked) {
          this.$confirm('原创相册点赞需要金币, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.submitLikeRequest()
          }).catch(() => {})
          return
        }
        this.submitLikeRequest()
      },
      async submitLikeRequest () {
        const api = new Api(this)
        try {
          const result = await api.toggleLike({
            id: this.id
          })
          this.$store.commit('image/SHOW_TOGGLE_LIKE', { result })
          this.$toast.success('操作成功')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingFollowAlbum = false
        }
      },
      async handleSortBtnClick (index, toNext) {
        if (this.loadingEditImages) {
          this.$toast.error('正在操作，请稍候...')
          return
        }
        this.loadingEditImages = true
        try {
          await this.$store.dispatch('image/sortAlbumImage', {
            prev: toNext ? index : index - 1,
            next: toNext ? index + 1 : index,
            ctx: this,
            id: this.id
          })
          this.$toast.success('操作成功')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingEditImages = false
        }
      },
      handleImageDelete (index) {
        if (this.loadingEditImages) {
          this.$toast.error('正在操作，请稍候...')
          return
        }
        this.$confirm('删除后无法找回, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.loadingEditImages = true
          try {
            await this.$store.dispatch('image/deleteAlbumImage', {
              index,
              ctx: this,
              id: this.id
            })
          } catch (e) {
            this.$toast.error(e)
          } finally {
            this.loadingEditImages = false
          }
        }).catch((e) => {})
      }
    }
  }
</script>
