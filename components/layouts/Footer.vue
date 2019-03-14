<style lang="scss">
#footer {
  width: 100%;
  padding: 40px 0;
  margin-top: 40px;
  position: relative;
  z-index: 0;
  background-color: $color-gray-light;

  .cards {
    .card-item {
      display: block;
      min-height: 100px;
      font-size: 12px;
      line-height: 1;
      padding-right: 15px;
      float: left;

      &:not(:first-child) {
        border-left: solid 1px $color-gray-normal;
        padding-left: 14px;
      }

      p {
        margin-bottom: 12px;
        font-size: 14px;
        color: $color-text-normal;
      }

      a,
      span {
        margin-bottom: 12px;
        margin-right: 8px;
        transition: 0.4s;
        color: $color-text-light;
      }

      a {
        &:hover {
          color: $color-blue-normal;
        }
      }

      div {
        margin-top: 10px;
      }

      .icon {
        width: 16px;
        vertical-align: sub;
      }
    }
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

      .fen-think-btn {
        float: right;
        margin-left: 10px;
      }
    }
  }
}
</style>

<template>
  <footer v-show="show" id="footer">
    <div class="container">
      <ul class="cards">
        <li class="card-item">
          <p>calibur - 天下漫友是一家</p>
          <a href="/about/hello" target="_blank">欢迎</a>
          <a href="/app/notice/1" target="_blank">团子简介</a>
          <a href="javascript:;" @click="openShareModal">分享网站</a>
          <a href="/about/thanks" target="_blank">品牌与站娘</a>
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
                站内海量动漫资源在线播放，更有看漫画、cosplay、发帖、为偶像应援等功能，每天签到送团子！
              </p>
              <p :class="$style.p">
                快来加入我们吧~\(^o^)/~ 网址：http://calibur.tv
              </p>
            </div>
            <div slot="footer" :class="$style.footer">
              <el-button
                v-clipboard="
                  `【calibur.tv】一个纯粹的二次元社区网站，致力于实现'天下漫友是一家'！站内海量动漫资源在线播放，更有看漫画、cosplay、发帖、为偶像应援等功能，每天签到送团子（1团子 = 1人民币）！快来加入我们吧~\(^o^)/~ 网址：http://calibur.tv`
                "
                :class="$style.fenThinkBtn"
                type="primary"
                size="small"
                @success="handleCopySuccess"
              >
                点击复制
              </el-button>
            </div>
          </v-dialog>
          <div>
            <a href="javascript:;">
              <img
                :src="
                  $resize('https://image.calibur.tv/owner/beianbgs.png', {
                    width: 40
                  })
                "
                class="icon"
              >
              沪ICP备17050785号-1
            </a>
          </div>
          <div>
            <a href="http://www.shjbzx.cn/" target="_blank">
              <img
                :src="
                  $resize('https://image.calibur.tv/owner/int-info.png', {
                    width: 40
                  })
                "
                class="icon"
              >
              上海互联网举报中心
            </a>
          </div>
        </li>
        <li class="card-item">
          <p>友情链接</p>
          <a
            v-for="(item, index) in friends"
            :key="index"
            :href="item.link"
            target="_blank"
            v-text="item.name"
          />
        </li>
        <li class="card-item">
          <p>免责声明</p>
          <div>
            <span>本网站不提供任何视频点播和漫画阅览服务</span>
          </div>
          <div>
            <span>网站内容都是由用户自行发布编辑，与本网站无关</span>
          </div>
          <div>
            <span>如果您的合法权益被侵犯，请联系我们</span>
          </div>
          <div>
            <span>举报邮箱：<a href="mailto:414927352@qq.com">414927352@qq.com</a></span>
          </div>
        </li>
        <li class="card-item">
          <a
            href="https://www.calibur.tv/user/yu-yuan-lin-yin-7/bangumi"
            target="_blank"
            style="margin:0"
          >
            <v-img
              src="https://image.calibur.tv/owner/logo/animate.gif"
              width="250"
              height="100"
            />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'VFooter',
  data() {
    return {
      toggleShareModal: false
    }
  },
  computed: {
    show() {
      return ['index', 'about-invite-id'].indexOf(this.$route.name) === -1
    },
    friends() {
      return this.$store.state.pageData
        ? this.$store.state.pageData.friend_links
        : []
    }
  },
  methods: {
    openShareModal() {
      this.toggleShareModal = true
    },
    handleCopySuccess() {
      this.$toast.success('复制成功')
      this.toggleShareModal = false
    }
  }
}
</script>
