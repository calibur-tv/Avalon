<style lang="scss">
  $menuBg :#304156;
  $subMenuBg: #1f2d3d;
  $menuHover: #001528;
  // 主体区域
  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: 180px;
  }
  // 侧边栏
  .sidebar-container {
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;

    //reset element-ui css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .scrollbar-wrapper {
      height: calc(100% + 15px);

      .el-scrollbar__view {
        height: 100%;
      }
    }
    .is-horizontal {
      display: none;
    }

    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }

    .svg-icon {
      margin-right: 16px;
    }

    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }

    .hideSidebar {
      .sidebar-container {
        width: 36px !important;
      }

      .main-container {
        margin-left: 36px;
      }

      .submenu-title-noDropdown {
        padding-left: 10px !important;
        position: relative;

        .el-tooltip {
          padding: 0 10px !important;
        }
      }
      .el-submenu {
        overflow: hidden;

        &>.el-submenu__title {
          padding-left: 10px !important;

          .el-submenu__icon-arrow {
            display: none;
          }
        }
      }

      .el-menu--collapse {
        .el-submenu {
          &>.el-submenu__title {
            &>span {
              height: 0;
              width: 0;
              overflow: hidden;
              visibility: hidden;
              display: inline-block;
            }
          }
        }
      }
    }

    .sidebar-container .nest-menu .el-submenu>.el-submenu__title,
    .sidebar-container .el-submenu .el-menu-item {
      min-width: 180px !important;
      background-color: $subMenuBg !important;

      &:hover {
        background-color: $menuHover !important;
      }
    }

    .router-link-active {
      span, i {
        color: rgb(64, 158, 255);
      }
    }

    .el-menu--collapse .el-menu .el-submenu {
      min-width: 180px !important;
    }
  }
</style>

<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import SidebarItem from './SidebarItem'

  export default {
    components: { SidebarItem },
    computed: {
      sidebar() {
        return this.$store.state.admin.sidebar
      },
      routes() {
        return this.$router.options.routes.filter(_ => _.path === '/admin')[0].children
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
