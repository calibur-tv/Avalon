<style lang="scss">
  #admin-nav {
    .navbar {
      height: 50px;
      line-height: 50px;
      border-radius: 0 !important;

      .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
      }

      .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
      }

      .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;

        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }

    .todo {
      background: #fff;
      height: 39px;
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
      padding: 5px 0 0 8px;

      a {
        margin-right: 10px;
      }
    }
  }
</style>

<template>
  <nav id="admin-nav">
    <el-menu
      class="navbar"
      mode="horizontal"
    >
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />
      <breadcrumb/>
    </el-menu>
    <div
      v-if="todoCount"
      class="todo"
    >
      <router-link
        v-if="todo.users"
        to="/admin/trial/user"
      >
        <el-button
          type="danger"
          size="mini"
        >用户待审：{{ todo.users }}</el-button>
      </router-link>
      <router-link
        v-if="todo.images"
        to="/admin/trial/image"
      >
        <el-button
          type="warning"
          size="mini"
        >图片待审：{{ todo.images }}</el-button>
      </router-link>
      <router-link
        v-if="todo.posts"
        to="/admin/trial/post"
      >
        <el-button
          type="primary"
          size="mini"
        >帖子待审：{{ todo.posts }}</el-button>
      </router-link>
      <router-link
        v-if="todo.comments"
        to="/admin/trial/comment"
      >
        <el-button
          type="success"
          size="mini"
        >评论待审：{{ todo.comments }}</el-button>
      </router-link>
      <router-link
        v-if="todo.feedback"
        to="/admin/user/feedback"
      >
        <el-button
          type="info"
          size="mini"
        >用户反馈：{{ todo.feedback }}</el-button>
      </router-link>
      <router-link
        v-if="todo.bangumi"
        to="/admin/trial/bangumi"
      >
        <el-button
          type="danger"
          size="mini"
        >番剧审核：{{ todo.bangumi }}</el-button>
      </router-link>
      <router-link
        v-if="todo.role"
        to="/admin/trial/role"
      >
        <el-button
          type="danger"
          size="mini"
        >偶像审核：{{ todo.role }}</el-button>
      </router-link>
    </div>
  </nav>
</template>

<script>
  import Api from '~/api/adminApi'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    data () {
      return {
        todo: null
      }
    },
    computed: {
      sidebar () {
        return this.$store.state.admin.sidebar
      },
      todoCount () {
        let result = 0;
        if (!this.todo) {
          return result
        }

        Object.keys(this.todo).forEach(key => {
          result += this.todo[key]
        });

        return result
      }
    },
    watch: {
      $route () {
        this.getTodo()
      }
    },
    mounted () {
      this.getTodo();
      this.$channel.$on('admin-trial-do', ({ type }) => {
        this.todo[type] = this.todo[type] - 1
      })
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('admin/ToggleSideBar')
      },
      getTodo () {
        const api = new Api(this)
        api.getTodo().then((data) => {
          this.todo = data
        }).catch(() => {})
      }
    }
  }
</script>
