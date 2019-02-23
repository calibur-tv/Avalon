<style lang="scss">
#change-idol-profile {
  .tips {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .warn {
    color: red;
  }

  .el-textarea,
  .el-input {
    margin-bottom: 10px;
  }

  .el-button {
    margin-top: 10px;
  }
}
</style>

<template>
  <div id="change-idol-profile">
    <p class="tips">修改特殊留言（一周只能修改一次，20字以内）：</p>
    <el-input
      v-model="lover_words"
      :rows="3"
      type="textarea"
      placeholder="用简单的文字表达你的爱吧！"
    />
    <p class="tips">
      修改QQ群号<span class="warn">（设置之后不能修改）</span>：
    </p>
    <el-input v-model="qq_group" placeholder="填写QQ群号码" />
    <div class="tips">修改经纪人</div>
    <el-input v-model="manager_id" placeholder="填写要任命的经纪人的邀请码" />
    <el-button :loading="submitting" type="primary" @click="beforeSubmit"
      >确认提交</el-button
    >
  </div>
</template>

<script>
import { changeCartoonRoleProfile } from '~/api/cartoonRoleApi'

export default {
  name: 'ChangeIdolProfile',
  props: {
    idol: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      qq_group: this.idol.qq_group,
      lover_words: this.idol.lover_words,
      manager_id: this.idol.manager ? this.idol.manager.id : '',
      submitting: false
    }
  },
  methods: {
    beforeSubmit() {
      if (this.submitting) {
        return
      }
      const words = this.lover_words.trim()
      if (words.length > 20) {
        this.$toast.error('留言给我缩减至20字以内重说！')
        return
      }
      if (!words && !this.qq_group) {
        this.$toast.error('内容不能为空')
        return
      }
      if (this.qq_group && !/^\d+$/.test(this.qq_group)) {
        this.$toast.error('QQ群号必须是数字')
        return
      }
      if (this.manager_id && !/^\d+$/.test(this.manager_id)) {
        this.$toast.error('经纪人的id是数字')
      }
      if (this.qq_group && !this.idol.qq_group) {
        this.$confirm('QQ群号设置之后不能再修改，确认要设置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.doSubmit()
          })
          .catch(() => {})
        return
      }
      this.doSubmit()
    },
    async doSubmit() {
      this.submitting = true
      try {
        await changeCartoonRoleProfile(this, {
          idol_id: this.idol.id,
          qq_group: this.qq_group,
          manager_id: this.manager_id,
          lover_words: this.lover_words.trim()
        })
        this.$toast.success('修改成功')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (e) {
        this.submitting = false
      }
    }
  }
}
</script>
