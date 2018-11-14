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
  <div
    v-if="info.is_master"
    id="bangumi-setting"
  >
    <el-collapse
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
          <el-alert
            title=""
            type="success"
          >
            当前选中漫画：{{ createdAlbum.name }}
          </el-alert>
          <upload-image-form
            :selected-album-id="createdAlbum.id"
            :selected-bangumi-id="info.id"
            :exceed="100"
            :is-cartoon="true"
          />
        </template>
        <template v-else>
          <el-alert
            type="info"
            title=""
          >
            请先创建一个相册，填写相应的漫画信息，或&nbsp;
            <el-button
              type="primary"
              size="mini"
              plain
              round
              @click="showSelectAlbum = !showSelectAlbum"
            >
              {{ showSelectAlbum ? '新建一集漫画' : '选择已有漫画，进行续传' }}
            </el-button>
          </el-alert>
          <el-row v-if="showSelectAlbum">
            <el-col :span="20">
              <image-album-select
                @success="setSelectedAlbum"
              />
            </el-col>
            <el-col
              :span="3"
              :offset="1"
            >
              <el-button
                type="primary"
                @click="createdAlbum = selectedAlbum"
              >
                确认
              </el-button>
            </el-col>
          </el-row>
          <create-album-form
            v-else
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
import BangumiEditForm from "~/components/bangumi/forms/BangumiEditForm";
import CreateRoleForm from "~/components/bangumi/forms/CreateRoleForm";
import BangumiPostSetting from "~/components/bangumi/forms/BangumiPostSetting";
import UploadImageForm from "~/components/image/UploadImageForm";
import CreateAlbumForm from "~/components/image/CreateAlbumForm";
import ImageAlbumSelect from "~/components/image/ImageAlbumSelect";

export default {
  name: "BangumiSetting",
  components: {
    BangumiEditForm,
    CreateRoleForm,
    BangumiPostSetting,
    UploadImageForm,
    CreateAlbumForm,
    ImageAlbumSelect
  },
  data() {
    return {
      activeName: "0",
      showSelectAlbum: false,
      createdAlbum: null,
      selectedAlbum: null
    };
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info;
    }
  },
  mounted() {
    if (!this.info.is_master) {
      this.$router.replace({
        name: "bangumi-post"
      });
    }
  },
  methods: {
    setSelectedAlbum(album) {
      this.selectedAlbum = album;
    },
    handleAlbumCreated(album) {
      this.createdAlbum = album;
    }
  }
};
</script>
