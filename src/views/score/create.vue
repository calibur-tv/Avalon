<style lang="scss">
  #score-create {
    .bangumi-search {
      margin-bottom: 20px;
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
  }
</style>

<template>
  <div id="score-create">
    <h3 class="sub-title">选择番剧</h3>
    <bangumi-search
      v-model="bangumiId"
      placeholder="选择要评价的番剧"
      class="bangumi-search"
      @search="handleBangumiSearch"
    />
    <h3 class="sub-title">各项分值</h3>
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
    <h3 class="sub-title">写下心得</h3>
    <json-editor @submit="beforeSubmit"/>
  </div>
</template>

<script>
  import JsonEditor from '~/components/jsonEditor/index'
  import Api from '~/api/scoreApi'

  export default {
    name: 'ScoreCreate',
    components: {
      JsonEditor
    },
    data () {
      const labelMap = {
        lol: '笑点',
        cry: '泪点',
        fight: '燃点',
        moe: '萌点',
        sound: '音乐',
        vision: '画面',
        story: '情节',
        role: '人物',
        express: '内涵',
        style: '风格'
      };
      return {
        labelMap,
        columns: Object.keys(labelMap),
        bangumiId: '',
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
        },
      }
    },
    methods: {
      beforeSubmit (richContent) {
        if (!this.bangumiId) {
          this.$toast.error('请先选择要评价的番剧');
          return;
        }
        const scores = {};
        let total = 0;
        Object.keys(this.form).forEach(key => {
          const value = this.form[key];
          scores[key] = value * 2;
          total += value
        });
        if (!total) {
          this.$toast.error('请不要恶意发表漫评');
          return
        }
        if (total === 100) {
          this.$toast.error('请认真考虑后再发表');
          return
        }
        if (richContent.id) {
          this.submit(richContent, scores)
        } else {
          this.$captcha({
            success: ({ data }) => {
              this.submit(richContent, scores, data)
            },
            error: (e) => {
              this.$toast.error(e)
            }
          });
        }
      },
      async submit (richContent, scores, geetest = {}) {
        this.$channel.$emit('write-submit', true);
        const api = new Api(this);
        try {
          const form = Object.assign({}, scores, {
            bangumi_id: this.bangumiId,
            content: richContent.content,
            intro: richContent.desc.substring(0, 120),
            do_publish: richContent.publish,
            geetest
          });
          let newId = richContent.id;
          if (newId) {
            form.id = newId;
            await api.update(form)
          } else {
            newId = await api.create(form)
          }
          this.$toast.success('操作成功');
          setTimeout(() => {
            window.location = this.$alias.score(newId);
          }, 1000);
        } catch (e) {
          this.$toast.error(e);
        } finally {
          this.$emit('write-submit', false);
        }
      },
      handleBangumiSearch (bangumiId) {
        const api = new Api(this);
        api.check({
          id: bangumiId
        }).then((id) => {
          if (id) {
            this.$confirm('你已经给该番剧评过分了，不能重复评分', '提示', {
              confirmButtonText: '查看我的评分',
              cancelButtonText: '换一个番剧',
              type: 'warning'
            }).then(() => {
              window.location.href = this.$alias.score(id)
            }).catch(() => {
              this.bangumiId = ''
            })
          }
        })
      }
    }
  }
</script>
