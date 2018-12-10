<style lang="scss">
.first-sign-dialog {
  background-image: url('~/assets/img/first-sign-dialog-bg.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: none;
  font-family: Roboto, Helvetica Neue, Helvetica, Tahoma, Arial,
    FZLanTingHeiS-L-G, PingFang SC, Microsoft YaHei;

  .title {
    text-align: center;
    font-size: 42px;
    letter-spacing: 3px;
    line-height: 36px;
    color: rgb(0, 0, 0);
    margin-bottom: 30px;
    margin-top: 100px;
  }

  .content {
    width: 500px;
    font-size: 18px;
    color: #000;
    text-shadow: #c8c8c8 1px 1px 2px;
    text-align: center;
    line-height: 1.7em;
    font-weight: 100;
    margin: 0 auto;
  }

  .control {
    margin-top: 30px;
    text-align: center;

    button {
      height: 50px;
      padding-left: 46px;
      padding-right: 30px;
      font-size: 16px;
      line-height: 50px;
      border-radius: 25px;
      text-align: center;
      margin: 0 5px;
      color: #fff;
    }
  }
}
</style>

<template>
  <v-dialog
    v-model="show"
    :close="true"
    :header="false"
    :footer="false"
    :click-close="false"
    width="756px"
    height="420px"
    custom-class="first-sign-dialog"
  >
    <h3 class="title">欢迎来到「calibur.tv」</h3>
    <p class="content">
      使用你的“邀请码”带朋友一起来玩吧！<br>
      每邀请一个朋友加入，你就可以获得一枚金币<br>
      1金币=1人民币，满100就可以提现噢！
    </p>
    <div class="control">
      <a href="/about/hello">
        <button style="background-color: #00ce72">
          查看金币规则
          <i class="el-icon-arrow-right"/>
        </button>
      </a>
      <a
        :href="'/about/invite/' + currentUser.id"
        target="_blank"
      >
        <button style="background-color: gold">
          我的邀请码
          <i class="el-icon-arrow-right"/>
        </button>
      </a>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'FirstSignDialog',
  data() {
    return {
      show: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user
    }
  },
  mounted() {
    if (!this.$cookie.get('display-first-sign-dialog')) {
      try {
        if (!localStorage.getItem('display-first-sign-dialog')) {
          this.show = true
          this.$cookie.set('display-first-sign-dialog', 1, {
            expires: 7
          })
          localStorage.setItem('display-first-sign-dialog', 1)
        }
      } catch (e) {}
    }
  }
}
</script>
