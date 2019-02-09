<style lang="scss">
#role-show {
  .sub-title {
    margin-bottom: 20px;

    button {
      vertical-align: top;
      padding: 5px 15px;
      margin-left: 10px;
    }
  }

  .intro {
    margin-bottom: 35px;

    .avatar-wrap {
      float: left;
      margin-right: 25px;
      text-align: center;

      .avatar {
        width: 150px;
        height: 150px;
        display: block;
      }

      button {
        margin-top: 15px;
      }
    }

    .info {
      overflow: hidden;

      .name {
        font-size: 42px;
        margin-bottom: 10px;
        margin-top: 0;
      }

      .summary {
        line-height: 24px;
        font-size: 14px;
        margin-bottom: 10px;
      }

      .alias {
        line-height: 24px;
        font-size: 14px;
        margin-bottom: 10px;

        strong {
          float: left;
        }

        li {
          float: left;
          margin-right: 10px;
          text-decoration: underline;
        }
      }

      .coin {
        line-height: 24px;
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
  }

  .lover {
    margin-bottom: 25px;

    .user {
      .avatar {
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #f0f0f0;
        overflow: hidden;
        @include avatar(40px);
        margin-right: 10px;
      }
    }
  }

  aside {
    .fans {
      .user-face {
        margin: 0 -5px;
        display: inline-block;
        vertical-align: middle;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid #fff;
        }

        a {
          display: block;
        }
      }

      .el-icon-more {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        border: 3px solid #fff;
        background-color: $color-gray-normal;
        margin-left: -10px;

        &:hover {
          background-color: $color-gray-deep;
        }
      }
    }
  }
}
</style>

<template>
  <div id="role-show">
    <v-header/>
    <v-layout>
      <div class="intro clearfix">
        <p class="sub-title">
          角色信息
          <el-button
            v-if="bangumi.is_master"
            size="mini"
            round
            @click="showEditRoleModal"
          >编辑</el-button>
        </p>
        <div class="avatar-wrap">
          <img
            :src="$resize(role.avatar, { width: 200 })"
            class="avatar"
          >
          <cartoon-role-btn
            :id="id"
            @success="handleStarCallback"
          />
        </div>
        <div class="info">
          <h1
            class="name"
            v-text="role.name"
          />
          <p class="summary">
            <strong>简介：</strong>{{ role.intro }}
          </p>
          <ul class="alias">
            <strong>别名：</strong>
            <li
              v-for="(name, index) in computeRoleAlias"
              :key="index"
              v-text="name"
            />
          </ul>
          <p
            v-if="role.star_count"
            class="coin"
          >
            <strong>粉丝：</strong>共有 {{ role.fans_count }} 个粉丝，收获了 {{ role.star_count }} 个团子
          </p>
        </div>
      </div>
      <div
        v-if="role.lover"
        class="lover"
      >
        <p class="sub-title">
          守护者
          <el-button
            size="mini"
            round
            @click="openFansDialog('hot')"
          >排行榜</el-button>
        </p>
        <a
          :href="$alias.user(role.lover.zone)"
          class="user"
          target="_blank"
        >
          <div class="avatar">
            <img :src="$resize(role.lover.avatar, { width: 80 })">
          </div>
          <span v-text="role.lover.nickname"/>
        </a>
      </div>
      <comment-main
        :id="id"
        :master-id="1"
        type="role"
      />
      <template slot="aside">
        <div class="bangumi">
          <p class="sub-title">所属番剧</p>
          <bangumi-panel
            :id="bangumi.id"
            :name="bangumi.name"
            :avatar="bangumi.avatar"
            :summary="bangumi.summary"
          />
        </div>
        <div
          v-if="loadedFans"
          class="fans"
        >
          <p class="sub-title">应援团{{ role.fans_count ? `（${role.fans_count}）` : '' }}</p>
          <template v-if="latestFans.nothing">
            <span>TA 还没有真正的粉丝...</span>
          </template>
          <ul v-else>
            <li
              v-for="user in latestFans.list.slice(0, 6)"
              :key="user.id"
              class="user-face"
            >
              <el-tooltip
                :content="user.nickname"
                class="item"
                effect="dark"
                placement="top"
              >
                <a
                  :href="$alias.user(user.zone)"
                  target="_blank"
                >
                  <img :src="$resize(user.avatar, { width: 80 })">
                </a>
              </el-tooltip>
            </li>
            <button
              v-if="latestFans.list.length > 6"
              class="el-icon-more"
              @click="openFansDialog('new')"
            />
          </ul>
        </div>
      </template>
    </v-layout>
    <v-dialog
      v-if="bangumi.is_master"
      v-model="showEditModal"
      :title="`编辑 - ${role.name}`"
      :footer="false"
    >
      <create-role-form
        :role="role"
        :bangumi-id="bangumi.id"
        @success="cartoonRoleEditSuccess"
      />
    </v-dialog>
    <v-dialog
      v-if="fansModalData"
      v-model="showFansDialog"
      :footer="false"
      :title="`${role.name} · 应援团`"
      :scroll="loadMoreFans"
      :loading="fansModalData.loading"
      :no-more="fansModalData.noMore"
      class="likes-modal"
    >
      <li
        v-for="item in fansModalData.list"
        :key="item.id"
      >
        <a
          :href="$alias.user(item.zone)"
          class="user"
          target="_blank"
        >
          <img
            :src="$resize(item.avatar, { width: 80 })"
            class="avatar"
          >
          <span
            class="nickname"
            v-text="item.nickname"
          />
          <v-time
            v-if="focusRoleSort === 'new'"
            v-model="item.score"
            class="score"
          />
          <span
            v-else
            class="score"
          >{{ item.score }}个团子</span>
        </a>
      </li>
    </v-dialog>
  </div>
</template>

<script>
import CreateRoleForm from '~/components/bangumi/forms/CreateRoleForm'
import CommentMain from '~/components/comments/CommentMain'
import CartoonRoleBtn from '~/components/buttons/CartoonRoleBtn'
import { getCartoonRoleInfo } from '~/api/cartoonRoleApi'

export default {
  name: 'RoleShow',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ app, store, params, error }) {
    const { id } = params
    return getCartoonRoleInfo(app, { id })
      .then(data => {
        const { bangumi } = data
        store.commit('social/SET_STATE', {
          type: 'bangumi',
          id: bangumi.id,
          data: {
            follow: bangumi.followed
          }
        })
        return {
          info: data,
          role: data.data,
          bangumi
        }
      })
      .catch(error)
  },
  async fetch({ store, params, query }) {
    await store.dispatch('comment/getMainComments', {
      id: params.id,
      type: 'role',
      seeReplyId: query['comment-id']
    })
  },
  head() {
    return {
      title: `${this.role.name} - 角色`,
      meta: [
        { hid: 'description', name: 'description', content: this.role.intro },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `calibur,角色,天下漫友是一家,${this.role.alias}`
        }
      ]
    }
  },
  components: {
    CreateRoleForm,
    CartoonRoleBtn,
    CommentMain
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      info: null,
      role: null,
      bangumi: null,
      showFansDialog: false,
      showEditModal: false,
      focusRoleSort: 'new',
      loadedFans: false
    }
  },
  computed: {
    computeRoleAlias() {
      return this.role.alias.split(',')
    },
    fansModalData() {
      return this.focusRoleSort === 'new' ? this.latestFans : this.biggestFans
    },
    latestFans() {
      return this.$store.getters['flow/getFlow'](
        'cartoonRoleFans',
        'new',
        this.id
      )
    },
    biggestFans() {
      return this.$store.getters['flow/getFlow'](
        'cartoonRoleFans',
        'hot',
        this.id
      )
    },
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0
    }
  },
  mounted() {
    this.initFansList('new')
  },
  methods: {
    handleStarCallback(count) {
      if (!this.role.hasStar) {
        this.role.fans_count++
      }
      if (this.role.lover && this.currentUserId === this.role.lover.id) {
        this.role.lover.score += count
      }
      this.role.hasStar += count
      this.role.star_count += count
      this.$toast.success(`+${this.role.hasStar}s`)
    },
    cartoonRoleEditSuccess() {
      this.$toast.success('编辑成功')
      this.showEditModal = false
      window.location.reload()
    },
    showEditRoleModal() {
      this.showEditModal = true
    },
    openFansDialog(sort) {
      this.initFansList(sort)
      this.focusRoleSort = sort
      this.showFansDialog = true
    },
    async initFansList(sort) {
      await this.$store.dispatch('flow/initData', {
        func: 'cartoonRoleFans',
        type: sort === 'new' ? 'lastId' : 'seenIds',
        sort: sort,
        id: this.id
      })
      this.loadedFans = true
    },
    loadMoreFans() {
      this.$store.dispatch('flow/loadMore', {
        func: 'cartoonRoleFans',
        type: this.focusRoleSort === 'new' ? 'lastId' : 'seenIds',
        sort: this.focusRoleSort,
        id: this.id
      })
    }
  }
}
</script>
