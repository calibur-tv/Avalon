<template>
  <v-dialog
    v-model="show"
    :loading="submitting"
    :click-close="false"
    :footer="false"
    title="上传图片"
    class="create-image-modal"
  >
    <el-radio-group
      v-model="action"
      size="mini"
      style="margin-bottom: 30px"
    >
      <el-radio-button label="上传图片"/>
      <el-radio-button label="创建相册"/>
    </el-radio-group>
    <upload-image-form
      v-if="action === '上传图片'"
      :selected-album-id="selectedAlbumId"
      :append-albums="createdAlbum"
    />
    <create-album-form
      v-else-if="action === '创建相册'"
      @success="handleAlbumCreated"
    />
  </v-dialog>
</template>

<script>
import UploadImageForm from '~/components/image/UploadImageForm'
import CreateAlbumForm from '~/components/image/CreateAlbumForm'

export default {
  name: 'CreateImageDialog',
  components: {
    UploadImageForm,
    CreateAlbumForm
  },
  data() {
    return {
      selectedAlbumId: '',
      createdAlbum: [],
      uploadHeaders: {
        token: ''
      },
      bangumiRoles: {},
      bangumis: [],
      options: [],
      roles: [],
      loadingUserBangumiFetch: false,
      loadingUploadTypeFetch: false,
      loadingUserAlbumFetch: false,
      show: false,
      submitting: false,
      form: {
        bangumiId: '',
        size: '',
        tags: '',
        roleId: '',
        albumId: '',
        creator: false,
        images: []
      },
      albumForm: {
        name: '',
        bangumiId: '',
        poster: [],
        isCartoon: false,
        creator: false
      },
      action: '上传图片',
      exceed: 10,
      pendingUpload: 0
    }
  },
  computed: {
    albums() {
      return this.$store.state.image.albums
    },
    user() {
      return this.$store.state.user
    },
    zone() {
      return this.user.zone
    }
  },
  mounted() {
    this.$channel.$on('show-upload-image-modal', () => {
      this.show = true
    })
  },
  methods: {
    handleAlbumCreated(album) {
      this.createdAlbum.unshift(album)
      this.selectedAlbumId = album.id
      this.action = '上传图片'
    }
  }
}
</script>
