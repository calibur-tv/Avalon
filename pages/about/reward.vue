<style lang="scss">
#reward {
  .center-content {
    width: 600px;
  }

  .calibur {
    text-align: center;
    font-size: 20px;
  }

  .qr-code {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .alipay,
  .wechat {
    padding: 30px;
    margin: 0 30px;

    img {
      width: 150px;
      height: 150px;
      display: block;
      margin: 0 auto;
    }

    p {
      margin-top: 20px;
      text-align: center;
      color: #fff;
      font-weight: bold;
    }
  }

  .alipay {
    background-color: RGB(31, 144, 230);
  }

  .wechat {
    background-color: RGB(81, 181, 86);
  }
}
</style>

<template>
  <div id="reward">
    <v-header />
    <div class="container">
      <h3 class="sub-title">
        就算是1块钱的捐助，也能让 calibur 更好的发展
      </h3>
      <div class="qr-code">
        <div class="alipay">
          <img src="~assets/img/alipay.png" />
          <p>支付宝</p>
        </div>
        <div class="wechat">
          <img src="~assets/img/wechat.png" />
          <p>微信</p>
        </div>
      </div>
      <br />
      <p>
        若您因为种种原因无法捐款，您仍可以通过其他方式为 calibur
        的发展做出贡献（帮助宣传等）
      </p>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reward',
  head: {
    title: '捐赠'
  }
}
</script>
