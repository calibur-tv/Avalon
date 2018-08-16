export default {
  props: {
    bangumiId: {
      type: Number,
      default: 0
    },
    userZone: {
      type: String,
      default: ""
    },
    bangumiName: {
      type: String,
      default: ""
    }
  },
  computed: {
    fetchMoreAction() {
      if (this.bangumiId || this.userZone) {
        return "flow/getData";
      }
      return "world/getData";
    },
    fetchInitAction() {
      if (this.bangumiId || this.userZone) {
        return "flow/initData";
      }
      return "world/initData";
    },
    fetchStore() {
      if (this.bangumiId || this.userZone) {
        return "flow";
      }
      return "world";
    },
    fetchSort() {
      if (this.userZone) {
        return "news";
      }
      if (this.flowType === "role") {
        return "hot";
      }
      return "active";
    },
    fetchEvent() {
      if (this.bangumiId) {
        return `bangumi-tab-switch-${this.flowType}`;
      }
      if (this.userZone) {
        return `user-tab-switch-${this.flowType}`;
      }
      return "";
    },
    source() {
      return this.$store.state[this.fetchStore][this.flowType][this.fetchSort];
    },
    showNoContentTips() {
      return this.bangumiId || this.isMe;
    },
    isMe() {
      return this.$store.state.user.login
        ? this.$store.state.user.zone === this.userZone
        : false;
    }
  },
  methods: {
    async initData() {
      try {
        await this.$store.dispatch(this.fetchInitAction, {
          ctx: this,
          type: this.flowType,
          sort: this.fetchSort,
          userZone: this.userZone,
          bangumiId: this.bangumiId
        });
      } catch (e) {
        this.$toast.error(e);
      }
    },
    async loadMore() {
      try {
        await this.$store.dispatch(this.fetchMoreAction, {
          ctx: this,
          type: this.flowType,
          sort: this.fetchSort,
          userZone: this.userZone,
          bangumiId: this.bangumiId
        });
      } catch (e) {
        this.$toast.error(e);
      }
    }
  },
  mounted() {
    if (this.fetchEvent && !this.source.list.length) {
      this.$channel.$on(this.fetchEvent, () => {
        this.initData();
        this.$channel.$off(this.fetchEvent);
      });
    }
  }
};
