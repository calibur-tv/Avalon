<style lang="scss">
.comment-reply-form {
  .input-wrap {
    overflow: hidden;

    input {
      width: 100%;
      height: 28px;
      padding-left: 5px;
      font-size: 12px;
    }
  }

  .btn-group {
    float: right;

    button {
      margin-left: 10px;
    }
  }
}
</style>

<template>
  <div
    v-if="open"
    class="comment-reply-form"
  >
    <div class="btn-group">
      <el-button
        size="mini"
        type="info"
        plain
        @click="cancel"
      >取消</el-button>
      <el-button
        :loading="submitting"
        size="mini"
        type="primary"
        @click="submit"
      >发表</el-button>
    </div>
    <div class="input-wrap">
      <input
        ref="input"
        v-model.trim="content"
        type="text"
        placeholder="请缩减至100字以内"
        maxlength="100"
        @keydown.enter="submit"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentReplyForm',
  props: {
    type: {
      required: true,
      type: String
    },
    id: {
      required: true,
      type: Number
    },
    toUserId: {
      required: true,
      type: Number
    },
    value: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      open: this.value,
      submitting: false,
      content: ''
    }
  },
  mounted() {
    this.$watch('value', val => {
      this.open = val
      if (val) {
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
    })
    this.$watch('open', val => {
      this.$emit('input', val)
    })
  },
  methods: {
    cancel() {
      this.open = false
    },
    async submit() {
      if (!this.$store.state.login) {
        this.$channel.$emit('sign-in')
        return
      }
      if (!this.content) {
        return
      }
      if (this.submitting) {
        return
      }
      this.submitting = true
      try {
        const result = await this.$store.dispatch('comment/createSubComment', {
          id: this.id,
          ctx: this,
          type: this.type,
          content: this.content,
          targetUserId: this.toUserId
        })
        this.open = false
        this.content = ''
        this.$toast.success(result.message)
        this.$store.commit('UPDATE_USER_EXP', result.exp)
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>
