<template>
  <div
    v-loading="pageLoading"
    id="video-list"
  >
    <header>
      <el-row>
        <el-col :span="10">
          <bangumi-search
            placeholder="请先选择番剧"
            @search="handleBangumiSearch"
          />
        </el-col>
      </el-row>
    </header>
    <el-table
      :data="pageData"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="索引">
        <a
          slot-scope="scope"
          :href="$alias.video(scope.row.id)"
          target="_blank"
          v-text="scope.row.id"
        />
      </el-table-column>
      <el-table-column
        label="名称"
        prop="name"
      />
      <el-table-column
        label="集数"
        prop="part"
      />
      <el-table-column
        label="播放量"
        prop="count_played"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="edit"
            @click="handleEditOpen(scope.row)">编辑</el-button>
          <el-button
            :type="scope.row.deleted_at ? 'warning' : 'danger'"
            size="small"
            icon="delete"
            @click="handleDelete(scope.row)">{{ scope.row.deleted_at ? '恢复' : '删除' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-page
      :change="getData"
      :state="pageState"
    />
    <v-dialog
      v-model="showEditorModal"
      title="编辑视频"
      width="1000px"
      @submit="handleEditDone"
    >
      <el-form
        :model="editForm"
        :loading="editSubmitting"
        label-width="80px"
      >
        <el-form-item label="番剧">
          <bangumi-search v-model="editForm.bangumi_id"/>
        </el-form-item>
        <el-form-item label="集数">
          <el-input v-model.trim="editForm.part"/>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model.trim="editForm.name"/>
        </el-form-item>
        <template>
          <el-form-item label="资源">
            <el-col :span="18">
              <el-input v-model.trim="editForm.resource.video[720].src">
                <template slot="prepend">https://video.calibur.tv/</template>
              </el-input>
            </el-col>
            <!--
            <el-col
              v-if="editForm.resource.video[720].src"
              :span="4"
              :offset="1"
            >
              字幕：<el-switch v-model="editForm.resource.video[720].useLyc"/>
            </el-col>
            -->
          </el-form-item>
        </template>
        <!--
        <template>
          <el-form-item label="1080P 资源">
            <el-col :span="18">
              <el-input v-model.trim="editForm.resource.video[1080].src">
                <template slot="prepend">https://video.calibur.tv/</template>
              </el-input>
            </el-col>
            <el-col
              v-if="editForm.resource.video[1080].src"
              :span="4"
              :offset="1"
            >
              字幕：<el-switch v-model="editForm.resource.video[1080].useLyc"/>
            </el-col>
          </el-form-item>
        </template>
        -->
        <el-form-item label="海报">
          <el-input v-model.trim="editForm.poster">
            <template slot="prepend">https://image.calibur.tv/</template>
          </el-input>
        </el-form-item>
        <!--
        <el-form-item label="字幕">
          <el-input v-model.trim="editForm.resource.lyric.zh">
            <template slot="prepend">https://video.calibur.tv/</template>
          </el-input>
        </el-form-item>
        -->
        <el-form-item label="外链">
          <el-input v-model.trim="editForm.url"/>
        </el-form-item>
      </el-form>
    </v-dialog>
  </div>
</template>

<script>
  import Api from '~/api/adminApi'
  import pageMixin from '~/mixins/page'
  import deepAssign from 'deep-assign'

  export default {
    data () {
      return {
        bangumiId: 0,
        showEditorModal: false,
        editSubmitting: false,
        editForm: {
          id: '',
          bangumi_id: '',
          bname: '',
          name: '',
          part: '',
          poster: '',
          url: '',
          resource: {
            "video": {
              "720": {
                "useLyc": false,
                "src": ""
              },
              "1080": {
                "useLyc": false,
                "src": ""
              }
            },
            "lyric": {
              "zh": "",
              "en": ""
            }
          }
        }
      }
    },
    mixin: [
      pageMixin
    ],
    methods: {
      async getData (page) {
        if (page <= this.pageState.max) {
          this.pageState.cur = page
          return
        }
        if (this.pageLoading) {
          return
        }
        this.pageLoading = true;
        this.pageState.size = 10;
        const api = new Api(this);
        try {
          const data = await api.getBangumiVideoList({
            id: this.bangumiId,
            to_page: page,
            cur_page: this.pageState.cur,
            take: this.pageState.size
          });
          this.pageState.total = data.total
          this.pageState.cur = page;
          this.pageState.max = page;
          this.pageList = this.pageList.concat(data.list)
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.pageLoading = false
        }
      },
      handleBangumiSearch (id) {
        if (this.bangumiId !== id) {
          this.resetPageState();
        }
        this.bangumiId = id;
        this.getData(1);
      },
      handleEditOpen (row) {
        Object.keys(row).forEach(key => {
          this.editForm[key] = row[key]
        })
        const defResource = {
          "video": {
            "720": {
              "useLyc": false,
              "src": ""
            },
            "1080": {
              "useLyc": false,
              "src": ""
            }
          },
          "lyric": {
            "zh": "",
            "en": ""
          }
        }
        this.editForm.resource = row.resource ? deepAssign({}, defResource, row.resource) : Object.assign({}, defResource);
        this.editForm.poster = this.editForm.poster.split('calibur.tv/').pop()
        this.showEditorModal = true;
      },
      handleDelete (video) {
        this.$confirm('确认要执行该操作吗?', '提示').then(() => {
          const api = new Api(this);
          api.videoDelete({
            id: video.id
          }).then(() => {
            video.deleted_at = !video.deleted_at
            this.$toast.success('操作成功');
          }).catch(() => {
            this.$toast.error('操作失败');
          })
        }).catch(() => {});
      },
      async handleEditDone () {
        if (this.editSubmitting) {
          return
        }
        this.editSubmitting = true;
        const api = new Api(this);
        try {
          await api.videoEdit(Object.assign({}, this.editForm, {
            url: this.editForm.url.split('?').shift()
          }));
          this.$toast.success('操作成功，页面刷新后可看到改动');
          this.showEditorModal = false;
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.editSubmitting = false;
        }
      }
    }
  }
</script>
