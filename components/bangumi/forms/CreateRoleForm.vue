<style lang="scss">
#edit-role-form {
  .edit-btn-wrap {
    height: 105px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<template>
  <el-form
    id="edit-role-form"
    ref="form"
    :model="form"
    :rules="rules"
    :disabled="submitting"
    label-width="40px"
  >
    <el-form-item
      v-if="isCreate || isAdmin"
      label="名称"
      prop="name"
    >
      <el-input
        v-model.trim="form.name"
        placeholder="角色的中文名"
      />
    </el-form-item>
    <el-form-item
      label="别名"
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
      label="头像"
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
      label="简介"
      prop="intro"
    >
      <el-input
        v-model.trim="form.intro"
        :rows="10"
        type="textarea"
        placeholder="请输入角色简介"
      />
    </el-form-item>
    <template v-if="isBoss && role">
      <el-row>
        <el-col :span="18">
          <el-form-item
            label="股价"
            prop="stock_price"
          >
            <el-input
              v-if="role.is_locked"
              v-model="form.stock_price"
              :disabled="true"
            >
              <template slot="prepend">每股售价</template>
              <template slot="append">个虚拟币</template>
            </el-input>
            <el-input-number
              v-else
              v-model="form.stock_price"
              :step="0.01"
              :min="1"
              :max="10"
              :disabled="true"
            />
          </el-form-item>
          <el-form-item
            label="股数"
            prop="max_stock_count"
          >
            <el-input
              v-model="form.max_stock_count"
              :disabled="true"
            >
              <template slot="prepend">总共发行</template>
              <template slot="append">股</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          class="edit-btn-wrap"
        >
          <el-button
            round
            @click="openEditStockDialog"
          >
            点击增发股份
          </el-button>
        </el-col>
      </el-row>
    </template>
    <el-form-item>
      <el-button
        :loading="submitting"
        type="primary"
        @click="submit"
      >确认提交</el-button>
    </el-form-item>
    <v-dialog
      v-if="editStockForm"
      v-model="showEditStockDialog"
      title="修改股份发行信息"
      width="560px"
      @submit="handleStockChange"
    >
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
        type="info"
        title="发行规则"
        style="margin-bottom:15px"
      >
        <p>每次增发的股份，不能小于 1000 股</p>
        <p>现阶段，不支持以每股价格低于 1.00 或高于 10.00 的售价进行发售</p>
        <p>若已售出股份小于 4000，则每次发行的股值不能低于总市值的 25%，否则发行的股值不能低于总市值的 10%</p>
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
            :min="500"
          />
        </el-form-item>
        <p>最低发售价值：{{ minAddPrice }}&nbsp;，当前发售价值：{{ curAddPrice }}</p>
      </el-form>
    </v-dialog>
  </el-form>
</template>

<script>
import uploadMixin from '~/mixins/upload'
import { createRole, editRole } from '~/api/cartoonRoleApi'

export default {
  name: 'CreateRoleForm',
  mixins: [uploadMixin],
  props: {
    isAdmin: {
      type: Boolean,
      default: false
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
            add_stock_count: 500
          }
        : null,
      rules: {
        name: [{ validator: validateName, trigger: 'submit' }],
        intro: [{ validator: validateDesc, trigger: 'submit' }],
        avatar: [{ validator: validateAvatar, trigger: 'submit' }],
        alias: [{ validator: validateAlias, trigger: 'submit' }]
      },
      submitting: false,
      showEditStockDialog: false
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
      if (result < 500) {
        return parseFloat(500).toFixed(2)
      }
      return parseFloat(result).toFixed(2)
    },
    curAddPrice() {
      return parseFloat(
        this.editStockForm.new_price * this.editStockForm.add_stock_count
      ).toFixed(2)
    }
  },
  methods: {
    handleStockChange() {
      if (this.curAddPrice - this.minAddPrice < 0) {
        this.$toast.error('不能定价太低')
        return
      }
      this.form.stock_price = this.editStockForm.new_price
      if (typeof this.form.max_stock_count === 'string') {
        this.form.max_stock_count = this.editStockForm.add_stock_count
      } else {
        this.form.max_stock_count =
          this.form.max_stock_count + this.editStockForm.add_stock_count
      }
      this.showEditStockDialog = false
      this.$toast.success('保存成功，提交之后生效')
    },
    submit() {
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
            if (this.form.stock_price) {
              params.stock_price = this.form.stock_price
              params.max_stock_count = this.form.max_stock_count
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
    openEditStockDialog() {
      this.form.stock_price = this.role ? this.role.stock_price : ''
      this.form.max_stock_count = this.role
        ? +this.role.max_stock_count || '未设置'
        : ''
      this.showEditStockDialog = true
    },
    beforeAvatarUpload(file) {
      this.uploadConfig.max = 1
      this.uploadConfig.pathPrefix = `bangumi/${this.bangumiId}/role`
      return this.beforeImageUpload(file)
    },
    handleAvatarSuccess(res) {
      this.$toast.success('上传成功')
      this.form.avatar = res.data.url
    }
  }
}
</script>
