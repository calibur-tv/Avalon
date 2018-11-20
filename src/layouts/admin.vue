<style lang="scss">
#app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  @extend %clearfix;

  .app-main {
    height: 100%;
    padding: 20px;

    > * {
      min-height: 100%;

      > header {
        margin-bottom: 20px;
      }

      > footer {
        margin-top: 20px;
        margin-right: 30px;
      }
    }
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
    &:before,
    &:after {
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
      <no-ssr>
        <app-main/>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar'
import Sidebar from '@/components/Layout/Sidebar'
import AppMain from '@/components/Layout/AppMain'
import 'moment'
import 'lodash'
import '@/filters'
import '@/utils/library'

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
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.1.0/css/all.css'
      }
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
