<style lang="scss" module>
.bangumi-panel {
  position: relative;
  width: 206px;
  height: 270px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  text-align: center;
  padding-top: 20px;

  .avatar {
    margin: 0 auto 8px auto;
  }

  .name {
    margin: 16px 16px 7px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    @include twoline(18px);
  }

  .summary {
    margin: 0 auto 10px;
    max-width: 180px;
    @include twoline(16px);
  }

  button {
    margin-top: 5px;
  }
}
</style>

<template>
  <div :class="$style.bangumiPanel">
    <a
      :href="$alias.bangumi(id)"
      target="_blank"
    >
      <v-img
        :class="$style.avatar"
        :src="avatar"
        :poster="true"
        size="90"
      />
    </a>
    <a
      :class="$style.name"
      :href="$alias.bangumi(id)"
      target="_blank"
      v-text="name"
    />
    <p
      :class="$style.summary"
      v-text="summary"
    />
    <follow-button
      :id="id"
      :followed="followed"
      type="bangumi"
      @submit="handleFollow"
    />
  </div>
</template>

<script>
import FollowButton from '~/components/common/FollowButton'

export default {
  name: 'VBangumiPanel',
  components: {
    FollowButton
  },
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
  methods: {
    handleFollow(result) {
      this.$emit('follow', result)
    }
  }
}
</script>
