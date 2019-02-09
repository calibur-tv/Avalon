<style lang="scss" module>
.cartoon-role-btn {
  width: 90px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid $color-pink-normal;
  color: $color-pink-normal;
  font-size: 14px;
  line-height: 30px;
  text-align: center;

  &:hover {
    border-color: $color-pink-deep;
    color: $color-pink-deep;
    background-color: rgba($color-pink-deep, 0.1);
  }
}
</style>

<template>
  <button
    :class="$style.cartoonRoleBtn"
    @click="handleStarRole"
  >为TA应援</button>
</template>

<script>
import { starRoleAction } from '~/api/cartoonRoleApi'

export default {
  name: 'CartoonRoleBtn',
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async handleStarRole() {
      if (!this.$store.state.login) {
        this.$channel.$emit('sign-in')
        return
      }
      if (!this.$store.state.user.coin) {
        this.$toast.error('团子不足')
        return
      }
      this.$prompt('请输入要应援的数额', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '必须是正整数'
      })
        .then(async ({ value }) => {
          if (value < 0) {
            this.$toast.error('必须是正整数')
            return
          }
          try {
            await starRoleAction(this, {
              id: this.id,
              amount: value
            })
            this.$store.commit('USE_COIN', +value)
            this.$emit('success', +value)
          } catch (e) {
            this.$toast.error(e)
          }
        })
        .catch(() => {})
    }
  }
}
</script>
