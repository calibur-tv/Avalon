<style lang="scss">
.invite-gift-modal {
  .content {
    text-align: center;

    .avatar {
      margin-bottom: 15px;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid $color-blue-normal;
      }
    }

    .tips {
      margin-bottom: 15px;

      a {
        color: $color-blue-normal;
      }

      line-height: 20px;
    }
  }

  input {
    padding-left: 15px !important;
  }

  .expired {
    text-align: right;
    margin-top: -12px;
    z-index: 0;
  }
}
</style>

<template>
  <v-dialog
    v-model="showDialog"
    :header="false"
    :footer="false"
    :close="false"
    width="500px"
    class="invite-gift-modal"
  >
    <div v-if="user" class="content">
      <div class="avatar">
        <img :src="user.avatar" />
      </div>
      <div class="tips">
        <p>
          <span>这个页面是</span>
          <a
            :href="$alias.user(user.zone)"
            target="_blank"
            v-text="user.nickname"
          />
          <span>分享给你的</span>
        </p>
        <p>
          在这里注册，你们都将会获得
          <a href="/app/notice/1" target="_blank">
            「团子」
          </a>
          奖励
        </p>
        <p>团子可以用来看视频，或经过转化之后提现，1团子相当于1人民币</p>
        <p>更重要的是，calibur 的发展需要你，请加入我们吧</p>
      </div>
      <sign-up-form :invite-code="user.id" />
      <p class="expired">
        <span>该邀请将于</span>
        <v-time v-model="query.time" />
        <span>失效</span>
      </p>
    </div>
  </v-dialog>
</template>

<script>
import { getUserCard } from '~/api/userApi'
import SignUpForm from '~/components/user/SignUpForm'

export default {
  name: 'GiftModal',
  components: {
    SignUpForm
  },
  data() {
    return {
      user: null,
      showDialog: false
    }
  },
  computed: {
    query() {
      return this.$route.query
    },
    paramsIsOK() {
      return !!(
        this.query.uid &&
        /^\d+$/.test(this.query.uid) &&
        this.query.time &&
        /^\d+$/.test(this.query.time) &&
        Date.now() <= this.query.time * 1000 &&
        this.query.key ===
          this.$md5(`${this.query.uid}-the-world-${this.query.time}`)
      )
    },
    isGuest() {
      return !this.$store.state.haveAuthToken
    }
  },
  mounted() {
    if (this.paramsIsOK && this.isGuest) {
      this.getGiftUser()
    }
  },
  methods: {
    getGiftUser() {
      getUserCard(this, {
        id: this.query.uid
      }).then(data => {
        this.user = data
        this.showDialog = true
      })
    }
  }
}
</script>
