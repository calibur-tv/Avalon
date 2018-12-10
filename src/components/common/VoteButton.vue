<style lang="scss">
.vote-button {
  display: inline-block;

  .vote-btn {
    padding: 0 10px;
    color: $color-blue-normal;
    background-color: rgba($color-blue-normal, 0.1);
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    border-radius: 3px;
    font-weight: bold;

    &:hover {
      background-color: rgba($color-blue-normal, 0.2);
    }

    &.vote-down {
      margin-left: 4px;
    }

    &.active {
      background-color: $color-blue-normal;
      color: #fff;
    }
  }
}
</style>

<template>
  <div class="vote-button">
    <button
      :class="{ 'active': score > 0 }"
      class="vote-btn vote-up"
      @click="voteAction(true)"
    >
      <i class="el-icon-caret-top"/>
      赞同
      {{ total }}
    </button>
    <button
      :class="{ 'active': score < 0 }"
      class="vote-btn vote-down"
      @click="voteAction(false)"
    >
      <i class="el-icon-caret-bottom"/>
    </button>
  </div>
</template>

<script>
import Api from '~/api/toggleApi'

export default {
  name: 'VoteButton',
  props: {
    type: {
      required: true,
      type: String,
      validator: val => ~['answer'].indexOf(val)
    },
    id: {
      required: true,
      type: Number
    },
    score: {
      required: true,
      type: Number
    },
    total: {
      required: true,
      type: Number
    },
    authorId: {
      required: true,
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    currentUserId() {
      if (this.$store.state.login) {
        return this.$store.state.user.id
      }
      return 0
    }
  },
  methods: {
    async voteAction(is_agree) {
      if (this.disabled) {
        return
      }
      if (!this.currentUserId) {
        this.$channel.$emit('sign-in')
        return
      }
      if (this.currentUserId === this.authorId) {
        this.$toast.error(is_agree ? '不能给自己点赞' : '不能给自己点反对')
        return
      }
      if (this.loading) {
        return
      }
      this.loading = true
      const api = new Api(this)
      try {
        const result = await api.vote({
          type: this.type,
          id: this.id,
          is_agree
        })
        this.$emit('vote', result)
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
