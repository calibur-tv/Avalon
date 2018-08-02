<style lang="scss">
#bangumi-edit {
  header {
    text-align: right;
  }
}
</style>

<template>
  <div
    v-loading="loading"
    id="bangumi-edit"
  >
    <template v-if="form">
      <header v-if="id">
        <el-button
          :type="form.deleted_at ? 'success' : 'danger'"
          size="small"
          icon="delete"
          @click="handleDelete"
        >{{ form.deleted_at ? '恢复' : '删除' }}</el-button>
        <el-button
          size="small"
          icon="upload2"
          type="warning"
          @click="updateRelease"
        >更新视频资源</el-button>
      </header>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="番剧名称"
          prop="name"
        >
          <el-col :span="8">
            <el-input
              v-model.trim="form.name"
              placeholder="中文名"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          label="番剧别名"
          prop="alias"
          required
        >
          <el-input
            v-model.trim="form.alias"
            type="textarea"
            placeholder="中文名、日文名、英文名... 名字之间以逗号分隔"
          />
        </el-form-item>
        <el-form-item label="连载周期">
          <el-select
            v-model="form.released_at"
            placeholder="请选择"
          >
            <el-option
              v-for="item in releaseWeekly"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="外站视频">
          <el-switch v-model="form.others_site_video"/>
        </el-form-item>
        <el-form-item label="已完结">
          <el-switch v-model="form.end"/>
        </el-form-item>
        <el-form-item label="有视频">
          <el-switch v-model="form.has_video"/>
        </el-form-item>
        <el-form-item label="有漫画">
          <el-switch v-model="form.has_cartoon"/>
        </el-form-item>
        <el-form-item
          label="上映日期"
          prop="published_at"
          required
        >
          <el-date-picker
            v-model="form.published_at"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item
          label="番剧标签"
          prop="tags"
          required
        >
          <el-select
            v-model="form.tags"
            style="width: 100%"
            multiple
            placeholder="可多选，至少选择一个"
          >
            <el-option
              v-for="item in tags"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="番剧头像"
          prop="avatar"
          required
        >
          <el-col :span="16">
            <el-input
              v-model.trim="form.avatar"
              :disabled="true"
              auto-complete="off"
            >
              <template slot="prepend">https://image.calibur.tv/</template>
            </el-input>
          </el-col>
          <el-col
            :span="2"
            :offset="1"
          >
            <el-form-item>
              <el-upload
                :data="uploadHeaders"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="imageUploadAction"
              >
                <el-button type="text">
                  <i class="el-icon-plus"/>
                  上传
                </el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col
            v-if="form.avatar"
            :span="2"
          >
            <el-popover
              ref="popoverAvatar"
              placement="left"
              width="200"
              trigger="hover">
              <img :src="imagePrefix + form.avatar">
            </el-popover>
            <a
              v-popover:popoverAvatar
              :href="imagePrefix + form.avatar"
              type="text"
              target="_blank"
            >
              <i class="el-icon-view"/>&nbsp;预览
            </a>
          </el-col>
        </el-form-item>
        <el-form-item
          label="番剧背景"
          prop="banner"
          required
        >
          <el-col :span="16">
            <el-input
              v-model.trim="form.banner"
              :disabled="true"
              auto-complete="off"
            >
              <template slot="prepend">https://image.calibur.tv/</template>
            </el-input>
          </el-col>
          <el-col
            :span="2"
            :offset="1"
          >
            <el-form-item>
              <el-upload
                :data="uploadHeaders"
                :show-file-list="false"
                :on-success="handleBannerSuccess"
                :before-upload="beforeBannerUpload"
                :action="imageUploadAction"
              >
                <el-button type="text">
                  <i class="el-icon-plus"/>
                  上传
                </el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col
            v-if="form.banner"
            :span="2"
          >
            <el-popover
              ref="popoverBanner"
              placement="left"
              width="200"
              trigger="hover"
            >
              <img :src="imagePrefix + form.banner">
            </el-popover>
            <a
              v-popover:popoverBanner
              :href="imagePrefix + form.banner"
              type="text"
              target="_blank"
            >
              <i class="el-icon-view"/>&nbsp;预览
            </a>
          </el-col>
        </el-form-item>
        <el-form-item
          label="季度信息"
          prop="season"
        >
          <el-input
            v-model.trim="form.season"
            :rows="2"
            type="textarea"
            placeholder="请输入番剧季度信息，JSON格式，包含 part，time，name, re 字段"
          />
        </el-form-item>
        <el-form-item>
          <el-collapse>
            <el-collapse-item title="季度信息介绍：">
              <div>1. 这个字段可为空</div>
              <div>2. part 是多个数组（区间），代表季度的集数，比如第一季是1 ~ 12, 第二季是 13 ~ 24，那么 part = [0, 12, 24]</div>
              <div>3. 第一个 0 代表从第一集开始，12 - 0 = 12，24 -12 = 12，代表第一季有12集，第二季有12集</div>
              <div>4. time 和 name 代表该季度的上映日期和名称，如果没有特殊名称，就填写'第一季、第二季'</div>
              <div>5. 假设 part 有 N 个，那么 time 和 name 就有 N - 1 个，因此 part 至少是两个</div>
              <div>6. part 必须是升序排列的，从 0 开始，当番剧未完结时，最后一位是 -1</div>
              <div>7. re 代表每个季度之间的集数是否重排，如果是 1 则重拍，如果是 0 或不填则不重排</div>
              <div>9. re 也可以和 name 是一个数组，但它的长度必须和 name 一样，并且每一项都是 0 或 1</div>
              <div>9. 关于 JSON，你可能需要在这里进行格式校验：
                <a
                  href="http://www.json.cn/"
                  target="_blank"
                >JSON格式化工具</a>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
        <el-form-item
          label="番剧简介"
          prop="summary"
        >
          <el-input
            v-model.trim="form.summary"
            :rows="4"
            type="textarea"
            placeholder="请输入番剧简介，最多250字，纯文本不支持各种换行符"
          />
        </el-form-item>
        <el-form-item>
          <el-col
            :span="3"
            :offset="21"
          >
            <el-button
              type="primary"
              @click="submitForm"
            >{{ id ? '确认编辑' : '立即创建' }}</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import Api from "~/api/adminApi";
import BangumiApi from "~/api/bangumiApi";
import uploadMixin from "~/mixins/upload";

export default {
  mixins: [uploadMixin],
  data() {
    const id = +(this.$route.params.id || 0);
    const validateTags = (rule, value, callback) => {
      if (!value || !value.length) {
        return callback(new Error("至少保留 1 个标签"));
      }
      if (value.length > 10) {
        return callback(new Error("最多选择 10 个标签"));
      }
      callback();
    };
    const validateAlias = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入番剧别名"));
      } else if (value.split(/,|，/).length <= 1) {
        callback(new Error("请输入多个别名，用逗号分隔"));
      } else {
        callback();
      }
    };
    const validateSeason = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        try {
          const season = JSON.parse(value);
          const name = season.name;
          const part = season.part;
          const time = season.time;
          if (!name) {
            callback(new Error("缺少季度名称"));
          }
          if (!part) {
            callback(new Error("缺少季度集数"));
          }
          if (!time) {
            callback(new Error("缺少季度日期"));
          }
          if (!Array.isArray(time)) {
            callback(new Error("日期必须是数组（区间）"));
          }
          if (!Array.isArray(part)) {
            callback(new Error("集数必须是数组（区间）"));
          }
          if (!Array.isArray(name)) {
            callback(new Error("名称必须是数组（区间）"));
          }
          if (!time.every(eif => /^\d{4}\.\d{1,2}$/.test(eif))) {
            callback(
              new Error(
                "时间的格式应精确到月份，年与月用点号隔开，如 2018.10 或 2018.2"
              )
            );
          }
          if (!part.every(item => typeof item === "number")) {
            callback(new Error("集数必须都是数字"));
          }
          if (time.length !== name.length) {
            callback(new Error("名称的个数必须和日期的个数相同"));
          }
          if (part.length < 2) {
            callback(new Error("集数至少是两位数"));
          }
          if (part.length !== time.length + 1) {
            callback(new Error("集数的个数要比时间和名称的个数多一个"));
          }
          if (
            !part.every((item, index, arr) => {
              if (index) {
                if (index === arr.length - 1) {
                  return item === -1 || item > arr[index - 1];
                } else {
                  return item > arr[index - 1];
                }
              } else {
                return item === 0;
              }
            })
          ) {
            callback(new Error("part 要从 0 开始，升序排列，最后一项可为 -1"));
          }
          if (!season.re) {
            callback();
            return;
          }
          if (typeof season.re !== "number" && !Array.isArray(season.re)) {
            callback(new Error("re 必须是数字 0 和 1 或者一个数组"));
            return;
          }
          if (
            typeof season.re === "number" &&
            (season.re !== 0 && season.re !== 1)
          ) {
            callback(new Error("re 必须是数字 0 和 1 或者一个数组"));
            return;
          }
          if (Array.isArray(season.re)) {
            if (season.re.length !== time.length) {
              callback(new Error("re 的个数要和时间的个数相同"));
              return;
            }
            if (
              season.re.some(_ => {
                return _ !== 0 && _ !== 1;
              })
            ) {
              callback(new Error("re 的每一项都必须是 0 或 1"));
              return;
            }
          }
          callback();
        } catch (e) {
          callback(new Error("不是标准的JSON格式"));
        }
      }
    };
    const validatePublish = (rule, value, callback) => {
      if (value === 0 || value === "") {
        callback(new Error("请选择上映日期"));
      } else {
        callback();
      }
    };
    return {
      loading: !!id,
      tags: [],
      releaseWeekly: [
        {
          id: 0,
          name: "不连载"
        },
        {
          id: 1,
          name: "周一"
        },
        {
          id: 2,
          name: "周二"
        },
        {
          id: 3,
          name: "周三"
        },
        {
          id: 4,
          name: "周四"
        },
        {
          id: 5,
          name: "周五"
        },
        {
          id: 6,
          name: "周六"
        },
        {
          id: 7,
          name: "周日"
        }
      ],
      form: null,
      rules: {
        name: [{ required: true, message: "请输入番剧名称", trigger: "blur" }],
        alias: [{ validator: validateAlias, trigger: "blur" }],
        published_at: [{ validator: validatePublish, trigger: "change" }],
        tags: [{ validator: validateTags, trigger: "change" }],
        season: [{ validator: validateSeason, trigger: "blur" }],
        summary: [
          { required: true, message: "简介不能为空", trigger: "blur" },
          { min: 1, max: 250, message: "最多250字", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    id() {
      return +(this.$route.params.id || 0);
    }
  },
  watch: {
    $route() {
      this.getBangumiById();
      this.getUpToken();
    }
  },
  created() {
    this.getBangumiById();
    this.getBangumiTags();
    this.getUpToken();
  },
  methods: {
    getBangumiById() {
      if (!this.id) {
        this.form = {
          name: "",
          alias: "",
          released_at: 0,
          published_at: "",
          tags: [],
          avatar: "",
          banner: "",
          season: "",
          summary: "",
          others_site_video: false,
          end: false,
          has_video: true,
          has_cartoon: false
        };
        return;
      }

      const api = new Api(this);
      api
        .bangumiInfo({
          id: this.id
        })
        .then(resp => {
          this.form = Object.assign(resp, {
            banner: resp.banner.split(".calibur.tv/").pop(),
            avatar: resp.avatar.split(".calibur.tv/").pop(),
            tags: resp.tags.map(_ => _.id)
          });
          this.loading = false;
        })
        .catch(err => {
          this.$toast.error(err);
          this.loading = false;
        });
    },
    getBangumiTags() {
      const api = new BangumiApi();
      api.tags().then(data => {
        this.tags = data;
      });
    },
    beforeAvatarUpload(file) {
      this.uploadConfig.max = 1;
      this.uploadConfig.pathPrefix = "bangumi/avatar";
      return this.beforeImageUpload(file);
    },
    beforeBannerUpload(file) {
      this.uploadConfig.max = 3;
      this.uploadConfig.pathPrefix = "bangumi/banner";
      return this.beforeImageUpload(file);
    },
    handleAvatarSuccess(res) {
      this.$toast.success("上传成功");
      this.form.avatar = res.data.key;
    },
    handleBannerSuccess(res) {
      this.$toast.success("上传成功");
      this.form.banner = res.data.key;
    },
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const api = new Api(this);
          const params = Object.assign({}, this.form, {
            published_at: new Date(this.form.published_at).getTime() / 1000
          });
          let jumpId = this.id;
          try {
            if (jumpId) {
              await api.bangumiEdit(params);
            } else {
              jumpId = await api.bangumiCreate(params);
            }
            this.$toast.success("操作成功");
            setTimeout(() => {
              window.open(this.$alias.bangumi(jumpId));
            }, 2000);
          } catch (e) {
            this.$toast.error("操作失败");
          }
        }
      });
    },
    updateRelease() {
      this.$prompt("请输入视频id", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^([1-9][0-9]*)$/,
        inputErrorMessage: "id 格式不正确"
      })
        .then(({ value }) => {
          const api = new Api(this);
          api
            .bangumiRelease({
              bangumi_id: this.id,
              video_id: value
            })
            .then(() => {
              this.$toast.success("更新成功");
            })
            .catch(e => {
              this.$toast.error(e);
            });
        })
        .catch(() => {});
    },
    handleDelete() {
      this.$confirm("确认要执行该操作吗?", "提示")
        .then(() => {
          const api = new Api(this);
          api
            .bangumiDelete({
              id: this.form.id
            })
            .then(() => {
              this.$toast.success("操作成功");
              this.form.deleted_at = !this.form.deleted_at;
            })
            .catch(() => {
              this.$toast.error("操作失败");
            });
        })
        .catch(() => {});
    }
  }
};
</script>
