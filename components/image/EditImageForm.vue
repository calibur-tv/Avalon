<template>
  <el-form
    :disabled="submitting"
    label-width="45px"
  >
    <el-form-item label="名字">
      <el-input
        v-model="form.name"
        placeholder="给图片起个名字"
      />
    </el-form-item>
    <el-form-item label="番剧">
      <bangumi-search
        v-model="form.bangumi_id"
        :clear="false"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="submitting"
        type="primary"
        size="small"
        @click="submit"
      >确认编辑</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { editSingleImage } from '~/api/imageApi'

export default {
  name: 'EditImageForm',
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      submitting: false,
      form: {
        bangumi_id: this.image.bangumi_id,
        name: this.image.name
      }
    }
  },
  methods: {
    async submit() {
      if (this.form.name.length > 30) {
        this.$toast.error('名字最长 30 个字')
        return
      }
      if (this.submitting) {
        return
      }
      this.submitting = false
      try {
        await editSingleImage(this, {
          id: this.image.id,
          name: this.form.name,
          bangumi_id: this.form.bangumi_id
        })
        this.$toast.success('操作成功')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>
