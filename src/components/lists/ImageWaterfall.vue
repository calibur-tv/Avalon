<style lang="scss">
  #image-waterfall {
    .header {
      margin-bottom: 15px;

      .select-title {
        color: #5a5e66;
        font-size: 12px;
      }

      .el-select {
        margin-left: 15px;
      }
    }

    .image-container {
      position: relative;
    }

    .image-item {
      width: 212px;
      padding-right: 12px;
      padding-bottom: 12px;
      margin-left: 3px;
      margin-top: 3px;

      .image-wrap {
        font-size: 0;
        position: relative;
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

        .creator {
          font-size: 20px;
          position: absolute;
          left: 5px;
          top: 2px;
          z-index: 1;
          color: #ffcf00;
        }

        .v-select-wrap {
          position: absolute;
          right: 0;
          top: 0;
          width: 58px;
          line-height: 16px;
          font-size: 12px;
          color: #fff;
          z-index: 1;
          margin-top: 7px;
          margin-right: 6px;

          .iconfont {
            text-shadow: 0 1px 10px grey;
          }

          .v-select-options-wrap {
            background-color: #fff;
            border: 1px solid #f0f0f0;
            border-radius: 4px;
            top: 18px;
          }

          .v-select-options-item {
            height: 36px;
            line-height: 35px;
            color: #535353;
            font-size: 12px;
            padding-left: 15px;

            &:not(:last-child) {
              border-bottom: 1px solid #f0f0f0;
            }

            &:hover {
              background-color: $color-gray-normal;
            }
          }
        }
      }

      .image {
        width: 100%;
        height: 100%;
        box-shadow: 0 1px 3px rgba(0,0,0,.2);
        overflow: hidden;

        .desc {
          padding: 0 16px;
          margin: 10px 0;
          height: 32px;

          .tags {
            float: left;

            .el-tag {
              margin-top: 4px;
              margin-right: 7px;
              max-width: 60px;
            }
          }

          .meta {
            font-size: 11px;
            color: $color-gray-deep;
            overflow: hidden;
            text-align: right;
            margin-top: 1px;

            .like {
              margin-right: 1px;
              display: block;
              text-align: right;
              width: 100%;
              color: $color-gray-deep;
              font-size: 13px;
              line-height: 32px;

              &.liked {
                color: $color-pink-normal;
              }
            }

            time {
              margin-top: 3px;
            }
          }
        }

        .detail {
          padding: 10px 16px;
          border-top: 1px solid #F2F2F2;
          background-color: #fafafa;
          font-size: 12px;
          color: #999;
        }

        .bangumi {

          .avatar {
            float: left;
            margin-right: 10px;

            img {
              width: 34px;
              height: 34px;
            }
          }

          .info {
            overflow: hidden;
            line-height: 17px;
          }
        }

        .user {
          .avatar {
            float: left;
            margin-right: 10px;
            overflow: hidden;
            border: 1px solid #F0F0F0;
            @include avatar(34px);
          }

          .info {
            overflow: hidden;
            line-height: 17px;
          }
        }
      }
    }

    .load-more-btn {
      margin-top: 20px;
      width: 100%;
    }
  }
</style>

<template>
  <div id="image-waterfall">
    <div class="header">
      <span class="select-title">图片筛选</span>
      <el-select
        v-model="selectedSizeId"
        size="mini"
        placeholder="尺寸筛选"
        :disabled="loading"
        @change="handleLoadMoreClick(true)"
      >
        <el-option
          v-for="item in selectionSize"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select
        v-model="selectedTagsId"
        size="mini"
        placeholder="标签筛选"
        :disabled="loading"
        @change="handleLoadMoreClick(true)"
      >
        <el-option
          v-for="item in selectionTags"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <no-ssr>
      <waterfall class="image-container" :line-gap="212">
        <waterfall-slot
          v-for="(item, index) in list"
          width="200"
          :height="computeBoxHeight(item)"
          :order="index"
          :key="item.id"
          class="image-item"
        >
          <div class="image">
            <div class="image-wrap" @click="$previewImages(`${item.width}-${item.height}|${item.url}`)">
              <i v-if="item.creator" class="creator iconfont icon-huangguan"></i>
              <div class="menu" @click.stop.prevent>
                <v-select
                  placeholder=""
                  :options="computeOptions(item)"
                  :abort="true"
                  @submit="handleMenuSelected($event, item)"
                >
                  <i class="iconfont icon-101" slot="tail"></i>
                </v-select>
              </div>
              <img width="200" :height="computeImageHeight(item)" :src="$resize(item.url, { width: 200, mode: 2 })">
            </div>
            <div class="desc">
              <div class="tags">
                <button class="el-tag oneline" v-text="item.size.name"></button>
                <button class="el-tag oneline" v-for="tag in item.tags" v-text="tag.name"></button>
              </div>
              <div class="meta">
                <button class="like" :class="{ 'liked': item.liked }" @click="handleLikeBtnClick($event, item)">
                  <i class="iconfont icon-guanzhu"></i>
                  {{ item.like_count || ''  }}
                </button>
              </div>
            </div>
            <div class="detail bangumi clearfix" v-if="item.bangumi">
              <a class="avatar" :href="$alias.bangumi(item.bangumi.id)" target="_blank">
                <img :src="$resize(item.bangumi.avatar, { width: 72 })">
              </a>
              <div class="info">
                <a class="oneline" v-if="item.bangumi_id" :href="$alias.bangumi(item.bangumi.id)" target="_blank" v-text="item.bangumi.name"></a>
                <div v-if="item.role" class="oneline" v-text="item.role.name"></div>
              </div>
            </div>
            <div class="detail user clearfix" v-if="item.user">
              <a class="avatar" :href="$alias.user(item.user.zone)" target="_blank">
                <img :src="$resize(item.user.avatar, { width: 72 })">
              </a>
              <div class="info">
                <a class="oneline" :href="$alias.user(item.user.zone)" target="_blank" v-text="item.user.nickname"></a>
                <div v-if="item.role_id" class="oneline" v-text="item.role.name"></div>
              </div>
            </div>
          </div>
        </waterfall-slot>
      </waterfall>
    </no-ssr>
    <v-modal
      v-model="openEditModal"
      header-text="编辑图片"
      @submit="handleImageEditDone"
    >
      <el-form
        ref="form"
        label-width="60px"
      >
        <el-row>
          <el-col :span="10">
            <el-form-item label="类型">
              <el-select
                v-model="form.tags"
                placeholder="请选择类型"
              >
                <el-option
                  v-for="item in options.tags"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="尺寸">
              <el-select
                v-model="form.size"
                placeholder="请选择尺寸"
              >
                <el-option
                  v-for="item in options.size"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="番剧">
              <el-select
                v-model="form.bangumiId"
                filterable
                clearable
                placeholder="请选择番剧"
                @change="getBangumiRoles"
              >
                <el-option
                  v-for="item in bangumis"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="角色">
              <el-select
                v-model="form.roleId"
                placeholder="请选择角色"
                filterable
                clearable
              >
                <el-option
                  v-for="item in roles"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </v-modal>
    <el-button
      :loading="loading"
      v-if="!noMore"
      class="load-more-btn"
      @click="handleLoadMoreClick(false)"
      type="info"
      plain
    >{{ loading ? '加载中' : '加载更多' }}</el-button>
  </div>
</template>

<script>
  import Api from '~/api/imageApi'
  import vSelect from '~/components/base/Select'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

  export default {
    name: 'ImageWaterfall',
    components: {
      vSelect,
      Waterfall,
      WaterfallSlot
    },
    props: {
      loading: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      waterfall () {
        return this.$store.state.image.waterfall
      },
      list () {
        return this.waterfall.data
      },
      noMore () {
        return this.waterfall.noMore
      },
      options () {
        return this.waterfall.options
      },
      curUserId () {
        return this.$store.state.login
          ? this.$store.state.user.id
          : -1
      },
      slug () {
        return this.$store.state.user.zone
      },
      selectionSize () {
        return this.options.size ? [{
          id: 0,
          name: '全部尺寸'
        }].concat(this.options.size) : []
      },
      selectionTags () {
        return this.options.tags ? [{
          id: 0,
          name: '全部类型'
        }].concat(this.options.tags) : []
      }
    },
    data () {
      return {
        openEditModal: false,
        bangumiRoles: {},
        bangumis: [],
        roles: [],
        loadingUserBangumiFetch: false,
        loadingUploadTypeFetch: false,
        submitting: false,
        form: {
          id: '',
          bangumiId: '',
          size: '',
          tags: '',
          roleId: ''
        },
        origin: {
          bangumiId: '',
          roleId: '',
          size: '',
          tags: ''
        },
        selectedTagsId: 0,
        selectedSizeId: 0
      }
    },
    methods: {
      isMine (userId) {
        return this.curUserId === userId
      },
      computeOptions (image) {
        let result = []
        if (this.isMine(image.user_id)) {
          result = result.concat([
            '删除',
            '编辑'
          ])
        } else {
          result = result.concat([
            '举报'
          ])
        }
        return result
      },
      computeBoxHeight (image) {
        return (image.height / image.width * 200) + 100
      },
      computeImageHeight (image) {
        return image.height / image.width * 200
      },
      computeImageType (image) {
        const tags = image.tags
        this.form.size = image.size.id
        this.origin.size = image.size.id
        this.form.tags = tags.length ? tags[0].id : ''
        this.origin.tags = tags.length ? tags[0].id : ''
      },
      handleLoadMoreClick (reset) {
        if (reset) {
          this.$store.commit('image/SET_WATERFALL_META', {
            size: this.selectedSizeId,
            tags: this.selectedTagsId
          })
        }
        this.$emit('fetch')
      },
      deleteImage ({ userId, id }) {
        if (userId !== this.curUserId) {
          return
        }
        const api = new Api(this)
        api.deleteImage({ id }).then(() => {
          this.$store.commit('image/DELETE_WATERFALL', { id })
        }).catch((err) => {
          this.$toast.error(err)
        })
      },
      editImage (image) {
        this.form.id = image.id
        const bangumiId = image.bangumi_id
        const roleId = image.role_id
        if (bangumiId) {
          this.getUserBangumis()
          this.origin.bangumiId = bangumiId
          this.form.bangumiId = bangumiId
        }
        if (roleId) {
          this.origin.roleId = roleId
          this.form.roleId = roleId
          this.getBangumiRoles(bangumiId)
        }
        this.computeImageType(image)
        this.openEditModal = true
      },
      reportImage (image) {
        this.$prompt('请输入举报原因', '提示', {
          confirmButtonText: '提交',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (value) {
            const api = new Api(this)
            api.trialReport({ id: image.id }).then(() => {
              this.$toast.success('提交成功！')
            })
          }
        }).catch(() => {})
      },
      handleMenuSelected (option, image) {
        if (option === '举报') {
          this.reportImage(image)
        } else if (option === '删除') {
          this.$confirm('删除后不可恢复, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteImage({
              userId: image.user_id,
              id: image.id
            })
          }).catch(() => {})
        } else if (option === '编辑') {
          this.editImage(image)
        }
      },
      async handleLikeBtnClick (e, image) {
        if (!this.$store.state.login) {
          this.$toast.info('继续操作前请先登录')
          this.$channel.$emit('sign-in')
          return
        }
        if (this.isMine(image.user_id)) {
          this.$toast.info('不能为自己的图片点赞')
          return
        }
        const btn = e.currentTarget
        btn.setAttribute('disabled', 'disabled')
        // do like
        const api = new Api(this)
        try {
          const result = await api.toggleLike({ id: image.id })
          if (image.creator && result) {
            this.$store.commit('USE_COIN')
          }
          this.$toast.success('操作成功')
          this.$store.commit('image/LIKE_WATERFALL', {
            id: image.id,
            result
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          btn.removeAttribute('disabled')
        }
      },
      async getUserBangumis () {
        if (this.bangumis.length) {
          return
        }
        if (this.loadingUserBangumiFetch) {
          return
        }
        this.loadingUserBangumiFetch = true
        try {
          this.bangumis = await this.$store.dispatch('users/getFollowBangumis', {
            ctx: this,
            zone: this.slug
          })
        } finally {
          this.loadingUserBangumiFetch = false
        }
      },
      async getBangumiRoles (bangumiId) {
        if (!bangumiId) {
          return
        }
        if (this.bangumiRoles[bangumiId]) {
          this.roles = this.bangumiRoles[bangumiId]
          return
        }
        const data = await this.$store.dispatch('bangumi/getRoles', {
          ctx: this,
          bangumiId: this.form.bangumiId
        })
        this.bangumiRoles[bangumiId] = data
        this.roles = data
      },
      async handleImageEditDone () {
        if (!this.form.size) {
          this.$toast.error('请先选择尺寸')
          return
        }
        if (!this.form.tags) {
          this.$toast.error('请先选择类型')
          return
        }
        if (this.submitting) {
          return
        }
        if (
          this.form.bangumiId === this.origin.bangumiId &&
          this.form.roleId === this.origin.roleId &&
          this.form.size === this.origin.size &&
          this.form.tags === this.origin.tags
        ) {
          this.openEditModal = false
          this.form = {
            id: '',
            bangumiId: '',
            size: '',
            tags: '',
            roleId: ''
          }
          return
        }
        this.submitting = true
        try {
          const api = new Api(this)
          const id = this.form.id
          await api.editImage({
            id,
            bangumiId: this.form.bangumiId || 0,
            roleId: this.form.roleId || 0,
            tags: this.form.tags,
            size: this.form.size
          })
          this.$toast.success('图片编辑成功！')
          if (this.form.bangumiId !== this.origin.bangumiId) {
            this.deleteImage({ userId: this.curUserId, id })
          } else {
            const tags = []
            let size = {}
            let role = null
            this.options.size.forEach(item => {
              if (item.id === this.form.size) {
                size = {
                  id: item.id,
                  name: item.name
                }
              }
            })
            this.options.tags.forEach(item => {
              if (item.id === this.form.tags) {
                tags.push({
                  id: item.id,
                  name: item.name
                })
              }
            })
            if (this.form.roleId) {
              this.bangumiRoles[this.form.bangumiId].forEach(item => {
                if (item.id === this.form.roleId) {
                  role = {
                    id: item.id,
                    name: item.name,
                    avatar: item.avatar
                  }
                }
              })
            }
            this.$store.commit('image/EDIT_WATERFALL', {
              id,
              tags,
              size,
              role_id: this.form.roleId,
              role
            })
          }
          this.openEditModal = false
          this.form = {
            id: '',
            bangumiId: '',
            size: '',
            tags: '',
            roleId: ''
          }
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.submitting = false
        }
      }
    }
  }
</script>
