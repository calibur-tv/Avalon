<style lang="scss">
#user-score-list {
  .el-radio-group {
    margin-left: 0 !important;
    margin-top: 6px;
  }

  .score-draft {
    padding-bottom: 15px;
    padding-top: 20px;
    &:not(:last-child) {
      border-bottom: 1px solid #f4f5f7;
    }

    .header {
      height: 30px;
      line-height: 30px;

      .title {
        overflow: hidden;
      }

      .bangumi {
        float: right;

        img {
          width: 30px;
          height: 30px;
          border-radius: 3px;
        }
      }
    }

    .body {
      display: block;
      font-size: 13px;
      @include twoline(16px);
    }
  }

  #no-content {
    margin-top: 25px;
  }
}
</style>

<template>
  <div id="user-score-list">
    <el-radio-group
      v-if="isMine"
      v-model="active"
      size="mini"
      @change="handleTabSwitch"
    >
      <el-radio-button label="已发布"/>
      <el-radio-button label="草稿箱"/>
    </el-radio-group>
    <template v-if="active === '已发布'">
      <template v-if="total">
        <score-flow
          v-for="item in list"
          :key="item.id"
          :item="item"
        />
        <el-button
          v-if="!noMore"
          :loading="loading"
          class="load-more-btn"
          type="info"
          plain
          @click="getData"
        >{{ loading ? '加载中' : '加载更多' }}</el-button>
      </template>
      <no-content v-else/>
    </template>
    <template v-else>
      <no-content
        v-if="fetchedDraft && !drafts.length"
      >
        <a
          :href="$alias.createScore"
          target="_blank"
        >
          <el-button
            type="primary"
            round
          >写漫评</el-button>
        </a>
      </no-content>
      <template v-else>
        <div
          v-for="item in drafts"
          :key="item.id"
          class="score-draft"
        >
          <div class="header">
            <a
              :href="$alias.bangumi(item.bangumi.id)"
              class="bangumi"
              target="_blank"
            >
              <img :src="$resize(item.bangumi.avatar, { width: 60 })">
            </a>
            <div class="title">
              <a
                :href="$alias.editScore(item.id)"
                class="href-fade-blue"
                target="_blank"
                v-text="item.title"
              />
            </div>
          </div>
          <a
            :href="$alias.editScore(item.id)"
            class="body"
            target="_blank"
            v-text="item.intro"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import Api from "~/api/scoreApi";
import ScoreFlow from "~/components/score/ScoreFlow";

export default {
  name: "UserScoreList",
  components: {
    ScoreFlow
  },
  props: {
    zone: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      state: {
        loading: false,
        fetched: false
      },
      list: [],
      noMore: false,
      total: 0,
      page: 0,
      take: 10,
      active: "已发布",
      drafts: [],
      loadingDraft: false,
      fetchedDraft: false
    };
  },
  computed: {
    isMine() {
      return this.$store.state.login
        ? this.$store.state.user.zone === this.zone
        : false;
    }
  },
  mounted() {
    this.$channel.$on("user-tab-switch-score", () => {
      if (!this.state.fetched) {
        this.getData();
      }
    });
  },
  methods: {
    handleTabSwitch(label) {
      if (label === "草稿箱" && !this.fetchedDraft) {
        this.getDraft();
      }
      this.active = label;
    },
    async getData() {
      if (this.state.loading) {
        return;
      }
      this.state.loading = true;
      const api = new Api(this);
      try {
        const data = await api.getUsersScore({
          zone: this.zone,
          page: this.page,
          take: this.take
        });
        this.list = this.list.concat(data.list);
        this.total = data.total;
        this.noMore = data.noMore;
        this.page++;
        this.state.fetched = true;
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.state.loading = false;
      }
    },
    async getDraft() {
      if (this.loadingDraft) {
        return;
      }
      this.loadingDraft = true;
      const api = new Api(this);
      try {
        this.drafts = await api.drafts();
        this.fetchedDraft = true;
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.loadingDraft = false;
      }
    }
  }
};
</script>
