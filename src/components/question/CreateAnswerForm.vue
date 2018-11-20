<style lang="scss">
#create-answer-form {
  height: calc(100vh - 155px);

  .qaq-title {
    margin-top: 15px;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 600;
  }

  .json-editor-main {
    .text-preview {
      padding-bottom: 0;

      .footer {
        display: none;
      }
    }

    .image-preview {
      .save-btn {
        display: none;
      }
    }
  }
}

.qaq-editor-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 52px;
  border-top: 1px solid $color-gray-light;
  padding-top: 7px;
  text-align: right;
  z-index: 1;

  .source-url {
    float: left;
    width: 450px;

    input {
      border-top: none;
      border-right: none;
      border-left: none;
    }
  }

  button {
    margin-left: 18px !important;
  }
}
</style>

<template>
  <v-dialog
    v-model="show"
    :footer="false"
    :header="false"
    :fullscreen="true"
    :close="false"
    width="100%"
  >
    <div
      id="create-answer-form"
      class="container"
    >
      <h1
        class="qaq-title"
        v-text="title"
      />
      <json-editor @submit="beforeSubmit"/>
    </div>
    <div class="qaq-editor-footer">
      <div class="container">
        <el-input
          v-model="source_url"
          placeholder="如果是转载，请复制原文链接至此"
          class="source-url"
          size="medium"
        />
        <el-button
          type="text"
          size="medium"
          @click="closeEditor"
        >
          取消
        </el-button>
        <el-button
          v-if="!published"
          :loading="saving"
          plain
          size="medium"
          @click="$channel.$emit('write-save')"
        >
          {{ id ? '更新草稿' : '存草稿' }}
        </el-button>
        <el-button
          :loading="saving"
          size="medium"
          type="primary"
          @click="$channel.$emit('write-publish')"
        >{{ published ? '更新回答' : id ? '发布回答' : '提交回答' }}</el-button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import Api from '~/api/questionApi'
import JsonEditor from '~/components/jsonEditor/index'

export default {
  name: 'CreateAnswerForm',
  components: {
    JsonEditor
  },
  props: {
    title: {
      required: true,
      type: String
    },
    questionId: {
      required: true,
      type: Number
    },
    value: {
      required: true,
      type: Boolean
    },
    answerId: {
      type: Number,
      default: 0
    },
    published: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      id: this.answerId,
      show: this.value,
      source_url: '',
      saving: false
    }
  },
  computed: {
    resource() {
      return this.$store.state.editor.resource
    }
  },
  mounted() {
    this.$watch('show', val => {
      this.$emit('input', val)
    })
    this.$watch('value', val => {
      this.show = val
    })
    this.loadEditContent()
  },
  methods: {
    beforeSubmit(richContent) {
      if (
        this.source_url &&
        !/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(
          this.source_url
        )
      ) {
        this.$toast.error('请输入合法转载链接')
        return
      }
      if (this.saving) {
        return
      }
      this.saving = true
      if (this.id) {
        this.submit(richContent)
      } else {
        this.$captcha({
          success: ({ data }) => {
            this.submit(richContent, data)
          },
          error: e => {
            this.$toast.error(e)
            this.saving = false
          },
          close: () => {
            this.saving = false
          }
        })
      }
    },
    async submit(richContent, geetest = {}) {
      this.$channel.$emit('write-submit', true)
      const api = new Api(this)
      try {
        const form = {
          question_id: this.questionId,
          content: richContent.content,
          intro: richContent.desc.substring(0, 120),
          do_publish: richContent.publish,
          source_url: this.source_url.split('?')[0],
          geetest
        }
        let result
        if (this.id) {
          form.id = this.id
          await api.updateAnswer(form)
        } else {
          result = await api.createAnswer(form)
          this.id = result.data
        }
        if (richContent.publish) {
          this.$toast
            .success(
              typeof result !== 'undefined' ? result.message : '发布成功'
            )
            .then(() => {
              window.location.href = this.$alias.answer(this.id)
            })
        } else {
          this.$toast.success('编辑成功！')
          this.$store.commit('question/EDIT_ANSWER', { id: this.id })
          this.closeEditor()
        }
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.saving = false
      }
    },
    loadEditContent() {
      if (this.resource) {
        this.source_url = this.resource.source_url
      }
    },
    closeEditor() {
      this.show = false
    }
  }
}
</script>
