<style lang="scss">
  #bangumi-setting {
    .avatar {
      width: 100px;
      height: 100px;
    }

    .el-alert {
      margin-bottom: 15px;
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
        >
          <div>1：请勿添加与《{{ info.name }}》无关的偶像</div>
          <div>2：添加偶像之前，请先在偶像列表里查找是否已添加过，请勿重复添加</div>
        </el-alert>
        <create-role-form
          :bangumi-id="info.id"
          :is-create="true"
        />
      </el-collapse-item>
      <el-collapse-item
        title="帖子操作"
        name="3"
      >
        <bangumi-post-setting/>
      </el-collapse-item>
      <el-collapse-item
        title="上传漫画"
        name="4"
      >
        <template v-if="createdAlbum">
          <el-alert
            type="info"
            title=""
          >
            <div>1：漫画已经创建，但还没有内容，最好尽快上传内容</div>
            <div>2：下面的上传按钮可以一次最多上传 <strong>51</strong> 张图片，当然你也可以在其它地方上传，但其它地方一次能够上传的更少</div>
            <div>3：上传完成之后，可以在漫画页面排序和删除多余的图片</div>
          </el-alert>
          <upload-image-form
            :selected-album-id="createdAlbum.id"
            :selected-bangumi-id="info.id"
            :exceed="51"
            :is-cartoon="true"
          />
        </template>
        <template v-else>
          <el-alert
            type="info"
            title="请先创建一个相册，填写相应的漫画信息"
          />
          <create-album-form
            :bangumi-id="info.id"
            :is-cartoon="true"
            @success="handleAlbumCreated"
          />
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import BangumiEditForm from '~/components/bangumi/forms/BangumiEditForm'
  import CreateRoleForm from '~/components/bangumi/forms/CreateRoleForm'
  import BangumiPostSetting from '~/components/bangumi/forms/BangumiPostSetting'
  import UploadImageForm from '~/components/image/UploadImageForm'
  import CreateAlbumForm from '~/components/image/CreateAlbumForm'

  export default {
    name: 'BangumiSetting'
    ,
    components: {
      BangumiEditForm,
      CreateRoleForm,
      BangumiPostSetting,
      UploadImageForm,
      CreateAlbumForm
    },
    data () {
      return {
        activeName: '0',
        showPanel: false,
        createdAlbum: null
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
      handleAlbumCreated (album) {
        this.createdAlbum = album;
      }
    }
  }
</script>
