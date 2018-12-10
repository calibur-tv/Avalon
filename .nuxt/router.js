import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _669203af = () => interopDefault(import('../pages/bangumi/index.vue' /* webpackChunkName: "pages/bangumi/index" */))
const _59d1c263 = () => interopDefault(import('../pages/bangumi/index/news.vue' /* webpackChunkName: "pages/bangumi/index/news" */))
const _4b9b4eae = () => interopDefault(import('../pages/bangumi/index/tags.vue' /* webpackChunkName: "pages/bangumi/index/tags" */))
const _2346d328 = () => interopDefault(import('../pages/search/index.vue' /* webpackChunkName: "pages/search/index" */))
const _8ea89736 = () => interopDefault(import('../pages/world.vue' /* webpackChunkName: "pages/world" */))
const _20b69b28 = () => interopDefault(import('../pages/world/index.vue' /* webpackChunkName: "pages/world/index" */))
const _e25086d0 = () => interopDefault(import('../pages/world/pins.vue' /* webpackChunkName: "pages/world/pins" */))
const _56591a8c = () => interopDefault(import('../pages/world/post.vue' /* webpackChunkName: "pages/world/post" */))
const _d17c4292 = () => interopDefault(import('../pages/world/qaq.vue' /* webpackChunkName: "pages/world/qaq" */))
const _5b2fdcf2 = () => interopDefault(import('../pages/world/review.vue' /* webpackChunkName: "pages/world/review" */))
const _2f0f1563 = () => interopDefault(import('../pages/about/hello.vue' /* webpackChunkName: "pages/about/hello" */))
const _59ec0df0 = () => interopDefault(import('../pages/about/thanks.vue' /* webpackChunkName: "pages/about/thanks" */))
const _154c64b3 = () => interopDefault(import('../pages/app/download.vue' /* webpackChunkName: "pages/app/download" */))
const _265fccce = () => interopDefault(import('../pages/dev/sitemap.vue' /* webpackChunkName: "pages/dev/sitemap" */))
const _2034def8 = () => interopDefault(import('../pages/error/404.vue' /* webpackChunkName: "pages/error/404" */))
const _497f4634 = () => interopDefault(import('../pages/review/create.vue' /* webpackChunkName: "pages/review/create" */))
const _0285bb1e = () => interopDefault(import('../pages/role/trending.vue' /* webpackChunkName: "pages/role/trending" */))
const _f5da0a1a = () => interopDefault(import('../pages/about/invite/_id.vue' /* webpackChunkName: "pages/about/invite/_id" */))
const _00db25d7 = () => interopDefault(import('../pages/bangumi/_id.vue' /* webpackChunkName: "pages/bangumi/_id" */))
const _7853af1a = () => interopDefault(import('../pages/bangumi/_id/index.vue' /* webpackChunkName: "pages/bangumi/_id/index" */))
const _dd816894 = () => interopDefault(import('../pages/bangumi/_id/cartoon.vue' /* webpackChunkName: "pages/bangumi/_id/cartoon" */))
const _bba13b34 = () => interopDefault(import('../pages/bangumi/_id/pins.vue' /* webpackChunkName: "pages/bangumi/_id/pins" */))
const _2fa9cef0 = () => interopDefault(import('../pages/bangumi/_id/post.vue' /* webpackChunkName: "pages/bangumi/_id/post" */))
const _6e974729 = () => interopDefault(import('../pages/bangumi/_id/qaq.vue' /* webpackChunkName: "pages/bangumi/_id/qaq" */))
const _11957180 = () => interopDefault(import('../pages/bangumi/_id/review.vue' /* webpackChunkName: "pages/bangumi/_id/review" */))
const _a9afb544 = () => interopDefault(import('../pages/bangumi/_id/role.vue' /* webpackChunkName: "pages/bangumi/_id/role" */))
const _cc878cd0 = () => interopDefault(import('../pages/bangumi/_id/setting.vue' /* webpackChunkName: "pages/bangumi/_id/setting" */))
const _102ec37a = () => interopDefault(import('../pages/bangumi/_id/video.vue' /* webpackChunkName: "pages/bangumi/_id/video" */))
const _8c23455a = () => interopDefault(import('../pages/pin/_id.vue' /* webpackChunkName: "pages/pin/_id" */))
const _3d445fc8 = () => interopDefault(import('../pages/post/_id.vue' /* webpackChunkName: "pages/post/_id" */))
const _6954d41f = () => interopDefault(import('../pages/qaq/_id.vue' /* webpackChunkName: "pages/qaq/_id" */))
const _617f6140 = () => interopDefault(import('../pages/review/_id.vue' /* webpackChunkName: "pages/review/_id" */))
const _22b9dcc4 = () => interopDefault(import('../pages/role/_id.vue' /* webpackChunkName: "pages/role/_id" */))
const _40587544 = () => interopDefault(import('../pages/soga/_id.vue' /* webpackChunkName: "pages/soga/_id" */))
const _238b4e04 = () => interopDefault(import('../pages/user/_zone.vue' /* webpackChunkName: "pages/user/_zone" */))
const _1cbe4187 = () => interopDefault(import('../pages/user/_zone/index.vue' /* webpackChunkName: "pages/user/_zone/index" */))
const _5ac304e4 = () => interopDefault(import('../pages/user/_zone/bangumi.vue' /* webpackChunkName: "pages/user/_zone/bangumi" */))
const _39b692d6 = () => interopDefault(import('../pages/user/_zone/draft.vue' /* webpackChunkName: "pages/user/_zone/draft" */))
const _3c224e59 = () => interopDefault(import('../pages/user/_zone/pins.vue' /* webpackChunkName: "pages/user/_zone/pins" */))
const _fbc3f70a = () => interopDefault(import('../pages/user/_zone/post.vue' /* webpackChunkName: "pages/user/_zone/post" */))
const _2124de54 = () => interopDefault(import('../pages/user/_zone/qaq.vue' /* webpackChunkName: "pages/user/_zone/qaq" */))
const _3fc5fb1a = () => interopDefault(import('../pages/user/_zone/review.vue' /* webpackChunkName: "pages/user/_zone/review" */))
const _451b1151 = () => interopDefault(import('../pages/user/_zone/role.vue' /* webpackChunkName: "pages/user/_zone/role" */))
const _64683676 = () => interopDefault(import('../pages/user/_zone/setting.vue' /* webpackChunkName: "pages/user/_zone/setting" */))
const _5bc14779 = () => interopDefault(import('../pages/video/_id.vue' /* webpackChunkName: "pages/video/_id" */))
const _459d21a5 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/bangumi",
      component: _669203af,
      props: false,
      name: "bangumi",
      children: [{
        path: "news",
        component: _59d1c263,
        props: false,
        name: "bangumi-index-news"
      }, {
        path: "tags",
        component: _4b9b4eae,
        props: false,
        name: "bangumi-index-tags"
      }]
    }, {
      path: "/search",
      component: _2346d328,
      props: false,
      name: "search"
    }, {
      path: "/world",
      component: _8ea89736,
      props: false,
      children: [{
        path: "",
        component: _20b69b28,
        props: false,
        name: "world"
      }, {
        path: "pins",
        component: _e25086d0,
        props: false,
        name: "world-pins"
      }, {
        path: "post",
        component: _56591a8c,
        props: false,
        name: "world-post"
      }, {
        path: "qaq",
        component: _d17c4292,
        props: false,
        name: "world-qaq"
      }, {
        path: "review",
        component: _5b2fdcf2,
        props: false,
        name: "world-review"
      }]
    }, {
      path: "/about/hello",
      component: _2f0f1563,
      props: false,
      name: "about-hello"
    }, {
      path: "/about/thanks",
      component: _59ec0df0,
      props: false,
      name: "about-thanks"
    }, {
      path: "/app/download",
      component: _154c64b3,
      props: false,
      name: "app-download"
    }, {
      path: "/dev/sitemap",
      component: _265fccce,
      props: false,
      name: "dev-sitemap"
    }, {
      path: "/error/404",
      component: _2034def8,
      props: false,
      name: "error-404"
    }, {
      path: "/review/create",
      component: _497f4634,
      props: false,
      name: "review-create"
    }, {
      path: "/role/trending",
      component: _0285bb1e,
      props: false,
      name: "role-trending"
    }, {
      path: "/about/invite/:id?",
      component: _f5da0a1a,
      props: true,
      name: "about-invite-id"
    }, {
      path: "/bangumi/:id",
      component: _00db25d7,
      props: true,
      children: [{
        path: "",
        component: _7853af1a,
        props: true,
        name: "bangumi-id"
      }, {
        path: "cartoon",
        component: _dd816894,
        props: true,
        name: "bangumi-id-cartoon"
      }, {
        path: "pins",
        component: _bba13b34,
        props: true,
        name: "bangumi-id-pins"
      }, {
        path: "post",
        component: _2fa9cef0,
        props: true,
        name: "bangumi-id-post"
      }, {
        path: "qaq",
        component: _6e974729,
        props: true,
        name: "bangumi-id-qaq"
      }, {
        path: "review",
        component: _11957180,
        props: true,
        name: "bangumi-id-review"
      }, {
        path: "role",
        component: _a9afb544,
        props: true,
        name: "bangumi-id-role"
      }, {
        path: "setting",
        component: _cc878cd0,
        props: true,
        name: "bangumi-id-setting"
      }, {
        path: "video",
        component: _102ec37a,
        props: true,
        name: "bangumi-id-video"
      }]
    }, {
      path: "/pin/:id?",
      component: _8c23455a,
      props: true,
      name: "pin-id"
    }, {
      path: "/post/:id?",
      component: _3d445fc8,
      props: true,
      name: "post-id"
    }, {
      path: "/qaq/:id?",
      component: _6954d41f,
      props: true,
      name: "qaq-id"
    }, {
      path: "/review/:id?",
      component: _617f6140,
      props: true,
      name: "review-id"
    }, {
      path: "/role/:id?",
      component: _22b9dcc4,
      props: true,
      name: "role-id"
    }, {
      path: "/soga/:id?",
      component: _40587544,
      props: true,
      name: "soga-id"
    }, {
      path: "/user/:zone?",
      component: _238b4e04,
      props: true,
      children: [{
        path: "",
        component: _1cbe4187,
        props: true,
        name: "user-zone"
      }, {
        path: "bangumi",
        component: _5ac304e4,
        props: true,
        name: "user-zone-bangumi"
      }, {
        path: "draft",
        component: _39b692d6,
        props: true,
        name: "user-zone-draft"
      }, {
        path: "pins",
        component: _3c224e59,
        props: true,
        name: "user-zone-pins"
      }, {
        path: "post",
        component: _fbc3f70a,
        props: true,
        name: "user-zone-post"
      }, {
        path: "qaq",
        component: _2124de54,
        props: true,
        name: "user-zone-qaq"
      }, {
        path: "review",
        component: _3fc5fb1a,
        props: true,
        name: "user-zone-review"
      }, {
        path: "role",
        component: _451b1151,
        props: true,
        name: "user-zone-role"
      }, {
        path: "setting",
        component: _64683676,
        props: true,
        name: "user-zone-setting"
      }]
    }, {
      path: "/video/:id?",
      component: _5bc14779,
      props: true,
      name: "video-id"
    }, {
      path: "/",
      component: _459d21a5,
      props: false,
      name: "index"
    }, {
      path: "*",
      component: _2034def8,
      name: "error-fallback"
    }],

    fallback: false
  })
}
