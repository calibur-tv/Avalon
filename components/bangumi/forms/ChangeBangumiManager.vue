<style lang="scss">
#change-bangumi-manager {
  .users {
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  .control {
    margin-top: 20px;
    margin-bottom: 30px;
  }
}
</style>

<template>
  <div id="change-bangumi-manager">
    <h3 class="sub-title">
      版主
    </h3>
    <div class="users">
      <a
        v-for="item in leaders"
        :key="item.user.id"
        :href="$alias.user(item.user.zone)"
        target="_blank"
      >
        <img :src="$resize(item.user.avatar, { width: 120 })" >
      </a>
    </div>
    <div v-if="isLeader" class="control">
      <el-button type="primary" size="mini" @click="addManager">
        添加代行者
      </el-button>
      <el-button type="danger" size="mini" @click="delManager">
        移除代行者
      </el-button>
    </div>
    <h3 class="sub-title">
      代行者
    </h3>
    <div class="users">
      <a
        v-for="item in managers"
        :key="item.user.id"
        :href="$alias.user(item.user.zone)"
        target="_blank"
      >
        <img :src="$resize(item.user.avatar, { width: 120 })" >
      </a>
    </div>
  </div>
</template>

<script>
import { getManagerList, setManager, removeManager } from '~/api/bangumiApi'

export default {
  name: 'ChangeBangumiManager',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    leaders() {
      return this.list.filter(_ => _.is_leader)
    },
    managers() {
      return this.list.filter(_ => !_.is_leader)
    },
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0
    },
    isLeader() {
      return this.leaders
        .map(_ => _.user.id)
        .some(_ => _ === this.currentUserId)
    }
  },
  mounted() {
    this.getManagers()
  },
  methods: {
    async getManagers() {
      const data = await getManagerList(this, this.id)
      this.list = data.list
    },
    addManager() {
      this.$prompt('请输入任职人的邀请码', '任命代行者', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^([1-9][0-9]*)$/,
        inputErrorMessage: '邀请码格式不正确'
      })
        .then(async ({ value }) => {
          await setManager(this, {
            user_id: value,
            bangumi_id: this.id
          })
          this.$toast.success('操作成功')
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
        .catch(() => {})
    },
    delManager() {
      this.$prompt('请输入卸任人的邀请码', '移除代行者', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^([1-9][0-9]*)$/,
        inputErrorMessage: '邀请码格式不正确'
      })
        .then(async ({ value }) => {
          await removeManager(this, {
            user_id: value,
            bangumi_id: this.id
          })
          this.$toast.success('操作成功')
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
        .catch(() => {})
    }
  }
}
</script>
