<style lang="scss">
#about-hello {
  h1 {
    margin-bottom: 16px;
    margin-top: 16px;
    color: #333;
    font-size: 24px;
  }

  h3 {
    margin-top: 15px;
    color: #333;
    font-size: 18px;
    position: relative;
    padding-left: 12px;
    margin-bottom: 20px;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background-color: $color-blue-normal;
      border-radius: 3px;
    }
  }

  p {
    color: #333;
    font-size: 14px;
    text-indent: 2em;
    margin-top: 5px;
    line-height: 20px;
  }

  ul {
    margin: 10px 0 5px 25px;

    li {
      list-style-type: disc;
      font-size: 14px;
      color: #666;
      line-height: 25px;
      float: none;
    }

    a {
      font-size: 14px;
      color: $color-blue-normal;
    }
  }
}
</style>

<template>
  <div id="about-hello">
    <v-header type="banner" />
    <v-layout>
      <h1>欢迎来到 calibur.tv</h1>
      <p>
        在开始之前，你应该了解一下这个网站的规则，这有助于让你得到更好使用的体验，让我们开始吧！
      </p>
      <h3>虚拟币：</h3>
      <p><strong>仔细阅读这一部分，这会对你有很大的帮助</strong></p>
      <ul>
        <li>站内流通着一种虚拟货币，它与人民币是一比一的恒定汇率</li>
        <li>
          虚拟币分两种，一种是不可提现的<strong>「团子」</strong>，另一种是可以提现的<strong
            >「光玉」</strong
          >
        </li>
        <li>1团子 = 1光玉 = 1人民币</li>
        <li>
          团子可以通过：
          <el-button
            size="mini"
            type="success"
            round
            plain
            @click="$toast.success('在个人主页右侧可签到~')"
          >
            每日签到
          </el-button>
          <el-button
            size="mini"
            type="primary"
            round
            plain
            @click="$toast.success('每天多来站里玩玩就会获得团子~')"
          >
            每日活跃提升战斗力
          </el-button>
          <el-button
            size="mini"
            type="danger"
            round
            plain
            @click="$toast.success('在个人页面右侧有你的邀请码~')"
          >
            邀请他人加入小站
          </el-button>
          获得
        </li>
        <li>光玉只能通过你自己发表优质的原创内容，让别人投食给你</li>
        <li>投食会消耗团子，投食者团子-1，这个团子会变成光玉，创作者光玉+1</li>
        <li><strong>满100光玉就可以召唤站长来提现了</strong></li>
        <li>
          提现是需要对内容进行审核的，如果你发表过「不利于社区发展」的内容，或者你的内容是「抄袭」而来的，你是无法提现的
        </li>
        <li>提现目前只支持支付宝转账，更多提现方法后续会研发</li>
      </ul>
      <h3>交流反馈：</h3>
      <p>由于个人能力有限，网站可能会有很多不足之处，希望大家可以帮助完善</p>
      <ul>
        <li>交流与反馈QQ群：<strong>106402736</strong></li>
        <li>
          提现QQ群：<strong>718529809</strong>，进群请填写自己的邀请码，审核通过后方可提现
        </li>
        <li>
          其它官方交流与合作请加QQ：<strong>414927352</strong>，A·T·Field 全开
        </li>
      </ul>
      <h3>最后：</h3>
      <p>
        我开发这个网站的初衷只是因为对动漫的热爱，同时我也希望和我一样热爱动漫的人，可以从这份初心中获取一点回报，不再需要「用爱来发电」
      </p>
      <p>
        网站目前的功能还很弱，我会努力做的更好，尽可能为自己喜欢的东西，做一点点贡献
      </p>
      <p>希望，你也喜欢这个网站。by：冰淤</p>
      <template slot="aside"
>
        &nbsp;
      </template>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'AboutHello',
  head: {
    title: '欢迎'
  }
}
</script>
