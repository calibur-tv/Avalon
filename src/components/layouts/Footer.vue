<style lang="scss">
  #footer {
    width: 100%;
    z-index: 0;
    margin: 30px 0;
    text-align: center;

    .hr {
      margin: 0 50px;
      font-size: 14px;
    }

    .links {
      margin-top: 10px;
      color: #7f9eb2;
      font-size: 13px;
    }

    .share-tips-modal {
      text-align: left;

      .tips {
        margin-bottom: 50px;

        p {
          margin: 25px 10px 0 10px;
        }
      }
    }
  }
</style>

<template>
  <footer id="footer" v-if="show">
    <v-hr text="calibur - 天下漫友是一家"></v-hr>
    <div class="links">
      <a href="/about/hello" target="_blank">功能简介</a>
      &nbsp;·&nbsp;
      <a href="javascript:;" @click="openShareModal = true">帮助推广</a>
      <v-modal
        v-model="openShareModal"
        class="share-tips-modal"
        header-text="感谢推广"
        submit-text="点击复制"
        :footer="false"
      >
        <div class="tips">
          <p>
            【calibur.tv】一个纯粹的二次元社区网站，致力于实现"天下漫友是一家"！
          </p>
          <p>
            站内海量动漫资源在线播放，更有看漫画、cosplay、发帖、为偶像应援等功能，每天签到送金币（1金币 = 1人民币）！
          </p>
          <p>
            快来加入我们吧~\(^o^)/~ 网址：http://calibur.tv
          </p>
        </div>
      </v-modal>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'v-footer',
    computed: {
      show () {
        return this.$route.name !== 'homepage'
      }
    },
    data () {
      return {
        openShareModal: false
      }
    }
  }
</script>
