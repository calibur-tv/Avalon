<style lang="scss">
  #bangumi-setting {
    .avatar {
      width: 100px;
      height: 100px;
    }
  }
</style>

<template>
  <div id="bangumi-setting">
    <el-collapse
      v-if="showPanel"
      v-model="activeName"
      accordion
    >
      <el-collapse-item
        title="编辑番剧"
        name="1"
      >
        <bangumi-edit-form/>
      </el-collapse-item>
      <el-collapse-item
        title="添加偶像"
        name="2"
      >
        <el-alert
          type="info"
          title=""
          style="margin-bottom: 15px"
        >
          <div>1：请勿添加与《{{ info.name }}》无关的偶像</div>
          <div>2：添加偶像之前，请先在偶像列表里查找是否已添加过，请勿重复添加</div>
        </el-alert>
        <create-role-form :bangumi-id="info.id"/>
      </el-collapse-item>
      <el-collapse-item
        title="帖子操作"
        name="3"
      >
        <bangumi-post-setting/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import BangumiEditForm from '~/components/bangumi/forms/BangumiEditForm'
  import CreateRoleForm from '~/components/bangumi/forms/CreateRoleForm'
  import BangumiPostSetting from '~/components/bangumi/forms/BangumiPostSetting'

  export default {
    name: 'BangumiSetting',
    components: {
      BangumiEditForm,
      CreateRoleForm,
      BangumiPostSetting
    },
    data () {
      return {
        activeName: '0',
        showPanel: false
      }
    },
    computed: {
      info () {
        return this.$store.state.bangumi.info
      },
    },
    mounted () {
      this.$channel.$on('bangumi-tab-switch-setting', () => {
        this.showPanel = true
      })
    },
    methods: {
    }
  }
</script>
