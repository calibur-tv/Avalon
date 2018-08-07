<style lang="scss" scoped>
.tips {
  margin-bottom: 30px;

  p {
    line-height: 20px;
    margin-top: 3px;
    margin-left: 5px;
  }
}

.el-icon-question {
  margin-left: 10px;
  cursor: pointer;
  font-size: 20px;
  vertical-align: middle;
  color: $color-gray-deep;
}

.preview-poster {
  height: 100px;
  width: 500px;
  position: absolute;
  right: 0;
  top: 0;
  background-position: center right;
  background-size: contain;
  background-repeat: no-repeat;
}

.choice-album-item {
  .meta {
    float: right;
    height: 24px;
    margin-top: 5px;
    width: 24px;
    line-height: 24px;
    font-size: 12px;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    margin-left: 10px;
  }

  .image-count {
    background-color: $color-gray-deep;
  }

  .is-creator {
    background-color: gold;
  }

  .is-cartoon {
    background-color: $color-pink-deep;
  }

  .info {
    overflow: hidden;

    img {
      width: 24px;
      height: 24px;
      border-radius: 3px;
      margin-right: 5px;
      margin-top: -2px;
      vertical-align: middle;
    }

    span {
      font-size: 14px;
    }
  }
}
</style>

<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rule"
    :disabled="submitting"
    label-width="45px"
  >
    <template v-if="!isCartoon">
      <el-alert
        type="info"
        title=""
        class="tips"
        show-icon
      >
        <p>如果想要批量上传图片，就选择一个相册（需要先创建）</p>
        <p>如果想上传单张精品美图，就选择一个番剧</p>
      </el-alert>
      <el-form-item
        v-if="!form.bangumi_id"
        label="相册"
        prop="album_id"
      >
        <el-select
          v-model="form.album_id"
          :filterable="true"
          :clearable="true"
          :loading="fetchingAlbum"
          style="width: 100%"
          placeholder="【批量上传】选择要上传图片的相册"
        >
          <el-option
            v-for="item in selectionAlbum"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            class="choice-album-item"
          >
            <div
              class="image-count meta"
              v-text="item.image_count"
            />
            <div
              v-if="item.is_creator"
              class="is-creator meta"
            >创</div>
            <div
              v-if="item.is_cartoon"
              class="is-cartoon meta"
            >漫</div>
            <div class="info">
              <img :src="$resize(item.poster, { width: 48 })">
              <span v-text="item.name"/>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="!form.album_id"
        label="番剧"
        prop="bangumi_id"
      >
        <bangumi-search
          v-model="form.bangumi_id"
          placeholder="【单个上传】选择要投稿的番剧"
        />
      </el-form-item>
    </template>
    <template v-if="form.album_id || form.bangumi_id">
      <template v-if="form.album_id">
        <el-form-item
          label="图片"
          prop="images"
        >
          <el-upload
            ref="manyUpload"
            :data="uploadHeaders"
            :on-error="handleManyUploadError"
            :on-success="handleManyImageUploadSuccess"
            :before-upload="beforeManyImageUpload"
            :on-remove="handleManyImageRemove"
            :file-list="form.images"
            :on-exceed="handleManyExceed"
            :limit="exceed"
            :action="imageUploadAction"
            :accept="imageUploadAccept"
            multiple
            list-type="picture-card"
          >
            <i class="el-icon-plus"/>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submitting"
            type="primary"
            size="small"
            @click="submitManyImage"
          >
            确认上传
          </el-button>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="名字">
          <el-input
            v-model="form.name"
            placeholder="给图片起个名字"
          />
        </el-form-item>
        <el-form-item label="原创">
          <el-row>
            <el-switch
              v-model="form.is_creator"
            />
            <el-tooltip
              class="item"
              effect="dark"
              content="如果这幅画是你的作品，请勾选它！"
              placement="top"
            >
              <i class="el-icon-question"/>
            </el-tooltip>
            <div
              v-if="form.image"
              :style="{ backgroundImage: `url(${$resize(form.image.url, { width: 400, mode: 2 })})` }"
              class="preview-poster"
            />
          </el-row>
        </el-form-item>
        <el-form-item
          label="图片"
          prop="image"
        >
          <el-upload
            ref="singleUpload"
            :data="uploadHeaders"
            :on-error="handleImageUploadError"
            :on-success="handleSingleImageUploadSuccess"
            :before-upload="beforeSingleImageUpload"
            :on-remove="handleSingleImageRemove"
            :accept="imageUploadAccept"
            :action="imageUploadAction"
          >
            <el-button
              :loading="submitting"
              size="small"
              round
            >选择图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submitting"
            type="primary"
            size="small"
            @click="submitSingleImage"
          >
            确认上传
          </el-button>
        </el-form-item>
      </template>
    </template>
  </el-form>
</template>

<script>
import uploadMixin from "~/mixins/upload";
import ImageApi from "~/api/imageApi";

export default {
  name: "UploadImageForm",
  mixins: [uploadMixin],
  props: {
    appendAlbums: {
      type: Array,
      default: () => []
    },
    selectedBangumiId: {
      type: [Number, String],
      default: ""
    },
    selectedAlbumId: {
      type: [Number, String],
      default: ""
    },
    isCartoon: {
      type: Boolean,
      default: false
    },
    exceed: {
      type: Number,
      default: 7
    }
  },
  data() {
    const validateImage = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择要上传的图片"));
      }
      callback();
    };
    const validateImages = (rule, value, callback) => {
      if (!value.length) {
        return callback(new Error("至少选择一张图片"));
      }
      callback();
    };
    return {
      submitting: false,
      fetchingAlbum: false,
      pendingUpload: 0,
      form: {
        name: "",
        album_id: this.selectedAlbumId,
        bangumi_id: this.bangumiId,
        is_cartoon: false,
        is_creator: false,
        image: null,
        images: []
      },
      rule: {
        image: [{ validator: validateImage, trigger: "submit" }],
        images: [{ validator: validateImages, trigger: "submit" }]
      }
    };
  },
  computed: {
    albums() {
      return this.$store.state.image.albums;
    },
    selectionAlbum() {
      return this.appendAlbums.concat(this.albums);
    },
    currentUserId() {
      return this.$store.state.user.id;
    }
  },
  mounted() {
    this.getUpToken();
    if (!this.selectionAlbum.length) {
      this.getUserAlbum();
    }
  },
  methods: {
    async getUserAlbum() {
      if (this.fetchingAlbum) {
        return;
      }
      this.fetchingAlbum = true;
      try {
        await this.$store.dispatch("image/userAlbum", {
          ctx: this
        });
      } finally {
        this.fetchingAlbum = false;
      }
    },
    beforeSingleImageUpload(file) {
      this.uploadConfig.max = 5;
      this.uploadConfig.pathPrefix = `user/${this.currentUserId}/image`;
      return this.beforeImageUpload(file);
    },
    handleSingleImageUploadSuccess(res) {
      this.form.image = {
        url: res.data.key,
        width: res.data.width,
        height: res.data.height,
        size: res.data.size,
        type: res.data.type
      };
      this.$toast.success("封面上传成功");
    },
    handleSingleImageRemove() {
      this.form.image = null;
    },
    submitSingleImage() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.name.length > 30) {
            this.$toast.error("名字最长 30 个字");
            return;
          }
          if (this.submitting) {
            return;
          }
          this.submitting = true;
          const api = new ImageApi(this);
          api
            .uploadSingleImage(Object.assign({}, this.form, this.form.image))
            .then(id => {
              this.form.name = "";
              this.form.is_creator = false;
              this.form.image = null;
              this.$refs.singleUpload.clearFiles();
              this.$toast.success("创建成功");
              this.submitting = false;
              window.location = `/pins/${id}`;
            })
            .catch(err => {
              this.$toast.error(err);
              this.submitting = false;
            });
        } else {
          return false;
        }
      });
    },
    handleManyImageRemove(file) {
      if (this.submitting) {
        return;
      }
      this.form.images.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.form.images.splice(index, 1);
        }
      });
    },
    beforeManyImageUpload(file) {
      this.form.images.push({
        raw: file,
        name: file.name,
        size: file.size,
        uid: file.uid,
        percentage: 0,
        status: "uploading"
      });
      this.uploadConfig.max = 5;
      this.uploadConfig.pathPrefix = `user/${this.currentUserId}/album/${
        this.form.album_id
      }/image`;
      this.pendingUpload++;
      return this.beforeImageUpload(file);
    },
    handleManyImageUploadSuccess(res, file) {
      this.form.images.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.form.images[index] = Object.assign(item, {
            data: res.data,
            width: res.data.width,
            height: res.data.height,
            size: res.data.size,
            type: res.data.type,
            url: this.$resize(res.data.key, { width: 160 }),
            status: "success"
          });
        }
      });
      this.pendingUpload--;
    },
    handleManyUploadError(err, file) {
      console.log(err);
      this.$toast.error(`图片：${file.name} 上传失败`);
      this.form.images.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.form.images.splice(index, 1);
        }
      });
      this.pendingUpload--;
    },
    handleManyExceed() {
      this.$toast.error(`一次最多可上传 ${this.exceed} 张图片!`);
    },
    submitManyImage() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.submitting) {
            return;
          }
          this.submitting = true;
          const api = new ImageApi(this);
          const albumId = this.form.album_id;
          api
            .uploadManyImage({
              album_id: albumId,
              images: this.form.images.map(_ => {
                return {
                  url: _.url
                    .split("calibur.tv/")
                    .pop()
                    .split("?")[0],
                  size: _.size,
                  type: _.type,
                  width: _.width,
                  height: _.height
                };
              })
            })
            .then(() => {
              this.form.album_id = "";
              this.form.images = [];
              this.$refs.manyUpload.clearFiles();
              this.$toast.success("上传成功");
              this.submitting = false;
              if (
                this.$route.name === "image-show" &&
                !(this.$route.params.id - albumId)
              ) {
                window.location.reload();
              } else {
                window.location = `/pins/${albumId}`;
              }
            })
            .catch(err => {
              this.$toast.error(err);
              this.submitting = false;
              if (/审核/.test(err)) {
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
