<template>
  <v-modal v-model="showModal" :footer="false" header-text="新建帖子">
    <el-form :model="forms" :rules="rules" ref="forms" label-width="80px">
      <el-form-item label="标题" prop="name">
        <el-input placeholder="请填写标题" v-model="forms.name"></el-input>
      </el-form-item>
      <el-form-item label="番剧" prop="bangumiId">
        <el-select v-model="forms.bangumiId" placeholder="请选择活动区域">
          <el-option v-for="item in $store.getters['users/bangumis']"
                     :label="item.name"
                     :key="item.id"
                     :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详情" prop="desc">
        <el-input type="textarea" :rows="10" v-model="forms.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </v-modal>
</template>

<script>
  export default {
    name: 'create-post',
    data () {
      return {
        showModal: false,
        forms: {
          name: '',
          bangumiId: this.$route.name === 'bangumi-show' && this.$store.state.bangumi.list[this.$route.params.id].followed ? parseInt(this.$route.params.id, 10) : undefined,
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入帖子标题', trigger: 'blur' },
            { max: 20, message: '请缩减至20字以内！', trigger: 'blur' }
          ],
          bangumiId: [
            { type: 'number', required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          desc: [
            { max: 1000, message: '内容不能超过1000字', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      showModal (val) {
        if (val) {
          this.getUserFollowedBangumis()
        }
      }
    },
    methods: {
      submit () {
        this.$refs.forms.validate((valid) => {
          if (valid) {
            this.$captcha(() => {
              alert('submit')
            })
          } else {
            return false
          }
        })
      },
      getUserFollowedBangumis () {
        this.$store.dispatch('users/getFollowBangumis', {
          zone: this.$store.state.user.zone
        })
      }
    },
    mounted () {
      this.$channel.$on('show-create-post-modal', () => {
        if (this.$store.state.login) {
          this.showModal = true
        } else {
          this.$channel.$emit('sign-in')
        }
      })
    }
  }
</script>
