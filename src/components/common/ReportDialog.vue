<style lang="scss">
.report-dialog-wrap {
  .report-btn {
    cursor: pointer;
  }
}

.report-dialog {
  h3 {
    color: $color-text-normal;
    font-size: 14px;
    margin-bottom: 12px;
    margin-left: 5px;
  }

  .el-radio-group {
    margin-bottom: 20px;
    margin-left: 5px;
  }
}
</style>

<template>
  <span class="report-dialog-wrap">
    <v-dialog
      v-model="showDialog"
      :title="title"
      :loading="loading"
      submit-text="提交"
      custom-class="report-dialog"
      @submit="submit"
    >
      <h3>违反法律法规</h3>
      <el-radio-group v-model="selectedType">
        <el-radio :label="1">违法违规</el-radio>
        <el-radio :label="2">色情低俗</el-radio>
        <el-radio :label="3">赌博诈骗</el-radio>
      </el-radio-group>
      <h3>侵犯个人权益</h3>
      <el-radio-group v-model="selectedType">
        <el-radio :label="4">人身攻击</el-radio>
        <el-radio :label="5">侵犯隐私</el-radio>
        <el-radio
          v-if="isCreator"
          :label="6"
        >内容抄袭</el-radio>
      </el-radio-group>
      <h3>有害社区环境</h3>
      <el-radio-group v-model="selectedType">
        <el-radio :label="7">垃圾广告</el-radio>
        <el-radio :label="8">恶意引战</el-radio>
        <el-radio :label="9">重复内容/刷屏</el-radio>
        <el-radio :label="10">内容不相关</el-radio>
        <el-radio :label="11">互刷团子</el-radio>
        <el-radio :label="0">其它</el-radio>
      </el-radio-group>
      <template v-if="needContent">
        <h3>留言：</h3>
        <el-input
          v-model.trim="content"
          :rows="3"
          resize="none"
          type="textarea"
          placeholder="请说明情况"
        />
      </template>
    </v-dialog>
    <span
      class="report-btn"
      @click="showDialog = true"
    >
      <slot/>
    </span>
  </span>
</template>

<script>
import Api from '~/api/userApi'

export default {
  name: 'ReportDialog',
  props: {
    id: {
      required: true,
      type: Number
    },
    type: {
      required: true,
      type: String
    },
    title: {
      type: String,
      default: '违规举报'
    },
    org: {
      type: Boolean,
      default: false
    },
    isCreator: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: false,
      selectedType: -1,
      content: '',
      loading: false
    }
  },
  computed: {
    needContent() {
      return this.selectedType === 0 || this.selectedType === 6
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async submit() {
      if (this.selectedType < 0) {
        this.$toast.error('请选择正确的分类')
        return
      }
      if (this.needContent && !this.content) {
        this.$toast.error('请填写具体情况')
        return
      }
      if (this.loading) {
        return
      }
      this.loading = true
      const api = new Api(this)
      try {
        api.report({
          id: this.id,
          message: this.content,
          type: this.selectedType,
          model: this.type
        })
      } finally {
        this.loading = false
        this.$toast.success('感谢您的反馈！')
        this.showDialog = false
        this.content = ''
        this.selectedType = -1
      }
    }
  }
}
</script>
