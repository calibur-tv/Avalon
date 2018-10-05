<template>
  <span class="user-sex">
    <i
      v-if="secret"
      class="iconfont icon-simi"
      style="color: limegreen"
    />
    <i
      v-else-if="sex === '未知'"
      class="iconfont icon-wenhao"
      style="color: gold"
    />
    <i
      v-else-if="sex === '男'"
      class="iconfont icon-nan"
      style="color: deepskyblue"
    />
    <i
      v-else-if="sex === '女'"
      class="iconfont icon-nv"
      style="color: hotpink"
    />
    <i
      v-else-if="sex === '伪娘'"
      class="iconfont icon-tijianxingbiefenxi"
      style="color: mediumpurple"
    />
    <i
      v-else-if="sex === '药娘'"
      class="iconfont icon-xingbie"
      style="color: #ff4d51;"
    />
    <i
      v-else-if="sex === '扶她'"
      class="iconfont icon-intersex"
      style="color: silver"
    />
  </span>
</template>

<script>
export default {
  name: "UserSex",
  props: {
    sex: {
      type: String,
      required: true
    },
    secret: {
      type: Boolean,
      default: false
    }
  }
};
</script>
