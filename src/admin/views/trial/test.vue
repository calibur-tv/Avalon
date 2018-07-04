<style lang="scss">
  #trial-test {
    .title {
      margin-bottom: 20px;
      color: $color-text-normal;

      .label {
        font-weight: bold;
        font-size: 20px;
        color: $color-text-deep;
      }
    }

    .result {
      margin-top: 20px;
      margin-left: 5px;

      >div {
        margin-top: 10px;
      }

      .label {
        font-weight: bold;
        margin-bottom: 5px;
      }

      p {
        margin-top: 5px;
        font-size: 13px;
      }
    }
  }
</style>

<template>
  <div id="trial-test">
    <p class="title">
      <span class="label">图片测试：</span>
      测试一张图片是否是色情、政治敏感、涉及暴恐
    </p>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-input
          v-model.trim="imageUrl"
          placeholder="输入图片地址"
        />
      </el-col>
      <el-col :span="4">
        <el-button
          :loading="testing"
          type="primary"
          @click="imageTest"
        >点击测试</el-button>
      </el-col>
    </el-row>
    <div
      v-if="imageResult"
      class="result"
    >
      <div>
        <span class="label">色情</span>
        <p>检测：{{ imageResult.sex.success ? '成功' : '失败' }}</p>
        <p>状态：{{ imageResult.sex.label }}</p>
        <p>审核：{{ imageResult.warn.review ? '需要' : '不需要' }}</p>
      </div>
      <div>
        <span class="label">暴恐</span>
        <p>检测：{{ imageResult.warn.success ? '成功' : '失败' }}</p>
        <p>状态：{{ imageResult.warn.label }}</p>
        <p>审核：{{ imageResult.warn.review ? '需要' : '不需要' }}</p>
      </div>
      <div>
        <span class="label">政治敏感</span>
        <p>检测：{{ imageResult.daddy.success ? '成功' : '失败' }}</p>
        <p>信息：{{ imageResult.daddy.message }}</p>
        <p>审核：{{ imageResult.daddy.review ? '需要' : '不需要' }}</p>
      </div>
    </div>
    <p
      class="title"
      style="margin-top: 30px"
    >
      <span class="label">文本测试：</span>
      测试一段文本中是否有敏感词句
    </p>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-input
          v-model.trim="content"
          :rows="6"
          type="textarea"
          placeholder="输入文本内容"
        />
      </el-col>
      <el-col :span="4">
        <el-button
          :loading="testing"
          type="primary"
          @click="textTest"
        >点击测试</el-button>
      </el-col>
    </el-row>
    <div
      v-if="textResult"
      class="result"
    >
      <div>
        <span class="label">标记文本：</span>
        <p v-html="textResult.text"/>
      </div>
      <div>
        <span class="label">敏感词：</span>
        <p>
          <el-tag
            v-for="(tag, index) in textResult.filters"
            :key="index"
            type="danger"
            v-text="tag"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '~/api/adminApi'

  export default {
    data () {
      return {
        imageUrl: '',
        content: '',
        testing: false,
        imageResult: null,
        textResult: null
      }
    },
    methods: {
      async imageTest () {
        if (!this.imageUrl) {
          return
        }
        if (!/^http(|s):\/\//.test(this.imageUrl)) {
          return
        }
        if (this.testing) {
          return
        }
        this.testing = true
        this.imageResult = null
        const api = new Api(this)
        try {
          this.imageResult = await api.trialTestImage({
            url: this.imageUrl.split('?')[0]
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.testing = false
        }
      },
      async textTest () {
        if (!this.content) {
          return
        }
        if (this.testing) {
          return
        }
        this.testing = true
        this.textResult = null
        const api = new Api(this)
        try {
          this.textResult = await api.trialTestText({
            text: this.content
          })
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.testing = false
        }
      }
    }
  }
</script>
