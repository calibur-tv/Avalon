<template>
  <div id="user-bangumi">
    <user-follow-bangumi-list/>
  </div>
</template>

<script>
import UserFollowBangumiList from "~/components/user/UserFollowBangumiList";

export default {
  name: "UserBangumi",
  async asyncData({ store, route, ctx }) {
    await store.dispatch("users/getFollowBangumis", {
      ctx,
      zone: route.params.zone
    });
  },
  components: {
    UserFollowBangumiList
  }
};
</script>
