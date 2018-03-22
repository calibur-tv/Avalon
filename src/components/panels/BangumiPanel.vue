<style lang="scss" module>
  .bangumi-panel {
    width: 206px;
    height: 258px;
    text-align: center;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    box-shadow: 0 8px 18px rgba(0,0,0,.06);

    .avatar {
      margin: 0 auto 8px;
      padding-top: 26px;
      overflow: hidden;
      width: 90px;
      height: 90px;
      display: block;
      box-sizing: content-box;

      img {
        width: 100%;
        height: auto;
      }
    }

    .name {
      margin: 16px 16px 7px;
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }

    .summary {
      margin: 0 auto 10px;
      max-width: 180px;
    }

    button {
      margin-top: 15px;
    }
  }
</style>

<template>
  <div :class="$style.bangumiPanel">
    <router-link :class="$style.avatar" :to="$alias.bangumi(id)">
      <v-img :src="$resize(avatar, { width: 180 })"></v-img>
    </router-link>
    <router-link class="twoline" :class="$style.name" :to="$alias.bangumi(id)" v-text="name"></router-link>
    <p class="twoline" :class="$style.summary" v-text="summary"></p>
    <el-button
      type="danger"
      size="mini"
      @click="handleFollow"
      v-if="followed"
      :loading="loadingFollow"
      plain
    >已关注</el-button>
    <el-button
      type="danger"
      size="mini"
      @click="handleFollow"
      :loading="loadingFollow"
      v-else
    >关注</el-button>
  </div>
</template>

<script>
  import Api from '~/api/bangumiApi'

  export default {
    name: 'v-bangumi-panel',
    props: {
      id: {
        required: true,
        type: Number
      },
      avatar: {
        required: true,
        type: String
      },
      name: {
        required: true,
        type: String
      },
      summary: {
        required: true,
        type: String
      },
      followed: {
        required: true,
        type: Boolean
      }
    },
    data () {
      return {
        loadingFollow: false
      }
    },
    methods: {
      async handleFollow () {
        if (!this.$store.state.login) {
          this.$channel.$emit('sign-in')
          return
        }
        if (this.loadingFollow) {
          return
        }
        this.loadingFollow = true
        try {
          const api = new Api(this)
          const result = await api.follow(this.id)
          this.$emit('follow', result)
        } catch (e) {
          this.$toast.error(e)
        } finally {
          this.loadingFollow = false
        }
      }
    }
  }
</script>
