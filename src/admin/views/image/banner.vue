<style lang="scss">
#image-banner {
  #another {
    display: none;
  }

  .image-wrap {
    @extend %clearfix;

    .loop {
      width: 280px;
      height: 173px;
      float: left;
      margin-right: 20px;
      margin-bottom: 20px;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      transition-duration: 0.2s;
      cursor: pointer;
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .control {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 40px;
        background: linear-gradient(
          transparent,
          rgba(0, 0, 0, 0.1) 20%,
          rgba(0, 0, 0, 0.2) 35%,
          rgba(0, 0, 0, 0.4) 65%,
          rgba(0, 0, 0, 0.6)
        );
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding: 10px;

        .edit-btn {
          color: #fff;
          margin-right: 15px;
          font-size: 13px;
        }
      }

      .mask {
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        opacity: 0;
        font-size: 12px;
        line-height: 20px;
        padding: 20px 10px;
        color: #fff;
      }

      &:hover {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1),
          0 4px 8px 0 rgba(0, 0, 0, 0.2);

        .mask {
          opacity: 1;
          transition: 0.2s;
        }
      }
    }
  }
}
</style>

<template>
  <div
    v-loading="pageLoading"
    id="image-banner"
  >
    <img
      v-if="form.url"
      id="another"
      ref="another"
      :src="`${imagePrefix + form.url}?imageMogr2/auto-orient/strip/gravity/Center/crop/435x300`"
      crossOrigin="anonymous"
      alt="another"
      @load="getImageGrayLevel"
    >
    <header>
      <el-button
        type="primary"
        @click="openCreateModal"
      >
        <i class="el-icon-upload"/>
        上传图片
      </el-button>
    </header>
    <div class="image-wrap">
      <div
        v-for="item in pageData"
        :key="item.id"
        class="loop"
      >
        <img :src="$resize(item.url, { width: 280, height: 173 })">
        <div class="mask">
          <p v-if="item.user_id">
            用户：
            <a
              :href="$alias.user(item.user_zone)"
              target="_blank"
              v-text="item.user_nickname"
            />
          </p>
          <p v-if="item.bangumi_id">
            番剧：
            <a
              :href="$alias.bangumi(item.bangumi_id)"
              target="_blank"
              v-text="item.bangumi_name"
            />
          </p>
        </div>
        <div class="control">
          <button
            class="edit-btn"
            @click="openEditModal(item)"
          >编辑</button>
          <el-switch
            v-model="item.use"
            @change="handleSwitch(item)"
          />
        </div>
      </div>
    </div>
    <v-dialog
      v-model="showEditModal"
      :loading="modalLoading"
      title="编辑图片"
      @submit="handleBannerEditSubmit"
    >
      <el-form>
        <el-form-item label="选择番剧">
          <bangumi-search v-model="form.bangumi_id"/>
        </el-form-item>
        <el-form-item label="选择作者">
          {{ form.user_nickname }}
          <user-search v-model="form.user_id"/>
        </el-form-item>
      </el-form>
    </v-dialog>
    <v-dialog
      v-model="showCreateModal"
      :loading="modalLoading"
      title="上传图片"
      @submit="handleBannerCreateSubmit"
    >
      <el-form label-position="top">
        <el-form-item label="选择图片">
          <el-upload
            ref="uploader"
            :data="uploadHeaders"
            :on-error="handleImageUploadError"
            :before-upload="beforeImageUpload"
            :on-success="handleImageUploadSuccess"
            :action="imageUploadAction"
          >
            <el-button
              size="small"
              type="primary"
            >点击更换</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="选择番剧">
          <bangumi-search
            v-model="form.bangumi_id"
            :clear="true"
          />
        </el-form-item>
        <el-form-item label="选择作者">
          {{ form.user_nickname }}
          <user-search v-model="form.user_id"/>
        </el-form-item>
      </el-form>
    </v-dialog>
    <v-page
      :change="handlePageChange"
      :state="pageState"
    />
  </div>
</template>

<script>
import Api from "~/api/adminApi";
import getImageGray from "@/utils/imageGray";
import pageMixin from "~/mixins/page";
import uploadMixin from "~/mixins/upload";

export default {
  mixins: [pageMixin, uploadMixin],
  data() {
    return {
      showEditModal: false,
      showCreateModal: false,
      modalLoading: false,
      form: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.pageLoading = true;
      const api = new Api(this);
      try {
        const data = await api.indexBannerList();
        this.pageState.cur = 1;
        this.pageState.size = 12;
        this.pageState.total = data.length;
        this.pageList = data;
      } finally {
        this.pageLoading = false;
      }
    },
    getImageGrayLevel() {
      this.form.gray = getImageGray(this.$refs.another, 100);
    },
    handleSwitch(item) {
      const api = new Api(this);
      api
        .indexBannerToggle(item.id)
        .then(result => {
          item.use = result;
          this.$toast.success("操作成功");
        })
        .catch(e => {
          this.$toast.error(e);
        });
    },
    openEditModal(item) {
      this.form = {
        id: item.id,
        bangumi_id: item.bangumi_id,
        user_id: item.user_id,
        user_zone: item.user_zone,
        user_nickname: item.user_nickname,
        gray: ""
      };
      this.showEditModal = true;
    },
    openCreateModal() {
      this.form = {
        bangumi_id: 0,
        user_id: 0,
        url: ""
      };
      this.showCreateModal = true;
      this.uploadConfig.pathPrefix = "banner";
      this.getUpToken();
    },
    async handleBannerEditSubmit() {
      if (this.modalLoading) {
        return;
      }
      this.modalLoading = true;
      const api = new Api(this);
      try {
        await api.indexBannerEdit({
          id: this.form.id,
          bangumi_id: this.form.bangumi_id,
          user_id: this.form.user_id
        });
        this.$toast.success("操作成功");
        this.showEditModal = false;
        this.form = {};
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.modalLoading = false;
      }
    },
    async handleBannerCreateSubmit() {
      if (!this.form.url) {
        this.$toast.error("请先上传图片");
        return;
      }
      if (this.form.gray === "") {
        this.$toast.error("图片处理中...");
      }
      if (this.modalLoading) {
        return;
      }
      this.modalLoading = true;
      const api = new Api(this);
      try {
        await api.indexBannerUpload({
          url: this.form.url,
          bangumi_id: this.form.bangumi_id,
          user_id: this.form.user_id,
          gray: this.form.gray
        });
        this.$toast.success("操作成功");
        this.showCreateModal = false;
        window.location.reload();
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.modalLoading = false;
      }
    },
    handleImageUploadSuccess(res) {
      this.form.url = res.data.key;
    }
  }
};
</script>
