<style lang="scss">
  #app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    text-rendering: optimizeLegibility;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    @extend %clearfix;

    .app-main {
      min-height: 100%
    }

    .app-container {
      padding: 20px;
    }

    .drawer-bg {
      background: #000;
      opacity: 0.3;
      width: 100%;
      top: 0;
      height: 100%;
      position: absolute;
      z-index: 999;
    }

    label {
      font-weight: 700;
    }

    ul {
      &:before, &:after {
        content: none;
      }
    }
  }
</style>

<template>
  <div
    id="app-wrapper"
    :class="classObj"
  >
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Layout/Navbar'
  import Sidebar from '@/components/Layout/Sidebar'
  import AppMain from '@/components/Layout/AppMain'
  import '@/filters'
  import '@/utils/icon'

  export default {
    name: 'AdminLayout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    head: {
      title: 'calibur - 控制台',
      link: [
        { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.1.0/css/all.css' }
      ]
    },
    computed: {
      sidebar() {
        return this.$store.state.admin.sidebar
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation
        }
      }
    }
  }
</script>
