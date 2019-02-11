<style lang="scss">
.role-trending-register {
  .create-role-tips {
    margin-bottom: 20px;

    ul {
      margin-left: 5px;
      li {
        line-height: 22px;
        font-weight: 500;
        list-style-type: disc;
      }
    }
  }
}
</style>

<template>
  <div class="role-trending-register">
    <div class="create-role-tips">
      <el-alert
        type="info"
      >
        <ul>
          <li>创办公司，需要交纳10个虚拟币（团子或光玉）作为注册资本</li>
          <li>请勿创建与番剧无关的角色，违者删除角色并禁言一周</li>
          <li>请勿发布错误的资料。头像、别名、简介等，要保持一致</li>
          <li>请勿创建重复的偶像，创建前善用搜索，重复的偶像将被删除</li>
          <li>偶像创建成功后，只要有20个人参股，就可以自动上市</li>
        </ul>
      </el-alert>
    </div>
    <create-role-form/>
  </div>
</template>

<script>
import CreateRoleForm from '~/components/idol/CreateRoleForm'

export default {
  name: 'RoleTrendingRegister',
  components: {
    CreateRoleForm
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
