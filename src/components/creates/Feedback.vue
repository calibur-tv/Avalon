<template>
  <el-form :model="forms" :rules="rules" ref="forms" label-width="100px">
    <el-form-item label="类型" prop="type">
      <el-select v-model="forms.type" placeholder="反馈类型">
        <el-option 
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="详情" prop="desc">
      <el-input type="textarea" :rows="6" v-model.trim="forms.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Api from '~/api/userApi'

  export default {
    name: 'create-feedback',
    data () {
      return {
        options: [
          {
            label: '功能建议',
            value: 1
          },
          {
            label: '遇到错误',
            value: 2
          },
          {
            label: '资源问题',
            value: 4
          },
          {
            label: '其它问题',
            value: 3
          }
        ],
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
    methods: {
      submit () {
        this.$refs.forms.validate(async (valid) => {
          if (valid) {
            const api = new Api(this)
            await api.feedback({
              type: this.forms.type,
              desc: this.forms.desc
            })
            this.$emit('submit')
            this.$refs.forms.resetFields()
            this.$toast.success('反馈成功，感谢您的反馈！')
          } else {
            return false
          }
        })
      }
    }
  }
</script>
