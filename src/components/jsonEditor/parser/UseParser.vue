<style lang="scss">
.json-content-txt-parser {
  blockquote {
    margin-left: 18px;
    margin-right: 15px;
    padding-left: 1em;
    color: #646464;
    border-left: 3px solid #d3d3d3;
    font-size: 14px;
    line-height: 22px;
    @extend %breakWord;
  }
}
</style>

<template>
  <div class="json-content-txt-parser">
    <blockquote v-html="item.text"/>
  </div>
</template>

<script>
export default {
  name: "JsonContentTxtParser",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
