<style lang="scss">
.user-card {
  border: none;

  .content {
    z-index: 2;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }

  .background {
    width: 100%;
    height: 120px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #ddd;
  }

  .profile {
    padding: 0 20px 15px;

    .avatar {
      margin-top: -25px;
      margin-right: 10px;
      float: left;
    }

    .info {
      overflow: hidden;

      .nickname {
        margin-top: 12px;
        font-weight: 700;

        a {
          font-size: 14px;
          margin-right: 5px;
        }

        .level {
          color: $color-text-light;
        }

        .power {
          color: $color-text-light;
        }
      }

      .signature {
        line-height: 16px;
        font-size: 12px;
        margin-top: 11px;
        color: $color-text-light;
        @extend %breakWord;
      }
    }
  }

  .user-badges {
    margin-top: 10px;
    margin-bottom: -5px;

    .user-badge {
      margin-bottom: 5px;
    }
  }
}

.user-card-loading {
  height: 60px;

  .content {
    text-align: center;
    padding-top: 20px;
  }
}
</style>

<template>
  <el-popover
    :popper-class="loading ? 'user-card-loading' : 'user-card'"
    :width="375"
    :open-delay="400"
    trigger="hover"
    @show="handleHover"
  >
    <div class="content">
      <mt-spinner v-if="loading" type="triple-bounce" />
      <template v-else-if="user">
        <div
          :style="{
            backgroundImage: `url(${$resize(user.banner, {
              width: 750,
              height: 240
            })})`
          }"
          class="background"
        />
        <div class="profile">
          <a :href="$alias.user(zone)" target="_blank" class="avatar">
            <v-img
              :src="user.avatar"
              width="55"
              height="55"
              :lazy="false"
              :avatar="true"
            />
          </a>
          <div class="info">
            <p class="nickname">
              <a
                :href="$alias.user(zone)"
                target="_blank"
                v-text="user.nickname"
              />
              <user-sex :sex="user.sex" :secret="user.sexSecret" />
              <span class="level"> Lv{{ user.level }} </span>
              <span class="power">-&nbsp;战斗力：{{ user.power }}</span>
            </p>
            <p class="signature" v-text="user.signature" />
            <ul v-if="user.badge.length" class="user-badges">
              <user-badge
                v-for="item in user.badge"
                :key="item.id"
                :item="item"
                :user-id="user.id"
              />
            </ul>
          </div>
        </div>
      </template>
    </div>
    <a
      slot="reference"
      :href="$alias.user(zone)"
      :class="customClass"
      target="_blank"
      class="avatar-slot"
    >
      <slot />
    </a>
  </el-popover>
</template>

<script>
import UserSex from '~/components/user/UserSex'
import UserBadge from '~/components/user/UserBadge'
import { Spinner } from 'mint-ui'
import { getUserCard } from '~/api/userApi'

export default {
  name: 'UserCard',
  components: {
    UserSex,
    UserBadge,
    'mt-spinner': Spinner
  },
  props: {
    id: {
      required: true,
      type: [Number, String]
    },
    zone: {
      required: true,
      type: String
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      user: null,
      loading: false
    }
  },
  methods: {
    handleHover() {
      if (!this.user) {
        this.getUserFromLocal()
        if (!this.user) {
          this.getUserFromServer()
        }
      }
    },
    getUserFromLocal() {
      try {
        this.user = JSON.parse(sessionStorage.getItem(`user-card-${this.id}`))
      } catch (e) {
        // do nothing
      }
    },
    async getUserFromServer() {
      if (this.loading) {
        return
      }
      this.loading = true
      try {
        const data = await getUserCard(this, {
          id: this.id
        })
        this.user = data
        sessionStorage.setItem(`user-card-${this.id}`, JSON.stringify(data))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
