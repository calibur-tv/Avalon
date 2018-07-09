<template>
  <div id="cartoon-edit">
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="名称">
        <template slot-scope="scope">
          <a
            :href="$alias.imageAlbum(scope.row.id)"
            target="_blank"
          >{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="beginEditItem(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template slot-scope="scope">
          <el-button
            :disabled="!scope.$index"
            type="primary"
            size="mini"
            @click="move(scope.$index, false)"
          >上移</el-button>
          <el-button
            :disabled="scope.$index === list.length - 1"
            type="primary"
            size="mini"
            @click="move(scope.$index, true)"
          >下移</el-button>
          <el-button
            :disabled="!scope.$index"
            type="primary"
            size="mini"
            @click="toTop(scope.$index)"
          >置顶</el-button>
        </template>
      </el-table-column>
    </el-table>
    <footer>
      <el-col
        :span="3"
        :offset="19"
      >
        <el-button
          :loading="loadingSubmit"
          type="primary"
          size="small"
          @click="submitForm"
        >确认编辑</el-button>
      </el-col>
    </footer>
    <v-dialog
      v-if="editingItem"
      v-model="toggleEditModal"
      title="编辑"
      @submit="submitCartoonEdit"
    >
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="editingItem.name"/>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            :data="uploadHeaders"
            :show-file-list="false"
            :before-upload="beforeImageUpload"
            :on-success="handleUpUploadSuccess"
            :action="imageUploadAction"
          >
            <el-button
              type="primary"
              size="mini"
            >
              <i class="el-icon-plus"/>
              上传
            </el-button>
            &nbsp;
            <el-popover
              ref="popoverPoster"
              placement="right"
              width="200"
              trigger="hover"
            >
              <img :src="$resize(editingItem.url)">
            </el-popover>
            <a
              v-popover:popoverPoster
              :href="$resize(editingItem.url)"
              type="text"
              target="_blank"
            >
              <i class="el-icon-view"/>&nbsp;预览
            </a>
          </el-upload>
        </el-form-item>
      </el-form>
    </v-dialog>
  </div>
</template>

<script>
  import Api from '~/api/adminApi'
  import uploadMixin from '~/mixins/upload'

  export default {
    mixins: [
      uploadMixin
    ],
    data () {
      return {
        loading: false,
        toggleEditModal: false,
        editingItem: null,
        loadingSubmit: false,
        loadingCreate: false,
        list: []
      }
    },
    computed: {
      id () {
        return this.$route.params.id
      }
    },
    created() {
      this.getData();
    },
    methods: {
      async getData () {
        const api = new Api(this);
        try {
          this.list = await api.cartoonDetail({
            id: this.id
          });
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loading = false
        }
      },
      beginEditItem (item) {
        this.editingItem = {
          id: item.id,
          name: item.name,
          url: item.url.split('image.calibur.tv/').pop(),
          bangumi_id: item.bangumi_id
        };
        this.getUpToken();
        this.uploadConfig.pathPrefix = `bangumi/${this.id}/cartoon/${item.id}`;
        this.toggleEditModal = true
      },
      move (index, toNext) {
        const prev = toNext ? index : index - 1;
        const next = toNext ? index + 1 : index;
        this.list.splice(prev, 1, ...this.list.splice(next, 1, this.list[prev]))
      },
      toTop (index) {
        const move = this.list.splice(index, 1)
        this.list = move.concat(this.list)
      },
      async submitForm () {
        if (this.loadingSubmit) {
          return
        }
        this.loadingSubmit = true
        const api = new Api(this)
        try {
          await api.cartoonSort({
            id: this.id,
            cartoon: this.list.map(_ => _.id).toString()
          })
          this.$toast.success('更新成功')
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingSubmit = true
        }
      },
      async submitCartoonEdit () {
        if (this.loadingCreate) {
          return
        }
        this.loadingCreate = true;
        const api = new Api(this);
        try {
          api.cartoonEdit({
            id: this.editingItem.id,
            name: this.editingItem.name,
            url: this.editingItem.url
          });
          this.toggleEditModal = false;
          this.$toast.success('更新成功');
          this.list.forEach((item, index) => {
            if (item.id === this.editingItem.id) {
              this.list[index].name = this.editingItem.name
              this.list[index].url = this.editingItem.url
            }
          });
        } catch (e) {
          this.$toast.error(e);
        }
      },
      handleUpUploadSuccess (res) {
        this.$toast.success('上传成功');
        this.editingItem.url = res.data.key;
      }
    }
  }
</script>
