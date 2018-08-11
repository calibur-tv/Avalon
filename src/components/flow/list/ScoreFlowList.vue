<template>
  <div id="score-flow-list">
    score flow list
  </div>
</template>

<script>
import flowMixin from "~/mixins/flow";
import ScoreFlowItem from "../item/ScoreFlowItem";

export default {
  name: "ScoreFlowList",
  components: {
    ScoreFlowItem
  },
  mixins: [flowMixin],
  props: {
    bangumiId: {
      type: Number,
      default: 0
    },
    userZone: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      flowType: "score"
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
