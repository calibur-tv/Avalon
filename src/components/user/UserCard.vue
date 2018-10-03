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
      border: 2px solid #fff;
      border-radius: 50%;
      margin-top: -20px;
      margin-right: 10px;
      overflow: hidden;
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
    :width="loading ? 80 : 375"
    :open-delay="500"
    trigger="hover"
    @show="handleHover"
  >
    <div class="content">
      <mt-spinner
        v-if="loading"
        type="triple-bounce"
      />
      <template v-else-if="user">
        <div
          :style="{ backgroundImage: `url(${$resize(user.banner, { width: 750, height: 240 })})` }"
          class="background"
        />
        <div class="profile">
          <a
            :href="$alias.user(zone)"
            target="_blank"
            class="avatar"
          >
            <v-img
              :src="user.avatar"
              :size="55"
              :lazy="false"
            />
          </a>
          <div class="info">
            <p class="nickname">
              <a
                :href="$alias.user(zone)"
                target="_blank"
                v-text="user.nickname"
              />
              <user-sex
                :sex="user.sex"
                :secret="user.sexSecret"
              />
            </p>
            <p
              class="signature"
              v-text="user.signature"
            />
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
      <slot/>
    </a>
  </el-popover>
</template>

<script>
import Api from "~/api/userApi";
import UserSex from "~/components/user/UserSex";

export default {
  name: "UserCard",
  components: {
    UserSex
  },
  props: {
    id: {
      required: true,
      type: Number
    },
    zone: {
      required: true,
      type: String
    },
    customClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      user: null,
      loading: false
    };
  },
  methods: {
    handleHover() {
      if (!this.user) {
        this.getUserFromLocal();
        if (!this.user) {
          this.getUserFromServer();
        }
      }
    },
    getUserFromLocal() {
      try {
        this.user = JSON.parse(sessionStorage.getItem(`user-card-${this.id}`));
      } catch (e) {}
    },
    async getUserFromServer() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      const api = new Api(this);
      try {
        const data = await api.getUserCard({
          id: this.id
        });
        this.user = data;
        sessionStorage.setItem(`user-card-${this.id}`, JSON.stringify(data));
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
