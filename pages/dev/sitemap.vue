<style lang="scss">
#sitemap {
  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: $color-blue-normal;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;

    p {
      margin-bottom: 10px;
      margin-top: 15px;
    }
  }

  .ok {
    text-decoration: line-through;
    text-decoration-color: red;
  }
}
</style>

<template>
  <div id="sitemap">
    <v-header type="pure"/>
    <v-layout>
      <h2 class="subtitle">
        calibur.tv sitemap
      </h2>
      <div class="links">
        <p>社区：</p>
        <nuxt-link to="/world/post"><span class="ok">帖子</span></nuxt-link>
        <nuxt-link to="/world/pins"><span class="ok">相册</span></nuxt-link>
        <nuxt-link to="/world/review"><span class="ok">漫评</span></nuxt-link>
        <nuxt-link to="/world/qaq"><span class="ok">问答</span></nuxt-link>
        <p>番剧：</p>
        <nuxt-link to="/bangumi/news"><span class="ok">新番放送</span></nuxt-link>
        <nuxt-link to="/bangumi/tags"><span class="ok">分类索引</span></nuxt-link>
        &nbsp;|&nbsp;
        <nuxt-link to="/bangumi/3/post"><span class="ok">帖子</span></nuxt-link>
        <nuxt-link to="/bangumi/3/video"><span class="ok">视频</span></nuxt-link>
        <nuxt-link to="/bangumi/3/cartoon"><span class="ok">漫画</span></nuxt-link>
        <nuxt-link to="/bangumi/3/role"><span class="ok">偶像</span></nuxt-link>
        <nuxt-link to="/bangumi/3/pins"><span class="ok">相册</span></nuxt-link>
        <nuxt-link to="/bangumi/3/review"><span class="ok">漫评</span></nuxt-link>
        <nuxt-link to="/bangumi/3/qaq"><span class="ok">问答</span></nuxt-link>
        <nuxt-link to="/bangumi/3/setting">设置</nuxt-link>
        <p>用户：</p>
        <nuxt-link to="/user/bing-yu/bangumi"><span class="ok">番剧</span></nuxt-link>
        <nuxt-link to="/user/bing-yu/post"><span class="ok">帖子</span></nuxt-link>
        <nuxt-link to="/user/bing-yu/pins"><span class="ok">相册</span></nuxt-link>
        <nuxt-link to="/user/bing-yu/review"><span class="ok">漫评</span></nuxt-link>
        <nuxt-link to="/user/bing-yu/qaq"><span class="ok">问答</span></nuxt-link>
        <nuxt-link to="/user/bing-yu/role"><span class="ok">偶像</span></nuxt-link>
        <nuxt-link to="/user/bing-yu/draft"><span class="ok">草稿</span></nuxt-link>
        <nuxt-link to="/user/bing-yu/setting">设置</nuxt-link>
        <p>偶像：</p>
        <nuxt-link to="/role/trending"><span class="ok">排行榜</span></nuxt-link>
        <nuxt-link to="/test"><span class="ok">测试404</span></nuxt-link>
        <nuxt-link to="/role/1">详情页</nuxt-link>
        <p>帖子：</p>
        <nuxt-link to="/post/1">详情页</nuxt-link>
        <p>图片：</p>
        <nuxt-link to="/pin/1">详情页</nuxt-link>
        <p>漫评：</p>
        <nuxt-link to="/review/1">详情页</nuxt-link>
        <p>提问：</p>
        <nuxt-link to="/qaq/1">详情页</nuxt-link>
        <p>回答：</p>
        <nuxt-link to="/soga/1">详情页</nuxt-link>
        <p>视频：</p>
        <nuxt-link to="/video/1">详情页</nuxt-link>
        <p>其它：</p>
        <nuxt-link to="/search">搜索</nuxt-link>
        <nuxt-link to="/about/hello"><span class="ok">欢迎</span></nuxt-link>
        <nuxt-link to="/about/thanks"><span class="ok">品牌与站娘</span></nuxt-link>
        <nuxt-link to="/about/invite/1"><span class="ok">邀请注册</span></nuxt-link>
        <nuxt-link to="/app/download"><span class="ok">下载APP</span></nuxt-link>
        <p>创作：</p>
        <nuxt-link to="/review/create">写漫评</nuxt-link>
        <nuxt-link to="/review/edit/1">编辑漫评</nuxt-link>
      </div>
    </v-layout>
  </div>
</template>
