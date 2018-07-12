<style lang="scss">
  #create-score-form {
    .el-rate__item {
      margin-top: 10px;
    }
  }
</style>

<template>
  <el-form
    id="create-score-form"
    :disabled="submitting"
  >
    <el-row>
      <el-col :span="8">
        <el-form-item label="笑点">
          <el-rate
            v-model="form.lol"
            :allow-half="true"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="泪点">
          <el-rate
            v-model="form.cry"
            :allow-half="true"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="燃点">
          <el-rate
            v-model="form.fight"
            :allow-half="true"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="萌点">
          <el-rate
            v-model="form.moe"
            :allow-half="true"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="音乐">
          <el-rate
            v-model="form.sound"
            :allow-half="true"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="画面">
          <el-rate
            v-model="form.vision"
            :allow-half="true"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="情节">
          <el-rate
            v-model="form.story"
            :allow-half="true"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="角色">
          <el-rate
            v-model="form.role"
            :allow-half="true"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="内涵">
          <el-rate
            v-model="form.express"
            :allow-half="true"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="风格">
          <el-rate
            v-model="form.style"
            :allow-half="true"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-input
        v-model.trim="content"
        :rows="10"
        :placeholder="`请不要吝啬你的笔墨，留下你对《${bangumiName}》的回忆吧！`"
        type="textarea"
      />
    </el-form-item>
    <el-button
      :loading="submitting"
      type="primary"
      size="mini"
      @click="submit"
    >提交</el-button>
  </el-form>
</template>

<script>
  import ScoreApi from '~/api/scoreApi'

  export default {
    name: 'CreateScoreForm',
    props: {
      bangumiId: {
        required: true,
        type: Number
      },
      bangumiName: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        content: '',
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
        submitting: false
      }
    },
    methods: {
      async submit () {
        if (!this.content) {
          this.$toast.error('至少说点什么吧');
          return
        }
        if (this.submitting) {
          return
        }
        this.submitting = true;
        const api = new ScoreApi(this);
        const scores = {}
        Object.keys(this.form).forEach(key => {
          scores[key] = this.form[key] * 2
        })
        this.$captcha({
          success: async ({ data }) => {
            try {
              const id = await api.create(Object.assign({}, scores, {
                bangumi_id: this.bangumiId,
                content: this.$utils.convertPureTextToRich(this.content),
                intro: this.content.substring(0, 120),
                geetest: data
              }))
              this.$toast.success('发表成功')
              setTimeout(() => {
                window.location = this.$alias.score(id);
              }, 400);
            } catch (e) {
              this.$toast.error(e);
            } finally {
              this.submitting = false
            }
          },
          error: (e) => {
            this.submitting = false
            this.$toast.error(e)
          },
          close: () => {
            this.submitting = false
          }
        })
      }
    }
  }
</script>
