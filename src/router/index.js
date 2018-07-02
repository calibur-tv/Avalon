import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

Vue.use(Router);
Vue.use(Meta, {
  keyName: 'head',
  attribute: 'data-n-head',
  ssrAttribute: 'data-n-head-ssr',
  tagIDKeyName: 'hid',
});

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    },
    routes: [
      {
        path: '/',
        component: () => import('~/layouts/default'),
        meta: { useAuth: true },
        children: [
          {
            path: '',
            name: 'homepage',
            component: () => import('~/views/index'),
          },
          {
            path: 'bangumi/news',
            component: () => import('~/views/bangumi/news'),
          },
          {
            path: 'bangumi/rank',
            component: () => import('~/views/bangumi/rank'),
          },
          {
            path: 'bangumi/timeline',
            component: () => import('~/views/bangumi/time'),
          },
          {
            name: 'bangumi-tags',
            path: 'bangumi/tags/:id?',
            component: () => import('~/views/bangumi/tags'),
          },
          {
            path: 'bangumi/:id(\\d+)',
            name: 'bangumi-show',
            component: () => import('~/views/bangumi/show'),
          },
          {
            path: 'video/:id(\\d+)',
            component: () => import('~/views/video/show'),
          },
          {
            path: 'user/:zone',
            name: 'user-show',
            component: () => import('~/views/user/show'),
          },
          {
            path: 'post/:id(\\d+)',
            name: 'post-show',
            component: () => import('~/views/post/show'),
          },
          {
            path: 'post/trending/:sort',
            component: () => import('~/views/post/trending'),
          },
          {
            path: 'about/hello',
            name: 'hello',
            component: () => import('~/views/about/hello'),
          },
          {
            path: 'about/invite/:id(\\d+)',
            name: 'invite-user',
            component: () => import('~/views/about/invite'),
          },
          {
            path: 'role/trending',
            component: () => import('~/views/role/trending'),
          },
          {
            path: 'role/:id(\\d+)',
            name: 'role-show',
            component: () => import('~/views/role/show'),
          },
          {
            path: 'image/trending/:sort',
            name: 'image-trending',
            component: () => import('~/views/image/trending'),
          },
          {
            path: 'image/album/:id(\\d+)',
            name: 'image-album',
            component: () => import('~/views/image/album'),
          },
          {
            path: 'search',
            name: 'search-index',
            component: () => import('~/views/search/index'),
          },
        ],
      },
      {
        path: '/errors',
        meta: { useAuth: true },
        component: () => import('~/layouts/error'),
        children: [
          {
            path: '400',
            component: () => import('~/views/error/400'),
          },
          {
            path: '401',
            component: () => import('~/views/error/401'),
          },
          {
            path: '403',
            component: () => import('~/views/error/403'),
          },
          {
            path: '404',
            component: () => import('~/views/error/404'),
          },
          {
            path: '429',
            component: () => import('~/views/error/429'),
          },
          {
            path: '500',
            component: () => import('~/views/error/500'),
          },
          {
            path: '503',
            component: () => import('~/views/error/503'),
          },
        ],
      },
      {
        path: '/admin',
        meta: { isAdmin: true },
        component: () => import('~/layouts/admin'),
        children: [
          {
            path: '',
            hidden: true,
            redirect: 'dashboard',
            component: () => import('~/layouts/empty'),
            children: [
              {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index'),
              },
            ]
          },
          {
            path: 'example',
            name: 'Example',
            meta: { title: 'Example', icon: 'coffee' },
            component: () => import('~/layouts/empty'),
            redirect: 'example/table',
            children: [
              {
                path: 'table',
                name: 'Table',
                meta: { title: 'Table', icon: 'coffee' },
                component: () => import('@/views/table/index')
              },
              {
                path: 'tree',
                name: 'Tree',
                meta: { title: 'Tree', icon: 'coffee' },
                component: () => import('@/views/tree/index')
              }
            ]
          },
          {
            path: 'bangumi',
            name: 'Bangumi',
            meta: { title: '番剧管理', icon: 'coffee' },
            component: () => import('~/layouts/empty'),
            redirect: 'bangumi/list',
            children: [
              {
                path: 'list',
                name: 'bangumi-list',
                meta: { title: '番剧列表', icon: 'coffee' },
                component: () => import('@/views/bangumi/list')
              },
              {
                path: 'edit/:id(\\d+)',
                name: 'bangumi-edit',
                hidden: true,
                meta: { title: '编辑番剧', icon: 'coffee' },
                component: () => import('@/views/bangumi/edit')
              },
              {
                path: 'create',
                name: 'bangumi-create',
                meta: { title: '创建番剧', icon: 'coffee' },
                component: () => import('@/views/bangumi/edit')
              }
            ]
          },
          {
            path: 'image',
            component: () => import('~/layouts/empty'),
            redirect: 'image/banner',
            children: [
              {
                path: 'banner',
                name: 'image-banner',
                meta: { title: '主站轮播图', icon: 'coffee' },
                component: () => import('@/views/image/banner')
              }
            ]
          },
        ],
      },
    ],
  });
}
