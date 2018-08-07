<style lang="scss">
.json-content-txt-parser {
  margin-bottom: 25px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  color: #2f2f2f;
  @extend %breakWord;
}
</style>

<template>
  <p
    class="json-content-txt-parser"
    v-html="item.text"
  />
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
