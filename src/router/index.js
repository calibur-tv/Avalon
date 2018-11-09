import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";

Vue.use(Router);
Vue.use(Meta, {
  keyName: "head",
  attribute: "data-n-head",
  ssrAttribute: "data-n-head-ssr",
  tagIDKeyName: "hid"
});

export function createRouter() {
  return new Router({
    mode: "history",
    base: "/",
    scrollBehavior(to, from, savedPosition) {
      // savedPosition 只有在 popstate 导航（如按浏览器的返回按钮）时可以获取。
      if (savedPosition) {
        return savedPosition;
      }
      return { x: 0, y: 0 };
    },
    routes: [
      {
        path: "/",
        component: () => import("~/layouts/default"),
        meta: { useAuth: true },
        children: [
          {
            path: "",
            name: "homepage",
            component: () => import("~/views/index")
          },
          {
            path: "world",
            component: () => import("~/views/world/index"),
            children: [
              {
                path: "",
                redirect: "post"
              },
              {
                path: "post",
                name: "world-post",
                component: () => import("~/views/world/post")
              },
              {
                path: "pins",
                name: "world-image",
                component: () => import("~/views/world/image")
              },
              {
                path: "review",
                name: "world-score",
                component: () => import("~/views/world/score")
              },
              {
                path: "qaq",
                name: "world-question",
                component: () => import("~/views/world/question")
              }
            ]
          },
          {
            path: "bangumi/news",
            component: () => import("~/views/bangumi/news")
          },
          {
            path: "bangumi/rank",
            component: () => import("~/views/bangumi/rank")
          },
          {
            path: "bangumi/timeline",
            component: () => import("~/views/bangumi/time")
          },
          {
            name: "bangumi-tags",
            path: "bangumi/tags/:id?",
            component: () => import("~/views/bangumi/tags")
          },
          {
            path: "bangumi/:id(\\d+)",
            component: () => import("~/views/bangumi/show/layout"),
            children: [
              {
                path: "",
                name: "bangumi-show",
                redirect: "post"
              },
              {
                path: "post",
                name: "bangumi-post",
                component: () => import("~/views/bangumi/show/post")
              },
              {
                path: "video",
                name: "bangumi-video",
                component: () => import("~/views/bangumi/show/video")
              },
              {
                path: "cartoon",
                name: "bangumi-cartoon",
                component: () => import("~/views/bangumi/show/cartoon")
              },
              {
                path: "role",
                name: "bangumi-role",
                component: () => import("~/views/bangumi/show/role")
              },
              {
                path: "pins",
                name: "bangumi-image",
                component: () => import("~/views/bangumi/show/image")
              },
              {
                path: "review",
                name: "bangumi-score",
                component: () => import("~/views/bangumi/show/score")
              },
              {
                path: "qaq",
                name: "bangumi-question",
                component: () => import("~/views/bangumi/show/question")
              },
              {
                path: "setting",
                name: "bangumi-setting",
                component: () => import("~/views/bangumi/show/setting")
              }
            ]
          },
          {
            path: "video/:id(\\d+)",
            component: () => import("~/views/video/show")
          },
          {
            path: "user/:zone",
            component: () => import("~/views/user/show/layout"),
            children: [
              {
                path: "",
                name: "user-show",
                redirect: "bangumi"
              },
              {
                path: "bangumi",
                name: "user-bangumi",
                component: () => import("~/views/user/show/bangumi")
              },
              {
                path: "post",
                name: "user-post",
                component: () => import("~/views/user/show/post")
              },
              {
                path: "pins",
                name: "user-image",
                component: () => import("~/views/user/show/image")
              },
              {
                path: "review",
                name: "user-score",
                component: () => import("~/views/user/show/score")
              },
              {
                path: "qaq",
                name: "user-question",
                component: () => import("~/views/user/show/question")
              },
              {
                path: "role",
                name: "user-role",
                component: () => import("~/views/user/show/role")
              },
              {
                path: "draft",
                name: "user-draft",
                component: () => import("~/views/user/show/draft")
              },
              {
                path: "setting",
                name: "user-setting",
                component: () => import("~/views/user/show/setting")
              }
            ]
          },
          {
            path: "post/:id(\\d+)",
            name: "post-show",
            component: () => import("~/views/post/show")
          },
          {
            path: "about/hello",
            name: "hello",
            component: () => import("~/views/about/hello")
          },
          {
            path: "about/thanks",
            name: "thanks",
            component: () => import("~/views/about/thanks")
          },
          {
            path: "about/invite/:id(\\d+)",
            name: "invite-user",
            component: () => import("~/views/about/invite")
          },
          {
            path: "role/trending",
            component: () => import("~/views/role/trending")
          },
          {
            path: "role/:id(\\d+)",
            name: "role-show",
            component: () => import("~/views/role/show")
          },
          {
            path: "pin/:id(\\d+)",
            name: "image-show",
            component: () => import("~/views/image/show")
          },
          {
            path: "qaq/:id(\\d+)",
            name: "question-show",
            component: () => import("~/views/question/show")
          },
          {
            path: "soga/:id(\\d+)",
            name: "answer-show",
            component: () => import("~/views/answer/show")
          },
          {
            path: "review/:id(\\d+)",
            name: "score-show",
            component: () => import("~/views/score/show")
          },
          {
            path: "search",
            name: "search-index",
            component: () => import("~/views/search/index")
          },
          {
            path: "app/download",
            name: "download-app",
            component: () => import("~/views/market/download")
          }
        ]
      },
      {
        path: "/callback",
        component: () => import("~/layouts/empty"),
        meta: { useAuth: false },
        children: [
          {
            path: "wechat/auth",
            name: "wechat-auth-callback",
            component: () => import("~/views/callback/wechat/auth")
          }
        ]
      },
      {
        path: "/review",
        component: () => import("~/layouts/write"),
        meta: { useAuth: true },
        children: [
          {
            path: "create",
            name: "score-create",
            component: () => import("~/views/score/create")
          },
          {
            path: "edit/:id(\\d+)",
            name: "score-edit",
            component: () => import("~/views/score/create")
          }
        ]
      },
      {
        path: "/errors",
        meta: { useAuth: true },
        component: () => import("~/layouts/error"),
        children: [
          {
            path: "400",
            component: () => import("~/views/error/400")
          },
          {
            path: "401",
            component: () => import("~/views/error/401")
          },
          {
            path: "403",
            component: () => import("~/views/error/403")
          },
          {
            path: "404",
            component: () => import("~/views/error/404")
          },
          {
            path: "423",
            component: () => import("~/views/error/423")
          },
          {
            path: "429",
            component: () => import("~/views/error/429")
          },
          {
            path: "500",
            component: () => import("~/views/error/500")
          },
          {
            path: "503",
            component: () => import("~/views/error/503")
          }
        ]
      },
      {
        path: "/admin",
        meta: { isAdmin: true },
        component: () => import("~/layouts/admin"),
        children: [
          {
            path: "",
            hidden: true,
            redirect: "dashboard",
            component: () => import("~/layouts/empty"),
            children: [
              {
                path: "dashboard",
                name: "Dashboard",
                component: () => import("@/views/dashboard/index")
              }
            ]
          },
          {
            path: "bangumi",
            name: "Bangumi",
            meta: { title: "番剧", icon: "film" },
            component: () => import("~/layouts/empty"),
            redirect: "bangumi/list",
            children: [
              {
                path: "list",
                name: "bangumi-list",
                meta: { title: "番剧列表", icon: "coffee" },
                component: () => import("@/views/bangumi/list")
              },
              {
                path: "manager",
                name: "bangumi-manager",
                meta: { title: "版主管理", icon: "coffee" },
                component: () => import("@/views/bangumi/manager")
              },
              {
                path: "managers",
                name: "bangumi-managers",
                meta: { title: "版主列表", icon: "coffee" },
                component: () => import("@/views/bangumi/managers")
              },
              {
                path: "edit/:id(\\d+)",
                name: "bangumi-edit",
                hidden: true,
                meta: { title: "编辑番剧", icon: "coffee" },
                component: () => import("@/views/bangumi/edit")
              },
              {
                path: "create",
                name: "bangumi-create",
                meta: { title: "创建番剧", icon: "coffee" },
                component: () => import("@/views/bangumi/edit")
              }
            ]
          },
          {
            path: "video",
            name: "Video",
            meta: { title: "视频", icon: "video" },
            redirect: "video/list",
            component: () => import("~/layouts/empty"),
            children: [
              {
                path: "list",
                name: "video-list",
                meta: { title: "视频列表", icon: "coffee" },
                component: () => import("@/views/video/list")
              },
              {
                path: "trending",
                name: "video-trending",
                meta: { title: "播放排行", icon: "coffee" },
                component: () => import("@/views/video/trending")
              },
              {
                path: "create",
                name: "video-create",
                meta: { title: "新建视频", icon: "coffee" },
                component: () => import("@/views/video/create")
              }
            ]
          },
          {
            path: "cartoon",
            name: "Cartoon",
            meta: { title: "漫画", icon: "images" },
            redirect: "cartoon/bangumis",
            component: () => import("~/layouts/empty"),
            children: [
              {
                path: "bangumis",
                name: "cartoon-bangumis",
                meta: { title: "番剧列表", icon: "coffee" },
                component: () => import("@/views/cartoon/bangumis")
              },
              {
                path: "edit/:id(\\d+)",
                name: "cartoon-edit",
                hidden: true,
                component: () => import("@/views/cartoon/edit")
              },
              {
                path: "list",
                name: "cartoon-list",
                meta: { title: "漫画列表", icon: "coffee" },
                component: () => import("@/views/cartoon/list")
              }
            ]
          },
          {
            path: "role",
            name: "Role",
            meta: { title: "偶像", icon: "grin-stars" },
            redirect: "role/list",
            component: () => import("~/layouts/empty"),
            children: [
              {
                path: "list",
                name: "role-list",
                meta: { title: "偶像列表", icon: "coffee" },
                component: () => import("@/views/role/list")
              },
              {
                path: "edit/:id(\\d+)",
                name: "role-edit",
                hidden: true,
                component: () => import("@/views/role/edit")
              },
              {
                path: "create",
                name: "role-create",
                meta: { title: "添加偶像", icon: "coffee" },
                component: () => import("@/views/role/edit")
              }
            ]
          },
          {
            path: "user",
            name: "User",
            meta: { title: "用户", icon: "users" },
            redirect: "user/dalao",
            component: () => import("~/layouts/empty"),
            children: [
              {
                path: "dalao",
                name: "user-dalao",
                meta: { title: "大佬列表", icon: "coffee" },
                component: () => import("@/views/user/dalao")
              },
              {
                path: "show",
                name: "user-info",
                meta: { title: "用户查询", icon: "coffee" },
                component: () => import("@/views/user/show")
              },
              {
                path: "feedback",
                name: "user-feedback",
                meta: { title: "用户反馈", icon: "coffee" },
                component: () => import("@/views/user/feedback")
              }
            ]
          },
          {
            path: "trial",
            name: "Trial",
            meta: { title: "审核", icon: "code-branch" },
            redirect: "trial/test",
            component: () => import("~/layouts/empty"),
            children: [
              {
                path: "test",
                name: "trial-test",
                meta: { title: "审核测试", icon: "coffee" },
                component: () => import("@/views/trial/test")
              },
              {
                path: "user",
                name: "trial-user",
                meta: { title: "用户审核", icon: "coffee" },
                component: () => import("@/views/trial/user")
              },
              {
                path: "bangumi",
                name: "trial-bangumi",
                meta: { title: "番剧审核", icon: "coffee" },
                component: () => import("@/views/trial/bangumi")
              },
              {
                path: "post",
                name: "trial-post",
                meta: { title: "帖子审核", icon: "coffee" },
                component: () => import("@/views/trial/post")
              },
              {
                path: "comment",
                name: "trial-comment",
                meta: { title: "评论审核", icon: "coffee" },
                component: () => import("@/views/trial/comment")
              },
              {
                path: "image",
                name: "trial-image",
                meta: { title: "图片审核", icon: "coffee" },
                component: () => import("@/views/trial/image")
              },
              {
                path: "role",
                name: "trial-role",
                meta: { title: "偶像审核", icon: "coffee" },
                component: () => import("@/views/trial/role")
              },
              {
                path: "score",
                name: "trial-score",
                meta: { title: "漫评审核", icon: "coffee" },
                component: () => import("@/views/trial/score")
              },
              {
                path: "question",
                name: "trial-question",
                meta: { title: "提问审核", icon: "coffee" },
                component: () => import("@/views/trial/question")
              },
              {
                path: "answer",
                name: "trial-answer",
                meta: { title: "回答审核", icon: "coffee" },
                component: () => import("@/views/trial/answer")
              }
            ]
          },
          {
            path: "cm",
            name: "Cm",
            meta: { title: "运营", icon: "code-branch" },
            redirect: "cm/image/banner",
            component: () => import("~/layouts/empty"),
            children: [
              {
                path: "loop",
                name: "cm-loop",
                meta: { title: "营销轮播", icon: "coffee" },
                component: () => import("@/views/cm/loop")
              },
              {
                path: "user/report",
                name: "user-report-list",
                meta: { title: "用户举报", icon: "coffee" },
                component: () => import("@/views/user/report")
              },
              {
                path: "image/banner",
                name: "image-banner",
                meta: { title: "主站轮播", icon: "coffee" },
                component: () => import("@/views/image/banner")
              },
              {
                path: "tag/list",
                name: "tag-list",
                meta: { title: "标签列表", icon: "coffee" },
                component: () => import("@/views/tag/list")
              },
              {
                path: "user/faker",
                name: "faker-list",
                meta: { title: "运营号", icon: "coffee" },
                component: () => import("@/views/user/faker")
              },
              {
                path: "trial/words",
                name: "trial-words",
                meta: { title: "敏感词库", icon: "coffee" },
                component: () => import("@/views/trial/words")
              },
              {
                path: "ip_blocker",
                name: "ip_blocker",
                meta: { title: "ip封禁", icon: "coffee" },
                component: () => import("@/views/cm/ipBlocker")
              },
              {
                path: "cron_freeze",
                name: "cron_freeze",
                meta: { title: "限时禁言", icon: "coffee" },
                component: () => import("@/views/cm/cronFreeze")
              },
              {
                path: "app-version",
                name: "app-version",
                meta: { title: "App版本", icon: "coffee" },
                component: () => import("@/views/cm/appVersion")
              },
              {
                path: "app-template",
                name: "app-template",
                meta: { title: "App模板", icon: "coffee" },
                component: () => import("@/views/cm/appTemplate")
              },
              {
                path: "friend-link",
                name: "friend-link",
                meta: { title: "友情链接", icon: "coffee" },
                component: () => import("@/views/cm/friendLink")
              }
            ]
          },
          {
            path: "console",
            name: "Console",
            meta: { title: "管理", icon: "unlock" },
            redirect: "console/admins",
            component: () => import("~/layouts/empty"),
            children: [
              {
                path: "admins",
                name: "admin-list",
                meta: { title: "管理", icon: "unlock" },
                component: () => import("@/views/console/admins")
              }
            ]
          }
        ]
      }
    ]
  });
}
