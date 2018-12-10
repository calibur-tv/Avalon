<template>
  <v-dialog
    v-model="show"
    title="用户反馈"
    submit-text="提交"
    cancel-text=""
    @submit="submit"
  >
    <el-form
      ref="forms"
      :model="forms"
      :rules="rules"
      label-width="55px"
    >
      <el-form-item
        label="类型"
        prop="type"
      >
        <el-select
          v-model="forms.type"
          placeholder="反馈类型"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="详情"
        prop="desc"
      >
        <el-input
          v-model.trim="forms.desc"
          :rows="6"
          :placeholder="placeholder"
          type="textarea"
        />
      </el-form-item>
    </el-form>
  </v-dialog>
</template>

<script>
import Api from '~/api/userApi'

export default {
  name: 'CreateFeedback',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.value,
      placeholder: '',
      preContent: '',
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
          label: '资源报错',
          value: 4
        },
        {
          label: '求资源',
          value: 5
        },
        {
          label: '求偶像',
          value: 6
        },
        {
          label: '求漫画',
          value: 7
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
          {
            type: 'number',
            required: true,
            message: '请选择反馈类型',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            max: 100,
            message: '请填写反馈内容，最多100字',
            trigger: 'submit'
          }
        ]
      }
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    this.$channel.$on('open-feedback', ({ type, desc, placeholder }) => {
      this.forms.type = type || ''
      this.preContent = desc || '{?}'
      this.placeholder =
        placeholder || '非常感谢您的反馈，请填写详细信息方便我们解决'
      this.show = true
    })
  },
  methods: {
    submit() {
      this.$refs.forms.validate(async valid => {
        if (valid) {
          const api = new Api(this)
          await api.feedback({
            type: this.forms.type,
            desc: this.preContent.replace('{?}', this.forms.desc),
            ua: navigator.userAgent
          })
          this.show = false
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
