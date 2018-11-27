<style lang="scss">
#bangumi-cartoon-flow {
  .header {
    margin-bottom: 15px;
    text-align: right;

    .total {
      float: left;
      line-height: 28px;
    }

    .el-select {
      margin-right: 8px;
    }
  }

  .cartoon {
    width: 198px;
    height: 335px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    margin: 3px 7px 15px 3px;
    background-color: #fafafa;
    overflow: hidden;
    float: left;

    .poster-wrap {
      position: relative;
      display: block;

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        opacity: 0.3;
        background-color: transparent;
        background-image: linear-gradient(
          transparent,
          rgba(0, 0, 0, 0.1) 20%,
          rgba(0, 0, 0, 0.2) 35%,
          rgba(0, 0, 0, 0.6) 65%,
          rgba(0, 0, 0, 0.9)
        );
      }

      &:hover {
        &:after {
          opacity: 1;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          transition: background 0.2s;
        }
      }

      img {
        width: 100%;
        height: 300px;
        display: block;
      }

      .info {
        position: absolute;
        left: 7px;
        bottom: 4px;
        z-index: 1;
        color: #fff;
        line-height: 20px;

        i {
          font-size: 20px;
          vertical-align: middle;
        }

        .image-count {
          margin-left: 5px;
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }

    .intro {
      height: 55px;
      padding: 5px 15px;
      background-color: #fff;

      .name,
      .social {
        height: 20px;
        font-size: 12px;
        line-height: 20px;
      }

      .name {
        margin-top: 3px;
      }

      .social {
        color: $color-text-light;
        margin-top: 2px;

        span {
          margin-right: 10px;
        }

        .done {
          color: $color-pink-deep;
        }
      }
    }

    .about {
      height: 51px;
      padding: 10px 15px;
      border-top: 1px solid #f2f2f2;

      .user-avatar {
        display: block;
        margin-right: 10px;
        float: left;
      }

      .main-name {
        line-height: 30px;
        font-size: 12px;
        word-wrap: break-word;
        color: $color-text-normal;
      }
    }
  }
}
</style>

<template>
  <div id="bangumi-cartoon-flow">
    <template v-if="cartoons.list.length">
      <div class="header">
        <strong class="total">共 {{ cartoons.total }} 集</strong>
        <el-select
          v-model="sort"
          :loading="state.loading"
          size="mini"
        >
          <el-option
            v-for="item in order"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <ul
        class="clearfix"
      >
        <li
          v-for="item in cartoons.list"
          :key="item.id"
          class="cartoon"
        >
          <a
            :href="$alias.image(item.id)"
            target="_blank"
          >
            <div class="poster-wrap">
              <img :src="$resize(item.source.url, { width: 396, height: 600 })">
              <div class="info">
                <i class="el-icon-picture-outline"/>
                <span
                  class="image-count"
                  v-text="item.image_count"
                />
              </div>
            </div>
            <div class="intro">
              <p class="name oneline">【 {{ item.part }} 】{{ item.name }}</p>
              <!--
              <div class="social">
                <span
                  v-if="item.like_count"
                  :class="{ 'done': item.liked }"
                >
                  <i class="iconfont icon-fantuan"/>
                  {{ item.like_count }}
                </span>
                <span
                  v-if="item.comment_count"
                  :class="{ 'done': item.commented }"
                >
                  <i class="iconfont icon-talk"/>
                  {{ item.comment_count }}
                </span>
                <span v-if="item.view_count">
                  <i class="iconfont icon-ai-eye"/>
                  {{ item.view_count }}
                </span>
              </div>
              -->
            </div>
          </a>
          <!--
          <div class="about">
            <user-card
              :id="item.user.id"
              :zone="item.user.zone"
            >
              <v-img
                :src="item.user.avatar"
                :avatar="true"
                class="user-avatar"
                size="30"
              />
              <span
                class="main-name"
                v-text="item.user.nickname"
              />
            </user-card>
          </div>
          -->
        </li>
      </ul>
      <load-more-btn
        :auto="true"
        :no-more="cartoons.noMore"
        :loading="state.loading"
        @fetch="getData(false)"
      />
    </template>
    <no-content v-else-if="cartoons.noMore">
      <el-button
        type="primary"
        round
        @click="openFeedback"
      >求漫画</el-button>
    </no-content>
  </div>
</template>

<script>
export default {
  name: 'BangumiCartoonFlow',
  data() {
    return {
      state: {
        loading: false,
        fetched: false
      },
      order: [
        {
          label: '由大到小排序',
          value: 'desc'
        },
        {
          label: '由小到大排序',
          value: 'asc'
        }
      ]
    }
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info
    },
    cartoons() {
      return this.$store.state.bangumi.cartoon
    },
    sort: {
      get() {
        return this.cartoons.sort
      },
      set(sort) {
        this.$store.dispatch('bangumi/changeCartoonSort', {
          sort,
          ctx: this,
          bangumiId: this.info.id
        })
      }
    }
  },
  methods: {
    async getData() {
      if (this.state.loading) {
        return
      }
      this.state.loading = true

      try {
        await this.$store.dispatch('bangumi/getCartoons', {
          ctx: this,
          bangumiId: this.info.id
        })
      } catch (e) {
        this.$toast.error(e)
      } finally {
        this.state.loading = false
        this.state.fetched = true
      }
    },
    openFeedback() {
      this.$channel.$emit('open-feedback', {
        type: 7,
        desc: `我想看《${this.info.name}》的漫画第 {?} 话`,
        placeholder: '请填写你要看的集数'
      })
    }
  }
}
</script>
