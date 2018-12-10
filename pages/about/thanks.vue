<style lang="scss">
#about-thanks {
  .panel {
    @extend %clearfix;

    img {
      width: auto;
    }

    .logo {
      margin-right: 15px;
      display: inline-block;
    }

    .context {
      overflow: hidden;
      padding-top: 17px;

      p {
        line-height: 30px;
        font-size: 13px;
        color: $color-text-normal;
      }
    }

    .video-item {
      display: inline-block;
      width: 188px;
      height: 116px;
      border-radius: 4px;
      overflow: hidden;
      margin-right: 15px;
      text-align: center;
      font-size: 50px;
      line-height: 116px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 188px 116px;
      transition: 0.4s cubic-bezier(0.22, 0.58, 0.12, 0.98);
      border: 1px solid $color-gray-normal;

      &:hover {
        background-size: 282px 174px;
      }
    }
  }

  .intro {
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 14px;
    color: $color-text-normal;
  }
}
</style>

<template>
  <div id="about-thanks">
    <v-header type="pure"/>
    <v-layout>
      <h3 class="sub-title">logo</h3>
      <div
        class="panel"
        style="height: 130px"
      >
        <el-tooltip
          effect="dark"
          content="团子 ♪"
          placement="top"
        >
          <a
            :href="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 260, webP: false })"
            target="_blank"
            class="logo"
          >
            <img
              :src="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 260, webP: false })"
              height="130"
              alt="260"
            >
          </a>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="团子 ♪"
          placement="top"
        >
          <a
            :href="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 220, webP: false })"
            target="_blank"
            class="logo"
          >
            <img
              :src="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 220, webP: false })"
              height="110"
              alt="220"
            >
          </a>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="团子 ♪"
          placement="top"
        >
          <a
            :href="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 180, webP: false })"
            target="_blank"
            class="logo"
          >
            <img
              :src="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 180, webP: false })"
              height="90"
              alt="180"
            >
          </a>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="团子 ♪"
          placement="top"
        >
          <a
            :href="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 140, webP: false })"
            target="_blank"
            class="logo"
          >
            <img
              :src="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 140, webP: false })"
              height="70"
              alt="140"
            >
          </a>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="团子 ♪"
          placement="top"
        >
          <a
            :href="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 100, webP: false })"
            target="_blank"
            class="logo"
          >
            <img
              :src="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 100, webP: false })"
              height="50"
              alt="100"
            >
          </a>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="团子 ♪"
          placement="top"
        >
          <a
            :href="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 60, webP: false })"
            target="_blank"
            class="logo"
          >
            <img
              :src="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 60, webP: false })"
              height="30"
              alt="60"
            >
          </a>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="团子大家族 ♪"
          placement="top"
        >
          <a
            :href="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 220, webP: false })"
            target="_blank"
            class="logo"
          >
            <img
              :src="$resize('https://image.calibur.tv/owner/logo/max.png', { width: 220, webP: false })"
              height="110"
              alt="220"
            >
          </a>
        </el-tooltip>
      </div>
      <p class="intro">
        <strong>灵感来源：</strong>
        《CLANNAD》—— 团子大家族，
        <strong>图标作者：</strong>
        众漫友
      </p>
      <h3 class="sub-title">域名</h3>
      <div
        class="panel"
        style="margin-left: -13px;height: 70px"
      >
        <a
          :href="$resize('https://image.calibur.tv/owner/logo/calibur-blue-new.png')"
          class="logo"
          target="_blank"
        >
          <img
            :src="$resize('https://image.calibur.tv/owner/logo/calibur-blue-new.png', { width: 630, height: 210, webP: false })"
            height="70"
            alt="pink-logo"
          >
        </a>
        <a
          :href="$resize('https://image.calibur.tv/owner/logo/calibur-pink-new.png')"
          class="logo"
          target="_blank"
        >
          <img
            :src="$resize('https://image.calibur.tv/owner/logo/calibur-pink-new.png', { width: 630, height: 210, webP: false })"
            height="70"
            alt="pink-logo"
          >
        </a>
        <a
          :href="$resize('https://image.calibur.tv/owner/logo/animate.gif')"
          class="logo"
          target="_blank"
        >
          <img
            :src="$resize('https://image.calibur.tv/owner/logo/animate.gif', { width: 630, height: 210, webP: false })"
            height="70"
            alt="animate-logo"
          >
        </a>
      </div>
      <p class="intro">
        <strong>灵感来源：</strong>
        《Fate/stay night》—— 石中剑，
        <strong>图标作者：</strong>
        <a
          href="https://www.calibur.tv/user/yu-yuan-lin-yin-7"
          target="_blank"
        >艾拉</a>
      </p>
      <h3 class="sub-title">站娘</h3>
      <div class="panel">
        <el-tooltip
          effect="dark"
          content="c.c"
          placement="top"
        >
          <a
            :href="$resize('https://image.calibur.tv/owner/logo/girl.png')"
            target="_blank"
            class="logo"
            style="margin-left: -30px;float: left"
          >
            <img
              :src="$resize('https://image.calibur.tv/owner/logo/girl.png', { width: 600, webP: false })"
              height="300"
              alt="c.c"
            >
          </a>
        </el-tooltip>
        <div class="context">
          <p><strong>名字：</strong>c.c（出自《叛逆的鲁鲁修》—— c.c）</p>
          <p><strong>身高：</strong>自由自在（出自《Fate》—— 恩奇都）</p>
          <p><strong>体重：</strong>自由自在（其实是懒）</p>
          <p><strong>三维：</strong>自由自在（其实是懒）</p>
          <p><strong>性格（对自己喜欢的人）：</strong>毒舌、傲娇、专一、温柔</p>
          <p><strong>性格（对喜欢自己的人）：</strong>可以开黑打游戏</p>
          <p><strong>性格（对讨厌自己的人）：</strong>不服来战</p>
          <p><strong>性格（对自己讨厌的人）：</strong>？</p>
          <p><strong>人设：</strong>学生党、拥有8000万粉丝、大姐头、不可侵犯</p>
        </div>
      </div>
      <p class="intro">
        <strong>灵感来源：</strong>
        站长の幻想，
        <strong>图标作者：</strong>
        <a
          href="https://www.calibur.tv/user/jian-pao-zhi-yuan"
          target="_blank"
        >JPZY</a>
      </p>
      <h3 class="sub-title">宣传片</h3>
      <div class="panel">
        <a
          :style="{ backgroundImage: `url(${$resize('https://image.calibur.tv/user/1/post/0/1533826373648-y0q.jpeg', { width: 376, height: 232 })})` }"
          href="https://static.calibur.tv/owner/video/02.mp4"
          class="video-item"
          target="_blank"
          style="color: #fff"
        >
          <i class="iconfont icon-bofang1"/>
        </a>
        <a
          :style="{ backgroundImage: `url(${$resize('https://image.calibur.tv/owner/video/cartoon-poster.png', { width: 376, height: 232 })})` }"
          href="https://image.calibur.tv/owner/video/cartoon.mp4"
          class="video-item"
          target="_blank"
          style="color: #333"
        >
          <i class="iconfont icon-bofang1"/>
        </a>
        <a
          :style="{ backgroundImage: `url(${$resize('https://image.calibur.tv/owner/video/mc-poster.png', { width: 376, height: 232 })})` }"
          href="https://static.calibur.tv/owner/video/mc.mp4"
          class="video-item"
          target="_blank"
          style="color: #fff"
        >
          <i class="iconfont icon-bofang1"/>
        </a>
      </div>
      <p class="intro">
        <strong>视频1作者：</strong>
        <a
          href="https://www.calibur.tv/user/cfdxkk"
          target="_blank"
        >冲锋的小卡卡</a>，
        <strong>视频2作者：</strong>
        <a
          href="https://www.calibur.tv/user/chun-feng-bu-ji-lei-mu-xiao"
          target="_blank"
        >指绘君</a>，
        <strong>视频3作者：</strong>
        <a
          href="https://www.calibur.tv/user/yu-yuan-lin-yin-7/bangumi"
          target="_blank"
        >艾了个拉</a>
      </p>
      <template slot="aside">&nbsp;</template>
    </v-layout>
  </div>
</template>
