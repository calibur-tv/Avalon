<style lang="scss">
  #no-content {
    img {
      width: 260px;
      height: 260px;
      margin-right: 50px;
      vertical-align: middle;
    }

    div {
      display: inline-block;
      vertical-align: middle;
    }

    h3 {
      color: rgb(51, 51, 51);
      font-size: 24px;
      margin: 20px 0;
      font-weight: 400;
      line-height: 24px;
    }

    p {
      color: rgb(102, 102, 102);
      margin-bottom: 7px;
      font-size: 14px;
      line-height: 20px;
    }
  }
</style>

<template>
  <div id="no-content">
    <img src="https://image.calibur.tv/owner/no_content.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/500/h/500" alt="no-content">
    <div>
      <h3>暂无内容</h3>
      <p>抱歉，该页面暂无内容，请看看其他页面</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoContent',
    props: {

    },
    data () {
      return {

      }
    }
  }
</script>
