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

  .layout-main {
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
  }
}
</style>

<template>
  <div id="role-show">
    <v-header/>
    <v-layout>
      <template slot="main">
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
            <el-button
              type="warning"
              class="star"
              size="mini"
              round
              plain
              @click="handleStarRole"
            >为TA应援</el-button>
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
              <strong>粉丝：</strong>共有 {{ role.fans_count }} 个粉丝，收获了 {{ role.star_count }} 个金币
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
              @click="openFansModal('hot')"
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
      </template>
      <template slot="aside">
        <div class="bangumi">
          <p class="sub-title">所属番剧</p>
          <v-bangumi-panel
            :id="bangumi.id"
            :name="bangumi.name"
            :avatar="bangumi.avatar"
            :summary="bangumi.summary"
            :followed="bangumi.followed"
            class="bangumi-panel"
            @follow="handleFollowBangumiAction"
          />
        </div>
        <div class="fans">
          <p class="sub-title">应援团{{ role.fans_count ? `（${role.fans_count}）` : '' }}</p>
          <ava-dialog
            v-if="role.fans_count"
            :users="fansModalData"
            :fetch="fetchRoleFans"
            :title="`《${role.name}》应援团`"
            :loading="loadingRoleFans"
            :no-more="noMoreFans"
            :display-count="6"
          />
          <template v-else>
            <span>TA 还没有真正的粉丝...</span>
          </template>
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
      v-model="toggleFansListModal"
      :footer="false"
      :title="`${role.name} · 应援团`"
      :scroll="fetchRoleFans"
      :loading="loadingRoleFans"
      :no-more="noMoreFans"
      class="likes-modal"
    >
      <li
        v-for="item in fansModalData"
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
          >{{ item.score }}个金币</span>
        </a>
      </li>
    </v-dialog>
  </div>
</template>

<script>
import uploadMixin from "~/mixins/upload";
import CreateRoleForm from "~/components/bangumi/forms/CreateRoleForm";
import CommentMain from "~/components/comments/CommentMain";

export default {
  name: "RoleShow",
  async asyncData({ store, route, ctx }) {
    const id = route.params.id;
    await Promise.all([
      store.dispatch("cartoonRole/getRoleInfo", { ctx, id }),
      store.dispatch("cartoonRole/getFansList", {
        ctx,
        bangumiId: 0,
        roleId: id,
        sort: "new",
        reset: false
      }),
      store.dispatch("comment/getMainComments", {
        ctx,
        id,
        type: "role",
        seeReplyId: route.query["comment-id"]
      })
    ]);
  },
  head() {
    return {
      title: `${this.role.name} - 角色`,
      meta: [
        { hid: "description", name: "description", content: this.role.intro },
        {
          hid: "keywords",
          name: "keywords",
          content: `calibur,角色,天下漫友是一家,${this.role.alias}`
        }
      ]
    };
  },
  components: {
    CreateRoleForm,
    CommentMain
  },
  mixins: [uploadMixin],
  data() {
    return {
      toggleFansListModal: false,
      loadingRoleFans: false,
      showEditModal: false,
      focusRoleSort: "new"
    };
  },
  computed: {
    id() {
      return +this.$route.params.id;
    },
    info() {
      return this.$store.state.cartoonRole.info;
    },
    role() {
      return this.info.data;
    },
    bangumi() {
      return this.info.bangumi;
    },
    fans() {
      return this.$store.state.cartoonRole.fans.new;
    },
    computeRoleAlias() {
      return this.role.alias.split(",");
    },
    displayFans() {
      return this.fans.data.slice(0, 6);
    },
    fansModalData() {
      return this.focusRoleSort === "new"
        ? this.fans.data
        : this.$store.state.cartoonRole.fans.hot.data;
    },
    noMoreFans() {
      return this.$store.state.cartoonRole.fans[this.focusRoleSort].noMore;
    }
  },
  methods: {
    handleFollowBangumiAction(result) {
      this.$store.commit("cartoonRole/FOLLOW_ROLE_BANGUMI", { result });
    },
    async handleStarRole() {
      if (!this.$store.state.login) {
        this.$channel.$emit("sign-in");
        return;
      }
      if (!this.$store.state.user.coin) {
        this.$toast.error("金币不足");
        return;
      }
      try {
        await this.$store.dispatch("cartoonRole/star", {
          bangumiId: this.bangumi.id,
          roleId: this.id,
          ctx: this,
          hasStar: this.role.hasStar
        });
        this.$store.commit("USE_COIN");
        this.$toast.success(`+${this.role.hasStar}s`);
      } catch (e) {
        this.$toast.error(e);
      }
    },
    async fetchRoleFans(init = false) {
      if (init && this.fansModalData.length > 10) {
        return;
      }
      if (this.loadingRoleFans) {
        return;
      }
      this.loadingRoleFans = true;
      try {
        await this.$store.dispatch("cartoonRole/getFansList", {
          ctx: this,
          bangumiId: this.bangumi.id,
          roleId: this.id,
          sort: this.focusRoleSort
        });
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loadingRoleFans = false;
      }
    },
    openFansModal(sort) {
      this.focusRoleSort = sort;
      this.toggleFansListModal = true;
      this.fetchRoleFans(true);
    },
    cartoonRoleEditSuccess() {
      this.$toast.success("编辑成功");
      this.showEditModal = false;
      window.location.reload();
    },
    showEditRoleModal() {
      this.uploadConfig.max = 1;
      this.uploadConfig.pathPrefix = `bangumi/${this.bangumi.id}/role/${
        this.role.id
      }/avatar`;
      this.showEditModal = true;
    }
  }
};
</script>
