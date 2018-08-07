<style lang="scss">
.follow-button {
  &.is-plain {
    background-color: transparent;
  }
}
</style>

<template>
  <el-button
    :loading="loading"
    :class="classes"
    :plain="followed"
    type="danger"
    class="follow-button"
    round
    @click="toggleFollow"
  >
    <i class="iconfont icon-guanzhu"/>
    {{ followed ? '已关注' : '关注' }}
  </el-button>
</template>

<script>
import Api from "~/api/toggleApi";

export default {
  props: {
    type: {
      required: true,
      type: String,
      validator: val => ~["bangumi", "user", "question"].indexOf(val)
    },
    id: {
      required: true,
      type: Number
    },
    followed: {
      required: true,
      type: Boolean
    },
    classes: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0;
    }
  },
  methods: {
    async toggleFollow() {
      if (!this.currentUserId) {
        this.$channel.$emit("sign-in");
        return;
      }
      if (this.type === "user" && this.id === this.currentUserId) {
        this.$toast.error("不能关注你自己");
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      const api = new Api(this);
      try {
        const result = await api.follow({
          type: this.type,
          id: this.id
        });
        this.$emit("submit", result);
      } catch (e) {
        this.$toast.error(e);
      } finally {
      }
      this.loading = false;
    }
  }
};
</script>
