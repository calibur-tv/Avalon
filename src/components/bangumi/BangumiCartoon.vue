<style lang="scss">
  #bangumi-cartoon {
    li {
      width: 200px;
      height: 400px;
      float: left;
      box-shadow: 0 1px 3px rgba(0,0,0,.2);
      margin: 3px 9px 15px 3px;
      overflow: hidden;

      .poster-wrap {
        position: relative;
        display: block;

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50px;
          opacity: .3;
          background-color: transparent;
          background-image: linear-gradient(transparent,rgba(0,0,0,.1) 20%,rgba(0,0,0,.2) 35%,rgba(0,0,0,.6) 65%,rgba(0,0,0,.9));
        }

        &:hover {
          &:after {
            opacity: 1;
            height: 100%;
            background: rgba(0,0,0,.5);
            transition: background .2s;
          }
        }

        img {
          width: 100%;
          height: 300px;
          display: block;
        }

        .info {
          position: absolute;
          left: 7px;
          bottom: 4px;
          z-index: 1;
          color: #fff;
          line-height: 20px;

          i {
            font-size: 20px;
            vertical-align: middle;
          }

          .image-count {
            margin-left: 5px;
            font-size: 14px;
            vertical-align: middle;
          }
        }
      }

      .desc {
        padding: 10px 16px;
        height: 52px;

        button {
          float: right;
          width: 50px;
          height: 32px;
          line-height: 32px;
          text-align: right;
          color: $color-gray-deep;
          font-size: 13px;
          margin-right: 1px;

          &.liked {
            color: $color-pink-normal;
          }
        }

        a {
          display: block;
          overflow: hidden;
          line-height: 32px;
        }
      }

      .user {
        display: block;
        width: 100%;
        height: 48px;
        padding: 8px 16px;
        border-top: 1px solid #f2f2f2;
        background-color: #fafafa;

        img {
          border: 1px solid #f0f0f0;
          vertical-align: middle;
          margin-right: 8px;
          float: left;
          @include avatar(32px)
        }

        div {
          overflow: hidden;
          font-size: 12px;
          margin-top: 10px;
          color: #999;
        }
      }
    }
  }
</style>

<template>
  <div id="bangumi-cartoon">
    <ul
      v-if="cartoons.list.length"
      class="clearfix"
    >
      <li
        v-for="item in cartoons.list"
        :key="item.id"
      >
        <a
          :href="$alias.imageAlbum(item.id)"
          class="poster-wrap"
          target="_blank"
        >
          <img :src="$resize(item.url, { width: 400, height: 600 })">
          <div class="info">
            <i class="el-icon-picture-outline"/>
            <span
              class="image-count"
              v-text="item.image_count"
            />
          </div>
        </a>
        <div class="desc">
          <button
            :class="{ 'liked': item.liked }"
            class="like"
            @click="handleLikeCartoon($event, item)"
          >
            <i class="iconfont icon-guanzhu"/>
            {{ item.like_count || '' }}
          </button>
          <a
            :href="$alias.imageAlbum(item.id)"
            class="oneline"
            target="_blank"
            v-text="item.name"
          />
        </div>
        <a
          :href="$alias.user(item.user.zone)"
          class="user"
          target="_blank"
        >
          <img :src="$resize(item.user.avatar, { width: 72 })">
          <div
            class="oneline"
            v-text="item.user.nickname"
          />
        </a>
      </li>
    </ul>
    <no-content v-else-if="cartoons.noMore">
      <el-button
        type="primary"
        round
        @click="openFeedback"
      >求漫画</el-button>
    </no-content>
    <el-button
      v-if="!cartoons.noMore"
      :loading="cartoons.loading"
      class="load-more-btn"
      type="info"
      plain
      @click="getData(false)"
    >{{ cartoons.loading ? '加载中' : '加载更多' }}</el-button>
  </div>
</template>

<script>
  export default {
    name: 'BangumiCartoon',
    data () {
      return {
        state: {
          loading: false,
          fetched: false
        },
      }
    },
    computed: {
      info () {
        return this.$store.state.bangumi.info
      },
      cartoons () {
        return this.$store.state.bangumi.cartoon
      },
    },
    mounted () {
      this.$channel.$on('bangumi-tab-switch-cartoon', () => {
        if (!this.state.fetched) {
          this.getData()
        }
      })
    },
    methods: {
      async getData () {
        if (this.state.loading) {
          return
        }
        this.state.loading = true

        try {
          await this.$store.dispatch('bangumi/getCartoons', {
            ctx: this,
            bangumiId: this.info.id
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.state.loading = false
          this.state.fetched = true
        }
      },
      openFeedback () {
        this.$channel.$emit('open-feedback', {
          type: 7,
          desc: `我想看《${this.info.name}》的漫画第 ? 话`
        })
      },
      handleLikeCartoon (e, image) {
        if (!this.$store.state.login) {
          this.$toast.info('继续操作前请先登录')
          this.$channel.$emit('sign-in')
          return
        }
        if (image.user_id === this.$store.state.user.id) {
          this.$toast.info('不能为自己的图片点赞')
          return
        }
        const btn = e.currentTarget
        if (!image.liked) {
          this.$confirm('原创图片点赞需要金币, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.submitToggleLikeCartoon(btn, image)
          }).catch(() => {})
          return
        }
        this.submitToggleLikeCartoon(btn, image)
      },
      async submitToggleLikeCartoon (btn, image) {
        btn.setAttribute('disabled', 'disabled')
        // do like
        const api = new ImageApi(this)
        try {
          const result = await api.toggleLike({ id: image.id })
          if (image.creator && result) {
            this.$store.commit('USE_COIN')
          }
          this.$toast.success('操作成功')
          this.$store.commit('bangumi/TOGGLE_LIKE_CARTOON', {
            id: image.id,
            result
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          btn.removeAttribute('disabled')
        }
      }
    }
  }
</script>
