<style lang="scss">
#image-flow {
  .img {
    background-color: #ec414d;
  }
}
</style>

<template>
  <div id="image-flow">
    <div class="flow-intro">
      <div class="img">图</div>
      <div class="intro">
        <div>
          <div class="control">
            <el-button
              round
              plain
              @click="openCreateImage"
            >
              上传图片
            </el-button>
          </div>
          <div class="summary">
            <h2 class="title">相册</h2>
            <div
              v-if="meta"
              class="extra"
            >共 <strong v-text="meta.collection"/> 个画册&nbsp;·&nbsp;上传了 <strong v-text="meta.total"/> 张图片</div>
            <el-button
              type="text"
              size="mini"
              @click="showTips = !showTips"
            >
              {{ showTips ? '收起' : '查看' }}板块介绍
              <i :class="showTips ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"/>
            </el-button>
          </div>
        </div>
        <el-alert
          v-if="showTips"
          type="info"
          title=""
          class="detail"
        >
          <p>
            「calibur.tv」的相册功能支持你创建自己的相册、或上传精美的单张图片，但是我们只希望你上传与「二次元」相关的图片，非二次元相关话题是不允许的；
          </p>
          <p>
            无论是上传单张图片还是创建相册，你都需要选择一个你要投稿的番剧，这么做虽然限制了你的自由，但是它可以保证社区内图片的质量；
          </p>
          <p>
            如果你要上传的图片的番剧还没有被网站收录，你可以
            <a
              href="javascript:;"
              @click="openFeedback"
            >「点击反馈」</a>
            来告诉我们，如果你上传的图片并不属于某部番剧，而只是一张精美的动漫图片，
            那么你暂时可以将它投稿到
            <a
              :href="$alias.bangumi(834)"
              target="_blank"
            >「次元壁」</a>这个番剧下面；
          </p>
          <p>
            如果你想上传漫画，那么请联系我们然后申请成为吧主，只有吧主才有权限上传漫画；
          </p>
          <p>
            如果你上传的图片是你自己创作的，那么请在上传图片或创建相册时勾选 “原创” 选项，它能够为你带来一些
            <router-link to="/about/hello">「金币」</router-link>
          </p>
        </el-alert>
      </div>
    </div>
    <image-flow-list/>
  </div>
</template>

<script>
import ImageFlowList from "~/components/flow/list/ImageFlowList";

export default {
  name: "ImageWorld",
  async asyncData({ store, ctx }) {
    await Promise.all([
      store.dispatch("world/getData", {
        type: "image",
        sort: "active",
        ctx
      }),
      store.dispatch("world/getMeta", { type: "image" })
    ]);
  },
  components: {
    ImageFlowList
  },
  data() {
    return {
      showTips: false
    };
  },
  computed: {
    meta() {
      return this.$store.state.world.image.meta;
    }
  },
  methods: {
    openFeedback() {
      this.$channel.$emit("open-feedback", {
        type: 3,
        desc: "{?}",
        placeholder: "请填写你遇到的问题"
      });
    },
    openCreateImage() {
      this.$channel.$emit("show-upload-image-modal");
    }
  }
};
</script>
