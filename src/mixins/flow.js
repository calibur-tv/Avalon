export default {
  data() {
    return {
      fetchLoading: false
    };
  },
  computed: {
    fetchAction() {
      if (this.bangumiId || this.userZone) {
        return "flow/getData";
      }
      return "world/getData";
    },
    fetchStore() {
      if (this.bangumiId || this.userZone) {
        return "flow";
      }
      return "world";
    },
    fetchPath() {
      if (this.userZone) {
        return "users";
      }
      return "active";
    },
    fetchSort() {
      if (this.userZone) {
        return "news";
      }
      return "active";
    },
    source() {
      return this.$store.state[this.fetchStore][this.fetchSort];
    }
  },
  methods: {
    async getData() {
      if (this.fetchLoading) {
        return;
      }
      this.fetchLoading = true;
      try {
        await this.$store.dispatch(this.fetchAction, {
          ctx: this,
          type: this.fetchType,
          sort: this.fetchPath,
          userZone: this.userZone,
          bangumiId: this.bangumiId
        });
      } catch (e) {
        this.$toast.error(e);
      } finally {
        this.fetchLoading = false;
      }
    }
  }
};
