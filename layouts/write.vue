<style lang="scss">
$layout-width: 900px;

#layout-write {
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    z-index: 999;

    .header-container {
      width: $layout-width;
      margin: 10px auto 0 auto;
    }

    .logo {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      vertical-align: middle;
    }

    .slogan {
      display: inline-block;
      vertical-align: middle;

      p {
        line-height: 20px;
      }
    }

    button {
      float: right;
      margin-top: 4px;
      margin-left: 15px;

      &.success {
        &:hover,
        &:focus {
          border-color: #67c23a;
          color: #67c23a;
        }
      }

      &.warning {
        &:hover,
        &:focus {
          border-color: #e6a23c;
          color: #e6a23c;
        }
      }

      &.danger {
        &:hover,
        &:focus {
          border-color: #f56c6c;
          color: #f56c6c;
        }
      }
    }
  }

  .main-view {
    flex-grow: 1;
    height: 100%;
    width: $layout-width;
    margin: 0 auto;
    padding-top: 100px;
  }

  .not-login {
    text-align: center;
    margin-top: 30vh;
  }

  .saving-flag {
    float: right;
    display: inline-block;
    line-height: 32px;
    margin-top: 4px;
  }
}
</style>

<template>
  <div
    v-loading="submitting"
    id="layout-write"
  >
    <header>
      <div class="header-container">
        <img
          :src="$resize('https://image.calibur.tv/owner/logo-new/logo.png', { width: 80 })"
          class="logo"
          alt="logo"
        >
        <div class="slogan">
          <p>calibur.tv</p>
          <p>天下漫友是一家</p>
        </div>
        <template v-if="user">
          <el-tooltip
            :content="user.nickname"
            placement="bottom"
            effect="dark"
          >
            <button class="avatar">
              <v-img
                :src="user.avatar"
                :avatar="true"
                :width="30"
                :height="30"
              />
            </button>
          </el-tooltip>
          <el-button
            size="small"
            icon="el-icon-share"
            class="primary"
            round
            plain
            @click="emitPublish"
          >{{ id ? '发布更新' : '发布' }}</el-button>
          <el-button
            v-if="!published"
            size="small"
            icon="el-icon-upload2"
            class="warning"
            plain
            round
            @click="emitSave"
          >保存</el-button>
          <el-button
            size="small"
            icon="el-icon-view"
            class="success"
            plain
            round
            @click="emitPreview"
          >预览</el-button>
          <span class="saving-flag">
            {{ saving === false ? '已保存' : saving === true ? '正在保存中...' : '' }}
          </span>
          <!--
          <el-button
            v-if="id"
            size="small"
            icon="el-icon-delete"
            class="danger"
            plain
            round
            @click="emitDestroy"
          >删除</el-button>
          -->
        </template>
      </div>
    </header>
    <template v-if="isAuth">
      <template v-if="user">
        <nuxt class="main-view"/>
        <v-dialog
          v-model="preview"
          :fullscreen="true"
          :header="false"
          :footer="false"
        >
          <div style="max-width: 700px;margin: 20px auto;">
            <json-content
              :show="preview"
              :content="sections"
            />
          </div>
        </v-dialog>
      </template>
      <div
        v-else
        class="main-view not-login"
      >
        <el-button
          type="primary"
          round
          @click="$channel.$emit('sign-in')"
        >
          继续操作前请先登录
        </el-button>
      </div>
    </template>
  </div>
</template>

<script>
import JsonContent from '~/components/jsonEditor/JsonContent'
import { Loading } from 'element-ui'

export default {
  name: 'WriteLayout',
  directives: {
    Loading
  },
  components: {
    JsonContent
  },
  data() {
    return {
      submitting: false,
      preview: false,
      saving: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    isAuth() {
      return this.$store.state.isAuth
    },
    user() {
      return this.$store.state.user
    },
    sections() {
      return this.$store.state.editor.sections
    },
    published() {
      return this.$store.state.editor.resource
        ? !!this.$store.state.editor.resource.published_at
        : false
    }
  },
  mounted() {
    this.$store.dispatch('initAuth')
    this.$store.dispatch('bangumi/getAllBangumi')
    this.$channel.$on('write-submit', result => {
      this.submitting = result
    })
    this.$channel.$on('auto-save', saving => {
      this.saving = saving
    })
  },
  methods: {
    emitPublish() {
      this.$channel.$emit('write-publish')
    },
    emitSave() {
      this.$channel.$emit('write-save')
    },
    emitPreview() {
      this.preview = true
    },
    emitDestroy() {
      this.$channel.$emit('write-destroy')
    }
  }
}
</script>
