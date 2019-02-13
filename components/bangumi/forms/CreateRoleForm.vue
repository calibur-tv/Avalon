<style lang="scss">
#edit-idol-form {
  .el-alert__content {
    span {
      display: block;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    p {
      line-height: 20px;
      font-size: 13px;
      margin-bottom: 5px;
    }
  }
}
</style>

<template>
  <div id="edit-idol-form">
    <template v-if="isBoss">
      <el-alert
        :closable="false"
        type="info"
        title="发行规则"
        style="margin-bottom:15px"
      >
        <p>每次增发的股份，不能小于 {{ minLevel }} 股</p>
        <p>现阶段，不支持以每股价格低于 1.00 或高于 10.00 的价格进行增发</p>
        <p>若已售出股份小于 4000，则每次发行的股值不能低于总市值的 25%，否则发行的股值不能低于总市值的 10%</p>
      </el-alert>
      <el-alert
        :closable="false"
        type="info"
        title="当前数据"
        style="margin-bottom:15px"
      >
        <p>当前每股的价格：{{ editStockForm.stock_price }}</p>
        <p>当前总发行股份：{{ editStockForm.max_stock_count || '未设上限' }}</p>
        <p>当前已售出股份：{{ editStockForm.star_count }}</p>
      </el-alert>
      <el-alert
        :closable="false"
        style="margin-bottom:15px"
        title="变更方式"
        type="warning"
      >
        <p>确认之后，将会发布一条公开提案，只要有超过 2/3 的票数表决同意，就会自动增发股票</p>
        <p>2/3 的票数指的是每个持股人的权重不同，不是按照投票的人数来，而是按照持有股份的份额来决定</p>
      </el-alert>
      <el-form label-width="80px">
        <el-form-item
          label="每股股价"
          prop="stock_price"
        >
          <el-input-number
            v-model="editStockForm.new_price"
            :min="1"
            :max="10"
            :step="0.01"
          />
        </el-form-item>
        <el-form-item
          label="增发数额"
          prop="max_stock_count"
        >
          <el-input-number
            v-model="editStockForm.add_stock_count"
            :step="1"
            :min="minLevel"
          />
        </el-form-item>
        <el-form-item>
          <p>最低增发市值：￥{{ minAddPrice }}&nbsp;，当前增发市值：￥{{ curAddPrice }}&nbsp;，增发后总市值：￥{{ totalMarketPrice }}</p>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submitting"
            type="primary"
            @click="changeIdolStock"
          >确认发布提案</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template v-if="isMaster">
      <el-alert
        :closable="false"
        title="目前只有版主可以编辑偶像"
        style="margin-bottom:15px"
        type="warning"
      />
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :disabled="submitting"
        label-width="80px"
      >
        <el-form-item
          v-if="isCreate"
          label="偶像名称"
          prop="name"
        >
          <el-input
            v-model.trim="form.name"
            placeholder="偶像的中文名"
          />
        </el-form-item>
        <el-form-item
          label="偶像别名"
          prop="alias"
        >
          <el-select
            v-model="form.alias"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="角色的其它名字，如：英文名、日文名"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item
          label="偶像头像"
          prop="avatar"
        >
          <img
            v-if="form.avatar"
            :src="$resize(form.avatar, { width: 200 })"
            class="avatar"
            style="width: 100px;height: 100px;"
          >
          <el-upload
            ref="upload"
            :data="uploadHeaders"
            :action="imageUploadAction"
            :accept="imageUploadAccept"
            :on-error="handleImageUploadError"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
          >
            <el-button size="mini">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="偶像简介"
          prop="intro"
        >
          <el-input
            v-model.trim="form.intro"
            :rows="10"
            type="textarea"
            placeholder="请输入角色简介"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submitting"
            type="primary"
            @click="submitEditProfile"
          >确认提交</el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import uploadMixin from '~/mixins/upload'
import {
  createRole,
  editRole,
  createMarketPriceDraft
} from '~/api/cartoonRoleApi'

export default {
  name: 'CreateRoleForm',
  mixins: [uploadMixin],
  props: {
    isMaster: {
      type: Boolean,
      default: true
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    bangumiId: {
      type: [Number, String],
      default: 0
    },
    role: {
      type: Object,
      default: null
    },
    isBoss: {
      type: Boolean,
      default: false
    },
    minLevel: {
      type: Number,
      default: 500
    }
  },
  data() {
    const validateAlias = (rule, value, callback) => {
      if (!value || !value.length) {
        return callback(new Error('至少填写 1 个别名'))
      }
      if (value.length > 5) {
        return callback(new Error('最多填写 5 个别名'))
      }
      if (value.join('').length > 200) {
        return callback(new Error('最多 200 字'))
      }
      callback()
    }
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请先填写角色名称'))
      }
      if (value.length > 35) {
        return callback(new Error('名称最长 35 个字'))
      }
      callback()
    }
    const validateDesc = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请先填写角色简介'))
      }
      if (value.length > 400) {
        return callback(new Error('简介最多 400 个字'))
      }
      callback()
    }
    const validateAvatar = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请先上传头像'))
      }
      callback()
    }
    return {
      form: {
        bangumi_id: this.bangumiId,
        name: this.role ? this.role.name : '',
        alias: this.role ? this.role.alias.split(',') : [],
        avatar: this.role ? this.role.avatar : '',
        intro: this.role ? this.role.intro : '',
        stock_price: this.role ? this.role.stock_price : '',
        max_stock_count: this.role ? +this.role.max_stock_count || '未设置' : ''
      },
      editStockForm: this.role
        ? {
            star_count: this.role.star_count,
            stock_price: +this.role.stock_price,
            max_stock_count: +this.role.max_stock_count,
            market_price: +this.role.market_price,
            new_price: this.role.stock_price,
            add_stock_count: this.minLevel
          }
        : null,
      rules: {
        name: [{ validator: validateName, trigger: 'submit' }],
        intro: [{ validator: validateDesc, trigger: 'submit' }],
        avatar: [{ validator: validateAvatar, trigger: 'submit' }],
        alias: [{ validator: validateAlias, trigger: 'submit' }]
      },
      submitting: false
    }
  },
  computed: {
    minAddPrice() {
      if (!this.editStockForm) {
        return 0
      }
      let result
      if (this.editStockForm.star_count < 4000) {
        result = this.editStockForm.market_price * 0.25
      } else {
        result = this.editStockForm.market_price * 0.1
      }
      if (result < this.minLevel) {
        return parseFloat(this.minLevel).toFixed(2)
      }
      return parseFloat(result).toFixed(2)
    },
    curAddPrice() {
      if (!this.editStockForm.new_price) {
        return 0
      }
      return parseFloat(
        this.editStockForm.new_price * this.editStockForm.add_stock_count
      ).toFixed(2)
    },
    totalMarketPrice() {
      if (!this.role) {
        return 0
      }
      return parseFloat(+this.role.market_price + +this.curAddPrice).toFixed(2)
    },
    maxStockCount() {
      if (!this.role) {
        return 0
      }
      return +this.role.max_stock_count + this.editStockForm.add_stock_count
    }
  },
  methods: {
    submitEditProfile() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.submitting) {
            return
          }
          this.submitting = true
          const name = this.form.name
          try {
            const params = {
              bangumi_id: this.form.bangumi_id,
              name: name,
              intro: this.form.intro,
              avatar: this.form.avatar.split('.calibur.tv/').pop(),
              alias: [name]
                .concat(this.form.alias.filter(_ => _ !== name))
                .toString()
            }
            if (typeof params.alias !== 'string') {
              params.alias = params.alias.join(',')
            }
            if (this.isCreate) {
              const id = await createRole(this, params)
              this.$refs.form.resetFields()
              this.$refs.upload.clearFiles()
              this.$toast.success('创建成功').then(() => {
                window.open(this.$alias.cartoonRole(id))
              })
            } else {
              await editRole(
                this,
                Object.assign(params, {
                  id: this.role.id
                })
              )
              this.$emit('success')
            }
          } catch (err) {
            this.$toast.error(err)
          } finally {
            this.submitting = false
          }
        } else {
          return false
        }
      })
    },
    beforeAvatarUpload(file) {
      this.uploadConfig.max = 1
      this.uploadConfig.pathPrefix = `bangumi/${this.bangumiId}/role`
      return this.beforeImageUpload(file)
    },
    handleAvatarSuccess(res) {
      this.$toast.success('上传成功')
      this.form.avatar = res.data.url
    },
    async changeIdolStock() {
      if (!this.curAddPrice) {
        this.$toast.error('请先定价')
        return
      }
      if (this.curAddPrice - this.minAddPrice < 0) {
        this.$toast.error('不能定价太低')
        return
      }
      if (this.submitting) {
        return
      }
      this.submitting = true
      try {
        await createMarketPriceDraft(this, {
          idol_id: this.role.id,
          add_stock_count: this.editStockForm.add_stock_count,
          stock_price: this.editStockForm.new_price
        })
        this.$toast.success('修改成功')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (e) {
        this.submitting = false
      }
    }
  }
}
</script>
