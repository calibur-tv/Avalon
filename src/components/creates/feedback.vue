<template>
  <v-modal v-model="showModal" :footer="false" header-text="用户反馈">
    <el-form :model="forms" :rules="rules" ref="forms" label-width="100px">
      <el-form-item label="类型" prop="type">
        <el-select v-model="forms.type" placeholder="请选择活动区域">
          <el-option label="功能建议" :value="1"></el-option>
          <el-option label="遇到错误" :value="2"></el-option>
          <el-option label="其它问题" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详情" prop="desc">
        <el-input type="textarea" :rows="6" v-model.trim="forms.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </v-modal>
</template>

<script>
  import Api from 'api/userApi'

  export default {
    name: 'create-feedback',
    data () {
      return {
        showModal: false,
        forms: {
          type: '',
          desc: ''
        },
        rules: {
          type: [
            { type: 'number', required: true, message: '请选择反馈类型', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写反馈内容', trigger: 'blur' },
            { max: 250, message: '最多可输入250字', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.$channel.$on('show-create-feedback-modal', () => {
        this.showModal = true
      })
    },
    methods: {
      submit () {
        this.$refs.forms.validate(async (valid) => {
          if (valid) {
            const api = new Api(this)
            await api.feedback({
              type: this.forms.type,
              desc: this.forms.desc
            })
            this.$refs.forms.resetFields()
            this.$toast.success('反馈成功，感谢您的反馈！')
            this.showModal = false
          } else {
            return false
          }
        })
      }
    }
  }
</script>
