<style lang="scss">
#score-create {
  .bangumi-search,
  .title-input {
    margin-bottom: 20px;
  }

  .is-creator-wrap {
    margin-bottom: 20px;

    .el-switch {
      margin-left: 22px;
    }
  }

  .el-icon-question {
    cursor: pointer;
  }

  .star-row {
    margin-bottom: 20px;
    @extend %clearfix;

    .star-item {
      float: left;
      margin-right: 75px;
      margin-bottom: 15px;

      &:nth-child(5n) {
        margin-right: 0;
      }

      .label {
        font-size: 13px;
        margin-bottom: 3px;
        color: $color-text-normal;
      }
    }
  }

  .el-alert {
    margin-bottom: 20px;
    margin-top: -20px;

    p {
      margin-bottom: 5px;
      font-size: 13px;
      line-height: 18px;
    }
  }
}
</style>

<template>
  <div id="score-create">
    <h3 class="sub-title">番剧</h3>
    <bangumi-search
      v-model="bangumiId"
      :followed="true"
      :disabled="disabled"
      placeholder="选择要评价的番剧"
      class="bangumi-search"
      @search="handleBangumiSearch"
    />
    <h3 class="sub-title">标题</h3>
    <el-input
      v-model.trim="title"
      maxlength="30"
      class="title-input"
      placeholder="给你的文章起个好名字！"
    />
    <div
      v-if="!id"
      class="is-creator-wrap"
    >
      <h3 class="sub-title">原创</h3>
      <el-tooltip
        content="如果这是你的原创作品，请勾选该选项"
        placement="top"
      >
        <el-switch v-model="is_creator"/>
      </el-tooltip>
    </div>
    <h3 class="sub-title">
      评分
      <i
        class="el-icon-question"
        @click="openTips = !openTips"
      />
    </h3>
    <div class="star-row">
      <div
        v-for="(item, index) in columns"
        :key="index"
        class="star-item"
      >
        <div
          class="label"
          v-text="labelMap[item]"
        />
        <el-rate
          v-model="form[item]"
          allow-half
        />
      </div>
    </div>
    <el-alert
      v-if="openTips"
      title=""
      type="info"
    >
      <p>漫评系统简介：</p>
      <p>站长本人只能算是一个中度的动漫爱好者，对历史的动漫评分体系并没有做过深刻的研究，并且文学功底很差，因此实现的这个评分系统并不一定完美，如果你有好的意见可以通过QQ群联系到我向我反馈。</p>
      <p>评分系统由十个维度组成，每个维度最低0分，最高10分，因此总分是100分，然后除以 10 之后，得出在页面展示的「10分制」总分。</p>
      <p>在选取哪十个维度时，并无法做到完全的深思熟虑，因此可能会存在一些不合理的地方，还请大家见谅！</p>
      <p><strong>笑点</strong>：这部作品是否让你开怀大笑了呢？虽然这个维度对「悲剧作品」不怎么友好，但有一部分喜剧它的核心其实源于悲剧。</p>
      <p><strong>泪点</strong>：这部作品让你泪腺崩坏了吗？同样的，虽然这个维度对「喜剧作品」不怎么友好，但也存在一些笑着笑着忽然催人泪下的作品？</p>
      <p><strong>燃点</strong>：这个不需要多余的解释，成为神话吧，少年！</p>
      <p><strong>萌点</strong>：em.....大家现在对萌系的东西都很喜爱，所以就单独拿出来做了一个分类，如果这部作品中有可爱的角色，就给它加分吧！</p>
      <p><strong>音乐</strong>：音乐包括：OP、ED、BGM、声优，是一个综合性的分类。</p>
      <p><strong>画面</strong>：画面包括：静态的人物、建筑、风景的设计与精度，还包括动态的画面连贯性、帧率、特效等。</p>
      <p><strong>情节</strong>：好的作品情节总是跌宕起伏、扑朔里面，基本猜不到下一步会发展成什么样子，并且叙事手法、伏笔运用都非常的精妙。</p>
      <p><strong>人设</strong>：一些动漫角色的存在甚至成为了我们的人生信条、憧憬的方向、美的标准，如是纯粹的恶、超强的头脑、强大的意志力等，是作品的灵魂。</p>
      <p><strong>内涵</strong>：作品所表达的世界观、价值观、人生观等，对人生的思考具有一定的引导价值。</p>
      <p><strong>美感</strong>：有时候画质不是越好就越美，有些美具有一种艺术感，这种美可能是画面上的，可能是叙事的手法，可能是背景音乐。</p>
      <p>最后，一般情况下不存在0分的作品，如果你认为一部作品是0分，那就请放过它吧；也不存在满分的作品，如果你认为一部作品达到了满分，可能是你的阅片量还太少，需要再接再厉，(๑•̀ㅂ•́)و✧！</p>
    </el-alert>
    <h3 class="sub-title">正文</h3>
    <json-editor @submit="beforeSubmit"/>
  </div>
</template>

<script>
import JsonEditor from "~/components/jsonEditor/index";
import Api from "~/api/scoreApi";

export default {
  name: "ScoreCreate",
  async asyncData({ store, route, ctx }) {
    const id = route.params.id;
    if (id) {
      await store.dispatch("editor/getData", {
        api: new Api(ctx),
        id
      });
    }
  },
  components: {
    JsonEditor
  },
  data() {
    const labelMap = {
      lol: "笑点",
      cry: "泪点",
      fight: "燃点",
      moe: "萌点",
      sound: "音乐",
      vision: "画面",
      story: "情节",
      role: "人设",
      express: "内涵",
      style: "美感"
    };
    return {
      openTips: false,
      labelMap,
      columns: Object.keys(labelMap),
      bangumiId: "",
      title: "",
      is_creator: true,
      form: {
        lol: 0,
        cry: 0,
        fight: 0,
        moe: 0,
        sound: 0,
        vision: 0,
        story: 0,
        role: 0,
        express: 0,
        style: 0
      }
    };
  },
  computed: {
    id() {
      return +(this.$route.params.id || 0);
    },
    resource() {
      const result = {};
      Object.keys(this.$store.state.editor.resource).forEach(key => {
        const value = this.$store.state.editor.resource[key];
        result[key] = this.columns.indexOf(key) !== -1 ? +value : value;
      });
      return result;
    },
    disabled() {
      return !!this.id;
    },
    bid() {
      return this.$route.query.bid;
    }
  },
  mounted() {
    if (this.id) {
      this.loadEditContent();
    }
    if (this.bid) {
      this.bangumiId = +this.bid;
      this.handleBangumiSearch(this.bangumiId);
    }
  },
  methods: {
    handleBangumiSearch(bangumiId) {
      if (this.id) {
        return;
      }
      const api = new Api(this);
      api
        .check({
          id: bangumiId
        })
        .then(id => {
          if (id) {
            this.$confirm("你已经给该番剧评过分了，不能重复评分", "提示", {
              confirmButtonText: "查看我的评分",
              cancelButtonText: "换一个番剧",
              type: "warning"
            })
              .then(() => {
                window.location.href = this.$alias.score(id);
              })
              .catch(() => {
                this.bangumiId = "";
              });
          }
        });
    },
    beforeSubmit(richContent) {
      if (!this.bangumiId) {
        this.$toast.error("请先选择要评价的番剧");
        return;
      }
      if (!this.title) {
        this.$toast.error("标题为必填的");
        return;
      }
      if (richContent.publish && richContent.desc.length < 400) {
        this.$toast.error("漫评至少400字");
        return;
      }
      const scores = {};
      let total = 0;
      Object.keys(this.form).forEach(key => {
        const value = this.form[key];
        scores[key] = value * 2;
        total += value;
      });
      if (!total) {
        this.$toast.error("请先选择各维度分值");
        return;
      }
      if (total === 100) {
        this.$toast.error("请认真考虑后再发表");
        return;
      }
      if (richContent.id) {
        this.submit(richContent, scores);
      } else {
        this.$captcha({
          success: ({ data }) => {
            this.submit(richContent, scores, data);
          },
          error: e => {
            this.$toast.error(e);
          }
        });
      }
    },
    async submit(richContent, scores, geetest = {}) {
      if (richContent.auto) {
        this.$channel.$emit("auto-save", true);
      } else {
        this.$channel.$emit("write-submit", true);
      }
      const api = new Api(this);
      try {
        const form = Object.assign({}, scores, {
          title: this.title,
          bangumi_id: this.bangumiId,
          content: richContent.content,
          intro: richContent.desc.substring(0, 120),
          do_publish: richContent.publish,
          is_creator: this.is_creator,
          geetest
        });
        let newId = richContent.id;
        let result;
        if (newId) {
          form.id = newId;
          await api.update(form);
        } else {
          result = await api.create(form);
          newId = result.data;
        }
        if (richContent.publish) {
          this.$confirm(
            typeof result !== "undefined" ? result.message : "发布成功",
            "提示",
            {
              confirmButtonText: "点击查看",
              cancelButtonText: "继续编辑",
              type: "warning"
            }
          )
            .then(() => {
              window.location.href = this.$alias.score(newId);
            })
            .catch(() => {});
        } else {
          if (!richContent.auto) {
            this.$toast.success("保存成功");
          }
          if (!richContent.id) {
            setTimeout(() => {
              window.location = this.$alias.editScore(newId);
            }, 1000);
          }
        }
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.$channel.$emit("write-save-done");
        if (richContent.auto) {
          this.$channel.$emit("auto-save", false);
        } else {
          this.$channel.$emit("write-submit", false);
        }
      }
    },
    loadEditContent() {
      if (!this.resource) {
        this.$toast.error("不能编辑他人的内容");
        setTimeout(() => {
          window.location.href = "/review/create";
        }, 1000);
        return;
      }
      this.bangumiId = +this.resource.bangumi_id;
      this.title = this.resource.title;
      this.is_creator = this.resource.is_creator;
      this.columns.forEach(key => {
        this.form[key] = this.resource[key];
      });
    }
  }
};
</script>
