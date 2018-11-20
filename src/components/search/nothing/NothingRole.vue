<template>
  <div class="search-nothing-role">
    <no-content>
      <el-button
        type="primary"
        round
        @click="openFeedback"
      >没有找到你的偶像？</el-button>
    </no-content>
  </div>
</template>

<script>
export default {
  name: 'SearchNothingRole',
  methods: {
    openFeedback() {
      this.$channel.$emit('open-feedback', {
        type: 6,
        desc: `我想要为 {?} 应援`,
        placeholder: '请填写要应援的偶像'
      })
    }
  }
}
</script>
