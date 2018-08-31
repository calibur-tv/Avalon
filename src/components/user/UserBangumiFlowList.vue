<style lang="scss">
#user-bangumi-flow-list {
  $video-item-width: 220px;
  $video-item-margin: 15px;
  $video-item-height: 70px;
  .bangumis {
    li {
      margin: 0 $video-item-margin 15px 0;
      float: left;
    }

    a {
      display: block;
      position: relative;
      width: $video-item-width;
      height: $video-item-height;
      border-radius: 3px;
      background-color: $color-gray-normal;
      overflow: hidden;

      &:hover .name {
        color: $color-blue-normal;
      }
    }

    .poster {
      width: $video-item-height;
      height: $video-item-height;
      margin-right: 12px;
      float: left;
    }

    .intro {
      padding-right: 12px;

      .name {
        font-size: 12px;
        color: $color-text-normal;
        margin-top: 6px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>

<template>
  <div id="user-bangumi-flow-list">
    <ul
      v-if="bangumis.length"
      class="bangumis"
    >
      <li
        v-for="item in bangumis"
        :key="item.id"
      >
        <a
          :href="$alias.bangumi(item.id)"
          target="_blank"
        >
          <v-img
            :src="item.avatar"
            :lazy="false"
            size="70"
            class="poster"
          />
          <figcaption class="intro">
            <p
              class="name"
              v-text="item.name"
            />
          </figcaption>
        </a>
      </li>
    </ul>
    <no-content v-else/>
  </div>
</template>

<script>
export default {
  name: "UserBangumiFlowList",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    bangumis() {
      return this.$store.state.users.bangumis;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
