<style lang="scss">
#image-show {
  $banner-height: 350px;

  .image-banner {
    .panel {
      position: relative;
      top: 100px;
      left: 0;
      color: #fff;
      min-width: 260px;
      max-width: 500px;
      background-color: rgba(30, 30, 34, 0.8);
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

  nav {
    margin-bottom: 20px;

    .breadcrumb {
      overflow: hidden;
    }

    .edit-area {
      float: right;
    }
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
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
        opacity: 0;
        transition: 0.4s;
        box-shadow: 0 0 1pc 1px rgba(255, 255, 255, 0.2);

        &:hover {
          background-color: rgba(0, 0, 0, 0.6);
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

      .report-btn {
        float: right;
      }
    }

    .v-parts {
      margin-top: 20px;
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
    <v-header
      v-if="info.is_cartoon"
      :banner="source.url"
      height="400px"
      type="mask"
      class="image-banner"
    >
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
    </v-header>
    <v-header v-else/>
    <v-layout>
      <nav>
        <div
          v-if="editable && isMine"
          class="edit-area"
        >
          <el-button
            round
            plain
            type="primary"
            size="mini"
            @click="openEditModal = true"
          >
            编辑
          </el-button>
          <el-button
            round
            plain
            type="danger"
            size="mini"
            @click="handleDeleteAlbum"
          >
            删除
          </el-button>
          <v-dialog
            v-model="openEditModal"
            :title="`编辑${albumType}`"
            :footer="false"
          >
            <edit-album-form
              v-if="info.is_album"
              :bangumi-id="bangumi.id"
              :album-id="info.id"
              :album="info"
            />
            <edit-image-form
              v-else
              :image="info"
            />
          </v-dialog>
        </div>
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
          <a
            v-if="!info.is_album"
            href="javascript:;"
          >图片</a>
          <a
            v-else-if="info.is_cartoon"
            :href="$alias.bangumi(bangumi.id, 'cartoon')"
            target="_blank"
          >漫画</a>
          <a
            v-else
            :href="$alias.bangumi(bangumi.id, 'pins')"
            target="_blank"
          >相册</a>
          {{ info.name }}
        </h1>
      </nav>
      <div class="images-wrap">
        <image-preview
          v-if="info.is_album"
          :images="images"
        >
          <div
            v-for="(img, idx) in images"
            :key="img.id"
            :id="`image-${img.id}`"
            class="image-package"
          >
            <v-img
              :src="img.url"
              :width="img.width"
              :height="img.height"
              :full="true"
              class="image"
            />
            <template v-if="editable">
              <button
                class="sort-btn delete-btn el-icon-close"
                @click="handleImageDelete(idx)"
              />
              <button
                class="sort-btn to-prev el-icon-caret-top"
                @click="handleSortBtnClick(idx, false)"
              />
              <button
                class="sort-btn to-next el-icon-caret-bottom"
                @click="handleSortBtnClick(idx, true)"
              />
            </template>
          </div>
          <p
            v-if="!info.image_count"
            class="no-image"
          >
            还没有上传图片
          </p>
        </image-preview>
        <image-preview
          v-else
          :images="[source]"
        >
          <div class="image-package">
            <v-img
              :src="source.url"
              :width="source.width"
              :height="source.height"
              :full="true"
              class="image"
            />
          </div>
        </image-preview>
      </div>
      <div class="album-footer">
        <div class="publish-time">
          UP：
          <user-card
            :id="user.id"
            :zone="user.zone"
          >
            {{ user.nickname }}
          </user-card>
          &nbsp;·&nbsp;
          <span>
            发布于：<v-time :datetime="info.created_at"/>
          </span>
          <report-dialog
            :id="id"
            type="image"
          >举报</report-dialog>
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
        <social-panel
          :id="info.id"
          :is-creator="info.is_creator"
          :user-id="user.id"
          :liked="info.liked"
          :marked="info.marked"
          :rewarded="info.rewarded"
          :like-users="info.like_users"
          :reward-users="info.reward_users"
          :mark-users="info.mark_users"
          type="image"
        />
      </div>
      <comment-main
        :id="id"
        :master-id="user.id"
        type="image"
      />
      <template slot="aside">
        <h3 class="sub-title">所属番剧</h3>
        <v-bangumi-panel
          :id="bangumi.id"
          :name="bangumi.name"
          :avatar="bangumi.avatar"
          :summary="bangumi.summary"
          :followed="bangumi.followed"
          class="bangumi-panel"
          @follow="handleFollowAction"
        />
      </template>
    </v-layout>
  </div>
</template>

<script>
import Api from '~/api/imageApi'
import vParts from '~/components/lists/Parts'
import CommentMain from '~/components/comments/CommentMain'
import EditAlbumForm from '~/components/image/EditAlbumForm'
import EditImageForm from '~/components/image/EditImageForm'
import SocialPanel from '~/components/common/SocialPanel'
import ImagePreview from '~/components/common/ImagePreview/ImagePreview'

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
        seeReplyId: route.query['comment-id']
      })
    ])
  },
  components: {
    vParts,
    CommentMain,
    EditAlbumForm,
    EditImageForm,
    SocialPanel,
    ImagePreview
  },
  head() {
    return {
      title: `${this.info.name} - ${this.albumType}`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: `calibur,相册,天下漫友是一家,${this.info.name},${
            this.bangumi ? this.bangumi.name : ''
          }`
        }
      ]
    }
  },
  data() {
    return {
      loadingFollowAlbum: false,
      loadingEditImages: false,
      showAllPart: false,
      openEditModal: false
    }
  },
  computed: {
    id() {
      return +this.$route.params.id
    },
    info() {
      return this.$store.state.image.show
    },
    user() {
      return this.info.user
    },
    source() {
      return this.info.source
    },
    images() {
      return this.info.images
    },
    bangumi() {
      return this.info.bangumi
    },
    cartoon() {
      return []
    },
    isMine() {
      return this.$store.state.login
        ? this.user.id === this.$store.state.user.id
        : false
    },
    editable() {
      return this.$store.state.login
        ? this.user.id === this.$store.state.user.id
        : false
    },
    albumType() {
      if (!this.info.is_album) {
        return '图片'
      }
      if (this.info.is_cartoon) {
        return '漫画'
      }
      return '相册'
    }
  },
  methods: {
    handleFollowAction(result) {
      this.$store.commit('image/SHOW_FOLLOW_BANGUMI', { result })
    },
    async handleSortBtnClick(index, toNext) {
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
    handleImageDelete(index) {
      if (this.loadingEditImages) {
        this.$toast.error('正在操作，请稍候...')
        return
      }
      this.$confirm('删除后无法找回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.loadingEditImages = true
          try {
            await this.$store.dispatch('image/deleteAlbumImage', {
              index,
              ctx: this,
              id: this.id
            })
            this.$toast.success('操作成功')
          } catch (e) {
            this.$toast.error(e)
          } finally {
            this.loadingEditImages = false
          }
        })
        .catch(() => {})
    },
    handleDeleteAlbum() {
      this.$prompt(`请输入${this.albumType}的名字`, '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          if (value !== this.info.name) {
            this.$toast.error('名字不对')
            return
          }
          const api = new Api(this)
          api
            .deleteAlbum({
              id: this.info.id
            })
            .then(() => {
              this.$toast.success('操作成功')
              setTimeout(() => {
                window.location.reload()
              }, 1000)
            })
            .catch(err => {
              this.$toast.error(err)
            })
        })
        .catch(() => {})
    }
  }
}
</script>
