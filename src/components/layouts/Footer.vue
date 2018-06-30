<style lang="scss">
  #footer {
    width: 100%;
    margin: 30px 0;
    text-align: center;
    position: relative;
    z-index: 2;

    .hr {
      margin: 0 50px;
      font-size: 14px;
    }

    .links {
      margin-top: 10px;
      color: #7f9eb2;
      font-size: 13px;
    }
  }
</style>

<style lang="scss" module>
  .share-tips-modal {
    text-align: left;

    .tips {

      .p {
        margin: 25px 10px 0 10px;
      }

      .footer {
        padding: 20px;

        .copy-share-btn {
          float: right;
          margin-left: 10px;
        }
      }
    }
  }
</style>

<template>
  <footer
    v-if="show"
    id="footer"
  >
    <v-hr text="calibur - 天下漫友是一家"/>
    <div class="links">
      <a
        href="/about/hello"
        target="_blank"
      >功能简介</a>
      &nbsp;·&nbsp;
      <a
        href="javascript:;"
        @click="openShareModal"
      >分享网站</a>
      <v-dialog
        v-model="toggleShareModal"
        :custom-class="$style.shareTipsModal"
        title="感谢分享"
      >
        <div :class="$style.tips">
          <p :class="$style.p">
            【calibur.tv】一个纯粹的二次元社区网站，致力于实现"天下漫友是一家"！
          </p>
          <p :class="$style.p">
            站内海量动漫资源在线播放，更有看漫画、cosplay、发帖、为偶像应援等功能，每天签到送金币（1金币 = 1人民币）！
          </p>
          <p :class="$style.p">
            快来加入我们吧~\(^o^)/~ 网址：http://calibur.tv
          </p>
        </div>
        <div
          slot="footer"
          :class="$style.footer"
        >
          <el-button
            ref="shareBtn"
            :class="$style.copyShareBtn"
            type="primary"
            size="small"
            data-clipboard-text="【calibur.tv】一个纯粹的二次元社区网站，致力于实现'天下漫友是一家'！站内海量动漫资源在线播放，更有看漫画、cosplay、发帖、为偶像应援等功能，每天签到送金币（1金币 = 1人民币）！快来加入我们吧~\(^o^)/~ 网址：http://calibur.tv"
          >点击复制</el-button>
        </div>
      </v-dialog>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'VFooter',
    data () {
      return {
        toggleShareModal: false
      }
    },
    computed: {
      show () {
        return this.$route.name !== 'homepage'
      }
    },
    methods: {
      openShareModal () {
        this.toggleShareModal = true
        this.$nextTick(() => {
          const clipboard = new this.$copy(this.$refs.shareBtn.$el)

          clipboard.on('success', e => {
            this.$toast.success('复制成功')
            this.toggleShareModal = false
            clipboard.destroy()
            e.clearSelection()
          })
        })
      }
    }
  }
</script>
