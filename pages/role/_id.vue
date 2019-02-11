<style lang="scss">
#role-show {
  .sub-title {
    margin-bottom: 20px;
  }

  .intro {
    margin-bottom: 35px;

    .avatar-wrap {
      float: left;
      margin-right: 25px;
      text-align: center;

      .avatar {
        margin-top: 10px;
        width: 180px;
        height: 180px;
        display: block;
        border-bottom-left-radius: 225px 15px;
        border-bottom-right-radius: 15px 255px;
        border-top-left-radius: 15px 225px;
        border-top-right-radius: 255px 15px;
        box-shadow: 15px 28px 25px -18px rgba(0, 0, 0, 0.2);
        border: 2px solid #41403e;
      }

      button {
        margin-top: 18px;
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
      }
    }
  }

  .newest-owners {
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

  .rules {
    ul {
      margin-left: 12px;
      margin-top: 5px;

      li {
        list-style-type: disc;
        line-height: 22px;
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
        <p class="sub-title">偶像信息</p>
        <div class="avatar-wrap">
          <img
            :src="$resize(role.avatar, { width: 360 })"
            class="avatar"
          >
          <cartoon-role-btn
            :id="id"
            :price="role.stock_price"
            :locked="role.is_locked"
            :max="+role.max_stock_count"
            :buyed="+role.star_count"
            :name="role.name"
            @success="handleStarCallback"
          />
          <idol-exchange-btn
            :id="id"
            :name="role.name"
            :count="role.has_star"
            :price="role.stock_price"
            :locked="role.is_locked"
            :state="role.company_state"
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
          <div class="coin">
            <p><strong>当前市值：</strong>{{ role.company_state ? role.market_price : '未上市' }}</p>
            <p><strong>每股股价：</strong>￥{{ role.stock_price }}</p>
            <p><strong>持股人数：</strong>{{ role.fans_count }}</p>
            <p><strong>已认购股数：</strong>{{ role.star_count }}</p>
            <p><strong>总发行股数：</strong>{{ hasLimited ? role.max_stock_count : '无上限' }}</p>
          </div>
          <div class="coin">
            <p><strong>我持有的股数：</strong>{{ hasBuyStock ? role.has_star : '未入股' }}</p>
          </div>
          <div class="coin">
            <p><strong>注册时间：</strong>{{ role.created_at }}</p>
            <p v-if="role.iop_at"><strong>上市时间：</strong>{{ role.iop_at }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="role.boss"
        class="lover"
      >
        <p class="sub-title">大股东</p>
        <a
          :href="$alias.user(role.boss.zone)"
          class="user"
          target="_blank"
        >
          <div class="avatar">
            <img :src="$resize(role.boss.avatar, { width: 80 })">
          </div>
          <span v-text="role.boss.nickname"/>
        </a>
      </div>
      <tab-container
        :list="pages"
        :route="false"
        @change="handleTabSwitch"
      >
        <template slot="0">
          <comment-main
            :id="id"
            :master-id="1"
            :show-header="false"
            type="role"
          />
        </template>
        <template slot="1">
          <flow-list
            :id="id"
            func="virtualIdolOwners"
            type="lastId"
            sort="biggest"
          >
            <ul
              slot-scope="{ flow }"
              class="likes-modal"
            >
              <li
                v-for="item in flow"
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
                  <span class="score">持有{{ item.score }}股，占比{{ computedPercent(item.score) }}</span>
                </a>
              </li>
            </ul>
            <no-content slot="nothing">
              <el-button
                round
                @click="$toast.warn('Orz')"
              >可怜的「{{ role.name }}」还没有人入股</el-button>
            </no-content>
          </flow-list>
        </template>
        <template slot="2">
          <div class="rules">
            <el-alert
              type="info"
              title="目前还没有开放自定义公司章程，以下为功能简介："
            >
              <ul>
                <li>新注册的公司，只要至少有20人参股，就可以自动上市</li>
                <li>新注册的公司，若未能在指定时间期限内上市，则会倒闭，所有投资人的将无法获得收益</li>
                <li>上市之后，占股最多的人将成为最大的股东</li>
                <li>最大的股东并非实时变更，会在每天夜里重新指定</li>
                <li>最大的股东可以修改偶像的简介，以及修改「每股股价」来提高市值</li>
                <li>之后所有的持股人可以在「交易大厅」进行股权交易，以赚取虚拟币</li>
                <li>在未来，会开发出更多的方式，让股东可以获得分红</li>
              </ul>
            </el-alert>
          </div>
        </template>
        <template slot="3">
          <create-role-form
            v-if="isBoss || bangumi.is_master"
            :role="role"
            :is-boss="isBoss"
            :bangumi-id="bangumi.id"
            @success="cartoonRoleEditSuccess"
          />
          <el-alert
            v-else
            show-icon
            title="只有该番剧的管理员或者该偶像的大股东才能编辑偶像的信息"
            type="warning"
          />
        </template>
      </tab-container>
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
          <p class="sub-title">投资者{{ role.fans_count ? `（${role.fans_count}）` : '' }}</p>
          <template v-if="latestFans.nothing">
            <span>还没有人入股</span>
          </template>
          <ul
            v-else
            class="newest-owners"
          >
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
              @click="showFansDialog = true"
            />
          </ul>
        </div>
      </template>
    </v-layout>
    <v-dialog
      v-if="latestFans"
      v-model="showFansDialog"
      :footer="false"
      :title="`${role.name} · 的投资者`"
      :scroll="loadMoreFans"
      :loading="latestFans.loading"
      :no-more="latestFans.noMore"
      class="likes-modal"
    >
      <li
        v-for="item in latestFans.list"
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
            v-model="item.score"
            class="score"
          />
        </a>
      </li>
    </v-dialog>
  </div>
</template>

<script>
import CreateRoleForm from '~/components/bangumi/forms/CreateRoleForm'
import CommentMain from '~/components/comments/CommentMain'
import CartoonRoleBtn from '~/components/buttons/CartoonRoleBtn'
import IdolExchangeBtn from '~/components/idol/IdolExchangeBtn'
import TabContainer from '~/components/common/TabContainer'
import FlowList from '~/components/flow/FlowList'
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
        return { ...data }
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
      title: `${this.role.name} - 偶像`,
      meta: [
        { hid: 'description', name: 'description', content: this.role.intro },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `calibur,偶像,天下漫友是一家,${this.role.alias}`
        }
      ]
    }
  },
  components: {
    CreateRoleForm,
    CartoonRoleBtn,
    CommentMain,
    TabContainer,
    FlowList,
    IdolExchangeBtn
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      role: null,
      bangumi: null,
      share_data: null,
      showFansDialog: false,
      loadedFans: false,
      pages: [
        { label: '留言板' },
        { label: '股东列表' },
        { label: '公司章程' },
        { label: '编辑信息' }
      ]
    }
  },
  computed: {
    computeRoleAlias() {
      return this.role.alias.split(',')
    },
    latestFans() {
      return this.$store.getters['flow/getFlow'](
        'virtualIdolOwners',
        'newest',
        this.id
      )
    },
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0
    },
    isBoss() {
      return this.role.boss ? this.role.boss.id === this.currentUserId : false
    },
    hasLimited() {
      return this.role.max_stock_count !== '0.00'
    },
    hasBuyStock() {
      return this.role.has_star !== '0.00'
    }
  },
  mounted() {
    this.initNewestFans()
  },
  methods: {
    handleStarCallback({ count, amount }) {
      if (!parseFloat(this.role.has_star)) {
        this.role.fans_count++
        if (this.role.fans_count === 20) {
          this.role.company_state = 1
        }
      }
      if (this.role.boss && this.currentUserId === this.role.boss.id) {
        this.role.boss.score += count
      }
      this.role.market_price = parseFloat(
        parseFloat(this.role.market_price) + amount
      ).toFixed(2)
      this.role.has_star = parseFloat(
        parseFloat(this.role.has_star) + count
      ).toFixed(2)
      this.role.star_count = parseFloat(
        parseFloat(this.role.star_count) + count
      ).toFixed(2)
      this.$toast.success(`当前持股：${this.role.has_star}`)
    },
    cartoonRoleEditSuccess() {
      this.$toast.success('编辑成功')
      window.location.reload()
    },
    loadMoreFans() {
      this.$store.dispatch('flow/loadMore', {
        func: 'virtualIdolOwners',
        type: 'seenIds',
        sort: 'newest',
        id: this.id
      })
    },
    handleTabSwitch(index) {
      if (index === 1) {
        this.$store.dispatch('flow/initData', {
          func: 'virtualIdolOwners',
          type: 'lastId',
          sort: 'biggest',
          id: this.id
        })
      }
    },
    async initNewestFans() {
      if (!this.role.fans_count) {
        return
      }
      await this.$store.dispatch('flow/initData', {
        func: 'virtualIdolOwners',
        type: 'seenIds',
        sort: 'newest',
        id: this.id
      })
      this.loadedFans = true
    },
    computedPercent(score) {
      return `${parseFloat((score / this.role.star_count) * 100).toFixed(2)}%`
    }
  }
}
</script>
