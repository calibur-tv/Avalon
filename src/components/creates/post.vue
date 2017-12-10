<template>
  <v-modal v-model="showModal" :footer="false" header-text="新建帖子">
    <el-form :model="forms" :rules="rules" ref="forms" label-width="100px" class="demo-forms">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="forms.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="forms.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="forms.desc"></el-input>
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
          region: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
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
            alert('submit!')
          } else {
            return false
          }
        })
      },
      getUserFollowedBangumis () {
        this.$store.dispatch('bangumi/getFollowBangumis', {
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
