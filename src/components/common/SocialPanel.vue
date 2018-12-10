<style lang="scss">
.social-panel {
  margin: 50px 0;

  .buttons {
    text-align: center;
  }

  .users {
    margin-top: 25px;
    text-align: center;
  }
}
</style>

<template>
  <div class="social-panel">
    <div class="buttons">
      <el-button
        v-if="isCreator"
        :class="{ 'is-plain': rewarded }"
        :loading="loadingReward"
        type="warning"
        round
        @click="toggleReward"
      >
        <i class="iconfont icon-fantuan"/>
        {{ rewarded ? '已投食' : '投食' }}{{ rewardUsers.total ? `&nbsp;&nbsp;|&nbsp;&nbsp;${rewardUsers.total}` : '' }}
      </el-button>
      <el-button
        v-else
        :class="{ 'is-plain': liked }"
        :loading="loadingLike"
        type="danger"
        round
        @click="toggleLike"
      >
        <i class="iconfont icon-like"/>
        {{ liked ? '已喜欢' : '喜欢' }}{{ likeUsers.total ? `&nbsp;&nbsp;|&nbsp;&nbsp;${likeUsers.total}` : '' }}
      </el-button>
      <el-button
        :class="{ 'is-plain': marked }"
        :loading="loadingMark"
        type="success"
        round
        @click="toggleMark"
      >
        <i class="iconfont icon-mark"/>
        {{ marked ? '已收藏' : '收藏' }}{{ markUsers.total ? `&nbsp;&nbsp;|&nbsp;&nbsp;${markUsers.total}` : '' }}
      </el-button>
    </div>
    <div class="users">
      <ava-dialog
        v-if="isCreator"
        :users="rewardUsers.list"
        :no-more="rewardUsers.noMore"
        :loading="loadingUsers"
        :fetch="fetchUsers"
        title="投食的人"
      />
      <ava-dialog
        v-else
        :users="likeUsers.list"
        :no-more="likeUsers.noMore"
        :loading="loadingUsers"
        :fetch="fetchUsers"
        title="喜欢的人"
      />
    </div>
  </div>
</template>

<script>
import Api from '~/api/toggleApi'

export default {
  name: 'SocialPanel',
  props: {
    isCreator: {
      required: true,
      type: Boolean
    },
    userId: {
      required: true,
      type: Number
    },
    liked: {
      type: Boolean,
      default: false
    },
    marked: {
      type: Boolean,
      default: false
    },
    rewarded: {
      type: Boolean,
      default: false
    },
    id: {
      required: true,
      type: Number
    },
    type: {
      required: true,
      type: String,
      validator: val =>
        ~['post', 'video', 'image', 'score', 'answer', 'video'].indexOf(val)
    },
    likeUsers: {
      required: true,
      type: Object
    },
    rewardUsers: {
      required: true,
      type: Object
    },
    markUsers: {
      required: true,
      type: Object
    },
    userCommitPath: {
      type: String,
      default: ''
    },
    socialCommitPath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loadingUsers: false,
      loadingReward: false,
      loadingLike: false,
      loadingMark: false
    }
  },
  computed: {
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0
    },
    isMine() {
      return this.userId === this.currentUserId
    }
  },
  methods: {
    toggleReward() {
      if (!this.currentUserId) {
        this.$channel.$emit('sign-in')
        return
      }
      if (this.isMine) {
        this.$toast.info('不能给自己打赏')
        return
      }
      this.$confirm(
        this.rewarded
          ? '即使取消投食你的团子也不会回到你的钱包, 是否继续?'
          : '向TA投食需要消耗你一个团子，是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(async () => {
          if (this.loadingReward) {
            return
          }
          this.loadingReward = true
          const api = new Api(this)
          try {
            const result = await api.reward({
              id: this.id,
              type: this.type
            })
            if (result) {
              this.$store.commit('USE_COIN')
            }
            this.commitResult('reward', result)
            this.$emit('reward-callback')
            this.$toast.success('操作成功')
          } catch (e) {
            this.$toast.error(e)
          } finally {
            this.loadingReward = false
          }
        })
        .catch(() => {})
    },
    async toggleLike() {
      if (!this.currentUserId) {
        this.$channel.$emit('sign-in')
        return
      }
      if (this.isMine) {
        this.$toast.info('不能喜欢自己的内容')
        return
      }
      if (this.loadingLike) {
        return
      }
      this.loadingLike = true
      const api = new Api(this)
      try {
        const result = await api.like({
          id: this.id,
          type: this.type
        })
        this.commitResult('like', result)
        this.$toast.success('操作成功')
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loadingLike = false
      }
    },
    async toggleMark() {
      if (!this.currentUserId) {
        this.$channel.$emit('sign-in')
        return
      }
      if (this.isMine) {
        this.$toast.info('不能收藏自己的内容')
        return
      }
      if (this.loadingMark) {
        return
      }
      this.loadingMark = true
      const api = new Api(this)
      try {
        const result = await api.mark({
          id: this.id,
          type: this.type
        })
        this.commitResult('mark', result)
        this.$toast.success('操作成功')
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loadingMark = false
      }
    },
    async fetchUsers() {
      if (this.loadingUsers) {
        return
      }
      this.loadingUsers = true
      const api = new Api(this)
      const type = this.isCreator ? 'reward' : 'like'
      try {
        const result = await api.users({
          id: this.id,
          type,
          model: this.type,
          take: this.take,
          last_id: this.isCreator
            ? this.rewardUsers.list[this.rewardUsers.list.length - 1].id
            : this.likeUsers.list[this.likeUsers.list.length - 1].id
        })
        this.$store.commit(
          this.userCommitPath || `${this.type}/FETCH_SOCIAL_USERS`,
          {
            id: this.id,
            type,
            result
          }
        )
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loadingUsers = false
      }
    },
    commitResult(key, value) {
      const user = this.$store.state.user
      const type = this.type
      this.$store.commit(this.socialCommitPath || `${type}/SOCIAL_TOGGLE`, {
        id: this.id,
        key,
        value,
        user: {
          id: user.id,
          zone: user.zone,
          nickname: user.nickname,
          avatar: user.avatar
        }
      })
    }
  }
}
</script>
