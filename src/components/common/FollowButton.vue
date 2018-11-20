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
    :type="theme"
    :round="round"
    :size="size"
    class="follow-button"
    @click="toggleFollow"
  >
    <i class="iconfont icon-follow"/>
    {{ followed ? followedText : unFollowText }}
  </el-button>
</template>

<script>
import Api from '~/api/toggleApi'

export default {
  name: 'FollowButton',
  props: {
    type: {
      required: true,
      type: String,
      validator: val => ~['bangumi', 'user', 'question'].indexOf(val)
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
      default: ''
    },
    theme: {
      type: String,
      default: 'danger'
    },
    round: {
      type: Boolean,
      default: true
    },
    followedText: {
      type: String,
      default: '已关注'
    },
    unFollowText: {
      type: String,
      default: '关注'
    },
    size: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0
    }
  },
  methods: {
    async toggleFollow() {
      if (!this.currentUserId) {
        this.$channel.$emit('sign-in')
        return
      }
      if (this.type === 'user' && this.id === this.currentUserId) {
        this.$toast.error('不能关注你自己')
        return
      }
      if (this.loading) {
        return
      }
      this.loading = true
      const api = new Api(this)
      try {
        const result = await api.follow({
          type: this.type,
          id: this.id
        })
        this.$emit('submit', result)
      } catch (e) {
        this.$toast.error(e)
      } finally {
      }
      this.loading = false
    }
  }
}
</script>
